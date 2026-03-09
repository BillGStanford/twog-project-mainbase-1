import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Lock, EyeOff, Database, ShieldAlert } from "lucide-react";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0a192f] border-b-8 border-[#D4AF37] pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 text-[#D4AF37]">
            <Lock size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Security Protocol</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
            PRIVACY <br /> & POLICY.
          </h1>
          <p className="font-serif text-xl text-white/60 max-w-2xl italic leading-relaxed">
            Our data practices are as transparent as our archive. We believe in the right to explore information without surveillance.
          </p>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-20">
          
          {/* Section 01: Data Collection */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <EyeOff className="text-[#1e40af]" size={28} />
              01. Zero Surveillance
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                TWOG is designed to be a read-only archive. We do not require account creation, email registration, or any form of identity verification to access the Word of God. 
              </p>
              <ul className="list-none space-y-2 p-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">»</span> 
                  We do not use tracking cookies for marketing purposes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">»</span> 
                  We do not sell user data to third-party advertisers.
                </li>
              </ul>
            </div>
          </div>

          {/* Section 02: Technical Logs */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <Database className="text-[#1e40af]" size={28} />
              02. Technical Metadata
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                Like all web servers, our infrastructure may collect standard technical logs to ensure service stability. This typically includes:
              </p>
              <div className="bg-slate-100 p-6 rounded-2xl font-mono text-[11px] text-slate-500 uppercase tracking-widest leading-relaxed">
                IP Address [Masked] // Request Timestamp // Browser Agent // Referrer Source
              </div>
              <p>
                This data is used exclusively for performance monitoring and DDoS protection. It is never cross-referenced with your personal identity.
              </p>
            </div>
          </div>

          {/* Section 03: External Links */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <ShieldAlert className="text-[#1e40af]" size={28} />
              03. External Audits
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                This archive contains links to external theological sources and bibliographical references. Once you depart the TWOG domain, we are no longer responsible for the privacy practices or content of those external entities. We encourage you to audit the privacy policies of any site you visit.
              </p>
            </div>
          </div>

        </div>

        {/* Closing Contact */}
        <div className="mt-32 p-12 bg-[#0a192f] rounded-[3rem] border-b-8 border-[#D4AF37] text-center">
          <h3 className="font-serif text-2xl font-black italic text-white mb-4 uppercase">Questions?</h3>
          <p className="text-white/60 text-sm mb-8">
            For inquiries regarding the archive or data handling, contact the administrator.
          </p>
          <a href="mailto:admin@twog.io" className="text-[#D4AF37] font-black uppercase tracking-widest text-xs hover:underline">
            admin@twog.io
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}