// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Header Navigation Component
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this component, I designed the brand header featuring my deep pumpkin
// orange filled "koomRo" badge with crisp white text on a clean white background.
// (Per thesis requirements, personal student details are kept in comments only).
// =====================================================================

import React from 'react';
import { ShieldCheck, FileText, Database, Code, Sliders } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'methods' | 'database' | 'code-lab';
  onTabChange: (tab: 'analyzer' | 'methods' | 'database' | 'code-lab') => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        {/* Brand: koomRo deep orange filled box with white text */}
        <div className="flex items-center gap-3 shrink-0">
          <a 
            href="#analyzer" 
            onClick={() => onTabChange('analyzer')}
            className="flex items-center gap-3 group focus:outline-none"
          >
            {/* Filled deep pumpkin orange box with white text */}
            <div className="koomro-logo-box">
              <span className="koomro-logo-text text-xl sm:text-2xl">
                koomRo
              </span>
            </div>
            
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-gaming font-bold text-black tracking-wide">
                Seven-Method AI Risk Detector
              </span>
            </div>
          </a>
        </div>

        {/* Navigation Links in Clean Black Text with Pumpkin Orange Active Indicator */}
        <nav className="hidden md:flex items-center gap-3 text-sm font-hud">
          <button
            onClick={() => onTabChange('analyzer')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 py-2 px-3 rounded-lg ${
              activeTab === 'analyzer' 
                ? 'text-black bg-neutral-100 border-b-2 border-orange-600 font-bold' 
                : 'text-neutral-800 hover:text-black hover:bg-neutral-50'
            }`}
          >
            <Sliders className="w-4 h-4 text-orange-600" />
            <span>Risk Analyzer</span>
          </button>
          
          <button
            onClick={() => onTabChange('methods')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 py-2 px-3 rounded-lg ${
              activeTab === 'methods' 
                ? 'text-black bg-neutral-100 border-b-2 border-orange-600 font-bold' 
                : 'text-neutral-800 hover:text-black hover:bg-neutral-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>7-Signal Methods Lab</span>
          </button>

          <button
            onClick={() => onTabChange('database')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 py-2 px-3 rounded-lg ${
              activeTab === 'database' 
                ? 'text-black bg-neutral-100 border-b-2 border-orange-600 font-bold' 
                : 'text-neutral-800 hover:text-black hover:bg-neutral-50'
            }`}
          >
            <Database className="w-4 h-4 text-orange-600" />
            <span>1,000 Catalog Database</span>
          </button>

          <button
            onClick={() => onTabChange('code-lab')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 py-2 px-3 rounded-lg ${
              activeTab === 'code-lab' 
                ? 'text-black bg-neutral-100 border-b-2 border-orange-600 font-bold' 
                : 'text-neutral-800 hover:text-black hover:bg-neutral-50'
            }`}
          >
            <Code className="w-4 h-4 text-orange-600" />
            <span>Code Lab & DSP</span>
          </button>
        </nav>

        {/* Action Button: Deep Pumpkin Orange with White Text */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="px-4 py-2 text-xs font-gaming font-bold text-white bg-orange-600 hover:bg-orange-700 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 rounded-lg shadow-xs"
          >
            <FileText className="w-3.5 h-3.5 text-white" />
            <span>Clearance Report</span>
          </button>
        </div>
      </div>
    </header>
  );
};
