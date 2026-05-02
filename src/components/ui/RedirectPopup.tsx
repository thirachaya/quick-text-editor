"use client";

import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faArrowRight, faXmark } from "@fortawesome/free-solid-svg-icons";

export default function RedirectPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#1F6F5F]/20 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white rounded-3xl shadow-[0_20px_50px_rgba(31,111,95,0.15)] w-full max-w-sm p-8 text-center border border-[#2FA084]/10 animate-in zoom-in-95 duration-300 relative">
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-5 right-5 text-gray-400 hover:text-[#1F6F5F] transition-colors"
        >
          <FontAwesomeIcon icon={faXmark} size="lg" />
        </button>

        <div className="w-20 h-20 bg-[#2FA084]/10 text-[#2FA084] rounded-2xl flex items-center justify-center mx-auto mb-6 transform">
          <FontAwesomeIcon icon={faBolt} className="text-4xl" />
        </div>

        <h2 className="text-2xl font-bold text-[#1F6F5F] mb-3">New Version Available!</h2>

        <div className="flex flex-col gap-3">
          <a
            href="https://blew-noxs-blog-editor.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-[#1F6F5F] text-white font-semibold rounded-2xl hover:bg-[#2FA084] transition-all shadow-[0_8px_20px_rgba(31,111,95,0.25)] hover:-translate-y-1"
            onClick={() => setIsOpen(false)}
          >
            Go to Full Site
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3 text-sm font-medium text-gray-400 hover:text-[#1F6F5F] transition-colors"
          >
            Continue with Demo
          </button>
        </div>
      </div>
    </div>
  );
}