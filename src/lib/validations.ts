import { z } from "zod";

// --- Registration (Public) ---
export const registerSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi (minimal 2 karakter)").max(100),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(10, "Nomor HP wajib diisi dengan benar").max(16, "Nomor HP terlalu panjang"),
  major: z.string().min(2, "Jurusan wajib diisi").max(100),
  year: z.coerce.number().min(2020, "Tahun angkatan terlalu lama").max(2026, "Tahun angkatan belum dibuka"),
  competitionId: z.string().min(1, "Lomba wajib dipilih"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

// --- Admin Schemas ---

export const competitionSchema = z.object({
  title: z.string().min(3, "Judul lomba minimal 3 karakter").max(100),
  description: z.string().max(1000, "Deskripsi terlalu panjang").optional().nullable(),
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
export type DivisionFormData = z.infer<typeof divisionSchema>;
export type StaffFormData = z.infer<typeof staffSchema>;
export type SponsorFormData = z.infer<typeof sponsorSchema>;
