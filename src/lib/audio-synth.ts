/**
 * Universal Audio Engine for TOEIC Listening
 * Supports:
 * 1. Playing external MP3 audio URLs (from Supabase Storage or CDN)
 * 2. High-fidelity browser Text-To-Speech (Web Speech API) with EN accents (US/UK)
 * 3. Exact speed controls (0.75x, 1.0x, 1.25x)
 */

export interface AudioPlaybackState {
  isPlaying: boolean;
  isPaused: boolean;
  progress: number; // 0 to 100
  currentTime: number;
  duration: number;
  speed: number;
}

class TOEICAudioEngine {
  private audioElement: HTMLAudioElement | null = null;
  private synthUtterance: SpeechSynthesisUtterance | null = null;
  private currentSpeed: number = 1.0;
  private stateChangeListeners: ((state: AudioPlaybackState) => void)[] = [];
  private progressInterval: NodeJS.Timeout | null = null;
  private speechStartTime: number = 0;
  private estimatedSpeechDuration: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioElement = new Audio();
      this.audioElement.addEventListener('timeupdate', () => this.handleAudioTimeUpdate());
      this.audioElement.addEventListener('ended', () => this.handleAudioEnded());
      this.audioElement.addEventListener('pause', () => this.notifyState());
      this.audioElement.addEventListener('play', () => this.notifyState());
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
        speed: this.currentSpeed
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
        speed: this.currentSpeed
      };
    }

    return {
      isPlaying: false,
      isPaused: false,
      progress: 0,
      currentTime: 0,
      duration: 0,
      speed: this.currentSpeed
    };
  }

  public setSpeed(speed: number) {
    this.currentSpeed = speed;
    if (this.audioElement) {
      this.audioElement.playbackRate = speed;
    }
    this.notifyState();
  }

  public play(contentUrl?: string, spokenScript?: string): Promise<void> {
    this.stop();

    if (contentUrl && contentUrl.startsWith('http')) {
      if (!this.audioElement) return Promise.resolve();
      this.audioElement.src = contentUrl;
      this.audioElement.playbackRate = this.currentSpeed;
      return this.audioElement.play().then(() => this.notifyState());
    }

    // Use Web Speech API with native English voice
    if (spokenScript && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return new Promise<void>((resolve) => {
        window.speechSynthesis.cancel();

        // Calculate approximate speech duration (average 130 words per minute)
        const wordCount = spokenScript.split(/\s+/).length;
        this.estimatedSpeechDuration = (wordCount / (130 * this.currentSpeed)) * 60;
        this.speechStartTime = Date.now();

        const utterance = new SpeechSynthesisUtterance(spokenScript);
        this.synthUtterance = utterance;
        utterance.rate = this.currentSpeed * 0.95; // Slightly paced for standard TOEIC rhythm
        utterance.pitch = 1.0;

        // Try selecting a natural English voice (US or GB)
        const voices = window.speechSynthesis.getVoices();
        const englishVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB')) 
          || voices.find(v => v.lang.startsWith('en')) 
          || null;

        if (englishVoice) {
          utterance.voice = englishVoice;
        }

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

    return Promise.resolve();
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
