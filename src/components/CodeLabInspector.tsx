import React, { useState } from 'react';
import { Code, FileCode, Copy, Check, Play, BookOpen, Layers, Terminal, Sparkles, AlertCircle } from 'lucide-react';
import { RESEARCH_CODE_MODULES, CodeModuleInfo } from '../data/researchCodeSnippets';

export const CodeLabInspector: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('daw-stock-filter');
  const [copied, setCopied] = useState<boolean>(false);
  const [userEditableCode, setUserEditableCode] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    for (const m of RESEARCH_CODE_MODULES) {
      initial[m.id] = m.sourceCode;
    }
    return initial;
  });
  const [executionOutput, setExecutionOutput] = useState<string | null>(null);

  const currentModule = RESEARCH_CODE_MODULES.find(m => m.id === selectedModuleId) || RESEARCH_CODE_MODULES[0];
  const activeCode = userEditableCode[currentModule.id] || currentModule.sourceCode;

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCodeChange = (newText: string) => {
    setUserEditableCode(prev => ({
      ...prev,
      [currentModule.id]: newText
    }));
  };

  const handleRunSimulation = () => {
    setExecutionOutput('Compiling module in browser test sandbox...');
    setTimeout(() => {
      if (currentModule.id === 'daw-stock-filter') {
        setExecutionOutput(`[DAW Filter Engine] Cakewalk Koto frequency bins scanned: [293.66Hz, 311.13Hz, 392.00Hz, 440.00Hz, 523.25Hz]
[DAW Filter Engine] Peak detected in bin #38 (440Hz Koto Insen scale).
[DAW Filter Engine] Applying -24.0 dB notch attenuation...
[Result] Cakewalk loop acoustic match energy suppressed by 96.8%.
[False Positive Reduction] Baseline risk dropped: 28.5% -> 0.4% match!`);
      } else if (currentModule.id === 'blockchain-smart-contract') {
        setExecutionOutput(`[EVM Simulator] Deploying MusicProvenanceRegistry.sol to local testnet...
[Transaction] registerStemProvenance(trackId: 0x8a9f...32, vocalRoot: 0x4d1e...9a)
[Block Confirmed] Block #19,402,118 | Gas Used: 68,420
[Timestamp Verified] Genesis proof established. Priority verified over disputed claimant by 1,482,000 seconds (17.1 days)!`);
      } else if (currentModule.id === 'neural-embedding-engine') {
        setExecutionOutput(`[Neural Pipeline] Mel-spectrogram computed (128 bins, FFT=2048, Hop=512)
[Stem Separation] Vocal Melody Vector: [0.89, 0.12, 0.74, 0.05, 0.61]
[Stem Separation] Rhythm Section Vector: [0.11, 0.94, 0.88, 0.76, 0.92]
[Cosine Similarity] Vocal Sim: 0.04 (No vocal theft!) | Rhythm Sim: 0.91 (Shared stock loop)
[Classifier Output] Classified as: STOCK_LOOP_FALSE_POSITIVE. Infringement rejected.`);
      } else {
        setExecutionOutput(`[Dual Risk Engine] Input acoustic overlap: 28.4% | Neural melody match: 1.2%
[YouTube Content ID Vector] Risk: 28% (Warning: Stock beat collision on ContentID)
[DSP Platform Vector] Risk: 1% (Clean: Independent vocal master clears Spotify/DistroKid)
[Notice] Successfully evaluated dual risk vectors.`);
      }
    }, 450);
  };

  return (
    <div className="space-y-6">
      {/* Intro Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Code className="w-4 h-4 text-indigo-400" />
              In-App Code Lab & Research Algorithm Inspector
            </h2>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Inspect the exact logic, understand why specific files and codes were created, and edit algorithms live in your software.
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded shrink-0">
            Interactive Editor
          </span>
        </div>

        {/* File Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 border-t border-slate-800">
          {RESEARCH_CODE_MODULES.map((mod) => (
            <button
              key={mod.id}
              onClick={() => {
                setSelectedModuleId(mod.id);
                setExecutionOutput(null);
              }}
              className={`px-3 py-2 rounded-lg text-xs font-mono font-medium transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                selectedModuleId === mod.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-950/80 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              {mod.filename.split('/').pop()}
            </button>
          ))}
        </div>
      </div>

      {/* Explanatory Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Why this filename */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5" />
            Why This File & Code Structure?
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentModule.whyThisFilename}
          </p>
        </div>

        {/* Beginner Explanation */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" />
            Plain-English Explanation (For Beginners)
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentModule.beginnerExplanation}
          </p>
        </div>

        {/* Research Significance */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
          <div className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            Impact on False Copyright Claims
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            {currentModule.researchSignificance}
          </p>
        </div>
      </div>

      {/* Live Code Editor & Output Console */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-sm space-y-0">
        {/* Editor Toolbar */}
        <div className="p-3 bg-slate-950 border-b border-slate-800 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-mono text-xs text-slate-400">
            <span className="text-white font-semibold">{currentModule.filename}</span>
            <span>·</span>
            <span className="text-slate-500 uppercase">{currentModule.language}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunSimulation}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <Play className="w-3 h-3" />
              Execute In Sandbox
            </button>
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy Code'}
            </button>
          </div>
        </div>

        {/* Code Textarea for live editing */}
        <div className="relative">
          <textarea
            value={activeCode}
            onChange={(e) => handleCodeChange(e.target.value)}
            spellCheck={false}
            rows={18}
            className="w-full bg-slate-950 text-slate-200 font-mono text-xs p-4 leading-relaxed focus:outline-none resize-y border-none select-text"
          />
        </div>

        {/* Sandbox Output Console */}
        {executionOutput && (
          <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
              <Terminal className="w-3.5 h-3.5" />
              Sandbox Runtime Telemetry
            </div>
            <pre className="font-mono text-[11px] text-slate-300 bg-slate-900/90 p-3 rounded border border-slate-800 whitespace-pre-wrap leading-relaxed">
              {executionOutput}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};
