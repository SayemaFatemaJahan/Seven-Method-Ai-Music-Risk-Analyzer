import { MethodDescriptor } from '../types/sevenMethods';

export const METHOD_DESCRIPTORS: Record<string, MethodDescriptor> = {
  method1: {
    id: 'method1',
    methodNumber: 1,
    officialName: 'Chroma CQT Harmonic Analyzer',
    tagline: 'Harmonic & Melodic Plagiarism Detection via 12-Class Constant-Q Pitch Profiling',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Harmonic Pitch Visualizer'],
    techStackBackend: ['Python 3.11', 'Librosa CQT', 'NumPy', 'PyTorch'],
    aiType: 'Chroma Harmonic Analysis',
    description: 'Analyzes 12-dimensional pitch chroma distributions invariant to octave and instrumentation. Detects melodic copying, re-recorded covers, and stolen chord progressions even when played on different synthesizers or traditional instruments.',
    pros: [
      'Invariant to instrument timbre, octave shifts, and vocal registers',
      'Accurately flags re-recorded melody covers and stolen chord sequences',
      'Provides clear musical explainability for copyright arbitration'
    ],
    cons: [
      'Cannot detect rhythm-only or drum sample theft by itself',
      'Requires complementary timbral signals to verify vocal stem identity'
    ],
    academicUsefulness: 'Primary acoustic signal for establishing melodic and compositional copyright infringement in musicology.'
  },
  method2: {
    id: 'method2',
    methodNumber: 2,
    officialName: 'Log-Mel Spectrogram Neural Stream',
    tagline: 'Deep Time-Frequency Acoustic Signature via 128-Band Perceptual Filtering',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Spectrogram Heatmap'],
    techStackBackend: ['Python 3.11', 'PyTorch Torchaudio', 'Librosa Mel', 'CUDA'],
    aiType: 'Log-Mel Spectrogram CNN',
    description: 'Transforms raw audio into high-resolution 128-band Mel scale representations modeled after human auditory perception. Captures structural energy distributions across time and feeds a 2D convolutional feature extraction stream.',
    pros: [
      'Captures holistic time-frequency audio fingerprint simultaneously',
      'Naturally compatible with modern 2D Convolutional Neural Networks',
      'Robust against subtle background noise and compression artifacts'
    ],
    cons: [
      'High dimensionality requires neural dimensionality reduction',
      'Sensitive to master volume normalization differences if unscaled'
    ],
    academicUsefulness: 'Standard baseline spectral signal used across modern ISMIR deep representation learning papers.'
  },
  method3: {
    id: 'method3',
    methodNumber: 3,
    officialName: 'MFCC Timbral Stem Discriminator',
    tagline: 'Timbre, Vocal Formants & Sample Clearance via 20 Mel-Frequency Cepstral Coefficients',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Timbre Radar'],
    techStackBackend: ['Python 3.11', 'Librosa MFCC', 'SciPy Signal', 'FastAPI'],
    aiType: 'MFCC Timbre Analysis',
    description: 'Isolates the unique acoustic timbre and formant envelope of instruments and vocalists using 20 cepstral coefficients. Specifically engineered to flag direct audio stem sampling, vocal cloning, and identical synthesizer presets.',
    pros: [
      'Extremely sensitive to vocal identity, singer formants, and microphone color',
      'Highest accuracy for detecting direct uncredited master stem sampling',
      'Compact feature representation allows sub-millisecond distance metrics'
    ],
    cons: [
      'Can produce false positives on shared DAW synthesizer factory presets',
      'De-biasing filters required for common royalty-free background loops'
    ],
    academicUsefulness: 'Crucial for music forensic engineering and automated sample-clearance verification.'
  },
  method4: {
    id: 'method4',
    methodNumber: 4,
    officialName: 'Tempogram & Metric Onset Analyzer',
    tagline: 'Rhythm, Beat Grid & Drum Loop Duplication via Dynamic Onset Envelope',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'BPM Pulse Monitor'],
    techStackBackend: ['Python 3.11', 'Librosa Tempogram', 'NumPy', 'SciPy'],
    aiType: 'Tempogram Metric Analysis',
    description: 'Constructs multi-scale onset correlation matrices to assess tempo, groove synchronization, and drum cadence. Differentiates between shared generic tempos and identical copyrighted drum loop syncopations.',
    pros: [
      'Discloses identical drum groove swing, subdivisions, and syncopation patterns',
      'Tempo-invariant metric correlation through cyclic tempogram analysis',
      'Exposes rhythmic plagiarism independent of key or pitch alterations'
    ],
    cons: [
      'Standard 4/4 pop drum beats can score high baseline rhythmic similarity',
      'Requires melodic and harmonic context to avoid flagging generic grooves'
    ],
    academicUsefulness: 'Essential signal for evaluating beat theft claims in modern Hip-Hop, Pop, and EDM productions.'
  },
  method5: {
    id: 'method5',
    methodNumber: 5,
    officialName: 'Tonnetz Tonal Centroid Mapper',
    tagline: 'Harmonic Vector Space Projection (Chords, 5ths & 3rds Circles)',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Tonal Space Chart'],
    techStackBackend: ['Python 3.11', 'Librosa Tonnetz', 'PyTorch', 'NumPy'],
    aiType: 'Tonnetz Tonal Centroid',
    description: 'Projects harmonic pitch chroma into a 6-dimensional tonal centroid space representing fifths, minor thirds, and major thirds. Detects harmonic sequence theft and key modulation plagiarism invariant to transposition.',
    pros: [
      'Transposition-invariant: detects borrowed chord progressions even if pitched up or down',
      'Geometric representation of tonal harmony based on Euler lattice theory',
      'High accuracy on complex classical and modal compositions'
    ],
    cons: [
      'Low sensitivity to percussive transients or rhythmic deviations',
      'Computationally dependent on high-fidelity harmonic separation'
    ],
    academicUsefulness: 'Theoretical musicology foundation for proving non-coincidental harmonic progression imitation.'
  },
  method6: {
    id: 'method6',
    methodNumber: 6,
    officialName: 'Spectral Contrast & Texture Stream',
    tagline: 'Dynamic Valley-to-Peak Energy & Acoustic Brightness Analysis',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Spectral Flux Scope'],
    techStackBackend: ['Python 3.11', 'Librosa Spectral Contrast', 'NumPy'],
    aiType: 'Spectral Contrast Dynamics',
    description: 'Evaluates the ratio between harmonic peaks and noise-floor valleys across 7 sub-bands. Determines audio mastering brightness, sound design identity, and production texture matches.',
    pros: [
      'Distinguishes between acoustic instruments and harsh synthetic wall-of-sound textures',
      'Robust indicator of shared audio mastering and dynamic processing profiles',
      'Highly complementary to MFCC for acoustic texture classification'
    ],
    cons: [
      'Vulnerable to aggressive multiband compression or radio remastering',
      'Must be combined with pitch and tempo signals for conclusive verdicts'
    ],
    academicUsefulness: 'Demonstrates deep audio production forensic analysis in multi-feature research.'
  },
  method7_unified: {
    id: 'method7_unified',
    methodNumber: 7,
    officialName: 'Multi-Signal Deep Attention Fusion',
    tagline: 'Master Multi-Branch Neural Architecture: Self-Attention Joint Metric Embedding',
    techStackFrontend: ['React 19', 'TypeScript', 'Tailwind CSS', 'Multi-Stream Risk Matrix'],
    techStackBackend: ['PyTorch MultiSignalFusionNet', 'Triplet Loss', 'FastAPI', 'CUDA'],
    aiType: 'Multi-Signal Attention Fusion',
    description: 'The apex thesis contribution: simultaneously ingests all 6 acoustic signals through dedicated parallel CNN branches, weights their interactions via multi-head self-attention, and projects into a 256-D unified copyright embedding space for definitive Content ID verification.',
    pros: [
      'End-to-end multi-signal neural fusion eliminating single-feature false positives',
      'Self-attention dynamically balances melody vs rhythm vs timbre importance',
      'Direct Cosine Distance projection outputs calibrated 0-100% platform strike risk'
    ],
    cons: [
      'Requires GPU-accelerated forward pass for batch processing (CPU fallback supported)',
      'Demands multi-task triplet dataset training'
    ],
    academicUsefulness: 'The central scientific novelty of your thesis: Multi-Signal Neural Audio Processing outperforms single-signal baselines.'
  }
};
