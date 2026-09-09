export interface Testimonial {
  id: string;
  author: string;
  role: string;
  location: string;
  rating: number;
  text: string;
  serviceUsed: string;
  tag: "Customer Story" | "Kaamigar Partner Spotlight";
  verified: boolean;
  avatarBg: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "test-1",
    author: "Ananya Sen",
    role: "Product Director & Homeowner",
    location: "Indiranagar, Bengaluru",
    rating: 5,
    text: "When our main electrical panel sparked on a Sunday evening, every traditional service gave a 24-hour turnaround. Through Kaamigar, Rahul arrived in 18 minutes, tested the earthing, and replaced the burnt MCB with genuine Havells switchgear. The upfront pricing on the app was refreshing.",
    serviceUsed: "Emergency Electrical",
    tag: "Customer Story",
    verified: true,
    avatarBg: "from-blue-600 to-indigo-700"
  },
  {
    id: "test-2",
    author: "Deepak Choudhary",
    role: "Kaamigar Partner (Electrician)",
    location: "Bengaluru, Karnataka",
    rating: 5,
    text: "Before Kaamigar, I spent hours searching for local jobs through middlemen who took 30% cuts. On Kaamigar, I get verified customers within a 4km radius, payments are credited straight to my bank account every morning, and the app even provides free accidental insurance coverage.",
    serviceUsed: "Kaamigar Pro Network",
    tag: "Kaamigar Partner Spotlight",
    verified: true,
    avatarBg: "from-amber-600 to-orange-700"
  },
  {
    id: "test-3",
    author: "Dr. Arvind Raghavan",
    role: "Cardiologist",
    location: "Koramangala, Bengaluru",
    rating: 5,
    text: "Finding someone who won't drill recklessly into concealed bathroom pipes is rare. Suresh from Kaamigar arrived with a digital pipe detector, resolved the concealed cistern leakage without cracking single Italian marble tile, and left the bathroom completely dry. Top-tier craftsmanship.",
    serviceUsed: "Precision Plumbing",
    tag: "Customer Story",
    verified: true,
    avatarBg: "from-cyan-600 to-teal-700"
  },
  {
    id: "test-4",
    author: "Sunita Reddy",
    role: "Kaamigar Partner (Deep Cleaning Specialist)",
    location: "HSR Layout, Bengaluru",
    rating: 5,
    text: "Kaamigar treated us as skilled professionals with dignity, not casual labor. They gave us advanced German cleaning equipment training and uniform badges. Today my team manages 4-5 bookings daily with complete dignity and respect.",
    serviceUsed: "Kaamigar Pro Network",
    tag: "Kaamigar Partner Spotlight",
    verified: true,
    avatarBg: "from-emerald-600 to-teal-700"
  }
];
