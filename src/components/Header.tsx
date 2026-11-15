import React from 'react';
import { ShieldCheck, FileText, Database, Code, Sliders, Music2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'analyzer' | 'methods' | 'database' | 'code-lab';
  onTabChange: (tab: 'analyzer' | 'methods' | 'database' | 'code-lab') => void;
  onOpenReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onTabChange, onOpenReport }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand title wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
            <Music2 className="w-4 h-4" />
          </div>
          <a href="#analyzer" onClick={() => onTabChange('analyzer')} className="text-base font-bold tracking-tight text-white whitespace-nowrap shrink-0">
            Ai Music Copyright Risk Detector
          </a>
        </div>

        {/* Zone 2: 4 single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onTabChange('analyzer')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'analyzer' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sliders className="w-4 h-4" />
            Risk Analyzer
          </button>
          
          <button
            onClick={() => onTabChange('methods')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'methods' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            Neural vs Blockchain Lab
          </button>

          <button
            onClick={() => onTabChange('database')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'database' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Database className="w-4 h-4" />
            1,000 Songs Database
          </button>

          <button
            onClick={() => onTabChange('code-lab')}
            className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
              activeTab === 'code-lab' ? 'text-indigo-400 font-semibold' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code className="w-4 h-4" />
            Code Lab & Algorithms
          </button>
        </nav>

        {/* Zone 3: 1 primary action button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenReport}
            className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-500 transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            Clearance Report
          </button>
        </div>
      </div>
    </header>
  );
};
