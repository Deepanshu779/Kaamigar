export interface Professional {
  id: string;
  name: string;
  hindiName: string;
  service: string;
  hindiService: string;
  serviceEmoji: string;
  subCategory: string;
  hindiSubCategory: string;
  rating: number;
  totalJobs: number;
  distanceKm: number;
  area: string;
  city: string;
  isAvailable: boolean;
  verified: boolean;
  phone: string;
  experienceYears: number;
  badges: string[];
  hindiBadges: string[];
  hourlyRate: number;
  avatarColor?: string;
  initials?: string;
  languages: string[];
  featuredReview: {
    userName: string;
    text: string;
    hindiText: string;
    rating: number;
  };
}

export const PROFESSIONALS: Professional[] = [
  {
    id: "pro-1",
    name: "Ramesh Kumar",
    hindiName: "रमेश कुमार",
    service: "Plumber",
    hindiService: "प्लंबर (नल मिस्त्री)",
    serviceEmoji: "🚰",
    subCategory: "Pipe fitting & Tap leakage specialist",
    hindiSubCategory: "पाइप फिटिंग और नल लीकेज एक्सपर्ट",
    rating: 4.8,
    totalJobs: 320,
    distanceKm: 1.2,
    area: "Sector 14",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 98110 XXXXX",
    experienceYears: 7,
    badges: ["Aadhaar Verified", "15-Min Arrival", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "15 मिनट में पहुंच", "पुलिस जांच प्रमाणित"],
    hourlyRate: 149,
    languages: ["हिन्दी", "Hinglish"],
    featuredReview: {
      userName: "अमित गुप्ता (होमओनर)",
      text: "Kitchen tap was continuously leaking. Ramesh arrived within 15 minutes with all tools and fixed it in 10 minutes at fixed honest rate.",
      hindiText: "किचन का नल लगातार टपक रहा था। रमेश भाई 15 मिनट में औजार लेकर आ गए और बिना मोलभाव के एकदम सही काम कर दिया।",
      rating: 5
    }
  },
  {
    id: "pro-2",
    name: "Suresh Verma",
    hindiName: "सुरेश वर्मा",
    service: "Electrician",
    hindiService: "बिजली मिस्त्री (इलेक्ट्रीशियन)",
    serviceEmoji: "💡",
    subCategory: "Short circuit & Fan wiring expert",
    hindiSubCategory: "शॉर्ट सर्किट और पंखा वायरिंग एक्सपर्ट",
    rating: 4.9,
    totalJobs: 540,
    distanceKm: 0.8,
    area: "Old Railway Road",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 98180 XXXXX",
    experienceYears: 9,
    badges: ["Aadhaar Verified", "Licensed Electrician", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "लाइसेंस्ड मिस्त्री", "पुलिस जांच प्रमाणित"],
    hourlyRate: 149,
    languages: ["हिन्दी", "Hinglish"],
    featuredReview: {
      userName: "सुनीता शर्मा",
      text: "Ceiling fan made sudden sparking sounds. Suresh diagnosed the capacitor fault promptly. Very respectful and polite.",
      hindiText: "सीलिंग फैन में चिंगारी आ रही थी। सुरेश जी ने तुरंत कैपेसिटर बदलकर पंखा ठीक कर दिया। बहुत विनम्र और ईमानदार व्यक्ति हैं।",
      rating: 5
    }
  },
  {
    id: "pro-3",
    name: "Rajesh Sharma",
    hindiName: "राजेश शर्मा",
    service: "Carpenter",
    hindiService: "बढ़ई (कारपेंटर)",
    serviceEmoji: "🪚",
    subCategory: "Door locks, cupboards & furniture fix",
    hindiSubCategory: "दरवाजे के ताले, अलमारी व बेड मरम्मत",
    rating: 4.7,
    totalJobs: 280,
    distanceKm: 2.1,
    area: "Civil Lines",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 98730 XXXXX",
    experienceYears: 11,
    badges: ["Aadhaar Verified", "Master Craftsman", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "अनुभवी बढ़ई", "पुलिस जांच प्रमाणित"],
    hourlyRate: 199,
    languages: ["हिन्दी"],
    featuredReview: {
      userName: "राकेश मल्होत्रा",
      text: "Main door lock was jammed and children were trapped inside room. Rajesh ji reached in 12 mins and carefully unlocked it.",
      hindiText: "मुख्य दरवाजे का लॉक फंस गया था। राजेश जी ने 12 मिनट में आकर लॉक बिना दरवाजे को नुकसान पहुंचाए खोल दिया।",
      rating: 5
    }
  },
  {
    id: "pro-4",
    name: "Sunita Devi",
    hindiName: "सुनीता देवी",
    service: "Cleaning",
    hindiService: "घर की सफ़ाई (क्लीनिंग)",
    serviceEmoji: "🧹",
    subCategory: "Kitchen & bathroom deep hygienic scrubbing",
    hindiSubCategory: "किचन और बाथरूम डीप क्लीनिंग एक्सपर्ट",
    rating: 4.9,
    totalJobs: 410,
    distanceKm: 1.5,
    area: "Sector 15 Part 2",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 99100 XXXXX",
    experienceYears: 5,
    badges: ["Aadhaar Verified", "Safe & Trusted", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "100% सुरक्षित", "पुलिस जांच प्रमाणित"],
    hourlyRate: 399,
    languages: ["हिन्दी"],
    featuredReview: {
      userName: "रेखा चौधरी",
      text: "Full kitchen tiles and exhaust chimney was deeply de-greased. My kitchen looks completely brand new!",
      hindiText: "किचन की टाइलें और चिमनी पूरी तरह चमक उठी। बहुत मेहनत और ईमानदारी से काम किया।",
      rating: 5
    }
  },
  {
    id: "pro-5",
    name: "Mohammed Irfan",
    hindiName: "मोहम्मद इरफ़ान",
    service: "AC Repair",
    hindiService: "एसी रिपेयर (टेक्नीशियन)",
    serviceEmoji: "❄️",
    subCategory: "Power jet cleaning & gas refilling",
    hindiSubCategory: "पावर जेट सर्विस और गैस चार्जिंग",
    rating: 4.8,
    totalJobs: 690,
    distanceKm: 1.8,
    area: "Sector 22",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 98990 XXXXX",
    experienceYears: 8,
    badges: ["Aadhaar Verified", "Certified AC Pro", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "प्रमाणित टेक्नीशियन", "पुलिस जांच प्रमाणित"],
    hourlyRate: 399,
    languages: ["हिन्दी", "Hinglish"],
    featuredReview: {
      userName: "विकास यादव",
      text: "AC was blowing warm air. Irfan bhai cleaned the outdoor coil with jet spray and refilled genuine gas at exact company rate.",
      hindiText: "एसी ठंडा नहीं कर रहा था। इरफ़ान भाई ने जेट मशीन से आउटडोर साफ किया और उचित दाम में गैस भरी। अब जबर्दस्त कूलिंग है।",
      rating: 5
    }
  },
  {
    id: "pro-6",
    name: "Vikram Singh",
    hindiName: "विक्रम सिंह",
    service: "Mechanic",
    hindiService: "बाइक व स्कूटर मैकेनिक",
    serviceEmoji: "🚗",
    subCategory: "On-spot scooter repair & battery jumpstart",
    hindiSubCategory: "ऑन-स्पॉट स्कूटर सर्विस व पंचर रिपेयर",
    rating: 4.8,
    totalJobs: 380,
    distanceKm: 2.4,
    area: "Sadar Bazar",
    city: "Gurgaon",
    isAvailable: true,
    verified: true,
    phone: "+91 97170 XXXXX",
    experienceYears: 10,
    badges: ["Aadhaar Verified", "Emergency Roadside", "Police Cleared"],
    hindiBadges: ["आधार वेरिफाइड", "ऑन-रोड इमरजेंसी", "पुलिस जांच प्रमाणित"],
    hourlyRate: 199,
    languages: ["हिन्दी", "Hinglish"],
    featuredReview: {
      userName: "मनोज कुमार",
      text: "Scooter stopped starting in the morning before school drop. Vikram arrived at our doorstep in 15 mins and sorted the spark plug issue.",
      hindiText: "सुबह बच्चे को स्कूल छोड़ते वक्त एक्टिवा बंद हो गई। विक्रम भाई ने घर के नीचे आकर तुरंत स्पार्क प्लग बदल दिया।",
      rating: 5
    }
  }
];
