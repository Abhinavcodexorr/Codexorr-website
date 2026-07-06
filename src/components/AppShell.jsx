import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  motion, useScroll, useTransform, useSpring, useInView,
  AnimatePresence, useReducedMotion, useMotionValue, animate,
  useVelocity, useAnimationFrame, wrap,
} from "framer-motion";
import * as THREE from "three";
import {
  NAV, ROLES, HERO_BULLETS, STATS, SOLUTIONS, SERVICES, INDUSTRIES,
  WHY, AWARDS, RESOURCES, FOOTER, OFFICES,
} from "../data/content";
import { CASES, TESTIMONIALS, FAQ } from "../data/cases";

const PATH_TO_PAGE = {
  "/": "home",
  "/solutions": "solutions",
  "/services": "services",
  "/portfolio": "portfolio",
  "/industries": "industries",
  "/about": "about",
  "/resources": "resources",
  "/contact": "contact",
};

const C = {
  bg: "#FBFBFF", bg2: "#F3F4FC", surface: "#FFFFFF", ink: "#0B0B1A",
  muted: "#5E5E7A", line: "rgba(12,12,40,0.08)", plasma: "#6C47FF",
  arc: "#00B4D8", violet: "#8B5CF6", ember: "#FF4D6D",
};
const EASE = [0.22, 1, 0.36, 1];
const grad = "linear-gradient(120deg, " + C.plasma + ", " + C.arc + ")";

/* ===================== AMBIENT CANVAS (network + falling stars + shooting stars) ===================== */
function NetworkCanvas() {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const canvas = ref.current; if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t0 = performance.now(), shootTimer = null;
    let pts = [], sparks = [], shoots = [];
    const resize = () => {
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const mkSpark = (atTop) => ({
      x: Math.random() * w, y: atTop ? -20 : Math.random() * h,
      speed: 0.35 + Math.random() * 1.0, phase: Math.random() * Math.PI * 2,
      swayAmp: 8 + Math.random() * 26, swaySpeed: 0.4 + Math.random() * 0.7,
      size: Math.random() * 1.8 + 0.7, hue: Math.random() < 0.5 ? "108,71,255" : "0,180,216",
      star: Math.random() < 0.28,
    });
    const init = () => {
      const n = Math.max(22, Math.min(64, Math.floor((w * h) / 26000)));
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28,
        r: Math.random() * 1.6 + 0.8,
      }));
      const sn = Math.max(34, Math.min(110, Math.floor((w * h) / 14000)));
      sparks = Array.from({ length: sn }, () => mkSpark(false));
    };
    const drawStar = (x, y, r) => {
      const sp = 4; let rot = -Math.PI / 2; const inner = r * 0.45;
      ctx.beginPath(); ctx.moveTo(x + Math.cos(rot) * r, y + Math.sin(rot) * r);
      for (let i = 0; i < sp; i++) {
        rot += Math.PI / sp; ctx.lineTo(x + Math.cos(rot) * inner, y + Math.sin(rot) * inner);
        rot += Math.PI / sp; ctx.lineTo(x + Math.cos(rot) * r, y + Math.sin(rot) * r);
      }
      ctx.closePath(); ctx.fill();
    };
    const spawnShoot = () => {
      shoots.push({ x: Math.random() * w * 0.85, y: Math.random() * h * 0.35,
        vx: 6 + Math.random() * 5, vy: 3.5 + Math.random() * 3, life: 1, len: 90 + Math.random() * 120 });
    };
    const frame = (now) => {
      const t = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);
      // drifting network
      for (const p of pts) { p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1; }
      const L = 150;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i], b = pts[j], dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < L) { const k = 1 - d / L; ctx.strokeStyle = "rgba(108,71,255," + (k * 0.14).toFixed(3) + ")"; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
        }
      }
      for (const p of pts) { ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fillStyle = "rgba(108,71,255,0.3)"; ctx.fill(); }
      // falling sparkles with wave sway
      for (const s of sparks) {
        s.y += s.speed;
        if (s.y > h + 20) { s.y = -20; s.x = Math.random() * w; }
        const x = s.x + Math.sin(t * s.swaySpeed + s.phase) * s.swayAmp;
        const a = 0.35 + 0.4 * (0.5 + 0.5 * Math.sin(t * 2 + s.phase));
        ctx.globalAlpha = a; ctx.fillStyle = "rgb(" + s.hue + ")";
        if (s.star) drawStar(x, s.y, s.size * 1.7);
        else { ctx.beginPath(); ctx.arc(x, s.y, s.size, 0, Math.PI * 2); ctx.fill(); }
      }
      ctx.globalAlpha = 1;
      // shooting stars
      for (let i = shoots.length - 1; i >= 0; i--) {
        const sh = shoots[i]; sh.x += sh.vx; sh.y += sh.vy; sh.life -= 0.012;
        if (sh.life <= 0 || sh.x > w + 220 || sh.y > h + 220) { shoots.splice(i, 1); continue; }
        const mag = Math.sqrt(sh.vx * sh.vx + sh.vy * sh.vy);
        const tx = sh.x - (sh.vx / mag) * sh.len * sh.life, ty = sh.y - (sh.vy / mag) * sh.len * sh.life;
        const g = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, "rgba(108,71,255," + (sh.life * 0.9) + ")"); g.addColorStop(1, "rgba(0,180,216,0)");
        ctx.strokeStyle = g; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sh.x, sh.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.beginPath(); ctx.arc(sh.x, sh.y, 1.9, 0, Math.PI * 2); ctx.fillStyle = "rgba(108,71,255," + sh.life + ")"; ctx.fill();
      }
    };
    const loop = (now) => { frame(now); raf = requestAnimationFrame(loop); };
    resize(); init();
    if (reduce) { frame(performance.now()); }
    else { loop(performance.now()); shootTimer = setInterval(spawnShoot, 2600); }
    const onResize = () => { resize(); init(); if (reduce) frame(performance.now()); };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); if (shootTimer) clearInterval(shootTimer); window.removeEventListener("resize", onResize); };
  }, [reduce]);
  return <canvas ref={ref} aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", width: "100%", height: "100%" }} />;
}

/* ===================== THREE.JS 3D HERO SCENE ===================== */
function Hero3D() {
  const mountRef = useRef(null);
  const reduce = useReducedMotion();
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const el = mountRef.current;
    if (!el || reduce) return;
    const w = el.clientWidth, h = el.clientHeight || 420;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100);
    camera.position.z = 6;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    const geo1 = new THREE.IcosahedronGeometry(1.4, 1);
    const mat1 = new THREE.MeshStandardMaterial({ color: 0x6C47FF, wireframe: true, transparent: true, opacity: 0.85 });
    const ico = new THREE.Mesh(geo1, mat1);
    const geo2 = new THREE.TorusKnotGeometry(0.9, 0.22, 128, 16);
    const mat2 = new THREE.MeshStandardMaterial({ color: 0x00B4D8, metalness: 0.6, roughness: 0.25, transparent: true, opacity: 0.75 });
    const knot = new THREE.Mesh(geo2, mat2);
    knot.scale.set(0.85, 0.85, 0.85);
    const pts = new Float32Array(600 * 3);
    for (let i = 0; i < pts.length; i++) pts[i] = (Math.random() - 0.5) * 8;
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pts, 3));
    const particles = new THREE.Points(pGeo, new THREE.PointsMaterial({ color: 0x8B5CF6, size: 0.035, transparent: true, opacity: 0.7 }));
    group.add(ico, knot, particles);
    scene.add(group);

    const amb = new THREE.AmbientLight(0xffffff, 0.5);
    const dir = new THREE.DirectionalLight(0xffffff, 1.2);
    dir.position.set(4, 6, 8);
    const pt = new THREE.PointLight(0x6C47FF, 2, 20);
    pt.position.set(-3, 2, 4);
    const pt2 = new THREE.PointLight(0x00B4D8, 1.5, 20);
    pt2.position.set(3, -2, 3);
    scene.add(amb, dir, pt, pt2);

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      mouse.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2;
      mouse.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };
    el.addEventListener("pointermove", onMove);
    let raf = 0, t0 = performance.now();
    const animate3d = (now) => {
      const t = (now - t0) * 0.001;
      ico.rotation.x = t * 0.35 + mouse.current.y * 0.3;
      ico.rotation.y = t * 0.45 + mouse.current.x * 0.4;
      knot.rotation.x = -t * 0.28 + mouse.current.y * 0.2;
      knot.rotation.y = t * 0.52 + mouse.current.x * 0.35;
      group.position.y = Math.sin(t * 0.8) * 0.15;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate3d);
    };
    animate3d(performance.now());

    const ro = new ResizeObserver(() => {
      const nw = el.clientWidth, nh = el.clientHeight || 420;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setSize(nw, nh);
    });
    ro.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      ro.disconnect();
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  }, [reduce]);
  return (
    <div ref={mountRef} aria-hidden className="mx-auto w-full max-w-xl"
      style={{ height: "clamp(280px, 38vw, 420px)", borderRadius: 24, overflow: "hidden",
        background: "radial-gradient(circle at 50% 40%, rgba(108,71,255,0.12), transparent 70%)",
        border: "1px solid " + C.line, boxShadow: "var(--soft-lg)" }} />
  );
}

/* ===================== CURSOR GLOW ===================== */
function CursorGlow() {
  const reduce = useReducedMotion();
  const x = useMotionValue(-500), y = useMotionValue(-500);
  const sx = useSpring(x, { stiffness: 130, damping: 26, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 130, damping: 26, mass: 0.4 });
  useEffect(() => {
    if (reduce) return;
    const m = (e) => { x.set(e.clientX); y.set(e.clientY); };
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, [reduce, x, y]);
  if (reduce) return null;
  return <motion.div aria-hidden style={{
    position: "fixed", left: sx, top: sy, width: 460, height: 460, marginLeft: -230, marginTop: -230,
    borderRadius: "50%", pointerEvents: "none", zIndex: 1,
    background: "radial-gradient(circle, rgba(108,71,255,0.08), rgba(0,180,216,0.04) 40%, transparent 70%)",
  }} />;
}

/* ===================== HELPERS ===================== */
function Reveal({ children, className = "", delay = 0, y = 40, as = "div", style = {} }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const M = motion[as] || motion.div;
  return (
    <M ref={ref} className={className} style={style}
      initial={reduce ? false : { opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: EASE }}>
      {children}
    </M>
  );
}

/* ===================== FALLING STARS / SPACE DEBRIS (per-section moving bg) ===================== */
function StarFall({ tone = "dark" }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const canvas = ref.current;
    const parent = canvas.parentElement;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const base = tone === "light" ? "236,240,255" : "14,12,46";
    const accent = tone === "light" ? "0,212,255" : "108,71,255";
    let w = 0, h = 0, stars = [], meteors = [], raf = 0, visible = true, looping = false;

    const mkStar = (atTop) => ({
      x: Math.random() * w,
      y: atTop ? -8 - Math.random() * 40 : Math.random() * h,
      vy: 0.5 + Math.random() * 2.0,
      vx: -(0.25 + Math.random() * 0.7),
      size: Math.random() * 1.7 + 0.5,
      a: 0.22 + Math.random() * 0.5,
      tw: Math.random() * Math.PI * 2,
      twv: 0.03 + Math.random() * 0.06,
      acc: Math.random() < 0.22,
    });
    const mkMeteor = () => ({
      x: Math.random() * (w * 1.25),
      y: -30 - Math.random() * 120,
      len: 70 + Math.random() * 120,
      sp: 5 + Math.random() * 6,
      ang: Math.PI * (0.72 + Math.random() * 0.06),
      a: 0.45 + Math.random() * 0.4,
      acc: Math.random() < 0.4,
    });
    const init = () => {
      const n = Math.max(46, Math.min(150, Math.floor((w * h) / 8500)));
      stars = Array.from({ length: n }, () => mkStar(false));
      meteors = [];
    };
    const resize = () => {
      w = parent.clientWidth; h = parent.clientHeight;
      if (!w || !h) return;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init();
    };
    const frame = () => {
      if (!visible) { looping = false; return; }
      looping = true;
      ctx.clearRect(0, 0, w, h);
      for (const s of stars) {
        s.y += s.vy; s.x += s.vx; s.tw += s.twv;
        if (s.y > h + 12 || s.x < -12) { Object.assign(s, mkStar(true)); s.x = Math.random() * (w + 60); }
        const tw = 0.55 + 0.45 * Math.sin(s.tw);
        const col = s.acc ? accent : base;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + col + "," + (s.a * tw).toFixed(3) + ")";
        ctx.fill();
        if (s.size > 1.3) {
          ctx.beginPath();
          ctx.moveTo(s.x, s.y); ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
          ctx.strokeStyle = "rgba(" + col + "," + (s.a * tw * 0.35).toFixed(3) + ")";
          ctx.lineWidth = s.size * 0.7; ctx.lineCap = "round"; ctx.stroke();
        }
      }
      if (meteors.length < 3 && Math.random() < 0.014) meteors.push(mkMeteor());
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i];
        m.x += Math.cos(m.ang) * m.sp;
        m.y += Math.sin(m.ang) * m.sp;
        const tx = m.x - Math.cos(m.ang) * m.len;
        const ty = m.y - Math.sin(m.ang) * m.len;
        const col = m.acc ? accent : base;
        const g = ctx.createLinearGradient(m.x, m.y, tx, ty);
        g.addColorStop(0, "rgba(" + col + "," + m.a + ")");
        g.addColorStop(1, "rgba(" + col + ",0)");
        ctx.strokeStyle = g; ctx.lineWidth = 2.2; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(tx, ty); ctx.stroke();
        ctx.beginPath(); ctx.arc(m.x, m.y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + col + "," + m.a + ")"; ctx.fill();
        if (m.y > h + m.len || m.x < -m.len) meteors.splice(i, 1);
      }
      raf = requestAnimationFrame(frame);
    };
    const kick = () => { if (!looping && visible) { looping = true; raf = requestAnimationFrame(frame); } };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) kick(); }, { threshold: 0 });
    io.observe(parent);
    kick();
    return () => { cancelAnimationFrame(raf); looping = false; ro.disconnect(); io.disconnect(); };
  }, [reduce, tone]);
  return <canvas ref={ref} aria-hidden style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

function SectionBG({ variant = 0, tone = "dark", z = -1 }) {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: z, pointerEvents: "none", overflow: "hidden" }}>
      <StarFall tone={tone} />
    </div>
  );
}

/* ===================== ACETERNITY: SPOTLIGHT ===================== */
function Spotlight({ fill = "rgba(108,71,255,0.22)", className = "" }) {
  return (
    <svg className={"animate-spotlight pointer-events-none " + className} aria-hidden
      style={{ position: "absolute", top: 0, left: 0, height: "169%", width: "138%", opacity: 0, zIndex: 1 }}
      viewBox="0 0 3787 2842" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#spotfilter)">
        <ellipse cx="1924.71" cy="273.501" rx="1924.71" ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)" fill={fill} fillOpacity="1" />
      </g>
      <defs>
        <filter id="spotfilter" x="0.860352" y="0.838989" width="3785.16" height="2840.26"
          filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
          <feGaussianBlur stdDeviation="151" result="effect1_foregroundBlur" />
        </filter>
      </defs>
    </svg>
  );
}

/* ===================== ACETERNITY: TEXT GENERATE ===================== */
function TextGenerate({ text, className = "", delay = 0, stagger = 0.1, gradient = false }) {
  const reduce = useReducedMotion();
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((w, i) => (
        <motion.span key={i} className={gradient ? "text-gradient" : ""} style={{ display: "inline-block", marginRight: "0.26em" }}
          initial={reduce ? false : { opacity: 0, filter: "blur(12px)", y: 12 }}
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: EASE }}>
          {w}
        </motion.span>
      ))}
    </span>
  );
}

/* ===================== ACETERNITY: LAMP EFFECT ===================== */
function Lamp({ children }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const grow = inView ? { width: "30rem", opacity: 1 } : { width: "15rem", opacity: 0.5 };
  return (
    <div ref={ref} className="relative flex flex-col items-center justify-center" style={{ paddingTop: 40, paddingBottom: 10 }}>
      <div className="relative flex items-center justify-center" style={{ height: 120, width: "100%", isolation: "isolate" }}>
        <motion.div aria-hidden initial={false} animate={reduce ? { width: "30rem", opacity: 1 } : grow}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ position: "absolute", top: 60, height: 224,
            background: "conic-gradient(from 70deg at center top, rgba(108,71,255,0.55), transparent, transparent)",
            maskImage: "linear-gradient(to top, transparent, white 90%)", WebkitMaskImage: "linear-gradient(to top, transparent, white 90%)" }} />
        <motion.div aria-hidden initial={false} animate={reduce ? { width: "30rem", opacity: 1 } : grow}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ position: "absolute", top: 60, height: 224,
            background: "conic-gradient(from 290deg at center top, transparent, transparent, rgba(0,180,216,0.55))",
            maskImage: "linear-gradient(to top, transparent, white 90%)", WebkitMaskImage: "linear-gradient(to top, transparent, white 90%)" }} />
        <motion.div aria-hidden initial={false} animate={inView || reduce ? { width: "28rem", opacity: 1 } : { width: "8rem", opacity: 0 }}
          transition={{ duration: 1.1, ease: EASE }}
          style={{ position: "absolute", top: 88, height: 4, borderRadius: 999, zIndex: 2,
            background: "linear-gradient(90deg, transparent, #8b6bff, #4fd8ff, transparent)", filter: "blur(2px)", boxShadow: "0 0 24px 4px rgba(108,71,255,0.5)" }} />
        <div aria-hidden style={{ position: "absolute", top: 84, width: "100%", height: 60, background: "#07060F", zIndex: 1 }} />
      </div>
      <div className="relative" style={{ zIndex: 3, marginTop: -36 }}>{children}</div>
    </div>
  );
}

function Tilt({ children, className = "", style = {}, amount = 10, glow = false, glowColor = "108,71,255" }) {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const glowRef = useRef(null);
  const rx = useMotionValue(0), ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 150, damping: 16 });
  const sry = useSpring(ry, { stiffness: 150, damping: 16 });
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    const lx = e.clientX - r.left, ly = e.clientY - r.top;
    if (!reduce) {
      const px = lx / r.width - 0.5, py = ly / r.height - 0.5;
      ry.set(px * amount); rx.set(-py * amount);
    }
    if (glow && glowRef.current) {
      glowRef.current.style.background = "radial-gradient(240px circle at " + lx + "px " + ly + "px, rgba(" + glowColor + ",0.16), transparent 60%)";
      glowRef.current.style.opacity = "1";
    }
  };
  const onLeave = () => { rx.set(0); ry.set(0); if (glow && glowRef.current) glowRef.current.style.opacity = "0"; };
  if (reduce && !glow) return <div className={className} style={style}>{children}</div>;
  const inner = glow ? (
    <>
      <div ref={glowRef} aria-hidden style={{ position: "absolute", inset: 0, borderRadius: "inherit", opacity: 0, transition: "opacity .3s ease", pointerEvents: "none", zIndex: 0 }} />
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </>
  ) : children;
  return (
    <motion.div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={className}
      style={{ ...style, position: "relative", overflow: glow ? "hidden" : style.overflow,
        rotateX: reduce ? 0 : srx, rotateY: reduce ? 0 : sry, transformPerspective: 900 }}>
      {inner}
    </motion.div>
  );
}

function Counter({ to, decimals = 0, prefix = "", suffix = "", duration = 1.8 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const reduce = useReducedMotion();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    if (reduce) { setVal(to); return; }
    const c = animate(0, to, { duration, ease: [0.16, 1, 0.3, 1], onUpdate: (v) => setVal(v) });
    return () => c.stop();
  }, [inView, to, reduce, duration]);
  const f = val.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return <span ref={ref}>{prefix}{f}{suffix}</span>;
}

function SectionHead({ label, title, sub, center }) {
  return (
    <div className={"mb-12 " + (center ? "text-center mx-auto" : "")} style={center ? { maxWidth: 720 } : {}}>
      <Reveal>
        <span className="font-mono text-xs uppercase tracking-[0.25em] px-3 py-1.5 rounded-full inline-block"
          style={{ color: C.plasma, background: "rgba(108,71,255,0.08)", border: "1px solid rgba(108,71,255,0.18)" }}>
          {label}
        </span>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="font-display mt-5" style={{ fontSize: "clamp(28px,4.4vw,46px)", letterSpacing: "-0.03em", lineHeight: 1.12, color: C.ink }}>
          {title}
        </h2>
      </Reveal>
      {sub && <Reveal delay={0.14}><p className="mt-4 text-base sm:text-lg" style={{ color: C.muted, maxWidth: center ? "100%" : "56ch" }}>{sub}</p></Reveal>}
    </div>
  );
}

function GradBtn({ children, href = "/contact", className = "" }) {
  return (
    <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex">
      <Link to={href} className={"inline-flex items-center justify-center font-mono text-sm px-6 py-3 rounded-xl text-white " + className}
        style={{ background: grad, boxShadow: "0 12px 34px rgba(108,71,255,0.32)" }}>
        {children}
      </Link>
    </motion.div>
  );
}
function GhostBtn({ children, href = "/portfolio", className = "" }) {
  return (
    <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }} className="inline-flex">
      <Link to={href} className={"inline-flex items-center justify-center font-mono text-sm px-6 py-3 rounded-xl " + className}
        style={{ color: C.ink, background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
        {children}
      </Link>
    </motion.div>
  );
}

/* ===================== PAGE HERO (inner pages) ===================== */
function PageHero({ label, title, sub }) {
  return (
    <section className="relative isolate overflow-hidden" style={{ paddingTop: 120, paddingBottom: 40, background: C.bg }}>
      <SectionBG variant={0} />
      <Spotlight fill="rgba(108,71,255,0.14)" className="opacity-80" />
      <div aria-hidden style={{ position: "absolute", top: -80, right: "10%", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.14), transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8" style={{ zIndex: 2 }}>
        <SectionHead center label={label} title={title} sub={sub} />
      </div>
    </section>
  );
}

/* ===================== HOME PREVIEWS ===================== */
function SolutionsPreview() {
  return (
    <section className="py-20 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={2} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead center label="Solutions"
          title={<>Full-Spectrum Of AI-Powered Solutions <span className="text-gradient">Engineered For Global Impact</span></>}
          sub="Your AI Innovation Partner · Premium Tech Development Studio · Engineering The Decentralized Future · Your Startup's Launchpad · AI-Powered App Builder" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {SOLUTIONS.map((s, i) => (
            <Reveal key={s.key} delay={i * 0.05}>
              <Tilt amount={8} glow className="h-full rounded-2xl p-5" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <a href="/solutions" className="block h-full">
                  <div className="text-2xl mb-3">{s.icon}</div>
                  <h3 className="font-display text-sm mb-2" style={{ color: C.ink, letterSpacing: "-0.01em" }}>{s.tab}</h3>
                  <p className="text-xs" style={{ color: C.muted }}>{s.title}</p>
                </a>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><GradBtn href="/solutions">Explore All Solutions →</GradBtn></Reveal>
      </div>
    </section>
  );
}

function ServicesPreview() {
  return (
    <section className="py-20 relative isolate overflow-hidden" style={{ background: C.bg2 }}>
      <SectionBG variant={3} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead label="Services"
          title={<>We Create New Solutions and Transform Existing Ones with <span className="text-gradient">New Gen Technologies</span></>}
          sub="Is Tech Troubles Holding You Back? Focus on Growth While We Drive Your Tech Innovation." />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.slice(0, 3).map((sv, i) => (
            <Reveal key={sv.title} delay={i * 0.06}>
              <Tilt amount={9} glow className="h-full rounded-2xl p-7" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="grid place-items-center w-12 h-12 rounded-xl text-2xl mb-5" style={{ background: "linear-gradient(135deg, rgba(108,71,255,0.12), rgba(0,180,216,0.12))" }}>{sv.icon}</div>
                <h3 className="font-display text-xl mb-2" style={{ letterSpacing: "-0.02em", color: C.ink }}>{sv.title}</h3>
                <p className="text-sm" style={{ color: C.muted }}>{sv.desc}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><GhostBtn href="/services">View All Services →</GhostBtn></Reveal>
      </div>
    </section>
  );
}

function PortfolioPreview() {
  const featured = CASES.slice(0, 3);
  return (
    <section className="py-20 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={0} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHead center label="Case Studies" title={<>Catch Innovation in Action <span className="text-gradient">With Us</span></>}
          sub="Peek into the future with our cutting-edge projects that are redefining industries." />
        <div className="grid md:grid-cols-3 gap-5">
          {featured.map((c, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Tilt amount={8} className="h-full rounded-2xl overflow-hidden" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="h-28" style={{ background: "linear-gradient(120deg," + c.g[0] + "," + c.g[1] + ")" }} />
                <div className="p-5">
                  <div className="font-mono text-xs" style={{ color: C.plasma }}>{c.tag}</div>
                  <h3 className="font-display text-lg mb-2" style={{ color: C.ink }}>for {c.domain}</h3>
                  <p className="text-xs line-clamp-3" style={{ color: C.muted }}>{c.desc}</p>
                  <div className="flex gap-4 mt-4">
                    {c.m.map((m, j) => (
                      <div key={j}>
                        <div className="font-display text-gradient text-lg">{m.v}</div>
                        <div className="font-mono text-[10px]" style={{ color: C.muted }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-10 text-center"><GradBtn href="/portfolio">View Full Portfolio →</GradBtn></Reveal>
      </div>
    </section>
  );
}

/* ===================== NAV ===================== */
function Nav({ page }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", f, { passive: true });
    return () => window.removeEventListener("scroll", f);
  }, []);
  return (
    <motion.nav initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: EASE }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ backdropFilter: "blur(16px)", WebkitBackdropFilter: "blur(16px)",
        background: scrolled ? "rgba(255,255,255,0.82)" : "rgba(255,255,255,0.55)",
        borderBottom: "1px solid " + (scrolled ? C.line : "transparent"),
        boxShadow: scrolled ? "0 6px 24px rgba(24,24,70,0.06)" : "none", transition: "all .3s ease" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/logo.jpg" alt="Codexorr" className="w-8 h-8 rounded-lg object-cover"
            style={{ boxShadow: "0 0 16px rgba(108,71,255,0.35)", border: "1px solid " + C.line }} />
          <span className="font-display text-lg" style={{ letterSpacing: "-0.03em", color: C.ink }}>Codexorr</span>
        </Link>
        <div className="hidden md:flex items-center gap-7">
          {NAV.map((item, i) => (
            <motion.div key={item.key} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.07 }}>
              <Link to={item.href} className="font-mono text-xs uppercase tracking-widest"
                style={{ color: page === item.key ? C.plasma : C.muted, fontWeight: page === item.key ? 600 : 400 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.ink)}
                onMouseLeave={(e) => (e.currentTarget.style.color = page === item.key ? C.plasma : C.muted)}>{item.label}</Link>
            </motion.div>
          ))}
        </div>
        <div className="flex items-center gap-3">
          <GradBtn href="/contact" className="hidden sm:inline-flex">Get In Touch</GradBtn>
          <button aria-label="Menu" onClick={() => setOpen(o => !o)} className="md:hidden grid place-items-center w-9 h-9 rounded-lg" style={{ border: "1px solid " + C.line, color: C.ink }}>
            <span className="block w-4 h-px bg-current mb-1" /><span className="block w-4 h-px bg-current" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden" style={{ borderTop: "1px solid " + C.line, background: "rgba(255,255,255,0.97)" }}>
            <div className="px-5 py-4 flex flex-col gap-4">
              {NAV.map(item => <Link key={item.key} to={item.href} onClick={() => setOpen(false)} className="font-mono text-sm" style={{ color: page === item.key ? C.plasma : C.muted }}>{item.label}</Link>)}
              <GradBtn href="/contact">Get In Touch</GradBtn>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ===================== HERO ===================== */
function Hero() {
  const reduce = useReducedMotion();
  const [role, setRole] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setRole(r => (r + 1) % ROLES.length), 2200);
    return () => clearInterval(t);
  }, [reduce]);
  return (
    <section id="top" className="relative isolate overflow-hidden" style={{ paddingTop: 130, paddingBottom: 70 }}>
      <SectionBG variant={0} />
      <Spotlight fill="rgba(108,71,255,0.20)" />
      <div aria-hidden style={{ position: "absolute", top: -120, left: "10%", width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(108,71,255,0.18), transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />
      <div aria-hidden style={{ position: "absolute", top: 40, right: "8%", width: 380, height: 380, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,180,216,0.16), transparent 70%)", filter: "blur(20px)", zIndex: 0 }} />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8" style={{ zIndex: 2 }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <motion.div initial={reduce ? false : { opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
              className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full mb-7"
              style={{ color: C.plasma, background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
              <span className="inline-block w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: C.ember }} />
              We empower businesses to <strong>Innovate, Optimize, and Scale.</strong>
            </motion.div>

            <h1 className="font-display" style={{ fontSize: "clamp(36px,6vw,72px)", letterSpacing: "-0.035em", lineHeight: 1.05, color: C.ink }}>
              <TextGenerate text="AI-Driven Digital" className="block" delay={0.2} />
              <TextGenerate text="Transformation Company" className="block" delay={0.5} gradient />
            </h1>

            <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
              className="mt-6 flex flex-col gap-2.5">
              {HERO_BULLETS.map((b, i) => (
                <motion.div key={i} initial={reduce ? false : { opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-start gap-3 text-sm sm:text-base" style={{ color: C.muted }}>
                  <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: grad }} />
                  {b}
                </motion.div>
              ))}
            </motion.div>

            <motion.p initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.65 }}
              className="mt-5 text-sm sm:text-base flex items-center justify-center lg:justify-start gap-2 flex-wrap" style={{ color: C.muted }}>
              <span>Built for the</span>
              <span className="inline-flex" style={{ minWidth: 100 }}>
                <AnimatePresence mode="wait">
                  <motion.span key={role} initial={reduce ? false : { y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={reduce ? {} : { y: -14, opacity: 0 }} transition={{ duration: 0.35 }}
                    className="font-display font-semibold" style={{ color: C.plasma }}>{ROLES[role]}</motion.span>
                </AnimatePresence>
              </span>
            </motion.p>

            <motion.div initial={reduce ? false : { opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}
              className="mt-9 flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
              <GradBtn>Build Your Success Story {"\u2192"}</GradBtn>
              <GhostBtn href="/portfolio">See Our Work</GhostBtn>
            </motion.div>
          </div>

          <motion.div initial={reduce ? false : { opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5, duration: 0.9 }}
            className="relative">
            <Hero3D />
            <motion.div animate={reduce ? {} : { y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 rounded-2xl px-4 py-3 hidden sm:block"
              style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft-lg)" }}>
              <div className="font-display text-2xl text-gradient">2,600+</div>
              <div className="font-mono text-xs" style={{ color: C.muted }}>Business Ventures Transformed</div>
            </motion.div>
            <motion.div animate={reduce ? {} : { y: [0, 8, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -top-4 -right-4 rounded-2xl px-4 py-3 hidden sm:block"
              style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft-lg)" }}>
              <div className="font-display text-2xl text-gradient">13+</div>
              <div className="font-mono text-xs" style={{ color: C.muted }}>Years of Excellence</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ===================== STATS ===================== */
function Stats() {
  return (
    <section className="py-16 relative isolate overflow-hidden" style={{ background: C.bg2, borderTop: "1px solid " + C.line, borderBottom: "1px solid " + C.line }}>
      <SectionBG variant={1} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <Reveal className="text-center mb-10">
          <h2 className="font-display" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.02em", color: C.ink }}>
            Architecting Digital Excellence For <span className="text-gradient">5,000+ Industry Leaders</span>
          </h2>
        </Reveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} className="text-center">
              <div className="font-display text-gradient" style={{ fontSize: "clamp(30px,4vw,46px)", letterSpacing: "-0.02em", lineHeight: 1 }}>
                <Counter to={s.to} suffix={s.suffix} />
              </div>
              <div className="font-mono text-xs mt-2" style={{ color: C.muted }}>{s.label}</div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== SOLUTIONS (tabs) ===================== */
function Solutions({ hideHead = false }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const s = SOLUTIONS[active];
  return (
    <section id="solutions" className={"relative isolate overflow-hidden " + (hideHead ? "py-12" : "py-24")} style={{ background: C.bg }}>
      <SectionBG variant={2} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead center label="Solutions"
            title={<>Full-Spectrum Of AI-Powered Solutions <span className="text-gradient">Engineered For Global Impact</span></>}
            sub="Your AI Innovation Partner · Premium Tech Development Studio · Engineering The Decentralized Future · Your Startup's Launchpad · AI-Powered App Builder" />
        )}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {SOLUTIONS.map((it, i) => (
            <button key={it.key} onClick={() => setActive(i)}
              className="font-mono text-xs sm:text-sm px-4 py-2.5 rounded-xl transition-all"
              style={active === i
                ? { background: grad, color: "#fff", boxShadow: "0 10px 26px rgba(108,71,255,0.3)" }
                : { background: C.surface, color: C.muted, border: "1px solid " + C.line }}>
              {it.tab}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div key={active}
            initial={reduce ? false : { opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={reduce ? {} : { opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="grid md:grid-cols-2 gap-8 rounded-3xl p-7 sm:p-10"
            style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft-lg)" }}>
            <div>
              <div className="grid place-items-center w-12 h-12 rounded-2xl text-2xl mb-5" style={{ background: "rgba(108,71,255,0.1)", color: C.plasma }}>{s.icon}</div>
              <h3 className="font-display" style={{ fontSize: "clamp(24px,3vw,34px)", letterSpacing: "-0.02em", color: C.ink }}>{s.title}</h3>
              <p className="mt-4 text-base" style={{ color: C.muted }}>{s.desc}</p>
              <ul className="mt-6 flex flex-col gap-3">
                {s.points.map((p, j) => (
                  <motion.li key={p} initial={reduce ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.15 + j * 0.08 }}
                    className="flex items-center gap-3" style={{ color: C.ink }}>
                    <span className="grid place-items-center w-5 h-5 rounded-full shrink-0" style={{ background: grad }}>
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5"><path d="M5 12l5 5L20 6" /></svg>
                    </span>
                    <span className="text-sm">{p}</span>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8"><GradBtn>Explore {s.key} {"\u2192"}</GradBtn></div>
            </div>
            <div className="grid grid-cols-1 gap-3 content-start">
              {s.services.map((sv, j) => (
                <motion.div key={sv} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 + j * 0.07 }}>
                  <Tilt amount={6} className="rounded-2xl p-4 flex items-center justify-between" style={{ background: C.bg2, border: "1px solid " + C.line }}>
                    <span className="font-display text-base" style={{ color: C.ink }}>{sv}</span>
                    <span className="font-mono text-xs" style={{ color: C.plasma }}>0{j + 1}</span>
                  </Tilt>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ===================== SERVICES ===================== */
function Services({ hideHead = false }) {
  return (
    <section id="services" className="py-24 relative isolate overflow-hidden" style={{ background: C.bg2 }}>
      <SectionBG variant={3} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead label="Services"
            title={<>We Create New Solutions and Transform Existing Ones with <span className="text-gradient">New Gen Technologies</span> To Make Your Business Future-proof</>}
            sub="Is Tech Troubles Holding You Back? Focus on Growth While We Drive Your Tech Innovation." />
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((sv, i) => (
            <Reveal key={sv.title} delay={i * 0.06}>
              <Tilt amount={9} glow className="h-full rounded-2xl p-7" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="grid place-items-center w-12 h-12 rounded-xl text-2xl mb-5" style={{ background: "linear-gradient(135deg, rgba(108,71,255,0.12), rgba(0,180,216,0.12))" }}>{sv.icon}</div>
                <h3 className="font-display text-xl mb-2" style={{ letterSpacing: "-0.02em", color: C.ink }}>{sv.title}</h3>
                <p className="text-sm" style={{ color: C.muted }}>{sv.desc}</p>
              </Tilt>
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.1} className="mt-12 text-center rounded-3xl p-8" style={{ background: grad, boxShadow: "var(--soft-lg)" }}>
          <h3 className="font-display text-white" style={{ fontSize: "clamp(22px,3vw,32px)", letterSpacing: "-0.02em" }}>Focus on Growth While We Drive Your Tech Innovation.</h3>
          <p className="mt-2 mb-6" style={{ color: "rgba(255,255,255,0.85)" }}>Is Tech Troubles Holding You Back?</p>
          <a href="/contact" className="inline-flex font-mono text-sm px-6 py-3 rounded-xl" style={{ background: "#fff", color: C.plasma, boxShadow: "0 10px 30px rgba(0,0,0,0.18)" }}>Book 30 Min C-Level Consultation</a>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== CASE STUDIES ===================== */
function Cases({ hideHead = false }) {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const c = CASES[active];
  return (
    <section id="work" className="py-24 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={0} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead center label="Case Studies" title={<>Catch Innovation in Action <span className="text-gradient">With Us</span></>}
            sub="Peek into the future with our cutting-edge projects that are redefining industries." />
        )}
        <div className="grid lg:grid-cols-12 gap-6">
          <div className="lg:col-span-4 flex flex-col gap-2">
            {CASES.map((it, i) => (
              <button key={i} onClick={() => setActive(i)}
                className="text-left rounded-2xl px-5 py-4 transition-all"
                style={active === i
                  ? { background: C.surface, border: "1px solid rgba(108,71,255,0.4)", boxShadow: "var(--soft)" }
                  : { background: "transparent", border: "1px solid " + C.line }}>
                <div className="font-mono text-xs" style={{ color: active === i ? C.plasma : C.muted }}>{it.tag}</div>
                <div className="font-display text-lg" style={{ color: C.ink, letterSpacing: "-0.02em" }}>for {it.domain}</div>
              </button>
            ))}
          </div>
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={reduce ? false : { opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? {} : { opacity: 0, x: -24 }} transition={{ duration: 0.4, ease: EASE }}
                className="rounded-3xl overflow-hidden h-full" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft-lg)" }}>
                <div className="h-40 sm:h-52 relative" style={{ background: "linear-gradient(120deg," + c.g[0] + "," + c.g[1] + ")" }}>
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="font-display text-white text-center px-6" style={{ fontSize: "clamp(22px,3vw,34px)", letterSpacing: "-0.02em", textShadow: "0 4px 20px rgba(0,0,0,0.2)" }}>{c.tag} for {c.domain}</span>
                  </div>
                </div>
                <div className="p-7 sm:p-9">
                  <p className="text-base" style={{ color: C.muted }}>{c.desc}</p>
                  <div className="grid grid-cols-2 gap-5 mt-7">
                    {c.m.map((m, j) => (
                      <div key={j} className="rounded-2xl p-5" style={{ background: C.bg2 }}>
                        <div className="font-display text-gradient" style={{ fontSize: "clamp(26px,3.4vw,40px)", letterSpacing: "-0.02em", lineHeight: 1 }}>{m.v}</div>
                        <div className="font-mono text-xs mt-1.5" style={{ color: C.muted }}>{m.l}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-7"><GhostBtn href="/contact">Download Case Study {"\u2193"}</GhostBtn></div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===================== INDUSTRIES ===================== */
function Industries({ hideHead = false }) {
  return (
    <section id="industries" className="py-24 relative isolate overflow-hidden" style={{ background: C.bg2 }}>
      <SectionBG variant={1} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead center label="Industries" title={<>Engineering industry-specific excellence <span className="text-gradient">with AI &amp; innovation</span></>} />
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {INDUSTRIES.map((it, i) => (
            <Reveal key={it.name} delay={(i % 5) * 0.05}>
              <Tilt amount={8} glow className="h-full rounded-2xl p-5" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="text-2xl mb-3">{it.icon}</div>
                <h3 className="font-display text-base mb-3" style={{ color: C.ink, letterSpacing: "-0.01em" }}>{it.name}</h3>
                <ul className="flex flex-col gap-1.5 mb-4">
                  {it.items.map(x => <li key={x} className="text-xs" style={{ color: C.muted }}>• {x}</li>)}
                </ul>
                <a href="/contact" className="font-mono text-xs" style={{ color: C.plasma }}>Live Demo {"\u2192"}</a>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== AWARDS marquee ===================== */
function Awards() {
  const row = [...AWARDS, ...AWARDS];
  return (
    <section className="py-14" style={{ background: C.bg, borderTop: "1px solid " + C.line, borderBottom: "1px solid " + C.line }}>
      <Reveal className="text-center mb-7"><p className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: C.muted }}>Every Award Marks a Milestone in Our Journey of Excellence</p></Reveal>
      <div className="marquee-mask overflow-hidden" style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
        <div className="marquee-track gap-4 px-3">
          {row.map((a, i) => (
            <div key={i} className="flex items-center gap-2.5 shrink-0 rounded-full px-5 py-2.5" style={{ background: C.surface, border: "1px solid " + C.line }}>
              <span style={{ color: "#f59e0b" }}>{"\u{1F3C6}"}</span>
              <span className="font-mono text-xs whitespace-nowrap" style={{ color: C.ink }}>{a}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== TESTIMONIALS ===================== */
function Testimonials({ hideHead = false }) {
  const [idx, setIdx] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 4500);
    return () => clearInterval(t);
  }, [reduce]);
  const t = TESTIMONIALS[idx];
  return (
    <section className="py-24 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={2} />
      <div className="mx-auto max-w-3xl px-5 sm:px-8 text-center">
        {!hideHead && (
          <SectionHead center label="Testimonials" title={<>Clients Love Us For Our Commitment To Deliver <span className="text-gradient">Transformative Excellence</span></>} />
        )}
        <div className="relative rounded-3xl p-8 sm:p-12" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft-lg)", minHeight: 290 }}>
          <div className="text-5xl font-display text-gradient mb-2" style={{ lineHeight: 0.5 }}>"</div>
          <AnimatePresence mode="wait">
            <motion.div key={idx} initial={reduce ? false : { opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={reduce ? {} : { opacity: 0, x: -30 }} transition={{ duration: 0.45, ease: EASE }}>
              <p className="font-display" style={{ fontSize: "clamp(17px,2.2vw,22px)", color: C.ink, lineHeight: 1.5, letterSpacing: "-0.01em" }}>{t.quote}</p>
              <div className="flex items-center justify-center gap-3 mt-7">
                <span className="w-12 h-12 rounded-full grid place-items-center font-display text-white" style={{ background: "linear-gradient(135deg," + t.g[0] + "," + t.g[1] + ")" }}>{t.name[0]}</span>
                <div className="text-left">
                  <div className="font-mono text-sm" style={{ color: C.ink }}>{t.name}</div>
                  <div className="font-mono text-xs" style={{ color: C.muted }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex justify-center gap-2.5 mt-7">
          {TESTIMONIALS.map((_, i) => (
            <button key={i} aria-label={"Testimonial " + (i + 1)} onClick={() => setIdx(i)} className="h-2.5 rounded-full transition-all"
              style={{ width: idx === i ? 26 : 10, background: idx === i ? C.plasma : C.line }} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== WHY US ===================== */
function WhyUs({ hideHead = false }) {
  return (
    <section className="py-24 relative isolate overflow-hidden" style={{ background: C.bg2 }}>
      <SectionBG variant={3} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead label="Why Codexorr?" title={<>How We Drive Successful <span className="text-gradient">Digital Transformation For You?</span></>}
            sub="We combine next-gen AI capabilities with our proven track record to catapult your business to new heights, offering:" />
        )}
        <div className="grid sm:grid-cols-2 gap-5">
          {WHY.map((w, i) => (
            <Reveal key={w.title} delay={i * 0.07}>
              <Tilt amount={6} glow className="h-full rounded-2xl p-7 flex gap-5" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="grid place-items-center w-12 h-12 rounded-xl text-2xl shrink-0" style={{ background: "rgba(108,71,255,0.1)" }}>{w.icon}</div>
                <div>
                  <h3 className="font-display text-xl mb-2" style={{ letterSpacing: "-0.02em", color: C.ink }}>{w.title}</h3>
                  <p className="text-sm" style={{ color: C.muted }}>{w.desc}</p>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== RESOURCES ===================== */
function Resources({ hideHead = false }) {
  return (
    <section id="resources" className="py-24 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={0} />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead label="Resources" title={<>Resources To Fuel Your <span className="text-gradient">Digital-First Innovation Journey</span></>} />
        )}
        <div className="grid md:grid-cols-3 gap-5">
          {RESOURCES.map((r, i) => (
            <Reveal key={i} delay={i * 0.08}>
              <Tilt amount={8} className="h-full rounded-2xl overflow-hidden" style={{ background: C.surface, border: "1px solid " + C.line, boxShadow: "var(--soft)" }}>
                <div className="h-36" style={{ background: i === 1 ? "linear-gradient(120deg," + C.arc + "," + C.plasma + ")" : "linear-gradient(120deg," + C.plasma + "," + C.violet + ")" }}>
                  <div className="h-full grid place-items-center text-4xl">{r.type === "Video" ? "\u25B6" : "\u270E"}</div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-xs uppercase px-2.5 py-1 rounded-full" style={{ color: C.plasma, background: "rgba(108,71,255,0.08)" }}>{r.type}</span>
                    <span className="font-mono text-xs" style={{ color: C.muted }}>{r.read}</span>
                  </div>
                  <h3 className="font-display text-lg" style={{ color: C.ink, letterSpacing: "-0.01em" }}>{r.title}</h3>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FAQ ===================== */
function Faq({ hideHead = false }) {
  const [open, setOpen] = useState(0);
  const reduce = useReducedMotion();
  return (
    <section className="py-24 relative isolate overflow-hidden" style={{ background: C.bg2 }}>
      <SectionBG variant={1} />
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        {!hideHead && (
          <SectionHead center label="FAQ" title="Frequently asked questions" />
        )}
        <div className="flex flex-col gap-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={i} delay={i * 0.04}>
                <div className="rounded-2xl overflow-hidden" style={{ background: C.surface, border: "1px solid " + (isOpen ? "rgba(108,71,255,0.35)" : C.line), boxShadow: isOpen ? "var(--soft)" : "none" }}>
                  <button onClick={() => setOpen(isOpen ? -1 : i)} className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left">
                    <span className="font-display text-base sm:text-lg" style={{ color: C.ink, letterSpacing: "-0.01em" }}>{f.q}</span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-2xl shrink-0" style={{ color: C.plasma, lineHeight: 1 }}>+</motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={reduce ? false : { height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} style={{ overflow: "hidden" }}>
                        <p className="px-6 pb-5 text-sm" style={{ color: C.muted }}>{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
        <Reveal delay={0.2} className="mt-10 text-center rounded-2xl p-6" style={{ background: C.surface, border: "1px solid " + C.line }}>
          <h4 className="font-display text-lg mb-2" style={{ color: C.ink }}>Do you have more questions?</h4>
          <p className="text-sm mb-4" style={{ color: C.muted }}>We've got more answers waiting for you! If your question didn't make the list, don't hesitate to reach out.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <GradBtn href="tel:+12132614953">Call Us Now!</GradBtn>
            <GhostBtn href="/contact">Connect on Whatsapp</GhostBtn>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== CLIENTS & PARTNERS CTA ===================== */
function ClientsPartners() {
  return (
    <section className="py-24 relative isolate overflow-hidden" style={{ background: C.bg }}>
      <SectionBG variant={1} />
      <div className="mx-auto max-w-5xl px-5 sm:px-8 text-center">
        <SectionHead center label="Clients & Partners"
          title={<>From Startups To Enterprises, <span className="text-gradient">We Transform Digital Visions At Every Scale</span></>}
          sub="Partner with experts who transform ideas into market-leading solutions, regardless of your business size or industry." />
        <Reveal delay={0.1}>
          <div className="rounded-3xl p-10 sm:p-14" style={{ background: grad, boxShadow: "var(--soft-lg)" }}>
            <h3 className="font-display text-white" style={{ fontSize: "clamp(24px,4vw,40px)", letterSpacing: "-0.03em", lineHeight: 1.15 }}>
              It's Time To Accelerate Your Digital Transformation Journey
            </h3>
            <div className="mt-8"><a href="/contact" className="inline-flex font-mono text-sm px-7 py-3.5 rounded-xl" style={{ background: "#fff", color: C.plasma, boxShadow: "0 14px 40px rgba(0,0,0,0.2)" }}>Let's Build Together {"\u2192"}</a></div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ===================== CONTACT / CTA ===================== */
function Contact() {
  const reduce = useReducedMotion();
  return (
    <section id="contact" className="relative py-28 overflow-hidden">
      <div className="absolute inset-0" style={{ background: "linear-gradient(125deg," + C.plasma + " 0%, #5a3fd6 45%, " + C.arc + " 100%)" }} />
      <div className="aurora absolute inset-0" aria-hidden style={{
        background: "repeating-linear-gradient(100deg, #6C47FF 8%, #00B4D8 14%, #8B5CF6 20%, #00D4FF 26%, #6C47FF 32%)",
        backgroundSize: "200% 200%", mixBlendMode: "soft-light", opacity: 0.5, filter: "blur(8px)" }} />
      <div className="absolute inset-0" style={{ background: "radial-gradient(60% 80% at 50% 120%, rgba(0,0,0,0.28), transparent)" }} />
      <SectionBG variant={2} tone="light" z={1} />
      <div className="relative mx-auto max-w-6xl px-5 sm:px-8" style={{ zIndex: 2 }}>
        <Reveal className="text-center">
          <h2 className="font-display text-white" style={{ fontSize: "clamp(32px,5.5vw,64px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Ready To Fuel Your Vision With<br />AI-Powered Innovation?
          </h2>
          <p className="mt-5 mx-auto" style={{ color: "rgba(255,255,255,0.88)", maxWidth: 560 }}>
            Partner With Experts Who Leverage AI &amp; Tech To Transform Ideas Into Market-Leading Solutions.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/contact" className="font-mono text-sm px-7 py-3.5 rounded-xl" style={{ background: "#fff", color: C.plasma, boxShadow: "0 14px 40px rgba(0,0,0,0.25)" }}>Let's Build Together {"\u2192"}</a>
            <a href="/contact" className="font-mono text-sm px-7 py-3.5 rounded-xl text-white" style={{ border: "1px solid rgba(255,255,255,0.6)", background: "rgba(255,255,255,0.1)" }}>Connect on Whatsapp</a>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="text-center mt-10 mb-4">
          <span className="font-mono text-xs uppercase tracking-[0.25em]" style={{ color: "rgba(255,255,255,0.7)" }}>Our Presence</span>
        </Reveal>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.06}>
              <div className="rounded-2xl p-5 h-full" style={{ background: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.22)", backdropFilter: "blur(6px)" }}>
                <div className="font-display text-white text-lg mb-2">{o.city}</div>
                <p className="text-xs" style={{ color: "rgba(255,255,255,0.82)" }}>{o.addr}</p>
                {o.email && <p className="font-mono text-xs mt-2" style={{ color: "rgba(255,255,255,0.9)" }}>{o.email}</p>}
                <p className="font-mono text-xs mt-1" style={{ color: "#fff" }}>{o.phone}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===================== FOOTER ===================== */
function Footer() {
  return (
    <footer className="py-16" style={{ background: C.ink, color: "#fff" }}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <Reveal className="col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.jpg" alt="Codexorr" className="w-8 h-8 rounded-lg object-cover" style={{ border: "1px solid rgba(255,255,255,0.15)" }} />
              <span className="font-display text-lg" style={{ letterSpacing: "-0.03em" }}>Codexorr</span>
            </div>
            <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "34ch" }}>
              Partner With Experts Who Leverage AI &amp; Tech To Transform Ideas Into Market-Leading Solutions.
            </p>
            <a href="/contact" className="inline-flex mt-5 font-mono text-sm px-5 py-2.5 rounded-xl text-white" style={{ background: grad }}>Lets Connect</a>
          </Reveal>
          {Object.entries(FOOTER).map(([group, links], gi) => (
            <Reveal key={group} delay={gi * 0.06}>
              <h4 className="font-mono text-xs uppercase tracking-widest mb-4" style={{ color: "rgba(255,255,255,0.9)" }}>{group}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((l, i) => (
                  <motion.li key={l} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <a href="#" className="text-sm transition-colors" style={{ color: "rgba(255,255,255,0.55)" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.55)")}>{l}</a>
                  </motion.li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <div className="mt-14 pt-7 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid rgba(255,255,255,0.12)" }}>
          <p className="font-mono text-xs" style={{ color: "rgba(255,255,255,0.5)" }}>{"\u00A9"} 2026 Codexorr. All rights reserved.</p>
          <div className="flex gap-5">
            {["Privacy", "Terms", "LinkedIn", "Twitter"].map(s => (
              <a key={s} href="#" className="font-mono text-xs transition-colors" style={{ color: "rgba(255,255,255,0.5)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C.arc)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.5)")}>{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ===================== SCROLL VELOCITY 3D PLANES ===================== */
const PLANE_WORDS = [
  ["Artificial Intelligence", "Generative AI", "Machine Learning", "Data Science"],
  ["Blockchain", "Smart Contracts", "Web3", "Tokenization", "Metaverse"],
  ["Cloud", "DevOps", "Automation", "Enterprise Software", "Mobile Apps"],
];

function VelocityRow({ words, baseVelocity, outline, reduce }) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], { clamp: false });
  const x = useTransform(baseX, (v) => wrap(-25, -50, v) + "%");
  const dir = useRef(1);
  useAnimationFrame((t, delta) => {
    if (reduce) return;
    let moveBy = dir.current * baseVelocity * (delta / 1000);
    if (velocityFactor.get() < 0) dir.current = -1;
    else if (velocityFactor.get() > 0) dir.current = 1;
    moveBy += dir.current * moveBy * velocityFactor.get();
    baseX.set(baseX.get() + moveBy);
  });
  const seq = [0, 1, 2, 3];
  const textStyle = outline
    ? { color: "transparent", WebkitTextStroke: "1.5px rgba(255,255,255,0.35)" }
    : { background: "linear-gradient(100deg,#c9b8ff,#7bd6ff)", WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", color: "transparent" };
  return (
    <div className="overflow-hidden" style={{ flexShrink: 0 }}>
      <motion.div className="flex whitespace-nowrap" style={{ x }}>
        {seq.map((rep) => (
          <span key={rep} className="flex items-center">
            {words.map((w, i) => (
              <span key={i} className="flex items-center">
                <span className="font-display uppercase px-4" style={{ fontSize: "clamp(34px,7vw,96px)", letterSpacing: "-0.03em", lineHeight: 1.05, ...textStyle }}>{w}</span>
                <span style={{ width: 14, height: 14, borderRadius: "50%", background: "linear-gradient(135deg," + C.plasma + "," + C.arc + ")", display: "inline-block", margin: "0 6px" }} />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

function VelocityPlanes() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const sv = useVelocity(scrollY);
  const smooth = useSpring(sv, { damping: 50, stiffness: 300 });
  const rotateX = useTransform(smooth, [-3000, 0, 3000], [16, 0, -16], { clamp: true });
  const skewX = useTransform(smooth, [-3000, 0, 3000], [-9, 0, 9], { clamp: true });
  return (
    <section className="py-24 overflow-hidden relative isolate" style={{ background: "#07060F" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(60% 60% at 50% 50%, rgba(108,71,255,0.16), transparent 70%)" }} />
      <SectionBG variant={3} tone="light" />
      <Lamp>
        <h2 className="font-display text-center text-white" style={{ fontSize: "clamp(26px,4vw,46px)", letterSpacing: "-0.03em", lineHeight: 1.05 }}>
          The technologies <span className="text-gradient">we wield</span>
        </h2>
      </Lamp>
      <div className="relative" style={{ perspective: 1000 }}>
        <motion.div className="flex flex-col gap-2 sm:gap-4"
          style={{ rotateX: reduce ? 0 : rotateX, skewX: reduce ? 0 : skewX, transformStyle: "preserve-3d", transformPerspective: 1000 }}>
          <VelocityRow words={PLANE_WORDS[0]} baseVelocity={-3.5} reduce={reduce} />
          <VelocityRow words={PLANE_WORDS[1]} baseVelocity={4} outline reduce={reduce} />
          <VelocityRow words={PLANE_WORDS[2]} baseVelocity={-3} reduce={reduce} />
        </motion.div>
      </div>
    </section>
  );
}

/* ===================== FLOATING ORBS ===================== */
function FloatingOrbs() {
  const reduce = useReducedMotion();
  const orbs = [
    { top: "8%", left: "-6%", size: 360, c: "rgba(108,71,255,0.16)", dur: 17 },
    { top: "38%", left: "82%", size: 440, c: "rgba(0,180,216,0.14)", dur: 22 },
    { top: "66%", left: "4%", size: 320, c: "rgba(139,92,246,0.15)", dur: 19 },
    { top: "88%", left: "70%", size: 380, c: "rgba(108,71,255,0.12)", dur: 24 },
  ];
  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
      {orbs.map((o, i) => (
        <div key={i} className={reduce ? "" : "orb"}
          style={{ position: "absolute", top: o.top, left: o.left, width: o.size, height: o.size,
            borderRadius: "50%", filter: "blur(28px)", animationDelay: (-i * 3) + "s", animationDuration: o.dur + "s",
            background: "radial-gradient(circle, " + o.c + ", transparent 70%)" }} />
      ))}
    </div>
  );
}

/* ===================== ANIMATED WAVE DIVIDER ===================== */
const WAVE_PATH = "M0,40 C240,80 480,80 720,40 C960,0 1200,0 1440,40 C1680,80 1920,80 2160,40 C2400,0 2640,0 2880,40 L2880,100 L0,100 Z";
function WaveBand({ top, bottom, h = 80 }) {
  return (
    <div aria-hidden style={{ background: top, lineHeight: 0, overflow: "hidden", position: "relative", zIndex: 3 }}>
      <svg className="wavemove2" viewBox="0 0 2880 100" preserveAspectRatio="none" style={{ width: "200%", height: h, display: "block", opacity: 0.45 }}>
        <path d={WAVE_PATH} fill={bottom} />
      </svg>
      <svg className="wavemove" viewBox="0 0 2880 100" preserveAspectRatio="none" style={{ width: "200%", height: h, display: "block", marginTop: -h + 2 }}>
        <path d={WAVE_PATH} fill={bottom} />
      </svg>
    </div>
  );
}

/* ===================== PAGE ROUTER ===================== */
function renderPage(page) {
  switch (page) {
    case "home":
      return (
        <>
          <Hero />
          <Stats />
          <SolutionsPreview />
          <ServicesPreview />
          <PortfolioPreview />
          <Awards />
          <Testimonials />
          <ClientsPartners />
        </>
      );
    case "solutions":
      return (
        <>
          <PageHero label="Solutions"
            title={<>Full-Spectrum Of AI-Powered Solutions <span className="text-gradient">Engineered For Global Impact</span></>}
            sub="Your AI Innovation Partner · Premium Tech Development Studio · Engineering The Decentralized Future · Your Startup's Launchpad · AI-Powered App Builder" />
          <Solutions hideHead />
        </>
      );
    case "services":
      return (
        <>
          <PageHero label="Services"
            title={<>We Create New Solutions and Transform Existing Ones with <span className="text-gradient">New Gen Technologies</span> To Make Your Business Future-proof</>}
            sub="Is Tech Troubles Holding You Back? Focus on Growth While We Drive Your Tech Innovation." />
          <Services hideHead />
        </>
      );
    case "portfolio":
      return (
        <>
          <PageHero label="Case Studies"
            title={<>Catch Innovation in Action <span className="text-gradient">With Us</span></>}
            sub="Peek into the future with our cutting-edge projects that are redefining industries." />
          <Cases hideHead />
        </>
      );
    case "industries":
      return (
        <>
          <PageHero label="Industries"
            title={<>Engineering Industry-specific Excellence <span className="text-gradient">With AI &amp; Innovation</span></>}
            sub="Join leading businesses across sectors who trust us to drive innovation." />
          <Industries hideHead />
        </>
      );
    case "about":
      return (
        <>
          <PageHero label="Why Codexorr?"
            title={<>How We Drive Successful <span className="text-gradient">Digital Transformation For You?</span></>}
            sub="We combine next-gen AI capabilities with our proven track record to catapult your business to new heights, offering:" />
          <WhyUs hideHead />
          <WaveBand top="#F3F4FC" bottom="#07060F" />
          <VelocityPlanes />
          <WaveBand top="#07060F" bottom="#FBFBFF" />
          <Testimonials hideHead />
          <Awards />
          <ClientsPartners />
        </>
      );
    case "resources":
      return (
        <>
          <PageHero label="Resources"
            title={<>Resources To Fuel Your <span className="text-gradient">Digital-First Innovation Journey</span></>}
            sub="Insights, case studies, videos, and expert guides to accelerate your innovation." />
          <Resources hideHead />
        </>
      );
    case "contact":
      return (
        <>
          <PageHero label="Contact Us"
            title={<>Ready To Fuel Your Vision With <span className="text-gradient">AI-Powered Innovation?</span></>}
            sub="Partner With Experts Who Leverage AI & Tech To Transform Ideas Into Market-Leading Solutions." />
          <Faq hideHead />
          <WaveBand top="#F3F4FC" bottom="#6C47FF" />
          <Contact />
        </>
      );
    default:
      return <Hero />;
  }
}

/* ===================== APP ===================== */
export default function AppShell() {
  const location = useLocation();
  const page = PATH_TO_PAGE[location.pathname] || "home";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div style={{ position: "relative", background: C.bg, overflowX: "hidden" }}>
      <NetworkCanvas />
      <FloatingOrbs />
      <CursorGlow />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav page={page} />
        <main>{renderPage(page)}</main>
        <Footer />
      </div>
    </div>
  );
}
