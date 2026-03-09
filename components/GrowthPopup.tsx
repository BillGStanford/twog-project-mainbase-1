"use client";
import { useState, useEffect } from "react";
import { X, Heart } from "lucide-react";

export default function GrowthPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already seen this
    const hasSeenPopup = localStorage.getItem("twog_growth_popup_seen");
    
    if (!hasSeenPopup) {
      // Small delay so it doesn't hit them the microsecond the page loads
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const closePopup = () => {
    setIsVisible(false);
    localStorage.setItem("twog_growth_popup_seen", "true");
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 bg-[#0a192f]/80 backdrop-blur-sm animate-in fade-in duration-500">
      <div className="relative max-w-lg w-full bg-white rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#D4AF37]">
        {/* Close Button */}
        <button 
          onClick={closePopup}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-8 md:p-10">
          {/* Letter Header */}
          <div className="flex items-center gap-2 mb-6 text-[#D4AF37]">
            <Heart size={18} fill="currentColor" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Community Update</span>
          </div>

          {/* Letter Content */}
          <div className="space-y-4 font-serif text-slate-800 leading-relaxed">
            <h2 className="text-2xl font-bold font-sans text-[#0a192f] leading-tight">
              A quick thank you...
            </h2>
            
            <p className="text-[15px]">
              I wanted to take a second to personally thank you for being here. 
              When I started building <span className="font-bold">TWOG</span>, I didn't expect much.
            </p>

            <p className="text-[15px]">
              But in just the past few weeks, this platform has grown faster than I ever imagined. 
              Today, we officially passed <span className="text-[#D4AF37] font-bold">20,000 active members</span>.
            </p>

            <p className="text-[15px]">
              Seeing so many people dedicated to uncovering and sharing the unedited truth is exactly why 
              this archive exists. Thank you for making this community what it is.
            </p>

            <div className="pt-4">
              <p className="text-sm font-bold font-sans text-slate-500 uppercase tracking-tighter">— The TWOG Team Lead Developer, Steve</p>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={closePopup}
            className="mt-8 w-full bg-[#0a192f] text-white font-bold py-4 rounded-xl hover:bg-[#D4AF37] hover:text-[#0a192f] transition-all press"
          >
            Back to the Archive
          </button>
        </div>
      </div>
    </div>
  );
}