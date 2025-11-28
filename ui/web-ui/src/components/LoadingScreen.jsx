import React, { useEffect, useState } from "react";
import Logo from "../assets/logo.png";

export default function LoadingScreen({ onFinish, duration = 3000 }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => {
      setShow(false);
      if (onFinish) onFinish();
    }, duration);

    return () => clearTimeout(t);
  }, [duration, onFinish]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Full-screen logo background */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover"
        style={{ backgroundImage: `url(${Logo})` }}
      ></div>

      {/* Overlay with text */}
      <div className="relative flex flex-col items-center justify-center text-center">
        <h1 className="text-black text-5xl font-extrabold drop-shadow-lg animate-fade-in-up">
          {/* LinguaOffline AI */}
        </h1>
        <p className="text-black/70 text-lg mt-2 animate-fade-in-up animate-delay-200">
          {/* Multilingual Offline Translator */}
        </p>

        {/* Loading dots */}
        <div className="flex space-x-2 mt-6">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-150"></span>
          <span className="w-3 h-3 bg-white rounded-full animate-bounce animation-delay-300"></span>
        </div>
      </div>
    </div>
  );
}
