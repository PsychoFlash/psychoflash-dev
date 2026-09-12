/**
 * OrianElasticCard — Gamified Interactive Elastic Card Component
 * Powered by Orian Edelenyi's ActionScript Physics DNA & Stripe/Lusion Sheen
 * 
 * Features:
 * - Dynamic cursor pull with elastic spring return
 * - 3D Gyro / Perspective tilt based on spring delta
 * - Stripe & Lusion Chromatic Luminescence Sheen (--mouse-x, --mouse-y)
 * - Momentum drag & snap
 * - Tactile micro-vibrations
 */

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { playTactileSound } from "@/utils/tactileAudio";

interface OrianElasticCardProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
  enableDrag?: boolean;
  pullStrength?: number;
  tiltAngle?: number;
}

export default function OrianElasticCard({
  children,
  className = "",
  style = {},
  onClick,
  enableDrag = false,
  pullStrength = 18,
  tiltAngle = 8,
}: OrianElasticCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse offset motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Orian's calibrated spring physics: stiffness 185, damping 14.5, mass 0.85
  const springConfig = { stiffness: 185, damping: 14.5, mass: 0.85 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // Derive 3D rotation and displacement
  const rotateX = useTransform(springY, [-pullStrength, pullStrength], [tiltAngle, -tiltAngle]);
  const rotateY = useTransform(springX, [-pullStrength, pullStrength], [-tiltAngle, tiltAngle]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const dx = ((e.clientX - centerX) / (rect.width / 2)) * pullStrength;
    const dy = ((e.clientY - centerY) / (rect.height / 2)) * pullStrength;

    mouseX.set(dx);
    mouseY.set(dy);

    // Update CSS custom properties for specular border sheen (Stripe / Lusion)
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${px}px`);
    cardRef.current.style.setProperty("--mouse-y", `${py}px`);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    playTactileSound("fstop");
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        perspective: 1000,
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        ...style,
      }}
      whileTap={{ scale: 0.97 }}
      drag={enableDrag}
      dragConstraints={{ left: -30, right: 30, top: -30, bottom: 30 }}
      dragElastic={0.2}
      className={`elastic-card-sheen transition-shadow duration-300 ${isHovered ? "shadow-2xl" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
}
