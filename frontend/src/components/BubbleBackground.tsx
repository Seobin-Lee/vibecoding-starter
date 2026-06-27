"use client";

import { useEffect, useState, useRef, useCallback } from "react";

type Bubble = {
  id: string;
  x: number;
  y: number;
  size: number;
  animationClass: string;
  delay: string;
};

export default function BubbleBackground() {
  const [mouseBubbles, setMouseBubbles] = useState<Bubble[]>([]);
  const [bgBubbles, setBgBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const lastSpawnTime = useRef<number>(0);

  useEffect(() => {
    // Generate background bubbles on mount to avoid hydration mismatch
    const newBgBubbles: Bubble[] = [];
    const animations = ["animate-float-slow", "animate-float-medium", "animate-float-fast"];
    const wobbles = ["animate-wobble", ""];

    // Create 40 background bubbles spread across the screen
    for (let i = 0; i < 40; i++) {
      newBgBubbles.push({
        id: `bg-${i}`,
        x: Math.random() * 100, // horizontal %
        y: -20 + Math.random() * 50, // starting vertical offset
        size: 15 + Math.random() * 90, // size in px
        animationClass: `${animations[Math.floor(Math.random() * animations.length)]} ${wobbles[Math.floor(Math.random() * wobbles.length)]}`,
        delay: `${Math.random() * 8}s`,
      });
    }
    setBgBubbles(newBgBubbles);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const now = Date.now();
    // Throttle and random chance: don't spawn on EVERY cursor, just some (e.g. 250ms + 30% chance to spawn)
    if (now - lastSpawnTime.current < 200) return;
    if (Math.random() > 0.3) return; // 70% chance to skip creating a bubble
    lastSpawnTime.current = now;

    const id = `mouse-${now}-${Math.random()}`;
    const newBubble: Bubble = {
      id,
      x: e.clientX,
      y: e.clientY,
      size: 30 + Math.random() * 20, // medium sized bubbles for cursor
      animationClass: "animate-float-up animate-wobble",
      delay: "0s",
    };

    setMouseBubbles((prev) => [...prev, newBubble]);

    // Cleanup bubble after animation finishes (2 seconds)
    setTimeout(() => {
      setMouseBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 2000);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const popBubble = (id: string, isBg: boolean) => {
    setScore((s) => s + 1);
    
    // Play a tiny haptic feedback/sound if we wanted, but here we just pop it visually
    if (isBg) {
      setBgBubbles((prev) => prev.filter((b) => b.id !== id));
      
      // Respawn the popped bubble at the bottom so the game never ends
      setTimeout(() => {
        const animations = ["animate-float-slow", "animate-float-medium", "animate-float-fast"];
        const wobbles = ["animate-wobble", ""];
        setBgBubbles((prev) => [...prev, {
          id: `bg-${Date.now()}-${Math.random()}`,
          x: Math.random() * 100,
          y: -20, // start from bottom again
          size: 15 + Math.random() * 90,
          animationClass: `${animations[Math.floor(Math.random() * animations.length)]} ${wobbles[Math.floor(Math.random() * wobbles.length)]}`,
          delay: "0s",
        }]);
      }, 300);
    } else {
      setMouseBubbles((prev) => prev.filter((b) => b.id !== id));
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      
      {/* Score UI in Top Right */}
      <div className="absolute top-24 right-24 pointer-events-auto flex items-start gap-16 z-50">
        
        {/* Description & Character */}
        <div className="flex flex-col items-center gap-12 mt-12 animate-wobble" style={{ animationDuration: '4s' }}>
          <span className="text-body font-bold text-warm-ink bg-white/50 backdrop-blur-md px-16 py-8 rounded-full border border-white/60 shadow-[0_2px_8px_rgba(0,0,0,0.05)] whitespace-nowrap">
            비눗방울을 톡! 터트려봐 🦕
          </span>
          <img src="/images/bubble_bobble.png" alt="Bubble Bobble" className="w-[120px] h-[120px] object-contain drop-shadow-xl hover:scale-110 transition-transform cursor-pointer bubble" />
        </div>

        {/* Score Board */}
        <div className="bg-white/40 backdrop-blur-xl border border-white/60 shadow-[0_4px_16px_rgba(0,0,0,0.05),_inset_0_2px_8px_rgba(255,255,255,0.8)] px-32 py-16 rounded-[32px] flex flex-col items-center gap-4 hover:scale-105 transition-transform">
          <span className="font-tertiary-font font-medium text-mist-gray uppercase tracking-widest text-caption">Score</span>
          <span className="font-heading-font font-bold text-warm-ink text-display leading-none">{score}</span>
        </div>

      </div>

      {/* Static Background Bubbles */}
      {bgBubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id, true)}
          className={`absolute bottom-0 bubble ${b.animationClass} pointer-events-auto cursor-crosshair hover:bg-white/80 transition-colors`}
          style={{
            left: `${b.x}%`,
            width: `${b.size}px`,
            height: `${b.size}px`,
            marginBottom: `${b.y}%`,
            animationDelay: b.delay,
          }}
        />
      ))}

      {/* Interactive Cursor Bubbles */}
      {mouseBubbles.map((b) => (
        <div
          key={b.id}
          onClick={() => popBubble(b.id, false)}
          className={`fixed bubble ${b.animationClass} pointer-events-auto cursor-crosshair hover:bg-white/80 transition-colors`}
          style={{
            left: `${b.x}px`,
            top: `${b.y}px`,
            width: `${b.size}px`,
            height: `${b.size}px`,
          }}
        />
      ))}
    </div>
  );
}
