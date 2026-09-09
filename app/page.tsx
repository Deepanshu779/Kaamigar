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
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [proModalOpen, setProModalOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const [selectedPro, setSelectedPro] = useState<Professional | null>(null);
  const [selectedService, setSelectedService] = useState<ServiceCategory | null>(null);

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

  const handleOpenProfile = (pro: Professional) => {
    setSelectedPro(pro);
    setProfileModalOpen(true);
  };

  const handleSelectService = (service: ServiceCategory) => {
    setSelectedService(service);
    setSelectedPro(null);
    setBookingModalOpen(true);
  };

  const handleSearch = (query: string, location: string) => {
    const lower = query.toLowerCase().trim();
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

  const handleVoiceResult = (query: string) => {
    handleSearch(query, "");
  };

  return (
    <main className="min-h-screen bg-background text-foreground selection:bg-brand-orange selection:text-white relative">
      <Navbar
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
        onLoginClick={() => handleOpenBooking()}
      />

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

      <ServicesSection onSelectService={handleSelectService} />

      <NearbyKaamigarSection
        onSelectPro={handleOpenProfile}
        onBookPro={(pro) => handleOpenBooking(pro)}
      />

      <HowItWorksSection />
      <TrustSection />
      <WorkerSection onJoinClick={() => setProModalOpen(true)} />
      <AppPreviewSection onBookClick={() => handleOpenBooking()} />
      <FAQSection />

      <FinalCTASection
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
      />

      <Footer
        onBookClick={() => handleOpenBooking()}
        onJoinProClick={() => setProModalOpen(true)}
      />

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
