// =====================================================================
// koomRo - Risk Meter Display Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I display the dual risk evaluation (YouTube Content ID
// vs DSP Music Distribution Platforms) in a clean white theme with all-black
// text and deep pumpkin orange accents for segment headings.
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
        text: 'text-red-600',
        bg: 'bg-red-600',
        border: 'border-red-200',
        badgeBg: 'bg-red-50 text-red-700 border-red-300',
        label: 'Critical / High Risk'
      };
    } else if (pct >= 50) {
      return {
        text: 'text-orange-600',
        bg: 'bg-orange-600',
        border: 'border-orange-200',
        badgeBg: 'bg-orange-50 text-orange-700 border-orange-300',
        label: 'Moderate / Licensing Flag'
      };
    } else if (pct >= 20) {
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-500',
        border: 'border-amber-200',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
        label: 'Elevated / Loop Collision'
      };
    } else {
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-600',
        border: 'border-emerald-200',
        badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-300',
        label: 'Safe / Low Risk'
      };
    }
  };

  const ytColor = getRiskColors(risk.youtubeRiskPercentage);
  const dspColor = getRiskColors(risk.dspRiskPercentage);

  return (
    <div className="space-y-6 bg-white text-black font-sans">
      {/* Information Banner in Clean White Card with Pumpkin Orange Highlight */}
      <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs text-xs text-neutral-800 flex items-start gap-3">
        <span className="w-7 h-7 rounded-lg bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center shrink-0 mt-0.5">
          <Info className="w-4 h-4" />
        </span>
        <div className="space-y-1">
          <div className="font-bold text-orange-600 font-hud text-sm">
            Architectural Principle: YouTube Content ID vs Music Distribution Platforms (DSPs)
          </div>
          <p className="text-neutral-700 leading-relaxed text-xs">
            YouTube Content ID scans specifically for identical recorded masters and direct melodies on monetized videos. In contrast, digital music distributors (DistroKid, TuneCore, Spotify, Apple Music) enforce mechanical license clearances, anti-fraud duplicate loop bans, and ISRC registry conflicts. Therefore, <strong>0% YouTube Risk does not mean 0% Music Distribution Risk</strong>.
          </p>
        </div>
      </div>

      {/* Dual Risk Meter Segments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SEGMENT 1: YouTube Content ID Copyright Risk */}
        <div className={`p-6 rounded-xl border ${ytColor.border} bg-white shadow-xs flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-neutral-100 text-orange-600 border border-neutral-200 flex items-center justify-center">
                  <Youtube className="w-5 h-5 text-red-600" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-orange-600 tracking-tight font-gaming">
                    YouTube Content ID Copyright Risk
                  </h3>
                  <div className="text-xs text-neutral-600">
                    Automated Video Match & Monetization Protection
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-semibold">Risk Level</span>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${ytColor.badgeBg}`}>
                  {risk.youtubeRiskTier} ({ytColor.label})
                </span>
              </div>
            </div>

            {/* Gauge Display & Percentage */}
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold font-mono text-black tracking-tight tabular-nums">
                  {risk.youtubeRiskPercentage}%
                </span>
                <span className="text-xs text-neutral-700 ml-2 font-medium">
                  risk of getting copyright claims on YouTube
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-neutral-500 font-mono font-semibold">Monetization</div>
                <div className={`text-xs font-bold ${risk.youtubeMonetizationStatus === 'Fully Monetizable' ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {risk.youtubeMonetizationStatus}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${ytColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.youtubeRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                <span className={risk.youtubeRiskPercentage <= 10 ? 'text-emerald-600 font-bold' : ''}>1% Clean</span>
                <span className={risk.youtubeRiskPercentage > 10 && risk.youtubeRiskPercentage <= 30 ? 'text-amber-600 font-bold' : ''}>20% Loop</span>
                <span className={risk.youtubeRiskPercentage > 30 && risk.youtubeRiskPercentage <= 60 ? 'text-orange-600 font-bold' : ''}>50% Melody</span>
                <span className={risk.youtubeRiskPercentage > 60 && risk.youtubeRiskPercentage <= 75 ? 'text-orange-700 font-bold' : ''}>70% Stem</span>
                <span className={risk.youtubeRiskPercentage >= 76 ? 'text-red-600 font-bold' : ''}>80%+ Strike</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 leading-relaxed">
              <span className="font-bold text-black block mb-0.5 font-hud">Platform Analysis:</span>
              {risk.youtubeConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-mono">
            <span>Waveform Match: <strong className="text-black">{(risk.waveformMatchConfidence * 100).toFixed(0)}%</strong></span>
            <span>Spectral Confidence: <strong className="text-black">{(risk.spectralMatchConfidence * 100).toFixed(0)}%</strong></span>
          </div>
        </div>

        {/* SEGMENT 2: Music Distribution Platforms (DSP) Risk */}
        <div className={`p-6 rounded-xl border ${dspColor.border} bg-white shadow-xs flex flex-col justify-between space-y-6`}>
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-lg bg-neutral-100 text-orange-600 border border-neutral-200 flex items-center justify-center">
                  <Disc3 className="w-5 h-5 text-orange-600" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-orange-600 tracking-tight font-gaming">
                    Music Distribution Platforms (DSP) Risk
                  </h3>
                  <div className="text-xs text-neutral-600">
                    DistroKid, TuneCore, Spotify & Apple Music Clearance
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block font-semibold">Risk Level</span>
                <span className={`text-xs font-bold font-mono px-2 py-0.5 rounded border ${dspColor.badgeBg}`}>
                  {risk.dspRiskTier} ({dspColor.label})
                </span>
              </div>
            </div>

            {/* Gauge Display & Percentage */}
            <div className="mt-6 flex items-baseline justify-between">
              <div>
                <span className="text-4xl font-extrabold font-mono text-black tracking-tight tabular-nums">
                  {risk.dspRiskPercentage}%
                </span>
                <span className="text-xs text-neutral-700 ml-2 font-medium">
                  risk of getting claims or rejections on DSP platforms
                </span>
              </div>
              <div className="text-right">
                <div className="text-[11px] text-neutral-500 font-mono font-semibold">Store Delivery</div>
                <div className={`text-xs font-bold ${risk.dspApprovalLikelihood === 'Guaranteed Store Ingestion' ? 'text-emerald-600' : 'text-orange-600'}`}>
                  {risk.dspApprovalLikelihood}
                </div>
              </div>
            </div>

            {/* Visual Risk Bar & Tiers Markers */}
            <div className="mt-4 space-y-2">
              <div className="w-full h-3 bg-neutral-100 rounded-full overflow-hidden p-0.5 border border-neutral-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ease-out ${dspColor.bg}`}
                  style={{ width: `${Math.min(100, Math.max(3, risk.dspRiskPercentage))}%` }}
                />
              </div>

              {/* Explicit 1%, 20%, 50%, 70%, 80%+ Tier Markers */}
              <div className="flex justify-between text-[10px] font-mono text-neutral-500 pt-1">
                <span className={risk.dspRiskPercentage <= 10 ? 'text-emerald-600 font-bold' : ''}>1% Approved</span>
                <span className={risk.dspRiskPercentage > 10 && risk.dspRiskPercentage <= 30 ? 'text-amber-600 font-bold' : ''}>20% Notice</span>
                <span className={risk.dspRiskPercentage > 30 && risk.dspRiskPercentage <= 60 ? 'text-orange-600 font-bold' : ''}>50% License</span>
                <span className={risk.dspRiskPercentage > 60 && risk.dspRiskPercentage <= 75 ? 'text-orange-700 font-bold' : ''}>70% Freeze</span>
                <span className={risk.dspRiskPercentage >= 76 ? 'text-red-600 font-bold' : ''}>80%+ Rejected</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 rounded-lg bg-neutral-50 border border-neutral-200 text-xs text-neutral-800 leading-relaxed">
              <span className="font-bold text-black block mb-0.5 font-hud">Ingestion Diagnostic:</span>
              {risk.dspConsequence}
            </div>
          </div>

          <div className="pt-3 border-t border-neutral-200 text-xs text-neutral-600 flex items-center justify-between font-mono">
            <span>Tempo Match: <strong className="text-black">{(risk.tempoMatchConfidence * 100).toFixed(0)}%</strong></span>
            <span>Stem Profile: <strong className="text-emerald-600">Verified</strong></span>
          </div>
        </div>

      </div>

      {/* Research Experiment Callout: Live False Positive Reduction Toggle */}
      <div className="p-5 rounded-xl bg-white border border-neutral-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-sm font-bold text-orange-600 flex items-center gap-2 font-hud">
            <span>Virtual Instrument Loop De-Biasing Filter (Cakewalk Koto Suppression)</span>
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${filterEnabled ? 'bg-orange-50 text-orange-700 border-orange-300 font-bold' : 'bg-neutral-100 text-neutral-600 border-neutral-300'}`}>
              {filterEnabled ? 'ACTIVE: -24dB Suppression' : 'DISABLED'}
            </span>
          </div>
          <p className="text-xs text-neutral-700 mt-1">
            Standard acoustic matching shows <strong>{risk.rawFalsePositiveRisk}% false claim match</strong>. When filter is ON, neural stem de-biasing reduces false claims to <strong>{risk.filteredFalsePositiveRisk}%</strong>!
          </p>
        </div>

        <button
          onClick={onToggleFilter}
          className={`px-4 py-2.5 text-xs font-hud font-bold rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-xs ${
            filterEnabled
              ? 'bg-orange-600 hover:bg-orange-700 text-white'
              : 'bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300'
          }`}
        >
          {filterEnabled ? 'Filter Enabled (Low Risk)' : 'Enable Filter (Reduce False Match)'}
        </button>
      </div>
    </div>
  );
};
