// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Header Navigation Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I designed the main brand header featuring my custom
// black box with orange borders and deep orange text for "koomRo",
// with icon containers in borderless black boxes with warm orange text.
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
    <header className="sticky top-0 z-40 bg-black border-b border-orange-950/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand: koomRo inside black box with orange border and orange text */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="#analyzer" 
            onClick={() => onTabChange('analyzer')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Black box with orange border & orange text */}
            <div className="koomro-logo-box">
              <span className="koomro-logo-text text-xl sm:text-2xl">
                koomRo
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-gaming font-bold text-white tracking-wide">
                Seven-Method AI Risk Detector
              </span>
              <span className="text-[11px] font-hud text-orange-400">
                Sayema Fatema Jahan · Presidency Univ (232044038)
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links with Black Box Icons (No Orange Border on Icons) */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-hud">
          <button
            onClick={() => onTabChange('analyzer')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-2 py-1.5 px-3 rounded-lg ${
              activeTab === 'analyzer' 
                ? 'text-white bg-black font-bold' 
                : 'text-orange-300 hover:text-white'
            }`}
          >
            <span className="icon-box-black w-6 h-6 rounded bg-black text-orange-500">
              <Sliders className="w-4 h-4" />
            </span>
            <span>Risk Analyzer</span>
          </button>
          
          <button
            onClick={() => onTabChange('methods')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-2 py-1.5 px-3 rounded-lg ${
              activeTab === 'methods' 
                ? 'text-white bg-black font-bold' 
                : 'text-orange-300 hover:text-white'
            }`}
          >
            <span className="icon-box-black w-6 h-6 rounded bg-black text-orange-500">
              <ShieldCheck className="w-4 h-4" />
            </span>
            <span>7-Signal Methods Lab</span>
          </button>

          <button
            onClick={() => onTabChange('database')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-2 py-1.5 px-3 rounded-lg ${
              activeTab === 'database' 
                ? 'text-white bg-black font-bold' 
                : 'text-orange-300 hover:text-white'
            }`}
          >
            <span className="icon-box-black w-6 h-6 rounded bg-black text-orange-500">
              <Database className="w-4 h-4" />
            </span>
            <span>1,000 Catalog Database</span>
          </button>

          <button
            onClick={() => onTabChange('code-lab')}
            className={`transition-all whitespace-nowrap shrink-0 flex items-center gap-2 py-1.5 px-3 rounded-lg ${
              activeTab === 'code-lab' 
                ? 'text-white bg-black font-bold' 
                : 'text-orange-300 hover:text-white'
            }`}
          >
            <span className="icon-box-black w-6 h-6 rounded bg-black text-orange-500">
              <Code className="w-4 h-4" />
            </span>
            <span>Code Lab & DSP</span>
          </button>
        </nav>

        {/* Action Button: Deep Orange with Black Box Icon */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="px-4 py-2 text-xs font-gaming font-bold text-white bg-orange-700 hover:bg-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 rounded-lg"
          >
            <span className="icon-box-black w-5 h-5 rounded bg-black text-orange-400">
              <FileText className="w-3.5 h-3.5" />
            </span>
            <span>Clearance Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
