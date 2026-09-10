/**
 * SynapticCanvas — The Neural Network Background
 *
 * A high-performance canvas-based neural mesh that:
 * - Renders force-directed nodes connected by animated synaptic paths
 * - Fires electrical pulses (action potentials) along connections
 * - Responds to mouse proximity (nodes attract)
 * - Reacts to glowIntensity from the NeuroMind engine
 * - 60fps via requestAnimationFrame with throttled redraws
 */

import { useEffect, useRef, useCallback } from "react";
import { useNeuro } from "@/hooks/NeuroContext";

interface Node {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  mass: number;
  hue: number; // 0=gold, 1=burgundy
  label?: string;
  active: boolean;
}

interface Connection {
  a: number;
  b: number;
  strength: number; // 0-1
  pulses: Pulse[];
}

interface Pulse {
  t: number;      // [0, 1] progress along connection
  speed: number;
  opacity: number;
  direction: 1 | -1;
}

const NODE_LABELS = [
  "BROADCAST", "AI", "4K", "LIVE",
  "EVENTS", "POST", "STREAM", "VFX",
  "HYBRID", "COLOR", "MOTION", "",
  "", "", "", "",
];

function randBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

export default function SynapticCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { state } = useNeuro();
  const neuroRef = useRef(state);
  neuroRef.current = state;

  const rafRef = useRef(0);
  const nodesRef = useRef<Node[]>([]);
  const connectionsRef = useRef<Connection[]>([]);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);

  // Initialize nodes
  const initNetwork = useCallback((w: number, h: number) => {
    const count = Math.min(22, Math.floor((w * h) / 38000));
    const nodes: Node[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: randBetween(w * 0.05, w * 0.95),
      y: randBetween(h * 0.05, h * 0.95),
      vx: randBetween(-0.08, 0.08),
      vy: randBetween(-0.06, 0.06),
      radius: randBetween(2, 4.5),
      mass: randBetween(0.6, 1.4),
      hue: Math.random(),
      label: NODE_LABELS[i] ?? "",
      active: true,
    }));

    // Connect nodes within range
    const connections: Connection[] = [];
    const maxDist = Math.min(w, h) * 0.38;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist) {
          connections.push({
            a: i,
            b: j,
            strength: 1 - dist / maxDist,
            pulses: [],
          });
        }
      }
    }

    nodesRef.current = nodes;
    connectionsRef.current = connections;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight || window.innerHeight;
      initNetwork(canvas.width, canvas.height);
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [initNetwork]);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY + window.scrollY };
    };
    window.addEventListener("mousemove", handleMouse, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastPulseTime = 0;

    const draw = (ts: number) => {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
      const w = canvas.width;
      const h = canvas.height;
      const neuro = neuroRef.current;
      const glow = neuro.glowIntensity;
      const nodes = nodesRef.current;
      const conns = connectionsRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      // Spawn pulses periodically, rate driven by glow
      const pulseInterval = Math.max(300, 1500 - glow * 1200);
      if (ts - lastPulseTime > pulseInterval && conns.length > 0) {
        const connIdx = Math.floor(Math.random() * conns.length);
        conns[connIdx].pulses.push({
          t: 0,
          speed: randBetween(0.003, 0.008),
          opacity: randBetween(0.6, 1.0),
          direction: Math.random() > 0.5 ? 1 : -1,
        });
        // Sometimes fire multiple
        if (glow > 0.5) {
          const c2 = Math.floor(Math.random() * conns.length);
          conns[c2].pulses.push({
            t: 0,
            speed: randBetween(0.004, 0.009),
            opacity: randBetween(0.5, 0.9),
            direction: 1,
          });
        }
        lastPulseTime = ts;
      }

      // Update & draw connections
      for (const conn of conns) {
        const na = nodes[conn.a];
        const nb = nodes[conn.b];
        if (!na || !nb) continue;

        // Synaptic path
        const alpha = Math.max(0.03, conn.strength * 0.12 + glow * 0.06);
        const lineWidth = 0.4 + conn.strength * 0.6;

        // Gold to wine gradient along connection
        const grad = ctx.createLinearGradient(na.x, na.y, nb.x, nb.y);
        grad.addColorStop(0, `hsla(36, 70%, 48%, ${alpha})`);
        grad.addColorStop(0.5, `hsla(350, 55%, 35%, ${alpha * 0.7})`);
        grad.addColorStop(1, `hsla(36, 70%, 48%, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        // Gentle bezier curve
        const cx = (na.x + nb.x) / 2 + (nb.y - na.y) * 0.05;
        const cy = (na.y + nb.y) / 2 + (nb.x - na.x) * 0.05;
        ctx.quadraticCurveTo(cx, cy, nb.x, nb.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = lineWidth;
        ctx.stroke();

        // Draw & advance pulses
        conn.pulses = conn.pulses.filter((p) => {
          const pos = p.direction === 1 ? p.t : 1 - p.t;
          // Interpolate position along quadratic curve
          const bx = (1 - pos) * (1 - pos) * na.x + 2 * (1 - pos) * pos * cx + pos * pos * nb.x;
          const by = (1 - pos) * (1 - pos) * na.y + 2 * (1 - pos) * pos * cy + pos * pos * nb.y;

          // Pulse glow
          const pulseGrad = ctx.createRadialGradient(bx, by, 0, bx, by, 6 + glow * 4);
          pulseGrad.addColorStop(0, `hsla(36, 95%, 70%, ${p.opacity})`);
          pulseGrad.addColorStop(0.4, `hsla(36, 80%, 55%, ${p.opacity * 0.4})`);
          pulseGrad.addColorStop(1, `hsla(36, 60%, 40%, 0)`);

          ctx.beginPath();
          ctx.arc(bx, by, 6 + glow * 4, 0, Math.PI * 2);
          ctx.fillStyle = pulseGrad;
          ctx.fill();

          p.t += p.speed;
          return p.t < 1;
        });
      }

      // Update & draw nodes
      for (const node of nodes) {
        // Drift
        node.x += node.vx;
        node.y += node.vy;

        // Gentle random walk
        node.vx += randBetween(-0.002, 0.002);
        node.vy += randBetween(-0.002, 0.002);
        // Damping
        node.vx *= 0.995;
        node.vy *= 0.995;
        // Speed cap
        const spd = Math.sqrt(node.vx * node.vx + node.vy * node.vy);
        if (spd > 0.15) {
          node.vx = (node.vx / spd) * 0.15;
          node.vy = (node.vy / spd) * 0.15;
        }

        // Bounce walls with margin
        const margin = 40;
        if (node.x < margin) { node.x = margin; node.vx = Math.abs(node.vx); }
        if (node.x > w - margin) { node.x = w - margin; node.vx = -Math.abs(node.vx); }
        if (node.y < margin) { node.y = margin; node.vy = Math.abs(node.vy); }
        if (node.y > h - margin) { node.y = h - margin; node.vy = -Math.abs(node.vy); }

        // Mouse attraction (adjusted for scroll)
        const scrolledMouseY = mouse.y;
        const mdx = scrolledMouseY === -9999 ? 0 : mouse.x - node.x;
        const mdy = scrolledMouseY === -9999 ? 0 : scrolledMouseY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        const attractRadius = 180;
        if (mDist < attractRadius && mDist > 10) {
          const force = (1 - mDist / attractRadius) * 0.012;
          node.vx += mdx / mDist * force;
          node.vy += mdy / mDist * force;
        }

        // Pulsing glow node
        const pulse = (Math.sin(t * 1.2 + node.id * 0.8) + 1) * 0.5;
        const nodeAlpha = 0.3 + pulse * 0.2 + glow * 0.25;
        const nodeRadius = node.radius + pulse * 0.8 + glow * 1.5;

        // Outer glow
        const nodeGrad = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, nodeRadius * 3.5
        );
        const goldAlpha = nodeAlpha;
        nodeGrad.addColorStop(0, `hsla(36, 90%, 62%, ${goldAlpha})`);
        nodeGrad.addColorStop(0.5, `hsla(36, 70%, 48%, ${goldAlpha * 0.3})`);
        nodeGrad.addColorStop(1, `hsla(350, 55%, 20%, 0)`);

        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = nodeGrad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(36, 95%, 70%, ${nodeAlpha + 0.2})`;
        ctx.fill();

        // Label (only for labeled nodes, show on hover proximity)
        if (node.label && mDist < 120) {
          const labelOpacity = Math.max(0, 1 - mDist / 120) * 0.7;
          ctx.font = `600 7px 'Orbitron', monospace`;
          ctx.fillStyle = `hsla(36, 80%, 70%, ${labelOpacity})`;
          ctx.textAlign = "center";
          ctx.fillText(node.label, node.x, node.y - nodeRadius - 5);
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.55, mixBlendMode: "screen" }}
      aria-hidden
    />
  );
}
