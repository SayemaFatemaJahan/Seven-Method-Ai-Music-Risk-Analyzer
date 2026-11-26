// =====================================================================
// koomRo - Risk Meter Display Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I display the dual risk evaluation (YouTube Content ID
// vs DSP Music Distribution Platforms) using deep orange on black styling.
// =====================================================================

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
  const getRiskColors = (pct: number) => {
    if (pct >= 70) {
      return {
        text: 'text-red-400',
        bg: 'bg-red-500',
        border: 'border-red-900',
        cardBg: 'bg-black',
        label: 'Critical / High Risk'
      };
    } else if (pct >= 50) {
      return {
        text: 'text-orange-400',
        bg: 'bg-orange-600',
        border: 'border-orange-800',
        cardBg: 'bg-black',
        label: 'Moderate / Licensing Flag'
      };
    } else if (pct >= 20) {
      return {
        text: 'text-orange-300',
        bg: 'bg-orange-500',
        border: 'border-neutral-900',
        cardBg: 'bg-black',
        label: 'Elevated / Loop Collision'
      };
    } else {
      return {
        text: 'text-emerald-400',
        bg: 'bg-emerald-500',
        border: 'border-neutral-900',
        cardBg: 'bg-black',
        label: 'Safe / Low Risk'
      };
    }
  };

  const ytColor = getRiskColors(risk.youtubeRiskPercentage);
  const dspColor = getRiskColors(risk.dspRiskPercentage);

  return (
    <div className="space-y-6">
      {/* Information Banner in Black with Orange Sub-text */}
      <div className="p-4 rounded-xl bg-black border border-neutral-900 text-xs text-orange-300 flex items-start gap-3">
        <span className="icon-box-black w-6 h-6 rounded bg-black text-orange-500 shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </span>
        <div className="space-y-1">
          <div className="font-semibold text-white font-hud">
            Architectural Principle: YouTube Content ID vs Music Distribution Platforms (DSPs)
          </div>
          <p className="text-orange-400 leading-relaxed text-[11px]">
            YouTube Content ID scans specifically for identical recorded masters and direct melodies on monetized videos. In contrast, digital music distributors (DistroKid, TuneCore, Spotify, Apple Music) enforce mechanical license clearances, anti-fraud duplicate loop bans, and ISRC registry conflicts. Therefore, <strong>0% YouTube Risk does not mean 0% Music Distribution Risk</strong>.
          </p>
        </div>
      </div>

      {/* Dual Risk Meter Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SEGMENT 1: YouTube Content ID Copyright Risk */}
        <div className={`p-6 rounded-xl border ${ytColor.border} bg-black flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2.5">
                <span className="icon-box-black w-8 h-8 rounded bg-black text-orange-500">
                  <Youtube className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight font-hud">
                    YouTube Content ID Copyright Risk
                  </h3>
                  <div className="text-[11px] text-orange-400">
                    Automated Video Match & Monetization Protection
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider block">Risk Level</span>
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
                <span className="text-xs text-orange-400 ml-2 font-medium">
                  risk of getting copyright claims on YouTube
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-orange-400 font-mono">Monetization</div>
                <div className={`text-xs font-semibold ${risk.youtubeMonetizationStatus === 'Fully Monetizable' ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {risk.youtubeMonetizationStatus}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-900">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${ytColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.youtubeRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-orange-400/80 pt-1">
                <span className={risk.youtubeRiskPercentage <= 10 ? 'text-emerald-400 font-bold' : ''}>1% Clean</span>
                <span className={risk.youtubeRiskPercentage > 10 && risk.youtubeRiskPercentage <= 30 ? 'text-orange-300 font-bold' : ''}>20% Loop</span>
                <span className={risk.youtubeRiskPercentage > 30 && risk.youtubeRiskPercentage <= 60 ? 'text-orange-400 font-bold' : ''}>50% Melody</span>
                <span className={risk.youtubeRiskPercentage > 60 && risk.youtubeRiskPercentage <= 75 ? 'text-orange-500 font-bold' : ''}>70% Stem</span>
                <span className={risk.youtubeRiskPercentage >= 76 ? 'text-red-400 font-bold' : ''}>80%+ Strike</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-black border border-neutral-900 text-xs text-orange-300 leading-relaxed">
              <span className="font-semibold text-white block mb-0.5">Platform Analysis:</span>
              {risk.youtubeConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-900 text-[11px] text-orange-400 flex items-center justify-between font-mono">
            <span>Waveform Match: {(risk.waveformMatchConfidence * 100).toFixed(0)}%</span>
            <span>Spectral Confidence: {(risk.spectralMatchConfidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* SEGMENT 2: Music Distribution Platforms (DSP) Risk */}
        <div className={`p-6 rounded-xl border ${dspColor.border} bg-black flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-3 border-b border-neutral-900">
              <div className="flex items-center gap-2.5">
                <span className="icon-box-black w-8 h-8 rounded bg-black text-orange-500">
                  <Disc3 className="w-4 h-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-white tracking-tight font-hud">
                    Music Distribution Platforms (DSP) Risk
                  </h3>
                  <div className="text-[11px] text-orange-400">
                    DistroKid, TuneCore, Spotify & Apple Music Clearance
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-mono text-orange-400 uppercase tracking-wider block">Risk Level</span>
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
                <span className="text-xs text-orange-400 ml-2 font-medium">
                  risk of getting claims or rejections on DSP platforms
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-orange-400 font-mono">Store Delivery</div>
                <div className={`text-xs font-semibold ${risk.dspApprovalLikelihood === 'Guaranteed Store Ingestion' ? 'text-emerald-400' : 'text-orange-400'}`}>
                  {risk.dspApprovalLikelihood}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-neutral-950 rounded-full overflow-hidden p-0.5 border border-neutral-900">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${dspColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.dspRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-orange-400/80 pt-1">
                <span className={risk.dspRiskPercentage <= 10 ? 'text-emerald-400 font-bold' : ''}>1% Approved</span>
                <span className={risk.dspRiskPercentage > 10 && risk.dspRiskPercentage <= 30 ? 'text-orange-300 font-bold' : ''}>20% Notice</span>
                <span className={risk.dspRiskPercentage > 30 && risk.dspRiskPercentage <= 60 ? 'text-orange-400 font-bold' : ''}>50% License</span>
                <span className={risk.dspRiskPercentage > 60 && risk.dspRiskPercentage <= 75 ? 'text-orange-500 font-bold' : ''}>70% Freeze</span>
                <span className={risk.dspRiskPercentage >= 76 ? 'text-red-400 font-bold' : ''}>80%+ Rejected</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded-lg bg-black border border-neutral-900 text-xs text-orange-300 leading-relaxed">
              <span className="font-semibold text-white block mb-0.5">Ingestion Diagnostic:</span>
              {risk.dspConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-900 text-[11px] text-orange-400 flex items-center justify-between font-mono">
            <span>Tempo Match: {(risk.tempoMatchConfidence * 100).toFixed(0)}%</span>
            <span>Stem Profile: Verified</span>
          </div>
        </div>

      </div>

      {/* Research Experiment Callout: Live False Positive Reduction Toggle */}
      <div className="p-4 rounded-xl bg-black border border-neutral-900 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-xs font-bold text-white flex items-center gap-2 font-hud">
            <span>Virtual Instrument Loop De-Biasing Filter (Cakewalk Koto Suppression)</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${filterEnabled ? 'bg-black text-orange-400 border border-orange-600' : 'bg-black text-neutral-500 border border-neutral-800'}`}>
              {filterEnabled ? 'ACTIVE: -24dB Suppression' : 'DISABLED'}
            </span>
          </div>
          <p className="text-[11px] text-orange-400 mt-1">
            Standard acoustic matching shows <strong>{risk.rawFalsePositiveRisk}% false claim match</strong>. When filter is ON, neural stem de-biasing reduces false claims to <strong>{risk.filteredFalsePositiveRisk}%</strong>!
          </p>
        </div>

        <button
          onClick={onToggleFilter}
          className={`px-4 py-2 text-xs font-hud font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
            filterEnabled
              ? 'bg-orange-700 hover:bg-orange-600 text-white'
              : 'bg-black hover:bg-neutral-900 text-orange-400 border border-neutral-800'
          }`}
        >
          {filterEnabled ? 'Filter Enabled (Low Risk)' : 'Enable Filter (Reduce False Match)'}
        </button>
      </div>
    </div>
  );
};
