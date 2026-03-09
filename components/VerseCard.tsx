"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { Copy, Check, Share2, ExternalLink, ImageDown, Quote } from "lucide-react";

/* ── DESIGN TOKENS ── */
const CAT: Record<string, { color: string; bg: string; border: string; label: string }> = {
  violence:      { color: "#991b1b", bg: "#fef2f2", border: "#7a7a7a", label: "Violence & Genocide" },
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
    background: "#0f172a", color: "#fff", padding: "10px 20px", borderRadius: "10px",
    fontSize: "13px", fontWeight:600, zIndex:"9999", boxShadow:"0 4px 20px rgba(0,0,0,.25)",
    letterSpacing:".02em", transition:"opacity .3s",
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity="0"; setTimeout(() => el.remove(), 300); }, 2200);
}

interface Props { verse: any; compact?: boolean; featured?: boolean; }

/* ── MAIN COMPONENT ── */
export default function VerseCard({ verse, compact = false, featured = false }: Props) {
  const [copied, setCopied]   = useState(false);
  const [shared, setShared]   = useState(false);
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

  /* ── CANVAS BUILDER (Aesthetic Social Media Design) ── */
  const buildCanvas = (): HTMLCanvasElement => {
    const W = 1080, H = 1080;
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d")!;

    // 1. Background: Subtle Gradient based on category
    // We make the background very light version of the category color
    const grad = ctx.createLinearGradient(0, 0, W, H);
    grad.addColorStop(0, "#ffffff");
    grad.addColorStop(1, style.bg); // Fades into the category's light bg color
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);

    // 2. Decorative background elements (Subtle circles)
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.fillStyle = style.color;
    ctx.beginPath();
    ctx.arc(W * 0.1, H * 0.1, 300, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(W * 0.9, H * 0.9, 400, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // 3. Top Branding
    ctx.fillStyle = "#94a3b8"; // Muted slate
    ctx.font = "600 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("THE WORD OF GOD", W / 2, 60);

    // 4. Main Floating Card
    const cardPadding = 60;
    const cardW = W - (cardPadding * 2);
    const cardH = H - 180; // Leave room for top/bottom branding
    const cardX = cardPadding;
    const cardY = 90;

    // Drop Shadow
    ctx.shadowColor = "rgba(0, 0, 0, 0.08)";
    ctx.shadowBlur = 40;
    ctx.shadowOffsetY = 20;

    // Card Body (White)
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    (ctx as any).roundRect(cardX, cardY, cardW, cardH, 40);
    ctx.fill();

    // Reset Shadow for inner content
    ctx.shadowColor = "transparent";
    ctx.shadowBlur = 0;
    ctx.shadowOffsetY = 0;

    // 5. Card Accent Line (Top)
    ctx.fillStyle = style.color;
    ctx.beginPath();
    (ctx as any).roundRect(cardX, cardY, cardW, 12, { topLeft: 40, topRight: 40, bottomLeft: 0, bottomRight: 0 });
    ctx.fill();

    // 6. Category Label (Inside Card, Top)
    ctx.fillStyle = "#cbd5e1"; // Light grey text
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(style.label.toUpperCase(), W / 2, cardY + 60);

    // 7. The Quote
    ctx.textAlign = "left";
    ctx.fillStyle = "#1e293b"; // Dark slate for text
    ctx.font = "italic 400 46px Georgia, serif"; // Elegant Serif
    
    // Text Wrapping Logic
    const words = verse.text.split(" ");
    let line = "";
    const maxWidth = cardW - 100; // Side padding
    let y = cardY + 160; // Start text lower
    const lineHeight = 68;
    const maxY = cardY + cardH - 140; // Stop before footer

    for (const w of words) {
      const test = line + w + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), cardX + 50, y);
        line = w + " "; 
        y += lineHeight;
        if (y > maxY) {
           ctx.fillText("…", cardX + 50, y); break; 
        }
      } else { line = test; }
    }
    if (y <= maxY) ctx.fillText(line.trim(), cardX + 50, y);

    // 8. Divider Line
    ctx.strokeStyle = "#f1f5f9";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cardX + 50, cardY + cardH - 90);
    ctx.lineTo(cardX + cardW - 50, cardY + cardH - 90);
    ctx.stroke();

    // 9. Reference (Bottom of Card)
    ctx.textAlign = "center";
    ctx.fillStyle = style.color;
    ctx.font = "bold 32px Inter, sans-serif";
    ctx.fillText(verse.reference.toUpperCase(), W / 2, cardY + cardH - 40);

    // 10. Bottom Branding (Outside Card)
    ctx.fillStyle = "#64748b";
    ctx.font = "500 20px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("twog.io", W / 2, H - 40);

    return canvas;
  };

  /* ── DOWNLOAD / SAVE LOGIC ── */
  const handleCardAction = () => {
    const canvas = buildCanvas();

    if (isMobile) {
      canvas.toBlob(blob => {
        if (!blob) return;
        const file = new File([blob], `twog-${verse.id}.png`, { type: "image/png" });
        
        if (navigator.canShare?.({ files: [file] })) {
          navigator.share({ files: [file], title: verse.reference, text: verse.shareText })
            .catch(() => {});
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const win = window.open(url, "_blank");
        if (win) toast("Long-press the image to Save");
        else {
          const a = document.createElement("a");
          a.href = url; a.download = `twog-${verse.id}.png`; a.click();
        }
      }, "image/png", 0.95);
    } else {
      const a = document.createElement("a");
      a.download = `twog-${verse.id}.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
      toast("Card downloaded!");
    }
  };

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

      {/* Context Drawer */}
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
          <ActionButton onClick={handleCardAction} icon={<ImageDown size={14}/>} label="Download Card" active={false} color={style.color} />
        </div>

        <Link href={`/verse/${verse.id}`} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-black uppercase tracking-tighter transition-all hover:shadow-lg active:scale-95 text-white" style={{ background: style.color }}>
          Explore <ExternalLink size={12} />
        </Link>
      </div>
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