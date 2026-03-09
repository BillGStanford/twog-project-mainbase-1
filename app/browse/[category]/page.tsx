"use client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import Link from "next/link";
import { getVersesByCategory, getCategoryMeta, categories } from "@/data/verses";
import { ArrowLeft, Filter, BookOpen, Layers } from "lucide-react";

// Updated Color Map to match VerseCard.tsx exactly
const CAT_STYLE: Record<string, { bg:string; border:string; color:string; glow: string }> = {
  violence:      { bg:"#fef2f2", border:"#fee2e2", color:"#991b1b", glow: "rgba(153, 27, 27, 0.05)" },
  slavery:       { bg:"#fff7ed", border:"#ffedd5", color:"#9a3412", glow: "rgba(154, 52, 18, 0.05)" },
  women:         { bg:"#f5f3ff", border:"#ede9fe", color:"#5b21b6", glow: "rgba(91, 33, 182, 0.05)" },
  punishment:    { bg:"#fffbeb", border:"#fef3c7", color:"#92400e", glow: "rgba(146, 64, 14, 0.05)" },
  contradictions:{ bg:"#eff6ff", border:"#dbeafe", color:"#1e40af", glow: "rgba(30, 64, 175, 0.05)" },
  children:      { bg:"#fdf2f8", border:"#fce7f3", color:"#9d174d", glow: "rgba(157, 23, 77, 0.05)" },
};

export default function BrowsePage({ params }: any) {
  const cat = getCategoryMeta(params.category);
  if (!cat) notFound();

  const catVerses = getVersesByCategory(params.category);
  const subs = [...new Set(catVerses.map(v => v.subcategory))];
  const s = CAT_STYLE[params.category] ?? { bg:"#f8fafc", border:"#f1f5f9", color:"#1e293b", glow: "transparent" };

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: s.border, background: s.bg }}>
        {/* Subtle Background Graphic */}
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
           <BookOpen size={400} strokeWidth={0.5} style={{ color: s.color }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 relative z-10">
          <Link href="/" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-black transition-colors mb-8">
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-[2px]" style={{ background: s.color }} />
                <span className="text-xs font-black uppercase tracking-[0.3em]" style={{ color: s.color }}>
                  Category Archive
                </span>
              </div>
              
              <h1 className="font-serif text-6xl md:text-8xl font-black text-slate-900 leading-[0.85] tracking-tighter uppercase italic">
                {cat.label}
              </h1>
              
              <p className="mt-8 text-lg text-slate-600 leading-relaxed max-w-xl">
                Verbatim scripture regarding <span className="font-bold text-slate-900">{cat.label.toLowerCase()}</span>. 
                All passages are presented without editorial modification.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-2">
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-3xl font-serif font-black text-slate-900">{catVerses.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Verses</div>
                </div>
                <div className="w-[1px] h-10 bg-slate-200" />
                <div className="text-right">
                  <div className="text-3xl font-serif font-black text-slate-900">{subs.length}</div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Thematic Subs</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filtering Sub-nav */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-500 font-bold text-[11px] uppercase whitespace-nowrap">
              <Filter size={12} />
              Filter By:
            </div>
            {subs.map(sub => (
              <button 
                key={sub} 
                className="px-4 py-1.5 rounded-full border border-slate-200 text-[11px] font-bold text-slate-600 hover:border-black hover:text-black transition-all whitespace-nowrap"
              >
                {sub}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Grid Section */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        {catVerses.length > 0 ? (
          <div className="columns-1 md:columns-2 xl:columns-3 gap-6 space-y-6">
            {catVerses.map(v => (
              <div key={v.id} className="break-inside-avoid">
                <VerseCard verse={v} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-40 border-2 border-dashed border-slate-200 rounded-3xl">
             <Layers className="mx-auto text-slate-200 mb-4" size={48} />
             <p className="text-slate-400 font-medium">No verses archived for this category yet.</p>
          </div>
        )}
      </section>

      {/* Bottom CTA / Navigation */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-100">
        <div className="bg-slate-900 rounded-[2rem] p-12 relative overflow-hidden text-center md:text-left">
           <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Explore another theme?</h3>
                <p className="text-slate-400">Continue your research through our categorized database.</p>
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {categories.filter(c => c.id !== params.category).slice(0, 3).map(c => (
                  <Link 
                    key={c.id} 
                    href={`/browse/${c.id}`}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all"
                  >
                    {c.label}
                  </Link>
                ))}
              </div>
           </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}