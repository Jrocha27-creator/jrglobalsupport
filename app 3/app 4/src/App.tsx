import { useState } from 'react';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import AboutSection from './sections/AboutSection';
import ServicesSection from './sections/ServicesSection';
import CountriesSection from './sections/CountriesSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

export default function App() {
  const [lang, setLang] = useState<'pt' | 'en'>('pt');

  return (
    <div className="min-h-[100dvh] bg-[#0B1120] relative">
      {/* Global Justice statue background - fixed behind everything */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-no-repeat z-0"
        style={{
          backgroundImage: 'url(/assets/justice-bg.jpg)',
          filter: 'brightness(0.25) contrast(1.2)',
        }}
      />
      {/* Dark overlay for readability */}
      <div
        className="fixed inset-0 z-0"
        style={{
          background: 'linear-gradient(180deg, rgba(7,13,26,0.75) 0%, rgba(11,17,32,0.7) 50%, rgba(7,13,26,0.8) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <Navigation lang={lang} onLangChange={setLang} />
        <main>
          <Hero lang={lang} />
          <AboutSection lang={lang} />
          <ServicesSection lang={lang} />
          <CountriesSection lang={lang} />
          <ContactSection lang={lang} />
        </main>
        <Footer lang={lang} />
      </div>
    </div>
  );
}
