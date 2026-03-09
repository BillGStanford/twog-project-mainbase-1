import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VerseCard from "@/components/VerseCard";
import Link from "next/link";
import { lists, getVerseById } from "@/data/verses";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() { return lists.map(l => ({ slug: l.slug })); }
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const list = lists.find(l => l.slug === params.slug);
  if (!list) return {};
  return { title: list.title, description: list.description, openGraph:{ title:`${list.title} | TWOG`, description:list.description } };
}

export default function ListPage({ params }: any) {
  const list = lists.find(l => l.slug === params.slug);
  if (!list) notFound();
  const listVerses = list.verseIds.map(id => getVerseById(id)).filter(Boolean);
  const colors = ["#dc2626","#ea580c","#7c3aed","#d97706","#1d4ed8"];
  const idx = lists.findIndex(l=>l.slug===params.slug);
  const c = colors[idx%colors.length];

  return (
    <main className="min-h-screen">
      <Navbar />

      <div style={{ background:`linear-gradient(135deg,${c}20,${c}08)`, borderBottom:`3px solid ${c}` }}>
        <div className="max-w-5xl mx-auto px-4 py-10">
          <Link href="/" className="inline-flex items-center gap-1.5 text-[11px] font-semibold mb-6 hover:underline"
            style={{ color:"var(--ink-muted)" }}>
            <ArrowLeft size={12}/> Back to Archive
          </Link>
          <div className="text-[11px] font-bold tracking-widest uppercase mb-2" style={{ color:c }}>
            Curated List
          </div>
          <h1 style={{ fontFamily:"var(--font-display)", fontSize:"clamp(30px,5vw,58px)", color:"var(--ink)", lineHeight:.95, letterSpacing:".02em", marginBottom:"12px" }}>
            {list.title.toUpperCase()}
          </h1>
          <p className="text-[14px] max-w-2xl mb-3" style={{ color:"var(--ink-muted)", fontFamily:"var(--font-serif)" }}>
            {list.description}
          </p>
          <span className="text-[12px] font-semibold px-3 py-1.5 rounded-full border"
            style={{ color:c, background:"#fff", borderColor:c+"44" }}>
            {listVerses.length} verses
          </span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 stagger">
          {listVerses.map((v:any) => <VerseCard key={v.id} verse={v}/>)}
        </div>
      </div>
      <Footer />
    </main>
  );
}
