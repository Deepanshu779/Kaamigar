export interface ServiceCategory {
  id: string;
  name: string;
  hindiName: string;
  hinglishName: string;
  emoji: string;
  iconName: string;
  description: string;
  hindiDescription: string;
  startingPrice: number;
  avgResponseTime: string;
  rating: number;
  reviewsCount: number;
  popularTasks: string[];
  gradient: string;
  badge?: string;
  hindiBadge?: string;
}

export const SERVICES: ServiceCategory[] = [
  {
    id: "plumber",
    name: "Plumber",
    hindiName: "नल व प्लंबर",
    hinglishName: "Plumber & Sanitary",
    emoji: "🚰",
    iconName: "Droplets",
    description: "Taps, leakages, pipeline repairs, flush tanks & water motor installation.",
    hindiDescription: "टैप लीकेज, पाइपलाइन फिटिंग, फ्लश टैंक और पानी की मोटर मरम्मत।",
    startingPrice: 149,
    avgResponseTime: "15-20 mins",
    rating: 4.88,
    reviewsCount: 1420,
    popularTasks: ["नल लीकेज ठीक करना", "पाइप फिटिंग", "वॉशबेसिन इंस्टॉलेशन", "पानी की मोटर रिपेयर"],
    gradient: "from-blue-500/20 via-cyan-500/10 to-transparent",
    badge: "Most Requested",
    hindiBadge: "सबसे ज़्यादा ज़रूरी"
  },
  {
    id: "electrician",
    name: "Electrician",
    hindiName: "बिजली मिस्त्री",
    hinglishName: "Electrician",
    emoji: "💡",
    iconName: "Zap",
    description: "Switchboard, ceiling fan, MCB tripping, house wiring & inverter setup.",
    hindiDescription: "स्विच बोर्ड, पंखा फिटिंग, एमसीबी फॉल्ट और इनवर्टर वायरिंग।",
    startingPrice: 149,
    avgResponseTime: "15-25 mins",
    rating: 4.92,
    reviewsCount: 2180,
    popularTasks: ["पंखा लगाना व रिपेयर", "स्विच बोर्ड बदलना", "एमसीबी ट्रिपिंग चेक", "इनवर्टर कनेक्शन"],
    gradient: "from-amber-500/20 via-orange-500/10 to-transparent",
    badge: "15-Min Reach",
    hindiBadge: "15 मिनट में पहुंच"
  },
  {
    id: "ac-repair",
    name: "AC Repair",
    hindiName: "एसी रिपेयर",
    hinglishName: "AC & Fridge Service",
    emoji: "❄️",
    iconName: "Wind",
    description: "Power jet cleaning, gas charging, cooling issues & PCB board fix.",
    hindiDescription: "पावर जेट सर्विस, गैस चार्जिंग, कूलिंग की समस्या और पीसीबी रिपेयर।",
    startingPrice: 399,
    avgResponseTime: "25-35 mins",
    rating: 4.9,
    reviewsCount: 1890,
    popularTasks: ["पावर जेट एसी सर्विस", "एसी गैस रिफिल", "कूलिंग फॉल्ट", "फ्रिज मरम्मत"],
    gradient: "from-cyan-500/20 via-blue-500/10 to-transparent",
    badge: "Summer Essential",
    hindiBadge: "गर्मियों में खास"
  },
  {
    id: "carpenter",
    name: "Carpenter",
    hindiName: "बढ़ई (कारपेंटर)",
    hinglishName: "Carpenter & Furniture",
    emoji: "🪚",
    iconName: "Hammer",
    description: "Door locks, hinges, bed & cupboard repair, modular kitchen fixes.",
    hindiDescription: "दरवाजे का ताला व कब्जा, अलमारी मरम्मत और नया फर्नीचर काम।",
    startingPrice: 199,
    avgResponseTime: "30-45 mins",
    rating: 4.86,
    reviewsCount: 940,
    popularTasks: ["दरवाजे का लॉक ठीक करना", "अलमारी के कब्जे", "बेड फिटिंग", "लकड़ी पॉलिश"],
    gradient: "from-amber-600/20 via-yellow-600/10 to-transparent"
  },
  {
    id: "painter",
    name: "Painter",
    hindiName: "रंगाई-पुताई (पेंटर)",
    hinglishName: "Painter & Waterproofing",
    emoji: "🎨",
    iconName: "Paintbrush",
    description: "Wall putty, primer, room painting, damp & seepage treatment.",
    hindiDescription: "दीवार पुट्टी, कमरों का पेंट, सीलन का पक्का इलाज और टचअप।",
    startingPrice: 499,
    avgResponseTime: "Schedule date",
    rating: 4.85,
    reviewsCount: 680,
    popularTasks: ["1 कमरा पेंट", "सीलन व दरारें भरना", "पूरे घर की पुताई", "दरवाजे-खिड़की पेंट"],
    gradient: "from-purple-500/20 via-pink-500/10 to-transparent"
  },
  {
    id: "cleaning",
    name: "Cleaning",
    hindiName: "घर की सफ़ाई",
    hinglishName: "Deep Cleaning",
    emoji: "🧹",
    iconName: "Sparkles",
    description: "Full house deep cleaning, bathroom tile scrubbing & kitchen de-greasing.",
    hindiDescription: "पूरे घर की डीप क्लीनिंग, बाथरूम टाइल्स सफाई और किचन ग्रीस रिमूवल।",
    startingPrice: 399,
    avgResponseTime: "30-40 mins",
    rating: 4.93,
    reviewsCount: 1650,
    popularTasks: ["बाथरूम की गहरी सफाई", "किचन सफाई", "सोफा शैंपू ड्राईक्लीन", "पूरा घर क्लीनिंग"],
    gradient: "from-emerald-500/20 via-teal-500/10 to-transparent",
    badge: "Eco-Friendly Safe",
    hindiBadge: "केमिकल-फ्री सुरक्षित"
  },
  {
    id: "mechanic",
    name: "Mechanic",
    hindiName: "गाड़ी व बाइक मैकेनिक",
    hinglishName: "Two-Wheeler & Auto Mechanic",
    emoji: "🚗",
    iconName: "Wrench",
    description: "Scooter & bike breakdown, puncture fix, battery jumpstart & oil service at home.",
    hindiDescription: "स्कूटर व बाइक ब्रेकडाउन, पंचर ठीक करना, बैटरी जंपस्टार्ट व सर्विस।",
    startingPrice: 199,
    avgResponseTime: "15-25 mins",
    rating: 4.87,
    reviewsCount: 820,
    popularTasks: ["घर पर बाइक सर्विस", "पंचर व टायर हवा", "बैटरी स्टार्ट", "ब्रेक व क्लच सेट"],
    gradient: "from-rose-500/20 via-orange-500/10 to-transparent",
    badge: "Roadside & Home",
    hindiBadge: "घर व रास्ते पर मदद"
  },
  {
    id: "home-repair",
    name: "Home Repair",
    hindiName: "घर मरम्मत",
    hinglishName: "General Home Fixes",
    emoji: "🏠",
    iconName: "Home",
    description: "Drilling, mirror hanging, curtain rods, tile replacement & handyman fixes.",
    hindiDescription: "ड्रिलिंग, पर्दा रॉड लगाना, आईना टांगना और छोटे-मोटे मरम्मत काम।",
    startingPrice: 129,
    avgResponseTime: "20-30 mins",
    rating: 4.89,
    reviewsCount: 1110,
    popularTasks: ["दीवार में ड्रिलिंग", "पर्दा रॉड लगाना", "आईना व फोटो फ्रेम", "सीलिंग फैन हैंग"],
    gradient: "from-sky-500/20 via-indigo-500/10 to-transparent"
  }
];
