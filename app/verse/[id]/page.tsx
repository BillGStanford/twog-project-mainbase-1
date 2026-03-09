"use client";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import Link from "next/link";
import { getVerseById, getVersesByCategory, getCategoryMeta } from "@/data/verses";
import { ArrowLeft, ArrowRight, GitFork, BookOpen, Hash, Info, Sparkles } from "lucide-react";

export default function VersePage({ params }: any) {
  const verse = getVerseById(params.id);
  if (!verse) notFound();
  
  const cat = getCategoryMeta(verse.category);
  const related = getVersesByCategory(verse.category).filter(v => v.id !== verse.id).slice(0, 4);
  const contradicts = verse.contradictsWith ? getVerseById(verse.contradictsWith) : null;

  const CAT_COLOR: Record<string, string> = { 
    violence: "#991b1b", 
    slavery: "#9a3412", 
    women: "#5b21b6", 
    punishment: "#92400e", 
    contradictions: "#1e40af", 
    children: "#9d174d" 
  };
  const themeColor = CAT_COLOR[verse.category] ?? "#1e293b";

  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        {/* Navigation Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-10 text-[11px] font-bold uppercase tracking-widest text-slate-400">
          <Link href="/" className="hover:text-black transition-colors">Archive</Link>
          <ArrowRight size={10} />
          <Link href={`/browse/${verse.category}`} className="hover:text-black transition-colors" style={{ color: themeColor }}>
            {cat?.label}
          </Link>
          <ArrowRight size={10} />
          <span className="text-slate-900">{verse.reference}</span>
        </nav>

        {/* The Main Artifact (Verse) */}
        <div className="mb-10">
           <VerseCard verse={verse} featured />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Context & Data */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-6 text-[#D4AF37]">
                <Info size={18} />
                <h2 className="text-xs font-black uppercase tracking-[0.2em]">Contextual Analysis</h2>
              </div>
              
              <p className="font-serif text-lg leading-relaxed text-slate-700 italic">
                {verse.context}
              </p>

              <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-2 gap-6">
                <DataPoint label="Biblical Book" value={verse.book} icon={<BookOpen size={14} />} />
                <DataPoint label="Specific Ref" value={verse.reference} icon={<Hash size={14} />} />
                <DataPoint label="Category" value={cat?.label} color={themeColor} />
                <DataPoint label="Sub-Theme" value={verse.subcategory} />
              </div>
            </section>

            {/* Contradiction Block (Enhanced) */}
            {verse.contradictionNote && (
              <section className="relative overflow-hidden bg-blue-50 border border-blue-200 rounded-[2rem] p-8">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <GitFork size={80} className="text-blue-600" />
                </div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-blue-700">
                    <GitFork size={18} />
                    <h2 className="text-xs font-black uppercase tracking-[0.2em]">Theological Contradiction</h2>
                  </div>
                  
                  <p className="text-slate-800 leading-relaxed mb-6 font-medium">
                    {verse.contradictionNote}
                  </p>

                  {contradicts && (
                    <Link 
                      href={`/verse/${contradicts.id}`}
                      className="group flex flex-col p-5 bg-white rounded-2xl border border-blue-200 hover:border-blue-400 transition-all shadow-sm"
                    >
                      <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1">Conflicting Verse</span>
                      <span className="text-sm font-serif italic text-slate-600 mb-2">"{contradicts.text.slice(0, 80)}..."</span>
                      <span className="text-xs font-bold text-slate-900 inline-flex items-center gap-1 group-hover:text-blue-600">
                        View {contradicts.reference} <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </Link>
                  )}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Sidebar Actions */}
          <aside className="space-y-6">
            <div className="bg-[#0a192f] rounded-[2rem] p-8 text-white">
              <Sparkles className="text-[#D4AF37] mb-4" size={24} />
              <h3 className="font-serif text-xl font-bold mb-2 uppercase italic tracking-tighter">Scholarly Notice</h3>
              <p className="text-xs text-white/50 leading-relaxed uppercase tracking-wide">
                All verses in this database are pulled verbatim from the NIV translation. No words have been added or removed.
              </p>
              <button className="mt-6 w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-[0.2em] transition-all">
                Cite this Source
              </button>
            </div>

            <div className="p-6 border border-dashed border-slate-300 rounded-[2rem] text-center">
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Quick Link</p>
               <code className="text-[10px] bg-slate-100 p-2 rounded block break-all text-slate-600">
                twog.io/v/{verse.id}
               </code>
            </div>
          </aside>
        </div>

        {/* Related Section */}
        {related.length > 0 && (
          <div className="mt-24">
            <div className="flex items-center justify-between mb-8 border-b border-slate-200 pb-4">
              <h2 className="font-serif text-3xl font-black text-slate-900 uppercase italic tracking-tighter">
                More from {cat?.label}
              </h2>
              <Link href={`/browse/${verse.category}`} className="text-xs font-black uppercase tracking-widest text-[#D4AF37] hover:underline">
                View All →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {related.map(v => <VerseCard key={v.id} verse={v} compact />)}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}

// Helper Component
function DataPoint({ label, value, icon, color }: any) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
        {icon}
        {label}
      </div>
      <div className="text-sm font-bold text-slate-900" style={{ color: color || 'inherit' }}>
        {value}
      </div>
    </div>
  );
}