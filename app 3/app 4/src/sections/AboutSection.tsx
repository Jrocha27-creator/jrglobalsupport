import { useEffect, useRef, useState } from 'react';
import { Shield, Eye, Gem, Handshake, MapPin, ArrowRight } from 'lucide-react';

interface AboutProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    label: 'SOBRE NOS',
    heading: 'EXCELÊNCIA, ÉTICA E COMPROMISSO GLOBAL',
    body1: 'A JR Global Support é uma assessoria jurídica internacional comprometida em oferecer soluções jurídicas inteligentes, personalizadas e eficientes para pessoas físicas e jurídicas em diferentes países.',
    body2: 'Com atuação sólida no Brasil, Portugal e Reino Unido, unimos conhecimento jurídico, experiência internacional e atendimento humanizado para entregar resultados com segurança e confiança.',
    values: [
      { icon: Shield, title: 'MISSÃO', desc: 'Oferecer soluções jurídicas internacionais com excelência, ética e comprometimento' },
      { icon: Eye, title: 'VISÃO', desc: 'Ser referência global em assessoria jurídica internacional' },
      { icon: Gem, title: 'VALORES', desc: 'Ética e Transparência · Excelência Técnica · Compromisso com Resultados' },
      { icon: Handshake, title: 'DIFERENCIAL', desc: 'Atendimento personalizado, advogados especializados, soluções sob medida' },
    ],
    locations: ['BRASIL', 'PORTUGAL', 'REINO UNIDO'],
    cta: 'FALE COM UM ESPECIALISTA',
  },
  en: {
    label: 'ABOUT US',
    heading: 'EXCELLENCE, ETHICS AND GLOBAL COMMITMENT',
    body1: 'JR Global Support is an international legal advisory firm committed to providing intelligent, personalized and efficient legal solutions for individuals and companies in different countries.',
    body2: 'With solid operations in Brazil, Portugal and the United Kingdom, we combine legal knowledge, international experience and humanized service to deliver results with security and trust.',
    values: [
      { icon: Shield, title: 'MISSION', desc: 'Offer international legal solutions with excellence, ethics and commitment' },
      { icon: Eye, title: 'VISION', desc: 'Be a global reference in international legal advisory' },
      { icon: Gem, title: 'VALUES', desc: 'Ethics and Transparency · Technical Excellence · Commitment to Results' },
      { icon: Handshake, title: 'DIFFERENTIAL', desc: 'Personalized service, specialized lawyers, tailored solutions' },
    ],
    locations: ['BRAZIL', 'PORTUGAL', 'UNITED KINGDOM'],
    cta: 'TALK TO A SPECIALIST',
  },
};

export default function AboutSection({ lang }: AboutProps) {
  const c = CONTENT[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleCtaClick = () => {
    const el = document.getElementById('contact');
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full py-[120px] md:py-[120px] px-6 bg-[rgba(7,13,26,0.7)] backdrop-blur-sm"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-16">
        {/* Left Column */}
        <div
          className={`transition-all duration-800 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
          }`}
        >
          {/* Label */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c9a84c]" />
            <span
              className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase"
              style={{ fontFamily: "'Inter', system-ui, sans-serif", fontWeight: 500 }}
            >
              {c.label}
            </span>
            <span className="w-8 h-[1px] bg-[#c9a84c]" />
          </div>

          {/* Heading */}
          <h2
            className="text-white"
            style={{
              fontFamily: "'Montserrat', system-ui, sans-serif",
              fontSize: 'clamp(1.75rem, 4vw, 3rem)',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1.1,
            }}
          >
            {c.heading}
          </h2>

          {/* Body */}
          <p
            className="mt-6 text-[#cbd5e1] leading-[1.7]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.01em',
            }}
          >
            {c.body1}
          </p>
          <p
            className="mt-4 text-[#cbd5e1] leading-[1.7]"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: '1rem',
              letterSpacing: '0.01em',
            }}
          >
            {c.body2}
          </p>

          {/* Value Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {c.values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className={`bg-[rgba(15,23,42,0.6)] border border-[rgba(51,65,85,0.4)] rounded-xl p-6 text-center transition-all duration-300 hover:border-[rgba(201,168,76,0.4)] hover:-translate-y-1 ${
                    visible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-8'
                  }`}
                  style={{
                    transitionDelay: visible ? `${200 + i * 100}ms` : '0ms',
                    transitionDuration: '600ms',
                  }}
                >
                  <Icon className="w-10 h-10 text-[#c9a84c] mx-auto" strokeWidth={1.5} />
                  <h3
                    className="mt-3 text-white text-sm font-semibold tracking-[0.05em]"
                    style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                  >
                    {v.title}
                  </h3>
                  <p className="mt-2 text-[#cbd5e1] text-xs leading-relaxed">{v.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column */}
        <div
          className={`transition-all duration-800 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          {/* Brand Image */}
          <div className="relative rounded-2xl overflow-hidden border border-[rgba(51,65,85,0.3)] shadow-[0_0_80px_rgba(201,168,76,0.15)]">
            <img
              src="/assets/about-visual.png"
              alt="JR Global Support"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* Location Pills */}
          <div className="mt-6 flex items-center gap-3 flex-wrap">
            <span className="text-[#64748b] text-xs tracking-[0.08em] uppercase mr-2">
              {lang === 'pt' ? 'Atuacao Internacional' : 'International Presence'}
            </span>
            {c.locations.map((loc) => (
              <span
                key={loc}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] rounded-full text-[#c9a84c] text-[10px] tracking-[0.08em] uppercase"
              >
                <MapPin size={12} />
                {loc}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={handleCtaClick}
            className="mt-6 inline-flex items-center gap-2 text-[#c9a84c] text-sm font-medium tracking-[0.03em] hover:underline transition-all duration-200"
            style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
          >
            {c.cta}
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}
