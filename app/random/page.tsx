"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import { verses } from "@/data/verses";
import { Shuffle, RefreshCw } from "lucide-react";

export default function RandomPage() {
  const [verse, setVerse] = useState<any>(null);
  const [key, setKey] = useState(0);

  const next = () => {
    setVerse(verses[Math.floor(Math.random() * verses.length)]);
    setKey(k => k + 1);
  };

  useEffect(() => { next(); }, []);

  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#1a7abf,#0f5a8a)", borderBottom:"3px solid var(--gold)" }}>
        <div className="max-w-2xl mx-auto px-4 py-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-rays opacity-20 pointer-events-none"/>
          <div className="relative">
            <div className="text-5xl mb-3">🎲</div>
            <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(36px,6vw,62px)", color:"#fff", letterSpacing:".02em", marginBottom:"10px" }}>
              SHOW ME WHAT<br />GOD SAID TODAY.
            </h1>
            <p style={{ color:"rgba(255,255,255,.75)", marginBottom:"24px", fontSize:"15px", fontFamily:"var(--font-serif)", fontStyle:"italic" }}>
              Every click reveals a different divine command, punishment, or decree.
            </p>
            <button onClick={next}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-bold text-[15px] press transition-all"
              style={{ background:"var(--gold)", color:"var(--ink)", boxShadow:"0 4px 20px rgba(240,180,41,.5)" }}>
              <Shuffle size={18}/> New Random Verse
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-10">
        {verse && (
          <div key={key} className="animate-fade-up">
            <VerseCard verse={verse} featured />
          </div>
        )}
        <div className="mt-6 flex justify-center">
          <button onClick={next}
            className="inline-flex items-center gap-2 text-[12px] font-semibold px-4 py-2.5 rounded-xl border press transition-all hover:underline"
            style={{ color:"var(--sky)", background:"var(--sky-light)", borderColor:"var(--border)" }}>
            <RefreshCw size={13}/> Another one
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
