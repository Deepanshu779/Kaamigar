"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/sections/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { NearbyKaamigarSection } from "@/components/sections/NearbyKaamigarSection";
import { HowItWorksSection } from "@/components/sections/HowItWorksSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { WorkerSection } from "@/components/sections/WorkerSection";
import { AppPreviewSection } from "@/components/sections/AppPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { FinalCTASection } from "@/components/sections/FinalCTASection";
import { Footer } from "@/components/sections/Footer";

import { BookingModal } from "@/components/modals/BookingModal";
import { ProRegisterModal } from "@/components/modals/ProRegisterModal";
import { VoiceSearchModal } from "@/components/modals/VoiceSearchModal";
import { WorkerProfileModal } from "@/components/modals/WorkerProfileModal";

import { Professional, PROFESSIONALS } from "@/lib/data/professionals";
import { ServiceCategory, SERVICES } from "@/lib/data/services";

export default function HomePage() {
  // Modals state
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  // Selection state
  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);

  // Open booking modal
  const handleOpenBooking = (pro?: Professional, serviceId?: string) => {
    setSelectedPro(pro || null);
    if (serviceId) {
      const found = SERVICES.find((s) => s.id === serviceId);
      setSelectedService(found || null);
    } else {
      setSelectedService(null);
    }
    setBookingModalOpen(true);
  };

  // Open worker profile modal
  const handleOpenProfile = (pro: Professional) => {
    setSelectedPro(pro);
    setProfileModalOpen(true);
  };

  // Select service from grid
  const handleSelectService = (service: ServiceCategory) => {
    setSelectedService(service);
    setSelectedPro(null);
    setBookingModalOpen(true);
  };

  // Search handler
  const handleSearch = (query: string, location: string) => {
    // If query matches a service, pre-select it
    const lower = query.toLowerCase();
    const matchedService = SERVICES.find(
      (s) =>
        s.name.toLowerCase().includes(lower) ||
        s.hindiName.toLowerCase().includes(lower) ||
        s.id.toLowerCase().includes(lower)
    );
    setSelectedService(matchedService || null);
    setSelectedPro(null);
    setBookingModalOpen(true);
  };

  // Voice search result handler
  const handleVoiceResult = (query: string) => {
    handleSearch(query, "Sector 14, Gurgaon");
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-orange selection:text-white relative">
      {/* 1. Navbar with Hindi | English | Hinglish & Theme Toggle */}
      <Navbar
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
        onLoginClick={() => handleOpenBooking()}
      />

      {/* 2. Hero Section: “Kaam hai? Kaamigar hai.” + Search as Hero + 3D Home Scene */}
      <HeroSection
        onSearch={handleSearch}
        onVoiceClick={() => setVoiceModalOpen(true)}
        onBookClick={(catId) => handleOpenBooking(undefined, catId)}
        onJoinProClick={() => setProModalOpen(true)}
        onSelectCategory={(catId) => {
          const el = document.getElementById("services");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
      />

      {/* 3. Popular Services: Big visual cards (Icon + Hindi + English) */}
      <ServicesSection onSelectService={handleSelectService} />

      {/* 4. Nearby Kaamigar: “Aapke paas ke Kaamigar” (Ramesh, Suresh, etc.) */}
      <NearbyKaamigarSection
        onSelectPro={handleOpenProfile}
        onBookPro={(pro) => handleOpenBooking(pro)}
      />

      {/* 5. How It Works: 4 Simple Steps */}
      <HowItWorksSection />

      {/* 6. Trust & Safety: “Bharose ke saath kaam karayein” */}
      <TrustSection />

      {/* 7. For Kaamigar: “Aap Kaamgar hain?” */}
      <WorkerSection onJoinClick={() => setProModalOpen(true)} />

      {/* 8. Simple Android Phone Preview */}
      <AppPreviewSection onBookClick={() => handleOpenBooking()} />

      {/* 9. Help & FAQ: Everyday questions in Hindi & English */}
      <FAQSection />

      {/* 10. Final CTA: “Kaam hai? Tension mat lo. Kaamigar hai.” */}
      <FinalCTASection
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
      />

      {/* 11. Footer: Simple, clean & bilingual */}
      <Footer
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        selectedPro={selectedPro}
        initialService={selectedService}
      />

      <ProRegisterModal
        isOpen={proModalOpen}
        onClose={() => setProModalOpen(false)}
      />

      <VoiceSearchModal
        isOpen={voiceModalOpen}
        onClose={() => setVoiceModalOpen(false)}
        onVoiceResult={handleVoiceResult}
      />

      <WorkerProfileModal
        isOpen={profileModalOpen}
        onClose={() => setProfileModalOpen(false)}
        pro={selectedPro}
        onBookNow={(pro) => handleOpenBooking(pro)}
      />
    </main>
  );
}
