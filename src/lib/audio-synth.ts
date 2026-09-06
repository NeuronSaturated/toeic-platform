/**
 * Universal Audio Engine for TOEIC Listening
 * 
 * Features:
 * 1. Guarantees 100% native English voices (en-US, en-GB) regardless of the user's OS language.
 * 2. Prioritizes ultra-clear Neural / Natural / Google voices for studio-like pronunciation.
 * 3. Formats TOEIC scripts with authentic pauses between Options (A, B, C, D).
 * 4. Supports accent selection (American 🇺🇸 / British 🇬🇧).
 * 5. Accurate speed control (0.75x, 1.0x, 1.25x) and progress tracking.
 */

export interface AudioPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
  speed: number;
  currentAccent: 'US' | 'UK';
  activeVoiceName: string;
}

class TOEICAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private synthUtterance: SpeechSynthesisUtterance | null = null;
  private currentSpeed: number = 1.0;
  private currentAccent: 'US' | 'UK' = 'US';
  private stateChangeListeners: ((state: AudioPlaybackState) => void)[] = [];
  private progressInterval: NodeJS.Timeout | null = null;
  private speechStartTime: number = 0;
  private estimatedSpeechDuration: number = 0;
  private cachedVoices: SpeechSynthesisVoice[] = [];
  private activeVoiceName: string = 'Detectando voz...';

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.addEventListener('timeupdate', () => this.handleAudioTimeUpdate());
      this.audioElement.addEventListener('ended', () => this.handleAudioEnded());
      this.audioElement.addEventListener('pause', () => this.notifyState());
      this.audioElement.addEventListener('play', () => this.notifyState());

      // Initialize voice loading immediately
      this.loadVoices();
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = () => {
          this.loadVoices();
        };
      }
    }
  }

  private loadVoices() {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.cachedVoices = voices;
      const best = this.findBestVoice(this.currentAccent);
      if (best) {
        this.activeVoiceName = best.name;
        this.notifyState();
      }
    }
  }

  public subscribe(listener: (state: AudioPlaybackState) => void): () => void {
    this.stateChangeListeners.push(listener);
    return () => {
      this.stateChangeListeners = this.stateChangeListeners.filter(l => l !== listener);
    };
  }

  private notifyState() {
    const state = this.getState();
    this.stateChangeListeners.forEach(fn => fn(state));
  }

  public getState(): AudioPlaybackState {
    if (this.audioElement && this.audioElement.src && this.audioElement.src !== window.location.href) {
      const duration = this.audioElement.duration || 1;
      const currentTime = this.audioElement.currentTime || 0;
      return {
        isPlaying: !this.audioElement.paused && !this.audioElement.ended,
        isPaused: this.audioElement.paused && currentTime > 0 && !this.audioElement.ended,
        progress: Math.min(100, (currentTime / duration) * 100),
        currentTime,
        duration: isNaN(duration) ? 0 : duration,
        speed: this.currentSpeed,
        currentAccent: this.currentAccent,
        activeVoiceName: this.activeVoiceName
      };
    }

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const isSpeaking = window.speechSynthesis.speaking;
      const isPaused = window.speechSynthesis.paused;
      const elapsed = isSpeaking ? (Date.now() - this.speechStartTime) / 1000 : 0;
      const duration = Math.max(1, this.estimatedSpeechDuration);
      return {
        isPlaying: isSpeaking && !isPaused,
        isPaused: isPaused,
        progress: Math.min(100, (elapsed / duration) * 100),
        currentTime: elapsed,
        duration,
        speed: this.currentSpeed,
        currentAccent: this.currentAccent,
        activeVoiceName: this.activeVoiceName
      };
    }

    return {
      isPlaying: false,
      isPaused: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
      speed: this.currentSpeed,
      currentAccent: this.currentAccent,
      activeVoiceName: this.activeVoiceName
    };
  }

  public setSpeed(speed: number) {
    this.currentSpeed = speed;
    if (this.audioElement) {
      this.audioElement.playbackRate = speed;
    }
    this.notifyState();
  }

  public setAccent(accent: 'US' | 'UK') {
    this.currentAccent = accent;
    const voice = this.findBestVoice(accent);
    if (voice) {
      this.activeVoiceName = voice.name;
    }
    this.notifyState();
  }

  /**
   * Selects the highest quality English voice available in the user's browser.
   * Prioritizes Neural, Natural, Google, and Apple English voices.
   */
  private findBestVoice(accent: 'US' | 'UK'): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;

    const voices = this.cachedVoices.length > 0 
      ? this.cachedVoices 
      : window.speechSynthesis.getVoices();

    if (voices.length === 0) return null;

    // Filter strictly English voices
    const targetLangCode = accent === 'US' ? 'en-us' : 'en-gb';
    const englishVoices = voices.filter(v => v.lang.toLowerCase().startsWith('en'));

    if (englishVoices.length === 0) return null;

    // Tier 1: Natural / Neural voices matching accent
    const naturalWithAccent = englishVoices.find(v => 
      v.lang.toLowerCase().includes(targetLangCode) &&
      (v.name.includes('Natural') || v.name.includes('Online') || v.name.includes('Neural'))
    );
    if (naturalWithAccent) return naturalWithAccent;

    // Tier 2: Google English voices
    const googleVoice = englishVoices.find(v => 
      v.name.includes('Google') && v.lang.toLowerCase().includes(targetLangCode)
    );
    if (googleVoice) return googleVoice;

    // Tier 3: Apple / Microsoft Premium Desktop voices
    const premiumDesktop = englishVoices.find(v => 
      v.lang.toLowerCase().includes(targetLangCode) &&
      (v.name.includes('Samantha') || v.name.includes('Jenny') || v.name.includes('Guy') || 
       v.name.includes('Aria') || v.name.includes('Daniel') || v.name.includes('Karen'))
    );
    if (premiumDesktop) return premiumDesktop;

    // Tier 4: Any standard voice matching the target accent
    const standardAccent = englishVoices.find(v => v.lang.toLowerCase().includes(targetLangCode));
    if (standardAccent) return standardAccent;

    // Tier 5: Any English voice at all (never fallback to Spanish/system non-English)
    return englishVoices[0];
  }

  /**
   * Formats raw TOEIC script with natural cadence and clear acoustic pauses
   * between options (A, B, C, D) just like the official test audio.
   */
  public formatScriptForSpeech(rawScript: string): string {
    return rawScript
      // Clean up parentheses and replace with clear pauses
      .replace(/\(A\)/gi, '... Option A: ')
      .replace(/\(B\)/gi, '... Option B: ')
      .replace(/\(C\)/gi, '... Option C: ')
      .replace(/\(D\)/gi, '... Option D: ')
      // Ensure "Number X." has a noticeable pause
      .replace(/Number\s+(\d+)\./gi, 'Number $1. ... ')
      .replace(/\.\s+/g, '. ')
      .trim();
  }

  public play(contentUrl?: string, spokenScript?: string): Promise<void> {
    this.stop();

    // 1. External MP3 Audio file if provided
    if (contentUrl && contentUrl.startsWith('http') && !contentUrl.includes('placeholder')) {
      if (!this.audioElement) return Promise.resolve();
      this.audioElement.src = contentUrl;
      this.audioElement.playbackRate = this.currentSpeed;
      return this.audioElement.play().then(() => this.notifyState()).catch(() => {
        // Fallback to speech synthesis if audio file fails
        if (spokenScript) {
          return this.playSpeech(spokenScript);
        }
      });
    }

    // 2. High-Fidelity English Speech Synthesis
    if (spokenScript) {
      return this.playSpeech(spokenScript);
    }

    return Promise.resolve();
  }

  private playSpeech(spokenScript: string): Promise<void> {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return Promise.resolve();
    }

    return new Promise<void>((resolve) => {
      window.speechSynthesis.cancel();

      // Ensure voices are loaded
      this.loadVoices();

      const formattedText = this.formatScriptForSpeech(spokenScript);
      const wordCount = formattedText.split(/\s+/).length;

      // Authentic TOEIC listening tempo: ~110-120 words per minute
      const baseWPM = 115;
      this.estimatedSpeechDuration = (wordCount / (baseWPM * this.currentSpeed)) * 60;
      this.speechStartTime = Date.now();

      const utterance = new SpeechSynthesisUtterance(formattedText);
      this.synthUtterance = utterance;

      // STRICTLY ENFORCE ENGLISH LANGUAGE
      const targetLang = this.currentAccent === 'US' ? 'en-US' : 'en-GB';
      utterance.lang = targetLang;

      // Select best voice
      const selectedVoice = this.findBestVoice(this.currentAccent);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
        this.activeVoiceName = selectedVoice.name;
      }

      // Calm, crystal-clear articulation rate (0.88 baseline for TOEIC clarity)
      utterance.rate = Math.max(0.65, Math.min(1.5, this.currentSpeed * 0.88));
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        this.startProgressTicker();
        this.notifyState();
      };

      utterance.onend = () => {
        this.clearProgressTicker();
        this.notifyState();
        resolve();
      };

      utterance.onerror = () => {
        this.clearProgressTicker();
        this.notifyState();
        resolve();
      };

      window.speechSynthesis.speak(utterance);
    });
  }

  public pause() {
    if (this.audioElement && !this.audioElement.paused) {
      this.audioElement.pause();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
    }
    this.notifyState();
  }

  public resume() {
    if (this.audioElement && this.audioElement.paused) {
      this.audioElement.play();
    } else if (typeof window !== 'undefined' && 'speechSynthesis' in window && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
    this.notifyState();
  }

  public stop() {
    this.clearProgressTicker();
    if (this.audioElement) {
      this.audioElement.pause();
      this.audioElement.currentTime = 0;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    this.notifyState();
  }

  private handleAudioTimeUpdate() {
    this.notifyState();
  }

  private handleAudioEnded() {
    this.notifyState();
  }

  private startProgressTicker() {
    this.clearProgressTicker();
    this.progressInterval = setInterval(() => {
      this.notifyState();
    }, 150);
  }

  private clearProgressTicker() {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
      this.progressInterval = null;
    }
  }
}

// Global Singleton
export const audioEngine = typeof window !== 'undefined' ? new TOEICAudioEngine() : ({} as TOEICAudioEngine);
