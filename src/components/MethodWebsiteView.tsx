// =====================================================================
// koomRo - Standalone Method View Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I render the standalone diagnostic view and DSP metrics
// for individual acoustic signal methods on a clean white background with
// all-black text and deep pumpkin orange accents for segment headings.
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
    <div className="space-y-6 bg-white text-black font-sans">
      {/* Standalone Website Hero Banner in Clean White Card */}
      <div className="p-6 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-orange-600 font-bold mb-1">
              Method #{descriptor.methodNumber} Signal Stream & Engine
            </div>
            <h1 className="text-2xl font-gaming font-bold text-orange-600 tracking-tight">
              {descriptor.officialName}
            </h1>
            <p className="text-xs text-neutral-700 mt-1 max-w-2xl leading-relaxed">
              {descriptor.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCodeDrawer(!showCodeDrawer)}
              className="px-3.5 py-2 text-xs font-hud font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center gap-2 shadow-xs"
            >
              <Code className="w-3.5 h-3.5 text-white" />
              <span>{showCodeDrawer ? 'Hide Signal Code' : 'View & Download Code'}</span>
            </button>
          </div>
        </div>

        {/* Tech Stack Pills with Black Text and Pumpkin Orange Highlights */}
        <div className="pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-3 text-xs text-neutral-800 font-mono">
          <span className="text-black font-bold font-hud">Signal Processing Stack:</span>
          {descriptor.techStackFrontend.map((item, idx) => (
            <span key={idx} className="text-neutral-700">
              {item} {idx < descriptor.techStackFrontend.length - 1 && '·'}
            </span>
          ))}
          <span className="text-neutral-400">|</span>
          <span className="text-orange-600 font-bold">{descriptor.techStackBackend.join(' · ')}</span>
        </div>
      </div>

      {/* Main Analyzer Interface for This Specific Method */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Audio Player & Platform Risk Metrics */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Audio Player Card */}
          <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
              <div>
                <span className="text-xs font-bold text-black block">{trackTitle}</span>
                <span className="text-[11px] text-neutral-600">{artist} · <strong className="text-orange-600">{bpm} BPM</strong> · {key}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayToggle}
                  className="px-3 py-1.5 text-xs font-hud font-bold rounded-lg bg-orange-600 hover:bg-orange-700 text-white transition-colors flex items-center gap-1.5 shadow-xs"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5 text-white" /> : <Play className="w-3.5 h-3.5 text-white" />}
                  <span>{isPlaying ? 'Pause' : 'Play Audio'}</span>
                </button>
              </div>
            </div>

            {/* Quick Test Preset Switcher */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-neutral-600 font-mono text-[11px] font-semibold">Test Presets:</span>
              <button
                onClick={() => onSelectTrackPreset('cakewalk-koto-experiment')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  hasCakewalkKotoLoop ? 'bg-orange-50 border-orange-600 text-orange-700 font-bold' : 'bg-white border-neutral-300 text-black hover:border-neutral-400'
                }`}
              >
                Cakewalk Koto Beat (False Positive Test)
              </button>
              <button
                onClick={() => onSelectTrackPreset('pure-original-rock')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  !hasCakewalkKotoLoop ? 'bg-orange-50 border-orange-600 text-orange-700 font-bold' : 'bg-white border-neutral-300 text-black hover:border-neutral-400'
                }`}
              >
                Pure Original Rock Riff
              </button>
            </div>

            {/* Method Diagnostic Explanation Card */}
            <div className="p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-black leading-relaxed font-mono">
              <span className="text-orange-600 font-bold block mb-1">
                [{descriptor.officialName} Execution Output]:
              </span>
              {result.explanation}
            </div>
          </div>

          {/* Dual Risk Gauges for this Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* YouTube Content ID */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 font-hud">YouTube Content ID Risk</span>
                <span className="text-xs font-mono text-neutral-600">Tier: <strong className="text-black">{result.riskTier}</strong></span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-black tabular-nums">
                  {result.youtubeRiskPercentage}%
                </span>
                <span className="text-xs text-neutral-600 font-mono">match probability</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                <div
                  className={`h-full ${result.youtubeRiskPercentage > 50 ? 'bg-red-600' : (result.youtubeRiskPercentage > 15 ? 'bg-orange-600' : 'bg-emerald-600')}`}
                  style={{ width: `${Math.max(3, result.youtubeRiskPercentage)}%` }}
                />
              </div>
            </div>

            {/* DSP Platforms */}
            <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-orange-600 font-hud">Music Distribution (DSP) Risk</span>
                <span className="text-xs font-mono text-orange-600 font-bold">{result.verdict}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-black tabular-nums">
                  {result.dspRiskPercentage}%
                </span>
                <span className="text-xs text-neutral-600 font-mono">Spotify/DistroKid risk</span>
              </div>
              <div className="w-full h-2 bg-neutral-100 rounded-full overflow-hidden border border-neutral-200">
                <div
                  className={`h-full ${result.dspRiskPercentage > 50 ? 'bg-red-600' : (result.dspRiskPercentage > 15 ? 'bg-orange-600' : 'bg-emerald-600')}`}
                  style={{ width: `${Math.max(3, result.dspRiskPercentage)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Architectural Telemetry & Academic Evaluation */}
        <div className="space-y-5">
          <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
            <h3 className="text-sm font-gaming font-bold text-orange-600 flex items-center gap-2">
              <Activity className="w-4 h-4 text-orange-600" />
              <span>Acoustic Signal Telemetry</span>
            </h3>

            <div className="space-y-3 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Processing Time</span>
                <span className="text-black font-bold">{result.processingTimeMs} ms</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Confidence Score</span>
                <span className="text-black font-bold">{(result.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Detected Key</span>
                <span className="text-orange-600 font-bold">{result.detectedFeatures.harmonicKey}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-neutral-200">
                <span className="text-neutral-600">Detected Tempo</span>
                <span className="text-orange-600 font-bold">{result.detectedFeatures.tempoBpm} BPM</span>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[11px] font-mono text-neutral-500 block mb-1 font-semibold uppercase">Thesis Evaluation:</span>
              <p className="text-xs text-neutral-800 leading-relaxed">
                {descriptor.academicUsefulness}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Code Drawer: Complete Code File Viewer */}
      {showCodeDrawer && codePkg && (
        <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200">
            <div>
              <h3 className="text-sm font-gaming font-bold text-orange-600 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-orange-600" />
                <span>Signal Source Code Inspector</span>
              </h3>
              <p className="text-xs text-neutral-600 mt-0.5">
                {codePkg.title}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleCopyCode(activeCodeFile?.code || '')}
                className="px-3 py-1.5 text-xs font-hud font-bold rounded-lg bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 transition-colors flex items-center gap-1.5 shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          </div>

          <pre className="p-4 rounded-lg bg-neutral-900 border border-neutral-800 text-xs font-mono text-neutral-100 overflow-x-auto max-h-96">
            <code>{activeCodeFile?.code}</code>
          </pre>
        </div>
      )}
    </div>
  );
};
