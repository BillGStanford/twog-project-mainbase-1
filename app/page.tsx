"use client";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import GrowthPopup from "@/components/GrowthPopup"; // New Component
import { getFeaturedVerses, categories, lists, verses } from "@/data/verses";
import { ArrowRight, Shuffle, BookOpen, Sword, Link2, User, Gavel, GitFork, Baby } from "lucide-react";

const ICONS: Record<string, any> = { Sword, Link2, User, Gavel, GitFork, Baby };

export default function HomePage() {
  const featured = getFeaturedVerses().slice(0, 6);

  return (
    <main className="min-h-screen">
      {/* Logic for "Show Once" is handled inside this component via localStorage */}
      <GrowthPopup />

      <Navbar />

      {/* ── HERO ── */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(160deg, #1a7abf 0%, #0f5a8a 60%, #0a3d5c 100%)" }}>
        <div className="absolute inset-0 hero-rays opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 inset-x-0 h-1" style={{ background: "var(--gold)" }} />

        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-28 text-center">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border text-[11px] font-semibold"
            style={{ background:"rgba(240,180,41,.15)", borderColor:"rgba(240,180,41,.4)", color:"var(--gold)", letterSpacing:".06em" }}>
            <span className="w-1.5 h-1.5 rounded-full pulse-dot" style={{ background:"var(--gold)" }} />
            {verses.length} VERSES ARCHIVED · {categories.length} CATEGORIES
          </div>

          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(64px,12vw,130px)", lineHeight:.92, letterSpacing:".02em", color:"#fff", marginBottom:"16px", textShadow:"0 4px 24px rgba(0,0,0,.3)" }}>
            EVERYTHING<br />
            <span style={{ color:"var(--gold)", textShadow:"0 2px 20px rgba(240,180,41,.5)" }}>GOD SAYS</span><br />
            IN THE BIBLE.
          </h1>

          <p style={{ fontFamily:"var(--font-serif)", fontSize:"clamp(16px,2vw,20px)", color:"rgba(255,255,255,.85)", maxWidth:"540px", margin:"0 auto 32px", lineHeight:1.65, fontStyle:"italic" }}>
            A searchable archive of divine commands, punishments, and moral decrees.
            The content condemns itself.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/browse/violence"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold press transition-all"
              style={{ background:"var(--gold)", color:"var(--ink)", boxShadow:"0 4px 20px rgba(240,180,41,.45)" }}>
              Browse Archive <ArrowRight size={16}/>
            </Link>
            <Link href="/random"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold press transition-all"
              style={{ background:"rgba(255,255,255,.15)", color:"#fff", border:"1px solid rgba(255,255,255,.3)", backdropFilter:"blur(8px)" }}>
              <Shuffle size={16}/> Random Verse
            </Link>
            <Link href="/search"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[14px] font-bold press transition-all"
              style={{ background:"rgba(255,255,255,.15)", color:"#fff", border:"1px solid rgba(255,255,255,.3)", backdropFilter:"blur(8px)" }}>
              <BookOpen size={16}/> Search
            </Link>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ── */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-1 w-8 rounded-full" style={{ background:"var(--sky)" }} />
          <p className="text-[11px] font-bold tracking-widest uppercase" style={{ color:"var(--sky)" }}>Browse by Category</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 stagger">
          {categories.map((cat) => {
            const Icon = ICONS[cat.icon] ?? Sword;
            const count = verses.filter(v => v.category === cat.id).length;
            const s = {
              violence:      { bg:"#fef2f2", border:"#fca5a5", color:"#dc2626" },
              slavery:       { bg:"#fff7ed", border:"#fdba74", color:"#ea580c" },
              women:         { bg:"#f5f3ff", border:"#c4b5fd", color:"#7c3aed" },
              punishment:    { bg:"#fffbeb", border:"#fcd34d", color:"#d97706" },
              contradictions:{ bg:"#eff6ff", border:"#93c5fd", color:"#1d4ed8" },
              children:      { bg:"#fdf2f8", border:"#f9a8d4", color:"#be185d" },
            }[cat.id] ?? { bg:"#f0f9ff", border:"#7dd3fc", color:"#0369a1" };
            return (
              <Link key={cat.id} href={`/browse/${cat.id}`}
                className="flex flex-col items-center gap-3 p-4 rounded-2xl border card-lift text-center"
                style={{ background:s.bg, borderColor:s.border }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background:"#fff", boxShadow:`0 2px 8px ${s.color}33` }}>
                  <Icon size={20} style={{ color:s.color }}/>
                </div>
                <div>
                  <div className="text-[11px] font-bold leading-tight" style={{ color:"var(--ink)" }}>{cat.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color:"var(--ink-muted)" }}>{count} verses</div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── SHARE PACK ── */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-end justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="h-1 w-8 rounded-full" style={{ background:"var(--gold-dark)" }} />
              <p className="text-[11px] font-bold tracking-widest uppercase" style={{ color:"var(--gold-dark)" }}>Share Pack</p>
            </div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3vw,38px)", color:"var(--ink)", letterSpacing:".02em" }}>
              READY TO SHARE
            </h2>
            <p className="text-[13px] mt-1" style={{ color:"var(--ink-muted)" }}>Download cards, copy text, or share links instantly</p>
          </div>
          <Link href="/browse/violence"
            className="text-[12px] font-semibold flex items-center gap-1 hover:underline"
            style={{ color:"var(--sky)" }}>
            See all <ArrowRight size={12}/>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 stagger">
          {featured.map(v => <VerseCard key={v.id} verse={v} featured />)}
        </div>
      </section>

      {/* ── CURATED LISTS ── */}
      <section className="max-w-7xl mx-auto px-4 pb-14">
        <div className="flex items-center gap-3 mb-1">
          <div className="h-1 w-8 rounded-full" style={{ background:"var(--sky)" }} />
          <p className="text-[11px] font-bold tracking-widest uppercase" style={{ color:"var(--sky)" }}>Curated Lists</p>
        </div>
        <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(26px,3vw,38px)", color:"var(--ink)", letterSpacing:".02em", marginBottom:"6px" }}>
          COMPILED FOR SHARING
        </h2>
        <p className="text-[13px] mb-6" style={{ color:"var(--ink-muted)" }}>Organised by theme for maximum impact</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
          {lists.map((list, i) => {
            const colors = ["#dc2626","#ea580c","#7c3aed","#d97706","#1d4ed8"];
            const c = colors[i % colors.length];
            return (
              <Link key={list.id} href={`/lists/${list.slug}`}
                className="group p-5 rounded-2xl card-lift block border"
                style={{ background:"#fff", borderColor:"var(--border)", borderLeft:`4px solid ${c}` }}>
                <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ color:c }}>{list.verseIds.length} verses</div>
                <h3 style={{ fontFamily:"var(--font-serif)", fontSize:"17px", fontWeight:700, color:"var(--ink)", lineHeight:1.35, marginBottom:"8px" }}>
                  {list.title}
                </h3>
                <p className="text-[12px] leading-relaxed" style={{ color:"var(--ink-muted)" }}>{list.description}</p>
                <div className="mt-4 text-[12px] font-semibold flex items-center gap-1 group-hover:gap-2 transition-all" style={{ color:c }}>
                  Read List <ArrowRight size={12}/>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ── RANDOM CTA ── */}
      <section className="max-w-7xl mx-auto px-4 pb-20">
        <div className="relative rounded-3xl overflow-hidden p-10 md:p-16 text-center"
          style={{ background:"linear-gradient(135deg, #1a7abf 0%, #0f5a8a 100%)" }}>
          <div className="absolute inset-0 hero-rays opacity-20 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 h-1" style={{ background:"var(--gold)" }} />
          <div className="relative">
            <div className="text-5xl mb-4">📖</div>
            <h2 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(28px,4vw,52px)", color:"#fff", letterSpacing:".02em", marginBottom:"12px" }}>
              SHOW ME WHAT GOD SAID TODAY.
            </h2>
            <p style={{ color:"rgba(255,255,255,.8)", marginBottom:"28px", maxWidth:"400px", marginLeft:"auto", marginRight:"auto", fontSize:"15px", fontFamily:"var(--font-serif)", fontStyle:"italic" }}>
              Hit the button. Get a random verse. Share it everywhere.
            </p>
            <Link href="/random"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-[15px] press transition-all"
              style={{ background:"var(--gold)", color:"var(--ink)", boxShadow:"0 4px 20px rgba(240,180,41,.5)" }}>
              <Shuffle size={18}/> Random Verse Generator
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}