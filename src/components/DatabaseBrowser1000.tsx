import React, { useState, useMemo } from 'react';
import { Database, Search, Filter, Plus, Music, Play, Shield, Hash, ExternalLink, Check, AlertCircle } from 'lucide-react';
import { BangladeshiSong } from '../types/music';
import { audioEngine } from '../services/audioEngine';

interface DatabaseBrowser1000Props {
  songs: BangladeshiSong[];
  onAddSong: (newSong: BangladeshiSong) => void;
  onAnalyzeAgainstSong: (song: BangladeshiSong) => void;
}

export const DatabaseBrowser1000: React.FC<DatabaseBrowser1000Props> = ({
  songs,
  onAddSong,
  onAnalyzeAgainstSong
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [filterDawLoopOnly, setFilterDawLoopOnly] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [inspectingSong, setInspectingSong] = useState<BangladeshiSong | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Song Form State
  const [newTitle, setNewTitle] = useState('');
  const [newArtist, setNewArtist] = useState('');
  const [newGenre, setNewGenre] = useState<BangladeshiSong['genre']>('Bangla Rock');
  const [newBpm, setNewBpm] = useState(105);
  const [newKey, setNewKey] = useState('D Minor');
  const [newDawLoop, setNewDawLoop] = useState(false);
  const [youtubeSourceUrl, setYoutubeSourceUrl] = useState('');

  const pageSize = 15;

  const genres = [
    'all',
    'Bangla Rock',
    'Rabindra Sangeet',
    'Nazrul Geeti',
    'Baul & Folk',
    'Modern Adhunik',
    'Fusion & Pop',
    'Indie Alternative',
    'Hip Hop & Desi Trap',
    'Classical & Instrumental',
    'Patriotic'
  ];

  const filteredSongs = useMemo(() => {
    return songs.filter(s => {
      const matchesSearch = 
        s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.isrc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.key.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGenre = selectedGenre === 'all' || s.genre === selectedGenre;
      const matchesDaw = !filterDawLoopOnly || s.containsKnownDAWLoop;

      return matchesSearch && matchesGenre && matchesDaw;
    });
  }, [songs, searchQuery, selectedGenre, filterDawLoopOnly]);

  const totalPages = Math.ceil(filteredSongs.length / pageSize);
  const paginatedSongs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredSongs.slice(start, start + pageSize);
  }, [filteredSongs, currentPage]);

  const handleCreateSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newArtist.trim()) return;

    const newId = `bd-song-custom-${Date.now()}`;
    const newCatalogNum = songs.length + 1;
    const song: BangladeshiSong = {
      id: newId,
      catalogNumber: newCatalogNum,
      title: newTitle.trim(),
      artist: newArtist.trim(),
      genre: newGenre,
      year: 2026,
      bpm: Number(newBpm),
      key: newKey,
      duration: '3:30',
      durationSeconds: 210,
      isrc: `BD-YT7-26-${String(newCatalogNum).padStart(5, '0')}`,
      publisher: youtubeSourceUrl ? 'YouTube Extracted Master' : 'Independent Author Archive',
      acousticFingerprintHash: `fp_${Math.random().toString(16).slice(2, 14)}`,
      merkleStemRoot: `0x${Math.random().toString(16).slice(2, 42)}`,
      neuralVectorSignature: [0.65, 0.42, 0.88, 0.31, 0.55],
      containsKnownDAWLoop: newDawLoop,
      dawLoopType: newDawLoop ? 'Cakewalk Koto Beat' : 'None',
      youtubeContentIdStatus: 'Protected / Monitored',
      dspStatus: 'Cleared for All DSPs'
    };

    onAddSong(song);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewArtist('');
    setYoutubeSourceUrl('');
    setNewDawLoop(false);
  };

  const playSongPreview = (song: BangladeshiSong) => {
    let presetType: 'koto-folk-synth' | 'rock-riff' | 'rabindra-cover' | 'trap-loop' | 'clean-original' = 'clean-original';
    if (song.containsKnownDAWLoop || song.genre === 'Fusion & Pop') presetType = 'koto-folk-synth';
    else if (song.genre === 'Bangla Rock') presetType = 'rock-riff';
    else if (song.genre === 'Rabindra Sangeet' || song.genre === 'Nazrul Geeti') presetType = 'rabindra-cover';
    
    const buffer = audioEngine.generatePresetAudioBuffer(presetType, 8);
    audioEngine.playBuffer(buffer, 0);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
      {/* Title & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Authorized Bangladeshi Music Registry (1,000 Tracks)
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Indexed classical, folk, rock, and modern Bangladeshi compositions with neural & blockchain fingerprints
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono text-slate-400">
            Total Indexed: <span className="text-indigo-400 font-bold">{songs.length}</span>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors flex items-center gap-1.5 shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Song / YouTube Audio
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
            <input
              type="text"
              placeholder="Search by song title, artist, ISRC, or key..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-950/80 border border-slate-800 text-xs text-white pl-9 pr-4 py-2 rounded-lg focus:outline-none focus:border-indigo-500 font-mono"
            />
          </div>

          {/* Cakewalk / Stock Loop Vulnerability Toggle */}
          <button
            onClick={() => {
              setFilterDawLoopOnly(!filterDawLoopOnly);
              setCurrentPage(1);
            }}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
              filterDawLoopOnly
                ? 'bg-amber-950/60 border-amber-500 text-amber-300'
                : 'bg-slate-950/80 border-slate-800 text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
            Show Stock DAW Loop Songs Only ({songs.filter(s => s.containsKnownDAWLoop).length})
          </button>
        </div>

        {/* Genre Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {genres.map(g => (
            <button
              key={g}
              onClick={() => {
                setSelectedGenre(g);
                setCurrentPage(1);
              }}
              className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedGenre === g
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {g === 'all' ? 'All Genres' : g}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Table */}
      <div className="border border-slate-800 rounded-lg overflow-hidden bg-slate-950/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-mono text-[11px]">
              <tr>
                <th className="py-2.5 px-3 w-12 text-center">#</th>
                <th className="py-2.5 px-3">Title & Artist</th>
                <th className="py-2.5 px-3">Genre</th>
                <th className="py-2.5 px-3 text-right">Tempo & Key</th>
                <th className="py-2.5 px-3">DAW Loop Flag</th>
                <th className="py-2.5 px-3">ISRC Code</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {paginatedSongs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500 font-mono text-xs">
                    No songs match your query. Try resetting filters.
                  </td>
                </tr>
              ) : (
                paginatedSongs.map((song) => (
                  <tr key={song.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-2.5 px-3 font-mono text-slate-500 text-center text-[11px] tabular-nums">
                      {song.catalogNumber}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-semibold text-white text-xs">{song.title}</div>
                      <div className="text-[11px] text-slate-400">{song.artist} ({song.year})</div>
                    </td>
                    <td className="py-2.5 px-3 text-slate-300 text-[11px]">
                      {song.genre}
                    </td>
                    <td className="py-2.5 px-3 text-right font-mono text-slate-300 tabular-nums text-[11px]">
                      {song.bpm} BPM · {song.key}
                    </td>
                    <td className="py-2.5 px-3">
                      {song.containsKnownDAWLoop ? (
                        <span className="text-[10px] font-mono text-amber-400 bg-amber-950/50 px-1.5 py-0.5 rounded border border-amber-800/40">
                          {song.dawLoopType}
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono text-slate-500">
                          Clean Master
                        </span>
                      )}
                    </td>
                    <td className="py-2.5 px-3 font-mono text-slate-400 text-[10px]">
                      {song.isrc}
                    </td>
                    <td className="py-2.5 px-3 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => playSongPreview(song)}
                        title="Audition synthesized preview"
                        className="p-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors inline-flex"
                      >
                        <Play className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setInspectingSong(song)}
                        className="px-2 py-1 text-[10px] font-semibold text-indigo-400 hover:text-indigo-300 bg-indigo-950/40 hover:bg-indigo-950 border border-indigo-900 rounded transition-colors inline-flex"
                      >
                        Inspect
                      </button>
                      <button
                        onClick={() => onAnalyzeAgainstSong(song)}
                        className="px-2 py-1 text-[10px] font-semibold text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded transition-colors inline-flex"
                      >
                        Match Test
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs font-mono text-slate-400">
          <div>
            Showing {(currentPage - 1) * pageSize + 1} - {Math.min(currentPage * pageSize, filteredSongs.length)} of {filteredSongs.length} songs
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-slate-300 transition-colors"
            >
              Prev
            </button>
            <span className="px-2 text-slate-400">
              Page {currentPage} of {Math.max(1, totalPages)}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage >= totalPages}
              className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 border border-slate-800 text-slate-300 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Inspect Song Modal */}
      {inspectingSong && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{inspectingSong.title}</h3>
                <p className="text-xs text-slate-400">{inspectingSong.artist} · {inspectingSong.year} · {inspectingSong.genre}</p>
              </div>
              <button
                onClick={() => setInspectingSong(null)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕ Close
              </button>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-indigo-400 text-[11px] font-semibold block">Acoustic Spectral Hash:</span>
                <span className="font-mono text-slate-300 text-xs break-all">{inspectingSong.acousticFingerprintHash}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-indigo-400 text-[11px] font-semibold block">Blockchain Merkle Stem Root:</span>
                <span className="font-mono text-slate-300 text-xs break-all">{inspectingSong.merkleStemRoot}</span>
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                <span className="font-mono text-indigo-400 text-[11px] font-semibold block">Neural Perceptual Vector (5-dim Sample):</span>
                <span className="font-mono text-slate-300 text-xs">[{inspectingSong.neuralVectorSignature.join(', ')}]</span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">YouTube Content ID:</span>
                  <span className="text-slate-200 font-semibold">{inspectingSong.youtubeContentIdStatus}</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 text-[11px] block">DSP Status:</span>
                  <span className="text-slate-200 font-semibold">{inspectingSong.dspStatus}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end">
              <button
                onClick={() => {
                  onAnalyzeAgainstSong(inspectingSong);
                  setInspectingSong(null);
                }}
                className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                Set as Active Target Song
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Song / YouTube Audio Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleCreateSong} className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4 shadow-xl">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Add Bangladeshi Song / YouTube Audio</h3>
                <p className="text-xs text-slate-400">Append new reference audio into the 1,000 songs analyzer index</p>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-white text-xs font-mono"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 pt-1 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Song Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shei Tumi, Moner Manush, Dhaka Cypher"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Artist / Band Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ayub Bachchu, James, Arnob, Lalon Fokir"
                  value={newArtist}
                  onChange={(e) => setNewArtist(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Genre</label>
                  <select
                    value={newGenre}
                    onChange={(e) => setNewGenre(e.target.value as BangladeshiSong['genre'])}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-white text-xs focus:outline-none focus:border-indigo-500"
                  >
                    {genres.filter(g => g !== 'all').map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">Musical Key</label>
                  <input
                    type="text"
                    value={newKey}
                    onChange={(e) => setNewKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Tempo (BPM)</label>
                  <input
                    type="number"
                    min="40"
                    max="220"
                    value={newBpm}
                    onChange={(e) => setNewBpm(parseInt(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                  />
                </div>

                <div className="flex flex-col justify-end pb-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-300 text-xs">
                    <input
                      type="checkbox"
                      checked={newDawLoop}
                      onChange={(e) => setNewDawLoop(e.target.checked)}
                      className="rounded accent-indigo-500"
                    />
                    <span>Has Cakewalk Koto / DAW Loop</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">YouTube URL or Extracted Audio ID (Optional)</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/watch?v=..."
                  value={youtubeSourceUrl}
                  onChange={(e) => setYoutubeSourceUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors"
              >
                Index Track
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
