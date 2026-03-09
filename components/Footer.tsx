"use client";
import Link from "next/link";
import { MoveUpRight, Github, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const categories = [
    { href: "/browse/violence", label: "Violence" },
    { href: "/browse/slavery", label: "Slavery" },
    { href: "/browse/women", label: "Women" },
    { href: "/browse/punishment", label: "Punishment" },
    { href: "/browse/children", label: "Children" },
  ];

  const tools = [
    { href: "/contradictions", label: "Contradictions" },
    { href: "/search", label: "Verse Search" },
    { href: "/random", label: "Randomizer" },
  ];

  return (
    <footer className="bg-[#0a192f] border-t-4 border-[#D4AF37] pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div>
              <Link href="/" className="inline-block">
                <span className="font-serif text-4xl font-black text-[#D4AF37] tracking-tighter">
                  TWOG
                </span>
              </Link>
              <p className="mt-4 text-white/50 text-sm leading-relaxed max-w-sm">
                A non-partisan digital archive of the Bible. 
                Our mission is to provide an unedited, searchable database 
                of scripture categorized by historical and social themes.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Link href="mailto:urowncontact@gmail.com" className="p-2 bg-white/5 hover:bg-[#D4AF37]/20 rounded-full transition-colors text-white/60 hover:text-[#D4AF37]">
                <Mail size={18} />
              </Link>
            </div>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-widest">Browse Themes</h4>
            <ul className="space-y-2">
              {categories.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white text-[13px] font-medium transition-colors flex items-center group">
                    {link.label}
                    <MoveUpRight size={12} className="ml-1 opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools Column */}
          <div className="space-y-4">
            <h4 className="text-[#D4AF37] font-black text-xs uppercase tracking-widest">Resources</h4>
            <ul className="space-y-2">
              {tools.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-white/40 hover:text-white text-[13px] font-medium transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Legal Section */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest">
              © {currentYear} TWOG.IO • All Rights Reserved
            </p>
            <p className="text-[10px] text-white/20 italic">
              Scripture taken from the Holy Bible, New International Version®, NIV®.
            </p>
          </div>

          <div className="flex items-center gap-6 text-[11px] font-bold text-white/40 uppercase tracking-tighter">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms of Use</Link>
            <Link href="/about" className="hover:text-white transition-colors text-[#D4AF37]">About the Project</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}