// =====================================================================
// koomRo - Standalone Method View Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I render the standalone diagnostic view and DSP metrics
// for individual acoustic signal methods in my deep orange on black theme.
// =====================================================================

import React, { useState } from 'react';
import { MethodId, SingleMethodResult } from '../types/sevenMethods';
import { METHOD_DESCRIPTORS } from '../data/methodDescriptors';
import { METHOD_CODE_PACKAGES } from '../data/methodCodeBases';
import { Code, Play, Pause, Activity, ShieldCheck, AlertCircle, Copy, Check, Terminal, ExternalLink, Zap } from 'lucide-react';
import { audioEngine } from '../services/audioEngine';

interface MethodWebsiteViewProps {
  methodId: MethodId;
  trackTitle: string;
  artist: string;
  bpm: number;
  key: string;
  hasCakewalkKotoLoop: boolean;
  result: SingleMethodResult;
  onOpenReport: () => void;
  onSelectTrackPreset: (presetId: string) => void;
}

export const MethodWebsiteView: React.FC<MethodWebsiteViewProps> = ({
  methodId,
  trackTitle,
  artist,
  bpm,
  key,
  hasCakewalkKotoLoop,
  result,
  onOpenReport,
  onSelectTrackPreset
}) => {
  const descriptor = METHOD_DESCRIPTORS[methodId];
  const codePkg = METHOD_CODE_PACKAGES[methodId];

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeCodeFileIndex, setActiveCodeFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [showCodeDrawer, setShowCodeDrawer] = useState(false);

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

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCodeFile = codePkg?.files[activeCodeFileIndex] || codePkg?.files[0];

  return (
    <div className="space-y-6">
      {/* Standalone Website Hero Banner in Deep Black & Orange */}
      <div className="p-6 rounded-xl bg-black border border-neutral-900 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-orange-400 font-semibold mb-1">
              Method #{descriptor.methodNumber} Signal Stream & Engine
            </div>
            <h1 className="text-2xl font-gaming font-bold text-white tracking-tight">
              {descriptor.officialName}
            </h1>
            <p className="text-xs text-orange-400 mt-1 max-w-2xl leading-relaxed">
              {descriptor.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCodeDrawer(!showCodeDrawer)}
              className="px-3.5 py-2 text-xs font-hud font-bold rounded-lg bg-orange-700 hover:bg-orange-600 text-white transition-colors flex items-center gap-2"
            >
              <span className="icon-box-black w-4 h-4 rounded bg-black text-orange-400">
                <Code className="w-3.5 h-3.5" />
              </span>
              <span>{showCodeDrawer ? 'Hide Signal Code' : 'View & Download Code'}</span>
            </button>
          </div>
        </div>

        {/* Tech Stack Pills with Orange Subtext */}
        <div className="pt-3 border-t border-neutral-900 flex flex-wrap items-center gap-3 text-xs text-orange-400 font-mono">
          <span className="text-white font-semibold">Signal Processing Stack:</span>
          {descriptor.techStackFrontend.map((item, idx) => (
            <span key={idx} className="text-orange-300">
              {item} {idx < descriptor.techStackFrontend.length - 1 && '·'}
            </span>
          ))}
          <span className="text-neutral-700">|</span>
          <span className="text-orange-500 font-bold">{descriptor.techStackBackend.join(' · ')}</span>
        </div>
      </div>

      {/* Main Analyzer Interface for This Specific Method */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Audio Player & Platform Risk Metrics */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Audio Player Card */}
          <div className="p-5 rounded-xl bg-black border border-neutral-900 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-900">
              <div>
                <span className="text-xs font-bold text-white block">{trackTitle}</span>
                <span className="text-[11px] text-orange-400">{artist} · {bpm} BPM · {key}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayToggle}
                  className="px-3 py-1.5 text-xs font-hud font-bold rounded-lg bg-orange-700 hover:bg-orange-600 text-white transition-colors flex items-center gap-1.5"
                >
                  <span className="icon-box-black w-4 h-4 rounded bg-black text-orange-400">
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </span>
                  <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
                </button>
              </div>
            </div>

            {/* Quick Test Preset Switcher */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-orange-400 font-mono text-[11px]">Test Presets:</span>
              <button
                onClick={() => onSelectTrackPreset('cakewalk-koto-experiment')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  hasCakewalkKotoLoop ? 'bg-black border-orange-600 text-orange-400' : 'bg-black border-neutral-900 text-orange-400/60'
                }`}
              >
                Cakewalk Koto Beat (False Positive Test)
              </button>
              <button
                onClick={() => onSelectTrackPreset('pure-original-rock')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  !hasCakewalkKotoLoop ? 'bg-black border-orange-600 text-orange-400' : 'bg-black border-neutral-900 text-orange-400/60'
                }`}
              >
                Pure Original Rock Riff
              </button>
            </div>

            {/* Method Diagnostic Explanation Card */}
            <div className="p-3.5 rounded-lg bg-black border border-neutral-900 text-xs text-orange-300 leading-relaxed font-mono">
              <span className="text-orange-500 font-bold block mb-1">
                [{descriptor.officialName} Execution Output]:
              </span>
              {result.explanation}
            </div>
          </div>

          {/* Dual Risk Gauges for this Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* YouTube Content ID */}
            <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white font-hud">YouTube Content ID Risk</span>
                <span className="text-xs font-mono text-orange-400">Tier: {result.riskTier}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {result.youtubeRiskPercentage}%
                </span>
                <span className="text-xs text-orange-400 font-mono">match probability</span>
              </div>
              <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.youtubeRiskPercentage > 50 ? 'bg-red-500' : (result.youtubeRiskPercentage > 15 ? 'bg-orange-500' : 'bg-emerald-500')}`}
                  style={{ width: `${Math.max(3, result.youtubeRiskPercentage)}%` }}
                />
              </div>
            </div>

            {/* DSP Platforms */}
            <div className="p-4 rounded-xl bg-black border border-neutral-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white font-hud">Music Distribution (DSP) Risk</span>
                <span className="text-xs font-mono text-orange-400">{result.verdict}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {result.dspRiskPercentage}%
                </span>
                <span className="text-xs text-orange-400 font-mono">Spotify/DistroKid risk</span>
              </div>
              <div className="w-full h-2 bg-neutral-950 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.dspRiskPercentage > 50 ? 'bg-red-500' : (result.dspRiskPercentage > 15 ? 'bg-orange-500' : 'bg-emerald-500')}`}
                  style={{ width: `${Math.max(3, result.dspRiskPercentage)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Architectural Telemetry & Academic Evaluation */}
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-black border border-neutral-900 space-y-4">
            <h3 className="text-sm font-gaming font-bold text-white flex items-center gap-2">
              <span className="icon-box-black w-5 h-5 rounded bg-black text-orange-500">
                <Activity className="w-4 h-4" />
              </span>
              <span>Acoustic Signal Telemetry</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-orange-400">Processing Time</span>
                <span className="text-white font-bold">{result.processingTimeMs} ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-orange-400">Confidence Score</span>
                <span className="text-white font-bold">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-orange-400">Detected Key</span>
                <span className="text-orange-400">{result.detectedFeatures.harmonicKey}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-900">
                <span className="text-orange-400">Detected Tempo</span>
                <span className="text-orange-400">{result.detectedFeatures.tempoBpm} BPM</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-orange-400 block mb-1">Thesis Evaluation:</span>
              <p className="text-xs text-orange-300 leading-relaxed">
                {descriptor.academicUsefulness}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Drawer: Complete Code File Viewer */}
      {showCodeDrawer && codePkg && (
        <div className="p-5 rounded-xl bg-black border border-neutral-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-900">
            <div>
              <h3 className="text-sm font-gaming font-bold text-white flex items-center gap-2">
                <span className="icon-box-black w-5 h-5 rounded bg-black text-orange-500">
                  <Terminal className="w-4 h-4" />
                </span>
                <span>Signal Source Code Inspector</span>
              </h3>
              <p className="text-xs text-orange-400 mt-0.5">
                {codePkg.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCode(activeCodeFile?.code || '')}
                className="px-3 py-1.5 text-xs font-hud font-bold rounded-lg bg-black hover:bg-neutral-900 text-orange-400 border border-neutral-800 transition-colors flex items-center gap-1.5"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-lg bg-black border border-neutral-900 text-xs font-mono text-orange-300 overflow-x-auto max-h-96">
            <code>{activeCodeFile?.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
