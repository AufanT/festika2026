"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (result?.error) {
      setError("Email atau password salah. Coba lagi.");
    } else {
      router.push("/admin");
      router.refresh();
    }
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F2A36 0%, #1A3A4D 50%, #0F2A36 100%)",
      }}
    >
      {/* Decorative background shapes */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-festika-orange/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-festika-teal/10 rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="relative w-full max-w-md">
        {/* Card */}
        <div className="bg-white border-2 border-festika-navy shadow-[8px_8px_0_0_#F5A623] p-8">
          {/* Top corner accent */}
          <div className="absolute top-0 right-0 w-8 h-8 bg-festika-orange" />

          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-festika-orange rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src="/Logo_Festika-04.webp"
                  alt="Festika Logo"
                  width={48}
                  height={48}
                  className="object-contain w-full h-full scale-[1.4]"
                />
              </div>
              <span className="font-[family-name:var(--font-space-grotesk)] text-2xl font-bold text-festika-teal tracking-tight">
                FESTIKA<span className="text-festika-orange">.</span>
              </span>
            </div>
            <h1 className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-navy">
              Admin Panel
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Login untuk mengakses dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 mb-6 flex items-center gap-2">
              <AlertCircle className="text-red-500 shrink-0" size={16} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-bold text-festika-navy mb-1.5"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@festika.com"
                required
                className="w-full border-2 border-gray-300 focus:border-festika-teal focus:outline-none px-3 py-2.5 text-sm rounded-none transition-colors"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-festika-navy mb-1.5"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full border-2 border-gray-300 focus:border-festika-teal focus:outline-none px-3 py-2.5 text-sm rounded-none transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-festika-navy hover:bg-[#1A3A4D] text-white font-bold py-3 flex items-center justify-center gap-2 border-2 border-festika-navy shadow-[4px_4px_0_0_#F5A623] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 className="animate-spin" size={18} /> Memproses...</>
              ) : (
                <><LogIn size={18} /> Masuk</>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-gray-400 text-xs mt-6">
          © 2026 FESTIKA UA. Admin access only.
        </p>
      </div>
    </div>
  );
}
