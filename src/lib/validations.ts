import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Nama wajib diisi (minimal 2 karakter)").max(100),
  email: z.string().email("Format email tidak valid"),
  phone: z.string().min(10, "Nomor HP wajib diisi dengan benar").max(16, "Nomor HP terlalu panjang"),
  major: z.string().min(2, "Jurusan wajib diisi").max(100),
  year: z.coerce.number().min(2020, "Tahun angkatan terlalu lama").max(2026, "Tahun angkatan belum dibuka"),
  competitionId: z.string().min(1, "Lomba wajib dipilih"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;
