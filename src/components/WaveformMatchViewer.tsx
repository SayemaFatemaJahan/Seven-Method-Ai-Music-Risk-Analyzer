import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Volume2, Activity, Zap, CheckCircle, AlertTriangle } from 'lucide-react';
import { RiskBreakdown, MatchedSongResult } from '../types/music';
import { audioEngine } from '../services/audioEngine';

interface WaveformMatchViewerProps {
  currentTrackTitle: string;
  currentArtist: string;
  durationSeconds: number;
  detectedBpm: number;
  detectedKey: string;
  risk: RiskBreakdown;
  audioBuffer: AudioBuffer | null;
  peaks: number[];
}

export const WaveformMatchViewer: React.FC<WaveformMatchViewerProps> = ({
  currentTrackTitle,
  currentArtist,
  durationSeconds,
  detectedBpm,
  detectedKey,
  risk,
  audioBuffer,
  peaks
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fallback synthetic peaks if not provided
  const displayPeaks = peaks && peaks.length > 0 ? peaks : Array.from({ length: 90 }, (_, i) => {
    return Math.max(0.08, Math.sin(i * 0.2) * 0.4 + Math.cos(i * 0.5) * 0.3 + 0.35);
  });

  const topMatch: MatchedSongResult | undefined = risk.matchedSongs[0];

  useEffect(() => {
    return () => {
      audioEngine.stop();
    };
  }, []);

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      // If we don't have an audio buffer yet, generate preset buffer on the fly
      const buffer = audioBuffer || audioEngine.generatePresetAudioBuffer('koto-folk-synth', durationSeconds);
      audioEngine.playBuffer(
        buffer,
        currentTime,
        (time) => {
          setCurrentTime(time);
        },
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      );
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    audioEngine.stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.max(0, Math.min(1, clickX / rect.width));
    const seekTime = progress * durationSeconds;
    setCurrentTime(seekTime);

    if (isPlaying) {
      const buffer = audioBuffer || audioEngine.generatePresetAudioBuffer('koto-folk-synth', durationSeconds);
      audioEngine.playBuffer(
        buffer,
        seekTime,
        (time) => setCurrentTime(time),
        () => {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      );
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm space-y-5">
      {/* Header with tempo and audio metadata */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Activity className="w-4 h-4 text-indigo-400" />
            Visual Waveform & Match Timeline Analysis
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time interactive audio playback with time-aligned collision segments
          </p>
        </div>

        {/* Tempo & Key Match Badges */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="text-slate-300">
            Tempo: <span className="text-indigo-400 font-bold">{detectedBpm} BPM</span>
            {topMatch && (
              <span className="text-slate-500 ml-1">
                (vs {topMatch.song.bpm} BPM)
              </span>
            )}
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-slate-300">
            Key: <span className="text-indigo-400 font-bold">{detectedKey}</span>
          </div>
        </div>
      </div>

      {/* Main Interactive Waveform Area */}
      <div className="space-y-2">
        <div 
          onClick={handleSeek}
          className="relative h-28 bg-slate-950/80 rounded-lg border border-slate-800 cursor-pointer overflow-hidden group select-none"
        >
          {/* Waveform Bars */}
          <div className="absolute inset-0 flex items-center justify-between px-2 gap-0.5 z-10 pointer-events-none">
            {displayPeaks.map((peak, index) => {
              const barProgress = index / displayPeaks.length;
              const currentProgress = currentTime / durationSeconds;
              const isPassed = barProgress <= currentProgress;

              // Check if this bar falls inside a matched segment
              const timeAtBar = barProgress * durationSeconds;
              const inMatchSegment = topMatch?.matchSegments.some(
                seg => timeAtBar >= seg.startTime && timeAtBar <= seg.endTime
              );

              let barColor = isPassed ? 'bg-indigo-400' : 'bg-slate-700';
              if (inMatchSegment) {
                barColor = isPassed ? 'bg-amber-400' : 'bg-amber-600/70';
              }

              return (
                <div
                  key={index}
                  className={`w-full rounded-sm transition-all duration-75 ${barColor}`}
                  style={{
                    height: `${Math.max(6, peak * 92)}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Scrubber Playhead Line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-20 shadow-[0_0_8px_rgba(255,255,255,0.8)] pointer-events-none transition-all duration-75"
            style={{ left: `${(currentTime / durationSeconds) * 100}%` }}
          />

          {/* Segment Match Highlight Overlays */}
          {topMatch?.matchSegments.map((seg, idx) => {
            const leftPct = (seg.startTime / durationSeconds) * 100;
            const widthPct = ((seg.endTime - seg.startTime) / durationSeconds) * 100;
            return (
              <div
                key={idx}
                className="absolute top-0 bottom-0 bg-amber-500/10 border-x border-amber-500/40 z-10 pointer-events-none flex items-start p-1.5"
                style={{ left: `${leftPct}%`, width: `${widthPct}%` }}
              >
                <span className="text-[9px] font-mono font-semibold text-amber-300 bg-slate-950/80 px-1 py-0.5 rounded truncate">
                  {seg.matchedFeature}
                </span>
              </div>
            );
          })}
        </div>

        {/* Playback Controls & Time Markers */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayToggle}
              className="p-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center shadow-sm"
              aria-label={isPlaying ? 'Pause Audio' : 'Play Audio'}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              aria-label="Restart Audio"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <div className="text-slate-400 font-mono text-[11px]">
              <span className="text-white font-semibold">{formatTime(currentTime)}</span>
              <span className="mx-1">/</span>
              <span>{formatTime(durationSeconds)}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              <span>Original Audio</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Matched Loop Segment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Matched Collision Breakdown */}
      {topMatch && topMatch.matchSegments.length > 0 ? (
        <div className="p-3.5 rounded-lg bg-slate-950/50 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              Detected Collision Segment with: {topMatch.song.title} ({topMatch.song.artist})
            </span>
            <span className="text-xs font-mono text-amber-400 font-semibold">
              {(topMatch.overallMatchPercentage)}% Match
            </span>
          </div>

          <div className="space-y-1.5">
            {topMatch.matchSegments.map((seg, i) => (
              <div key={i} className="flex items-start justify-between gap-3 text-[11px] bg-slate-900/60 p-2 rounded border border-slate-800/80">
                <div>
                  <span className="font-mono text-indigo-400 font-semibold mr-2">
                    {formatTime(seg.startTime)} - {formatTime(seg.endTime)}
                  </span>
                  <span className="text-slate-300">{seg.explanation}</span>
                </div>
                {seg.isFalsePositiveSuspect && (
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/40 shrink-0">
                    False Claim Suspect
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-800/40 flex items-center gap-2 text-xs text-emerald-300">
          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Zero waveform collisions detected. Audio spectrum passes all automated clearance thresholds.</span>
        </div>
      )}
    </div>
  );
};
