import React, { useState } from 'react';
import { MethodId, SingleMethodResult } from '../types/sixMethods';
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
      {/* Standalone Website Hero Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-indigo-400 font-semibold mb-1">
              Method #{descriptor.methodNumber} Standalone Website & Engine
            </div>
            <h1 className="text-2xl font-extrabold text-white tracking-tight">
              {descriptor.officialName}
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {descriptor.tagline}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowCodeDrawer(!showCodeDrawer)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-2 shadow-sm"
            >
              <Code className="w-3.5 h-3.5" />
              {showCodeDrawer ? 'Hide Website Code' : 'View & Download Code'}
            </button>
          </div>
        </div>

        {/* Tech Stack Pills as clean text list */}
        <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono">
          <span className="text-slate-300 font-semibold">Tech Stack:</span>
          {descriptor.techStackFrontend.map((item, idx) => (
            <span key={idx} className="text-slate-300">
              {item} {idx < descriptor.techStackFrontend.length - 1 && '·'}
            </span>
          ))}
          <span className="text-slate-600">|</span>
          <span className="text-indigo-400">{descriptor.techStackBackend.join(' · ')}</span>
        </div>
      </div>

      {/* Main Analyzer Interface for This Specific Method */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Audio Player & Platform Risk Metrics */}
        <div className="lg:col-span-2 space-y-5">
          {/* Active Audio Player Card */}
          <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-white block">{trackTitle}</span>
                <span className="text-[11px] text-slate-400">{artist} · {bpm} BPM · {key}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handlePlayToggle}
                  className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center gap-1.5"
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  {isPlaying ? 'Pause' : 'Play Audio'}
                </button>
              </div>
            </div>

            {/* Quick Test Preset Switcher */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-mono text-[11px]">Test Presets:</span>
              <button
                onClick={() => onSelectTrackPreset('cakewalk-koto-experiment')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  hasCakewalkKotoLoop ? 'bg-amber-950/70 border-amber-600 text-amber-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Cakewalk Koto Beat (False Positive Test)
              </button>
              <button
                onClick={() => onSelectTrackPreset('pure-original-rock')}
                className={`px-2.5 py-1 text-[11px] rounded border transition-colors ${
                  !hasCakewalkKotoLoop ? 'bg-indigo-950/70 border-indigo-600 text-indigo-300' : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                Pure Original Rock Riff
              </button>
            </div>

            {/* Method Diagnostic Explanation Card */}
            <div className="p-3.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs text-slate-300 leading-relaxed font-mono">
              <span className="text-indigo-400 font-bold block mb-1">
                [{descriptor.officialName} Execution Output]:
              </span>
              {result.explanation}
            </div>
          </div>

          {/* Dual Risk Gauges for this Method */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* YouTube Content ID */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">YouTube Content ID Risk</span>
                <span className="text-xs font-mono text-slate-400">Tier: {result.riskTier}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {result.youtubeRiskPercentage}%
                </span>
                <span className="text-xs text-slate-400 font-mono">match probability</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.youtubeRiskPercentage > 50 ? 'bg-red-500' : (result.youtubeRiskPercentage > 15 ? 'bg-amber-500' : 'bg-emerald-500')}`}
                  style={{ width: `${Math.max(3, result.youtubeRiskPercentage)}%` }}
                />
              </div>
            </div>

            {/* DSP Platforms */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">Music Distribution (DSP) Risk</span>
                <span className="text-xs font-mono text-slate-400">{result.verdict}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-extrabold font-mono text-white tabular-nums">
                  {result.dspRiskPercentage}%
                </span>
                <span className="text-xs text-slate-400 font-mono">Spotify/DistroKid risk</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full ${result.dspRiskPercentage > 50 ? 'bg-red-500' : (result.dspRiskPercentage > 15 ? 'bg-amber-500' : 'bg-emerald-500')}`}
                  style={{ width: `${Math.max(3, result.dspRiskPercentage)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Col: Architectural Telemetry & Academic Evaluation */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold text-white tracking-tight uppercase font-mono">
              Method Architecture Specs
            </h3>
            
            <div className="space-y-2 text-xs font-mono text-slate-300">
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-500">Latency:</span>
                <span className="text-indigo-400">{result.processingTimeMs} ms</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-500">Model Confidence:</span>
                <span className="text-emerald-400">{(result.confidence * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/80">
                <span className="text-slate-500">Cakewalk Koto Status:</span>
                <span className={hasCakewalkKotoLoop ? 'text-amber-400' : 'text-slate-400'}>
                  {hasCakewalkKotoLoop ? 'Detected & Analyzed' : 'Clean Audio'}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Academic Paradigm:</span>
                <span className="text-slate-300 text-right truncate max-w-[140px]">{descriptor.aiType}</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <h4 className="font-bold text-white">Teacher & Thesis Defense Note</h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {descriptor.academicUsefulness}
            </p>
          </div>
        </div>

      </div>

      {/* Code Drawer: Full Frontend & Backend Source Code for This Method */}
      {showCodeDrawer && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-indigo-900/60 shadow-xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-indigo-400" />
                Source Code Repository for {descriptor.officialName}
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Complete, runnable Python backend and React frontend source files for this method
              </p>
            </div>

            {/* File Switcher Tabs */}
            <div className="flex items-center gap-1.5 overflow-x-auto">
              {codePkg?.files.map((file, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCodeFileIndex(i)}
                  className={`px-3 py-1.5 text-xs font-mono rounded transition-colors whitespace-nowrap ${
                    activeCodeFileIndex === i
                      ? 'bg-indigo-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {file.filename}
                </button>
              ))}
            </div>
          </div>

          {/* Execution Instructions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-indigo-400 font-semibold text-[11px] block">Backend Instructions:</span>
              {codePkg?.backendInstructions.map((step, idx) => (
                <div key={idx} className="text-slate-300 text-[11px]">{step}</div>
              ))}
            </div>
            <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
              <span className="text-emerald-400 font-semibold text-[11px] block">Frontend Instructions:</span>
              {codePkg?.frontendInstructions.map((step, idx) => (
                <div key={idx} className="text-slate-300 text-[11px]">{step}</div>
              ))}
            </div>
          </div>

          {/* Active Code Block */}
          {activeCodeFile && (
            <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-950">
              <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between">
                <span className="text-xs font-mono text-slate-300">{activeCodeFile.filename} · {activeCodeFile.purpose}</span>
                <button
                  onClick={() => handleCopyCode(activeCodeFile.code)}
                  className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-800 hover:bg-slate-700 rounded transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <pre className="p-4 text-xs font-mono text-slate-200 overflow-x-auto max-h-[380px] leading-relaxed select-text">
                {activeCodeFile.code}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
