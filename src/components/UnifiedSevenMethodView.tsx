// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Unified 7-Signal Master View Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I display the master view that runs my 6 acoustic signal
// extractors in parallel and presents the 7th Method (Deep Self-Attention Fusion)
// consensus verdict on a clean white background with black text and pumpkin orange accents.
// =====================================================================

import React, { useState } from 'react';
import { UnifiedMultiMethodResult, MethodId } from '../types/sevenMethods';
import { METHOD_DESCRIPTORS } from '../data/methodDescriptors';
import { Cpu, Play, Pause, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
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
    <div className="space-y-8 bg-white text-black">
      {/* koomRo Master Hero Banner in Clean White Card with Pumpkin Orange Accents */}
      <div className="p-6 sm:p-8 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="text-xs font-hud text-orange-600 font-bold mb-1 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-orange-600" />
              <span>koomRo Master Suite · 6 Acoustic Signal Streams + Deep Self-Attention Fusion</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-gaming font-bold text-black tracking-tight flex items-center gap-3">
              <span className="koomro-logo-box text-sm py-1 px-3">
                <span className="koomro-logo-text text-xl">koomRo</span>
              </span>
              <span>Multi-Signal Neural Audio Risk Detector</span>
            </h1>
            <p className="text-xs sm:text-sm text-neutral-700 mt-2 max-w-3xl leading-relaxed">
              Parallel execution environment comparing <strong>Chroma CQT, Log-Mel Spectrogram, MFCC Timbre, Tempogram Onsets, Tonnetz Centroid, and Spectral Contrast</strong> fused via <strong>Deep Self-Attention Neural Embedding</strong>.
            </p>
          </div>

          {/* Quick Track Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              onClick={handlePlayToggle}
              className="px-4 py-2 text-xs font-hud font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center gap-2 shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause Track' : 'Audition Active Track'}</span>
            </button>

            <button
              onClick={() => onSelectTrackPreset('cakewalk-koto-experiment')}
              className={`px-3 py-2 text-xs font-mono rounded-lg border transition-colors ${
                hasCakewalkKotoLoop
                  ? 'bg-orange-50 border-orange-600 text-orange-700 font-semibold'
                  : 'bg-white border-neutral-300 text-black hover:border-neutral-400'
              }`}
            >
              Cakewalk Koto Test Loop {hasCakewalkKotoLoop && '✓'}
            </button>
          </div>
        </div>

        {/* Track Metadata Bar in Clean Black */}
        <div className="pt-3 border-t border-neutral-200 flex items-center gap-4 text-xs font-mono text-neutral-800">
          <span className="text-black font-bold">{trackTitle}</span>
          <span aria-hidden="true">·</span>
          <span>{artist}</span>
          <span aria-hidden="true">·</span>
          <span className="text-orange-600 font-bold">{bpm} BPM ({key})</span>
          <span aria-hidden="true">·</span>
          <span className="text-neutral-600">All 6 Acoustic Signal Streams Analyzed Concurrently</span>
        </div>
      </div>

      {/* Consensus Verdict Box */}
      <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-bold text-black flex items-center gap-2 font-hud">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span className="text-orange-600 text-sm font-bold">Method 7: Multi-Signal Attention Consensus Verdict</span>
            {unifiedResult.falsePositiveVetoTriggered && (
              <span className="text-[10px] font-mono bg-orange-50 text-orange-700 border border-orange-600 px-2 py-0.5 rounded font-semibold">
                VETO: Cakewalk Koto Loop Suppressed
              </span>
            )}
          </div>
          <p className="text-xs text-neutral-800 leading-relaxed max-w-3xl">
            {unifiedResult.scientificConclusion}
          </p>
        </div>

        {/* Master Gauges */}
        <div className="flex items-center gap-6 shrink-0 border-t md:border-t-0 md:border-l border-neutral-200 pt-3 md:pt-0 md:pl-6">
          <div className="text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">YouTube Consensus</span>
            <span className="text-2xl font-extrabold font-mono text-black tabular-nums">
              {unifiedResult.youtubeConsensusRisk}%
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-neutral-500 uppercase block font-semibold">DSP Consensus</span>
            <span className="text-2xl font-extrabold font-mono text-black tabular-nums">
              {unifiedResult.dspConsensusRisk}%
            </span>
          </div>
        </div>
      </div>

      {/* THE 6 SEGMENTS: Output of All 6 Signal Methods Side-by-Side */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold tracking-tight flex items-center gap-2 font-gaming text-orange-600">
            <Activity className="w-4 h-4 text-orange-600" />
            <span>Segmented Outputs across All 6 Acoustic Signals</span>
          </h2>
          <span className="text-xs font-mono text-neutral-600">
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
                className="p-5 rounded-xl bg-white border border-neutral-200 hover:border-orange-500 transition-colors flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div>
                  {/* Segment Header */}
                  <div className="flex items-start justify-between gap-2 pb-3 border-b border-neutral-200">
                    <div>
                      <span className="text-[10px] font-mono text-orange-600 font-bold block uppercase">
                        METHOD #{descriptor.methodNumber} SIGNAL STREAM
                      </span>
                      <h3 className="text-sm font-bold text-black tracking-tight font-hud">
                        {descriptor.officialName}
                      </h3>
                      <div className="text-[11px] text-neutral-600 font-mono truncate max-w-[200px]">
                        {descriptor.aiType}
                      </div>
                    </div>

                    <button
                      onClick={() => onNavigateToMethod(id)}
                      title="Inspect Standalone Code & Analyzer"
                      className="w-7 h-7 rounded bg-neutral-100 hover:bg-orange-600 hover:text-white text-black transition-colors flex items-center justify-center"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Dual Risk Segments for This Method */}
                  <div className="mt-4 grid grid-cols-2 gap-3 font-mono">
                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-600 block">YouTube Risk</span>
                      <span className={`text-xl font-bold tabular-nums ${isHigh ? 'text-red-600' : (isMed ? 'text-orange-600' : 'text-emerald-600')}`}>
                        {res.youtubeRiskPercentage}%
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-neutral-50 border border-neutral-200">
                      <span className="text-[10px] text-neutral-600 block">DSP Risk</span>
                      <span className={`text-xl font-bold tabular-nums ${isHigh ? 'text-red-600' : (isMed ? 'text-orange-600' : 'text-emerald-600')}`}>
                        {res.dspRiskPercentage}%
                      </span>
                    </div>
                  </div>

                  {/* Diagnostic Explanation */}
                  <div className="mt-3 p-3 rounded-lg bg-neutral-50 border border-neutral-200 text-[11px] text-black font-mono leading-relaxed line-clamp-3">
                    {res.explanation}
                  </div>
                </div>

                {/* Footer Telemetry */}
                <div className="pt-3 border-t border-neutral-200 flex items-center justify-between text-[10px] font-mono text-neutral-600">
                  <span>Latency: {res.processingTimeMs}ms</span>
                  <span className="text-orange-600 font-bold">{res.verdict}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Comprehensive 6-Method Comparison Table in Clean White */}
      <div className="bg-white border border-neutral-200 rounded-xl overflow-hidden shadow-xs">
        <div className="p-4 border-b border-neutral-200 bg-neutral-50">
          <h3 className="text-sm font-gaming font-bold text-orange-600 flex items-center gap-2">
            <span>koomRo Multi-Signal Comparative Matrix</span>
          </h3>
          <p className="text-xs text-neutral-600 mt-0.5">
            Evaluating performance differences across Chroma, Mel-Spec, MFCC, Tempogram, Tonnetz, and Contrast signals
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-700 border-b border-neutral-200 font-mono text-[11px]">
              <tr>
                <th className="py-3 px-4 font-bold text-black">Method & Analyzer Name</th>
                <th className="py-3 px-4">Signal Stream</th>
                <th className="py-3 px-4 text-right">YouTube Risk</th>
                <th className="py-3 px-4 text-right">DSP Risk</th>
                <th className="py-3 px-4">Cakewalk Koto Loop Behavior</th>
                <th className="py-3 px-4 text-right">Latency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 font-mono text-[11px]">
              {methodKeys.map((id) => {
                const descriptor = METHOD_DESCRIPTORS[id];
                const res = unifiedResult.resultsByMethod[id];

                return (
                  <tr key={id} className="hover:bg-neutral-50 transition-colors">
                    <td className="py-3 px-4 font-bold text-black">
                      <div>{descriptor.officialName}</div>
                      <div className="text-[10px] text-neutral-500 font-normal">{descriptor.tagline.slice(0, 42)}...</div>
                    </td>
                    <td className="py-3 px-4 text-neutral-800">
                      {descriptor.aiType}
                    </td>
                    <td className="py-3 px-4 text-right font-bold tabular-nums text-black">
                      {res.youtubeRiskPercentage}%
                    </td>
                    <td className="py-3 px-4 text-right font-bold tabular-nums text-black">
                      {res.dspRiskPercentage}%
                    </td>
                    <td className="py-3 px-4 text-neutral-800 text-[10px]">
                      {id === 'method4' ? (
                        <span className="text-red-600 font-semibold">Flags 29% loop grid collision</span>
                      ) : id === 'method3' ? (
                        <span className="text-orange-600 font-semibold">Flags synthetic attack transient</span>
                      ) : (
                        <span className="text-emerald-600 font-semibold">Optimal: Verified Original</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right text-orange-600 font-bold tabular-nums">
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
