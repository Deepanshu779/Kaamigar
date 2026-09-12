"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { WebGLFallback } from "./WebGLFallback";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/components/theme/ThemeProvider";
import {
  ArrowRight,
  CheckCircle2,
  Home,
  Rotate3D,
  Wrench,
  X,
  Layers,
  Sparkles,
  Zap,
  Eye,
  Maximize2,
  Compass,
} from "lucide-react";

interface Props {
  onSelectCategory?: (serviceId: string) => void;
  onBookClick?: (serviceId?: string) => void;
}

type ServiceInfo = {
  en: string;
  hi: string;
  emoji: string;
  service: string;
  categoryNameEn: string;
  categoryNameHi: string;
  problem: string;
  problemHi: string;
  priceEstimate: string;
  timeEstimate: string;
};

const SERVICE_CATALOG: Record<string, ServiceInfo> = {
  tap: {
    en: "Garden Tap & Hose Reel",
    hi: "बगीचा नल व होज़ रील",
    emoji: "🚰",
    service: "plumber",
    categoryNameEn: "Plumbing Services",
    categoryNameHi: "प्लंबिंग सेवाएं",
    problem: "Leaking brass tap, damaged washer, low pressure or valve replacement?",
    problemHi: "नल टपक रहा है, वाल्व खराब या पानी का धीमा बहाव है?",
    priceEstimate: "₹149 onwards",
    timeEstimate: "Within 20 mins",
  },
  sink: {
    en: "Kitchen Sink & Gooseneck Mixer",
    hi: "रसोई सिंक और मिक्सर नल",
    emoji: "🚰",
    service: "plumber",
    categoryNameEn: "Plumbing Services",
    categoryNameHi: "प्लंबिंग सेवाएं",
    problem: "Under-sink bottle trap leakage, choked waste pipe, or loose mixer spout?",
    problemHi: "सिंक जाम, पाइप लीकेज, बदबू या नल ढीला हो गया है?",
    priceEstimate: "₹199 onwards",
    timeEstimate: "Within 30 mins",
  },
  toilet: {
    en: "Wall-Hung Commode & Jet Spray",
    hi: "कमोड, फ्लश व हेल्थ नल",
    emoji: "🚽",
    service: "plumber",
    categoryNameEn: "Sanitary & Toilet Fix",
    categoryNameHi: "टॉयलेट और सेनेटरी काम",
    problem: "Dual flush valve continuous leak, jet spray hose burst, or seat cover hinge loose?",
    problemHi: "फ्लश लगातार बह रहा है, जेट स्प्रे फटा है या सीट कवर टूटा है?",
    priceEstimate: "₹249 onwards",
    timeEstimate: "Within 30 mins",
  },
  shower: {
    en: "Overhead Rain Shower & Mixer",
    hi: "रेनफॉल शॉवर व मिक्सर",
    emoji: "🚿",
    service: "plumber",
    categoryNameEn: "Bathroom Plumbing",
    categoryNameHi: "बाथरूम प्लंबिंग",
    problem: "Clogged mineral nozzles, thermostatic diverter malfunction, or low shower head pressure?",
    problemHi: "शॉवर से पानी धीमा है या गर्म-ठंडे पानी का डायवर्टर खराब है?",
    priceEstimate: "₹249 onwards",
    timeEstimate: "Within 45 mins",
  },
  tank: {
    en: "Rooftop Sintex Tank (1000L) & Piping",
    hi: "छत की पानी टंकी (1000L)",
    emoji: "💧",
    service: "plumber",
    categoryNameEn: "Water Tank & Main Line",
    categoryNameHi: "पानी टंकी व मेन लाइन",
    problem: "Ball valve overflow, algae accumulation, cracked pipe joint or deep tank cleaning?",
    problemHi: "टंकी ओवरफ्लो, बॉल वाल्व खराब, गंदगी की सफाई या पाइप लीकेज?",
    priceEstimate: "₹349 onwards",
    timeEstimate: "Within 60 mins",
  },
  pump: {
    en: "Monoblock Water Lift Pump",
    hi: "पानी की मोटर और पंप",
    emoji: "⚙️",
    service: "plumber",
    categoryNameEn: "Motor & Pump Repair",
    categoryNameHi: "मोटर और पंप मरम्मत",
    problem: "Motor humming without lifting water, capacitor blast, dry run or mechanical seal leak?",
    problemHi: "मोटर आवाज़ कर रही है, पानी नहीं चढ़ा रही या कैपेसिटर खराब है?",
    priceEstimate: "₹299 onwards",
    timeEstimate: "Within 30 mins",
  },
  geyser: {
    en: "Electric Storage Water Geyser",
    hi: "इलेक्ट्रिक वॉटर गीज़र",
    emoji: "♨️",
    service: "plumber",
    categoryNameEn: "Geyser & Heating Repair",
    categoryNameHi: "गीज़र और हीटिंग मरम्मत",
    problem: "No hot water, thermostat tripping, scale buildup on heating coil, or safety valve dripping?",
    problemHi: "पानी गर्म नहीं हो रहा, थर्मोस्टेट ट्रिप या टैंक में लीकेज है?",
    priceEstimate: "₹299 onwards",
    timeEstimate: "Within 45 mins",
  },
  stove: {
    en: "3-Burner Toughened Glass Stove & Chimney",
    hi: "3-बर्नर गैस चूल्हा व चिमनी",
    emoji: "🔥",
    service: "home-repair",
    categoryNameEn: "Kitchen Appliance Repair",
    categoryNameHi: "रसोई उपकरण मरम्मत",
    problem: "Yellow low flame, gas valve jamming, nozzle blockage or electric auto-ignition fault?",
    problemHi: "धीमी आंच, बर्नर जाम, गैस रिसाव या ऑटो-इग्निशन खराब है?",
    priceEstimate: "₹199 onwards",
    timeEstimate: "Within 30 mins",
  },
  fridge: {
    en: "Double-Door Inverter Refrigerator",
    hi: "डबल-डोर इन्वर्टर फ्रिज",
    emoji: "🧊",
    service: "ac-repair",
    categoryNameEn: "Refrigerator Repair",
    categoryNameHi: "फ्रिज रिपेयर व सर्विस",
    problem: "Lower cabinet not cooling, excessive frost in freezer, gas leak, or relay clicking?",
    problemHi: "नीचे कूलिंग नहीं, ज्यादा बर्फ जमना, गैस लीकेज या कंप्रेसर स्टार्ट नहीं हो रहा?",
    priceEstimate: "₹399 onwards",
    timeEstimate: "Within 45 mins",
  },
  washing: {
    en: "Front-Load Automatic Washing Machine",
    hi: "फ्रंट-लोड वॉशिंग मशीन",
    emoji: "🧺",
    service: "home-repair",
    categoryNameEn: "Appliance Repair",
    categoryNameHi: "उपकरण मरम्मत",
    problem: "Drum not spinning, water not draining (E03 error), severe spin vibration or door gasket mold?",
    problemHi: "ड्रम नहीं घूम रहा, पानी नहीं निकल रहा या स्पिन करते समय बहुत हिलती है?",
    priceEstimate: "₹349 onwards",
    timeEstimate: "Within 45 mins",
  },
  ac: {
    en: "Split Inverter AC (Indoor & Outdoor)",
    hi: "स्प्लिट इन्वर्टर एसी",
    emoji: "❄️",
    service: "ac-repair",
    categoryNameEn: "AC Repair & Deep Clean",
    categoryNameHi: "एसी रिपेयर और सर्विस",
    problem: "Poor cooling, indoor water leaking on wall, gas charging (R32/R410A) or foam jet cleaning?",
    problemHi: "कम कूलिंग, इनडोर से पानी टपकना, गैस लीकेज या डीप जेट सर्विस?",
    priceEstimate: "₹499 onwards",
    timeEstimate: "Within 45 mins",
  },
  fan: {
    en: "Aeroblade Ceiling Fan",
    hi: "डिजाइनर सीलिंग फैन",
    emoji: "🌀",
    service: "electrician",
    categoryNameEn: "Electrical Repair",
    categoryNameHi: "इलेक्ट्रिकल मरम्मत",
    problem: "Fan running abnormally slow, wobbling at high speed, capacitor dead or bearing friction?",
    problemHi: "पंखा धीमा चल रहा है, हिल रहा है या खड़खड़ आवाज़ आ रही है?",
    priceEstimate: "₹149 onwards",
    timeEstimate: "Within 25 mins",
  },
  tv: {
    en: "55\" 4K Smart TV & Entertainment Wall",
    hi: "55 इंच 4K टीवी व मीडिया वॉल",
    emoji: "📺",
    service: "electrician",
    categoryNameEn: "TV Mounting & Wiring",
    categoryNameHi: "टीवी इंस्टॉलेशन व वायरिंग",
    problem: "Heavy wall bracket mounting, sound but black screen, HDMI signal loss or power socket surge?",
    problemHi: "दीवार पर टीवी लगाना, आवाज़ है पर पिक्चर नहीं, या पावर सॉकेट खराब?",
    priceEstimate: "₹249 onwards",
    timeEstimate: "Within 30 mins",
  },
  meter: {
    en: "Main Electric Meter & Distribution Box",
    hi: "मेन बिजली मीटर व MCB बॉक्स",
    emoji: "⚡",
    service: "electrician",
    categoryNameEn: "Wiring & MCB Protection",
    categoryNameHi: "वायरिंग और MCB काम",
    problem: "Frequent MCB breaker tripping, burnt neutral terminal, neutral sparking or house rewiring?",
    problemHi: "बार-बार MCB ट्रिप, तार जलने की बदबू, स्पार्किंग या अर्थिंग की समस्या?",
    priceEstimate: "₹199 onwards",
    timeEstimate: "Within 30 mins",
  },
  solar: {
    en: "Rooftop Monocrystalline Solar PV Array",
    hi: "छत का सोलर पैनल सिस्टम",
    emoji: "☀️",
    service: "electrician",
    categoryNameEn: "Solar & Inverter Service",
    categoryNameHi: "सोलर और इन्वर्टर सर्विस",
    problem: "Reduced power output, thick dust cleaning, micro-inverter error code, or solar cabling check?",
    problemHi: "सोलर बिजली उत्पादन कम, पैनल सफाई या इनवर्टर कनेक्शन जांच?",
    priceEstimate: "₹499 onwards",
    timeEstimate: "Within 60 mins",
  },
  door: {
    en: "Teak Main Door & Mortise Lock",
    hi: "सागवान मुख्य दरवाजा व लॉक",
    emoji: "🚪",
    service: "carpenter",
    categoryNameEn: "Carpentry & Locks",
    categoryNameHi: "बढ़ई और लॉक सर्विस",
    problem: "Door jamming in monsoon humidity, cylinder lock stuck, loose brass handle or hinge squeak?",
    problemHi: "दरवाजा नीचे रगड़ खा रहा है, लॉक जाम है या हैंडल ढीला है?",
    priceEstimate: "₹199 onwards",
    timeEstimate: "Within 30 mins",
  },
  bed: {
    en: "King-Size Bed & Living Room Furniture",
    hi: "किंग-साइज बेड व सोफा फर्नीचर",
    emoji: "🛏️",
    service: "carpenter",
    categoryNameEn: "Furniture & Woodwork",
    categoryNameHi: "फर्नीचर और बढ़ई",
    problem: "Bed hydraulic gas-lift failure, squeaking plywood slates, loose sofa arm, or re-upholstery?",
    problemHi: "बेड का हाइड्रोलिक खराब, चरमराने की आवाज़ या सोफा मरम्मत?",
    priceEstimate: "₹299 onwards",
    timeEstimate: "Within 45 mins",
  },
  car: {
    en: "Family Car in Driveway",
    hi: "ड्राइववे में खड़ी कार",
    emoji: "🚗",
    service: "mechanic",
    categoryNameEn: "Doorstep Auto Mechanic",
    categoryNameHi: "डोरस्टेप कार मैकेनिक",
    problem: "Dead battery jumpstart, brake pad squealing, flat tire, coolant leak or doorstep lube service?",
    problemHi: "कार स्टार्ट नहीं हो रही, बैटरी डाउन, ब्रेक आवाज़ या पंचर ठीक कराना?",
    priceEstimate: "₹399 onwards",
    timeEstimate: "Within 30 mins",
  },
  bike: {
    en: "Commuter Motorcycle",
    hi: "मोटरसाइकिल / बाइक",
    emoji: "🏍️",
    service: "mechanic",
    categoryNameEn: "Two-Wheeler Mechanic",
    categoryNameHi: "टू-व्हीलर मैकेनिक",
    problem: "Kick/self start failure, chain sprocket slack, engine oil replacement or tube puncture?",
    problemHi: "बाइक स्टार्ट नहीं हो रही, चेन ढीली, इंजन ऑयल सर्विस या पंचर?",
    priceEstimate: "₹199 onwards",
    timeEstimate: "Within 25 mins",
  },
  tractor: {
    en: "Farm Tractor & Agri Machinery",
    hi: "खेत का ट्रैक्टर व कृषि उपकरण",
    emoji: "🚜",
    service: "mechanic",
    categoryNameEn: "Heavy & Agri Mechanic",
    categoryNameHi: "ट्रैक्टर और एग्री मैकेनिक",
    problem: "Hydraulic 3-point lift not raising, diesel injector bleeding, starter dynamo, or radiator flush?",
    problemHi: "हाइड्रोलिक लिफ्ट में दिक्कत, स्टार्टर मोटर खराब, डीजल लाइन या सर्विस?",
    priceEstimate: "₹599 onwards",
    timeEstimate: "Within 60 mins",
  },
  garden: {
    en: "Front Lawn & Landscaping",
    hi: "सामने का बगीचा व लॉन",
    emoji: "🌿",
    service: "cleaning",
    categoryNameEn: "Gardener & Pest Control",
    categoryNameHi: "माली और कीट नियंत्रण",
    problem: "Lawn mower grass trimming, ornamental hedge pruning, vermicompost fertilization or termite spray?",
    problemHi: "घास की कटाई, पौधों की छंटाई, खाद डालना या दीमक/कीट नियंत्रण?",
    priceEstimate: "₹249 onwards",
    timeEstimate: "Within 45 mins",
  },
};

// Generates procedural PBR canvas textures with realistic tactile grain and specular response
function createPhotorealisticTextures(isDark: boolean) {
  // 1. Plaster Texture (Sand-faced Indian exterior wall with subtle granular bump)
  const plasterCanvas = document.createElement("canvas");
  plasterCanvas.width = 512;
  plasterCanvas.height = 512;
  const pCtx = plasterCanvas.getContext("2d")!;
  pCtx.fillStyle = isDark ? "#283447" : "#faf7f2";
  pCtx.fillRect(0, 0, 512, 512);
  const pImg = pCtx.getImageData(0, 0, 512, 512);
  for (let i = 0; i < pImg.data.length; i += 4) {
    const n = (Math.random() - 0.5) * (isDark ? 16 : 14);
    pImg.data[i] = Math.min(255, Math.max(0, pImg.data[i] + n));
    pImg.data[i + 1] = Math.min(255, Math.max(0, pImg.data[i + 1] + n * 0.95));
    pImg.data[i + 2] = Math.min(255, Math.max(0, pImg.data[i + 2] + n * 0.85));
  }
  pCtx.putImageData(pImg, 0, 0);
  const plasterTex = new THREE.CanvasTexture(plasterCanvas);
  plasterTex.wrapS = plasterTex.wrapT = THREE.RepeatWrapping;
  plasterTex.repeat.set(4, 4);

  // 2. Slate Stone Cladding (Modern Indian villa elevation feature tile)
  const stoneCanvas = document.createElement("canvas");
  stoneCanvas.width = 512;
  stoneCanvas.height = 512;
  const sCtx = stoneCanvas.getContext("2d")!;
  sCtx.fillStyle = isDark ? "#1f2937" : "#64748b";
  sCtx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 32) {
    sCtx.fillStyle = isDark ? (y % 64 === 0 ? "#283548" : "#17202e") : y % 64 === 0 ? "#78889e" : "#556477";
    sCtx.fillRect(0, y, 512, 28);
    sCtx.strokeStyle = isDark ? "#0f172a" : "#334155";
    sCtx.lineWidth = 3;
    sCtx.strokeRect(0, y, 512, 32);
    // Vertical stone block seams
    const shift = (y / 32) % 2 === 0 ? 0 : 64;
    for (let x = shift; x < 512; x += 128) {
      sCtx.beginPath();
      sCtx.moveTo(x, y);
      sCtx.lineTo(x, y + 32);
      sCtx.stroke();
    }
  }
  const stoneTex = new THREE.CanvasTexture(stoneCanvas);
  stoneTex.wrapS = stoneTex.wrapT = THREE.RepeatWrapping;
  stoneTex.repeat.set(1, 4);

  // 3. Indian Teak Wood (Sagwan) - Warm longitudinal grain & growth rings
  const woodCanvas = document.createElement("canvas");
  woodCanvas.width = 512;
  woodCanvas.height = 512;
  const wCtx = woodCanvas.getContext("2d")!;
  wCtx.fillStyle = isDark ? "#522e15" : "#7c3f1d";
  wCtx.fillRect(0, 0, 512, 512);
  for (let y = 0; y < 512; y += 6) {
    const isMajor = y % 24 === 0;
    wCtx.fillStyle = isMajor ? (isDark ? "#3d1f0c" : "#5d2c12") : isDark ? "#5e3419" : "#8a4823";
    wCtx.fillRect(0, y, 512, isMajor ? 4 : 2);
  }
  const wImg = wCtx.getImageData(0, 0, 512, 512);
  for (let i = 0; i < wImg.data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 18;
    wImg.data[i] = Math.min(255, Math.max(0, wImg.data[i] + noise));
    wImg.data[i + 1] = Math.min(255, Math.max(0, wImg.data[i + 1] + noise * 0.7));
    wImg.data[i + 2] = Math.min(255, Math.max(0, wImg.data[i + 2] + noise * 0.35));
  }
  wCtx.putImageData(wImg, 0, 0);
  const woodTex = new THREE.CanvasTexture(woodCanvas);
  woodTex.wrapS = woodTex.wrapT = THREE.RepeatWrapping;

  // 4. Polished Italian Vitrified Marble Tiles (800x800mm with gold/grey veining)
  const tileCanvas = document.createElement("canvas");
  tileCanvas.width = 512;
  tileCanvas.height = 512;
  const tCtx = tileCanvas.getContext("2d")!;
  tCtx.fillStyle = isDark ? "#1e293b" : "#fdfbf7";
  tCtx.fillRect(0, 0, 512, 512);
  // Grid grout lines
  tCtx.strokeStyle = isDark ? "#0f172a" : "#e2ded6";
  tCtx.lineWidth = 3;
  tCtx.strokeRect(0, 0, 512, 512);
  tCtx.strokeRect(256, 0, 1, 512);
  tCtx.strokeRect(0, 256, 512, 1);
  // Delicate organic marble veins
  tCtx.strokeStyle = isDark ? "rgba(90, 115, 150, 0.4)" : "rgba(180, 170, 150, 0.45)";
  tCtx.lineWidth = 2;
  tCtx.beginPath();
  tCtx.moveTo(40, 60);
  tCtx.bezierCurveTo(140, 160, 320, 80, 460, 200);
  tCtx.bezierCurveTo(490, 260, 380, 380, 450, 480);
  tCtx.stroke();
  tCtx.beginPath();
  tCtx.moveTo(200, 300);
  tCtx.bezierCurveTo(120, 390, 80, 420, 30, 490);
  tCtx.stroke();
  const tileTex = new THREE.CanvasTexture(tileCanvas);
  tileTex.wrapS = tileTex.wrapT = THREE.RepeatWrapping;
  tileTex.repeat.set(3, 3);

  // 5. Black Galaxy Granite Countertop (Deep obsidian with golden mica flecks)
  const graniteCanvas = document.createElement("canvas");
  graniteCanvas.width = 256;
  graniteCanvas.height = 256;
  const gCtx = graniteCanvas.getContext("2d")!;
  gCtx.fillStyle = "#111419";
  gCtx.fillRect(0, 0, 256, 256);
  for (let k = 0; k < 280; k++) {
    const gx = Math.random() * 256;
    const gy = Math.random() * 256;
    const r = Math.random() * 1.8 + 0.6;
    gCtx.fillStyle = Math.random() > 0.45 ? "rgba(235, 195, 110, 0.85)" : "rgba(220, 235, 255, 0.8)";
    gCtx.fillRect(gx, gy, r, r);
  }
  const graniteTex = new THREE.CanvasTexture(graniteCanvas);
  graniteTex.wrapS = graniteTex.wrapT = THREE.RepeatWrapping;
  graniteTex.repeat.set(4, 4);

  // 6. Monocrystalline Solar PV cells (Deep indigo with silver busbar grid)
  const solarCanvas = document.createElement("canvas");
  solarCanvas.width = 256;
  solarCanvas.height = 256;
  const solCtx = solarCanvas.getContext("2d")!;
  solCtx.fillStyle = "#0c1a30";
  solCtx.fillRect(0, 0, 256, 256);
  // Silicon micro-lines
  solCtx.strokeStyle = "#254b7c";
  solCtx.lineWidth = 1;
  for (let x = 8; x < 256; x += 16) {
    solCtx.beginPath();
    solCtx.moveTo(x, 0);
    solCtx.lineTo(x, 256);
    solCtx.stroke();
  }
  // Silver busbars
  solCtx.strokeStyle = "#e2e8f0";
  solCtx.lineWidth = 3;
  solCtx.beginPath();
  solCtx.moveTo(48, 0);
  solCtx.lineTo(48, 256);
  solCtx.moveTo(128, 0);
  solCtx.lineTo(128, 256);
  solCtx.moveTo(208, 0);
  solCtx.lineTo(208, 256);
  solCtx.stroke();
  const solarTex = new THREE.CanvasTexture(solarCanvas);
  solarTex.wrapS = solarTex.wrapT = THREE.RepeatWrapping;
  solarTex.repeat.set(2, 2);

  // 7. Interlocking Driveway Pavers (Herringbone pattern)
  const paverCanvas = document.createElement("canvas");
  paverCanvas.width = 256;
  paverCanvas.height = 256;
  const pvCtx = paverCanvas.getContext("2d")!;
  pvCtx.fillStyle = isDark ? "#283445" : "#b0a595";
  pvCtx.fillRect(0, 0, 256, 256);
  pvCtx.strokeStyle = isDark ? "#18202d" : "#8a7e6f";
  pvCtx.lineWidth = 3;
  for (let x = 0; x < 256; x += 32) {
    for (let y = 0; y < 256; y += 16) {
      const offset = (y % 32 === 0 ? 0 : 16);
      pvCtx.strokeRect(x + offset, y, 32, 16);
    }
  }
  const paverTex = new THREE.CanvasTexture(paverCanvas);
  paverTex.wrapS = paverTex.wrapT = THREE.RepeatWrapping;
  paverTex.repeat.set(6, 8);

  // 8. Ceramic Kitchen & Bathroom Subway Backsplash Tiles
  const subwayCanvas = document.createElement("canvas");
  subwayCanvas.width = 256;
  subwayCanvas.height = 256;
  const sbCtx = subwayCanvas.getContext("2d")!;
  sbCtx.fillStyle = isDark ? "#1e293b" : "#f1f5f9";
  sbCtx.fillRect(0, 0, 256, 256);
  sbCtx.strokeStyle = isDark ? "#0f172a" : "#cbd5e1";
  sbCtx.lineWidth = 3;
  for (let y = 0; y < 256; y += 32) {
    const shift = (y / 32) % 2 === 0 ? 0 : 32;
    for (let x = -32 + shift; x < 288; x += 64) {
      sbCtx.strokeRect(x, y, 64, 32);
    }
  }
  const subwayTex = new THREE.CanvasTexture(subwayCanvas);
  subwayTex.wrapS = subwayTex.wrapT = THREE.RepeatWrapping;
  subwayTex.repeat.set(4, 3);

  return { plasterTex, stoneTex, woodTex, tileTex, graniteTex, solarTex, paverTex, subwayTex };
}

export function DetailedHeroScene3D({ onSelectCategory, onBookClick }: Props) {
  const mount = useRef<HTMLDivElement>(null);
  const [ok, setOk] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"exterior" | "ground" | "first" | "rooftop">("exterior");
  const [active, setActive] = useState<string>("ac");
  const [showHotspotPins, setShowHotspotPins] = useState(true);
  const { lang } = useI18n();
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const testCanvas = document.createElement("canvas");
    if (!(testCanvas.getContext("webgl") || testCanvas.getContext("experimental-webgl"))) {
      setOk(false);
      return;
    }
    const container = mount.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 640;

    const scene = new THREE.Scene();
    scene.background = null;

    // Architectural 3/4 Camera framing
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 140);
    camera.position.set(13.5, 9.5, 15.5);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = dark ? 1.3 : 1.4;
    container.appendChild(renderer.domElement);

    // Realistic Golden-Hour Indian Daylight Lighting
    const hemiLight = new THREE.HemisphereLight(
      dark ? 0x93c5fd : 0xfff3e0,
      dark ? 0x1e293b : 0x7c5836,
      dark ? 1.8 : 2.2
    );
    scene.add(hemiLight);

    // Primary Sun Light casting realistic sharp-soft architectural shadows
    const sunLight = new THREE.DirectionalLight(0xffecd2, dark ? 2.2 : 3.0);
    sunLight.position.set(16, 22, 14);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 55;
    sunLight.shadow.camera.left = -16;
    sunLight.shadow.camera.right = 16;
    sunLight.shadow.camera.top = 16;
    sunLight.shadow.camera.bottom = -16;
    sunLight.shadow.bias = -0.00035;
    scene.add(sunLight);

    // Skylight Fill Light for realistic ambient occlusion in shadowed cuts
    const skyFillLight = new THREE.DirectionalLight(0xdbeafe, dark ? 0.7 : 1.1);
    skyFillLight.position.set(-12, 10, -8);
    scene.add(skyFillLight);

    // Textures
    const textures = createPhotorealisticTextures(dark);

    const root = new THREE.Group();
    scene.add(root);

    const houseGroup = new THREE.Group();
    root.add(houseGroup);

    const interactiveMeshes: THREE.Mesh[] = [];
    const interactiveTargetMap = new Map<THREE.Mesh, { id: string; origMat: THREE.Material }>();

    const registerTarget = (obj: THREE.Object3D, id: string) => {
      obj.userData.target = id;
      obj.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const m = child as THREE.Mesh;
          m.userData.target = id;
          interactiveMeshes.push(m);
          interactiveTargetMap.set(m, { id, origMat: m.material as THREE.Material });
        }
      });
      return obj;
    };

    // Physically-Based Materials
    const wallMat = new THREE.MeshStandardMaterial({
      map: textures.plasterTex,
      color: dark ? 0xe2e8f0 : 0xfbf8f2,
      roughness: 0.88,
      metalness: 0.04,
    });

    const interiorWallMat = new THREE.MeshStandardMaterial({
      map: textures.plasterTex,
      color: dark ? 0xcfd8e3 : 0xfaf5eb,
      roughness: 0.9,
      metalness: 0.02,
    });

    const accentStoneMat = new THREE.MeshStandardMaterial({
      map: textures.stoneTex,
      color: dark ? 0x94a3b8 : 0x78716c,
      roughness: 0.7,
      metalness: 0.12,
    });

    const teakMat = new THREE.MeshStandardMaterial({
      map: textures.woodTex,
      color: dark ? 0xb45309 : 0x92400e,
      roughness: 0.42,
      metalness: 0.08,
    });

    const darkWoodMat = new THREE.MeshStandardMaterial({
      map: textures.woodTex,
      color: dark ? 0x451a03 : 0x582406,
      roughness: 0.4,
      metalness: 0.1,
    });

    const floorTileMat = new THREE.MeshStandardMaterial({
      map: textures.tileTex,
      color: dark ? 0x475569 : 0xffffff,
      roughness: 0.18,
      metalness: 0.08,
    });

    const graniteMat = new THREE.MeshStandardMaterial({
      map: textures.graniteTex,
      roughness: 0.15,
      metalness: 0.28,
    });

    const backsplashMat = new THREE.MeshStandardMaterial({
      map: textures.subwayTex,
      roughness: 0.25,
      metalness: 0.05,
    });

    const concreteMat = new THREE.MeshStandardMaterial({
      color: dark ? 0x334155 : 0x94a3b8,
      roughness: 0.85,
      metalness: 0.05,
    });

    const paverMat = new THREE.MeshStandardMaterial({
      map: textures.paverTex,
      color: dark ? 0x475569 : 0xcbd5e1,
      roughness: 0.82,
      metalness: 0.05,
    });

    const lawnMat = new THREE.MeshStandardMaterial({
      color: dark ? 0x15803d : 0x3a8222,
      roughness: 0.92,
      metalness: 0.02,
    });

    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x93c5fd,
      transparent: true,
      opacity: 0.45,
      roughness: 0.08,
      metalness: 0.1,
      transmission: 0.8,
      ior: 1.5,
    });

    const chromeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.12,
      metalness: 0.94,
    });

    const brassMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.28,
      metalness: 0.88,
    });

    const sintexMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.38,
      metalness: 0.15,
    });

    const solarMat = new THREE.MeshStandardMaterial({
      map: textures.solarTex,
      roughness: 0.12,
      metalness: 0.65,
    });

    const carPaintMat = new THREE.MeshStandardMaterial({
      color: 0x1e40af,
      roughness: 0.2,
      metalness: 0.85,
    });

    const bikePaintMat = new THREE.MeshStandardMaterial({
      color: 0xb91c1c,
      roughness: 0.22,
      metalness: 0.8,
    });

    const tractorPaintMat = new THREE.MeshStandardMaterial({
      color: 0xdc2626,
      roughness: 0.35,
      metalness: 0.45,
    });

    const applianceWhiteMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.22,
      metalness: 0.12,
    });

    const fabricGreyMat = new THREE.MeshStandardMaterial({
      color: dark ? 0x475569 : 0x64748b,
      roughness: 0.88,
      metalness: 0.02,
    });

    const cushionYellowMat = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.85,
      metalness: 0.02,
    });

    const cushionTerracottaMat = new THREE.MeshStandardMaterial({
      color: 0xc2410c,
      roughness: 0.85,
      metalness: 0.02,
    });

    const foliageMat = new THREE.MeshStandardMaterial({
      color: dark ? 0x14532d : 0x227329,
      roughness: 0.85,
      metalness: 0.02,
    });

    const helperMesh = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      x = 0,
      y = 0,
      z = 0,
      parent: THREE.Object3D = root
    ) => {
      const m = new THREE.Mesh(geo, mat);
      m.position.set(x, y, z);
      m.castShadow = true;
      m.receiveShadow = true;
      parent.add(m);
      return m;
    };

    // ==========================================
    // 1. ESTATE PROPERTY GROUNDS & COMPOUND
    // ==========================================
    // Sub-base foundation
    helperMesh(new THREE.BoxGeometry(23.5, 0.4, 18.5), concreteMat, 0, -0.2, 0);

    // Interlocking Paver Driveway
    helperMesh(new THREE.BoxGeometry(6.6, 0.06, 9.4), paverMat, 4.6, 0.03, 3.8);

    // Front Landscaped Lawn
    const gardenArea = helperMesh(new THREE.BoxGeometry(7.8, 0.06, 7.6), lawnMat, -5.8, 0.03, 3.8);
    registerTarget(gardenArea, "garden");

    // Side Garden / Agri field corner near tractor
    const agriField = helperMesh(new THREE.BoxGeometry(4.2, 0.06, 6.2), lawnMat, 8.8, 0.03, -2.4);
    registerTarget(agriField, "garden");

    // Stepping stones through lawn
    for (let s = -2; s <= 2; s++) {
      helperMesh(new THREE.CylinderGeometry(0.38, 0.38, 0.08, 16), concreteMat, -4.6, 0.07, 1.6 + s * 1.1);
    }

    // Boundary Walls
    helperMesh(new THREE.BoxGeometry(22.8, 1.45, 0.24), wallMat, 0, 0.725, -9.0);
    helperMesh(new THREE.BoxGeometry(0.24, 1.45, 17.8), wallMat, -11.4, 0.725, 0);
    helperMesh(new THREE.BoxGeometry(0.24, 1.45, 17.8), wallMat, 11.4, 0.725, 0);
    helperMesh(new THREE.BoxGeometry(7.2, 1.25, 0.24), wallMat, -7.4, 0.625, 8.8);
    helperMesh(new THREE.BoxGeometry(4.2, 1.25, 0.24), wallMat, 9.0, 0.625, 8.8);

    // Boundary Gate Pillars & Electric Utility Meter Station
    helperMesh(new THREE.BoxGeometry(0.75, 1.85, 0.75), accentStoneMat, 6.6, 0.925, 8.8);
    helperMesh(new THREE.BoxGeometry(0.85, 0.12, 0.85), concreteMat, 6.6, 1.9, 8.8);
    helperMesh(new THREE.CylinderGeometry(0.12, 0.14, 0.2, 16), dark ? brassMat : chromeMat, 6.6, 2.05, 8.8);

    // Detailed Indian Electrical Utility Meter Box
    const meterBox = new THREE.Group();
    meterBox.position.set(6.6, 1.15, 8.4);
    root.add(meterBox);
    helperMesh(new THREE.BoxGeometry(0.48, 0.62, 0.22), applianceWhiteMat, 0, 0, 0, meterBox);
    helperMesh(new THREE.BoxGeometry(0.34, 0.24, 0.05), dark ? glassMat : chromeMat, 0, 0.1, -0.11, meterBox);
    helperMesh(new THREE.BoxGeometry(0.18, 0.06, 0.02), new THREE.MeshBasicMaterial({ color: 0xef4444 }), 0, 0.1, -0.13, meterBox);
    helperMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.7, 10), chromeMat, 0.18, -0.5, -0.05, meterBox);
    registerTarget(meterBox, "meter");

    // Sliding Iron & Wood Main Gate
    const gateGroup = new THREE.Group();
    gateGroup.position.set(2.4, 0.65, 8.8);
    root.add(gateGroup);
    helperMesh(new THREE.BoxGeometry(5.2, 1.2, 0.08), darkWoodMat, 0, 0, 0, gateGroup);
    for (let g = -2.3; g <= 2.3; g += 0.38) {
      helperMesh(new THREE.BoxGeometry(0.04, 1.2, 0.1), chromeMat, g, 0, 0, gateGroup);
    }
    helperMesh(new THREE.BoxGeometry(5.2, 0.06, 0.1), chromeMat, 0, 0.58, 0, gateGroup);
    helperMesh(new THREE.BoxGeometry(5.2, 0.06, 0.1), chromeMat, 0, -0.58, 0, gateGroup);

    // Outdoor Utility Station: Raised Concrete Platform, Brass Tap & Monoblock Pump
    const outdoorPlumbing = new THREE.Group();
    outdoorPlumbing.position.set(-9.4, 0.05, 5.5);
    root.add(outdoorPlumbing);
    helperMesh(new THREE.BoxGeometry(1.4, 0.22, 1.4), concreteMat, 0, 0.11, 0, outdoorPlumbing);

    // Monoblock Water Pump & Motor
    const pumpGroup = new THREE.Group();
    pumpGroup.position.set(0.25, 0.34, 0);
    outdoorPlumbing.add(pumpGroup);
    const motorCylinder = helperMesh(
      new THREE.CylinderGeometry(0.2, 0.2, 0.5, 18),
      new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.35, metalness: 0.65 }),
      0,
      0.2,
      0,
      pumpGroup
    );
    motorCylinder.rotation.z = Math.PI / 2;
    helperMesh(new THREE.BoxGeometry(0.28, 0.3, 0.24), chromeMat, 0.32, 0.15, 0, pumpGroup);
    helperMesh(new THREE.CylinderGeometry(0.04, 0.04, 0.35, 10), brassMat, 0.32, 0.38, 0, pumpGroup);
    registerTarget(pumpGroup, "pump");

    // Outdoor Garden Tap with Brass Bib Cock & Garden Hose Reel
    const gardenTapGroup = new THREE.Group();
    gardenTapGroup.position.set(-0.38, 0.22, 0);
    outdoorPlumbing.add(gardenTapGroup);
    helperMesh(new THREE.CylinderGeometry(0.04, 0.04, 0.75, 12), chromeMat, 0, 0.375, 0, gardenTapGroup);
    const tapSpout = helperMesh(new THREE.CylinderGeometry(0.035, 0.035, 0.2, 12), brassMat, 0.09, 0.72, 0, gardenTapGroup);
    tapSpout.rotation.z = Math.PI / 2;
    helperMesh(new THREE.SphereGeometry(0.05, 12, 12), brassMat, 0.09, 0.78, 0, gardenTapGroup);
    // Green Garden Hose Reel
    const hose = helperMesh(new THREE.TorusGeometry(0.26, 0.06, 12, 24), new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.7 }), 0, 0.14, 0.36, gardenTapGroup);
    hose.rotation.x = Math.PI / 2;
    registerTarget(gardenTapGroup, "tap");

    // Mature Shade Tree (Neem / Peepal style Indian courtyard tree)
    const treeGroup = new THREE.Group();
    treeGroup.position.set(-8.4, 0, 0.6);
    root.add(treeGroup);
    const trunk = helperMesh(new THREE.CylinderGeometry(0.26, 0.38, 2.8, 10), darkWoodMat, 0, 1.4, 0, treeGroup);
    trunk.rotation.z = 0.04;
    helperMesh(new THREE.DodecahedronGeometry(1.6, 1), foliageMat, 0, 3.2, 0, treeGroup);
    helperMesh(new THREE.DodecahedronGeometry(1.3, 1), foliageMat, -0.7, 3.6, 0.5, treeGroup);
    helperMesh(new THREE.DodecahedronGeometry(1.2, 1), foliageMat, 0.7, 3.5, -0.5, treeGroup);
    helperMesh(new THREE.DodecahedronGeometry(0.9, 1), foliageMat, 0, 4.3, 0, treeGroup);

    // Potted Ornamental Palms around Veranda
    for (const pz of [2.8, 4.8]) {
      const potGroup = new THREE.Group();
      potGroup.position.set(-1.8, 0.45, pz);
      root.add(potGroup);
      helperMesh(new THREE.CylinderGeometry(0.22, 0.16, 0.42, 14), applianceWhiteMat, 0, 0.21, 0, potGroup);
      helperMesh(new THREE.DodecahedronGeometry(0.35, 1), foliageMat, 0, 0.55, 0, potGroup);
    }

    // ==========================================
    // 2. TWO-STOREY INDIAN HOUSE ARCHITECTURE
    // ==========================================
    const houseOrigin = new THREE.Group();
    houseOrigin.position.set(-0.6, 0, -1.0);
    houseGroup.add(houseOrigin);

    // Solid Plinth (0.48m raised above driveway level)
    helperMesh(new THREE.BoxGeometry(10.2, 0.48, 8.4), concreteMat, 0, 0.24, 0, houseOrigin);

    // Front Entrance Steps with Polished Granite Nosing
    for (let st = 0; st < 3; st++) {
      helperMesh(
        new THREE.BoxGeometry(2.4 - st * 0.22, 0.16, 0.48),
        accentStoneMat,
        1.2,
        0.08 + st * 0.16,
        4.2 + (3 - st) * 0.38,
        houseOrigin
      );
    }

    // Ground Floor Finished Slab & First Floor Slab
    helperMesh(new THREE.BoxGeometry(9.8, 0.12, 8.0), floorTileMat, 0, 0.54, 0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(10.2, 0.26, 8.4), concreteMat, 0, 3.75, 0, houseOrigin);
    // Cantilevered Balcony Slab
    helperMesh(new THREE.BoxGeometry(3.8, 0.26, 2.4), concreteMat, -2.8, 3.75, 4.7, houseOrigin);
    helperMesh(new THREE.BoxGeometry(3.6, 0.08, 2.2), floorTileMat, -2.8, 3.92, 4.7, houseOrigin);
    // First Floor Finished Marble Floor
    helperMesh(new THREE.BoxGeometry(9.8, 0.08, 8.0), floorTileMat, 0, 3.92, 0, houseOrigin);
    // Rooftop Terrace RCC Slab
    helperMesh(new THREE.BoxGeometry(10.4, 0.3, 8.6), concreteMat, 0, 7.05, 0, houseOrigin);

    // Rooftop Parapet Safety Walls & Coping
    helperMesh(new THREE.BoxGeometry(10.4, 0.9, 0.22), wallMat, 0, 7.55, -4.2, houseOrigin);
    helperMesh(new THREE.BoxGeometry(0.22, 0.9, 8.2), wallMat, -5.1, 7.55, 0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(0.22, 0.9, 8.2), wallMat, 5.1, 7.55, 0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(10.4, 0.9, 0.22), wallMat, 0, 7.55, 4.2, houseOrigin);
    // Parapet coping band
    helperMesh(new THREE.BoxGeometry(10.5, 0.08, 0.26), concreteMat, 0, 8.04, -4.2, houseOrigin);
    helperMesh(new THREE.BoxGeometry(10.5, 0.08, 0.26), concreteMat, 0, 8.04, 4.2, houseOrigin);

    // Architectural Exterior Enclosing Walls (Rear & Side)
    helperMesh(new THREE.BoxGeometry(9.8, 3.1, 0.26), wallMat, 0, 2.15, -4.0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(9.8, 3.1, 0.26), wallMat, 0, 5.5, -4.0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(0.26, 3.1, 8.0), wallMat, 4.9, 2.15, 0, houseOrigin);
    helperMesh(new THREE.BoxGeometry(0.26, 3.1, 8.0), wallMat, 4.9, 5.5, 0, houseOrigin);

    // Interior Structural Partition Walls with Plaster & Cutaway
    helperMesh(new THREE.BoxGeometry(0.2, 3.1, 5.2), interiorWallMat, 1.2, 2.15, -1.4, houseOrigin);
    helperMesh(new THREE.BoxGeometry(3.6, 3.1, 0.2), interiorWallMat, 3.0, 2.15, 1.1, houseOrigin);
    helperMesh(new THREE.BoxGeometry(0.2, 3.1, 5.5), interiorWallMat, 1.2, 5.5, -1.25, houseOrigin);

    // Grand Exterior Feature Pillar (Slate stone clad with up/down lights)
    helperMesh(new THREE.BoxGeometry(0.72, 7.05, 0.72), accentStoneMat, 4.5, 3.525, 3.8, houseOrigin);
    // Entrance Veranda / Porch Cantilevered RCC Roof Canopy
    helperMesh(new THREE.BoxGeometry(3.6, 0.22, 2.0), concreteMat, 1.2, 3.45, 4.9, houseOrigin);
    const porchDownlight = new THREE.PointLight(0xffedd5, dark ? 1.2 : 1.6, 5.0);
    porchDownlight.position.set(1.2, 3.3, 4.9);
    houseOrigin.add(porchDownlight);

    // Up-Down Exterior Cylinder Light on Accent Pillar
    helperMesh(new THREE.CylinderGeometry(0.06, 0.06, 0.24, 12), dark ? brassMat : chromeMat, 4.1, 2.4, 3.8, houseOrigin);

    // ==========================================
    // 3. MAIN ENTRANCE DOOR & BALCONY
    // ==========================================
    // Solid Teak Wood Main Door with Frame, Handle & Lock
    const mainDoorGroup = new THREE.Group();
    mainDoorGroup.position.set(1.2, 0.54, 3.9);
    houseOrigin.add(mainDoorGroup);
    // Heavy Door Frame
    helperMesh(new THREE.BoxGeometry(1.4, 2.65, 0.22), darkWoodMat, 0, 1.325, 0, mainDoorGroup);
    // Teak Door Leaf with Classical Indian Paneling
    helperMesh(new THREE.BoxGeometry(1.22, 2.52, 0.1), teakMat, 0, 1.3, 0.03, mainDoorGroup);
    for (const py of [0.65, 1.3, 1.95]) {
      helperMesh(new THREE.BoxGeometry(0.95, 0.5, 0.03), darkWoodMat, 0, py, 0.09, mainDoorGroup);
    }
    // Brass Designer Pull Handle & Mortise Lock
    helperMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 12), brassMat, 0.48, 1.25, 0.12, mainDoorGroup);
    helperMesh(new THREE.BoxGeometry(0.08, 0.2, 0.04), brassMat, 0.48, 1.35, 0.1, mainDoorGroup);
    // Auspicious Brass House Nameplate ("KAAMIGAR NIWAS")
    helperMesh(new THREE.BoxGeometry(0.48, 0.16, 0.04), brassMat, 0.9, 1.6, 0.06, mainDoorGroup);
    registerTarget(mainDoorGroup, "door");

    // Modern Balcony with Toughened Glass & SS Handrail
    const balconyRailing = new THREE.Group();
    balconyRailing.position.set(-2.8, 3.95, 5.8);
    houseOrigin.add(balconyRailing);
    helperMesh(new THREE.BoxGeometry(3.7, 0.98, 0.05), glassMat, 0, 0.49, 0, balconyRailing);
    helperMesh(new THREE.BoxGeometry(3.75, 0.06, 0.08), chromeMat, 0, 0.98, 0, balconyRailing);
    helperMesh(new THREE.BoxGeometry(0.06, 0.98, 0.06), chromeMat, -1.8, 0.49, 0, balconyRailing);
    helperMesh(new THREE.BoxGeometry(0.06, 0.98, 0.06), chromeMat, 1.8, 0.49, 0, balconyRailing);
    helperMesh(new THREE.BoxGeometry(0.05, 0.98, 2.2), glassMat, -1.85, 0.49, -1.1, balconyRailing);
    helperMesh(new THREE.BoxGeometry(0.08, 0.06, 2.2), chromeMat, -1.85, 0.98, -1.1, balconyRailing);

    // Sliding Glass Balcony Doors
    const balconyDoor = new THREE.Group();
    balconyDoor.position.set(-2.8, 3.95, 3.5);
    houseOrigin.add(balconyDoor);
    helperMesh(new THREE.BoxGeometry(3.0, 2.6, 0.08), dark ? darkWoodMat : chromeMat, 0, 1.3, 0, balconyDoor);
    helperMesh(new THREE.BoxGeometry(2.8, 2.4, 0.04), glassMat, 0, 1.3, 0, balconyDoor);

    // ==========================================
    // 4. GROUND FLOOR CUTAWAY: LIVING ROOM
    // ==========================================
    const livingGroup = new THREE.Group();
    livingGroup.position.set(-2.2, 0.54, -0.8);
    houseOrigin.add(livingGroup);

    // Contemporary L-Shaped Fabric Sofa with Cushions
    const sofaGroup = new THREE.Group();
    sofaGroup.position.set(-0.4, 0, 0.6);
    livingGroup.add(sofaGroup);
    // Base seating & Backrest
    helperMesh(new THREE.BoxGeometry(2.9, 0.44, 1.15), fabricGreyMat, 0, 0.22, 0, sofaGroup);
    helperMesh(new THREE.BoxGeometry(2.9, 0.54, 0.34), fabricGreyMat, 0, 0.66, -0.4, sofaGroup);
    // Chaise section
    helperMesh(new THREE.BoxGeometry(1.15, 0.44, 1.6), fabricGreyMat, -0.88, 0.22, 0.95, sofaGroup);
    // Padded armrest
    helperMesh(new THREE.BoxGeometry(0.3, 0.68, 1.25), fabricGreyMat, 1.3, 0.34, 0, sofaGroup);
    // Throw pillows (Indian warm tones: turmeric gold & terracotta)
    helperMesh(new THREE.BoxGeometry(0.48, 0.46, 0.18), cushionYellowMat, -0.2, 0.65, -0.2, sofaGroup);
    helperMesh(new THREE.BoxGeometry(0.48, 0.46, 0.18), cushionTerracottaMat, 0.6, 0.65, -0.2, sofaGroup);
    registerTarget(sofaGroup, "bed");

    // Modern Coffee Table
    const coffeeTable = new THREE.Group();
    coffeeTable.position.set(0.15, 0, 1.75);
    livingGroup.add(coffeeTable);
    helperMesh(new THREE.BoxGeometry(1.3, 0.08, 0.75), teakMat, 0, 0.38, 0, coffeeTable);
    helperMesh(new THREE.BoxGeometry(1.2, 0.04, 0.65), darkWoodMat, 0, 0.15, 0, coffeeTable);
    for (const lx of [-0.55, 0.55]) {
      for (const lz of [-0.3, 0.3]) {
        helperMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.36, 10), brassMat, lx, 0.19, lz, coffeeTable);
      }
    }

    // 55" 4K Smart TV & Fluted Wooden Entertainment Wall
    const tvGroup = new THREE.Group();
    tvGroup.position.set(0.2, 0, -3.0);
    livingGroup.add(tvGroup);
    // Fluted Wall Panel
    helperMesh(new THREE.BoxGeometry(2.8, 2.5, 0.08), teakMat, 0, 1.5, 0, tvGroup);
    // Wall-Mounted Slim 4K Smart TV
    helperMesh(
      new THREE.BoxGeometry(2.0, 1.15, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x030712, roughness: 0.1, metalness: 0.85 }),
      0,
      1.6,
      0.07,
      tvGroup
    );
    // TV Ambient Screen Glow
    helperMesh(
      new THREE.BoxGeometry(1.94, 1.09, 0.02),
      new THREE.MeshBasicMaterial({ color: dark ? 0x1d4ed8 : 0x0284c7 }),
      0,
      1.6,
      0.11,
      tvGroup
    );
    // Ambient LED Backlight
    const tvBacklight = new THREE.PointLight(0x38bdf8, dark ? 0.9 : 1.2, 3.5);
    tvBacklight.position.set(0, 1.6, 0.2);
    tvGroup.add(tvBacklight);
    // Floating Media Console
    helperMesh(new THREE.BoxGeometry(2.6, 0.32, 0.45), darkWoodMat, 0, 0.58, 0.24, tvGroup);
    registerTarget(tvGroup, "tv");

    // Aeroblade Designer Ceiling Fan (Living Room)
    const livingFan = new THREE.Group();
    livingFan.position.set(-0.2, 3.0, 0.3);
    livingGroup.add(livingFan);
    helperMesh(new THREE.CylinderGeometry(0.03, 0.03, 0.48, 12), chromeMat, 0, 0.24, 0, livingFan);
    helperMesh(new THREE.CylinderGeometry(0.28, 0.28, 0.15, 24), darkWoodMat, 0, 0, 0, livingFan);
    for (let f = 0; f < 3; f++) {
      const blade = helperMesh(new THREE.BoxGeometry(0.18, 0.02, 1.2), darkWoodMat, 0, 0, 0.7, livingFan);
      blade.rotation.y = (f * Math.PI * 2) / 3;
    }
    registerTarget(livingFan, "fan");

    // Living Room Warm Recessed Downlight
    const livingLight = new THREE.PointLight(0xfff1cf, dark ? 1.5 : 2.0, 7.0);
    livingLight.position.set(-0.2, 2.85, 0.3);
    livingGroup.add(livingLight);

    // Indoor Potted Snake Plant in Ceramic Planter
    const indoorPlant = new THREE.Group();
    indoorPlant.position.set(1.1, 0, -2.5);
    livingGroup.add(indoorPlant);
    helperMesh(new THREE.CylinderGeometry(0.24, 0.18, 0.55, 16), applianceWhiteMat, 0, 0.275, 0, indoorPlant);
    helperMesh(new THREE.DodecahedronGeometry(0.35, 1), foliageMat, 0, 0.75, 0, indoorPlant);

    // ==========================================
    // 5. GROUND FLOOR CUTAWAY: MODULAR KITCHEN
    // ==========================================
    const kitchenGroup = new THREE.Group();
    kitchenGroup.position.set(3.0, 0.54, -2.2);
    houseOrigin.add(kitchenGroup);

    // L-Shaped Modular Kitchen Base Cabinets & Granite Countertop
    helperMesh(new THREE.BoxGeometry(3.3, 0.88, 0.75), darkWoodMat, 0, 0.44, 0, kitchenGroup);
    helperMesh(new THREE.BoxGeometry(3.35, 0.08, 0.78), graniteMat, 0, 0.92, 0, kitchenGroup);
    // Backsplash Tiles
    helperMesh(new THREE.BoxGeometry(3.3, 0.65, 0.04), backsplashMat, 0, 1.3, -0.37, kitchenGroup);
    // Upper Overhead Modular Cabinets
    helperMesh(new THREE.BoxGeometry(3.1, 0.78, 0.4), teakMat, 0, 2.3, -0.18, kitchenGroup);

    // 3-Burner Toughened Glass Gas Stove
    const stoveGroup = new THREE.Group();
    stoveGroup.position.set(-0.4, 0.96, 0);
    kitchenGroup.add(stoveGroup);
    helperMesh(
      new THREE.BoxGeometry(1.02, 0.06, 0.54),
      new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.1, metalness: 0.9 }),
      0,
      0.03,
      0,
      stoveGroup
    );
    for (const bx of [-0.32, 0.06, 0.38]) {
      helperMesh(new THREE.CylinderGeometry(0.08, 0.08, 0.03, 16), brassMat, bx, 0.07, 0, stoveGroup);
      const panSupport = helperMesh(new THREE.TorusGeometry(0.1, 0.015, 8, 16), chromeMat, bx, 0.08, 0, stoveGroup);
      panSupport.rotation.x = Math.PI / 2;
    }
    registerTarget(stoveGroup, "stove");

    // Kitchen Chimney (Stainless Steel & Glass Hood)
    const chimney = new THREE.Group();
    chimney.position.set(-0.4, 1.95, 0);
    kitchenGroup.add(chimney);
    helperMesh(new THREE.BoxGeometry(0.95, 0.12, 0.55), chromeMat, 0, 0.06, 0, chimney);
    helperMesh(new THREE.CylinderGeometry(0.15, 0.24, 0.75, 16), chromeMat, 0, 0.5, 0, chimney);

    // Deep Undermount Stainless Steel Sink & Gooseneck Swivel Faucet
    const sinkGroup = new THREE.Group();
    sinkGroup.position.set(0.9, 0.92, 0);
    kitchenGroup.add(sinkGroup);
    helperMesh(new THREE.BoxGeometry(0.72, 0.28, 0.52), chromeMat, 0, -0.12, 0, sinkGroup);
    const faucet = new THREE.Group();
    faucet.position.set(0, 0.08, -0.19);
    sinkGroup.add(faucet);
    helperMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.35, 12), chromeMat, 0, 0.175, 0, faucet);
    const spoutCurve = helperMesh(new THREE.TorusGeometry(0.09, 0.02, 8, 16), chromeMat, 0.07, 0.35, 0, faucet);
    spoutCurve.rotation.z = -Math.PI / 4;
    registerTarget(sinkGroup, "sink");

    // Double-Door Inverter Refrigerator
    const fridgeGroup = new THREE.Group();
    fridgeGroup.position.set(-1.25, 0, 0.95);
    kitchenGroup.add(fridgeGroup);
    helperMesh(new THREE.BoxGeometry(0.88, 1.92, 0.82), chromeMat, 0, 0.96, 0, fridgeGroup);
    // Freezer & Fridge Door Panels with Handles
    helperMesh(new THREE.BoxGeometry(0.86, 0.68, 0.04), chromeMat, 0, 1.54, 0.42, fridgeGroup);
    helperMesh(new THREE.BoxGeometry(0.86, 1.15, 0.04), chromeMat, 0, 0.61, 0.42, fridgeGroup);
    helperMesh(new THREE.BoxGeometry(0.04, 0.38, 0.04), brassMat, -0.36, 1.54, 0.46, fridgeGroup);
    helperMesh(new THREE.BoxGeometry(0.04, 0.6, 0.04), brassMat, -0.36, 0.68, 0.46, fridgeGroup);
    registerTarget(fridgeGroup, "fridge");

    // ==========================================
    // 6. GROUND FLOOR CUTAWAY: LUXURY BATHROOM
    // ==========================================
    const bathGroup = new THREE.Group();
    bathGroup.position.set(3.0, 0.54, 2.3);
    houseOrigin.add(bathGroup);

    // Wall-Hung Western Commode & Dual Flush Actuator Plate
    const toiletGroup = new THREE.Group();
    toiletGroup.position.set(0.7, 0, 0.65);
    bathGroup.add(toiletGroup);
    helperMesh(new THREE.BoxGeometry(0.7, 1.15, 0.24), wallMat, 0, 0.575, 0.44, toiletGroup);
    helperMesh(new THREE.BoxGeometry(0.24, 0.16, 0.03), chromeMat, 0, 0.9, 0.31, toiletGroup);
    helperMesh(new THREE.CylinderGeometry(0.26, 0.19, 0.4, 18), applianceWhiteMat, 0, 0.4, 0.16, toiletGroup);
    const seatTorus = helperMesh(new THREE.TorusGeometry(0.21, 0.045, 10, 20), applianceWhiteMat, 0, 0.58, 0.16, toiletGroup);
    seatTorus.rotation.x = Math.PI / 2;
    // Health Faucet / Jet Spray with chrome coiled hose
    helperMesh(new THREE.CylinderGeometry(0.015, 0.015, 0.22, 10), chromeMat, -0.38, 0.6, 0.32, toiletGroup);
    registerTarget(toiletGroup, "toilet");

    // Walk-in Shower with Frameless Glass Partition & Rain Showerhead
    const showerGroup = new THREE.Group();
    showerGroup.position.set(-0.8, 0, 0.35);
    bathGroup.add(showerGroup);
    helperMesh(new THREE.BoxGeometry(0.04, 2.3, 1.3), glassMat, 0.55, 1.15, 0, showerGroup);
    helperMesh(new THREE.BoxGeometry(0.06, 0.06, 1.3), chromeMat, 0.55, 2.3, 0, showerGroup);
    helperMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 10), chromeMat, 0, 2.4, -0.2, showerGroup);
    helperMesh(new THREE.CylinderGeometry(0.2, 0.2, 0.03, 20), chromeMat, 0, 2.15, -0.2, showerGroup);
    registerTarget(showerGroup, "shower");

    // Storage Electric Geyser with Braided SS Pipes & Temperature Dial
    const geyserGroup = new THREE.Group();
    geyserGroup.position.set(-0.9, 2.2, -0.65);
    bathGroup.add(geyserGroup);
    helperMesh(new THREE.CylinderGeometry(0.26, 0.26, 0.72, 20), applianceWhiteMat, 0, 0, 0, geyserGroup);
    const geyserRing = helperMesh(new THREE.TorusGeometry(0.1, 0.015, 8, 16), new THREE.MeshBasicMaterial({ color: 0x0284c7 }), 0, -0.12, 0.26, geyserGroup);
    for (const gx of [-0.09, 0.09]) {
      helperMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.42, 10), chromeMat, gx, -0.52, 0, geyserGroup);
    }
    registerTarget(geyserGroup, "geyser");

    // Front-Load Automatic Washing Machine
    const washingGroup = new THREE.Group();
    washingGroup.position.set(0.75, 0, -0.6);
    bathGroup.add(washingGroup);
    helperMesh(new THREE.BoxGeometry(0.8, 0.92, 0.7), applianceWhiteMat, 0, 0.46, 0, washingGroup);
    helperMesh(new THREE.TorusGeometry(0.26, 0.045, 12, 24), chromeMat, 0, 0.44, 0.36, washingGroup);
    helperMesh(new THREE.CircleGeometry(0.22, 20), glassMat, 0, 0.44, 0.37, washingGroup);
    helperMesh(new THREE.BoxGeometry(0.74, 0.16, 0.03), darkWoodMat, 0, 0.82, 0.36, washingGroup);
    registerTarget(washingGroup, "washing");

    // Floating Vanity with Mirror
    const vanityGroup = new THREE.Group();
    vanityGroup.position.set(0, 0, -0.9);
    bathGroup.add(vanityGroup);
    helperMesh(new THREE.BoxGeometry(0.9, 0.12, 0.52), graniteMat, 0, 0.85, 0, vanityGroup);
    helperMesh(new THREE.CylinderGeometry(0.24, 0.2, 0.15, 18), applianceWhiteMat, 0, 0.95, 0, vanityGroup);
    helperMesh(new THREE.CylinderGeometry(0.02, 0.02, 0.26, 10), chromeMat, 0, 1.1, -0.15, vanityGroup);
    helperMesh(new THREE.BoxGeometry(0.75, 0.9, 0.03), glassMat, 0, 1.7, -0.24, vanityGroup);

    // ==========================================
    // 7. FIRST FLOOR CUTAWAY: MASTER BEDROOM
    // ==========================================
    const bedFloorGroup = new THREE.Group();
    bedFloorGroup.position.set(-2.0, 3.95, -0.8);
    houseOrigin.add(bedFloorGroup);

    // Upholstered King-Size Bed with Headboard & Pillows
    const bedFurniture = new THREE.Group();
    bedFurniture.position.set(0, 0, -0.4);
    bedFloorGroup.add(bedFurniture);
    helperMesh(new THREE.BoxGeometry(2.5, 0.38, 2.6), teakMat, 0, 0.19, 0, bedFurniture);
    helperMesh(new THREE.BoxGeometry(2.35, 0.42, 2.45), applianceWhiteMat, 0, 0.56, 0, bedFurniture);
    helperMesh(new THREE.BoxGeometry(2.8, 1.35, 0.16), darkWoodMat, 0, 0.92, -1.32, bedFurniture);
    // Bed runner in rich navy blue
    helperMesh(
      new THREE.BoxGeometry(2.38, 0.08, 1.15),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.85 }),
      0,
      0.78,
      0.5,
      bedFurniture
    );
    // 4 Layered plush pillows
    for (const px of [-0.68, 0.68]) {
      helperMesh(new THREE.BoxGeometry(0.68, 0.18, 0.48), applianceWhiteMat, px, 0.82, -0.82, bedFurniture);
      helperMesh(new THREE.BoxGeometry(0.6, 0.16, 0.42), cushionYellowMat, px, 0.92, -0.65, bedFurniture);
    }
    // Floating Nightstands with Bedside Reading Lamps
    for (const nx of [-1.65, 1.65]) {
      helperMesh(new THREE.BoxGeometry(0.58, 0.58, 0.5), teakMat, nx, 0.29, -1.05, bedFurniture);
      helperMesh(new THREE.CylinderGeometry(0.08, 0.15, 0.26, 16), applianceWhiteMat, nx, 0.74, -1.05, bedFurniture);
      const bedLamp = new THREE.PointLight(0xfef08a, dark ? 0.8 : 1.1, 3.5);
      bedLamp.position.set(nx, 0.8, -1.05);
      bedFurniture.add(bedLamp);
    }
    registerTarget(bedFurniture, "bed");

    // Wall-Mounted Split Inverter AC Unit (Indoor)
    const acUnit = new THREE.Group();
    acUnit.position.set(0, 2.5, -2.75);
    bedFloorGroup.add(acUnit);
    helperMesh(new THREE.BoxGeometry(1.35, 0.42, 0.28), applianceWhiteMat, 0, 0, 0, acUnit);
    helperMesh(new THREE.BoxGeometry(1.25, 0.06, 0.04), chromeMat, 0, -0.16, 0.14, acUnit);
    helperMesh(new THREE.BoxGeometry(0.2, 0.08, 0.02), new THREE.MeshBasicMaterial({ color: 0x38bdf8 }), 0.38, 0.02, 0.15, acUnit);
    registerTarget(acUnit, "ac");

    // Bedroom Aeroblade Ceiling Fan
    const bedFan = new THREE.Group();
    bedFan.position.set(0, 2.95, 0.3);
    bedFloorGroup.add(bedFan);
    helperMesh(new THREE.CylinderGeometry(0.025, 0.025, 0.42, 12), chromeMat, 0, 0.21, 0, bedFan);
    helperMesh(new THREE.CylinderGeometry(0.26, 0.26, 0.14, 24), darkWoodMat, 0, 0, 0, bedFan);
    for (let f = 0; f < 3; f++) {
      const b = helperMesh(new THREE.BoxGeometry(0.16, 0.02, 1.1), darkWoodMat, 0, 0, 0.65, bedFan);
      b.rotation.y = (f * Math.PI * 2) / 3;
    }
    registerTarget(bedFan, "fan");

    // 3-Door Sliding Wardrobe with Mirror Panel
    const wardrobe = new THREE.Group();
    wardrobe.position.set(-2.1, 0, 1.3);
    bedFloorGroup.add(wardrobe);
    helperMesh(new THREE.BoxGeometry(0.72, 2.65, 1.9), darkWoodMat, 0, 1.325, 0, wardrobe);
    helperMesh(new THREE.BoxGeometry(0.04, 2.45, 0.62), glassMat, 0.37, 1.325, 0, wardrobe);

    // ==========================================
    // 8. ROOFTOP TERRACE & SERVICE ASSETS
    // ==========================================
    const roofGroup = new THREE.Group();
    roofGroup.position.set(0, 7.35, 0);
    houseOrigin.add(roofGroup);

    // Sintex Black UV-Protected Water Tank (1000L) on Elevated Pedestal
    const waterTankGroup = new THREE.Group();
    waterTankGroup.position.set(-2.8, 0, -2.0);
    roofGroup.add(waterTankGroup);
    // Concrete pedestal stand
    helperMesh(new THREE.BoxGeometry(2.0, 0.5, 2.0), concreteMat, 0, 0.25, 0, waterTankGroup);
    // Cylindrical Tank Body
    helperMesh(new THREE.CylinderGeometry(0.82, 0.82, 1.55, 24), sintexMat, 0, 1.275, 0, waterTankGroup);
    for (let r = 0; r < 4; r++) {
      const rib = helperMesh(new THREE.TorusGeometry(0.83, 0.038, 8, 24), sintexMat, 0, 0.8 + r * 0.3, 0, waterTankGroup);
      rib.rotation.x = Math.PI / 2;
    }
    helperMesh(new THREE.CylinderGeometry(0.45, 0.48, 0.18, 20), sintexMat, 0, 2.1, 0, waterTankGroup);
    // Inflow PVC Pipe with Red Ball Valve
    helperMesh(new THREE.CylinderGeometry(0.045, 0.045, 1.3, 12), applianceWhiteMat, 0.82, 0.95, 0, waterTankGroup);
    helperMesh(new THREE.BoxGeometry(0.14, 0.09, 0.09), new THREE.MeshStandardMaterial({ color: 0xdc2626 }), 0.82, 1.15, 0, waterTankGroup);
    registerTarget(waterTankGroup, "tank");

    // Monocrystalline Solar PV Array on Galvanized Iron Truss
    const solarGroup = new THREE.Group();
    solarGroup.position.set(2.0, 0, -1.3);
    roofGroup.add(solarGroup);
    const solarFrame = new THREE.Group();
    solarFrame.rotation.x = 0.38;
    solarGroup.add(solarFrame);
    for (const sx of [-1.15, 1.15]) {
      for (const sz of [-0.8, 0.8]) {
        helperMesh(new THREE.BoxGeometry(2.1, 0.06, 1.42), chromeMat, sx, 0.9, sz, solarFrame);
        helperMesh(new THREE.BoxGeometry(2.04, 0.04, 1.36), solarMat, sx, 0.93, sz, solarFrame);
      }
    }
    // Galvanized Mounting Legs
    for (const stx of [-1.9, 0, 1.9]) {
      helperMesh(new THREE.BoxGeometry(0.06, 1.25, 0.06), chromeMat, stx, 0.625, -0.65, solarGroup);
      helperMesh(new THREE.BoxGeometry(0.06, 0.55, 0.06), chromeMat, stx, 0.275, 0.85, solarGroup);
    }
    registerTarget(solarGroup, "solar");

    // AC Outdoor Condenser Unit on Anti-Vibration Pads
    const acOutdoor = new THREE.Group();
    acOutdoor.position.set(3.6, 0, 2.0);
    roofGroup.add(acOutdoor);
    helperMesh(new THREE.BoxGeometry(1.0, 0.16, 0.52), concreteMat, 0, 0.08, 0, acOutdoor);
    helperMesh(new THREE.BoxGeometry(0.9, 0.7, 0.42), applianceWhiteMat, 0, 0.52, 0, acOutdoor);
    helperMesh(new THREE.TorusGeometry(0.24, 0.035, 10, 20), chromeMat, 0.14, 0.52, 0.22, acOutdoor);
    helperMesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.85, 10),
      new THREE.MeshStandardMaterial({ color: 0x1f2937 }),
      -0.38,
      0.44,
      0.16,
      acOutdoor
    );
    registerTarget(acOutdoor, "ac");

    // ==========================================
    // 9. OUTDOOR SERVICE VEHICLES
    // ==========================================
    // 1. Family Car (Modern Compact SUV / Sedan in Driveway)
    const carGroup = new THREE.Group();
    carGroup.position.set(4.8, 0.08, 3.5);
    root.add(carGroup);
    // Lower body & Chassis
    helperMesh(new THREE.BoxGeometry(2.2, 0.62, 4.4), carPaintMat, 0, 0.6, 0, carGroup);
    // Upper Cabin Glass & Pillars
    helperMesh(new THREE.BoxGeometry(1.92, 0.66, 2.5), carPaintMat, 0, 1.2, -0.22, carGroup);
    const windshield = helperMesh(new THREE.BoxGeometry(1.86, 0.56, 1.15), glassMat, 0, 1.12, 0.75, carGroup);
    windshield.rotation.x = -0.32;
    const rearGlass = helperMesh(new THREE.BoxGeometry(1.86, 0.54, 0.95), glassMat, 0, 1.12, -1.25, carGroup);
    rearGlass.rotation.x = 0.28;
    helperMesh(new THREE.BoxGeometry(1.94, 0.45, 1.9), glassMat, 0, 1.18, -0.22, carGroup);
    // 4 Alloy Wheels with Rubber Tyres
    for (const wx of [-1.1, 1.1]) {
      for (const wz of [-1.3, 1.3]) {
        const wheel = new THREE.Group();
        wheel.position.set(wx, 0.4, wz);
        carGroup.add(wheel);
        const tyre = helperMesh(new THREE.CylinderGeometry(0.4, 0.4, 0.26, 20), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 }), 0, 0, 0, wheel);
        tyre.rotation.z = Math.PI / 2;
        const rim = helperMesh(new THREE.CylinderGeometry(0.26, 0.26, 0.28, 16), chromeMat, 0, 0, 0, wheel);
        rim.rotation.z = Math.PI / 2;
      }
    }
    // LED Headlamps, Chrome Grille & Taillights
    helperMesh(new THREE.BoxGeometry(0.45, 0.15, 0.06), new THREE.MeshBasicMaterial({ color: 0xfef08a }), -0.7, 0.66, 2.21, carGroup);
    helperMesh(new THREE.BoxGeometry(0.45, 0.15, 0.06), new THREE.MeshBasicMaterial({ color: 0xfef08a }), 0.7, 0.66, 2.21, carGroup);
    helperMesh(new THREE.BoxGeometry(0.7, 0.24, 0.05), chromeMat, 0, 0.58, 2.22, carGroup);
    helperMesh(new THREE.BoxGeometry(0.45, 0.15, 0.05), new THREE.MeshBasicMaterial({ color: 0xef4444 }), -0.75, 0.7, -2.21, carGroup);
    helperMesh(new THREE.BoxGeometry(0.45, 0.15, 0.05), new THREE.MeshBasicMaterial({ color: 0xef4444 }), 0.75, 0.7, -2.21, carGroup);
    registerTarget(carGroup, "car");

    // 2. Commuter Motorcycle parked near veranda
    const bikeGroup = new THREE.Group();
    bikeGroup.position.set(1.5, 0.08, 6.4);
    bikeGroup.rotation.y = -0.42;
    root.add(bikeGroup);
    helperMesh(new THREE.BoxGeometry(0.35, 0.48, 1.15), chromeMat, 0, 0.55, 0, bikeGroup);
    helperMesh(new THREE.BoxGeometry(0.45, 0.38, 0.8), bikePaintMat, 0, 0.9, 0.22, bikeGroup);
    helperMesh(new THREE.BoxGeometry(0.38, 0.18, 1.0), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 }), 0, 0.86, -0.48, bikeGroup);
    // Wheels
    for (const bz of [-0.9, 0.9]) {
      const bw = new THREE.Group();
      bw.position.set(0, 0.44, bz);
      bikeGroup.add(bw);
      const bTyre = helperMesh(new THREE.CylinderGeometry(0.44, 0.44, 0.13, 20), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.85 }), 0, 0, 0, bw);
      bTyre.rotation.z = Math.PI / 2;
      const bRim = helperMesh(new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16), chromeMat, 0, 0, 0, bw);
      bRim.rotation.z = Math.PI / 2;
    }
    const exhaust = helperMesh(new THREE.CylinderGeometry(0.045, 0.055, 1.15, 12), chromeMat, 0.26, 0.34, -0.42, bikeGroup);
    exhaust.rotation.x = Math.PI / 2;
    helperMesh(new THREE.BoxGeometry(0.9, 0.05, 0.05), chromeMat, 0, 1.18, 0.7, bikeGroup);
    helperMesh(new THREE.SphereGeometry(0.13, 12, 12), new THREE.MeshBasicMaterial({ color: 0xfef08a }), 0, 1.0, 0.96, bikeGroup);
    registerTarget(bikeGroup, "bike");

    // 3. Red Farm Tractor (Mahindra/Swaraj style near agricultural edge)
    const tractorGroup = new THREE.Group();
    tractorGroup.position.set(8.8, 0.08, 0.6);
    tractorGroup.rotation.y = Math.PI * 0.92;
    root.add(tractorGroup);
    // Red Engine Cowl & Body
    helperMesh(new THREE.BoxGeometry(1.2, 0.8, 2.2), tractorPaintMat, 0, 0.92, 0.42, tractorGroup);
    helperMesh(new THREE.BoxGeometry(1.45, 0.28, 1.45), tractorPaintMat, 0, 0.7, -0.95, tractorGroup);
    // Big Rear Deep-Lug Tractor Wheels
    for (const trx of [-0.9, 0.9]) {
      const rw = new THREE.Group();
      rw.position.set(trx, 0.8, -0.95);
      tractorGroup.add(rw);
      const rTyre = helperMesh(new THREE.CylinderGeometry(0.8, 0.8, 0.42, 22), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95 }), 0, 0, 0, rw);
      rTyre.rotation.z = Math.PI / 2;
      const rRim = helperMesh(new THREE.CylinderGeometry(0.5, 0.5, 0.44, 16), new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 }), 0, 0, 0, rw);
      rRim.rotation.z = Math.PI / 2;
    }
    // Front Steer Wheels
    for (const tfx of [-0.72, 0.72]) {
      const fw = new THREE.Group();
      fw.position.set(tfx, 0.48, 1.2);
      tractorGroup.add(fw);
      const fTyre = helperMesh(new THREE.CylinderGeometry(0.48, 0.48, 0.24, 18), new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.95 }), 0, 0, 0, fw);
      fTyre.rotation.z = Math.PI / 2;
      const fRim = helperMesh(new THREE.CylinderGeometry(0.3, 0.3, 0.26, 14), new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.4 }), 0, 0, 0, fw);
      fRim.rotation.z = Math.PI / 2;
    }
    // Chrome Vertical Exhaust Silencer Stack
    helperMesh(new THREE.CylinderGeometry(0.055, 0.055, 1.45, 12), chromeMat, 0.48, 1.75, 0.85, tractorGroup);
    // Sprung Driver Seat & Steering Wheel
    helperMesh(new THREE.BoxGeometry(0.58, 0.14, 0.52), new THREE.MeshStandardMaterial({ color: 0x1f2937 }), 0, 1.1, -0.9, tractorGroup);
    const steering = helperMesh(new THREE.TorusGeometry(0.19, 0.026, 8, 16), chromeMat, 0, 1.4, -0.32, tractorGroup);
    steering.rotation.x = -0.52;
    registerTarget(tractorGroup, "tractor");

    // ==========================================
    // 10. INTERACTION, RAYCASTING & CAMERA ORBIT
    // ==========================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let isDragging = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    let targetRotationY = 0;
    let currentRotationY = 0;
    let targetRotationX = 0;
    let currentRotationX = 0;

    let hoveredMesh: THREE.Mesh | null = null;
    const highlightMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.2,
      metalness: 0.5,
      emissive: 0x0284c7,
      emissiveIntensity: 0.5,
    });

    const getEventPos = (e: MouseEvent | Touch) => {
      const rect = renderer.domElement.getBoundingClientRect();
      return {
        x: ((e.clientX - rect.left) / rect.width) * 2 - 1,
        y: -((e.clientY - rect.top) / rect.height) * 2 + 1,
      };
    };

    const findTargetFromIntersection = (intersects: THREE.Intersection[]) => {
      for (const hit of intersects) {
        let curr: THREE.Object3D | null = hit.object;
        while (curr && !curr.userData.target) {
          curr = curr.parent;
        }
        if (curr?.userData.target && SERVICE_CATALOG[curr.userData.target]) {
          return { id: curr.userData.target as string, mesh: hit.object as THREE.Mesh };
        }
      }
      return null;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - lastMouseX;
        const deltaY = e.clientY - lastMouseY;
        targetRotationY += deltaX * 0.006;
        targetRotationX = Math.max(-0.25, Math.min(0.35, targetRotationX + deltaY * 0.003));
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
        return;
      }
      const p = getEventPos(e);
      mouse.x = p.x;
      mouse.y = p.y;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, true);
      const target = findTargetFromIntersection(hits);

      if (target) {
        setHover(target.id);
        container.style.cursor = "pointer";
      } else {
        setHover(null);
        container.style.cursor = "grab";
      }
    };

    const onClick = (e: MouseEvent) => {
      const p = getEventPos(e);
      mouse.x = p.x;
      mouse.y = p.y;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(interactiveMeshes, true);
      const target = findTargetFromIntersection(hits);
      if (target) {
        setActive(target.id);
        setSelected(target.id);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    domElement.addEventListener("pointermove", onPointerMove);
    domElement.addEventListener("click", onClick);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight || 640;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Camera viewpoints per mode
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        targetRotationY += 0.0005;
      }
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;

      root.rotation.y = currentRotationY;
      root.rotation.x = currentRotationX;

      let cameraTargetPos: THREE.Vector3;
      let cameraLookTarget: THREE.Vector3;

      if (viewMode === "ground") {
        // Close-up on Ground Floor Living, Kitchen & Bath
        cameraTargetPos = new THREE.Vector3(1.6, 4.2, 10.5);
        cameraLookTarget = new THREE.Vector3(0, 1.8, 0);
      } else if (viewMode === "first") {
        // First Floor Master Bedroom, AC, Fan & Balcony
        cameraTargetPos = new THREE.Vector3(-0.8, 6.4, 9.8);
        cameraLookTarget = new THREE.Vector3(-1.0, 4.6, 0);
      } else if (viewMode === "rooftop") {
        // Rooftop Solar Array, Water Tank & AC Compressor
        cameraTargetPos = new THREE.Vector3(8.8, 12.0, 11.5);
        cameraLookTarget = new THREE.Vector3(0, 6.2, 0);
      } else {
        // Panoramic 3/4 Exterior View
        cameraTargetPos = new THREE.Vector3(13.5, 9.5, 15.5);
        cameraLookTarget = new THREE.Vector3(0, 2.4, 0);
      }

      camera.position.lerp(cameraTargetPos, 0.045);
      camera.lookAt(cameraLookTarget);

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", onResize);
      domElement.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      domElement.removeEventListener("pointermove", onPointerMove);
      domElement.removeEventListener("click", onClick);
      renderer.dispose();
      if (container.contains(domElement)) {
        container.removeChild(domElement);
      }
    };
  }, [dark, viewMode]);

  if (!ok) return <WebGLFallback />;

  const currentService = SERVICE_CATALOG[active] || SERVICE_CATALOG.ac;

  return (
    <div className="relative h-[580px] md:h-[680px] w-full overflow-hidden rounded-[2.5rem] border border-slate-200/90 bg-gradient-to-b from-amber-50/60 via-sky-50/40 to-slate-100 dark:border-slate-800 dark:from-[#08101e] dark:via-[#0b1426] dark:to-[#060c18] select-none shadow-2xl shadow-slate-900/10">
      {/* Three.js 3D WebGL Canvas */}
      <div ref={mount} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Top Controls: Camera View Switcher */}
      <div className="absolute left-3 top-3 z-30 flex flex-wrap gap-1.5 sm:left-6 sm:top-6 sm:gap-2">
        <button
          onClick={() => setViewMode("exterior")}
          className={`flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-black shadow-lg transition-all ${
            viewMode === "exterior"
              ? "bg-brand-orange text-white shadow-orange-500/25 scale-105"
              : "bg-white/90 text-slate-800 hover:bg-white dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
          }`}
        >
          <Home className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Full Estate" : "पूरा घर"}</span>
        </button>

        <button
          onClick={() => setViewMode("ground")}
          className={`flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-black shadow-lg transition-all ${
            viewMode === "ground"
              ? "bg-brand-orange text-white shadow-orange-500/25 scale-105"
              : "bg-white/90 text-slate-800 hover:bg-white dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
          }`}
        >
          <Rotate3D className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Living & Kitchen" : "लिविंग व किचन"}</span>
        </button>

        <button
          onClick={() => setViewMode("first")}
          className={`flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-black shadow-lg transition-all ${
            viewMode === "first"
              ? "bg-brand-orange text-white shadow-orange-500/25 scale-105"
              : "bg-white/90 text-slate-800 hover:bg-white dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Bedroom & AC" : "बेडरूम व एसी"}</span>
        </button>

        <button
          onClick={() => setViewMode("rooftop")}
          className={`flex items-center gap-1.5 rounded-2xl px-3 py-2 text-xs font-black shadow-lg transition-all ${
            viewMode === "rooftop"
              ? "bg-brand-orange text-white shadow-orange-500/25 scale-105"
              : "bg-white/90 text-slate-800 hover:bg-white dark:bg-slate-900/90 dark:text-white dark:hover:bg-slate-900"
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Solar & Roof" : "छत व सोलर"}</span>
        </button>
      </div>

      {/* Floating Hotspot Hover Badge Indicator */}
      {hover && SERVICE_CATALOG[hover] && (
        <div className="pointer-events-none absolute left-1/2 top-16 z-30 -translate-x-1/2 rounded-full border border-white/20 bg-slate-950/90 px-4 py-2 text-xs font-black text-white shadow-2xl backdrop-blur-md animate-in fade-in zoom-in-95 duration-150 flex items-center gap-2">
          <span className="text-base">{SERVICE_CATALOG[hover].emoji}</span>
          <span className="truncate max-w-[200px] sm:max-w-none">
            {lang === "en" ? SERVICE_CATALOG[hover].en : SERVICE_CATALOG[hover].hi}
          </span>
          <span className="text-[10px] text-amber-300 font-bold bg-amber-500/20 px-2 py-0.5 rounded-full">
            {lang === "en" ? "Click to Book" : "क्लिक करें"}
          </span>
        </div>
      )}

      {/* Selected Kaamigar Hotspot Modal Card */}
      {selected && SERVICE_CATALOG[selected] && (
        <div className="absolute left-1/2 top-1/2 z-40 w-[min(92%,430px)] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/20 bg-slate-950/95 p-6 text-white shadow-2xl backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={() => setSelected(null)}
            className="absolute right-4 top-4 rounded-full p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex items-start gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-orange/30 to-amber-500/20 text-3xl shadow-inner border border-brand-orange/30">
              {SERVICE_CATALOG[selected].emoji}
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs font-bold uppercase tracking-wider text-amber-400">
                {lang === "en" ? SERVICE_CATALOG[selected].categoryNameEn : SERVICE_CATALOG[selected].categoryNameHi}
              </div>
              <div className="text-lg font-black text-white leading-snug">
                {lang === "en" ? SERVICE_CATALOG[selected].en : SERVICE_CATALOG[selected].hi}
              </div>
              <div className="mt-1 text-xs text-slate-300 leading-relaxed">
                {lang === "en" ? SERVICE_CATALOG[selected].problem : SERVICE_CATALOG[selected].problemHi}
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-white/5 p-2.5 text-xs">
            <div>
              <div className="text-[11px] text-slate-400">{lang === "en" ? "Estimated Price:" : "अनुमानित खर्च:"}</div>
              <div className="font-black text-emerald-400 text-sm">{SERVICE_CATALOG[selected].priceEstimate}</div>
            </div>
            <div>
              <div className="text-[11px] text-slate-400">{lang === "en" ? "Response Time:" : "पहुंच का समय:"}</div>
              <div className="font-black text-amber-300 text-sm">{SERVICE_CATALOG[selected].timeEstimate}</div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                onSelectCategory?.(SERVICE_CATALOG[selected].service);
                setSelected(null);
              }}
              className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-xs font-black text-white transition-all hover:bg-white/20 hover:scale-[1.02]"
            >
              {lang === "en" ? "Explore Category" : "कामिगार सूची"}
            </button>
            <button
              onClick={() => {
                onBookClick?.(SERVICE_CATALOG[selected].service);
                setSelected(null);
              }}
              className="rounded-2xl bg-brand-orange px-4 py-3 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:scale-[1.02]"
            >
              {lang === "en" ? "Book Service Now" : "अभी बुक करें"}
            </button>
          </div>
        </div>
      )}

      {/* Bottom Service Hotspot Quick-Action Bar */}
      <div className="absolute bottom-3 left-3 right-3 z-30 flex items-center justify-between gap-3 rounded-2xl border border-white/10 bg-slate-950/85 p-3 text-white shadow-2xl backdrop-blur-xl sm:bottom-4 sm:left-6 sm:right-6 sm:p-3.5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-orange/20 text-2xl border border-brand-orange/30">
            {currentService.emoji}
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-black text-white">
              {lang === "en" ? currentService.en : currentService.hi}
            </div>
            <div className="mt-0.5 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-300">
              <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">
                {lang === "en"
                  ? "Click any item in 3D house to book repair"
                  : "3D घर में किसी भी वस्तु पर क्लिक करें — तुरंत मिस्त्री पाएं"}
              </span>
            </div>
          </div>
        </div>

        <button
          onClick={() => onBookClick?.(currentService.service)}
          className="flex shrink-0 items-center gap-1.5 rounded-xl bg-brand-orange px-4 py-2.5 text-xs font-black text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:scale-105"
        >
          <Wrench className="h-3.5 w-3.5" />
          <span>{lang === "en" ? "Book Repair" : "मरम्मत बुक करें"}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Interactive Orbit Help Pill */}
      <div className="absolute bottom-[78px] right-3 z-20 hidden rounded-full bg-slate-950/70 border border-white/10 px-3.5 py-1.5 text-[10px] font-bold text-slate-200 shadow-xl backdrop-blur-md sm:flex items-center gap-1.5">
        <span>↔</span>
        <span>
          {lang === "en"
            ? "Drag to orbit • Click 20+ real house items"
            : "घुमाकर देखें • घर की 20+ चीज़ों पर क्लिक करें"}
        </span>
      </div>
    </div>
  );
}