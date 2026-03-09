import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck, BookOpen, Search, Share2, Scale } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0a192f] border-b-8 border-[#D4AF37] pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10 text-center md:text-left">
          <div className="inline-flex items-center gap-2 mb-6 text-[#D4AF37]">
            <ShieldCheck size={20} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Project Dossier</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
            The Word <br /> Of God.
          </h1>
          <p className="font-serif text-xl text-white/60 max-w-2xl italic leading-relaxed">
            A verbatim digital archive of biblical text, presented without commentary, censorship, or modern sanitization.
          </p>
        </div>
      </section>

      {/* Core Philosophy Section */}
      <section className="max-w-5xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="font-serif text-4xl font-black text-slate-900 tracking-tighter uppercase italic mb-6">
              Our Mandate
            </h2>
            <div className="space-y-6 text-slate-600 leading-relaxed">
              <p>
                TWOG was established as a tool for clarity. In a world of modern theological interpretation, the original weight of the text is often lost or softened. Our mission is to strip away the varnish.
              </p>
              <p>
                Every verse in this archive is sourced directly from the <span className="text-slate-900 font-bold">New International Version (NIV)</span>. We do not choose verses based on popularity; we choose them based on their direct, unedited impact on ethics, law, and history.
              </p>
            </div>
          </div>

          <div className="bg-[#0a192f] p-10 rounded-[2.5rem] border-b-4 border-[#D4AF37] shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <Scale size={120} className="text-white" />
             </div>
             <h3 className="text-[#D4AF37] font-serif text-2xl font-black italic mb-4">The Verbatim Principle</h3>
             <ul className="space-y-4">
                {[
                  "Unedited: No words added or removed.",
                  "Unchosen: Broad thematic categorization.",
                  "Uncensored: Highlighting the difficult and the contradictory."
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 text-white/80 text-sm font-medium">
                    <span className="text-[#D4AF37] font-black italic">0{i+1}.</span>
                    {item}
                  </li>
                ))}
             </ul>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1e40af]">Technical Capabilities</span>
            <h2 className="font-serif text-4xl font-black text-slate-900 tracking-tighter uppercase italic mt-2">The Archive Toolset</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Search size={24} />} 
              title="Semantic Discovery" 
              desc="Navigate the archive by category—from violence and punishment to contradictions and the status of women."
            />
            <FeatureCard 
              icon={<BookOpen size={24} />} 
              title="Contextual Audit" 
              desc="Every verse includes surrounding historical and narrative context to ensure the literal meaning is preserved."
            />
            <FeatureCard 
              icon={<Share2 size={24} />} 
              title="Proof of Record" 
              desc="Generate high-resolution archive cards for social distribution, ensuring the text remains legible and sourced."
            />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <h2 className="font-serif text-4xl md:text-6xl font-black text-slate-900 tracking-tighter uppercase italic mb-8">
          Audit the Text.
        </h2>
        <p className="text-slate-500 max-w-xl mx-auto mb-10">
          Knowledge requires direct engagement with primary sources. Start your exploration of the archive today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/browse" className="px-10 py-4 bg-[#0a192f] text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all shadow-xl">
            Browse Archive
          </Link>
          <Link href="/contradictions" className="px-10 py-4 border-2 border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-white transition-all">
            View Contradictions
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-10 rounded-[2rem] border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="text-[#1e40af] mb-6">{icon}</div>
      <h3 className="font-serif text-xl font-black italic text-slate-900 mb-4 tracking-tight">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}