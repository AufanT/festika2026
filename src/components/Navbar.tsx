"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#competitions", label: "Competitions" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/staff", label: "Staff" },
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="font-[family-name:var(--font-space-grotesk)] text-xl font-bold text-festika-teal tracking-tight"
        >
          FESTIKA<span className="text-festika-orange">.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-festika-navy hover:font-bold hover:text-festika-navy transition-all w-24 text-center"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#competitions">
            <Button
              className="bg-festika-orange hover:bg-festika-orange-light text-white rounded-none px-8 font-bold border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.6)] hover:translate-x-[2px] hover:translate-y-[2px] transition-all cursor-pointer"
            >
              Register
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-festika-teal cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? "max-h-64 border-t border-gray-100" : "max-h-0"
        } bg-white/95 backdrop-blur-md`}
      >
        <div className="mx-auto max-w-7xl px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-festika-navy hover:font-bold transition-all py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/#competitions" onClick={() => setIsMenuOpen(false)}>
            <Button
              className="bg-festika-orange hover:bg-festika-orange-light text-white rounded-none w-full font-bold border-2 border-festika-navy shadow-[4px_4px_0_0_#0F2A36] hover:shadow-[0_0_15px_rgba(245,166,35,0.6)] transition-all cursor-pointer"
            >
              Register
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
