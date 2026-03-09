import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gavel, FileText, AlertTriangle, ShieldCheck } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0a192f] border-b-8 border-[#D4AF37] pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 text-[#D4AF37]">
            <Gavel size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Legal Framework</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
            TERMS OF <br /> SERVICE.
          </h1>
          <p className="font-serif text-xl text-white/60 max-w-2xl italic leading-relaxed">
            By accessing the TWOG archive, you acknowledge the verbatim nature of this repository and agree to the following operational parameters.
          </p>
        </div>
      </section>

      {/* Terms Content */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="space-y-20">
          
          {/* 01. Verbatim Content Disclaimer */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <AlertTriangle className="text-[#991b1b]" size={28} />
              01. Content Nature
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                The TWOG project archives the **New International Version (NIV)** of the Bible as a primary historical and religious source. This archive includes text depicting violence, punishment, and various forms of discrimination.
              </p>
              <p className="font-bold text-slate-900 italic">
                TWOG presents this data verbatim. Our presentation of these texts does not constitute an endorsement of the actions or philosophies described therein.
              </p>
            </div>
          </div>

          {/* 02. Usage & Distribution */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <FileText className="text-[#1e40af]" size={28} />
              02. Digital Distribution
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                Users are encouraged to use the archive's "Download Card" feature for educational and critical distribution. However:
              </p>
              <ul className="list-none space-y-2 p-0">
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">»</span> 
                  You may not modify the text of a verse while using TWOG branding.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#D4AF37] font-bold">»</span> 
                  You may not use the archive for automated data scraping or commercial redistribution without express written consent.
                </li>
              </ul>
            </div>
          </div>

          {/* 03. Limitation of Liability */}
          <div className="relative border-l-2 border-slate-200 pl-8 md:pl-16">
            <span className="absolute -left-[11px] top-0 w-5 h-5 rounded-full bg-[#0a192f] border-4 border-[#D4AF37]" />
            <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6 flex items-center gap-4">
              <ShieldCheck className="text-[#1e40af]" size={28} />
              03. Liability & Accuracy
            </h2>
            <div className="prose prose-slate max-w-none text-slate-600 space-y-4">
              <p>
                While we strive for perfect archival accuracy, TWOG is provided "as is." We are not liable for any theological, philosophical, or psychological distress resulting from the reading of these unedited historical texts.
              </p>
            </div>
          </div>

        </div>

        {/* Closing Notice */}
        <div className="mt-32 p-12 bg-slate-100 rounded-[3rem] border-b-8 border-slate-300 text-center">
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-4">
            Last Updated: March 2026
          </p>
          <p className="text-slate-400 text-[10px] max-w-md mx-auto leading-relaxed">
            TWOG reserves the right to modify these terms at any time to better reflect the archival mission. Continued use of the archive constitutes acceptance of the current legal framework.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}