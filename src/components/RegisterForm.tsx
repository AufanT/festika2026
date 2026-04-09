"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, RegisterFormData } from "@/lib/validations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function RegisterForm({ competitionId }: { competitionId?: string }) {
  const [isLoading, setIsLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      competitionId: competitionId || "",
    }
  });

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    // Ensure competitionId is present
    if (!data.competitionId && competitionId) {
      data.competitionId = competitionId;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || "Gagal mendaftar");
      }

      setSubmitStatus("success");
      reset(); // clear form
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Terjadi kesalahan server");
    } finally {
      setIsLoading(false);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="bg-white border-2 border-festika-navy p-8 text-center shadow-[6px_6px_0_0_#0F2A36]">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-navy mb-2">
          Pendaftaran Berhasil!
        </h3>
        <p className="text-gray-600 mb-8 max-w-sm mx-auto">
          Terima kasih telah mendaftar di Festika UA 2026. Kami akan segera menghubungi kamu melalui email untuk informasi lebih lanjut.
        </p>
        <Button
          onClick={() => {
            setSubmitStatus("idle");
            if (competitionId) {
                reset({ competitionId }); // keep competitionId when resetting
            }
          }}
          className="bg-festika-orange hover:bg-festika-orange-light text-white rounded-none px-8 font-bold border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] transition-all cursor-pointer"
        >
          Daftar Peserta Lain
        </Button>
      </div>
    );
  }

  return (
    <div className="bg-white border-2 border-festika-navy p-6 md:p-8 shadow-[8px_8px_0_0_#0F2A36] relative">
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-6 h-6 bg-festika-orange" />
      <div className="absolute bottom-0 left-0 w-6 h-6 bg-festika-teal" />

      {submitStatus === "error" && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h4 className="text-red-800 font-semibold mb-1">Gagal mendaftar</h4>
            <p className="text-red-600 text-sm">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <input type="hidden" {...register("competitionId")} />
        {errors.competitionId && (
          <div className="bg-red-50 p-3 mb-4 text-red-600 text-sm border-l-4 border-red-500">
            Error: Lomba harus dipilih sebelum mendaftar.
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="name" className="text-festika-navy font-bold">Nama Lengkap</Label>
          <Input
            id="name"
            placeholder="John Doe"
            className="border-gray-300 focus-visible:ring-festika-orange rounded-none"
            {...register("name")}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="text-festika-navy font-bold">Alamat Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            className="border-gray-300 focus-visible:ring-festika-orange rounded-none"
            {...register("email")}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message as string}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-festika-navy font-bold">Nomor WhatsApp</Label>
          <Input
            id="phone"
            placeholder="081234567890"
            className="border-gray-300 focus-visible:ring-festika-orange rounded-none"
            {...register("phone")}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message as string}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="major" className="text-festika-navy font-bold">Jurusan / Prodi</Label>
            <Input
              id="major"
              placeholder="Sistem Informasi"
              className="border-gray-300 focus-visible:ring-festika-orange rounded-none"
              {...register("major")}
            />
            {errors.major && <p className="text-red-500 text-xs mt-1">{errors.major.message as string}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="year" className="text-festika-navy font-bold">Tahun Angkatan</Label>
            <Input
              id="year"
              type="number"
              placeholder="2024"
              className="border-gray-300 focus-visible:ring-festika-orange rounded-none"
              {...register("year")}
            />
            {errors.year && <p className="text-red-500 text-xs mt-1">{errors.year.message as string}</p>}
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-festika-navy hover:bg-[#1A3A4D] text-white rounded-none py-6 h-auto text-base font-bold shadow-[4px_4px_0_0_#F5A623] hover:shadow-[0_0_15px_rgba(245,166,35,0.4)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer mt-4"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="animate-spin" size={20} />
              Memproses...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              Daftar Sekarang
              <ArrowRight size={18} />
            </span>
          )}
        </Button>
      </form>
    </div>
  );
}
