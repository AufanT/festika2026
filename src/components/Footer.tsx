import Link from "next/link";
import Image from "next/image";
import { Camera, Globe, MessageCircle, Play, Video } from "lucide-react";

const quickLinks = [
  { href: "/#about", label: "About" },
  { href: "/#competitions", label: "Competitions" },
  { href: "/#timeline", label: "Timeline" },
  { href: "/staff", label: "Staff" },
  { href: "/past-events", label: "Our Journey" },
];

const websiteTeam = [
  {
    role: "Web Developer",
    members: [
      {
        name: "Aufan Taufiqurrahman",
        instagram: "https://www.instagram.com/aufant_/",
      },
    ],
  },
  {
    role: "UI/UX Design",
    members: [
      {
        name: "Regi Heksa Ananda",
        instagram: "https://www.instagram.com/aufant_/",
      },
      {
        name: "Jardel Poliviera",
        instagram: "https://www.instagram.com/aufant_/",
      },
    ],
  },
];

const InstagramIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const XIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
  </svg>
);

const TikTokIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.6-4.13-1.47-.76-.52-1.45-1.19-1.98-1.97-.05 1.78.01 3.56-.01 5.34 0 .91-.07 1.84-.28 2.73-.52 2.37-2.31 4.58-4.66 5.25-2.26.65-4.9-.11-6.43-1.89-1.85-2.07-1.92-5.49-.16-7.65 1.53-1.97 4.26-2.73 6.64-1.91v4.21c-1.28-.43-2.82-.19-3.82.74-.82.74-1.04 1.99-.54 2.97.47.93 1.58 1.48 2.61 1.34 1.02-.12 1.93-.97 2.1-1.98.08-.43.08-.88.08-1.32V.02Z" />
  </svg>
);

const YoutubeIcon = (props: any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.42a2.78 2.78 0 0 0-1.94 2C1 8.14 1 12 1 12s0 3.86.42 5.58a2.78 2.78 0 0 0 1.94 2c1.71.42 8.6.42 8.6.42s6.88 0 8.6-.42a2.78 2.78 0 0 0 1.94-2C23 15.86 23 12 23 12s0-3.86-.42-5.58z" />
    <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
  </svg>
);

const socialLinks = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/festika.ua/",
    label: "Instagram",
  },
  { icon: FacebookIcon, href: "https://facebook.com", label: "Facebook" },
  { icon: XIcon, href: "https://x.com", label: "X" },
  { icon: TikTokIcon, href: "https://tiktok.com", label: "TikTok" },
  { icon: YoutubeIcon, href: "https://youtube.com", label: "YouTube" },
];

const contacts = [{ phone: "+62-823-1148-8810", name: "Fadhil" }];

export default function Footer() {
  return (
    <footer className="bg-festika-navy text-white border-t border-gray-800/50">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Column 1: Branding */}
          <div className="flex flex-col">
            <div className="flex items-center gap-8 mb-8">
              <div className="relative h-16 w-16">
                <Image
                  src="/Logo_Festika-04.webp"
                  alt="Festika Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="relative h-16 w-16">
                <Image
                  src="/logo-hmif.svg"
                  alt="HMIF Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-16 w-16">
                <Image
                  src="/LOGO_FTI.svg"
                  alt="FTI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-16 w-16">
                <Image
                  src="/Logo_Unand.svg"
                  alt="Unand Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Fakultas+Teknologi+Informasi+Universitas+Andalas"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8F8D98] text-[15px] leading-relaxed pr-4 block hover:text-white transition-all hover:underline underline-offset-4"
            >
              Fakultas Teknologi Informasi, Universitas Andalas, Kampus Limau
              Manis, Kota Padang, Sumatera Barat, Indonesia.
            </a>
          </div>

          {/* Column 2: Quick Links */}
          <div className="flex flex-col lg:pl-8">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-8">
              QUICK LINKS
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-[#8F8D98] hover:text-white transition-all text-[15px] hover:underline underline-offset-4"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Website */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-8">
              WEBSITE
            </h3>
            <ul className="space-y-6">
              {websiteTeam.map((section) => (
                <li key={section.role} className="flex flex-col space-y-2">
                  <span className="text-white font-bold text-[15px]">
                    {section.role}
                  </span>
                  <div className="flex flex-col space-y-1">
                    {section.members.map((member) => (
                      <a
                        key={member.name}
                        href={member.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#8F8D98] hover:text-white transition-all text-[15px] hover:underline underline-offset-4"
                      >
                        {member.name}
                      </a>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Follow Us & Contact */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              FOLLOW US
            </h3>
            <div className="flex flex-wrap gap-4 mb-10 w-full max-w-[200px]">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-[#8F8D98]/30 rounded-full flex items-center justify-center text-[#8F8D98] hover:text-white hover:border-white transition-all duration-300 hover:bg-white/5"
                  aria-label={social.label}
                >
                  <social.icon width={16} height={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>

            <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              CONTACT US
            </h3>
            <div className="flex flex-col space-y-3">
              {contacts.map((contact, index) => (
                <a
                  key={index}
                  href={`https://wa.me/${contact.phone.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#8F8D98] hover:text-white transition-all text-[15px] hover:underline underline-offset-4"
                >
                  {contact.phone}{" "}
                  <span className="ml-1">( {contact.name} )</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 text-center">
          <p className="text-[#8F8D98] text-sm">
            &copy; 2026 FESTIKA. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
