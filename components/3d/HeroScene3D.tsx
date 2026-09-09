"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WebGLFallback } from "./WebGLFallback";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowRight, CheckCircle2, Home, MapPin, Rotate3D, Wrench, X } from "lucide-react";

interface HeroScene3DProps {
  onSelectCategory?: (serviceId: string) => void;
  onBookClick?: (serviceId?: string) => void;
}

type Room = "outside" | "living" | "kitchen" | "bedroom" | "bathroom" | "roof" | "garden";

const rooms: Record<Room, { en: string; hi: string; pos: [number, number, number]; look: [number, number, number] }> = {
  outside: { en: "Outside", hi: "बाहर", pos: [8.8, 7.2, 11.5], look: [0, 2, 0] },
  living: { en: "Living Room", hi: "बैठक", pos: [-0.2, 2.15, 4.6], look: [-0.5, 1.55, 0] },
  kitchen: { en: "Kitchen", hi: "रसोई", pos: [2.4, 1.75, 0.8], look: [1.55, 1, -1.2] },
  bedroom: { en: "Bedroom", hi: "सोने का कमरा", pos: [-2.35, 4.25, -0.1], look: [-2.1, 3.55, -1.2] },
  bathroom: { en: "Bathroom", hi: "बाथरूम", pos: [2.4, 1.35, 3.8], look: [2.25, 0.6, 1.45] },
  roof: { en: "Roof", hi: "छत", pos: [2.8, 8.4, 7.2], look: [0, 5.7, 0] },
  garden: { en: "Garden & Farm", hi: "बगीचा और खेत", pos: [-5.2, 2.4, 6.8], look: [-5, 0.8, 1.7] },
};

const targetInfo: Record<string, { en: string; hi: string; emoji: string; service: string; problem: string; problemHi: string }> = {
  tap: { en: "Tap / Pipe", hi: "नल / पाइप", emoji: "🚰", service: "plumber", problem: "Water leaking or tap not working?", problemHi: "पानी लीक हो रहा है या नल काम नहीं कर रहा?" },
  kitchen: { en: "Kitchen", hi: "रसोई", emoji: "🍳", service: "electrician", problem: "Kitchen appliance or wiring problem?", problemHi: "रसोई के सामान या बिजली में दिक्कत?" },
  toilet: { en: "Bathroom / Toilet", hi: "बाथरूम / टॉयलेट", emoji: "🚿", service: "plumber", problem: "Water, flush or bathroom problem?", problemHi: "पानी, फ्लश या बाथरूम में दिक्कत?" },
  bed: { en: "Bedroom / Furniture", hi: "कमरा / फर्नीचर", emoji: "🛏️", service: "carpenter", problem: "Furniture, bed or door needs fixing?", problemHi: "फर्नीचर, बेड या दरवाजा ठीक करवाना है?" },
  electrician: { en: "Fan / Wiring", hi: "पंखा / बिजली", emoji: "💡", service: "electrician", problem: "Fan, switch or wiring problem?", problemHi: "पंखा, स्विच या वायरिंग में दिक्कत?" },
  "ac-repair": { en: "AC", hi: "एसी", emoji: "❄️", service: "ac-repair", problem: "AC not cooling or making noise?", problemHi: "एसी ठंडा नहीं कर रहा या आवाज़ कर रहा?" },
  mechanic: { en: "Car / Bike", hi: "गाड़ी / बाइक", emoji: "🔧", service: "mechanic", problem: "Vehicle not starting or needs service?", problemHi: "गाड़ी स्टार्ट नहीं हो रही या सर्विस चाहिए?" },
  tractor: { en: "Khet / Tractor", hi: "खेत / ट्रैक्टर", emoji: "🚜", service: "mechanic", problem: "Tractor or farm equipment problem?", problemHi: "ट्रैक्टर या खेती के सामान में दिक्कत?" },
  tank: { en: "Water Tank", hi: "पानी की टंकी", emoji: "💧", service: "plumber", problem: "Tank, pipe or water pressure problem?", problemHi: "टंकी, पाइप या पानी के प्रेशर में दिक्कत?" },
  garden: { en: "Garden", hi: "बगीचा", emoji: "🌳", service: "gardener", problem: "Garden maintenance needed?", problemHi: "बगीचे की देखभाल करवानी है?" },
};

export function HeroScene3D({ onSelectCategory, onBookClick }: HeroScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeTarget, setActiveTarget] = useState("tap");
  const [room, setRoom] = useState<Room>("outside");
  const [selectedTarget, setSelectedTarget] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);
  const { lang } = useI18n();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  useEffect(() => {
    const testCanvas = document.createElement("canvas");
    if (!(testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))) { setWebglSupported(false); return; }
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 620;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(...rooms[room].pos);
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
    const warm = new THREE.PointLight(0xffa13c, isDark ? 3.2 : 1.8, 12); warm.position.set(0, 3, 3); scene.add(warm);

    const property = new THREE.Group(); scene.add(property);
    const mat = (color: number, roughness = 0.7, metalness = 0) => new THREE.MeshStandardMaterial({ color, roughness, metalness });
    const wallMat = mat(isDark ? 0x334155 : 0xf5f1e8);
    const floorMat = mat(isDark ? 0x1e293b : 0xd8c5a6);
    const woodMat = mat(0x9a4d1d, 0.65);
    const roofMat = mat(0xd97706, 0.58);
    const greenMat = mat(0x15803d, 0.9);
    const glassMat = new THREE.MeshStandardMaterial({ color: 0x60a5fa, roughness: 0.15, metalness: 0.15, transparent: true, opacity: 0.55 });
    const box = (sx: number, sy: number, sz: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = property) => {
      const m = new THREE.Mesh(new THREE.BoxGeometry(sx, sy, sz), material); m.position.set(x, y, z); m.castShadow = true; m.receiveShadow = true; parent.add(m); return m;
    };
    const targetMeshes: { mesh: THREE.Object3D; id: string }[] = [];
    const addTarget = (mesh: THREE.Object3D, id: string) => { mesh.userData.target = id; targetMeshes.push({ mesh, id }); return mesh; };

    const base = new THREE.Mesh(new THREE.BoxGeometry(15, 0.35, 11), mat(isDark ? 0x0f172a : 0xc8b89a)); base.position.y = -0.2; base.receiveShadow = true; property.add(base);
    box(4.6, 0.12, 3.4, mat(isDark ? 0x14532d : 0x86b85b), -5, 0.03, 1.7);
    box(4, 0.12, 4.2, mat(isDark ? 0x365314 : 0x84a83e), 5.1, 0.03, -2.6);
    for (let r = -1.4; r <= 1.4; r += 0.7) for (let c = -1.5; c <= 1.5; c += 0.65) box(0.08, 0.28, 0.08, greenMat, 5.1 + c, 0.22, -2.6 + r);
    const tree = (x: number, z: number, scale = 1) => { box(0.18 * scale, 0.9 * scale, 0.18 * scale, woodMat, x, 0.45 * scale, z); const crown = new THREE.Mesh(new THREE.IcosahedronGeometry(0.55 * scale, 1), greenMat); crown.position.set(x, 1.25 * scale, z); crown.castShadow = true; property.add(crown); };
    tree(-6.1, 0, 1.25); tree(-4.7, 3, 0.75); tree(6.4, 1.6, 0.95);

    const house = new THREE.Group(); house.position.set(0, 0, -0.6); property.add(house);
    const hbox = (sx: number, sy: number, sz: number, material: THREE.Material, x: number, y: number, z: number) => box(sx, sy, sz, material, x, y, z, house);
    hbox(7, 0.18, 5, floorMat, 0, 0.1, 0); hbox(7, 0.18, 5, floorMat, 0, 3.15, 0);
    [[0.12,2.9,4.8,-1.05,1.55,0],[3.2,2.9,0.12,1.55,1.55,0],[0.12,2.9,4.8,0,1.55,-0.45]].forEach(([sx,sy,sz,x,y,z]) => hbox(sx,sy,sz,wallMat,x,y,z));
    hbox(1.5, 2.9, 0.14, wallMat, -2.7, 1.55, 2.45); hbox(1.6, 2.9, 0.14, wallMat, 2.7, 1.55, 2.45);
    hbox(0.12, 2.7, 4.8, wallMat, -1.05, 4.5, 0); hbox(3.2, 2.7, 0.12, wallMat, 1.55, 4.5, -0.6); hbox(1.3, 2.7, 0.12, wallMat, 2.55, 4.5, 1.8);
    const roof = new THREE.Mesh(new THREE.ConeGeometry(5, 1.45, 4), roofMat); roof.position.set(0, 6.25, -0.1); roof.rotation.y = Math.PI / 4; roof.castShadow = true; house.add(roof);
    const tank = addTarget(new THREE.Mesh(new THREE.CylinderGeometry(0.75,0.75,1.25,16), mat(0x94a3b8,0.35,0.6)), "tank"); tank.position.set(-1.6,7.05,-0.3); house.add(tank);
    hbox(1.8,0.08,1,mat(0x172554,0.2,0.5),1.3,6.75,-0.4);
    hbox(1,1.9,0.14,woodMat,0,1.05,2.55); [-2.2,2.2].forEach(x=>hbox(1,1,0.08,glassMat,x,1.55,2.55));

    addTarget(box(1.55,0.35,2.2,mat(0xe5e7eb),-2.1,3.48,-1.2,house),"bed");
    addTarget(box(1.2,0.08,0.55,woodMat,-2.1,3.85,-2.1,house),"bed");
    addTarget(box(2.3,0.8,0.65,woodMat,1.55,0.55,-1.7,house),"kitchen");
    addTarget(box(0.55,0.55,0.55,mat(0xe2e8f0,0.25,0.3),1.1,1.2,-1.7,house),"kitchen");
    addTarget(box(0.7,1,0.55,mat(0x334155,0.35,0.3),2.55,0.65,-1.7,house),"kitchen");
    addTarget(box(1.8,0.55,0.75,mat(0x64748b),-2,0.48,1,house),"bed");
    const toilet = addTarget(new THREE.Mesh(new THREE.CylinderGeometry(0.3,0.35,0.5,12),mat(0xf8fafc,0.25)),"toilet"); toilet.position.set(2.25,0.4,1.45); house.add(toilet);
    const fan = addTarget(new THREE.Mesh(new THREE.CylinderGeometry(0.45,0.45,0.06,12),mat(0x64748b,0.35,0.6)),"electrician"); fan.position.set(-1.8,2.95,0.4); house.add(fan);
    addTarget(hbox(0.85,0.45,0.28,mat(0xf1f5f9,0.25),2.15,5,2.35),"ac-repair");
    addTarget(box(0.12,0.55,0.12,mat(0x94a3b8,0.25,0.7),-4,0.45,1),"tap");
    addTarget(box(0.65,0.5,0.5,mat(0x0f766e,0.4,0.3),-5.3,0.35,3.1),"tap");
    addTarget(box(1.8,0.55,2.8,mat(0x0284c7,0.35,0.1),4.5,0.7,2),"mechanic");
    addTarget(box(0.5,0.75,1.3,mat(0xdc2626,0.4),6.5,0.55,2.7),"mechanic");
    addTarget(box(1.2,0.65,1.7,mat(0x16a34a,0.55),6.1,0.55,-4.1),"tractor");
    const gardenTarget = addTarget(new THREE.Mesh(new THREE.SphereGeometry(0.35,16,16),greenMat),"garden"); gardenTarget.position.set(-5,0.7,1.7); property.add(gardenTarget);

    const labels = new THREE.Group(); property.add(labels);
    const raycaster = new THREE.Raycaster(); const pointer = new THREE.Vector2(); let dragging = false; let previousX = 0; let rotation = 0;
    const highlight = (id: string | null) => {
      setHoveredTarget(id);
      targetMeshes.forEach(({ mesh }) => mesh.traverse(o => { if (o instanceof THREE.Mesh) { const materials = Array.isArray(o.material) ? o.material : [o.material]; materials.forEach(m => { const sm = m as THREE.MeshStandardMaterial; if (sm.emissive) { sm.emissive.set(id && mesh.userData.target === id ? 0xff6b2b : 0x000000); sm.emissiveIntensity = id && mesh.userData.target === id ? 0.5 : 0; } }); } }));
    };
    const getTarget = () => {
      const hits = raycaster.intersectObjects(property.children, true);
      for (const hit of hits) { let node: THREE.Object3D | null = hit.object; while (node && !node.userData.target) node = node.parent; if (node?.userData.target && targetInfo[node.userData.target]) return node.userData.target as string; }
      return null;
    };
    const pointerPosition = (e: MouseEvent) => { const rect = renderer.domElement.getBoundingClientRect(); pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1; pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1; raycaster.setFromCamera(pointer, camera); };
    const move = (e: MouseEvent) => { if (dragging) { rotation += (e.clientX - previousX) * 0.006; previousX = e.clientX; return; } pointerPosition(e); highlight(getTarget()); };
    const pick = (e: MouseEvent) => { pointerPosition(e); const id = getTarget(); if (id) { setActiveTarget(id); setSelectedTarget(id); } };
    const down = (e: PointerEvent) => { dragging = true; previousX = e.clientX; };
    const up = () => { dragging = false; };
    const canvas = renderer.domElement;
    canvas.addEventListener("pointerdown",down); canvas.addEventListener("pointerup",up); canvas.addEventListener("pointerleave",up); canvas.addEventListener("mousemove",move); canvas.addEventListener("click",pick);
    const resize = () => { const w=container.clientWidth,h=container.clientHeight||620; camera.aspect=w/h; camera.updateProjectionMatrix(); renderer.setSize(w,h); };
    window.addEventListener("resize",resize);
    const clock = new THREE.Clock(); let raf=0;
    const animate = () => { raf=requestAnimationFrame(animate); const elapsed=clock.getElapsedTime(); if(!dragging) rotation += 0.0005; property.rotation.y += (rotation-property.rotation.y)*0.045; const destination=rooms[room]; camera.position.lerp(new THREE.Vector3(...destination.pos),0.055); camera.lookAt(new THREE.Vector3(...destination.look)); warm.intensity=(isDark?3:1.7)+Math.sin(elapsed*2)*0.18; renderer.render(scene,camera); };
    animate();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize",resize); canvas.removeEventListener("pointerdown",down); canvas.removeEventListener("pointerup",up); canvas.removeEventListener("pointerleave",up); canvas.removeEventListener("mousemove",move); canvas.removeEventListener("click",pick); renderer.dispose(); if(container.contains(canvas)) container.removeChild(canvas); };
  }, [isDark, room]);

  if (!webglSupported) return <WebGLFallback />;
  const active = targetInfo[activeTarget] || targetInfo.tap;
  const roomList: Room[] = ["outside","living","kitchen","bedroom","bathroom","roof","garden"];
  return <div className="relative h-[540px] md:h-[660px] w-full overflow-hidden rounded-[2rem] border border-slate-200/70 bg-gradient-to-b from-sky-50 via-white to-emerald-50 dark:border-slate-800 dark:from-[#08111f] dark:via-[#0b1325] dark:to-[#0a1715] select-none">
    <div ref={mountRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />
    <div className="absolute left-4 top-4 z-30 flex max-w-[calc(100%-2rem)] gap-2 overflow-x-auto pb-1">
      {roomList.map(r=><button key={r} onClick={()=>setRoom(r)} className={`shrink-0 rounded-xl px-3 py-2 text-xs font-black shadow-lg backdrop-blur ${room===r?"bg-brand-orange text-white":"bg-white/90 text-slate-800 dark:bg-slate-900/90 dark:text-white"}`}>{r==="outside"?<Home className="mr-1 inline h-3.5 w-3.5"/>:<MapPin className="mr-1 inline h-3.5 w-3.5"/>}{lang==="en"?rooms[r].en:rooms[r].hi}</button>)}
    </div>
    <div className="absolute right-4 top-16 z-30 rounded-xl bg-slate-950/70 px-3 py-2 text-[11px] font-bold text-white shadow-lg backdrop-blur">{lang==="en"?"Click any item • enter a room • repair it":"किसी चीज़ पर क्लिक करें • कमरे में जाएँ • मरम्मत करवाएँ"}</div>
    {hoveredTarget&&<div className="absolute left-1/2 top-20 z-30 -translate-x-1/2 rounded-full bg-white/95 px-4 py-2 text-xs font-black text-slate-800 shadow-xl dark:bg-slate-900/95 dark:text-white">{targetInfo[hoveredTarget]?.emoji} {lang==="en"?targetInfo[hoveredTarget]?.en:targetInfo[hoveredTarget]?.hi}</div>}
    {selectedTarget&&<div className="absolute left-1/2 top-1/2 z-40 w-[min(92%,390px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-slate-950/90 p-5 text-white shadow-2xl backdrop-blur-xl">
      <button onClick={()=>setSelectedTarget(null)} className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-white/10 hover:text-white"><X className="h-4 w-4"/></button>
      <div className="flex items-center gap-3"><div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-orange/20 text-3xl">{targetInfo[selectedTarget].emoji}</div><div><div className="text-lg font-black">{lang==="en"?targetInfo[selectedTarget].en:targetInfo[selectedTarget].hi}</div><div className="text-xs text-emerald-300">{lang==="en"?targetInfo[selectedTarget].problem:targetInfo[selectedTarget].problemHi}</div></div></div>
      <div className="mt-4 grid grid-cols-2 gap-2"><button onClick={()=>{onSelectCategory?.(targetInfo[selectedTarget].service);setSelectedTarget(null);}} className="rounded-xl bg-brand-orange px-3 py-3 text-sm font-black">{lang==="en"?"Find Kaamigar":"कामिगार ढूंढें"}</button><button onClick={()=>{onBookClick?.(targetInfo[selectedTarget].service);setSelectedTarget(null);}} className="rounded-xl border border-white/15 bg-white/10 px-3 py-3 text-sm font-black">{lang==="en"?"Book now":"अभी बुक करें"}</button></div>
    </div>}
    <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/80 p-3 text-white shadow-2xl backdrop-blur-xl md:left-6 md:right-6">
      <div className="flex min-w-0 items-center gap-3"><div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/20 text-xl">{active.emoji}</div><div className="min-w-0"><div className="truncate text-sm font-black">{lang==="en"?active.en:active.hi}</div><div className="mt-0.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-300"><CheckCircle2 className="h-3 w-3"/>{lang==="en"?"Click an object to find the right worker":"चीज़ पर क्लिक करें — सही कामिगार ढूंढें"}</div></div></div>
      <button onClick={()=>onBookClick?.(active.service)} className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-black text-white shadow-lg hover:bg-orange-600"><Wrench className="h-3.5 w-3.5"/>{lang==="en"?"Repair / Book":"मरम्मत / बुक करें"}<ArrowRight className="h-3.5 w-3.5"/></button>
    </div>
    <div className="absolute bottom-[88px] right-4 z-20 hidden rounded-full bg-white/85 px-3 py-1.5 text-[10px] font-bold text-slate-700 shadow-lg backdrop-blur sm:flex dark:bg-slate-900/80 dark:text-slate-200"><Rotate3D className="mr-1 inline h-3 w-3"/>{lang==="en"?"Drag to rotate • click objects":"घुमाकर देखें • चीज़ों पर क्लिक करें"}</div>
  </div>;
}
