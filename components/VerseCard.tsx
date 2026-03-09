"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Copy, Check, Share2, ExternalLink, ImageDown, Quote, X, Download } from "lucide-react";

/* ── DESIGN TOKENS ── */
const CAT: Record<string, { color: string; bg: string; border: string; label: string }> = {
  violence:      { color: "#991b1b", bg: "#fef2f2", border: "#fee2e2", label: "Violence & Genocide" },
  slavery:       { color: "#9a3412", bg: "#fff7ed", border: "#ffedd5", label: "Slavery" },
  women:         { color: "#5b21b6", bg: "#f5f3ff", border: "#ede9fe", label: "Women" },
  punishment:    { color: "#92400e", bg: "#fffbeb", border: "#fef3c7", label: "Punishment" },
  contradictions:{ color: "#1e40af", bg: "#eff6ff", border: "#dbeafe", label: "Contradictions" },
  children:      { color: "#9d174d", bg: "#fdf2f8", border: "#fce7f3", label: "Children" },
};

function toast(msg: string) {
  const el = document.createElement("div");
  el.textContent = msg;
  Object.assign(el.style, {
    position: "fixed", bottom: "24px", left: "50%", transform: "translateX(-50%)",
    background: "#0f172a", color: "#fff", padding: "12px 24px", borderRadius: "12px",
    fontSize: "14px", fontWeight:600, zIndex:"9999", boxShadow:"0 10px 30px rgba(0,0,0,.3)",
    letterSpacing:".02em", transition:"opacity .3s", whiteSpace: "nowrap"
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity="0"; setTimeout(() => el.remove(), 300); }, 3000);
}

interface Props { verse: any; compact?: boolean; featured?: boolean; }

/* ── MAIN COMPONENT ── */
export default function VerseCard({ verse, compact = false, featured = false }: Props) {
  const [copied, setCopied]   = useState(false);
  const [shared, setShared]   = useState(false);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const cardRef   = useRef<HTMLDivElement>(null);

  const style = CAT[verse.category] ?? { color: "#1e293b", bg: "#f8fafc", border: "#f1f5f9", label: verse.category };
  const displayText = compact && verse.text.length > 220 ? verse.text.slice(0, 220) + "…" : verse.text;
  const isMobile = typeof navigator !== "undefined" && /iPhone|iPad|Android/i.test(navigator.userAgent);

  /* ── ACTIONS ── */
  const handleCopy = async () => {
    await navigator.clipboard.writeText(`"${verse.text}"\n\n— ${verse.reference}\n\ntwog.io/verse/${verse.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleShare = async () => {
    const url = `${typeof window !== "undefined" ? window.location.origin : "https://twog.io"}/verse/${verse.id}`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title: `${verse.reference} — TWOG`, text: verse.shareText, url }); return; } catch {}
    }
    await navigator.clipboard.writeText(url);
    setShared(true);
    setTimeout(() => setShared(false), 2200);
  };

  /* ── HELPER: DOWNLOAD FILE ── */
  const downloadCanvas = (canvas: HTMLCanvasElement, filename: string) => {
    const a = document.createElement("a");
    a.download = filename;
    a.href = canvas.toDataURL("image/png", 1.0);
    a.click();
  };

  /* ── CANVAS 1: THE QUOTE POSTER (Clean, High Quality) ── */
  const buildQuoteCanvas = (): HTMLCanvasElement => {
    const W = 1080, H = 1350; // Portrait 4:5 ratio
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // 1. Full Bleed Gradient Background (Using the category color)
    // We use the color as a base, fading to a slightly darker version for depth
    const grad = ctx.createLinearGradient(0, 0, 0, H);
    grad.addColorStop(0, style.color);
    grad.addColorStop(1, adjustColor(style.color, -40)); // Darker at bottom
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. Subtle Noise/Texture overlay for "High Quality" feel
    ctx.fillStyle = "rgba(255,255,255,0.05)";
    for(let i=0; i<W; i+=4) {
        for(let j=0; j<H; j+=4) {
            if(Math.random() > 0.5) ctx.fillRect(i,j,2,2);
        }
    }

    // 3. Category Badge (Top Center, minimal)
    ctx.fillStyle = "rgba(255,255,255,0.2)";
    ctx.beginPath();
    (ctx as any).roundRect(W/2 - 100, 60, 200, 40, 20);
    ctx.fill();
    
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 20px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(style.label.toUpperCase(), W/2, 87);

    // 4. The Quote (Big, Bold, White)
    ctx.fillStyle = "#ffffff";
    ctx.font = "italic 700 52px Georgia, serif"; // Large, impactful serif
    
    const words = verse.text.split(" ");
    let line = "", y = 250;
    const maxWidth = W - 100;
    const lineHeight = 72;
    const safeBottom = H - 150; // Stop early to leave room for ref/branding

    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), W/2, y);
        line = w + " "; y += lineHeight;
        if (y > safeBottom) { ctx.fillText("…", W/2, y); break; }
      } else { line = test; }
    }
    if (y <= safeBottom) ctx.fillText(line.trim(), W/2, y);

    // 5. Divider
    ctx.strokeStyle = "rgba(255,255,255,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(W/2 - 50, y + 40);
    ctx.lineTo(W/2 + 50, y + 40);
    ctx.stroke();

    // 6. Reference
    ctx.font = "600 32px Inter, sans-serif";
    ctx.fillText(verse.reference.toUpperCase(), W/2, y + 90);

    // 7. Minimal Branding (Bottom)
    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "500 24px Inter, sans-serif";
    ctx.fillText("TWOG.IO", W/2, H - 50);

    return canvas;
  };

  /* ── CANVAS 2: THE HOOK IMAGE (Preset Only, No Text) ── */
  const buildHookCanvas = async (): Promise<HTMLCanvasElement> => {
    const W = 1080, H = 1350;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // 1. Load Background Image
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = "/images/presetauto-image.jpg";

    await new Promise<void>((resolve) => {
        if (img.complete) resolve();
        else {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Continue even if missing (fallback color)
        }
    });

    // Draw Image (Cover Fit)
    if (img.complete) {
        const ratio = Math.max(W / img.width, H / img.height);
        const centerShift_x = (W - img.width * ratio) / 2;
        const centerShift_y = (H - img.height * ratio) / 2;
        ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
    } else {
        // Fallback if image missing
        ctx.fillStyle = "#111";
        ctx.fillRect(0,0,W,H);
    }

    // NO OVERLAYS, TEXT, OR ARROWS ADDED HERE

    return canvas;
  };

  /* ── DOWNLOAD LOGIC HANDLER ── */
  const handleDownloadOption = async (mode: 'single' | 'series') => {
    setShowDownloadModal(false);
    
    // 1. Always Generate the Quote Card
    const quoteCanvas = buildQuoteCanvas();
    
    if (mode === 'series') {
        // SERIES MODE: Download Hook + Quote
        toast("Generating your carousel...");
        const hookCanvas = await buildHookCanvas();
        
        // Trigger downloads
        downloadCanvas(hookCanvas, `TWOG-Hook-Slide.png`);
        setTimeout(() => {
            downloadCanvas(quoteCanvas, `TWOG-${verse.reference.replace(/[^a-zA-Z0-9]/g, '-')}.png`);
            toast("Downloaded 2 slides! Don't forget to tag @twogword");
        }, 500); // Slight delay to ensure naming order
    } else {
        // SINGLE MODE
        downloadCanvas(quoteCanvas, `TWOG-${verse.reference.replace(/[^a-zA-Z0-9]/g, '-')}.png`);
        toast("Image downloaded!");
    }
  };

  /* ── COLOR ADJUSTMENT HELPER (Darken) ── */
  function adjustColor(color: string, amount: number) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
  }

  /* ── RENDER ── */
  return (
    <article
      ref={cardRef}
      className="group relative flex flex-col rounded-3xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden bg-white"
      style={{ border: `1px solid ${style.border}` }}
    >
      {/* Top Accent Strip */}
      <div className="h-1.5 w-full" style={{ background: style.color }} />

      {/* Header */}
      <div className="flex items-center justify-between px-6 pt-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: style.color }} />
          <span className="text-[10px] font-black tracking-widest uppercase" style={{ color: style.color }}>
            {style.label}
          </span>
          <span className="text-[10px] font-bold text-black/30 uppercase tracking-tighter">
            {verse.subcategory}
          </span>
        </div>
        {featured && (
          <div className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded border border-amber-200">
             <span className="text-[9px] font-black text-amber-700 uppercase tracking-tighter">Premium Selection</span>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className={`px-6 ${compact ? "py-4" : "py-8"} relative`}>
        <Quote className="absolute top-4 left-4 opacity-[0.03] -z-0" size={120} style={{ color: style.color }} />
        
        <div className="relative z-10">
          <blockquote className="font-serif leading-[1.8] text-slate-800" style={{ fontSize: compact ? "17px" : "20px", fontWeight: 400 }}>
            <span className="text-4xl font-serif mr-1 opacity-20" style={{ color: style.color }}>“</span>
            {displayText}
            <span className="text-4xl font-serif ml-1 opacity-20" style={{ color: style.color }}>”</span>
          </blockquote>
          
          <div className="mt-6 flex items-center gap-4">
            <div className="h-[1px] w-8 bg-slate-200" />
            <Link href={`/verse/${verse.id}`} className="text-sm font-black tracking-tight hover:opacity-70 transition-opacity" style={{ color: style.color }}>
              {verse.reference}
            </Link>
          </div>
        </div>
      </div>

      {/* Context Drawer (UI only, not on downloaded image) */}
      {!compact && verse.context && (
        <div className="mx-6 mb-6 p-4 rounded-xl bg-slate-50 border border-slate-100">
          <h5 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">Historical Context</h5>
          <p className="text-xs leading-relaxed text-slate-500 italic">{verse.context}</p>
        </div>
      )}

      {/* Footer Actions */}
      <div className="mt-auto flex items-center justify-between px-4 py-4 bg-slate-50/80 backdrop-blur-sm border-t border-slate-100">
        <div className="flex items-center gap-1">
          <ActionButton onClick={handleCopy} icon={copied ? <Check size={14}/> : <Copy size={14}/>} label={copied ? "Copied" : "Copy"} active={copied} color={style.color} />
          <ActionButton onClick={handleShare} icon={<Share2 size={14}/>} label={shared ? "Link Copied" : "Share"} active={shared} color={style.color} />
          <ActionButton onClick={() => setShowDownloadModal(true)} icon={<ImageDown size={14}/>} label="Download" active={false} color={style.color} />
        </div>

        <Link href={`/verse/${verse.id}`} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter transition-all hover:shadow-lg active:scale-95 text-white" style={{ background: style.color }}>
          Explore <ExternalLink size={12} />
        </Link>
      </div>

      {/* DOWNLOAD MODAL */}
      {showDownloadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative">
            <button 
                onClick={() => setShowDownloadModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            >
                <X size={20} />
            </button>
            
            <div className="p-8">
                <h3 className="text-2xl font-black text-slate-900 mb-2">Create Post</h3>
                <p className="text-slate-500 mb-6 text-sm">Choose how you want to share this verse on social media.</p>

                <div className="space-y-3">
                    <button 
                        onClick={() => handleDownloadOption('single')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all group text-left"
                    >
                        <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:text-blue-600 group-hover:bg-white transition-colors">
                            <Download size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Single Image</div>
                            <div className="text-xs text-slate-500">Just the verse poster.</div>
                        </div>
                    </button>

                    <button 
                        onClick={() => handleDownloadOption('series')}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border-2 border-blue-600 bg-blue-50 shadow-md hover:shadow-lg transition-all group text-left relative overflow-hidden"
                    >
                        <div className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full">RECOMMENDED</div>
                        <div className="p-3 bg-blue-600 rounded-lg text-white">
                            <ImageDown size={24} />
                        </div>
                        <div>
                            <div className="font-bold text-slate-900">Carousel Series</div>
                            <div className="text-xs text-slate-600">Downloads a hook slide + the verse.</div>
                        </div>
                    </button>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 text-center">
                    <p className="text-xs font-bold text-blue-600">
                        Don't forget to tag us at <span className="underline">@twogword</span> on TikTok!
                    </p>
                </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

/* ── SUB-COMPONENT (Saves lines) ── */
interface ActionProps { onClick: () => void; icon: React.ReactNode; label: string; active: boolean; color: string; }
function ActionButton({ onClick, icon, label, active, color }: ActionProps) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-[11px] font-bold transition-all ${
        active ? "bg-slate-200 text-slate-800" : "text-slate-500 hover:bg-white hover:text-black hover:shadow-sm"
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}