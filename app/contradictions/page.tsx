import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { contradictionPairs, getVerseById, getCategoryMeta } from "@/data/verses";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Bible Contradictions — God vs. God",
  description: "Side-by-side Bible contradictions where the same God directly contradicts himself.",
};

const CAT_COLOR: Record<string,string> = { violence:"#dc2626", slavery:"#ea580c", women:"#7c3aed", punishment:"#d97706", contradictions:"#1d4ed8", children:"#be185d" };

function MiniCard({ verseId, label }: { verseId:string; label:string }) {
  const verse = getVerseById(verseId);
  if (!verse) return null;
  const color = CAT_COLOR[verse.category] ?? "#1a7abf";

  return (
    <div className="flex-1 rounded-2xl border p-6"
      style={{ background:"#fff", borderColor:"var(--border)", borderTop:`4px solid ${color}` }}>
      <p className="text-[9px] font-bold tracking-widest uppercase mb-3" style={{ color:"var(--ink-muted)" }}>{label}</p>
      <blockquote className="text-[14px] leading-relaxed mb-4" style={{ fontFamily:"var(--font-serif)", fontStyle:"italic", color:"var(--ink)" }}>
        &ldquo;{verse.text.length > 260 ? verse.text.slice(0,260)+"…" : verse.text}&rdquo;
      </blockquote>
      <div className="flex items-center justify-between">
        <span className="text-[13px] font-semibold" style={{ color }}>— {verse.reference}</span>
        <Link href={`/verse/${verse.id}`}
          className="text-[11px] font-semibold flex items-center gap-1 hover:underline"
          style={{ color:"var(--sky)" }}>
          Full verse <ArrowRight size={11}/>
        </Link>
      </div>
    </div>
  );
}

export default function ContradictionsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <div style={{ background:"linear-gradient(135deg,#1d4ed8,#1a3a9a)", borderBottom:"3px solid var(--gold)" }}>
        <div className="max-w-5xl mx-auto px-4 py-12 relative overflow-hidden">
          <div className="absolute inset-0 hero-rays opacity-20 pointer-events-none"/>
          <div className="relative">
            <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold mb-6 hover:underline"
              style={{ color:"rgba(255,255,255,.6)" }}>
              <ArrowLeft size={12}/> Back
            </Link>
            <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color:"rgba(255,255,255,.5)" }}>
              God vs. God
            </div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(40px,6vw,72px)", color:"#fff", letterSpacing:".02em", lineHeight:.95, marginBottom:"12px" }}>
              BIBLE CONTRADICTIONS
            </h1>
            <p style={{ color:"rgba(255,255,255,.75)", fontSize:"15px", fontFamily:"var(--font-serif)", fontStyle:"italic" }}>
              The same God, the same text, directly contradicting itself.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="space-y-14 stagger">
          {contradictionPairs.map(pair => (
            <div key={pair.id}>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <span className="text-[11px] font-bold px-3 py-1.5 rounded-full border"
                  style={{ background:"#eff6ff", color:"#1d4ed8", borderColor:"#93c5fd" }}>
                  {pair.label}
                </span>
                <h2 style={{ fontFamily:"var(--font-serif)", fontSize:"19px", fontWeight:700, color:"var(--ink)" }}>
                  {pair.title}
                </h2>
              </div>
              <div className="flex flex-col md:flex-row items-stretch gap-4">
                <MiniCard verseId={pair.verseA} label="Verse A" />
                <div className="flex items-center justify-center font-bold text-[20px] px-2 md:flex-col"
                  style={{ color:"#1d4ed8", fontFamily:"var(--font-display)", letterSpacing:".04em" }}>
                  VS
                </div>
                <MiniCard verseId={pair.verseB} label="Verse B" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
