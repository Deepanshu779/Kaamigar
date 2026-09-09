import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import { I18nProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "KAAMIGAR — Kaam hai? Kaamigar hai. • भरोसेमंद स्थानीय कामगार",
  description: "अपने घर के कामों के लिए भरोसेमंद स्थानीय कामगार ढूंढें — प्लंबर, इलेक्ट्रीशियन, बढ़ई, एसी रिपेयर। Book trusted local workers near you in minutes.",
  keywords: [
    "kaamigar",
    "kamgar",
    "local workers india",
    "plumber near me",
    "electrician near me",
    "carpenter near me",
    "ac repair",
    "ghar ka kaam",
    "bharosemand kaamgar",
    "local handyman india"
  ],
  authors: [{ name: "Kaamigar" }],
  openGraph: {
    title: "KAAMIGAR — Kaam hai? Kaamigar hai.",
    description: "Apne paas bharosemand Kaamigar dhoondhein. Plumber, Electrician, Carpenter & more.",
    url: "https://kaamigar.in",
    siteName: "Kaamigar",
    locale: "hi_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Noto Sans Devanagari for authentic, clear Hindi & Plus Jakarta Sans for clean modern UI */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+Devanagari:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brand-orange selection:text-white font-sans">
        <ThemeProvider>
          <I18nProvider>
            {children}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

