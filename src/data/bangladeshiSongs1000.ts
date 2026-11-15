import { BangladeshiSong } from '../types/music';

// Master curated seed catalog featuring renowned Bangladeshi classics, modern hits, and independent tracks
interface SongSeed {
  title: string;
  artist: string;
  genre: BangladeshiSong['genre'];
  year: number;
  bpm: number;
  key: string;
  durationSeconds: number;
  publisher: string;
  containsKnownDAWLoop?: boolean;
  dawLoopType?: BangladeshiSong['dawLoopType'];
}

const SEED_MASTERPIECES: SongSeed[] = [
  // Bangla Rock & Band Legends
  { title: "Shei Tumi Keno Eto Ochena Hole", artist: "Ayub Bachchu & LRB", genre: "Bangla Rock", year: 1993, bpm: 78, key: "E Minor", durationSeconds: 324, publisher: "Soundtek Electronics" },
  { title: "Hashte Dekho Gaite Dekho", artist: "Ayub Bachchu & LRB", genre: "Bangla Rock", year: 1995, bpm: 116, key: "A Minor", durationSeconds: 278, publisher: "Soundtek Electronics" },
  { title: "Rupali Guitar", artist: "Ayub Bachchu & LRB", genre: "Bangla Rock", year: 1994, bpm: 84, key: "D Minor", durationSeconds: 310, publisher: "Soundtek Electronics" },
  { title: "Maa (Dosh Mash Dosh Din)", artist: "James & Nagar Baul", genre: "Bangla Rock", year: 1998, bpm: 72, key: "C Major", durationSeconds: 345, publisher: "Anupam Recording Media" },
  { title: "Taray Taray Rotiye Debo", artist: "James & Nagar Baul", genre: "Bangla Rock", year: 1996, bpm: 90, key: "G Major", durationSeconds: 288, publisher: "Anupam Recording Media" },
  { title: "Jodi Himaloy Hoye", artist: "Miles", genre: "Bangla Rock", year: 1993, bpm: 82, key: "A Major", durationSeconds: 295, publisher: "D-Series Media" },
  { title: "Dhiki Dhiki", artist: "Miles", genre: "Bangla Rock", year: 1994, bpm: 124, key: "D Major", durationSeconds: 260, publisher: "D-Series Media" },
  { title: "Boshe Achi Eka", artist: "Warfaze", genre: "Bangla Rock", year: 1994, bpm: 76, key: "F# Minor", durationSeconds: 360, publisher: "Sangeeta Music" },
  { title: "Esheche Shomoy", artist: "Warfaze", genre: "Bangla Rock", year: 1997, bpm: 132, key: "E Minor", durationSeconds: 315, publisher: "Sangeeta Music" },
  { title: "Oniket Prantor", artist: "Artcell", genre: "Bangla Rock", year: 2006, bpm: 88, key: "C# Minor", durationSeconds: 974, publisher: "G-Series Bangladesh" },
  { title: "Dukkho Bilash", artist: "Artcell", genre: "Bangla Rock", year: 2002, bpm: 80, key: "G Minor", durationSeconds: 410, publisher: "G-Series Bangladesh" },
  { title: "Pothchola", artist: "Artcell", genre: "Bangla Rock", year: 2002, bpm: 95, key: "B Minor", durationSeconds: 382, publisher: "G-Series Bangladesh" },
  { title: "Hashimukhe", artist: "Shironamhin", genre: "Bangla Rock", year: 2004, bpm: 104, key: "D Major", durationSeconds: 262, publisher: "Laser Vision" },
  { title: "Pakhi", artist: "Shironamhin", genre: "Bangla Rock", year: 2004, bpm: 86, key: "E Major", durationSeconds: 298, publisher: "Laser Vision" },
  { title: "Abar Hashimukh", artist: "Shironamhin", genre: "Bangla Rock", year: 2009, bpm: 108, key: "D Major", durationSeconds: 334, publisher: "Laser Vision" },
  { title: "Amar Shongshar", artist: "Black", genre: "Bangla Rock", year: 2002, bpm: 92, key: "F Minor", durationSeconds: 312, publisher: "G-Series Bangladesh" },
  { title: "Obhiman", artist: "Nemesis", genre: "Bangla Rock", year: 2005, bpm: 128, key: "B Minor", durationSeconds: 275, publisher: "G-Series Bangladesh" },
  { title: "Cholo Bangladesh", artist: "Cryptic Fate", genre: "Bangla Rock", year: 2001, bpm: 140, key: "E Minor", durationSeconds: 245, publisher: "Soundtek" },

  // Rabindra Sangeet
  { title: "Tumi Robe Nirobe", artist: "Rabindranath Tagore / Rezwana Choudhury Bannya", genre: "Rabindra Sangeet", year: 1988, bpm: 68, key: "C Major", durationSeconds: 270, publisher: "Bishwa Bharati Music Trust" },
  { title: "Aguner Poroshmoni", artist: "Rabindranath Tagore / Hemanta Mukherjee", genre: "Rabindra Sangeet", year: 1968, bpm: 72, key: "D Major", durationSeconds: 215, publisher: "His Master's Voice (HMV)" },
  { title: "Purano Shei Diner Kotha", artist: "Rabindranath Tagore / Shreya Ghoshal", genre: "Rabindra Sangeet", year: 2010, bpm: 80, key: "G Major", durationSeconds: 245, publisher: "Saregama India" },
  { title: "Jhoro Jhoro Borishe Baridhara", artist: "Rabindranath Tagore / Indrani Sen", genre: "Rabindra Sangeet", year: 1995, bpm: 92, key: "F Major", durationSeconds: 220, publisher: "Bhavna Records" },
  { title: "Klanti Amar Khoma Koro Probhu", artist: "Rabindranath Tagore / Sagar Sen", genre: "Rabindra Sangeet", year: 1974, bpm: 64, key: "E Minor", durationSeconds: 280, publisher: "HMV Bengal" },
  { title: "Eki Labonye Purno Pran", artist: "Rabindranath Tagore / Pramita Mallick", genre: "Rabindra Sangeet", year: 1991, bpm: 75, key: "A Minor", durationSeconds: 250, publisher: "Bhavna Records" },
  { title: "Kotobaro Bhebechinu Apona Bhuliya", artist: "Rabindranath Tagore / Debabrata Biswas", genre: "Rabindra Sangeet", year: 1965, bpm: 70, key: "Bb Major", durationSeconds: 235, publisher: "Hindustan Records" },

  // Nazrul Geeti
  { title: "Karar Oi Louho Kopot", artist: "Kazi Nazrul Islam / Firoza Begum", genre: "Nazrul Geeti", year: 1965, bpm: 112, key: "D Minor", durationSeconds: 210, publisher: "Nazrul Institute Records" },
  { title: "Shukno Patar Nupur Paye", artist: "Kazi Nazrul Islam / Manabendra Mukherjee", genre: "Nazrul Geeti", year: 1972, bpm: 96, key: "G Minor", durationSeconds: 204, publisher: "HMV Bengal" },
  { title: "Rumjhum Rumjhum Ke Bajay", artist: "Kazi Nazrul Islam / Anup Ghoshal", genre: "Nazrul Geeti", year: 1980, bpm: 104, key: "F Major", durationSeconds: 195, publisher: "Saregama" },
  { title: "Mora Eki Brinte Duti Kusum", artist: "Kazi Nazrul Islam / Ferdous Ara", genre: "Nazrul Geeti", year: 1994, bpm: 82, key: "C Major", durationSeconds: 230, publisher: "Laser Vision" },
  { title: "Bagichay Bulbuli Tui", artist: "Kazi Nazrul Islam / Nilufar Yasmin", genre: "Nazrul Geeti", year: 1985, bpm: 88, key: "E Minor", durationSeconds: 245, publisher: "Laser Vision" },

  // Baul & Folk
  { title: "Murshid Shob Sadhoner Mool", artist: "Lalon Fokir / Farida Parveen", genre: "Baul & Folk", year: 1984, bpm: 74, key: "D Minor", durationSeconds: 310, publisher: "Bengal Foundation" },
  { title: "Shob Loke Koy Lalon Ki Jaat", artist: "Lalon Fokir / Farida Parveen", genre: "Baul & Folk", year: 1989, bpm: 80, key: "A Minor", durationSeconds: 295, publisher: "Bengal Foundation" },
  { title: "Bande Maya Lagaise", artist: "Hason Raja / Dilruba Khan", genre: "Baul & Folk", year: 1992, bpm: 106, key: "G Major", durationSeconds: 270, publisher: "Soundtek" },
  { title: "Nisha Lagilo Re", artist: "Hason Raja / Habib Wahid", genre: "Fusion & Pop", year: 2003, bpm: 102, key: "F Minor", durationSeconds: 255, publisher: "Ektaar Music", containsKnownDAWLoop: true, dawLoopType: "Cakewalk Koto Beat" },
  { title: "Agey Ki Shundor Din Kataitam", artist: "Shah Abdul Karim / Kuddus Boyati", genre: "Baul & Folk", year: 1999, bpm: 90, key: "E Minor", durationSeconds: 315, publisher: "Laser Vision" },
  { title: "Gari Cholena Cholena", artist: "Shah Abdul Karim / Sanjib Choudhury", genre: "Baul & Folk", year: 2001, bpm: 98, key: "A Minor", durationSeconds: 285, publisher: "Bappa & Sanjib Productions" },
  { title: "Shada Shada Kala Kala", artist: "Arfan Mredha Shiblu / Hawa OST", genre: "Baul & Folk", year: 2022, bpm: 92, key: "E Minor", durationSeconds: 240, publisher: "Facecard Productions" },
  { title: "Bondhu Tin Din", artist: "Runa Laila", genre: "Modern Adhunik", year: 1980, bpm: 114, key: "G Major", durationSeconds: 260, publisher: "Soundtek" },

  // Modern Pop, Adhunik & Fusion
  { title: "Hariye Giyechi", artist: "Arnob", genre: "Indie Alternative", year: 2005, bpm: 85, key: "C Major", durationSeconds: 275, publisher: "Ektaar Music" },
  { title: "Tomar Jonno", artist: "Arnob", genre: "Indie Alternative", year: 2006, bpm: 78, key: "G Major", durationSeconds: 312, publisher: "Ektaar Music" },
  { title: "She Jey Boshe Ache", artist: "Arnob", genre: "Indie Alternative", year: 2004, bpm: 84, key: "E Major", durationSeconds: 290, publisher: "Ektaar Music" },
  { title: "Krishno", artist: "Habib Wahid & Kaya", genre: "Fusion & Pop", year: 2003, bpm: 100, key: "D Minor", durationSeconds: 280, publisher: "Ektaar Music", containsKnownDAWLoop: true, dawLoopType: "Cakewalk Koto Beat" },
  { title: "Din Gelo", artist: "Habib Wahid", genre: "Fusion & Pop", year: 2006, bpm: 96, key: "A Minor", durationSeconds: 320, publisher: "Soundtek" },
  { title: "Irsha", artist: "Tahsan Khan", genre: "Modern Adhunik", year: 2004, bpm: 74, key: "F# Minor", durationSeconds: 298, publisher: "G-Series Bangladesh" },
  { title: "Prematal", artist: "Tahsan Khan", genre: "Modern Adhunik", year: 2005, bpm: 82, key: "B Minor", durationSeconds: 305, publisher: "G-Series Bangladesh" },
  { title: "Cha-er Dokane", artist: "Topu", genre: "Indie Alternative", year: 2007, bpm: 98, key: "D Major", durationSeconds: 254, publisher: "Laser Vision" },
  { title: "Ek Paye Nupur", artist: "Topu", genre: "Indie Alternative", year: 2008, bpm: 88, key: "A Major", durationSeconds: 275, publisher: "Laser Vision" },
  { title: "Baburam Shobure", artist: "Fuad al Muqtadir & Mila", genre: "Fusion & Pop", year: 2007, bpm: 120, key: "G Minor", durationSeconds: 245, publisher: "G-Series", containsKnownDAWLoop: true, dawLoopType: "Cakewalk Koto Beat" },
  { title: "Shohorer Duita Gaan", artist: "Bappa Mazumder", genre: "Modern Adhunik", year: 2006, bpm: 86, key: "C Major", durationSeconds: 310, publisher: "G-Series" },
  { title: "Local Bus", artist: "Pritom Hasan & Momotaz", genre: "Hip Hop & Desi Trap", year: 2016, bpm: 110, key: "F Minor", durationSeconds: 232, publisher: "G-Series", containsKnownDAWLoop: true, dawLoopType: "FL Studio 808 Trap" },
  { title: "Jadukor", artist: "Pritom Hasan", genre: "Fusion & Pop", year: 2018, bpm: 108, key: "Ab Major", durationSeconds: 242, publisher: "Sony Music D-Series" },
  { title: "Naya Daman", artist: "Muza & Tosiba", genre: "Hip Hop & Desi Trap", year: 2020, bpm: 105, key: "D Minor", durationSeconds: 215, publisher: "Muza Records" },

  // Classical & Instrumental
  { title: "Bhatiyali Flute Symphony", artist: "Ustad Bari Siddiqui", genre: "Classical & Instrumental", year: 1999, bpm: 70, key: "G Minor", durationSeconds: 380, publisher: "Bengal Classical Media" },
  { title: "Raga Bhairav Sitar Recital", artist: "Pandit Debu Chaudhuri", genre: "Classical & Instrumental", year: 1985, bpm: 64, key: "C Major", durationSeconds: 520, publisher: "All India Radio / Betar Archive" },
  { title: "Dotara Melody of the Padma", artist: "Abdur Rahman Boyati", genre: "Classical & Instrumental", year: 1992, bpm: 86, key: "D Major", durationSeconds: 310, publisher: "Bangladesh Shilpakala" }
];

// Helper to generate a realistic deterministic SHA-like hash string
function pseudoHash(str: string, length = 16): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  const secondPass = Math.abs((hash * 31) | 0).toString(16).padStart(8, '0');
  return (hex + secondPass + hex).slice(0, length);
}

// Generate an authentic 1000 song database programmatically
export function generateBangladeshiCatalog1000(): BangladeshiSong[] {
  const songs: BangladeshiSong[] = [];
  const genres: BangladeshiSong['genre'][] = [
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

  const keys = ['C Major', 'D Minor', 'E Minor', 'F Major', 'G Major', 'A Minor', 'B Minor', 'Eb Major', 'F# Minor', 'Ab Major'];
  const publishers = ['Soundtek Electronics', 'Laser Vision', 'G-Series Bangladesh', 'Anupam Recording Media', 'Ektaar Music', 'Bhavna Records', 'Sangeeta Music', 'Bengal Foundation', 'Independent Bangladesh Arts'];

  const artistsByGenre: Record<BangladeshiSong['genre'], string[]> = {
    'Bangla Rock': ['Ayub Bachchu & LRB', 'James & Nagar Baul', 'Miles', 'Warfaze', 'Artcell', 'Shironamhin', 'Black', 'Nemesis', 'Cryptic Fate', 'Vikings', 'Aurthohin', 'AvoidRafa'],
    'Rabindra Sangeet': ['Rezwana Choudhury Bannya', 'Hemanta Mukherjee', 'Suchitra Mitra', 'Debabrata Biswas', 'Pramita Mallick', 'Sagar Sen', 'Indrani Sen', 'Srikanto Acharya', 'Shreya Ghoshal', 'Shama Rahman'],
    'Nazrul Geeti': ['Firoza Begum', 'Manabendra Mukherjee', 'Anup Ghoshal', 'Ferdous Ara', 'Nilufar Yasmin', 'Shaheen Samad', 'Khaled Hossain', 'Sujit Mustafa'],
    'Baul & Folk': ['Farida Parveen', 'Shah Abdul Karim', 'Lalon Fokir', 'Hason Raja', 'Kuddus Boyati', 'Dilruba Khan', 'Momotaz Begum', 'Abdur Rahman Boyati', 'Kangalini Sufia', 'Arfan Mredha Shiblu'],
    'Modern Adhunik': ['Tahsan Khan', 'Bappa Mazumder', 'Topu', 'Subir Nandi', 'Andrew Kishore', 'Sabina Yasmin', 'Runa Laila', 'Habib Wahid', 'Minar Rahman', 'Samina Chowdhury'],
    'Fusion & Pop': ['Habib Wahid & Kaya', 'Fuad al Muqtadir', 'Mila Islam', 'Pritom Hasan', 'Kona', 'Balam', 'Hridoy Khan', 'Topu & Yaatri', 'Adit & Hasib'],
    'Indie Alternative': ['Arnob', 'Shunno', 'Meghdol', 'Chirkutt', 'Encore', 'Karnival', 'Conclusion', 'Level Five', 'Dadur Gaan', 'Popeye Bangladesh'],
    'Hip Hop & Desi Trap': ['Pritom Hasan', 'Muza', 'Jalali Set', 'Deshi MCs', 'Tabib Mahmud & Rana', 'Black Zang', 'Xefer Rahman', 'G-Nine'],
    'Classical & Instrumental': ['Ustad Bari Siddiqui', 'Pandit Debu Chaudhuri', 'Ustad Allauddin Khan Heritage', 'Pandit Ravi Shankar Archive', 'Shahadat Hossain Khan', 'Enayet Hossain'],
    'Patriotic': ['Abdul Latif & Artists', 'Shahnaz Rahmatullah', 'Sabina Yasmin & Choir', 'Apel Mahmud', 'Ajit Roy & Swadhin Bangla Betar', 'Rathindranath Roy']
  };

  const titlePatternsByGenre: Record<BangladeshiSong['genre'], string[]> = {
    'Bangla Rock': ['Shei Smriti', 'Obhishap', 'Dhulo Balir Poth', 'Shopno Bhongo', 'Rongin Canvas', 'Durer Akash', 'Koster Gaan', 'Nirobota', 'Ondho Shomoy', 'Chokher Jole', 'Bornoheen', 'Astitwo', 'Proshno', 'Dukkher Shagore', 'Chhaya', 'Muktir Daak'],
    'Rabindra Sangeet': ['Ami Tomari Matite', 'Baje Karuna Shure', 'Chokher Aloye Dekhechilem', 'Dariye Acho Tumi Amar', 'Esho Shyamolo Shundoro', 'Gane Gane Bela Gelo', 'Hridoy Majhe Rakhi', 'Jibono Moroner Simana Chharaye', 'Keno Chokher Jole', 'Mone Ki Dwidha', 'Nodi Opar Hoye', 'O Je Mane Na Mana', 'Pran Chay Chokkhu Na Chay', 'Rup Shagore Moner Manush', 'Shimar Majhe Oshim Tumi'],
    'Nazrul Geeti': ['Alga Koro Go Khopar Badhon', 'Bhoriya Poran Shunitechi Gaan', 'Chomke Chomke Dhire Chole', 'Dole Bonoshabuj Pata', 'Ekhono Ochena Tumi', 'Fagunero Mohonay', 'Gaaner Bhela Bhashe', 'Heriley Tomar Mukh', 'Jago Nari Jago Bohnishikha', 'Kuhu Kuhu Koyela', 'Laili Tomar Shur', 'Megho Boron Keno Re', 'Noyono Monohoro Shundoro'],
    'Baul & Folk': ['Moner Manush', 'Doyamoy', 'Shohorer Kotha', 'Nodir Paar', 'Gramer Baul', 'Bhaber Deshe', 'Pran Bondhure', 'Ayna Te Dekho', 'Porosh Moni', 'Khachar Vitor Ochin Pakhi', 'Shadhok Hote Chao', 'Milon Hobe Koto Dine', 'Goru Chorano Shur', 'Bhaat Kaporer Bhabna', 'Dhire Dhire Bawo Naiya'],
    'Modern Adhunik': ['Bristi Jhora Dupure', 'Tumi Chara Ekaki', 'Akasher Neel Shada', 'Chupchap Bhabna', 'Meghe Meghe Bela', 'Mon Kharaper Gaan', 'Prem O Protirodh', 'Duti Chokher Shur', 'Bhalobashar Rong', 'Smritir Shohor', 'Kothao Nei Tumi', 'Oshru Shitol', 'Valobashi Tomay', 'Moner Canvas', 'Keno Emon'],
    'Fusion & Pop': ['Beat Of Bengal', 'Shur O Chhondo', 'Rongila Mon (Fusion)', 'Deshi Groove', 'Bangla Pop Explosion', 'Urban Baul Mix', 'Night Raga Pop', 'Biporit Shur', 'Electrofied Rabindra', 'Dhaka City Lights', 'Chhaya Chhobi', 'Koto Shur Koto Gaan', 'Groovy Matir Tan'],
    'Indie Alternative': ['Dhaka Twilight', 'Coffee Table Blues', 'Chader Aloy Canvas', 'Sritir Dokan', 'Eka Cholar Gaan', 'Shunno Poth', 'Aparajita', 'Nishi Raat', 'Birohir Diary', 'Metro Rail Monologue', 'Boimelar Smriti', 'Old Town Echoes'],
    'Hip Hop & Desi Trap': ['Dhaka 1212', 'Old Dhaka Cypher', 'Desi Flow', 'Goli Theke Stadium', 'Bangla Bars', 'Shonar Bangla Trap', 'Chander Deshe', 'Bustle & Hustle', 'Street Poet', 'Padma Beat', 'Koto Kotha', 'Underground King'],
    'Classical & Instrumental': ['Bhairavi Alap', 'Darbari Kanada Recital', 'Bhatiyali Flute Romance', 'Sitar In Tilak Kamod', 'Esraj Twilight Meditation', 'Tabla Solo Teental', 'Santur Whispers of Sylhet', 'Sarod Monologue', 'Megh Malhar Raga'],
    'Patriotic': ['Mora Ekti Phulke Bachabo', 'Shono Ekti Mujiborer Theke', 'Teer Hara Ei Dhew-er Shagor', 'Joy Bangla Banglar Joy', 'Salam Salam Hajar Salam', 'Eki Oporup Rupe Ma Tomay', 'Banglar Mati Banglar Jol', 'Bijoy Nishan']
  };

  let idCounter = 1;

  // Insert seed songs first
  for (const seed of SEED_MASTERPIECES) {
    const isrc = `BD-S84-${String(seed.year).slice(-2)}-${String(idCounter).padStart(5, '0')}`;
    const hash = pseudoHash(`${seed.title}-${seed.artist}-${seed.year}`);
    const merkle = `0x7f8c${pseudoHash(`merkle-${seed.title}-${idCounter}`, 40)}`;
    const dawLoopType = seed.dawLoopType ?? (seed.containsKnownDAWLoop ? 'Cakewalk Koto Beat' : 'None');

    songs.push({
      id: `bd-song-${idCounter}`,
      catalogNumber: idCounter,
      title: seed.title,
      artist: seed.artist,
      genre: seed.genre,
      year: seed.year,
      bpm: seed.bpm,
      key: seed.key,
      duration: `${Math.floor(seed.durationSeconds / 60)}:${String(seed.durationSeconds % 60).padStart(2, '0')}`,
      durationSeconds: seed.durationSeconds,
      isrc,
      publisher: seed.publisher,
      acousticFingerprintHash: `fp_${hash.slice(0, 12)}`,
      merkleStemRoot: merkle,
      neuralVectorSignature: [
        parseFloat((Math.sin(idCounter * 0.7) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.cos(idCounter * 0.4) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.sin(idCounter * 1.3) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.cos(idCounter * 0.9) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.sin(idCounter * 0.2) * 0.4 + 0.5).toFixed(4))
      ],
      containsKnownDAWLoop: !!seed.containsKnownDAWLoop,
      dawLoopType,
      youtubeContentIdStatus: seed.year < 1970 ? 'Public Domain Comp / Master Protected' : 'Protected / Monitored',
      dspStatus: 'Cleared for All DSPs'
    });
    idCounter++;
  }

  // Expand deterministically up to 1000 songs
  while (songs.length < 1000) {
    const genreIndex = (idCounter * 3) % genres.length;
    const genre = genres[genreIndex];
    const artistList = artistsByGenre[genre];
    const titleList = titlePatternsByGenre[genre];

    const artist = artistList[(idCounter * 7) % artistList.length];
    const baseTitle = titleList[(idCounter * 11) % titleList.length];
    const title = `${baseTitle} (Part ${((idCounter % 5) + 1)})`;
    const year = 1971 + ((idCounter * 13) % 55); // 1971 to 2026
    const bpm = 64 + ((idCounter * 17) % 86); // 64 to 150 BPM
    const key = keys[(idCounter * 5) % keys.length];
    const durationSeconds = 170 + ((idCounter * 23) % 240); // 170s to 410s
    const publisher = publishers[(idCounter * 9) % publishers.length];

    // Every ~15th track has known stock loop vulnerability (including the famous Cakewalk Koto beat or FL 808 Trap!)
    const hasCakewalk = (idCounter % 14 === 0);
    const hasTrap = (idCounter % 19 === 0);
    const containsKnownDAWLoop = hasCakewalk || hasTrap;
    const dawLoopType: BangladeshiSong['dawLoopType'] = hasCakewalk 
      ? 'Cakewalk Koto Beat' 
      : hasTrap 
        ? 'FL Studio 808 Trap' 
        : 'None';

    const isrc = `BD-G92-${String(year).slice(-2)}-${String(idCounter).padStart(5, '0')}`;
    const hash = pseudoHash(`${title}-${artist}-${idCounter}`);
    const merkle = `0x9c4e${pseudoHash(`merkle-stem-${idCounter}-${title}`, 40)}`;

    songs.push({
      id: `bd-song-${idCounter}`,
      catalogNumber: idCounter,
      title,
      artist,
      genre,
      year,
      bpm,
      key,
      duration: `${Math.floor(durationSeconds / 60)}:${String(durationSeconds % 60).padStart(2, '0')}`,
      durationSeconds,
      isrc,
      publisher,
      acousticFingerprintHash: `fp_${hash.slice(0, 12)}`,
      merkleStemRoot: merkle,
      neuralVectorSignature: [
        parseFloat((Math.sin(idCounter * 0.53) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.cos(idCounter * 0.31) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.sin(idCounter * 1.17) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.cos(idCounter * 0.83) * 0.4 + 0.5).toFixed(4)),
        parseFloat((Math.sin(idCounter * 0.19) * 0.4 + 0.5).toFixed(4))
      ],
      containsKnownDAWLoop,
      dawLoopType,
      youtubeContentIdStatus: (idCounter % 7 === 0) ? 'Claim On Match' : 'Protected / Monitored',
      dspStatus: (idCounter % 11 === 0) ? 'Restricted Mechanicals' : 'Cleared for All DSPs'
    });

    idCounter++;
  }

  return songs;
}

// Singleton export of the 1000 songs database
export const BANGALORE_CATALOG_1000 = generateBangladeshiCatalog1000();
