"use client";
import { useState, useEffect } from "react"; // Added useEffect
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X, Shuffle, ChevronRight, Users } from "lucide-react"; // Added Users icon

const links = [
  { href: "/browse/violence", label: "Violence" },
  { href: "/browse/slavery", label: "Slavery" },
  { href: "/browse/women", label: "Women" },
  { href: "/browse/punishment", label: "Punishment" },
  { href: "/contradictions", label: "Contradictions" },
  { href: "/browse/children", label: "Children" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [userCount, setUserCount] = useState(21503); // Initial state
  const path = usePathname();

  // Handle the "Live" counter effect
  useEffect(() => {
    const interval = setInterval(() => {
      setUserCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000); // Increases every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative w-full border-b-4 border-[#D4AF37] bg-[#0a192f]">
      {/* Top Ticker Bar */}
      <div className="bg-[#D4AF37] py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0a192f]">
            The Word of God — Unedited • Unchosen • Uncensored
          </p>
          
          {/* Active Users Counter */}
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 text-[10px] font-black text-[#0a192f] uppercase tracking-wider">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-700"></span>
              </span>
              Active Users: {userCount.toLocaleString()}
            </span>
            <span className="hidden sm:block text-[10px] font-bold text-[#0a192f]/60 uppercase">
              • twog.io
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between">
        
        {/* Logo Area */}
        <Link href="/" className="group flex items-center gap-4">
          <div className="flex flex-col">
            <span className="font-serif text-3xl font-black text-[#D4AF37] leading-none tracking-tight group-hover:text-white transition-colors">
              TWOG
            </span>
            <span className="text-[9px] font-bold text-white/40 tracking-[0.3em] uppercase mt-1">
              The Database
            </span>
          </div>
        </Link>

        {/* Desktop Links - Minimalist Pill style */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {links.map(({ href, label }) => {
            const active = path.startsWith(href) || path === href;
            return (
              <Link
                key={href}
                href={href}
                className={`px-4 py-2 text-[12px] font-bold rounded-lg transition-all ${
                  active 
                    ? "bg-[#D4AF37] text-[#0a192f]" 
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          <Link 
            href="/search" 
            className="hidden md:flex items-center gap-2 px-4 py-2 text-[12px] font-bold text-white/70 hover:text-[#D4AF37] transition-colors"
          >
            <Search size={16} />
            <span>Search</span>
          </Link>

          <Link 
            href="/random"
            className="flex items-center gap-2 bg-white text-[#0a192f] hover:bg-[#D4AF37] px-5 py-2.5 rounded-lg font-black text-[11px] uppercase tracking-wider transition-all shadow-[4px_4px_0px_rgba(212,175,55,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            <Shuffle size={14} />
            Random
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-white/80" 
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Expansion */}
      {open && (
        <div className="lg:hidden border-t border-white/10 bg-[#0d1e36] p-4 space-y-2">
          {links.map(({ href, label }) => (
            <Link 
              key={href} 
              href={href} 
              onClick={() => setOpen(false)}
              className="flex items-center justify-between w-full p-4 bg-white/5 rounded-lg text-sm font-bold text-white/90 border border-white/5 active:bg-[#D4AF37] active:text-[#0a192f]"
            >
              {label}
              <ChevronRight size={16} className="opacity-30" />
            </Link>
          ))}
          <Link 
            href="/search" 
            onClick={() => setOpen(false)}
            className="flex items-center justify-center gap-2 w-full p-4 text-[#D4AF37] font-black text-xs uppercase"
          >
            <Search size={16} /> Search All Verses
          </Link>
        </div>
      )}
    </header>
  );
}