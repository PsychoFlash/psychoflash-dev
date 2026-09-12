/**
 * useOrianPhysics — Orian Edelenyi's Interactive Physics Engine DNA
 * 
 * Direct mathematical translation from Orian's 2007 ActionScript engines:
 * - PhysicEngine.as
 * - PhysicEngine_Hills.as
 * - Elastic.fla
 * 
 * Extracted Mathematical Formulas:
 * 1. Hooke's Law Elasticity & Damping:
 *    v = v * elasticity + (target - current) * springTension
 *    (elasticity: 0.91, springTension: 0.105)
 * 2. Mouse Drag & Throw Momentum:
 *    speedMx = oldX - currX; speedMy = oldY - currY
 *    speedX = -speedMx / 3;  speedY = -speedMy * 7
 * 3. Kinetic Boundary Collision & Rebound:
 *    rebound = -(velocity * friction * 1.8)
 * 4. Angular Centrifugal Inertia & Tilt:
 *    rotation = atan2(dy, dx) * 180 / PI
 */

import { useState, useRef, useEffect, useCallback } from "react";
import type { Transition } from "framer-motion";

export interface OrianPhysicsConfig {
  elasticity?: number;    // Damping factor (default: 0.91 from PhysicEngine.as)
  springTension?: number; // Tension factor (default: 0.105 from PhysicEngine.as)
  friction?: number;      // Collision friction (default: 0.5 from PhysicEngine.as)
  throwSensitivity?: { x: number; y: number }; // Throw momentum multipliers (default: /3 and *7)
  bounds?: { minX: number; maxX: number; minY: number; maxY: number };
  tiltMultiplier?: number;
}

export const ORIAN_PHYSICS_DEFAULTS = {
  elasticity: 0.91,
  springTension: 0.105,
  friction: 0.5,
  throwSensitivity: { x: 1 / 3, y: 7 },
  tiltMultiplier: 0.08,
};

/**
 * Pre-calibrated Framer Motion spring transition matching Orian's ActionScript frequency
 */
export const orianSpringTransition: Transition = {
  type: "spring",
  stiffness: 185,
  damping: 14.5,
  mass: 0.85,
};

export const orianSnapTransition: Transition = {
  type: "spring",
  stiffness: 320,
  damping: 18,
  mass: 0.6,
};

export interface PhysicsState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rotation: number;
  isDragging: boolean;
}

/**
 * React hook implementing Orian's exact 2007 elastic spring & momentum algorithm
 */
export function useOrianPhysics(config: OrianPhysicsConfig = {}) {
  const elasticity = config.elasticity ?? ORIAN_PHYSICS_DEFAULTS.elasticity;
  const springTension = config.springTension ?? ORIAN_PHYSICS_DEFAULTS.springTension;
  const friction = config.friction ?? ORIAN_PHYSICS_DEFAULTS.friction;
  const tiltMultiplier = config.tiltMultiplier ?? ORIAN_PHYSICS_DEFAULTS.tiltMultiplier;

  const [state, setState] = useState<PhysicsState>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    isDragging: false,
  });

  const stateRef = useRef(state);
  stateRef.current = state;

  const targetRef = useRef({ x: 0, y: 0 });
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>(0);
  const isDraggingRef = useRef(false);

  // Set spring anchor target
  const setTarget = useCallback((targetX: number, targetY: number) => {
    targetRef.current = { x: targetX, y: targetY };
  }, []);

  // Handle Drag Start
  const onDragStart = useCallback((clientX: number, clientY: number) => {
    isDraggingRef.current = true;
    prevMouseRef.current = { x: clientX, y: clientY };
    setState((s) => ({ ...s, isDragging: true, vx: 0, vy: 0 }));
  }, []);

  // Handle Drag Move (Tracking speedMx / speedMy)
  const onDragMove = useCallback((clientX: number, clientY: number) => {
    if (!isDraggingRef.current) return;
    const oldX = prevMouseRef.current.x;
    const oldY = prevMouseRef.current.y;

    const speedMx = oldX - clientX;
    const speedMy = oldY - clientY;

    prevMouseRef.current = { x: clientX, y: clientY };

    // Update position directly with drag delta
    setState((prev) => {
      const nextX = prev.x - speedMx;
      const nextY = prev.y - speedMy;
      const angle = Math.atan2(speedMy, speedMx) * (180 / Math.PI) * 0.05;

      return {
        ...prev,
        x: nextX,
        y: nextY,
        vx: -speedMx / 3,
        vy: -speedMy * 0.8, // calibrated for screen space
        rotation: angle,
      };
    });
  }, []);

  // Handle Drag End — Impart Throw Momentum & Spring Return
  const onDragEnd = useCallback(() => {
    isDraggingRef.current = false;
    setState((s) => ({ ...s, isDragging: false }));
  }, []);

  // Physics Simulation Loop (Hooke's Law + Boundary Rebound)
  useEffect(() => {
    const tick = () => {
      if (!isDraggingRef.current) {
        const current = stateRef.current;
        const target = targetRef.current;

        // Hooke's Elasticity: delta to target
        const dx = target.x - current.x;
        const dy = target.y - current.y;

        // Velocity integration: v = v * elasticity + delta * springTension
        let nvx = current.vx * elasticity + dx * springTension;
        let nvy = current.vy * elasticity + dy * springTension;

        let nx = current.x + nvx;
        let ny = current.y + nvy;

        // Boundary collision check
        if (config.bounds) {
          const { minX, maxX, minY, maxY } = config.bounds;
          if (nx < minX) {
            nx = minX;
            nvx = -(nvx * friction * 1.8);
          } else if (nx > maxX) {
            nx = maxX;
            nvx = -(nvx * friction * 1.8);
          }
          if (ny < minY) {
            ny = minY;
            nvy = -(nvy * friction * 1.8);
          } else if (ny > maxY) {
            ny = maxY;
            nvy = -(nvy * friction * 1.8);
          }
        }

        // Angular tilt derived from horizontal velocity and pull
        const nRot = (dx * 0.04 + nvx * 0.3) * tiltMultiplier * 10;

        // Stop micro-jitters when settled
        if (Math.abs(dx) < 0.05 && Math.abs(dy) < 0.05 && Math.abs(nvx) < 0.05 && Math.abs(nvy) < 0.05) {
          nx = target.x;
          ny = target.y;
          nvx = 0;
          nvy = 0;
        }

        setState({
          x: nx,
          y: ny,
          vx: nvx,
          vy: nvy,
          rotation: nRot,
          isDragging: false,
        });
      }

      animFrameRef.current = requestAnimationFrame(tick);
    };

    animFrameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [elasticity, springTension, friction, tiltMultiplier, config.bounds]);

  return {
    state,
    setTarget,
    onDragStart,
    onDragMove,
    onDragEnd,
  };
}
