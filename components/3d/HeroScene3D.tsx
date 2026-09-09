"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WebGLFallback } from "./WebGLFallback";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ArrowRight, CheckCircle2, Phone, Star } from "lucide-react";

interface HeroScene3DProps {
  onSelectCategory?: (serviceId: string) => void;
  onBookClick?: (serviceId?: string) => void;
}

interface Hotspot {
  id: string;
  name: string;
  hindiName: string;
  emoji: string;
  tagline: string;
  position: THREE.Vector3;
  screenPos: { x: number; y: number; visible: boolean };
}

export function HeroScene3D({ onSelectCategory, onBookClick }: HeroScene3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const [activeHotspot, setActiveHotspot] = useState<string>("plumber");
  const [hotspotPositions, setHotspotPositions] = useState<Record<string, { x: number; y: number; visible: boolean }>>({});
  const { lang, t } = useI18n();
  const { theme } = useTheme();

  const isDark = theme === "dark";

  useEffect(() => {
    // Check WebGL availability
    try {
      const canvas = document.createElement("canvas");
      const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
      if (!gl) {
        setWebglSupported(false);
        return;
      }
    } catch {
      setWebglSupported(false);
      return;
    }

    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight || 520;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    scene.background = null; // Transparent canvas to blend with page theme

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 7.5, 12.5);
    camera.lookAt(0, 1.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Lighting (Warm, friendly sunlight with soft ambient fill)
    const ambientLight = new THREE.AmbientLight(isDark ? 0x3b4c6e : 0xfff4e6, isDark ? 1.6 : 2.0);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(isDark ? 0x93c5fd : 0xffeedd, isDark ? 1.4 : 2.2);
    sunLight.position.set(8, 14, 8);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 30;
    sunLight.shadow.camera.left = -8;
    sunLight.shadow.camera.right = 8;
    sunLight.shadow.camera.top = 8;
    sunLight.shadow.camera.bottom = -8;
    sunLight.shadow.bias = -0.001;
    scene.add(sunLight);

    // Warm porch & window interior light
    const porchLight = new THREE.PointLight(0xffaa44, 2.5, 8);
    porchLight.position.set(0, 2.8, 1.2);
    scene.add(porchLight);

    // 3. Low-Poly Indian Home Group
    const houseGroup = new THREE.Group();
    scene.add(houseGroup);

    // Palette
    const colors = {
      wall: isDark ? 0x1e293b : 0xf8fafc,
      wallAccent: 0xfbbf24, // warm marigold / plaster
      roof: 0xd97706, // Terracotta orange tiles
      door: 0x92400e, // Rich teak wood
      ground: isDark ? 0x0f172a : 0xe2e8f0,
      scooter: 0x0284c7, // Indian classic sky blue
      plantGreen: 0x16a34a,
      toolYellow: 0xf59e0b,
      metal: 0x94a3b8,
      water: 0x38bdf8,
    };

    // --- Base Courtyard ---
    const groundGeo = new THREE.CylinderGeometry(6.5, 6.8, 0.4, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: colors.ground,
      roughness: 0.8,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.position.y = -0.2;
    ground.receiveShadow = true;
    houseGroup.add(ground);

    // Stepping stones path
    const stoneMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x334155 : 0xcbd5e1, roughness: 0.9 });
    for (let i = 0; i < 4; i++) {
      const stone = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.4, 0.08, 8), stoneMat);
      stone.position.set(0, 0.04, 1.6 + i * 0.7);
      stone.receiveShadow = true;
      houseGroup.add(stone);
    }

    // --- Main House Block ---
    const mainWallGeo = new THREE.BoxGeometry(4.6, 3.2, 3.4);
    const mainWallMat = new THREE.MeshStandardMaterial({ color: colors.wall, roughness: 0.7 });
    const mainWall = new THREE.Mesh(mainWallGeo, mainWallMat);
    mainWall.position.set(0, 1.6, -0.6);
    mainWall.castShadow = true;
    mainWall.receiveShadow = true;
    houseGroup.add(mainWall);

    // Warm terracotta sloped roof
    const roofGeo = new THREE.ConeGeometry(3.8, 1.4, 4);
    const roofMat = new THREE.MeshStandardMaterial({ color: colors.roof, roughness: 0.6 });
    const roof = new THREE.Mesh(roofGeo, roofMat);
    roof.position.set(0, 3.9, -0.6);
    roof.rotation.y = Math.PI / 4;
    roof.castShadow = true;
    houseGroup.add(roof);

    // Teak Front Door
    const doorGeo = new THREE.BoxGeometry(1.0, 2.0, 0.1);
    const doorMat = new THREE.MeshStandardMaterial({ color: colors.door, roughness: 0.5 });
    const door = new THREE.Mesh(doorGeo, doorMat);
    door.position.set(0, 1.0, 1.12);
    door.castShadow = true;
    houseGroup.add(door);

    // Brass door handle
    const handleGeo = new THREE.SphereGeometry(0.06, 8, 8);
    const handleMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.2 });
    const handle = new THREE.Mesh(handleGeo, handleMat);
    handle.position.set(0.35, 1.0, 1.2);
    houseGroup.add(handle);

    // Warm Window (Right side)
    const windowGeo = new THREE.BoxGeometry(0.9, 0.9, 0.08);
    const windowMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xf59e0b,
      emissiveIntensity: isDark ? 0.8 : 0.3,
      roughness: 0.3
    });
    const win = new THREE.Mesh(windowGeo, windowMat);
    win.position.set(1.4, 1.6, 1.12);
    houseGroup.add(win);

    // Window frame grill
    const grillMat = new THREE.MeshStandardMaterial({ color: 0x475569 });
    const grillV = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.9, 6), grillMat);
    grillV.position.set(1.4, 1.6, 1.17);
    houseGroup.add(grillV);

    // Porch overhang with two simple pillars
    const porchOverhang = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 0.15, 1.2),
      new THREE.MeshStandardMaterial({ color: colors.roof, roughness: 0.6 })
    );
    porchOverhang.position.set(0, 2.3, 1.6);
    porchOverhang.castShadow = true;
    houseGroup.add(porchOverhang);

    const pillarMat = new THREE.MeshStandardMaterial({ color: colors.wall, roughness: 0.7 });
    const pillarL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 2.3, 12), pillarMat);
    pillarL.position.set(-0.95, 1.15, 2.1);
    pillarL.castShadow = true;
    houseGroup.add(pillarL);

    const pillarR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 2.3, 12), pillarMat);
    pillarR.position.set(0.95, 1.15, 2.1);
    pillarR.castShadow = true;
    houseGroup.add(pillarR);

    // --- SERVICE VIGNETTES ---

    // 1. 🚰 PLUMBER VIGNETTE (Left Wall)
    const plumberGroup = new THREE.Group();
    plumberGroup.position.set(-2.4, 0, 0.4);
    houseGroup.add(plumberGroup);

    // Water pipe & tap
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
    const pipeV = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.2, 8), pipeMat);
    pipeV.position.set(0, 1.0, 0);
    plumberGroup.add(pipeV);

    const tap = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 8), pipeMat);
    tap.rotation.z = Math.PI / 2;
    tap.position.set(0.15, 1.3, 0);
    plumberGroup.add(tap);

    // Blue water bucket under tap
    const bucketGeo = new THREE.CylinderGeometry(0.24, 0.18, 0.45, 12);
    const bucketMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4 });
    const bucket = new THREE.Mesh(bucketGeo, bucketMat);
    bucket.position.set(0.25, 0.23, 0);
    bucket.castShadow = true;
    plumberGroup.add(bucket);

    // Red Plumber Pipe Wrench
    const wrenchHandle = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.5, 0.04),
      new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3 })
    );
    wrenchHandle.position.set(0.45, 0.3, 0.1);
    wrenchHandle.rotation.z = -0.5;
    wrenchHandle.castShadow = true;
    plumberGroup.add(wrenchHandle);

    // Animated water droplet
    const dropletGeo = new THREE.SphereGeometry(0.05, 8, 8);
    const dropletMat = new THREE.MeshStandardMaterial({ color: colors.water, roughness: 0.1, transparent: true, opacity: 0.85 });
    const droplet = new THREE.Mesh(dropletGeo, dropletMat);
    droplet.position.set(0.25, 1.2, 0);
    plumberGroup.add(droplet);

    // 2. 💡 ELECTRICIAN VIGNETTE (Wall Switchboard & Ceiling Fan)
    const elecGroup = new THREE.Group();
    elecGroup.position.set(0, 0, 0);
    houseGroup.add(elecGroup);

    // Switchboard on porch wall
    const board = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.45, 0.06),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
    );
    board.position.set(-0.65, 1.5, 1.14);
    elecGroup.add(board);

    // Red glowing indicator light
    const led = new THREE.Mesh(
      new THREE.SphereGeometry(0.03, 8, 8),
      new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xef4444, emissiveIntensity: 1 })
    );
    led.position.set(-0.65, 1.64, 1.18);
    elecGroup.add(led);

    // Electrician Yellow Tool Box
    const toolbox = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 0.3, 0.3),
      new THREE.MeshStandardMaterial({ color: colors.toolYellow, roughness: 0.4 })
    );
    toolbox.position.set(-0.8, 0.15, 1.8);
    toolbox.rotation.y = 0.25;
    toolbox.castShadow = true;
    elecGroup.add(toolbox);

    // 3. 🪚 CARPENTER VIGNETTE (Right Side Workbench & Tools)
    const carpGroup = new THREE.Group();
    carpGroup.position.set(2.4, 0, 0.8);
    houseGroup.add(carpGroup);

    // Sturdy wooden workbench
    const benchTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.12, 0.7),
      new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.7 })
    );
    benchTop.position.set(0, 0.75, 0);
    benchTop.castShadow = true;
    carpGroup.add(benchTop);

    // Bench legs
    const legMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    [-0.55, 0.55].forEach((lx) => {
      [-0.25, 0.25].forEach((lz) => {
        const leg = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.75, 0.08), legMat);
        leg.position.set(lx, 0.375, lz);
        leg.castShadow = true;
        carpGroup.add(leg);
      });
    });

    // Carpenter Saw & Hammer on table
    const sawBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.08, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    );
    sawBlade.position.set(0.2, 0.82, 0.1);
    sawBlade.rotation.y = 0.4;
    carpGroup.add(sawBlade);

    const hammerHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.35, 6),
      new THREE.MeshStandardMaterial({ color: 0x92400e })
    );
    hammerHandle.rotation.z = Math.PI / 2;
    hammerHandle.position.set(-0.25, 0.82, 0);
    carpGroup.add(hammerHandle);

    const hammerHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.12, 0.06, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 })
    );
    hammerHead.position.set(-0.4, 0.82, 0);
    carpGroup.add(hammerHead);

    // 4. 🛵 MECHANIC VIGNETTE (Everyday Indian Blue Scooter)
    const scooterGroup = new THREE.Group();
    scooterGroup.position.set(-2.2, 0, 2.2);
    scooterGroup.rotation.y = 0.6;
    houseGroup.add(scooterGroup);

    // Wheels
    const tireMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
    const wheelFront = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.12, 16), tireMat);
    wheelFront.rotation.z = Math.PI / 2;
    wheelFront.position.set(0, 0.25, 0.65);
    wheelFront.castShadow = true;
    scooterGroup.add(wheelFront);

    const wheelRear = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.12, 16), tireMat);
    wheelRear.rotation.z = Math.PI / 2;
    wheelRear.position.set(0, 0.25, -0.65);
    wheelRear.castShadow = true;
    scooterGroup.add(wheelRear);

    // Scooter Body
    const scooterBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.35, 0.35, 0.9),
      new THREE.MeshStandardMaterial({ color: colors.scooter, roughness: 0.4 })
    );
    scooterBody.position.set(0, 0.45, -0.15);
    scooterBody.castShadow = true;
    scooterGroup.add(scooterBody);

    // Scooter seat
    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.32, 0.1, 0.6),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.8 })
    );
    seat.position.set(0, 0.68, -0.2);
    scooterGroup.add(seat);

    // Front apron shield & round headlight
    const apron = new THREE.Mesh(
      new THREE.BoxGeometry(0.42, 0.7, 0.08),
      new THREE.MeshStandardMaterial({ color: colors.scooter, roughness: 0.4 })
    );
    apron.position.set(0, 0.65, 0.45);
    apron.rotation.x = -0.2;
    scooterGroup.add(apron);

    const headlight = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.08, 0.06, 12),
      new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xfef08a, emissiveIntensity: 0.6 })
    );
    headlight.rotation.x = Math.PI / 2;
    headlight.position.set(0, 0.95, 0.42);
    scooterGroup.add(headlight);

    // Spanner tool resting next to scooter
    const spanner = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.35, 0.02),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9 })
    );
    spanner.position.set(0.35, 0.02, 0.2);
    spanner.rotation.y = 0.5;
    scooterGroup.add(spanner);

    // 5. Potted Plant / Tulsi Kyari (Indian Home Symbol)
    const pot = new THREE.Mesh(
      new THREE.CylinderGeometry(0.25, 0.18, 0.45, 12),
      new THREE.MeshStandardMaterial({ color: colors.roof, roughness: 0.8 })
    );
    pot.position.set(1.5, 0.22, 2.1);
    pot.castShadow = true;
    houseGroup.add(pot);

    const foliage = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 8),
      new THREE.MeshStandardMaterial({ color: colors.plantGreen, roughness: 0.8 })
    );
    foliage.position.set(1.5, 0.55, 2.1);
    houseGroup.add(foliage);

    // 4. Hotspot Targets for 2D UI mapping
    const hotspots: { id: string; name: string; hindiName: string; emoji: string; tagline: string; worldPos: THREE.Vector3 }[] = [
      { id: "plumber", name: "Plumber", hindiName: "नल / प्लंबर", emoji: "🚰", tagline: "Tap leakage & pipes", worldPos: new THREE.Vector3(-2.2, 1.8, 0.4) },
      { id: "electrician", name: "Electrician", hindiName: "बिजली मिस्त्री", emoji: "💡", tagline: "Fan, wiring & switches", worldPos: new THREE.Vector3(-0.6, 2.2, 1.2) },
      { id: "carpenter", name: "Carpenter", hindiName: "बढ़ई (कारपेंटर)", emoji: "🪚", tagline: "Locks, beds & furniture", worldPos: new THREE.Vector3(2.4, 1.6, 0.8) },
      { id: "mechanic", name: "Mechanic", hindiName: "स्कूटर मैकेनिक", emoji: "🛵", tagline: "Bike repair & battery", worldPos: new THREE.Vector3(-2.0, 1.4, 2.2) },
    ];

    // Interaction & Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();
    let isDragging = false;
    let previousMouseX = 0;
    let targetRotationY = 0;

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMouseX;
      previousMouseX = e.clientX;
      targetRotationY += deltaX * 0.006;
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for Android phones
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMouseX = e.touches[0].clientX;
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - previousMouseX;
      previousMouseX = e.touches[0].clientX;
      targetRotationY += deltaX * 0.007;
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    domElement.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    // Resize listener
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight || 520;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth auto rotation with gentle sway
      if (!isDragging) {
        targetRotationY += 0.0018;
      }
      houseGroup.rotation.y += (targetRotationY - houseGroup.rotation.y) * 0.08;

      // Animate water droplet dripping into bucket
      const dropProgress = (elapsed * 1.5) % 1;
      droplet.position.y = 1.3 - dropProgress * 0.85;
      droplet.scale.setScalar(0.6 + dropProgress * 0.6);
      droplet.material.opacity = 1 - dropProgress * 0.6;

      // Gentle floating on porch light
      porchLight.intensity = 2.2 + Math.sin(elapsed * 2) * 0.3;

      // Project 3D Hotspot positions to 2D screen coordinates
      const positionsMap: Record<string, { x: number; y: number; visible: boolean }> = {};
      const tempVec = new THREE.Vector3();

      hotspots.forEach((spot) => {
        tempVec.copy(spot.worldPos);
        tempVec.applyMatrix4(houseGroup.matrixWorld);
        tempVec.project(camera);

        const x = (tempVec.x * 0.5 + 0.5) * width;
        const y = (-(tempVec.y * 0.5) + 0.5) * height;
        const visible = tempVec.z < 1.0;

        positionsMap[spot.id] = { x, y, visible };
      });

      setHotspotPositions(positionsMap);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      domElement.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
      domElement.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [isDark]);

  if (!webglSupported) {
    return <WebGLFallback />;
  }

  return (
    <div className="relative w-full h-[460px] md:h-[560px] rounded-3xl overflow-hidden select-none bg-gradient-to-b from-blue-500/5 via-orange-500/5 to-transparent border border-slate-200/60 dark:border-slate-800/80">
      {/* 3D Canvas Mount */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Interactive 3D Hotspots mapped onto the 3D home */}
      {Object.entries(hotspotPositions).map(([id, pos]) => {
        if (!pos.visible || pos.x < 30 || pos.x > 750 || pos.y < 30 || pos.y > 520) return null;
        const isActive = activeHotspot === id;

        const info = {
          plumber: { emoji: "🚰", en: "Plumber", hi: "प्लंबर", hint: "Tap & Pipe fix" },
          electrician: { emoji: "💡", en: "Electrician", hi: "इलेक्ट्रीशियन", hint: "Fan & wiring" },
          carpenter: { emoji: "🪚", en: "Carpenter", hi: "बढ़ई", hint: "Door & locks" },
          mechanic: { emoji: "🛵", en: "Mechanic", hi: "मैकेनिक", hint: "Scooter & bike" },
        }[id] || { emoji: "🔧", en: "Service", hi: "सेवा", hint: "" };

        return (
          <div
            key={id}
            style={{
              left: `${pos.x}px`,
              top: `${pos.y}px`,
              transform: "translate(-50%, -50%)",
            }}
            className="absolute z-20 transition-transform duration-150"
          >
            <button
              onClick={() => {
                setActiveHotspot(id);
                if (onSelectCategory) onSelectCategory(id);
              }}
              className={`group flex items-center gap-1.5 px-2.5 py-1.5 rounded-full shadow-lg border backdrop-blur-md transition-all text-xs font-semibold ${
                isActive
                  ? "bg-brand-orange text-white border-white/40 scale-110 shadow-orange-500/30"
                  : "bg-white/95 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 border-slate-300 dark:border-slate-700 hover:scale-105"
              }`}
            >
              <span className="text-sm">{info.emoji}</span>
              <span className="font-bold">{lang === "en" ? info.en : info.hi}</span>
            </button>
          </div>
        );
      })}

      {/* Floating Interactive Speech Card at Bottom */}
      <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-md z-20 pointer-events-auto">
        <div className="p-3.5 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500/10 dark:bg-orange-500/20 text-brand-orange flex items-center justify-center text-xl flex-shrink-0">
              {activeHotspot === "plumber" && "🚰"}
              {activeHotspot === "electrician" && "💡"}
              {activeHotspot === "carpenter" && "🪚"}
              {activeHotspot === "mechanic" && "🛵"}
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                {activeHotspot === "plumber" && (lang === "en" ? "Need a Plumber?" : "नल या पाइप खराब है?")}
                {activeHotspot === "electrician" && (lang === "en" ? "Electrician needed?" : "पंखा या बिजली की समस्या?")}
                {activeHotspot === "carpenter" && (lang === "en" ? "Door lock or furniture fix?" : "दरवाजा या फर्नीचर ठीक करवाना है?")}
                {activeHotspot === "mechanic" && (lang === "en" ? "Scooter breakdown?" : "गाड़ी या स्कूटर स्टार्ट नहीं हो रहा?")}
              </div>
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3 h-3" />
                {lang === "en" ? "Ramesh & 8 others available near you" : "रमेश जी व अन्य 8 कामगार पास में उपलब्ध हैं"}
              </div>
            </div>
          </div>

          <button
            onClick={() => onBookClick && onBookClick(activeHotspot)}
            className="px-3.5 py-2 rounded-xl bg-brand-orange hover:bg-orange-600 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1 flex-shrink-0"
          >
            <span>{lang === "en" ? "Book" : "बुक करें"}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Gentle hint to spin 3D house */}
      <div className="absolute top-4 right-4 z-10 px-2.5 py-1 rounded-full bg-slate-900/40 backdrop-blur-sm text-[11px] text-slate-300 pointer-events-none hidden sm:flex items-center gap-1.5">
        <span>🔄</span>
        <span>{lang === "en" ? "Drag to look around home" : "घुमाकर घर देखें"}</span>
      </div>
    </div>
  );
}
