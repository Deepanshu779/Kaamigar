"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function Shield3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 360;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Shield group
    const shieldGroup = new THREE.Group();
    scene.add(shieldGroup);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x06b6d4, 4, 15);
    cyanLight.position.set(3, 3, 5);
    scene.add(cyanLight);

    const orangeLight = new THREE.PointLight(0xff6b2b, 3, 15);
    orangeLight.position.set(-3, -3, 5);
    scene.add(orangeLight);

    // Shield Shape Geometry
    const shape = new THREE.Shape();
    // Draw classic shield contour
    shape.moveTo(0, 2.2);
    shape.quadraticCurveTo(1.8, 2.0, 2.0, 0.6);
    shape.quadraticCurveTo(2.0, -1.2, 0, -2.4);
    shape.quadraticCurveTo(-2.0, -1.2, -2.0, 0.6);
    shape.quadraticCurveTo(-1.8, 2.0, 0, 2.2);

    const extrudeSettings = {
      depth: 0.25,
      bevelEnabled: true,
      bevelSegments: 6,
      steps: 2,
      bevelSize: 0.12,
      bevelThickness: 0.1,
    };

    const shieldGeo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    shieldGeo.center();

    // Shield Core Material (Dark glass with cyan & orange highlights)
    const shieldMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f1d38,
      metalness: 0.4,
      roughness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transmission: 0.6,
      opacity: 0.9,
      transparent: true,
      reflectivity: 0.9,
    });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldGroup.add(shieldMesh);

    // Shield Inner Emblem (Checkmark / Core ring)
    const innerRingGeo = new THREE.TorusGeometry(0.85, 0.08, 16, 64);
    const innerRingMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.8,
      metalness: 0.8,
      roughness: 0.2,
    });
    const innerRing = new THREE.Mesh(innerRingGeo, innerRingMat);
    innerRing.position.z = 0.2;
    shieldGroup.add(innerRing);

    // Orbiting Trust Rings
    const orbitRingGeo1 = new THREE.TorusGeometry(2.6, 0.03, 16, 100);
    const orbitRingMat1 = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.4,
    });
    const orbitRing1 = new THREE.Mesh(orbitRingGeo1, orbitRingMat1);
    orbitRing1.rotation.x = Math.PI / 3;
    scene.add(orbitRing1);

    const orbitRingGeo2 = new THREE.TorusGeometry(2.9, 0.02, 16, 100);
    const orbitRingMat2 = new THREE.MeshBasicMaterial({
      color: 0xff844b,
      transparent: true,
      opacity: 0.35,
    });
    const orbitRing2 = new THREE.Mesh(orbitRingGeo2, orbitRingMat2);
    orbitRing2.rotation.y = Math.PI / 4;
    scene.add(orbitRing2);

    // Floating Trust Node Spheres
    const nodeGeo = new THREE.SphereGeometry(0.12, 16, 16);
    const nodeMat1 = new THREE.MeshStandardMaterial({ color: 0x06b6d4, emissive: 0x06b6d4, emissiveIntensity: 1 });
    const nodeMat2 = new THREE.MeshStandardMaterial({ color: 0xff6b2b, emissive: 0xff6b2b, emissiveIntensity: 1 });

    const node1 = new THREE.Mesh(nodeGeo, nodeMat1);
    const node2 = new THREE.Mesh(nodeGeo, nodeMat2);
    scene.add(node1);
    scene.add(node2);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 1.5;
      mouseY = ((e.clientY - rect.top) / height - 0.5) * 1.5;
    };
    window.addEventListener("mousemove", handleMouseMove);

    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Shield subtle levitation & mouse reaction
      shieldGroup.rotation.y = THREE.MathUtils.lerp(shieldGroup.rotation.y, Math.sin(t * 0.8) * 0.2 + mouseX * 0.5, 0.05);
      shieldGroup.rotation.x = THREE.MathUtils.lerp(shieldGroup.rotation.x, Math.cos(t * 0.8) * 0.1 - mouseY * 0.5, 0.05);
      shieldGroup.position.y = Math.sin(t * 1.5) * 0.1;

      // Orbit rings rotation
      orbitRing1.rotation.z = t * 0.3;
      orbitRing2.rotation.x = t * 0.25;

      // Move nodes along orbits
      node1.position.x = Math.cos(t * 1.2) * 2.6;
      node1.position.y = Math.sin(t * 1.2) * Math.cos(Math.PI / 3) * 2.6;
      node1.position.z = Math.sin(t * 1.2) * Math.sin(Math.PI / 3) * 2.6;

      node2.position.x = Math.cos(t * 0.9 + 2) * 2.9 * Math.cos(Math.PI / 4);
      node2.position.y = Math.sin(t * 0.9 + 2) * 2.9;
      node2.position.z = Math.cos(t * 0.9 + 2) * 2.9 * Math.sin(Math.PI / 4);

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] flex items-center justify-center">
      <div ref={mountRef} className="w-full h-full cursor-grab" />
      {/* Floating security badge */}
      <div className="absolute bottom-3 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-lg flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span>256-Bit Encrypted Platform • ISO Certified Safety</span>
      </div>
    </div>
  );
}
