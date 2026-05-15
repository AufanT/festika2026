"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/#about", label: "About" },
  { href: "/#competitions", label: "Competitions" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/#sponsors", label: "Sponsors" },
  { href: "/#faq", label: "FAQ" },
  { href: "/staff", label: "Staff" },
  { href: "/past-events", label: "Our Journey" },
];

function useActiveSection() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (pathname !== "/") {
      setActiveSection(pathname);
      return;
    }

    const sectionIds = navLinks
      .filter((l) => l.href.startsWith("/#"))
      .map((l) => l.href.slice(2));

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: string | null = null;
        let bestRatio = 0;

        for (const entry of entries) {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            best = entry.target.id;
            bestRatio = entry.intersectionRatio;
          }
        }

        if (best) setActiveSection(`/#${best}`);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  return activeSection;
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useActiveSection();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 h-16 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-16 w-56">
            <Image
              src="/logo-festika.svg"
              alt="Festika Logo"
              fill
              className="object-contain object-left"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = link.href.startsWith("/#")
              ? activeSection === link.href
              : activeSection === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-all w-24 text-center py-1 ${
                  isActive
                    ? "text-festika-navy font-bold"
                    : "text-festika-navy/70 hover:text-festika-navy hover:font-bold"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-1 left-1/2 -translate-x-1/2 h-0.5 bg-festika-orange rounded-full transition-all duration-300 ${
                    isActive ? "w-8" : "w-0 group-hover:w-6"
                  }`}
                />
              </Link>
            );
          })}
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
          {navLinks.map((link) => {
            const isActive = link.href.startsWith("/#")
              ? activeSection === link.href
              : activeSection === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-sm font-medium transition-all py-2 ${
                  isActive
                    ? "text-festika-navy font-bold"
                    : "text-festika-navy/70 hover:text-festika-navy hover:font-bold"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
                <span
                  className={`absolute -bottom-0 left-0 h-0.5 bg-festika-orange rounded-full transition-all duration-300 ${
                    isActive ? "w-full opacity-100" : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                  }`}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
