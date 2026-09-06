'use client';

import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Volume2, Eye, EyeOff, Gauge, Globe2 } from 'lucide-react';
import { audioEngine, AudioPlaybackState } from '@/lib/audio-synth';

interface AudioPlayerProps {
  contentUrl?: string;
  audioScript?: string;
  transcriptHidden?: string;
  isMockMode?: boolean; // In mock mode: disable seeking/skipping forward, hide transcript
  onPlayStarted?: () => void;
  onPlayFinished?: () => void;
  autoPlay?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  contentUrl,
  audioScript,
  transcriptHidden,
  isMockMode = false,
  onPlayStarted,
  onPlayFinished,
  autoPlay = false
}) => {
  const [playerState, setPlayerState] = useState<AudioPlaybackState>({
    isPlaying: false,
    isPaused: false,
    progress: 0,
    currentTime: 0,
    duration: 0,
    speed: 1.0,
    currentAccent: 'US',
    activeVoiceName: ''
  });
  const [showTranscript, setShowTranscript] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  // Subscribe to global audio engine events
  useEffect(() => {
    const unsubscribe = audioEngine.subscribe((newState) => {
      setPlayerState(newState);
      if (newState.progress >= 100 && onPlayFinished) {
        onPlayFinished();
      }
    });

    if (autoPlay && (contentUrl || audioScript)) {
      handlePlay();
    }

    return () => {
      unsubscribe();
      audioEngine.stop();
    };
  }, [contentUrl, audioScript]);

  const handlePlay = () => {
    // In strict mock mode, prevent replaying if already played once
    if (isMockMode && playCount >= 1 && !playerState.isPaused) {
      return;
    }

    if (playerState.isPaused) {
      audioEngine.resume();
    } else {
      setPlayCount(prev => prev + 1);
      if (onPlayStarted) onPlayStarted();
      audioEngine.play(contentUrl, audioScript || transcriptHidden);
    }
  };

  const handlePause = () => {
    audioEngine.pause();
  };

  const handleReplay = () => {
    if (isMockMode) return; // In mock mode, replaying is restricted
    audioEngine.stop();
    handlePlay();
  };

  const handleSpeedChange = (speed: number) => {
    audioEngine.setSpeed(speed);
  };

  const handleAccentChange = (accent: 'US' | 'UK') => {
    audioEngine.setAccent(accent);
    if (playerState.isPlaying) {
      audioEngine.stop();
      audioEngine.play(contentUrl, audioScript || transcriptHidden);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const hasAudioContent = Boolean(contentUrl || audioScript || transcriptHidden);

  if (!hasAudioContent) {
    return null;
  }

  return (
    <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Play/Pause Main Control */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={playerState.isPlaying ? handlePause : handlePlay}
            disabled={isMockMode && playCount >= 1 && !playerState.isPlaying && !playerState.isPaused}
            className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold shadow-md transition-all ${
              isMockMode && playCount >= 1 && !playerState.isPlaying && !playerState.isPaused
                ? 'bg-slate-400 cursor-not-allowed opacity-60'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-blue-500/25'
            }`}
            title={playerState.isPlaying ? 'Pausar audio' : 'Reproducir audio'}
            aria-label={playerState.isPlaying ? 'Pause' : 'Play'}
          >
            {playerState.isPlaying ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white translate-x-0.5" />
            )}
          </button>

          {!isMockMode && (
            <button
              onClick={handleReplay}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 transition-colors"
              title="Reiniciar audio"
              aria-label="Restart Audio"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <Volume2 className={`w-4 h-4 ${playerState.isPlaying ? 'text-blue-500 animate-pulse' : 'text-slate-400'}`} />
              <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                {playerState.isPlaying ? 'Reproduciendo audio inglés...' : 'Audio Oficial TOEIC'}
              </span>
            </div>
            {playerState.activeVoiceName && (
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono truncate max-w-[150px]">
                {playerState.activeVoiceName.replace(/Microsoft |Google |English \(United States\)|\(United Kingdom\)/g, '').trim()}
              </span>
            )}
          </div>
        </div>

        {/* Controls Bar: Accent Selection + Speed Controls */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap justify-end w-full sm:w-auto">
          {/* Accent Switcher (US / UK) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <Globe2 className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            <button
              onClick={() => handleAccentChange('US')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all ${
                playerState.currentAccent === 'US'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Acento Americano (US)"
            >
              🇺🇸 US
            </button>
            <button
              onClick={() => handleAccentChange('UK')}
              className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all ${
                playerState.currentAccent === 'UK'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
              title="Acento Británico (UK)"
            >
              🇬🇧 UK
            </button>
          </div>

          {/* Speed Controls (0.75x, 1x, 1.25x) */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-950 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            <Gauge className="w-3.5 h-3.5 text-slate-400 ml-1.5 mr-0.5" />
            {[0.75, 1.0, 1.25].map((rate) => (
              <button
                key={rate}
                onClick={() => handleSpeedChange(rate)}
                className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all ${
                  playerState.speed === rate
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Bar & Timing */}
      <div className="space-y-1">
        <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden relative">
          <div
            className="bg-blue-600 h-full rounded-full transition-all duration-150"
            style={{ width: `${playerState.progress}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
          <span>{formatTime(playerState.currentTime)}</span>
          <span>{formatTime(playerState.duration)}</span>
        </div>
      </div>

      {/* Transcript Toggle (Hidden in Mock Mode for authenticity) */}
      {!isMockMode && transcriptHidden && (
        <div className="pt-2 border-t border-slate-200/70 dark:border-slate-800/70">
          <button
            onClick={() => setShowTranscript(!showTranscript)}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            {showTranscript ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTranscript ? 'Ocultar transcripción de audio' : 'Ver transcripción del audio'}</span>
          </button>

          {showTranscript && (
            <div className="mt-2.5 p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              <strong className="block text-blue-700 dark:text-blue-300 mb-1">Guion del Audio (Transcript):</strong>
              <p className="whitespace-pre-line">{transcriptHidden}</p>
            </div>
          )}
        </div>
      )}

      {isMockMode && (
        <div className="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1">
          <span>⚠️ Modo Simulacro: El audio se reproduce una sola vez sin posibilidad de adelantar.</span>
        </div>
      )}
    </div>
  );
};
