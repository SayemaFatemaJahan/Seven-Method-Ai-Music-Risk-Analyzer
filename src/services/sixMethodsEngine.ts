import { MethodId, SingleMethodResult, UnifiedMultiMethodResult } from '../types/sixMethods';
import { METHOD_DESCRIPTORS } from '../data/methodDescriptors';

export interface MethodRunnerInput {
  trackTitle: string;
  artist: string;
  bpm: number;
  key: string;
  durationSeconds: number;
  hasCakewalkKotoLoop: boolean;
  sampleType?: string;
  dawFilterEnabled?: boolean;
}

/**
 * Calculates copyright risk and telemetry across each of the 6 distinct architectural methodologies.
 */
export function executeMethodSimulation(methodId: MethodId, input: MethodRunnerInput): SingleMethodResult {
  const { hasCakewalkKotoLoop, sampleType, bpm, key, dawFilterEnabled = true } = input;
  const isDirectSample = sampleType === 'clean-original';
  const isCoverSong = sampleType === 'rabindra-cover';

  let riskPercentage = 1;
  let youtubeRiskPercentage = 1;
  let dspRiskPercentage = 1;
  let verdict: SingleMethodResult['verdict'] = 'Clear / Original';
  let confidence = 0.95;
  let processingTimeMs = 45;
  let spectralOverlapPercent = 2.0;
  let chromaSimilarity = 0.12;
  let mfccDistance = 3.8;
  let neuralCosineSimilarity = 0.05;
  let explanation = '';

  switch (methodId) {
    case 'method1': // Python AI Backend + React Frontend (FastAPI & Librosa)
      processingTimeMs = 380; // Network roundtrip + Librosa FFT
      if (isDirectSample) {
        riskPercentage = 86;
        youtubeRiskPercentage = 88;
        dspRiskPercentage = 84;
        verdict = 'Direct Infringement';
        explanation = '[FastAPI Librosa Service] MFCC Euclidean distance = 0.14 from reference master. Identical acoustic waveform segments identified via dynamic time warping (DTW).';
      } else if (isCoverSong) {
        riskPercentage = 52;
        youtubeRiskPercentage = 50;
        dspRiskPercentage = 24;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[FastAPI Librosa Service] Librosa chroma_cqt detected 82% harmonic pitch class profile match to traditional Rabindra Sangeet composition. Requires mechanical license.';
      } else if (hasCakewalkKotoLoop) {
        // Without loop de-biasing, raw Librosa spectral peaks match
        riskPercentage = dawFilterEnabled ? 2 : 28;
        youtubeRiskPercentage = dawFilterEnabled ? 1 : 28;
        dspRiskPercentage = dawFilterEnabled ? 2 : 32;
        verdict = dawFilterEnabled ? 'Clear / Original' : 'Stock Loop Collision (False Positive Risk)';
        explanation = dawFilterEnabled
          ? '[FastAPI Librosa Service] Cakewalk Koto frequency bins filtered via Python SciPy iirnotch filter (-24dB). Mel-spectrogram confirms vocal originality.'
          : '[FastAPI Librosa Service] Raw Librosa spectral peaks show 28.4% energy collision with catalog tracks sharing the Cakewalk Koto virtual instrument.';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[FastAPI Librosa Service] Librosa feature vectors (MFCC, centroid, rolloff) show 98.8% statistical divergence from protected database.';
      }
      break;

    case 'method2': // Pure JavaScript / TypeScript (Web Audio API & TensorFlow.js)
      processingTimeMs = 18; // In-browser zero-backend execution
      if (isDirectSample) {
        riskPercentage = 84;
        youtubeRiskPercentage = 85;
        dspRiskPercentage = 82;
        verdict = 'Direct Infringement';
        explanation = '[Web Audio API & TF.js] Client-side AnalyserNode FFT frames match reference waveform hash. Executed 100% locally in browser memory.';
      } else if (isCoverSong) {
        riskPercentage = 46;
        youtubeRiskPercentage = 45;
        dspRiskPercentage = 20;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[Web Audio API & TF.js] 12-bin Pitch Chroma extraction in WebGL indicates traditional harmonic alignment.';
      } else if (hasCakewalkKotoLoop) {
        riskPercentage = dawFilterEnabled ? 1 : 27;
        youtubeRiskPercentage = dawFilterEnabled ? 1 : 27;
        dspRiskPercentage = dawFilterEnabled ? 1 : 30;
        verdict = dawFilterEnabled ? 'Clear / Original' : 'Stock Loop Collision (False Positive Risk)';
        explanation = dawFilterEnabled
          ? '[Web Audio API & TF.js] Client-side Float32Array DSP suppressed pentatonic Koto bins (293Hz-523Hz). Zero data sent to external servers.'
          : '[Web Audio API & TF.js] FFT bin correlation flagged identical stock loop peaks. Local TF.js tensor distance = 0.28.';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[Web Audio API & TF.js] Audio buffer decoded in browser. All cosine distance checks confirm original material.';
      }
      break;

    case 'method3': // Enterprise Hybrid (FastAPI + React + PostgreSQL/MongoDB)
      processingTimeMs = 210;
      if (isDirectSample) {
        riskPercentage = 88;
        youtubeRiskPercentage = 89;
        dspRiskPercentage = 86;
        verdict = 'Direct Infringement';
        explanation = '[SoundVault PostgreSQL Query] Sub-millisecond pgvector similarity search against 1,000 pre-indexed Bangladeshi songs matched BD-S84-93-00001 (Ayub Bachchu).';
      } else if (isCoverSong) {
        riskPercentage = 54;
        youtubeRiskPercentage = 52;
        dspRiskPercentage = 22;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[SoundVault PostgreSQL Query] Matched composition ISRC in Public Domain registry. DSP delivery requires mechanical cover flag.';
      } else if (hasCakewalkKotoLoop) {
        riskPercentage = dawFilterEnabled ? 2 : 29;
        youtubeRiskPercentage = dawFilterEnabled ? 1 : 29;
        dspRiskPercentage = dawFilterEnabled ? 2 : 33;
        verdict = dawFilterEnabled ? 'Clear / Original' : 'Stock Loop Collision (False Positive Risk)';
        explanation = dawFilterEnabled
          ? '[SoundVault Database Index] Stock soundbank table identified Cakewalk Koto preset. De-biasing rule applied before recording audit log.'
          : '[SoundVault Database Index] Relational vector search flagged 3 catalog entries sharing the identical Cakewalk Koto accompaniment.';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[SoundVault Database Index] 0 collisions found across 1,000 indexed records. Metadata clearance entry generated.';
      }
      break;

    case 'method4': // Rule-Based Copyright Detector (Deterministic DSP, No AI)
      processingTimeMs = 8; // Ultra-fast deterministic IF/THEN checks
      if (isDirectSample) {
        riskPercentage = 92;
        youtubeRiskPercentage = 95;
        dspRiskPercentage = 90;
        verdict = 'Direct Infringement';
        explanation = '[RuleHarmonic DSP Rules] RULE 1 (Tempo delta <= 1 BPM): TRUE | RULE 2 (Chroma overlap > 85%): TRUE | RULE 3 (Spectral Flux < 0.05): TRUE. Verdict: HIGH RISK.';
      } else if (isCoverSong) {
        riskPercentage = 68;
        youtubeRiskPercentage = 65;
        dspRiskPercentage = 40;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[RuleHarmonic DSP Rules] RULE: Chroma pitch overlap = 84.2% (> 80% threshold). Fails deterministic originality rule.';
      } else if (hasCakewalkKotoLoop) {
        // High false positive because rules cannot differentiate background loops!
        riskPercentage = dawFilterEnabled ? 4 : 32;
        youtubeRiskPercentage = dawFilterEnabled ? 2 : 32;
        dspRiskPercentage = dawFilterEnabled ? 4 : 35;
        verdict = dawFilterEnabled ? 'Clear / Original' : 'Stock Loop Collision (False Positive Risk)';
        explanation = dawFilterEnabled
          ? '[RuleHarmonic DSP Rules] Pre-filter Rule: Suppressed frequency bins 38-42. Post-rule check passes under 5% threshold.'
          : '[RuleHarmonic DSP Rules] CRITICAL FALSE POSITIVE! Deterministic Rule triggered: Identical spectral peaks detected in 440Hz/523Hz bins. Rule-based systems CANNOT detect that vocals are different!';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[RuleHarmonic DSP Rules] All deterministic thresholds (Tempo, Key, Spectral correlation) are well below the 15% alert barrier.';
      }
      break;

    case 'method5': // Machine Learning (Random Forest & SVM on MFCC/Chroma)
      processingTimeMs = 120;
      if (isDirectSample) {
        riskPercentage = 87;
        youtubeRiskPercentage = 86;
        dspRiskPercentage = 88;
        verdict = 'Direct Infringement';
        explanation = '[FeatureNet Scikit-Learn] Random Forest (100 trees) vote: 88.4% Infringement | SVM (RBF kernel) decision function: +2.41. Top predictive features: MFCC_2 and Spectral_Contrast_3.';
      } else if (isCoverSong) {
        riskPercentage = 48;
        youtubeRiskPercentage = 48;
        dspRiskPercentage = 22;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[FeatureNet Scikit-Learn] Random Forest classified as "Melodic Derivative". Probability = 0.51.';
      } else if (hasCakewalkKotoLoop) {
        riskPercentage = dawFilterEnabled ? 2 : 24;
        youtubeRiskPercentage = dawFilterEnabled ? 1 : 24;
        dspRiskPercentage = dawFilterEnabled ? 2 : 28;
        verdict = dawFilterEnabled ? 'Clear / Original' : 'Stock Loop Collision (False Positive Risk)';
        explanation = dawFilterEnabled
          ? '[FeatureNet Scikit-Learn] Feature vectors normalized with stock loop masking. Random forest probability drops to 1.8%.'
          : '[FeatureNet Scikit-Learn] MFCC statistical summary influenced by repetitive Koto transients. SVM predicts 24.2% collision probability.';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[FeatureNet Scikit-Learn] Random Forest classifier: 99.1% probability "Original Track".';
      }
      break;

    case 'method6': // Deep Learning (2D Mel-CNN & Bi-LSTM Attention Network)
      processingTimeMs = 490; // Deep neural network forward pass
      confidence = 0.99;
      if (isDirectSample) {
        riskPercentage = 91;
        youtubeRiskPercentage = 92;
        dspRiskPercentage = 90;
        verdict = 'Direct Infringement';
        explanation = '[DeepSpectra PyTorch CNN-LSTM] Perceptual embedding Cosine Similarity = 0.942. Attention heatmap highlights identical 14-second audio segment.';
      } else if (isCoverSong) {
        riskPercentage = 42;
        youtubeRiskPercentage = 40;
        dspRiskPercentage = 18;
        verdict = 'Cover Song / Licensing Required';
        explanation = '[DeepSpectra PyTorch CNN-LSTM] Convolutional layers isolated harmonic melodic contour of Rabindra Sangeet. Recommends mechanical clearance.';
      } else if (hasCakewalkKotoLoop) {
        // Deep learning with stem separation naturally suppresses background loops
        riskPercentage = dawFilterEnabled ? 1 : 6;
        youtubeRiskPercentage = dawFilterEnabled ? 1 : 5;
        dspRiskPercentage = dawFilterEnabled ? 1 : 7;
        verdict = 'Clear / Original';
        explanation = '[DeepSpectra PyTorch CNN-LSTM] Deep stem separation isolated vocal lead from background accompaniment. Cosine similarity of vocal embedding = 0.04 (Original). Cakewalk Koto loop automatically de-weighted!';
      } else {
        riskPercentage = 1;
        youtubeRiskPercentage = 1;
        dspRiskPercentage = 1;
        explanation = '[DeepSpectra PyTorch CNN-LSTM] Multi-head self-attention embedding distance = 0.991 from all 1,000 Bangladeshi catalog tracks.';
      }
      break;

    default:
      break;
  }

  // Format Tier
  let riskTier: SingleMethodResult['riskTier'] = '1%';
  if (riskPercentage >= 80) riskTier = '80%+';
  else if (riskPercentage >= 70) riskTier = '70%';
  else if (riskPercentage >= 50) riskTier = '50%';
  else if (riskPercentage >= 20) riskTier = '20%';

  return {
    methodId,
    methodName: METHOD_DESCRIPTORS[methodId]?.officialName || methodId,
    riskPercentage,
    riskTier,
    youtubeRiskPercentage,
    dspRiskPercentage,
    verdict,
    confidence,
    processingTimeMs,
    detectedFeatures: {
      tempoBpm: bpm,
      harmonicKey: key,
      spectralOverlapPercent: parseFloat(spectralOverlapPercent.toFixed(1)),
      mfccDistance,
      chromaSimilarity,
      neuralCosineSimilarity,
      dawLoopRecognized: hasCakewalkKotoLoop
    },
    explanation
  };
}

/**
 * Runs all 6 methods in parallel for the 7th website ("Multi-Method Ai music analyzer with 6 methods")
 */
export function executeUnifiedSevenMethods(input: MethodRunnerInput): UnifiedMultiMethodResult {
  const methodIds: MethodId[] = ['method1', 'method2', 'method3', 'method4', 'method5', 'method6'];
  const resultsByMethod: Record<MethodId, SingleMethodResult> = {} as Record<MethodId, SingleMethodResult>;

  let totalRisk = 0;
  let totalYtRisk = 0;
  let totalDspRisk = 0;

  for (const id of methodIds) {
    const res = executeMethodSimulation(id, input);
    resultsByMethod[id] = res;
    totalRisk += res.riskPercentage;
    totalYtRisk += res.youtubeRiskPercentage;
    totalDspRisk += res.dspRiskPercentage;
  }

  // Check if Deep Learning (Method 6) or Neural filters vetoed Rule-Based (Method 4) false positive
  const ruleBasedResult = resultsByMethod['method4'];
  const deepLearningResult = resultsByMethod['method6'];
  const falsePositiveVetoTriggered = input.hasCakewalkKotoLoop && ruleBasedResult.riskPercentage > 20 && deepLearningResult.riskPercentage <= 6;

  const overallConsensusRisk = falsePositiveVetoTriggered 
    ? 1 
    : Math.round(totalRisk / methodIds.length);

  const youtubeConsensusRisk = falsePositiveVetoTriggered 
    ? 1 
    : Math.round(totalYtRisk / methodIds.length);

  const dspConsensusRisk = falsePositiveVetoTriggered 
    ? 1 
    : Math.round(totalDspRisk / methodIds.length);

  let scientificConclusion = '';
  if (falsePositiveVetoTriggered) {
    scientificConclusion = `Cross-Method Research Finding: Method 4 (Rule-Based DSP) falsely flagged ${ruleBasedResult.riskPercentage}% copyright risk due to the Cakewalk Koto virtual instrument beat. In contrast, Method 6 (Deep Learning CNN-LSTM) isolated the vocal stem and proved 99% originality. The Multi-Method Consensus safely overrides the false claim.`;
  } else if (input.sampleType === 'clean-original') {
    scientificConclusion = 'All 6 methods uniformly identified direct master recording theft (>84% infringement consensus). Immediate ContentID takedown imminent.';
  } else {
    scientificConclusion = 'All 6 methods confirmed pristine originality. Approved for automated YouTube monetization and Spotify/Apple Music store distribution.';
  }

  return {
    analyzedTrack: input.trackTitle,
    overallConsensusRisk,
    youtubeConsensusRisk,
    dspConsensusRisk,
    resultsByMethod,
    falsePositiveVetoTriggered,
    scientificConclusion
  };
}
