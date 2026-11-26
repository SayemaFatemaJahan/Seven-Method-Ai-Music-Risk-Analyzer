// =====================================================================
// koomRo - Seven-Method Audio Processing Type Definitions
// Author: Sayema Fatema Jahan
// Institution: Presidency University | Student ID: 232044038
//
// In this file, I define the TypeScript interfaces for my 7 acoustic methods:
// 1. Chroma CQT Harmonic Analyzer
// 2. Log-Mel Spectrogram Neural Stream
// 3. MFCC Timbral Stem Discriminator
// 4. Tempogram & Metric Onset Analyzer
// 5. Tonnetz Tonal Centroid Mapper
// 6. Spectral Contrast & Texture Stream
// 7. Multi-Signal Deep Attention Fusion
// =====================================================================

export type MethodId = 'method1' | 'method2' | 'method3' | 'method4' | 'method5' | 'method6' | 'method7_unified';

export interface MethodDescriptor {
  id: MethodId;
  methodNumber: number;
  officialName: string;
  tagline: string;
  techStackFrontend: string[];
  techStackBackend: string[];
  aiType: 
    | 'Chroma Harmonic Analysis'
    | 'Log-Mel Spectrogram CNN'
    | 'MFCC Timbre Analysis'
    | 'Tempogram Metric Analysis'
    | 'Tonnetz Tonal Centroid'
    | 'Spectral Contrast Dynamics'
    | 'Multi-Signal Attention Fusion'
    | 'Python FastAPI + React'
    | 'Pure JS / TensorFlow.js'
    | 'Hybrid Microservice'
    | 'Deterministic Rules (No AI)'
    | 'Classical Machine Learning'
    | 'Deep Learning (CNN/LSTM)'
    | 'Multi-Method Ensemble';
  description: string;
  pros: string[];
  cons: string[];
  academicUsefulness: string;
}

export interface SingleMethodResult {
  methodId: MethodId;
  methodName: string;
  riskPercentage: number;
  riskTier: '1%' | '20%' | '50%' | '70%' | '80%+';
  youtubeRiskPercentage: number;
  dspRiskPercentage: number;
  verdict: 'Clear / Original' | 'Stock Loop Collision (False Positive Risk)' | 'Cover Song / Licensing Required' | 'Direct Infringement';
  confidence: number;
  processingTimeMs: number;
  detectedFeatures: {
    tempoBpm: number;
    harmonicKey: string;
    spectralOverlapPercent: number;
    mfccDistance?: number;
    chromaSimilarity?: number;
    neuralCosineSimilarity?: number;
    dawLoopRecognized: boolean;
  };
  explanation: string;
}

export interface UnifiedMultiMethodResult {
  analyzedTrack: string;
  overallConsensusRisk: number;
  youtubeConsensusRisk: number;
  dspConsensusRisk: number;
  resultsByMethod: Record<MethodId, SingleMethodResult>;
  falsePositiveVetoTriggered: boolean;
  scientificConclusion: string;
}

export interface MethodCodeFile {
  filename: string;
  language: 'python' | 'typescript' | 'html' | 'json';
  purpose: string;
  code: string;
}

export interface MethodCodePackage {
  methodId: MethodId;
  title: string;
  backendInstructions: string[];
  frontendInstructions: string[];
  files: MethodCodeFile[];
}
