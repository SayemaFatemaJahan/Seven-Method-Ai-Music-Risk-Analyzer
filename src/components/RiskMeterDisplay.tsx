import React from 'react';
import { Youtube, Disc3, ShieldAlert, CheckCircle2, AlertTriangle, Info, ArrowUpRight } from 'lucide-react';
import { RiskBreakdown } from '../types/music';

interface RiskMeterDisplayProps {
  risk: RiskBreakdown;
  filterEnabled: boolean;
  onToggleFilter: () => void;
}

export const RiskMeterDisplay: React.FC<RiskMeterDisplayProps> = ({
  risk,
  filterEnabled,
  onToggleFilter
}) => {
  // Color helper based on percentage
  const getRiskColors = (pct: number) => {
    if (pct >= 70) {
      return {
        text: 'text-red-400',
        bg: 'bg-red-500',
        border: 'border-red-800/80',
        cardBg: 'bg-red-950/20',
        label: 'Critical / High Risk'
      };
    } else if (pct >= 50) {
      return {
        text: 'text-amber-400',
        bg: 'bg-amber-500',
        border: 'border-amber-800/80',
        cardBg: 'bg-amber-950/20',
        label: 'Moderate / Licensing Flag'
      };
    } else if (pct >= 20) {
      return {
        text: 'text-yellow-400',
        bg: 'bg-yellow-500',
        border: 'border-yellow-800/80',
        cardBg: 'bg-yellow-950/20',
        label: 'Elevated / Loop Collision'
      };
    } else {
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500',
        border: 'border-emerald-800/80',
        cardBg: 'bg-emerald-950/20',
        label: 'Safe / Low Risk'
      };
    }
  };

  const ytColor = getRiskColors(risk.youtubeRiskPercentage);
  const dspColor = getRiskColors(risk.dspRiskPercentage);

  return (
    <div className="space-y-6">
      {/* Why YouTube 0% does NOT equal DSP 0% banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="font-semibold text-white">
            Architectural Principle: YouTube Content ID vs Music Distribution Platforms (DSPs)
          </div>
          <p className="text-slate-400 leading-relaxed text-[11px]">
            YouTube Content ID scans specifically for identical recorded masters and direct melodies on monetized videos. In contrast, digital music distributors (DistroKid, TuneCore, Spotify, Apple Music) enforce mechanical license clearances, anti-fraud duplicate loop bans, and ISRC registry conflicts. Therefore, <strong>0% YouTube Risk does not mean 0% Music Distribution Risk</strong>.
          </p>
        </div>
      </div>

      {/* Dual Risk Meter Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SEGMENT 1: YouTube Content ID Copyright Risk */}
        <div className={`p-6 rounded-xl border ${ytColor.border} ${ytColor.cardBg} bg-slate-900/90 shadow-sm flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
                  <Youtube className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    YouTube Content ID Copyright Risk
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    Automated Video Match & Monetization Protection
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Risk Level</span>
                <span className={`text-xs font-bold font-mono ${ytColor.text}`}>
                  {risk.youtubeRiskTier} ({ytColor.label})
                </span>
              </div>
            </div>

            {/* Gauge Display & Percentage */}
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                  {risk.youtubeRiskPercentage}%
                </span>
                <span className="text-xs text-slate-400 ml-2 font-medium">
                  risk of getting copyright claims on YouTube
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-mono">Monetization</div>
                <div className={`text-xs font-semibold ${risk.youtubeMonetizationStatus === 'Fully Monetizable' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {risk.youtubeMonetizationStatus}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${ytColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.youtubeRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className={risk.youtubeRiskPercentage <= 10 ? 'text-emerald-400 font-bold' : ''}>1% Clean</span>
                <span className={risk.youtubeRiskPercentage > 10 && risk.youtubeRiskPercentage <= 30 ? 'text-yellow-400 font-bold' : ''}>20% Loop</span>
                <span className={risk.youtubeRiskPercentage > 30 && risk.youtubeRiskPercentage <= 60 ? 'text-amber-400 font-bold' : ''}>50% Melody</span>
                <span className={risk.youtubeRiskPercentage > 60 && risk.youtubeRiskPercentage <= 75 ? 'text-orange-400 font-bold' : ''}>70% Stem</span>
                <span className={risk.youtubeRiskPercentage >= 76 ? 'text-red-400 font-bold' : ''}>80%+ Strike</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white block mb-0.5">Platform Analysis:</span>
              {risk.youtubeConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Waveform Match: {(risk.waveformMatchConfidence * 100).toFixed(0)}%</span>
            <span>Spectral Confidence: {(risk.spectralMatchConfidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* SEGMENT 2: Music Distribution Platforms (DSP) Risk */}
        <div className={`p-6 rounded-xl border ${dspColor.border} ${dspColor.cardBg} bg-slate-900/90 shadow-sm flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
                  <Disc3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight">
                    Music Distribution Platforms (DSP) Risk
                  </h3>
                  <div className="text-[11px] text-slate-400">
                    DistroKid, TuneCore, Spotify & Apple Music Clearance
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">Risk Level</span>
                <span className={`text-xs font-bold font-mono ${dspColor.text}`}>
                  {risk.dspRiskTier} ({dspColor.label})
                </span>
              </div>
            </div>

            {/* Gauge Display & Percentage */}
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold font-mono text-white tracking-tight tabular-nums">
                  {risk.dspRiskPercentage}%
                </span>
                <span className="text-xs text-slate-400 ml-2 font-medium">
                  risk of getting claims or rejections on DSP platforms
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-slate-400 font-mono">Store Delivery</div>
                <div className={`text-xs font-semibold ${risk.dspApprovalLikelihood === 'Guaranteed Store Ingestion' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {risk.dspApprovalLikelihood}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${dspColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.dspRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-slate-500 pt-1">
                <span className={risk.dspRiskPercentage <= 10 ? 'text-emerald-400 font-bold' : ''}>1% Approved</span>
                <span className={risk.dspRiskPercentage > 10 && risk.dspRiskPercentage <= 30 ? 'text-yellow-400 font-bold' : ''}>20% Notice</span>
                <span className={risk.dspRiskPercentage > 30 && risk.dspRiskPercentage <= 60 ? 'text-amber-400 font-bold' : ''}>50% License</span>
                <span className={risk.dspRiskPercentage > 60 && risk.dspRiskPercentage <= 75 ? 'text-orange-400 font-bold' : ''}>70% Freeze</span>
                <span className={risk.dspRiskPercentage >= 76 ? 'text-red-400 font-bold' : ''}>80%+ Rejected</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-slate-950/60 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <span className="font-semibold text-white block mb-0.5">Ingestion Diagnostic:</span>
              {risk.dspConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Tempo Match: {(risk.tempoMatchConfidence * 100).toFixed(0)}%</span>
            <span>Blockchain Stem Proof: Active</span>
          </div>
        </div>

      </div>

      {/* Research Experiment Callout: Live False Positive Reduction Toggle */}
      <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-2">
            <span>Virtual Instrument Loop De-Biasing Filter (Cakewalk Koto Suppression)</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${filterEnabled ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-slate-800 text-slate-400'}`}>
              {filterEnabled ? 'ACTIVE: -24dB Suppression' : 'DISABLED'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Standard acoustic matching shows <strong>{risk.rawFalsePositiveRisk}% false claim match</strong>. When filter is ON, neural stem de-biasing reduces false claims to <strong>{risk.filteredFalsePositiveRisk}%</strong>!
          </p>
        </div>

        <button
          onClick={onToggleFilter}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            filterEnabled
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
          }`}
        >
          {filterEnabled ? 'Filter Enabled (Low Risk)' : 'Enable Filter (Reduce False Match)'}
        </button>
      </div>
    </div>
  );
};
