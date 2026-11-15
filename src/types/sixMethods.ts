export type MethodId = 'method1' | 'method2' | 'method3' | 'method4' | 'method5' | 'method6' | 'method7_unified';

export interface MethodDescriptor {
  id: MethodId;
  methodNumber: number;
  officialName: string;
  tagline: string;
  techStackFrontend: string[];
  techStackBackend: string[];
  aiType: 'Python FastAPI + React' | 'Pure JS / TensorFlow.js' | 'Hybrid Microservice' | 'Deterministic Rules (No AI)' | 'Classical Machine Learning' | 'Deep Learning (CNN/LSTM)' | 'Multi-Method Ensemble';
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
