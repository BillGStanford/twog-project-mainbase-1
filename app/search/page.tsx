"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import { searchVerses, verses } from "@/data/verses";
import { Search, X, Command, Flame, Info } from "lucide-react";

const SUGGESTIONS = [
  "kill", "slave", "punish", "women", "children", 
  "death", "genocide", "beat", "destroy", "war", 
  "stone", "silence", "rape", "virgin"
];

export default function SearchPage() {
  const [q, setQ] = useState("");

  // Memoize search for performance
  const results = useMemo(() => {
    return q.trim().length > 1 ? searchVerses(q) : [];
  }, [q]);

  const hasQuery = q.trim().length > 1;

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Modern Search Hero */}
      <section className="bg-[#0a192f] border-b-4 border-[#D4AF37] relative overflow-hidden pt-16 pb-20">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[60%] rounded-full bg-[#D4AF37] blur-[120px]" />
        </div>

        <div className="max-w-3xl mx-auto px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6">
            <Flame size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] font-black text-white/60 uppercase tracking-widest">
              {verses.length} Verses Indexed
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-6xl font-black text-white leading-tight tracking-tighter mb-8 uppercase italic">
            Search the <span className="text-[#D4AF37]">Archive</span>
          </h1>

          <div className="group relative max-w-2xl mx-auto">
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#D4AF37] transition-colors">
              <Search size={20} strokeWidth={2.5} />
            </div>
            
            <input 
              type="text" 
              value={q} 
              onChange={e => setQ(e.target.value)}
              placeholder="Enter keyword (e.g., 'slavery', 'war')..."
              className="w-full bg-white rounded-2xl pl-14 pr-12 py-5 text-lg font-medium outline-none shadow-2xl transition-all focus:ring-4 focus:ring-[#D4AF37]/20 border-2 border-transparent focus:border-[#D4AF37]"
            />

            {q && (
              <button 
                onClick={() => setQ("")} 
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-black transition-all"
              >
                <X size={18} />
              </button>
            )}

            <div className="absolute top-full mt-4 right-0 hidden md:flex items-center gap-1.5 text-white/30 text-[10px] font-bold uppercase tracking-widest">
              <Command size={10} />
              <span>Press '/' to Focus</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {!hasQuery ? (
          <div className="space-y-12">
            {/* Suggested Tags */}
            <div className="text-center">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                Common Research Terms
              </h3>
              <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
                {SUGGESTIONS.map(s => (
                  <button 
                    key={s} 
                    onClick={() => setQ(s)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-slate-200 text-sm font-bold text-slate-600 hover:border-[#D4AF37] hover:text-[#D4AF37] hover:shadow-md transition-all active:scale-95"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Information Card */}
            <div className="max-w-xl mx-auto bg-blue-50/50 border border-blue-100 rounded-3xl p-8 flex gap-4">
              <Info className="text-blue-500 shrink-0" size={20} />
              <div>
                <h4 className="text-sm font-bold text-blue-900 mb-1">Archive Search</h4>
                <p className="text-xs text-blue-800/70 leading-relaxed">
                  The search engine looks through verse text, chapter references, and historical context. Results are weighted by relevance to your keyword.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Results Meta */}
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <h2 className="text-sm font-black uppercase tracking-widest text-slate-400">
                Found <span className="text-black">{results.length}</span> matching verses
              </h2>
              <div className="text-xs font-bold text-[#D4AF37]">
                Query: "{q}"
              </div>
            </div>

            {results.length > 0 ? (
              <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
                {results.map(v => (
                  <div key={v.id} className="break-inside-avoid">
                    <VerseCard verse={v} compact />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-32 bg-white rounded-[2rem] border-2 border-dashed border-slate-200">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-slate-50 text-slate-300 mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-lg font-serif font-bold text-slate-900">No matches found</h3>
                <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2">
                  We couldn't find any verses matching "{q}". Try searching for synonyms or broader terms.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <Footer />
    </main>
  );
}