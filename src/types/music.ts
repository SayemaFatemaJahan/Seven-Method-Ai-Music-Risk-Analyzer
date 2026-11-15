export type DetectionMethod = 'acoustic' | 'neural' | 'blockchain' | 'hybrid';

export type RiskLevel = 'low' | 'moderate' | 'high' | 'critical';

export interface BangladeshiSong {
  id: string;
  catalogNumber: number;
  title: string;
  artist: string;
  genre: 'Rabindra Sangeet' | 'Nazrul Geeti' | 'Baul & Folk' | 'Bangla Rock' | 'Modern Adhunik' | 'Fusion & Pop' | 'Hip Hop & Desi Trap' | 'Classical & Instrumental' | 'Patriotic' | 'Indie Alternative';
  year: number;
  bpm: number;
  key: string;
  duration: string;
  durationSeconds: number;
  isrc: string;
  publisher: string;
  acousticFingerprintHash: string;
  merkleStemRoot: string;
  neuralVectorSignature: number[];
  containsKnownDAWLoop: boolean;
  dawLoopType?: 'Cakewalk Koto Beat' | 'FL Studio 808 Trap' | 'GarageBand World Percussion' | 'Logic Alchemy Pad' | 'None';
  youtubeContentIdStatus: 'Protected / Monitored' | 'Claim On Match' | 'Public Domain Comp / Master Protected';
  dspStatus: 'Cleared for All DSPs' | 'Exclusive Distribution' | 'Restricted Mechanicals';
}

export interface MatchSegment {
  startTime: number;
  endTime: number;
  confidence: number;
  matchedFeature: 'Vocal Melody' | 'Stock Loop (Cakewalk Koto)' | 'Bassline Riff' | 'Full Master' | 'Drum Transient';
  isFalsePositiveSuspect: boolean;
  explanation: string;
}

export interface MatchedSongResult {
  song: BangladeshiSong;
  overallMatchPercentage: number;
  acousticMatchPercentage: number;
  neuralMatchPercentage: number;
  blockchainClaimMatch: boolean;
  matchSegments: MatchSegment[];
}

export interface EnsembleModelVote {
  modelName: string;
  architecture: string;
  weightPercent: number; // e.g. 35%
  riskVotePercentage: number;
  verdict: 'Infringement Suspect' | 'Stock Loop Whitelisted' | 'Clear / Original' | 'Precedence Proven';
  confidence: number;
  reasoning: string;
}

export interface EnsembleConsensusResult {
  consensusRiskPercentage: number;
  falsePositiveVetoTriggered: boolean;
  vetoExplanation: string;
  models: EnsembleModelVote[];
}

export interface RiskBreakdown {
  // YouTube Content ID Risk
  youtubeRiskPercentage: number;
  youtubeRiskTier: '1%' | '20%' | '50%' | '70%' | '80%+';
  youtubeConsequence: string;
  youtubeMonetizationStatus: 'Fully Monetizable' | 'Shared Revenue Likely' | 'Takedown / ContentID Claim';
  
  // DSP Distribution Risk (Spotify, Apple Music, DistroKid, TuneCore)
  dspRiskPercentage: number;
  dspRiskTier: '1%' | '20%' | '50%' | '70%' | '80%+';
  dspConsequence: string;
  dspApprovalLikelihood: 'Guaranteed Store Ingestion' | 'Manual Inspection Flag' | 'Store Rejection / Takendown';
  
  // Audio Analysis Metadata
  detectedBpm: number;
  detectedKey: string;
  waveformMatchConfidence: number;
  spectralMatchConfidence: number;
  tempoMatchConfidence: number;
  
  // False positive specific research telemetry
  rawFalsePositiveRisk: number; // Without filtering
  filteredFalsePositiveRisk: number; // With Cakewalk Koto / DAW filtering
  dawLoopDetected: boolean;
  dawLoopName?: string;
  dawLoopSuppressionGainDb: number;

  // Multi-Model Ensemble Machine Learning Layer
  ensemble: EnsembleConsensusResult;
  
  // Top matched references
  matchedSongs: MatchedSongResult[];
}

export interface TestAudioPreset {
  id: string;
  name: string;
  artist: string;
  genre: string;
  description: string;
  expectedYouTubeRisk: string;
  expectedDSPRisk: string;
  hasCakewalkKotoLoop: boolean;
  bpm: number;
  key: string;
  durationSeconds: number;
  audioSampleType: 'koto-folk-synth' | 'rock-riff' | 'rabindra-cover' | 'trap-loop' | 'clean-original';
}

export interface AlgorithmParams {
  cakewalkKotoFilterEnabled: boolean;
  kotoSuppressionDb: number; // e.g. -24dB
  neuralCosineThreshold: number; // e.g. 0.82
  stemSeparationVocalWeight: number; // e.g. 0.60
  stemSeparationRhythmWeight: number; // e.g. 0.15
  blockchainMerkleTolerance: number; // e.g. 0.05
  fftWindowSize: number; // e.g. 2048
}
