/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { AudioUploader } from './components/AudioUploader';
import { RiskMeterDisplay } from './components/RiskMeterDisplay';
import { WaveformMatchViewer } from './components/WaveformMatchViewer';
import { MethodComparisonLab } from './components/MethodComparisonLab';
import { DatabaseBrowser1000 } from './components/DatabaseBrowser1000';
import { CodeLabInspector } from './components/CodeLabInspector';
import { ClearanceReportModal } from './components/ClearanceReportModal';
import { MethodWebsiteView } from './components/MethodWebsiteView';
import { UnifiedSevenMethodView } from './components/UnifiedSevenMethodView';

import { BangladeshiSong, DetectionMethod, AlgorithmParams } from './types/music';
import { MethodId } from './types/sixMethods';
import { BANGALORE_CATALOG_1000 } from './data/bangladeshiSongs1000';
import { RESEARCH_TEST_PRESETS } from './data/testPresets';
import { runCopyrightRiskAnalysis, AnalyzerInput } from './services/analyzerLogic';
import { executeMethodSimulation, executeUnifiedSevenMethods } from './services/sixMethodsEngine';
import { audioEngine } from './services/audioEngine';
import { Layers, Cpu, Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'methods_suite' | 'database' | 'code-lab'>('methods_suite');
  const [selectedMethodId, setSelectedMethodId] = useState<MethodId>('method7_unified');
  const [isReportOpen, setIsReportOpen] = useState<boolean>(false);

  // Active track state
  const [trackTitle, setTrackTitle] = useState<string>('Cakewalk Koto Beat + Original Bangla Melody');
  const [artist, setArtist] = useState<string>('Independent Artist (User Demo)');
  const [bpm, setBpm] = useState<number>(102);
  const [key, setKey] = useState<string>('F Minor');
  const [durationSeconds, setDurationSeconds] = useState<number>(185);
  const [hasCakewalkKotoLoop, setHasCakewalkKotoLoop] = useState<boolean>(true);
  const [sampleType, setSampleType] = useState<string | undefined>('koto-folk-synth');
  const [currentBuffer, setCurrentBuffer] = useState<AudioBuffer | null>(null);
  const [currentPeaks, setCurrentPeaks] = useState<number[]>([]);

  // Algorithm parameters
  const [detectionMethod, setDetectionMethod] = useState<DetectionMethod>('hybrid');
  const [params, setParams] = useState<AlgorithmParams>({
    cakewalkKotoFilterEnabled: true,
    kotoSuppressionDb: 24,
    neuralCosineThreshold: 0.82,
    stemSeparationVocalWeight: 0.65,
    stemSeparationRhythmWeight: 0.10,
    blockchainMerkleTolerance: 0.05,
    fftWindowSize: 2048
  });

  // Dynamic 1000 songs catalog state
  const [catalogSongs, setCatalogSongs] = useState<BangladeshiSong[]>(BANGALORE_CATALOG_1000);

  // Run real-time copyright risk analysis
  const riskAnalysis = useMemo(() => {
    const input: AnalyzerInput = {
      title: trackTitle,
      artist,
      bpm,
      key,
      durationSeconds,
      hasCakewalkKotoLoop,
      sampleType,
      detectionMethod,
      params
    };
    return runCopyrightRiskAnalysis(input);
  }, [trackTitle, artist, bpm, key, durationSeconds, hasCakewalkKotoLoop, sampleType, detectionMethod, params]);

  // Unified Multi-Method Simulation Output (for 7th website)
  const unifiedSevenMethodResult = useMemo(() => {
    return executeUnifiedSevenMethods({
      trackTitle,
      artist,
      bpm,
      key,
      durationSeconds,
      hasCakewalkKotoLoop,
      sampleType,
      dawFilterEnabled: params.cakewalkKotoFilterEnabled
    });
  }, [trackTitle, artist, bpm, key, durationSeconds, hasCakewalkKotoLoop, sampleType, params.cakewalkKotoFilterEnabled]);

  // Single method result for the currently active standalone method
  const currentSingleMethodResult = useMemo(() => {
    return executeMethodSimulation(selectedMethodId, {
      trackTitle,
      artist,
      bpm,
      key,
      durationSeconds,
      hasCakewalkKotoLoop,
      sampleType,
      dawFilterEnabled: params.cakewalkKotoFilterEnabled
    });
  }, [selectedMethodId, trackTitle, artist, bpm, key, durationSeconds, hasCakewalkKotoLoop, sampleType, params.cakewalkKotoFilterEnabled]);

  const handleTrackSelected = (info: {
    title: string;
    artist: string;
    bpm: number;
    key: string;
    durationSeconds: number;
    hasCakewalkKotoLoop: boolean;
    sampleType?: string;
    buffer?: AudioBuffer;
    peaks?: number[];
  }) => {
    setTrackTitle(info.title);
    setArtist(info.artist);
    setBpm(info.bpm);
    setKey(info.key);
    setDurationSeconds(info.durationSeconds);
    setHasCakewalkKotoLoop(info.hasCakewalkKotoLoop);
    setSampleType(info.sampleType);
    if (info.buffer) setCurrentBuffer(info.buffer);
    if (info.peaks) setCurrentPeaks(info.peaks);
  };

  const handleSelectTrackPreset = (presetId: string) => {
    const preset = RESEARCH_TEST_PRESETS.find(p => p.id === presetId) || RESEARCH_TEST_PRESETS[0];
    const synthBuffer = audioEngine.generatePresetAudioBuffer(preset.audioSampleType, 16);
    const synthPeaks = audioEngine.extractPeaks(synthBuffer, 100);

    handleTrackSelected({
      title: preset.name,
      artist: preset.artist,
      bpm: preset.bpm,
      key: preset.key,
      durationSeconds: preset.durationSeconds,
      hasCakewalkKotoLoop: preset.hasCakewalkKotoLoop,
      sampleType: preset.audioSampleType,
      buffer: synthBuffer,
      peaks: synthPeaks
    });
  };

  const handleAddSong = (newSong: BangladeshiSong) => {
    setCatalogSongs(prev => [newSong, ...prev]);
  };

  const handleAnalyzeAgainstSong = (song: BangladeshiSong) => {
    setTrackTitle(`Match Test vs: ${song.title}`);
    setArtist(`Target: ${song.artist}`);
    setBpm(song.bpm);
    setKey(song.key);
    setDurationSeconds(song.durationSeconds);
    setHasCakewalkKotoLoop(song.containsKnownDAWLoop);
    setSampleType('custom-target');
    setActiveTab('methods_suite');
  };

  const methodTabs = [
    { id: 'method7_unified' as MethodId, label: '7. Multi-Method (Unified 6 Segments)', badge: 'Master Suite' },
    { id: 'method1' as MethodId, label: '1. AcousticPulse PyBridge', badge: 'FastAPI + React' },
    { id: 'method2' as MethodId, label: '2. BrowserSonic JS', badge: 'Pure Web Audio' },
    { id: 'method3' as MethodId, label: '3. SoundVault Hybrid', badge: 'FastAPI + PostgreSQL' },
    { id: 'method4' as MethodId, label: '4. RuleHarmonic DSP', badge: 'Rules (No AI)' },
    { id: 'method5' as MethodId, label: '5. FeatureNet ML', badge: 'Random Forest & SVM' },
    { id: 'method6' as MethodId, label: '6. DeepSpectra AI', badge: '2D Mel-CNN & Bi-LSTM' },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <Header
        activeTab={activeTab === 'methods_suite' ? 'analyzer' : (activeTab === 'database' ? 'database' : 'code-lab')}
        onTabChange={(tab) => {
          if (tab === 'analyzer' || tab === 'methods') setActiveTab('methods_suite');
          else if (tab === 'database') setActiveTab('database');
          else if (tab === 'code-lab') setActiveTab('code-lab');
        }}
        onOpenReport={() => setIsReportOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Method Website Switcher Bar */}
        {activeTab === 'methods_suite' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-indigo-400" />
                Select Website Architecture & Method View:
              </span>
              <span className="text-slate-500 hidden sm:inline">
                Click any method to view its standalone website & complete source code
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {methodTabs.map((m) => {
                const isSelected = selectedMethodId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethodId(m.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-sm font-semibold'
                        : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-indigo-950 text-indigo-200' : 'bg-slate-950 text-slate-400'}`}>
                      {m.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View 1: 7th Unified Multi-Method Master Suite */}
        {activeTab === 'methods_suite' && selectedMethodId === 'method7_unified' && (
          <UnifiedSevenMethodView
            trackTitle={trackTitle}
            artist={artist}
            bpm={bpm}
            key={key}
            hasCakewalkKotoLoop={hasCakewalkKotoLoop}
            unifiedResult={unifiedSevenMethodResult}
            onSelectTrackPreset={handleSelectTrackPreset}
            onNavigateToMethod={(id) => setSelectedMethodId(id)}
          />
        )}

        {/* View 2: Standalone Website Views for Methods 1 through 6 */}
        {activeTab === 'methods_suite' && selectedMethodId !== 'method7_unified' && (
          <MethodWebsiteView
            methodId={selectedMethodId}
            trackTitle={trackTitle}
            artist={artist}
            bpm={bpm}
            key={key}
            hasCakewalkKotoLoop={hasCakewalkKotoLoop}
            result={currentSingleMethodResult}
            onOpenReport={() => setIsReportOpen(true)}
            onSelectTrackPreset={handleSelectTrackPreset}
          />
        )}

        {/* View 3: 1,000 Authorized Bangladeshi Songs Database */}
        {activeTab === 'database' && (
          <DatabaseBrowser1000
            songs={catalogSongs}
            onAddSong={handleAddSong}
            onAnalyzeAgainstSong={handleAnalyzeAgainstSong}
          />
        )}

        {/* View 4: In-App Code Lab & Educational Algorithm Inspector */}
        {activeTab === 'code-lab' && (
          <CodeLabInspector />
        )}
      </main>

      {/* Pre-Distribution Clearance Report Modal */}
      <ClearanceReportModal
        isOpen={isReportOpen}
        onClose={() => setIsReportOpen(false)}
        trackTitle={trackTitle}
        artist={artist}
        bpm={bpm}
        key={key}
        risk={riskAnalysis}
        filterEnabled={params.cakewalkKotoFilterEnabled}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-medium text-slate-400">
            Multi-Method Ai music analyzer with 6 methods · Independent Music Distribution Research
          </div>
          <div className="text-[11px] text-slate-500 font-mono">
            Evaluating 6 Distinct Architectures (FastAPI, Pure JS, PostgreSQL Hybrid, Rules, Random Forest/SVM, and 2D Mel-CNN)
          </div>
        </div>
      </footer>
    </div>
  );
}
