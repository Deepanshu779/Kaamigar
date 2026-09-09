export interface FAQItem {
  id: string;
  question: string;
  hindiQuestion: string;
  hinglishQuestion: string;
  answer: string;
  hindiAnswer: string;
  hinglishAnswer: string;
}

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "How do I book a Kaamigar?",
    hindiQuestion: "कामगार कैसे बुक करें?",
    hinglishQuestion: "Kaamigar kaise book karein?",
    answer: "It takes just 1 minute. Select your service (plumber, electrician, etc.), your locality, and tap 'Book Now' or call directly. The nearest verified worker will reach your home at your chosen time.",
    hindiAnswer: "सिर्फ 1 मिनट में! अपनी ज़रूरत का काम चुनें (जैसे प्लंबर, बिजली), अपना इलाका चुनें और 'अभी बुक करें' पर दबाएं या सीधे फोन करें। आपके सबसे पास के कामगार तय समय पर आपके घर पहुंच जाएंगे।",
    hinglishAnswer: "Bas 1 minute lagta hai! Apni service chunein (jaise Plumber, Electrician), apna area daalein aur 'Abhi Book Karein' par tap karein ya direct call karein. Nearest verified worker time par aapke ghar pahunch jayenge."
  },
  {
    id: "faq-2",
    question: "Are all Kaamigar verified?",
    hindiQuestion: "क्या कामगार वेरिफाइड हैं?",
    hinglishQuestion: "Kya Kaamigar verified hain?",
    answer: "Yes, 100%. Every single Kaamigar undergoes government Aadhaar verification, background checks, and local police verification before being onboarded. You can check their verification badge right on their profile.",
    hindiAnswer: "हाँ, 100%। हर कामगार का सरकारी आधार कार्ड, पृष्ठभूमि और स्थानीय पुलिस जांच के बाद ही प्रोफाइल बनाई जाती है। आप कामगार की प्रोफाइल पर वेरिफाइड बैज भी देख सकते हैं।",
    hinglishAnswer: "Haan, bilkul 100%. Har Kaamigar ka Govt Aadhaar card, background verification aur local police check hota hai. Aap unki profile par verified badge check kar sakte hain."
  },
  {
    id: "faq-3",
    question: "How do I know the service cost?",
    hindiQuestion: "सर्विस का खर्च कैसे पता चलेगा?",
    hinglishQuestion: "Service ki cost kaise pata chalegi?",
    answer: "Our pricing is transparent and fixed upfront. You can see standard rates for inspection and repair before booking. No doorstep bargaining or hidden surprise charges. Pay only after you are satisfied.",
    hindiAnswer: "हमारे यहाँ दाम पहले से तय होते हैं। बुकिंग से पहले ही आपको जांच व मरम्मत का फिक्स रेट दिख जाता है। घर आकर कोई मोलभाव या छुपा हुआ चार्ज नहीं होगा। काम से संतुष्ट होने पर ही भुगतान करें।",
    hinglishAnswer: "Hamare yahan rates bilkul clear aur fixed hote hain. Booking se pehle hi aapko standard price dikh jayega. Doorstep par koi extra ya hidden charge nahi hota. Kaam check karke hi pay karein."
  },
  {
    id: "faq-4",
    question: "What if the work is not done properly?",
    hindiQuestion: "अगर काम सही नहीं हुआ तो क्या करें?",
    hinglishQuestion: "Agar kaam sahi nahi hua to kya karein?",
    answer: "Kaamigar provides a 7-day service satisfaction guarantee. If the issue reoccurs or isn't fixed properly, a verified technician will revisit and resolve it at zero extra charge, or we will refund your payment.",
    hindiAnswer: "कामगार की हर सर्विस पर 7 दिन की गारंटी होती है। अगर काम में कोई कमी रह जाती है तो कामगार बिना किसी अतिरिक्त चार्ज के दोबारा आकर ठीक करेंगे, या आपके पैसे वापस किए जाएंगे।",
    hinglishAnswer: "Kaamigar ki har service par 7 days ki guarantee milti hai. Agar koi dikkat aati hai to technician bina kisi extra charge ke dobara aakar fix karega, ya support team turant refund karegi."
  },
  {
    id: "faq-5",
    question: "How can I join as a Kaamigar?",
    hindiQuestion: "मैं कामगार कैसे बन सकता हूँ?",
    hinglishQuestion: "Main Kaamigar kaise ban sakta hoon?",
    answer: "Joining is completely free and takes 2 minutes. You can send 'KAAM' on WhatsApp or give a missed call to 1800-120-5226. Our local onboarding coordinator will help you start getting daily jobs near your home.",
    hindiAnswer: "जुड़ना बिल्कुल मुफ़्त है और केवल 2 मिनट का समय लगता है। आप हमारे व्हाट्सएप पर 'काम' लिखकर भेज सकते हैं या 1800-120-5226 पर मिस्ड कॉल दे सकते हैं। हमारे साथी आपके घर के पास काम शुरू करवा देंगे।",
    hinglishAnswer: "Join karna bilkul free hai aur sirf 2 minutes lagte hain. Aap WhatsApp par 'KAAM' likh kar bhej sakte hain ya 1800-120-5226 par missed call de sakte hain. Hamari team aapko guide karegi."
  }
];
