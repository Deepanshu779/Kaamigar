"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WebGLFallback } from "./WebGLFallback";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowRight, CheckCircle2, Home, Rotate3D, Wrench, X } from "lucide-react";

interface HeroScene3DProps {
  onSelectCategory?: (serviceId: string) => void;
  onBookClick?: (serviceId?: string) => void;
}

type ViewMode = "outside" | "inside";

type InteractiveTarget = {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  service: string;
  hint: string;
  hindiHint: string;
  position: THREE.Vector3;
};

const TARGETS: InteractiveTarget[] = [
  { id: "tap", name: "Tap / Pipe", hindiName: "नल / पाइप", emoji: "🚰", service: "plumber", hint: "Leakage, tap or pipe problem", hindiHint: "नल टपक रहा है या पाइप की दिक्कत", position: new THREE.Vector3(-4, 0.8, 1) },
  { id: "kitchen", name: "Kitchen", hindiName: "रसोई", emoji: "🍳", service: "electrician", hint: "Kitchen appliance or wiring", hindiHint: "किचन का सामान या बिजली की दिक्कत", position: new THREE.Vector3(1.55, 1, -1.7) },
  { id: "toilet", name: "Bathroom / Toilet", hindiName: "बाथरूम / टॉयलेट", emoji: "🚿", service: "plumber", hint: "Flush, tap or bathroom pipe", hindiHint: "फ्लश, नल या बाथरूम पाइप की दिक्कत", position: new THREE.Vector3(2.25, 0.9, 1.45) },
  { id: "bed", name: "Bedroom / Furniture", hindiName: "कमरा / फर्नीचर", emoji: "🛏️", service: "carpenter", hint: "Bed, door or furniture repair", hindiHint: "बेड, दरवाजा या फर्नीचर की मरम्मत", position: new THREE.Vector3(-2.1, 3.5, -1.2) },
  { id: "fan", name: "Fan / Wiring", hindiName: "पंखा / बिजली", emoji: "💡", service: "electrician", hint: "Fan, switch or wiring problem", hindiHint: "पंखा, स्विच या वायरिंग की दिक्कत", position: new THREE.Vector3(-1.8, 2.95, 0.4) },
  { id: "ac", name: "AC", hindiName: "एसी", emoji: "❄️", service: "ac-repair", hint: "AC cooling or service problem", hindiHint: "एसी ठंडा नहीं कर रहा या सर्विस चाहिए", position: new THREE.Vector3(2.15, 5, 2.35) },
  { id: "vehicle", name: "Car / Bike", hindiName: "गाड़ी / बाइक", emoji: "🔧", service: "mechanic", hint: "Vehicle repair or breakdown", hindiHint: "गाड़ी खराब है या स्टार्ट नहीं हो रही", position: new THREE.Vector3(4.7, 1, 2.3) },
  { id: "tractor", name: "Khet / Tractor", hindiName: "खेत / ट्रैक्टर", emoji: "🚜", service: "mechanic", hint: "Tractor or farm equipment", hindiHint: "ट्रैक्टर या खेती के उपकरण की दिक्कत", position: new THREE.Vector3(6.1, 0.9, -4.1) },
  { id: "tank", name: "Water Tank", hindiName: "पानी की टंकी", emoji: "💧", service: "plumber", hint: "Tank, water pressure or pipe", hindiHint: "टंकी, पानी का प्रेशर या पाइप की दिक्कत", position: new THREE.Vector3(-1.6, 7.4, -0.3) },
  { id: "garden", name: "Garden", hindiName: "बगीचा", emoji: "🌳", service: "gardener", hint: "Garden maintenance", hindiHint: "बगीचे की देखभाल", position: new THREE.Vector3(-5, 0.7, 1.7) },
];

export function HeroScene3D({ onSelectCategory, onBookClick }: HeroScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeTarget, setActiveTarget] = useState<InteractiveTarget>(TARGETS[0]);
  const [hoveredTarget, setHoveredTarget] = useState<InteractiveTarget | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("outside");
  const [showGuide, setShowGuide] = useState(true);
  const { lang } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) { setWebglSupported(false); return; }
    } catch { setWebglSupported(false); return; }

    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 620;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    const outsidePosition = new THREE.Vector3(8.8, 7.2, 11.5);
    const insidePosition = new THREE.Vector3(0.2, 3.0, 9.5);
    camera.position.copy(viewMode === "inside" ? insidePosition : outsidePosition);
    camera.lookAt(0, 1.7, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = isDark ? 1.15 : 1.25;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(isDark ? 0x7890b8 : 0xfff4e8, isDark ? 1.9 : 2.4));
    const sun = new THREE.DirectionalLight(isDark ? 0x8fb8ff : 0xffe1bc, isDark ? 1.5 : 2.5);
    sun.position.set(7, 13, 8); sun.castShadow = true; sun.shadow.mapSize.set(1024, 1024); scene.add(sun);
    const warm = new THREE.PointLight(0xffa13c, isDark ? 3.2 : 1.8, 10);
    warm.position.set(0, 2.6, 2.5); scene.add(warm);

    const property = new THREE.Group(); scene.add(property);
    const mat = (color: number, roughness = 0.7, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const wallMat = mat(isDark ? 0x334155 : 0xf5f1e8);
    const floorMat = mat(isDark ? 0x1e293b : 0xd8c5a6);
    const woodMat = mat(0x9a4d1d, 0.65);
    const roofMat = mat(0xd97706, 0.58);
    const greenMat = mat(0x15803d, 0.9);
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.15, metalness: 0.15, transparent: true, opacity: 0.55 });

    const box = (sx: number, sy: number, sz: number, material: THREE.Material, x: number, y: number, z: number, cast = true) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material);
      mesh.position.set(x, y, z); mesh.castShadow = cast; mesh.receiveShadow = true; property.add(mesh); return mesh;
    };

    // Property: courtyard, garden and farm.
    const base = new THREE.Mesh(new THREE.BoxGeometry(15, 0.35, 11), mat(isDark ? 0x0f172a : 0xc8b89a));
    base.position.y = -0.2; base.receiveShadow = true; property.add(base);
    box(4.6, 0.12, 3.4, mat(isDark ? 0x14532d : 0x86b85b), -5, 0.03, 1.7, false);
    box(4, 0.12, 4.2, mat(isDark ? 0x365314 : 0x84a83e), 5.1, 0.03, -2.6, false);
    for (let r = -1.4; r <= 1.4; r += 0.7) for (let c = -1.5; c <= 1.5; c += 0.65) {
      const crop = new THREE.Mesh(new THREE.ConeGeometry(0.08, 0.28, 6), greenMat);
      crop.position.set(5.1 + c, 0.23, -2.6 + r); crop.castShadow = true; property.add(crop);
    }

    const tree = (x: number, z: number, scale = 1) => {
      box(0.18 * scale, 0.9 * scale, 0.18 * scale, woodMat, x, 0.45 * scale, z);
      const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * scale, 1), greenMat);
      crown.position.set(x, 1.25 * scale, z); crown.castShadow = true; property.add(crown);
    };
    tree(-6.1, 0, 1.25); tree(-4.7, 3, 0.75); tree(6.4, 1.6, 0.95);

    // Open cutaway home with rooms.
    const house = new THREE.Group(); house.position.set(0, 0, -0.6); property.add(house);
    const addHouse = (mesh: THREE.Mesh) => { mesh.castShadow = true; mesh.receiveShadow = true; house.add(mesh); return mesh; };
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(7, 0.18, 5), floorMat)).position.set(0, 0.1, 0);
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(7, 0.18, 5), floorMat)).position.set(0, 3.15, 0);

    const partitions = [
      [0.12, 2.9, 4.8, -1.05, 1.55, 0], [3.2, 2.9, 0.12, 1.55, 1.55, 0], [0.12, 2.9, 4.8, 0, 1.55, -0.45],
    ];
    partitions.forEach(([sx, sy, sz, x, y, z]) => addHouse(new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), wallMat)).position.set(x, y, z));
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(1.5, 2.9, 0.14), wallMat)).position.set(-2.7, 1.55, 2.45);
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.9, 0.14), wallMat)).position.set(2.7, 1.55, 2.45);
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(0.12, 2.7, 4.8), wallMat)).position.set(-1.05, 4.5, 0);
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(3.2, 2.7, 0.12), wallMat)).position.set(1.55, 4.5, -0.6);
    addHouse(new THREE.Mesh(new THREE.BoxGeometry(1.3, 2.7, 0.12), wallMat)).position.set(2.55, 4.5, 1.8);

    const roof = new THREE.Mesh(new THREE.ConeGeometry(5, 1.45, 4), roofMat);
    roof.position.set(0, 6.25, -0.1); roof.rotation.y = Math.PI / 4; roof.castShadow = true; house.add(roof);
    const tank = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.25, 16), mat(0x94a3b8, 0.35, 0.6));
    tank.position.set(-1.6, 7.05, -0.3); tank.castShadow = true; tank.userData.targetId = "tank"; house.add(tank);
    const tankTop = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.2, 12), mat(0x64748b, 0.3, 0.7));
    tankTop.position.set(-1.6, 7.72, -0.3); tankTop.userData.targetId = "tank"; house.add(tankTop);
    const solar = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.08, 1), mat(0x172554, 0.2, 0.5));
    solar.position.set(1.3, 6.75, -0.4); solar.rotation.x = -0.25; solar.userData.targetId = "electrician"; house.add(solar);

    box(1, 1.9, 0.14, woodMat, 0, 1.05, 2.55);
    [-2.2, 2.2].forEach(x => box(1, 1, 0.08, glassMat, x, 1.55, 2.55, false));
    box(3.2, 0.12, 1, woodMat, 1.9, 3.35, 2.8);
    for (let x = 0.5; x <= 3.3; x += 0.45) box(0.06, 0.9, 0.06, mat(0x475569, 0.3, 0.5), x, 3.75, 3.2, false);

    // Repairable home objects carry a targetId. Clicking them is the main interaction.
    const targetMesh = (targetId: string, mesh: THREE.Mesh) => { mesh.userData.targetId = targetId; return mesh; };
    targetMesh("bed", box(1.55, 0.35, 2.2, mat(0xe5e7eb), -2.1, 3.48, -1.2));
    targetMesh("bed", box(1.2, 0.08, 0.55, woodMat, -2.1, 3.85, -2.1));
    targetMesh("kitchen", box(2.3, 0.8, 0.65, woodMat, 1.55, 0.55, -1.7));
    targetMesh("kitchen", box(0.55, 0.55, 0.55, mat(0xe2e8f0, 0.25, 0.3), 1.1, 1.2, -1.7));
    targetMesh("kitchen", box(0.7, 1, 0.55, mat(0x334155, 0.35, 0.3), 2.55, 0.65, -1.7));
    targetMesh("bed", box(1.8, 0.55, 0.75, mat(0x64748b), -2, 0.48, 1));

    const toilet = targetMesh("toilet", new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.35, 0.5, 12), mat(0xf8fafc, 0.25)));
    toilet.position.set(2.25, 0.4, 1.45); property.add(toilet);
    const shower = targetMesh("toilet", new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 1, 8), mat(0x94a3b8, 0.25, 0.7)));
    shower.position.set(1.8, 1.1, 1.45); property.add(shower);
    const fan = targetMesh("fan", new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.06, 12), mat(0x64748b, 0.35, 0.6)));
    fan.position.set(-1.8, 2.95, 0.4); house.add(fan);
    targetMesh("ac", box(0.85, 0.45, 0.28, mat(0xf1f5f9, 0.25), 2.15, 5, 2.35));

    const tap = targetMesh("tap", box(0.12, 0.55, 0.12, mat(0x94a3b8, 0.25, 0.7), -4, 0.45, 1));
    const pump = targetMesh("tap", box(0.65, 0.5, 0.5, mat(0x0f766e, 0.4, 0.3), -5.3, 0.35, 3.1));
    void tap; void pump;

    // Garage, car, bike and tractor.
    box(2.7, 1.8, 2.2, mat(isDark ? 0x1e293b : 0xd6d3d1), 4.5, 0.9, 2.5);
    targetMesh("vehicle", box(1.8, 0.55, 2.8, mat(0x0284c7, 0.35, 0.1), 4.5, 0.7, 2));
    for (const z of [1.1, 2.9]) {
      const wheel = targetMesh("vehicle", new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.18, 16), mat(0x111827, 0.9)));
      wheel.rotation.z = Math.PI / 2; wheel.position.set(4.5, 0.35, z); property.add(wheel);
    }
    targetMesh("vehicle", box(0.5, 0.75, 1.3, mat(0xdc2626, 0.4), 6.5, 0.55, 2.7));
    targetMesh("tractor", box(1.2, 0.65, 1.7, mat(0x16a34a, 0.55), 6.1, 0.55, -4.1));
    [5.45, 6.75].forEach(x => {
      const wheel = targetMesh("tractor", new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.18, 14), mat(0x111827, 0.9)));
      wheel.rotation.z = Math.PI / 2; wheel.position.set(x, 0.38, -4.1); property.add(wheel);
    });

    // Invisible hit markers make small objects easy to select without changing the visual design.
    const hitMeshes: THREE.Mesh[] = [];
    TARGETS.forEach(target => {
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(0.34, 12, 12),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false })
      );
      hit.position.copy(target.position); hit.userData.targetId = target.id; property.add(hit); hitMeshes.push(hit);
    });

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let isDragging = false;
    let previousX = 0;
    let targetRotation = 0;
    let pointerDownX = 0;

    const findTarget = (id?: string) => TARGETS.find(t => t.id === id) || null;
    const getTargetAtPointer = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const hits = raycaster.intersectObjects(property.children, true);
      for (const hit of hits) {
        let node: THREE.Object3D | null = hit.object;
        while (node && !node.userData.targetId) node = node.parent;
        const found = findTarget(node?.userData.targetId as string | undefined);
        if (found) return found;
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => { isDragging = false; pointerDownX = e.clientX; previousX = e.clientX; };
    const onPointerMove = (e: PointerEvent) => {
      const dx = e.clientX - previousX;
      if (Math.abs(e.clientX - pointerDownX) > 4) isDragging = true;
      if (isDragging) { targetRotation += dx * 0.006; previousX = e.clientX; }
      const target = getTargetAtPointer(e);
      setHoveredTarget(target);
      renderer.domElement.style.cursor = target ? "pointer" : isDragging ? "grabbing" : "grab";
    };
    const onPointerUp = () => { isDragging = false; };
    const onClick = (e: PointerEvent) => {
      if (Math.abs(e.clientX - pointerDownX) > 6) return;
      const target = getTargetAtPointer(e);
      if (!target) return;
      setActiveTarget(target);
      onSelectCategory?.(target.service);
    };

    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerUp);
    canvas.addEventListener("click", onClick);

    const onResize = () => {
      const w = container.clientWidth; const h = container.clientHeight || 620;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      if (!isDragging) targetRotation += 0.0008;
      property.rotation.y += (targetRotation - property.rotation.y) * 0.055;
      const desired = viewMode === "inside" ? insidePosition : outsidePosition;
      camera.position.lerp(desired, 0.045);
      camera.lookAt(viewMode === "inside" ? new THREE.Vector3(0, 2.5, 0) : new THREE.Vector3(0, 2, 0));
      warm.intensity = (isDark ? 3 : 1.7) + Math.sin(elapsed * 2) * 0.18;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf); window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown); canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp); canvas.removeEventListener("pointerleave", onPointerUp); canvas.removeEventListener("click", onClick);
      renderer.dispose(); if (container.contains(canvas)) container.removeChild(canvas);
    };
  }, [isDark, viewMode, onSelectCategory]);

  if (!webglSupported) return <WebGLFallback />;
  const displayTarget = hoveredTarget || activeTarget;

  return (
    <div className="relative h-[520px] md:h-[640px] w-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-sky-50 via-white to-emerald-50 dark:border-slate-800 dark:from-[#08111f] dark:via-[#0b1325] dark:to-[#0a1715] select-none">
      <div ref={mountRef} className="absolute inset-0" />

      <div className="absolute left-4 top-4 z-30 flex gap-2">
        <button onClick={() => setViewMode("outside")} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black shadow-lg backdrop-blur ${viewMode === "outside" ? "bg-brand-orange text-white" : "bg-white/90 text-slate-800 dark:bg-slate-900/90 dark:text-white"}`}>
          <Home className="h-3.5 w-3.5" /> {lang === "en" ? "Outside" : "बाहर"}
        </button>
        <button onClick={() => setViewMode("inside")} className={`flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-black shadow-lg backdrop-blur ${viewMode === "inside" ? "bg-brand-orange text-white" : "bg-white/90 text-slate-800 dark:bg-slate-900/90 dark:text-white"}`}>
          <Rotate3D className="h-3.5 w-3.5" /> {lang === "en" ? "Enter Home" : "घर के अंदर"}
        </button>
      </div>

      <div className="absolute right-4 top-4 z-30 max-w-[280px] rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur">
        {hoveredTarget
          ? (lang === "en" ? `Click ${hoveredTarget.name} to repair` : `${hoveredTarget.hindiName} पर क्लिक करके मरम्मत करवाएं`)
          : (lang === "en" ? "Click any real object • rotate to explore" : "किसी चीज़ पर क्लिक करें • घुमाकर घर देखें")}
      </div>

      {hoveredTarget && (
        <div className="absolute left-1/2 top-16 z-30 -translate-x-1/2 rounded-full border border-brand-orange/30 bg-white/95 px-3 py-1.5 text-xs font-black text-slate-800 shadow-xl backdrop-blur dark:bg-slate-900/95 dark:text-white">
          {hoveredTarget.emoji} {lang === "en" ? hoveredTarget.name : hoveredTarget.hindiName}
        </div>
      )}

      {showGuide && (
        <div className="absolute bottom-28 left-4 z-30 max-w-[285px] rounded-2xl border border-white/20 bg-slate-950/80 p-3 text-white shadow-xl backdrop-blur-md">
          <div className="flex items-start gap-2">
            <div className="rounded-xl bg-brand-orange/20 p-2 text-lg">👆</div>
            <div className="min-w-0">
              <div className="text-xs font-black">{lang === "en" ? "Your home is interactive" : "आपका घर interactive है"}</div>
              <p className="mt-1 text-[11px] leading-relaxed text-slate-300">{lang === "en" ? "Hover an object to highlight it. Click the thing that is broken and Kaamigar will take you to the right worker." : "जिस चीज़ में दिक्कत है उस पर जाएं और क्लिक करें। कामिगार सही कामगार तक ले जाएगा।"}</p>
            </div>
            <button onClick={() => setShowGuide(false)} className="text-slate-400 hover:text-white" aria-label="Close guide"><X className="h-4 w-4" /></button>
          </div>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 z-30 rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-white shadow-2xl backdrop-blur-xl md:left-6 md:right-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/20 text-xl">{displayTarget.emoji}</div>
            <div className="min-w-0">
              <div className="truncate text-sm font-black">{lang === "en" ? displayTarget.name : displayTarget.hindiName}</div>
              <div className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-300">
                <CheckCircle2 className="h-3 w-3" /> {lang === "en" ? displayTarget.hint : displayTarget.hindiHint}
              </div>
            </div>
          </div>
          <button onClick={() => onBookClick?.(displayTarget.service)} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-black text-white shadow-lg hover:bg-orange-600">
            <Wrench className="h-3.5 w-3.5" /> {lang === "en" ? "Find Worker" : "कामगार ढूंढें"} <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="absolute bottom-[92px] right-4 z-20 hidden rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow-lg backdrop-blur sm:flex dark:bg-slate-900/80 dark:text-slate-200">
        ↔ {lang === "en" ? "Drag to explore" : "घुमाकर देखें"}
      </div>
    </div>
  );
}
