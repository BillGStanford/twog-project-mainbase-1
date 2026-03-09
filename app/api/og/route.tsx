import { ImageResponse } from "next/og";
import { getVerseById, getCategoryMeta } from "@/data/verses";

export const runtime = "edge";

const CAT_COLOR: Record<string,string> = {
  violence:"#dc2626", slavery:"#ea580c", women:"#7c3aed",
  punishment:"#d97706", contradictions:"#1d4ed8", children:"#be185d",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id  = searchParams.get("id");
  const cat = searchParams.get("cat");

  const verse    = id  ? getVerseById(id)     : null;
  const catMeta  = cat ? getCategoryMeta(cat) : verse ? getCategoryMeta(verse.category) : null;
  const color    = CAT_COLOR[verse?.category ?? cat ?? ""] ?? "#1a7abf";
  const catLabel = catMeta?.label ?? "The Word of God";

  const text = verse
    ? (verse.text.length > 280 ? verse.text.slice(0, 280) + "…" : verse.text)
    : "Everything God Says in the Bible.";
  const ref  = verse?.reference ?? "twog.io";

  return new ImageResponse(
    (
      <div style={{
        width:"100%", height:"100%", display:"flex", flexDirection:"column",
        background:"linear-gradient(160deg,#d6eaf8 0%,#f7f9fc 100%)",
        padding:"0", fontFamily:"serif", position:"relative", overflow:"hidden",
      }}>
        {/* Sunrays */}
        <div style={{
          position:"absolute", top:"-20%", right:"-10%", width:"140%", height:"140%",
          background:"repeating-conic-gradient(rgba(255,255,255,.6) 0deg 4deg, rgba(214,234,248,.5) 4deg 8deg)",
          opacity:.5,
        }}/>

        {/* Top navy bar */}
        <div style={{ background:"#0f5a8a", padding:"16px 56px", display:"flex", alignItems:"center", justifyContent:"space-between", position:"relative", zIndex:1 }}>
          <span style={{ fontFamily:"Impact,sans-serif", fontSize:"44px", color:"#f0b429", letterSpacing:".04em", lineHeight:1 }}>TWOG</span>
          <span style={{ fontSize:"16px", color:"rgba(255,255,255,.6)", fontFamily:"sans-serif" }}>twog.io — The Word of God</span>
        </div>
        {/* Gold rule */}
        <div style={{ height:"6px", background:"#f0b429", position:"relative", zIndex:1 }}/>

        {/* Body */}
        <div style={{ flex:1, padding:"44px 56px 32px", display:"flex", flexDirection:"column", position:"relative", zIndex:1 }}>
          {/* Category pill */}
          <div style={{ display:"inline-flex", alignItems:"center", marginBottom:"20px", background:color+"18", border:`2px solid ${color}44`, borderRadius:"100px", padding:"8px 22px", width:"fit-content" }}>
            <span style={{ fontSize:"14px", fontWeight:700, letterSpacing:".1em", textTransform:"uppercase", color, fontFamily:"sans-serif" }}>
              {catLabel}
            </span>
          </div>

          {/* Quote mark */}
          <div style={{ fontSize:"90px", lineHeight:1, color:color, opacity:.18, marginBottom:"-10px", fontFamily:"Georgia,serif" }}>"</div>

          {/* Verse text */}
          <div style={{ fontSize:"34px", lineHeight:1.45, color:"#0d1b2a", fontStyle:"italic", flex:1, maxWidth:"1060px", fontFamily:"Georgia,serif" }}>
            {text}
          </div>

          {/* Reference */}
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", marginTop:"24px", paddingTop:"20px", borderTop:`2px solid ${color}33` }}>
            <span style={{ fontSize:"26px", fontWeight:700, color, fontFamily:"sans-serif" }}>— {ref}</span>
          </div>
        </div>

        {/* Gold footer */}
        <div style={{ background:"#f0b429", padding:"12px 56px", display:"flex", alignItems:"center", position:"relative", zIndex:1 }}>
          <span style={{ fontSize:"14px", fontWeight:600, color:"#0f5a8a", fontFamily:"sans-serif", letterSpacing:".04em" }}>
            THE WORD OF GOD — UNEDITED, UNCHOSEN, UNCENSORED
          </span>
        </div>
      </div>
    ),
    { width:1200, height:630 }
  );
}
