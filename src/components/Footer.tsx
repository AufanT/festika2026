import Link from "next/link";
import Image from "next/image";
import { Globe, MessageCircle, Briefcase, Code } from "lucide-react";
import { formatWhatsAppLink } from "@/lib/utils";

const footerLinks = [
  { href: "#about", label: "About" },
  { href: "#competitions", label: "Competitions" },
  { href: "#timeline", label: "Timeline" },
  { href: "#hero", label: "Register" },
];

const socialLinks = [
  { icon: Globe, href: "#", label: "Instagram" },
  { icon: MessageCircle, href: "#", label: "Twitter" },
  { icon: Briefcase, href: "#", label: "LinkedIn" },
  { icon: Code, href: "#", label: "GitHub" },
];


export default function Footer() {
  return (
    <footer className="bg-festika-navy text-white">
      {/* Orange top border */}
      <div className="h-1 bg-festika-orange" />

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <div className="relative h-14 w-48 -ml-4 mb-4">
              <Image
                src="/logo-festika.svg"
                alt="Festika Logo"
                fill
                className="object-contain grayscale invert"
                priority
              />
            </div>
            <p className="text-gray-400 mt-4 text-sm leading-relaxed max-w-xs">
              Unleashing Innovation through Digital Creativity. Join us in
              shaping the future of technology and design at the premier IT
              festival of 2026.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-festika-orange font-bold uppercase tracking-wider text-sm">
              Links
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-festika-orange font-bold uppercase tracking-wider text-sm">
              Contact
            </h3>
            <div className="mt-4 space-y-3 text-sm text-gray-300">
              <a href="mailto:info@festika2026.tech" className="block hover:text-festika-orange transition-colors">info@festika2026.tech</a>
              <a 
                href={formatWhatsAppLink("+62 123 4567 890", "Halo Festika, saya ingin bertanya...")} 
                target="_blank"
                rel="noopener noreferrer"
                className="block hover:text-festika-orange transition-colors"
              >
                +62 123 4567 890
              </a>
            </div>
            <div className="flex gap-3 mt-5">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-9 h-9 border border-gray-600 rounded-md flex items-center justify-center text-gray-400 hover:text-white hover:border-festika-orange transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>


      {/* Copyright */}
      <div className="border-t border-gray-700/50">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500">
            &copy; 2026 FESTIKA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
