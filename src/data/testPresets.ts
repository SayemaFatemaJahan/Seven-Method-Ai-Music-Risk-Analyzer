import { TestAudioPreset } from '../types/music';

export const RESEARCH_TEST_PRESETS: TestAudioPreset[] = [
  {
    id: 'cakewalk-koto-experiment',
    name: 'Cakewalk Koto Beat + Original Bangla Melody',
    artist: 'Independent Artist (User Demo)',
    genre: 'Fusion & Folk',
    description: 'Uses the standard Cakewalk virtual instrument beat of Koto as a background rhythmic layer, but has completely original lyrics, distinct vocal melody, and unique chords. Standard acoustic algorithms falsely flag this as 28.5% copyright infringement!',
    expectedYouTubeRisk: '28% without Filter -> 1% with Neural Filter',
    expectedDSPRisk: '32% without Filter -> 2% with Neural Filter',
    hasCakewalkKotoLoop: true,
    bpm: 102,
    key: 'F Minor',
    durationSeconds: 185,
    audioSampleType: 'koto-folk-synth'
  },
  {
    id: 'pure-original-rock',
    name: 'Pure Original Bangla Rock Riff & Vocals',
    artist: 'Shadheen Band (Indie)',
    genre: 'Bangla Rock',
    description: '100% original live guitar tracking, live acoustic drum recording, and original vocal performance. No stock DAW loops used.',
    expectedYouTubeRisk: '1% (Safe / Clean)',
    expectedDSPRisk: '1% (Guaranteed DSP Approval)',
    hasCakewalkKotoLoop: false,
    bpm: 126,
    key: 'D Minor',
    durationSeconds: 215,
    audioSampleType: 'rock-riff'
  },
  {
    id: 'rabindra-cover-licensing',
    name: 'Acoustic Re-interpretation of "Tumi Robe Nirobe"',
    artist: 'Independent Singer-Songwriter',
    genre: 'Rabindra Sangeet Re-imagined',
    description: 'Composition is in public domain, but melody matches traditional structure. YouTube allows monetized covers under revenue share, but DSPs require mechanical cover clearance.',
    expectedYouTubeRisk: '48% (Cover Song Match / Rev Share)',
    expectedDSPRisk: '22% (Requires Mechanical Cover Flag)',
    hasCakewalkKotoLoop: false,
    bpm: 68,
    key: 'C Major',
    durationSeconds: 240,
    audioSampleType: 'rabindra-cover'
  },
  {
    id: 'trap-808-stock-collision',
    name: 'Desi Trap with Free FL Studio 808 Sub-loop',
    artist: 'Dhaka Beatmaker',
    genre: 'Hip Hop & Desi Trap',
    description: 'Contains a free royalty-free 808 drum loop from FL Studio stock library. Three other artists uploaded tracks with this exact beat.',
    expectedYouTubeRisk: '36% without Filter -> 3% with Neural Stem Filter',
    expectedDSPRisk: '40% without Filter -> 4% with Neural Stem Filter',
    hasCakewalkKotoLoop: false,
    bpm: 140,
    key: 'G Minor',
    durationSeconds: 165,
    audioSampleType: 'trap-loop'
  },
  {
    id: 'direct-guitar-sample',
    name: 'Direct Audio Sample of "Shei Tumi" Guitar Solo',
    artist: 'Unauthorized Sample Test (YouTube Extracted)',
    genre: 'Rock Sample Collision',
    description: 'Contains 14 seconds of direct un-altered master recording sampled from Ayub Bachchu LRB solo. Guaranteed ContentID strike!',
    expectedYouTubeRisk: '84% (Critical Master Recording Claim)',
    expectedDSPRisk: '89% (Immediate DSP Takedown / ISRC Flag)',
    hasCakewalkKotoLoop: false,
    bpm: 78,
    key: 'E Minor',
    durationSeconds: 198,
    audioSampleType: 'clean-original'
  }
];
