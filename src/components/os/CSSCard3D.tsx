'use client';

import React, { useRef, useState } from 'react';

export default function CSSCard3D() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Smooth tilt angles
    const rotateX = -((y - centerY) / centerY) * 16;
    const rotateY = ((x - centerX) / centerX) * 18;

    setRotate({ x: rotateX, y: rotateY });
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative z-0 w-full h-full flex justify-center items-center cursor-default [perspective:1000px]"
    >
      <div
        ref={cardRef}
        style={{
          transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          transition: 'transform 0.12s ease-out',
        }}
        className="relative w-64 h-[358px] rounded-2xl shadow-2xl overflow-hidden border border-white/20 select-none group [transform-style:preserve-3d]"
      >
        {/* Card Image */}
        <img
          src="/lanyard-card.webp"
          alt="ID Card"
          className="w-full h-full object-cover rounded-2xl pointer-events-none"
        />

        {/* Dynamic Specular Glare Reflection */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-200 rounded-2xl"
          style={{
            background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0.05) 50%, transparent 80%)`,
            opacity: glare.opacity,
          }}
        />

        {/* Gloss Edge Border */}
        <div className="absolute inset-0 rounded-2xl border border-white/10 pointer-events-none" />

        {/* Ambient Drop Shadow */}
        <div className="absolute -bottom-6 left-4 right-4 h-6 bg-black/50 blur-xl -z-10 rounded-full" />
      </div>
    </div>
  );
}
