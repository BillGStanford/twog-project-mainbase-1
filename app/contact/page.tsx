import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Send, Globe, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fafafa]">
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0a192f] border-b-8 border-[#D4AF37] pt-24 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <div className="inline-flex items-center gap-2 mb-6 text-[#D4AF37]">
            <Globe size={18} />
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Communication Portal</span>
          </div>
          <h1 className="font-serif text-5xl md:text-8xl font-black text-white leading-[0.85] tracking-tighter uppercase italic mb-8">
            GET IN <br /> TOUCH.
          </h1>
          <p className="font-serif text-xl text-white/60 max-w-2xl italic leading-relaxed">
            Have a question about the archive, a correction for a verse, or a business inquiry? Our lines are open for formal correspondence.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          
          {/* Left Column: Information */}
          <div className="space-y-12">
            <div>
              <h2 className="font-serif text-3xl font-black text-slate-900 tracking-tighter uppercase italic mb-6">
                Inquiry Channels
              </h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Whether you are a researcher, a member of the press, or a curious reader, please use the appropriate channel below for the fastest response.
              </p>
            </div>

            <div className="space-y-8">
              <ContactMethod 
                icon={<Mail className="text-[#1e40af]" size={24} />}
                title="Direct Email"
                value="urowncontact@gmail.com"
                link="mailto:urowncontact@gmail.com"
              />
              <ContactMethod 
                icon={<MessageSquare className="text-[#1e40af]" size={24} />}
                title="Archive Corrections"
                value="Submit a correction via email"
                link="mailto:urowncontact@gmail.com?subject=Archive%20Correction"
              />
              <div className="flex gap-4 items-start p-6 bg-slate-100 rounded-2xl border border-slate-200">
                <MapPin className="text-slate-400 mt-1" size={20} />
                <div>
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Digital Presence</h4>
                  <p className="text-sm font-bold text-slate-800 tracking-tight">Hosted on the Edge // twog.io</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual CTA Box */}
          <div className="bg-[#0a192f] p-12 rounded-[3rem] border-b-8 border-[#D4AF37] shadow-2xl flex flex-col justify-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Send size={120} className="text-white" />
            </div>
            
            <h3 className="font-serif text-4xl font-black italic text-white mb-6 uppercase leading-tight">
              Ready to <br /> <span className="text-[#D4AF37]">Connect?</span>
            </h3>
            <p className="text-white/60 text-lg mb-10 italic font-serif">
              Click the button below to launch your default mail client and reach the project administrator directly.
            </p>
            
            <a 
              href="mailto:urowncontact@gmail.com"
              className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#D4AF37] text-[#0a192f] text-[12px] font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-white transition-all shadow-xl group"
            >
              Send Message
              <Send size={16} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}

function ContactMethod({ icon, title, value, link }: { icon: React.ReactNode, title: string, value: string, link: string }) {
  return (
    <div className="flex gap-6 items-start group">
      <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm group-hover:shadow-md transition-shadow">
        {icon}
      </div>
      <div>
        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#1e40af] mb-1">{title}</h4>
        <a href={link} className="text-xl font-serif font-black italic text-slate-900 hover:text-[#D4AF37] transition-colors decoration-[#D4AF37] decoration-2 underline-offset-4 hover:underline">
          {value}
        </a>
      </div>
    </div>
  );
}