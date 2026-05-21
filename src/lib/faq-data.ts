export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export const fallbackFaqs: FaqItem[] = [
  {
    id: "1",
    question: "Apa itu Festika 2026?",
    answer:
      'FESTIKA 2026 adalah festival tahunan yang menjadi wadah kompetisi sekaligus pengembangan potensi di bidang teknologi digital. Tahun ini, FESTIKA mengusung tema besar "NextGen Tech: Creating the Future Today".',
  },
  {
    id: "2",
    question: "Siapa saja yang bisa mengikuti kompetisi di Festika?",
    answer:
      "Ketentuan peserta bergantung pada jenis lomba yang diikuti:\n\nLomba Karya Tulis Ilmiah (KTI): Terbuka untuk pelajar SMA/sederajat, baik secara individu maupun tim.\n\nCapture The Flag (CTF): Terbuka untuk pelajar SMA/sederajat dalam bentuk tim yang terdiri dari 3 orang.\n\nDesain Web: Peserta mengerjakan proyek secara individu.",
  },
  {
    id: "3",
    question: "Apa saja lomba yang ada di Festika 2026?",
    answer:
      "Terdapat tiga kategori lomba utama tahun ini:\n\n1. Desain Web: Kompetisi merancang antarmuka website yang kreatif dan responsif.\n\n2. Lomba Karya Tulis Ilmiah (KTI): Kompetisi inovasi dan penelitian ilmiah bertema tantangan era digital.\n\n3. Capture The Flag (CTF): Kompetisi di bidang keamanan siber menggunakan platform picoCTF.",
  },
  {
    id: "4",
    question: "Bagaimana alur pendaftaran kompetisinya?",
    answer:
      "Pendaftaran dilakukan secara online dalam rentang waktu berikut:\n\n- Desain Web: 27 April – 12 Mei 2026.\n- KTI: 27 April – 15 Mei 2026.\n- CTF: 27 Maret – 14 Mei 2026.\n\nSetelah mendaftar, peserta akan mengikuti rangkaian babak penyisihan secara online sebelum terpilih untuk maju ke babak final secara offline pada 23–24 Mei 2026.",
  },
  {
    id: "5",
    question: "Apakah ada biaya pendaftaran?",
    answer:
      "- Desain Web & KTI: Gratis (tidak dipungut biaya).\n- Capture The Flag (CTF): Biaya pendaftaran sebesar Rp100.000 per tim.",
  },
];
