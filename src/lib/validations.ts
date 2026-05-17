import { z } from "zod";

// --- Admin Schemas ---

const timelineItemSchema = z.object({
  label: z.string().min(1, "Label event wajib diisi"),
  date: z.string().min(1, "Tanggal event wajib diisi"),
  description: z.string().optional().nullable(),
});

const prizeItemSchema = z.object({
  position: z.string().min(1, "Posisi/juara wajib diisi"),
  prize: z.string().min(1, "Hadiah wajib diisi"),
  description: z.string().optional().nullable(),
});

export const competitionSchema = z.object({
  title: z.string().min(3, "Judul lomba minimal 3 karakter").max(100),
  theme: z.string().max(200).optional().nullable(),
  description: z.string().max(2000, "Deskripsi terlalu panjang").optional().nullable(),
  registrationStartDate: z.string().optional().nullable(),
  registrationEndDate: z.string().optional().nullable(),
  registrationLink: z.string().url("Link pendaftaran harus berupa URL Google Form yang valid").or(z.literal("")),
  contacts: z.array(z.object({
    name: z.string().min(1, "Nama CP wajib diisi"),
    phone: z.string().min(1, "Nomor WA wajib diisi"),
  })).optional().nullable(),
  tags: z.string().max(500).optional().nullable(),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional().nullable().or(z.literal("")),
  timeline: z.array(timelineItemSchema).optional().nullable(),
  prizeList: z.array(prizeItemSchema).optional().nullable(),
});

export const faqSchema = z.object({
  question: z.string().min(3, "Pertanyaan minimal 3 karakter").max(500),
  answer: z.string().min(3, "Jawaban minimal 3 karakter").max(5000),
  orderIndex: z.number().int().optional().default(0),
});

export const divisionSchema = z.object({
  name: z.string().min(2, "Nama divisi minimal 2 karakter").max(100),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional().nullable(),
});

export const staffSchema = z.object({
  name: z.string().min(2, "Nama minimal 2 karakter").max(100),
  role: z.enum([
    "KETUA PELAKSANA", 
    "SEKRETARIS UMUM", 
    "BENDAHARA UMUM", 
    "KOORDINATOR", 
    "STAFF"
  ] as const),
  description: z.string().max(500, "Deskripsi terlalu panjang").optional().nullable(),
  imageUrl: z.string().url("Format URL gambar tidak valid").optional().nullable(),
  divisionId: z.string().optional().nullable(),
  orderIndex: z.number().int().optional().default(0),
});

export const sponsorSchema = z.object({
  name: z.string().min(2, "Nama sponsor minimal 2 karakter").max(100),
  imageUrl: z.string().url("Format URL logo tidak valid").optional().nullable(),
  link: z.string().url("Format URL link sponsor tidak valid").optional().nullable().or(z.literal("")),
  tier: z.string().optional().nullable(),
});

export type CompetitionFormData = z.infer<typeof competitionSchema>;
export type FaqFormData = z.infer<typeof faqSchema>;
export type DivisionFormData = z.infer<typeof divisionSchema>;
export type StaffFormData = z.infer<typeof staffSchema>;
export type SponsorFormData = z.infer<typeof sponsorSchema>;
