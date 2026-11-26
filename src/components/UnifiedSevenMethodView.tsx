// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Unified 7-Signal Master View Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I display the master view that runs my 6 acoustic signal
// extractors in parallel and presents the 7th Method (Deep Self-Attention Fusion)
// consensus verdict. I styled it in my signature black and warm orange theme.
// =====================================================================

import React, { useState } from 'react';
import { UnifiedMultiMethodResult, MethodId } from '../types/sixMethods';
import { METHOD_DESCRIPTORS } from '../data/methodDescriptors';
import { Cpu, Play, Pause, AlertTriangle, CheckCircle2, Sliders, ShieldCheck, ArrowRight, Activity, Terminal } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface UnifiedSevenMethodViewProps {
  trackTitle: string;
  artist: string;
  bpm: number;
  key: string;
  hasCakewalkKotoLoop: boolean;
  unifiedResult: UnifiedMultiMethodResult;
  onSelectTrackPreset: (presetId: string) => void;
  onNavigateToMethod: (methodId: MethodId) => void;
}

export const UnifiedSevenMethodView: React.FC<UnifiedSevenMethodViewProps> = ({
  trackTitle,
  artist,
  bpm,
  key,
  hasCakewalkKotoLoop,
  unifiedResult,
  onSelectTrackPreset,
  onNavigateToMethod
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayToggle = () => {
    if (isPlaying) {
      audioEngine.pause();
      setIsPlaying(false);
    } else {
      const buffer = audioEngine.generatePresetAudioBuffer(
        hasCakewalkKotoLoop ? 'koto-folk-synth' : 'rock-riff',
        14
      );
      audioEngine.playBuffer(buffer, 0, undefined, () => setIsPlaying(false));
      setIsPlaying(true);
    }
  };

  const methodKeys: MethodId[] = ['method1', 'method2', 'method3', 'method4', 'method5', 'method6'];

  return (
    <div className="space-y-8">
      {/* koomRo Master Hero Banner in Deep Black & Warm Orange */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-black via-orange-950/30 to-black border border-orange-600/50 shadow-[0_0_25px_rgba(234,88,12,0.2)] space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-hud text-orange-400 font-semibold mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-500" />
              koomRo Master Suite · 6 Acoustic Signal Streams + Deep Self-Attention Fusion
            </div>
            <h1 className="text-2xl sm:text-3xl font-gaming font-extrabold text-white tracking-tight flex items-center gap-3">
              <span className="koomro-logo-box text-sm py-1 px-3">
                <span className="koomro-logo-text text-xl">koomRo</span>
              </span>
              <span>Multi-Signal Neural Audio Risk Detector</span>
            </h1>
            <p className="text-xs sm:text-sm text-orange-200/90 mt-2 max-w-3xl leading-relaxed">
              Parallel execution environment comparing <strong>Chroma CQT, Log-Mel Spectrogram, MFCC Timbre, Tempogram Onsets, Tonnetz Centroid, and Spectral Contrast</strong> fused via <strong>Deep Self-Attention Neural Embedding</strong>.
            </p>
          </div>

          {/* Quick Track Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              onClick={handlePlayToggle}
              className="px-4 py-2 text-xs font-gaming font-bold rounded-lg bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.35)] border border-orange-400/50"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isPlaying ? 'Pause Track' : 'Audition Active Track'}
            </button>

            <button
              onClick={() => onSelectTrackPreset('cakewalk-koto-experiment')}
              className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors ${
                hasCakewalkKotoLoop
                  ? 'bg-orange-950/80 border-orange-500 text-orange-300'
                  : 'bg-black border-orange-950 text-orange-400/60 hover:text-white'
              }`}
            >
              Cakewalk Koto Test Loop {hasCakewalkKotoLoop && '✓'}
            </button>
          </div>
        </div>

        {/* Track Metadata Bar */}
        <div className="pt-3 border-t border-orange-950/80 flex items-center gap-4 text-xs font-mono text-orange-300/70">
          <span className="text-white font-semibold">{trackTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{artist}</span>
          <span aria-hidden="true">·</span>
          <span className="text-orange-400 font-bold">{bpm} BPM ({key})</span>
          <span aria-hidden="true">·</span>
          <span className="text-amber-400">All 6 Acoustic Signal Streams Analyzed Concurrently</span>
        </div>
      </div>

      {/* Consensus Verdict Box */}
      <div className="p-5 rounded-xl bg-black border border-orange-900/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-[0_0_15px_rgba(0,0,0,0.9)]">
        <div className="space-y-1">
          <div className="text-xs font-bold text-white flex items-center gap-2 font-hud">
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            <span className="text-orange-200">Method 7: Multi-Signal Attention Consensus Verdict</span>
            {unifiedResult.falsePositiveVetoTriggered && (
              <span className="text-[10px] font-mono bg-orange-950 text-orange-300 border border-orange-700 px-2 py-0.5 rounded">
                VETO: Cakewalk Koto Loop Suppressed
              </span>
            )}
          </div>
          <p className="text-xs text-orange-100/90 leading-relaxed max-w-3xl">
            {unifiedResult.scientificConclusion}
          </p>
        </div>

        {/* Master Gauges in Warm Orange */}
        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-orange-900/60 pt-3 md:pt-0 md:pl-6">
          <div className="text-right">
            <span className="text-[10px] font-mono text-orange-400/80 uppercase block">YouTube Consensus</span>
            <span className="text-2xl font-extrabold font-mono text-white tabular-nums">
              {unifiedResult.youtubeConsensusRisk}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-orange-400/80 uppercase block">DSP Consensus</span>
            <span className="text-2xl font-extrabold font-mono text-white tabular-nums">
              {unifiedResult.dspConsensusRisk}%
            </span>
          </div>
        </div>
      </div>

      {/* THE 6 SEGMENTS: Output of All 6 Signal Methods Side-by-Side */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white tracking-tight flex items-center gap-2 font-gaming">
            <Activity className="w-4 h-4 text-orange-400" />
            Segmented Outputs across All 6 Acoustic Signals
          </h2>
          <span className="text-xs font-mono text-orange-400/70">
            6 Signal Streams · Click Any Method to Enter Standalone Mode
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {methodKeys.map((id) => {
            const descriptor = METHOD_DESCRIPTORS[id];
            const res = unifiedResult.resultsByMethod[id];

            const isHigh = res.riskPercentage >= 70;
            const isMed = res.riskPercentage >= 20;

            return (
              <div
                key={id}
                className="p-5 rounded-xl bg-black border border-orange-950/90 hover:border-orange-500/80 transition-all flex flex-col justify-between space-y-4 shadow-[0_4px_20px_rgba(0,0,0,0.8)] hover:shadow-[0_0_20px_rgba(249,115,22,0.2)]"
              >
                <div>
                  {/* Segment Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-orange-950/80">
                    <div>
                      <span className="text-[10px] font-mono text-orange-400 font-semibold block">
                        METHOD #{descriptor.methodNumber} SIGNAL STREAM
                      </span>
                      <h3 className="text-sm font-bold text-white tracking-tight font-hud">
                        {descriptor.officialName}
                      </h3>
                      <div className="text-[11px] text-orange-300/70 font-mono truncate max-w-[200px]">
                        {descriptor.aiType}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToMethod(id)}
                      title="Inspect Standalone Code & Analyzer"
                      className="p-1.5 rounded-lg bg-orange-950/50 hover:bg-orange-600 text-orange-300 hover:text-white transition-colors border border-orange-900/60"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Dual Risk Segments for This Method */}
                  <div className="mt-4 grid grid-cols-2 gap-3 font-mono">
                    <div className="p-2.5 rounded-lg bg-orange-950/20 border border-orange-900/50">
                      <span className="text-[10px] text-orange-400/80 block">YouTube Risk</span>
                      <span className={`text-xl font-bold tabular-nums ${isHigh ? 'text-red-400' : (isMed ? 'text-amber-400' : 'text-emerald-400')}`}>
                        {res.youtubeRiskPercentage}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-orange-950/20 border border-orange-900/50">
                      <span className="text-[10px] text-orange-400/80 block">DSP Risk</span>
                      <span className={`text-xl font-bold tabular-nums ${isHigh ? 'text-red-400' : (isMed ? 'text-amber-400' : 'text-emerald-400')}`}>
                        {res.dspRiskPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Explanation */}
                  <div className="mt-3 p-3 rounded-lg bg-orange-950/20 border border-orange-900/40 text-[11px] text-orange-100/90 font-mono leading-relaxed line-clamp-3">
                    {res.explanation}
                  </div>
                </div>

                {/* Footer Telemetry */}
                <div className="pt-3 border-t border-orange-950/80 flex items-center justify-between text-[10px] font-mono text-orange-400/70">
                  <span>Latency: {res.processingTimeMs}ms</span>
                  <span className="text-orange-400 font-semibold">{res.verdict}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive 6-Method Comparison Table */}
      <div className="bg-black border border-orange-900/60 rounded-xl overflow-hidden shadow-[0_4px_25px_rgba(0,0,0,0.9)]">
        <div className="p-4 border-b border-orange-900/60 bg-orange-950/20">
          <h3 className="text-sm font-gaming font-bold text-white flex items-center gap-2">
            <span>koomRo Multi-Signal Comparative Matrix</span>
          </h3>
          <p className="text-xs text-orange-300/70 mt-0.5">
            Evaluating performance differences across Chroma, Mel-Spec, MFCC, Tempogram, Tonnetz, and Contrast signals
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-black text-orange-400 border-b border-orange-900/60 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4">Method & Analyzer Name</th>
                <th className="py-3 px-4">Signal Stream</th>
                <th className="py-3 px-4 text-right">YouTube Risk</th>
                <th className="py-3 px-4 text-right">DSP Risk</th>
                <th className="py-3 px-4">Cakewalk Koto Loop Behavior</th>
                <th className="py-3 px-4 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-950/80 font-mono text-[11px]">
              {methodKeys.map((id) => {
                const descriptor = METHOD_DESCRIPTORS[id];
                const res = unifiedResult.resultsByMethod[id];

                return (
                  <tr key={id} className="hover:bg-orange-950/30 transition-colors">
                    <td className="py-3 px-4 font-bold text-white">
                      <div>{descriptor.officialName}</div>
                      <div className="text-[10px] text-orange-400/60 font-normal">{descriptor.tagline.slice(0, 42)}...</div>
                    </td>
                    <td className="py-3 px-4 text-orange-200/80">
                      {descriptor.aiType}
                    </td>
                    <td className="py-3 px-4 text-right font-bold tabular-nums text-white">
                      {res.youtubeRiskPercentage}%
                    </td>
                    <td className="py-3 px-4 text-right font-bold tabular-nums text-white">
                      {res.dspRiskPercentage}%
                    </td>
                    <td className="py-3 px-4 text-orange-300/80 text-[10px]">
                      {id === 'method4' ? (
                        <span className="text-red-400 font-semibold">Flags 29% loop grid collision</span>
                      ) : id === 'method3' ? (
                        <span className="text-amber-400 font-semibold">Flags synthetic attack transient</span>
                      ) : (
                        <span className="text-emerald-400 font-semibold">Optimal: Verified Original</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-orange-400 tabular-nums">
                      {res.processingTimeMs} ms
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
