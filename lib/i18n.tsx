"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "hi" | "en" | "hinglish";

interface I18nContextType {
  lang: Language;
  setLang: (l: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  // 1. HINDI (हिन्दी) — Natural, respectful, simple everyday Hindi
  hi: {
    // Brand
    "brand.name": "कामगार",
    "brand.tagline": "काम है? कामगार है।",
    "brand.subtitle": "अपने पास भरोसेमंद कामगार ढूंढें।",

    // Navbar
    "nav.home": "होम",
    "nav.services": "सेवाएं",
    "nav.howItWorks": "कैसे काम करता है",
    "nav.workers": "कामगार भाईयों के लिए",
    "nav.trust": "भरोसा और सुरक्षा",
    "nav.faq": "मदद और सवाल",
    "nav.login": "लॉगिन",
    "nav.findKaamigar": "कामगार ढूंढें",
    "nav.joinKaamigar": "कामगार बनें",

    // Hero
    "hero.badge": "🛡️ 100% वेरिफाइड स्थानीय कामगार",
    "hero.title": "काम है? कामगार है।",
    "hero.subtitle": "अपने घर के कामों के लिए भरोसेमंद स्थानीय कामगार ढूंढें — बिजली, नल, बढ़ई, एसी या सफ़ाई।",
    "hero.ctaPrimary": "कामगार ढूंढें",
    "hero.ctaSecondary": "कामगार बनें",
    "hero.stat1": "10,000+ कामगार",
    "hero.stat2": "15 मिनट में रिस्पांस",
    "hero.stat3": "4.9/5 स्टार रेटिंग",

    // Search
    "search.heading": "आपको किस काम के लिए मदद चाहिए?",
    "search.placeholder": "जैसे: प्लंबर, इलेक्ट्रीशियन, एसी रिपेयर, पंखा...",
    "search.location": "मेरे पास के",
    "search.locationDetecting": "लोकेशन देख रहे हैं...",
    "search.currentCity": "सेक्टर 14, गुड़गांव",
    "search.voiceBtn": "बोलकर बताएं",
    "search.voiceListening": "सुन रहे हैं... बोलिए",
    "search.submit": "कामगार ढूंढें",
    "search.popular": "अक्सर ढूंढे जाने वाले:",

    // Services
    "services.heading": "आपको किस काम के लिए मदद चाहिए?",
    "services.subheading": "अपने मोहल्ले के अनुभवी और वेरिफाइड कामगार। पहले दाम, फिर काम।",
    "services.bookNow": "अभी बुक करें",
    "services.startsFrom": "शुरुआती दाम",
    "services.viewAll": "सभी सेवाएं देखें",

    // Nearby Workers
    "nearby.heading": "आपके पास के कामगार",
    "nearby.subheading": "आपके मोहल्ले में अभी उपलब्ध कामगार। सीधी बात, तुरंत मदद।",
    "nearby.available": "अभी उपलब्ध",
    "nearby.distance": "दूरी",
    "nearby.completed": "काम पूरे किए",
    "nearby.call": "कॉल करें",
    "nearby.viewProfile": "प्रोफाइल देखें",
    "nearby.book": "बुक करें",
    "nearby.verified": "वेरिफाइड",

    // How It Works
    "hiw.heading": "काम करवाना कितना आसान है?",
    "hiw.subheading": "बस 4 आसान चरणों में आपके घर का काम पूरा होगा",
    "hiw.step1.num": "1️⃣",
    "hiw.step1.title": "काम चुनें",
    "hiw.step1.desc": "जो काम करवाना है उसे चुनें — प्लंबर, बिजली, कारपेंटर या एसी।",
    "hiw.step2.num": "2️⃣",
    "hiw.step2.title": "कामगार चुनें",
    "hiw.step2.desc": "अपने पास के रेटिंग और रिव्यू देखकर भरोसेमंद कामगार चुनें।",
    "hiw.step3.num": "3️⃣",
    "hiw.step3.title": "बुक करें",
    "hiw.step3.desc": "समय तय करें। कोई छुपा हुआ चार्ज नहीं, तय दाम।",
    "hiw.step4.num": "4️⃣",
    "hiw.step4.title": "काम करवाएं",
    "hiw.step4.desc": "कामगार समय पर आएंगे। काम देखने के बाद ही भुगतान करें।",

    // Trust & Safety
    "trust.heading": "भरोसे के साथ काम करवाएं।",
    "trust.subheading": "“क्या यह आदमी भरोसेमंद है?” — हमारा जवाब है: हाँ, बिल्कुल।",
    "trust.item1.title": "100% वेरिफाइड कामगार",
    "trust.item1.desc": "आधार कार्ड और स्थानीय पुलिस जांच के बाद ही कामगार को लिस्ट किया जाता है।",
    "trust.item2.title": "पहले दाम, फिर काम",
    "trust.item2.desc": "काम शुरू होने से पहले तय रेट। घर आकर कोई मोलभाव या अतिरिक्त चार्ज नहीं।",
    "trust.item3.title": "आपके मोहल्ले के पास",
    "trust.item3.desc": "कामगार आपके पास के इलाके से होते हैं, इसलिए 15-30 मिनट में पहुंच जाते हैं।",
    "trust.item4.title": "मदद हमेशा उपलब्ध",
    "trust.item4.desc": "हिंदी और आपकी भाषा में कॉल व व्हाट्सएप सपोर्ट। काम से संतुष्ट न हों तो तुरंत समाधान।",

    // For Workers
    "worker.heading": "आप कामगार हैं?",
    "worker.subheading": "अपना काम दिखाएं, नए कस्टमर्स पाएं और अपनी कमाई बढ़ाएं।",
    "worker.desc": "बिना किसी ऑफिस के चक्कर काटे, सीधे अपने मोबाइल से रोज़ का काम पाएं। सम्मान, सुरक्षा और समय पर पूरी कमाई।",
    "worker.cta": "कामगार के रूप में जुड़ें",
    "worker.whatsapp": "व्हाट्सएप पर जुड़ें ('काम' लिखकर भेजें)",
    "worker.missedCall": "मिस्ड कॉल दें: 1800-120-5226",
    "worker.benefit1": "रोज़ाना घर के पास काम (3-5 किमी में)",
    "worker.benefit2": "सीधा बैंक खाते या UPI में भुगतान",
    "worker.benefit3": "पहले 10 काम पर कोई कमीशन नहीं (100% आपकी)",
    "worker.benefit4": "मुफ्त दुर्घटना बीमा और सुरक्षा",

    // App Preview
    "app.heading": "मोबाइल पर कामगार इस्तेमाल करना बहुत आसान है",
    "app.subheading": "चाहे स्मार्टफोन नया हो या पुराना, ऐप बहुत हल्का और तेज़ चलता है।",
    "app.feature1": "आसान हिंदी और बोलकर सर्च करें",
    "app.feature2": "व्हाट्सएप पर तुरंत बुकिंग अपडेट",
    "app.feature3": "कामगार की लाइव लोकेशन देखें",

    // FAQ
    "faq.heading": "अक्सर पूछे जाने वाले सवाल",
    "faq.subheading": "आपके मन में कोई सवाल है? यहाँ जवाब पाएं।",

    // Final CTA
    "final.title": "काम है? टेंशन मत लो। कामगार है।",
    "final.subtitle": "आज ही अपने पास के भरोसेमंद कामगार को बुक करें और घर का काम बिना किसी परेशानी के करवाएं।",
    "final.cta": "अभी कामगार ढूंढें",

    // Footer
    "footer.desc": "भारत का अपना स्थानीय कामगार नेटवर्क — नल, बिजली, बढ़ई और घर के सभी कामों के लिए भरोसेमंद साथी।",
    "footer.customers": "ग्राहकों के लिए",
    "footer.workers": "कामगारों के लिए",
    "footer.company": "कंपनी",
    "footer.rights": "© 2026 कामगार टेक्नोलॉजीज। सभी अधिकार सुरक्षित।",
  },

  // 2. ENGLISH — Clear, simple, warm (avoiding overly corporate SaaS jargon)
  en: {
    // Brand
    "brand.name": "KAAMIGAR",
    "brand.tagline": "Kaam hai? Kaamigar hai.",
    "brand.subtitle": "Find trusted local workers near you.",

    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.howItWorks": "How It Works",
    "nav.workers": "For Kaamigar",
    "nav.trust": "Trust & Safety",
    "nav.faq": "Help / FAQ",
    "nav.login": "Login",
    "nav.findKaamigar": "Find a Kaamigar",
    "nav.joinKaamigar": "Join as a Kaamigar",

    // Hero
    "hero.badge": "🛡️ 100% Verified Local Workers",
    "hero.title": "Kaam hai? Kaamigar hai.",
    "hero.subtitle": "Find trusted local workers near you for everyday repairs, plumbing, electrical, carpentry, AC and cleaning.",
    "hero.ctaPrimary": "Find a Kaamigar",
    "hero.ctaSecondary": "Join as a Kaamigar",
    "hero.stat1": "10,000+ Workers",
    "hero.stat2": "15 Min Arrival",
    "hero.stat3": "4.9/5 Star Rating",

    // Search
    "search.heading": "What work do you need help with?",
    "search.placeholder": "Plumber, Electrician, AC Repair, Fan...",
    "search.location": "Near me",
    "search.locationDetecting": "Locating...",
    "search.currentCity": "Sector 14, Gurgaon",
    "search.voiceBtn": "Speak to Search",
    "search.voiceListening": "Listening... Speak now",
    "search.submit": "Find Kaamigar",
    "search.popular": "Popular Searches:",

    // Services
    "services.heading": "What work do you need help with?",
    "services.subheading": "Experienced, verified workers from your neighborhood. Upfront prices, no bargaining.",
    "services.bookNow": "Book Now",
    "services.startsFrom": "Starts from",
    "services.viewAll": "View All Services",

    // Nearby Workers
    "nearby.heading": "Workers near you",
    "nearby.subheading": "Available right now in your neighborhood. Direct contact, instant help.",
    "nearby.available": "Available Now",
    "nearby.distance": "away",
    "nearby.completed": "jobs completed",
    "nearby.call": "Call Now",
    "nearby.viewProfile": "View Profile",
    "nearby.book": "Book",
    "nearby.verified": "Verified",

    // How It Works
    "hiw.heading": "How Kaamigar Works",
    "hiw.subheading": "Get your home repairs done in 4 simple steps",
    "hiw.step1.num": "1️⃣",
    "hiw.step1.title": "Choose your work",
    "hiw.step1.desc": "Pick what needs fixing — plumber, electrician, carpenter, or AC.",
    "hiw.step2.num": "2️⃣",
    "hiw.step2.title": "Choose a Kaamigar",
    "hiw.step2.desc": "Check verified profiles, ratings, and distance to pick the best person.",
    "hiw.step3.num": "3️⃣",
    "hiw.step3.title": "Book",
    "hiw.step3.desc": "Set your preferred time. Fixed honest price, zero hidden charges.",
    "hiw.step4.num": "4️⃣",
    "hiw.step4.title": "Get the work done",
    "hiw.step4.desc": "The Kaamigar arrives on time. Inspect the work and pay safely.",

    // Trust & Safety
    "trust.heading": "Work done with complete trust.",
    "trust.subheading": "“Is this person reliable and safe?” — Our answer is: Absolutely yes.",
    "trust.item1.title": "100% Verified Workers",
    "trust.item1.desc": "Every Kaamigar undergoes government ID and background verification before joining.",
    "trust.item2.title": "Upfront Honest Rates",
    "trust.item2.desc": "Clear pricing before work begins. No awkward doorstep negotiations.",
    "trust.item3.title": "From Your Neighborhood",
    "trust.item3.desc": "Workers live within 3–5 km of your locality, ensuring quick 15–30 min arrival.",
    "trust.item4.title": "Help Whenever You Need",
    "trust.item4.desc": "Dedicated call and WhatsApp support in Hindi and English. We stand by your satisfaction.",

    // For Workers
    "worker.heading": "Are you a Kaamigar?",
    "worker.subheading": "Showcase your work, get new local customers, and grow your daily income.",
    "worker.desc": "No middlemen. Get daily work directly on your mobile phone in your neighborhood with dignity and security.",
    "worker.cta": "Join as a Kaamigar",
    "worker.whatsapp": "Join via WhatsApp (Send 'KAAM')",
    "worker.missedCall": "Give a Missed Call: 1800-120-5226",
    "worker.benefit1": "Jobs close to home (within 3-5 km)",
    "worker.benefit2": "Daily payouts directly to bank or UPI",
    "worker.benefit3": "Zero commission on your first 10 jobs",
    "worker.benefit4": "Free accidental cover & support",

    // App Preview
    "app.heading": "Simple to use on any mobile phone",
    "app.subheading": "Lightweight, fast, and designed to work smoothly on everyday Android phones.",
    "app.feature1": "Voice search in your language",
    "app.feature2": "Instant WhatsApp updates & receipt",
    "app.feature3": "Live worker status & arrival tracking",

    // FAQ
    "faq.heading": "Frequently Asked Questions",
    "faq.subheading": "Common questions about booking and working with Kaamigar.",

    // Final CTA
    "final.title": "Kaam hai? Tension mat lo. Kaamigar hai.",
    "final.subtitle": "Book a trusted local worker near you today and get your repairs solved without hassle.",
    "final.cta": "Find a Kaamigar Now",

    // Footer
    "footer.desc": "India's friendly local service platform — connecting homes and shops with trusted nearby workers.",
    "footer.customers": "For Customers",
    "footer.workers": "For Kaamigar",
    "footer.company": "Company",
    "footer.rights": "© 2026 Kaamigar Technologies. All rights reserved.",
  },

  // 3. HINGLISH — Conversational, urban-familiar, natural Indian phrasing
  hinglish: {
    // Brand
    "brand.name": "KAAMIGAR",
    "brand.tagline": "Kaam hai? Kaamigar hai.",
    "brand.subtitle": "Apne paas bharosemand Kaamigar dhoondhein.",

    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.howItWorks": "Kaise Kaam Karta Hai",
    "nav.workers": "Kaamigar Bhaiyon Ke Liye",
    "nav.trust": "Bharosa & Safety",
    "nav.faq": "Madad & FAQ",
    "nav.login": "Login",
    "nav.findKaamigar": "Kaamigar Dhoondhein",
    "nav.joinKaamigar": "Kaamigar Banein",

    // Hero
    "hero.badge": "🛡️ 100% Verified Local Kaamigar",
    "hero.title": "Kaam hai? Kaamigar hai.",
    "hero.subtitle": "Ghar ke kaam ke liye apne paas ke bharosemand Kaamigar dhoondhein — Plumber, Electrician, Carpenter, AC aur Safai.",
    "hero.ctaPrimary": "Kaamigar Dhoondhein",
    "hero.ctaSecondary": "Kaamigar Banein",
    "hero.stat1": "10,000+ Kaamigar",
    "hero.stat2": "15 Min Mein Reach",
    "hero.stat3": "4.9/5 Star Rating",

    // Search
    "search.heading": "Aapko kis kaam ke liye Kaamigar chahiye?",
    "search.placeholder": "Plumber, Electrician, AC Repair, Fan...",
    "search.location": "Mere paas ke",
    "search.locationDetecting": "Location dhoondh rahe hain...",
    "search.currentCity": "Sector 14, Gurgaon",
    "search.voiceBtn": "Bolkar batayein",
    "search.voiceListening": "Sun rahe hain... boliye",
    "search.submit": "Search Karein",
    "search.popular": "Popular Kaam:",

    // Services
    "services.heading": "Aapko kis kaam ke liye help chahiye?",
    "services.subheading": "Apne mohalle ke verified aur expert Kaamigar. Pehle daam, phir kaam.",
    "services.bookNow": "Abhi Book Karein",
    "services.startsFrom": "Starting price",
    "services.viewAll": "Saari Services Dekhein",

    // Nearby Workers
    "nearby.heading": "Aapke paas ke Kaamigar",
    "nearby.subheading": "Aapke mohalle mein abhi available workers. Direct baat, turant help.",
    "nearby.available": "Abhi Available",
    "nearby.distance": "door",
    "nearby.completed": "kaam kiye",
    "nearby.call": "Call Karein",
    "nearby.viewProfile": "Profile Dekhein",
    "nearby.book": "Book Karein",
    "nearby.verified": "Verified",

    // How It Works
    "hiw.heading": "Kaam karwana kitna simple hai?",
    "hiw.subheading": "Bas 4 simple steps mein aapke ghar ka kaam done",
    "hiw.step1.num": "1️⃣",
    "hiw.step1.title": "Kaam chunein",
    "hiw.step1.desc": "Jo bhi kaam karwana hai select karein — Plumber, Bijli, Carpenter ya AC.",
    "hiw.step2.num": "2️⃣",
    "hiw.step2.title": "Kaamigar chunein",
    "hiw.step2.desc": "Ratings aur distance dekhkar apne paas ke verified Kaamigar chunein.",
    "hiw.step3.num": "3️⃣",
    "hiw.step3.title": "Book karein",
    "hiw.step3.desc": "Apna time fix karein. Pehle fix rate, koi hidden charge nahi.",
    "hiw.step4.num": "4️⃣",
    "hiw.step4.title": "Kaam karwayein",
    "hiw.step4.desc": "Kaamigar time par aayenge. Kaam check karne ke baad payment karein.",

    // Trust & Safety
    "trust.heading": "Bharose ke saath kaam karayein.",
    "trust.subheading": "“Kya ye aadmi bharosemand hai?” — Hamara answer hai: Bilkul yes.",
    "trust.item1.title": "100% Verified Kaamigar",
    "trust.item1.desc": "Aadhaar card aur local background verification ke baad hi list hote hain.",
    "trust.item2.title": "Pehle Daam, Phir Kaam",
    "trust.item2.desc": "Kaam start hone se pehle fixed rate. Doorstep bargaining ka jhanjhat nahi.",
    "trust.item3.title": "Aapke Mohalle Ke Paas",
    "trust.item3.desc": "Kaamigar 3-5 km ke andar hote hain, isliye 15-30 mins mein pahunch jaate hain.",
    "trust.item4.title": "Customer Support Always Ready",
    "trust.item4.desc": "Call aur WhatsApp par Hindi/English support. Kaam pasand na aaye to turant help.",

    // For Workers
    "worker.heading": "Aap Kaamgar hain?",
    "worker.subheading": "Apna kaam dikhayein, naye customers paayein aur apni earning badhayein.",
    "worker.desc": "Kisi thekedar ke bina, direct apne phone par roz ka kaam paayein. Samman, safety aur daily direct payment.",
    "worker.cta": "Kaamigar ke roop mein judein",
    "worker.whatsapp": "WhatsApp se judein ('KAAM' likh kar bhejein)",
    "worker.missedCall": "Missed call dein: 1800-120-5226",
    "worker.benefit1": "Ghar ke paas kaam (3-5 km ke andar)",
    "worker.benefit2": "Daily seedhe bank ya UPI mein payment",
    "worker.benefit3": "First 10 jobs par 0% commission (100% earning aapki)",
    "worker.benefit4": "Free insurance aur support",

    // App Preview
    "app.heading": "Normal mobile par bhi smoothly chalta hai",
    "app.subheading": "Halka aur fast app, kisi bhi basic Android phone par aasaani se use karein.",
    "app.feature1": "Bolkar search karne ki facility",
    "app.feature2": "WhatsApp par live booking receipt",
    "app.feature3": "Kaamigar ka direct phone aur arrival time",

    // FAQ
    "faq.heading": "Aksar Poochhe Jaane Wale Sawal",
    "faq.subheading": "Aapke man mein koi question hai? Yahan answer milega.",

    // Final CTA
    "final.title": "Kaam hai? Tension mat lo. Kaamigar hai.",
    "final.subtitle": "Aaj hi apne paas ke bharosemand Kaamigar ko book karein aur kaam bina jhanjhat karwayein.",
    "final.cta": "Abhi Kaamigar Dhoondhein",

    // Footer
    "footer.desc": "India ka apna local Kaamigar network — ghar ke sabhi kaamon ke liye bharosemand साथी।",
    "footer.customers": "Customers Ke Liye",
    "footer.workers": "Kaamigar Ke Liye",
    "footer.company": "Company",
    "footer.rights": "© 2026 Kaamigar Technologies. All rights reserved.",
  }
};

const I18nContext = createContext<I18nContextType>({
  lang: "hi",
  setLang: () => {},
  t: (k: string) => k,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("hi");

  useEffect(() => {
    const saved = localStorage.getItem("kaamigar_lang") as Language;
    if (saved === "hi" || saved === "en" || saved === "hinglish") {
      setLangState(saved);
      document.documentElement.lang = saved === "en" ? "en" : "hi";
    } else {
      // Default to Hindi
      setLangState("hi");
      document.documentElement.lang = "hi";
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("kaamigar_lang", newLang);
    document.documentElement.lang = newLang === "en" ? "en" : "hi";
  };

  const t = (key: string): string => {
    const langDict = translations[lang];
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    // Fallback to Hindi, then English, then key itself
    return translations.hi[key] || translations.en[key] || key;
  };

  return (
    <I18nContext.Provider value={{ lang, setLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
