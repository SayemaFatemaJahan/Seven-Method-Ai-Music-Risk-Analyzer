// =====================================================================
// koomRo - Seven-Method AI Music Risk Detector
// Main Dashboard Application
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this main dashboard, I orchestrate the user interaction for my thesis:
// "Development of AI-Based Copyright Music Claim Detection System Using
// Multi-Signal Neural Audio Processing". I enable independent artists to upload
// songs, evaluate 7 acoustic signal pipelines, and preview strike risks.
// =====================================================================

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
import { MethodId } from './types/sevenMethods';
import { BANGALORE_CATALOG_1000 } from './data/bangladeshiSongs1000';
import { RESEARCH_TEST_PRESETS } from './data/testPresets';
import { runCopyrightRiskAnalysis, AnalyzerInput } from './services/analyzerLogic';
import { executeMethodSimulation, executeUnifiedSevenMethods } from './services/sevenMethodsEngine';
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

  // Unified Multi-Signal Simulation Output (for 7th master method)
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

  // My 7-Signal Research Methods
  const methodTabs = [
    { id: 'method7_unified' as MethodId, label: '7. Multi-Signal Attention Fusion', badge: 'Master Suite' },
    { id: 'method1' as MethodId, label: '1. Chroma CQT Harmonic', badge: 'Melody & Chords' },
    { id: 'method2' as MethodId, label: '2. Log-Mel Spectrogram', badge: 'Time-Frequency' },
    { id: 'method3' as MethodId, label: '3. MFCC Timbre Discriminator', badge: 'Vocal / Stem' },
    { id: 'method4' as MethodId, label: '4. Tempogram Metric', badge: 'Rhythm & Beats' },
    { id: 'method5' as MethodId, label: '5. Tonnetz Centroid', badge: 'Tonal Space' },
    { id: 'method6' as MethodId, label: '6. Spectral Contrast', badge: 'Acoustic Texture' },
  ];

  return (
    <div className="min-h-screen bg-black text-orange-50 flex flex-col font-sans selection:bg-orange-600 selection:text-white">
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
        
        {/* Method Switcher Bar */}
        {activeTab === 'methods_suite' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono text-orange-300/80">
              <span className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-orange-400" />
                Select 7-Signal Acoustic Method to Inspect:
              </span>
              <span className="text-orange-400/60 hidden sm:inline">
                Click any signal method to view its dedicated pipeline & DSP breakdown
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {methodTabs.map((m) => {
                const isSelected = selectedMethodId === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMethodId(m.id)}
                    className={`px-3 py-2 rounded-lg text-xs font-hud transition-all whitespace-nowrap shrink-0 flex items-center gap-2 ${
                      isSelected
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white font-bold shadow-[0_0_15px_rgba(249,115,22,0.4)] border border-orange-400'
                        : 'bg-black text-orange-200/70 hover:text-white hover:bg-orange-950/40 border border-orange-950/80'
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${isSelected ? 'bg-black/60 text-orange-200 border border-orange-400/40' : 'bg-orange-950/40 text-orange-400'}`}>
                      {m.badge}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* View 1: 7th Unified Multi-Signal Master Suite */}
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

        {/* View 2: Standalone Views for Signals 1 through 6 */}
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

      {/* Footer in Black & Warm Orange */}
      <footer className="border-t border-orange-950/80 bg-black py-6 mt-12 text-center text-xs text-orange-300/60 font-hud">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="font-semibold text-orange-200 flex items-center gap-2">
            <span className="koomro-logo-box text-xs py-0.5 px-2">
              <span className="koomro-logo-text text-sm">koomRo</span>
            </span>
            <span>Seven-Method AI Music Risk Detector · Sayema Fatema Jahan (ID: 232044038)</span>
          </div>
          <div className="text-[11px] text-orange-400/80 font-mono">
            Presidency University Thesis · Multi-Signal Neural Audio Processing
          </div>
        </div>
      </footer>
    </div>
  );
}
