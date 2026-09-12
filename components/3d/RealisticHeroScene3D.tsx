"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { WebGLFallback } from "./WebGLFallback";
import { ArrowRight, Rotate3D, Sparkles, Wrench, X } from "lucide-react";

interface Props {
  onSelectCategory?: (serviceId: string) => void;
  onBookClick?: (serviceId?: string) => void;
}

type Hotspot = {
  id: string;
  label: string;
  category: string;
  color: number;
  position: [number, number, number];
};

const HOTSPOTS: Hotspot[] = [
  { id: "tap", label: "Outdoor Tap", category: "Plumbing", color: 0x2496ff, position: [-5.0, 0.9, 4.1] },
  { id: "sink", label: "Kitchen Sink", category: "Plumbing", color: 0x2496ff, position: [-1.6, 1.7, 2.0] },
  { id: "ac", label: "Split AC", category: "AC Repair", color: 0x36a9ff, position: [2.9, 3.0, -1.9] },
  { id: "fan", label: "Ceiling Fan", category: "Electrical", color: 0xffa928, position: [0.0, 3.25, 1.0] },
  { id: "tv", label: "Smart TV", category: "Electrical", color: 0xffa928, position: [1.8, 1.7, 2.0] },
  { id: "door", label: "Main Door", category: "Carpentry", color: 0xb66a32, position: [0.0, 1.5, 4.55] },
  { id: "bed", label: "Bedroom Furniture", category: "Carpentry", color: 0xb66a32, position: [3.0, 1.3, 0.4] },
  { id: "toilet", label: "Bathroom", category: "Plumbing", color: 0x2496ff, position: [3.7, 1.1, 2.0] },
  { id: "geyser", label: "Geyser", category: "Plumbing", color: 0xff7a2f, position: [4.1, 2.2, 2.8] },
  { id: "washing", label: "Washing Machine", category: "Appliance", color: 0x7d8cff, position: [3.0, 1.0, 2.8] },
  { id: "solar", label: "Solar Panels", category: "Solar", color: 0xffb52b, position: [-0.8, 4.7, -0.5] },
  { id: "tank", label: "Water Tank", category: "Plumbing", color: 0x2496ff, position: [3.8, 5.0, -1.8] },
  { id: "car", label: "Car", category: "Car & Bike", color: 0xff7043, position: [-5.2, 0.7, 1.4] },
  { id: "pump", label: "Water Pump", category: "Plumbing", color: 0x2496ff, position: [-4.3, 0.8, -2.5] },
];

const mat = (color: number, roughness = 0.7, metalness = 0) =>
  new THREE.MeshStandardMaterial({ color, roughness, metalness });

function box(w: number, h: number, d: number, material: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function cyl(r: number, h: number, material: THREE.Material, x = 0, y = 0, z = 0, radial = 24) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, radial), material);
  m.position.set(x, y, z);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

function addWindow(parent: THREE.Group, x: number, y: number, z: number, w = 1.35, h = 1.25) {
  const frame = mat(0x4b352b, 0.5);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x75b8d8, roughness: 0.12, metalness: 0.05, transmission: 0.12, transparent: true, opacity: 0.88 });
  const g = new THREE.Group();
  g.position.set(x, y, z);
  g.add(box(w, h, 0.12, glass));
  g.add(box(0.08, h + 0.08, 0.16, frame, -w / 2, 0, 0));
  g.add(box(0.08, h + 0.08, 0.16, frame, w / 2, 0, 0));
  g.add(box(w + 0.08, 0.08, 0.16, frame, 0, h / 2, 0));
  g.add(box(w + 0.08, 0.08, 0.16, frame, 0, -h / 2, 0));
  g.add(box(0.055, h, 0.18, frame));
  g.add(box(w, 0.055, 0.18, frame, 0, 0, 0));
  parent.add(g);
}

function addTree(parent: THREE.Group, x: number, z: number, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);
  const trunk = mat(0x76503b, 0.95);
  const leaf = mat(0x3f7f4b, 0.95);
  g.add(cyl(0.18 * scale, 1.7 * scale, trunk, 0, 0.85 * scale, 0, 12));
  g.add(cyl(0.9 * scale, 1.5 * scale, leaf, 0, 2.0 * scale, 0, 12));
  g.add(cyl(0.7 * scale, 1.2 * scale, leaf, -0.35 * scale, 2.8 * scale, 0.05 * scale, 12));
  g.add(cyl(0.72 * scale, 1.25 * scale, leaf, 0.35 * scale, 2.75 * scale, -0.05 * scale, 12));
  parent.add(g);
}

function addCar(parent: THREE.Group) {
  const g = new THREE.Group();
  g.position.set(-5.0, 0.65, 1.35);
  const body = mat(0xc94c45, 0.32, 0.05);
  const dark = mat(0x20262c, 0.3);
  const chrome = mat(0xd9e0e5, 0.18, 0.65);
  g.add(box(3.25, 0.65, 1.45, body, 0, 0, 0));
  g.add(box(2.15, 0.75, 1.25, body, 0.25, 0.62, 0));
  g.add(box(1.85, 0.55, 1.08, new THREE.MeshPhysicalMaterial({ color: 0x223744, roughness: 0.12, metalness: 0.15, transmission: 0.04 }), 0.25, 0.67, 0));
  g.add(box(0.07, 0.55, 1.14, chrome, -0.67, 0.67, 0));
  g.add(box(0.07, 0.55, 1.14, chrome, 1.17, 0.67, 0));
  [-1.15, 1.15].forEach((x) => {
    const wheel = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.28, 24), dark);
    wheel.rotation.z = Math.PI / 2;
    wheel.position.set(x, -0.18, 0.72);
    wheel.castShadow = true;
    g.add(wheel);
    const hub = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.3, 20), chrome);
    hub.rotation.z = Math.PI / 2;
    hub.position.set(x, -0.18, 0.72);
    g.add(hub);
    const wheel2 = wheel.clone(); wheel2.position.z = -0.72; g.add(wheel2);
    const hub2 = hub.clone(); hub2.position.z = -0.72; g.add(hub2);
  });
  g.add(box(0.38, 0.16, 0.07, mat(0xffe7b1, 0.25), -1.61, 0.15, 0.48));
  g.add(box(0.38, 0.16, 0.07, mat(0xffe7b1, 0.25), -1.61, 0.15, -0.48));
  parent.add(g);
}

function addMotorcycle(parent: THREE.Group) {
  const g = new THREE.Group();
  g.position.set(-4.2, 0.55, -0.7);
  const black = mat(0x202329, 0.5);
  const accent = mat(0xe36b32, 0.35, 0.1);
  const wheel = (z: number) => {
    const w = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.1, 12, 24), black);
    w.rotation.y = Math.PI / 2;
    w.position.set(0, 0, z);
    return w;
  };
  g.add(wheel(-0.72), wheel(0.72));
  g.add(box(1.1, 0.12, 0.12, accent, 0, 0.5, 0));
  g.add(box(0.75, 0.22, 0.4, black, 0, 0.72, -0.05));
  g.add(box(0.1, 0.75, 0.1, black, 0, 0.38, -0.28));
  g.add(box(0.12, 0.7, 0.12, black, 0, 0.38, 0.28));
  g.add(box(0.18, 0.1, 0.75, black, 0, 1.0, 0.55));
  parent.add(g);
}

function addHouse(parent: THREE.Group) {
  const g = new THREE.Group();
  const wall = mat(0xe8dfd1, 0.82);
  const warm = mat(0xd7b28b, 0.78);
  const trim = mat(0x6f6257, 0.58);
  const wood = mat(0x6d3e27, 0.62);
  const floor = mat(0xc8a47c, 0.86);
  const glass = new THREE.MeshPhysicalMaterial({ color: 0x6ba8c4, roughness: 0.1, transmission: 0.08, transparent: true, opacity: 0.86 });

  // Open-front two-storey shell so the interior remains visible.
  g.add(box(8.6, 0.18, 7.0, floor, 0, 0.1, 0));
  g.add(box(8.6, 3.05, 0.22, wall, 0, 1.62, -3.35));
  g.add(box(0.22, 3.05, 7.0, wall, -4.2, 1.62, 0));
  g.add(box(0.22, 3.05, 7.0, wall, 4.2, 1.62, 0));
  g.add(box(3.9, 0.18, 6.6, floor, 2.05, 3.2, 0));
  g.add(box(8.6, 2.9, 0.22, wall, 0, 4.65, -3.35));
  g.add(box(0.22, 2.9, 3.8, wall, 4.2, 4.65, -1.45));
  g.add(box(0.22, 2.9, 3.8, wall, 4.2, 4.65, 2.0));

  // Ground floor room divisions.
  g.add(box(0.18, 3.0, 6.6, warm, -0.4, 1.62, 0));
  g.add(box(4.0, 3.0, 0.18, warm, 2.2, 1.62, 1.0));
  g.add(box(4.0, 3.0, 0.18, warm, 2.2, 1.62, -2.0));

  // Upper front wall sections + balcony.
  g.add(box(8.2, 0.18, 0.22, trim, 0, 3.25, 3.15));
  g.add(box(3.8, 0.16, 1.7, trim, 0.9, 3.95, 3.05));
  for (let i = -1; i <= 1; i++) g.add(box(0.08, 1.05, 0.08, trim, 0.9 + i * 1.05, 3.8, 3.92));
  g.add(box(3.9, 0.12, 0.18, trim, 0.9, 4.28, 3.92));

  // Main entrance with wood door and porch columns.
  g.add(box(1.35, 2.45, 0.18, wood, 0, 1.3, 3.45));
  g.add(box(0.08, 2.55, 0.2, trim, -0.72, 1.3, 3.45));
  g.add(box(0.08, 2.55, 0.2, trim, 0.72, 1.3, 3.45));
  g.add(cyl(0.16, 2.6, trim, -3.25, 1.35, 3.0, 18));
  g.add(cyl(0.16, 2.6, trim, 3.25, 1.35, 3.0, 18));

  // Windows and upper doors.
  addWindow(g, -2.55, 1.85, 3.35, 1.35, 1.35);
  addWindow(g, 1.8, 1.8, 3.35, 1.45, 1.35);
  addWindow(g, 3.45, 1.75, 1.2, 1.05, 1.25);
  addWindow(g, 1.0, 4.65, 3.1, 1.35, 1.45);
  addWindow(g, -2.45, 4.65, 3.1, 1.45, 1.45);

  // Roof slab and pitched cap.
  g.add(box(9.2, 0.28, 7.35, trim, 0, 6.12, 0));
  const roof = new THREE.Mesh(new THREE.ConeGeometry(5.65, 2.0, 4, 1, false, Math.PI / 4), mat(0x8b4d3e, 0.72));
  roof.scale.set(1, 1, 0.72);
  roof.position.set(0, 6.95, 0);
  roof.rotation.y = Math.PI / 4;
  roof.castShadow = true;
  g.add(roof);

  // Kitchen: counters, cabinets, sink, hob.
  const counter = mat(0x5d6670, 0.4);
  const cabinet = mat(0xf3efe7, 0.62);
  g.add(box(3.3, 0.16, 0.65, counter, -2.55, 1.0, -2.45));
  for (let i = 0; i < 3; i++) g.add(box(0.92, 0.85, 0.58, cabinet, -3.45 + i * 0.95, 0.52, -2.48));
  g.add(box(0.85, 0.05, 0.45, glass, -1.9, 1.12, -2.45));
  for (let i = -1; i <= 1; i++) g.add(cyl(0.13, 0.035, mat(0x2f3338, 0.3), -2.55 + i * 0.38, 1.13, -2.25, 24));
  // Mixer tap.
  g.add(cyl(0.045, 0.42, chromeMaterial(), -1.6, 1.35, -2.35, 12));
  const spout = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.045, 8, 20, Math.PI), chromeMaterial());
  spout.rotation.x = Math.PI / 2; spout.position.set(-1.6, 1.55, -2.2); g.add(spout);

  // Living room sofa + TV.
  const sofa = mat(0xb87a55, 0.88);
  g.add(box(2.8, 0.42, 0.9, sofa, 1.55, 0.7, -0.35));
  g.add(box(0.45, 1.05, 0.9, sofa, 0.25, 1.0, -0.35));
  g.add(box(0.45, 1.05, 0.9, sofa, 2.85, 1.0, -0.35));
  g.add(box(2.0, 0.68, 0.18, sofa, 1.55, 1.25, -0.72));
  g.add(box(1.9, 1.0, 0.1, darkMaterial(), 1.45, 1.7, -3.15));
  g.add(box(2.35, 0.16, 0.55, trim, 1.45, 0.7, -3.0));

  // Bedroom bed + pillows + wardrobe.
  g.add(box(2.8, 0.34, 2.1, wood, 2.15, 0.72, -0.1));
  g.add(box(2.95, 1.65, 0.16, wood, 2.15, 1.5, -1.05));
  g.add(box(2.55, 0.22, 1.8, mat(0xf1eee8, 0.94), 2.15, 1.0, -0.1));
  g.add(box(0.9, 0.16, 0.45, mat(0x9bb4c6, 0.95), 1.4, 1.17, -0.55));
  g.add(box(0.9, 0.16, 0.45, mat(0x9bb4c6, 0.95), 2.9, 1.17, -0.55));
  g.add(box(1.3, 2.3, 0.6, cabinet, 3.65, 1.45, -2.55));

  // Bathroom fixtures.
  g.add(cyl(0.48, 0.28, mat(0xf5f5f2, 0.35), 3.05, 0.35, 2.0, 24));
  g.add(box(0.8, 0.75, 0.7, mat(0xf7f5ef, 0.35), 3.65, 0.45, 2.0));
  g.add(cyl(0.035, 0.5, chromeMaterial(), 3.2, 1.0, 2.0, 12));
  g.add(box(1.0, 1.85, 0.06, glass, 2.7, 1.45, 2.75));
  g.add(box(1.0, 0.08, 1.0, chromeMaterial(), 2.7, 0.08, 2.75));

  // Appliances: fridge, washing machine, geyser, AC.
  g.add(box(0.9, 2.05, 0.72, mat(0xdfe4e7, 0.3, 0.1), -0.9, 1.15, -2.45));
  g.add(box(0.72, 0.04, 0.04, trim, -0.9, 1.25, -2.84));
  g.add(cyl(0.48, 0.32, mat(0xe9edf0, 0.45), 3.0, 0.62, 2.75, 32));
  g.add(box(0.9, 0.35, 0.18, mat(0xffffff, 0.35), 4.0, 2.2, 2.75));
  g.add(box(0.9, 0.15, 0.1, trim, 4.0, 2.05, 2.65));

  // Ceiling fan.
  const fan = new THREE.Group(); fan.position.set(0.5, 3.02, 0.3);
  fan.add(cyl(0.08, 0.35, darkMaterial(), 0, 0, 0, 16));
  fan.add(cyl(0.16, 0.08, darkMaterial(), 0, -0.18, 0, 20));
  for (let i = 0; i < 4; i++) {
    const blade = box(0.95, 0.04, 0.18, mat(0x9ba1a6, 0.5, 0.15), 0.48, -0.18, 0);
    blade.rotation.y = (Math.PI / 2) * i;
    fan.add(blade);
  }
  g.add(fan);

  // Balcony plants and details.
  for (let i = 0; i < 4; i++) {
    g.add(cyl(0.18, 0.25, mat(0x9b5b38, 0.9), -0.65 + i * 1.05, 3.5, 3.95, 16));
    g.add(cyl(0.24, 0.35, mat(0x4b8b51, 0.95), -0.65 + i * 1.05, 3.78, 3.95, 12));
  }

  // Rooftop solar array and tank.
  const solarMat = new THREE.MeshStandardMaterial({ color: 0x173f66, roughness: 0.28, metalness: 0.4 });
  for (let i = 0; i < 4; i++) {
    const p = box(1.35, 0.06, 1.0, solarMat, -1.8 + i * 1.0, 6.3, -0.8);
    p.rotation.x = -0.18;
    g.add(p);
    for (let j = 0; j < 2; j++) g.add(box(0.03, 0.08, 0.9, trim, -2.45 + i * 1.0 + j * 0.65, 6.35, -0.8));
  }
  g.add(cyl(0.9, 1.55, mat(0x3b86ad, 0.55), 3.1, 6.9, -1.75, 32));
  g.add(cyl(0.95, 0.12, trim, 3.1, 7.7, -1.75, 32));

  // AC outdoor unit.
  g.add(box(1.25, 0.72, 0.42, mat(0xe7e5df, 0.48), 4.0, 4.4, -2.8));
  g.add(cyl(0.25, 0.08, darkMaterial(), 4.0, 4.4, -2.56, 24));
  g.add(cyl(0.13, 0.08, darkMaterial(), 4.0, 4.4, -2.5, 24));

  parent.add(g);
}

function chromeMaterial() { return mat(0xd6dadd, 0.2, 0.7); }
function darkMaterial() { return mat(0x262b30, 0.35, 0.25); }

export function RealisticHeroScene3D({ onSelectCategory, onBookClick }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const [selected, setSelected] = useState<Hotspot | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      setSupported(false);
      return;
    }

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeef5f8);
    scene.fog = new THREE.Fog(0xeef5f8, 20, 48);

    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(13, 9.5, 15);

    const resize = () => {
      const w = canvas.clientWidth || 900;
      const h = canvas.clientHeight || 620;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    scene.add(new THREE.HemisphereLight(0xffffff, 0x8095a1, 2.0));
    const sun = new THREE.DirectionalLight(0xfff0d5, 4.2);
    sun.position.set(-8, 15, 10);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -18; sun.shadow.camera.right = 18; sun.shadow.camera.top = 18; sun.shadow.camera.bottom = -18;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0x9fd1ff, 1.1);
    fill.position.set(10, 8, -10);
    scene.add(fill);

    const world = new THREE.Group();
    world.position.y = -0.05;
    scene.add(world);

    const ground = box(30, 0.18, 25, mat(0xb9c7ad, 0.98), 0, -0.15, 0);
    world.add(ground);
    const driveway = box(9.5, 0.05, 6.0, mat(0xaaa69f, 0.98), -4.1, -0.03, 1.5);
    world.add(driveway);
    const path = box(2.0, 0.06, 5.2, mat(0xcbbfa8, 0.96), 0, -0.02, 4.9);
    world.add(path);

    // Boundary wall and gate.
    const boundary = mat(0xd6d0c3, 0.9);
    world.add(box(18, 1.0, 0.25, boundary, 0, 0.45, 6.4));
    world.add(box(0.25, 1.0, 7.0, boundary, -8.9, 0.45, 2.8));
    world.add(box(0.25, 1.0, 7.0, boundary, 8.9, 0.45, 2.8));
    const gate = mat(0x3d4a50, 0.48, 0.3);
    world.add(box(4.8, 1.25, 0.14, gate, 0, 0.6, 6.2));
    for (let i = -2; i <= 2; i++) world.add(box(0.08, 1.4, 0.18, gate, i * 0.9, 0.65, 6.1));

    addHouse(world);
    addCar(world);
    addMotorcycle(world);
    addTree(world, -7.0, -2.8, 1.15);
    addTree(world, 7.0, 3.8, 0.9);
    addTree(world, -7.2, 4.3, 0.75);
    addTree(world, 7.2, -3.0, 1.0);

    // Flower beds and garden stones.
    const soil = mat(0x775b42, 0.98);
    const flower = mat(0xd17c70, 0.9);
    for (let i = 0; i < 8; i++) {
      world.add(cyl(0.22, 0.16, soil, -7.2 + i * 0.75, 0.08, 5.15, 12));
      world.add(cyl(0.08, 0.22, flower, -7.2 + i * 0.75, 0.24, 5.15, 10));
    }

    const hotspotMeshes: THREE.Object3D[] = [];
    const hotspotGroups = new THREE.Group();
    world.add(hotspotGroups);
    HOTSPOTS.forEach((h) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.055, 8, 24), new THREE.MeshBasicMaterial({ color: h.color, transparent: true, opacity: 0.95 }));
      ring.position.set(...h.position);
      ring.rotation.x = Math.PI / 2;
      ring.userData.serviceId = h.id;
      ring.userData.hotspot = h;
      hotspotGroups.add(ring);
      hotspotMeshes.push(ring);
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.07, 12, 12), new THREE.MeshBasicMaterial({ color: h.color }));
      dot.position.set(...h.position);
      dot.userData.serviceId = h.id;
      dot.userData.hotspot = h;
      hotspotGroups.add(dot);
      hotspotMeshes.push(dot);
    });

    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.dampingFactor = 0.055;
    controls.enablePan = false;
    controls.minDistance = 11;
    controls.maxDistance = 25;
    controls.minPolarAngle = 0.68;
    controls.maxPolarAngle = 1.32;
    controls.target.set(0, 2.6, 0);
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.55;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    let hovered: THREE.Object3D | null = null;

    const updatePointer = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };
    const move = (e: PointerEvent) => {
      updatePointer(e);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hotspotMeshes, false)[0]?.object || null;
      hovered = hit;
      canvas.style.cursor = hit ? "pointer" : "grab";
    };
    const click = (e: MouseEvent) => {
      updatePointer(e as unknown as PointerEvent);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(hotspotMeshes, false)[0]?.object;
      const h = hit?.userData.hotspot as Hotspot | undefined;
      if (h) {
        setSelected(h);
        onSelectCategory?.(h.id);
      }
    };
    canvas.addEventListener("pointermove", move);
    canvas.addEventListener("click", click);

    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      hotspotMeshes.forEach((m, i) => {
        const pulse = 1 + Math.sin(elapsed * 3.2 + i) * 0.12;
        m.scale.setScalar(hovered === m ? pulse * 1.45 : pulse);
      });
      controls.update();
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("click", click);
      controls.dispose();
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      renderer.dispose();
      scene.traverse((obj) => {
        const mesh = obj as THREE.Mesh;
        mesh.geometry?.dispose?.();
        if (Array.isArray(mesh.material)) mesh.material.forEach((m) => m.dispose());
        else mesh.material?.dispose?.();
      });
    };
  }, [onSelectCategory]);

  if (!supported) return <WebGLFallback />;

  return (
    <div className="relative h-full w-full overflow-hidden rounded-[28px] bg-[#eef5f8]">
      <canvas ref={canvasRef} className="h-full w-full touch-none" aria-label="Interactive 3D Indian home" />
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
        <div className="rounded-2xl border border-white/70 bg-white/82 px-4 py-3 shadow-lg backdrop-blur-md">
          <div className="flex items-center gap-2 text-sm font-bold text-slate-800"><Sparkles className="h-4 w-4 text-orange-500" /> Explore the home</div>
          <div className="mt-1 text-xs text-slate-500">Click a highlighted item to find a Kaamigar.</div>
        </div>
        <div className="hidden items-center gap-2 rounded-2xl border border-white/70 bg-white/75 px-3 py-2 text-xs font-semibold text-slate-600 shadow-lg backdrop-blur-md sm:flex">
          <Rotate3D className="h-4 w-4" /> Drag to look around
        </div>
      </div>

      {selected && (
        <div className="absolute bottom-4 left-4 right-4 mx-auto max-w-md rounded-2xl border border-white/80 bg-white/94 p-4 shadow-2xl backdrop-blur-md sm:bottom-5 sm:left-auto sm:right-5">
          <button type="button" onClick={() => setSelected(null)} className="absolute right-3 top-3 rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <div className="pr-6">
            <div className="text-xs font-bold uppercase tracking-[0.16em] text-orange-500">{selected.category}</div>
            <div className="mt-1 text-lg font-extrabold text-slate-900">{selected.label}</div>
            <p className="mt-1 text-sm text-slate-500">Need help with this? A nearby verified service professional can handle it.</p>
          </div>
          <button type="button" onClick={() => onBookClick?.(selected.id)} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white transition hover:bg-orange-500">
            <Wrench className="h-4 w-4" /> Book a Kaamigar <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
