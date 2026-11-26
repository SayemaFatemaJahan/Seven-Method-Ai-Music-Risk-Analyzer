// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Header Navigation Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I designed the main brand header featuring my custom
// warm orange "koomRo" badge with white-on-black bordered typography.
// =====================================================================

import React from 'react';
import { ShieldCheck, FileText, Database, Code, Sliders, Music2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'methods' | 'database' | 'code-lab';
  onTabChange: (tab: 'analyzer' | 'methods' | 'database' | 'code-lab') => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-black/95 backdrop-blur-md border-b border-orange-950/80 shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand: koomRo inside warm orange box with white text and black border */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="#analyzer" 
            onClick={() => onTabChange('analyzer')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* The warm orange box with white text & black border */}
            <div className="koomro-logo-box group-hover:scale-105 transition-transform">
              <span className="koomro-logo-text text-xl sm:text-2xl">
                koomRo
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-gaming font-extrabold text-white tracking-wide flex items-center gap-2">
                Seven-Method AI Risk Detector
              </span>
              <span className="text-[11px] font-hud text-orange-300/80">
                Sayema Fatema Jahan · Presidency Univ (232044038)
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links in Warm Orange / Light Orange & White */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-hud">
          <button
            onClick={() => onTabChange('analyzer')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg ${
              activeTab === 'analyzer' 
                ? 'text-white bg-orange-900/40 border border-orange-500/60 font-bold shadow-[0_0_12px_rgba(249,115,22,0.3)]' 
                : 'text-orange-200/70 hover:text-white hover:bg-orange-950/30'
            }`}
          >
            <Sliders className="w-4 h-4 text-orange-400" />
            Risk Analyzer
          </button>
          
          <button
            onClick={() => onTabChange('methods')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg ${
              activeTab === 'methods' 
                ? 'text-white bg-orange-900/40 border border-orange-500/60 font-bold shadow-[0_0_12px_rgba(249,115,22,0.3)]' 
                : 'text-orange-200/70 hover:text-white hover:bg-orange-950/30'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-orange-400" />
            7-Signal Methods Lab
          </button>

          <button
            onClick={() => onTabChange('database')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg ${
              activeTab === 'database' 
                ? 'text-white bg-orange-900/40 border border-orange-500/60 font-bold shadow-[0_0_12px_rgba(249,115,22,0.3)]' 
                : 'text-orange-200/70 hover:text-white hover:bg-orange-950/30'
            }`}
          >
            <Database className="w-4 h-4 text-orange-400" />
            1,000 Catalog Database
          </button>

          <button
            onClick={() => onTabChange('code-lab')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 py-1.5 px-3 rounded-lg ${
              activeTab === 'code-lab' 
                ? 'text-white bg-orange-900/40 border border-orange-500/60 font-bold shadow-[0_0_12px_rgba(249,115,22,0.3)]' 
                : 'text-orange-200/70 hover:text-white hover:bg-orange-950/30'
            }`}
          >
            <Code className="w-4 h-4 text-orange-400" />
            Code Lab & DSP
          </button>
        </nav>

        {/* Action Button: Warm Orange Clearance Report */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="px-4 py-2 text-xs font-gaming font-bold text-white bg-gradient-to-r from-orange-600 to-amber-600 rounded-lg hover:from-orange-500 hover:to-amber-500 transition-all whitespace-nowrap shrink-0 flex items-center gap-2 shadow-[0_0_15px_rgba(234,88,12,0.4)] border border-orange-400/50"
          >
            <FileText className="w-3.5 h-3.5" />
            Clearance Report
          </button>
        </div>
      </div>
    </header>
  );
};
