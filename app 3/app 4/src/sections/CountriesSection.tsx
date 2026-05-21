import { useEffect, useRef, useState } from 'react';
import { MessageCircle } from 'lucide-react';

interface CountriesProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    label: 'ATUACAO INTERNACIONAL',
    heading: 'PRESENÇA EM TRÊS PAÍSES',
    countries: [
      {
        name: 'BRASIL',
        flag: '/assets/flag-brazil-hd.png',
        desc: 'Atendimento completo para brasileiros no exterior e interessados em processos no Brasil. Suporte especializado em diversas áreas do direito.',
        phone: '+55 62 99616-4242',
        waLink: 'https://wa.me/5562996164242',
      },
      {
        name: 'PORTUGAL',
        flag: '/assets/flag-portugal-hd.png',
        desc: 'Apoio jurídico para brasileiros em Portugal e interessados em processos lusitanos. Facilitamos sua adaptação jurídica.',
        phone: '+351 937 175 998',
        waLink: 'https://wa.me/351937175998',
      },
      {
        name: 'REINO UNIDO',
        flag: '/assets/flag-uk-hd.png',
        desc: 'Suporte jurídico para brasileiros no Reino Unido. Orientação especializada no sistema jurídico britânico.',
        phone: '+44 7454 323562',
        waLink: 'https://wa.me/447454323562',
      },
    ],
    waLabel: 'WhatsApp',
  },
  en: {
    label: 'INTERNATIONAL PRESENCE',
    heading: 'PRESENCE IN THREE COUNTRIES',
    countries: [
      {
        name: 'BRAZIL',
        flag: '/assets/flag-brazil-hd.png',
        desc: 'Complete service for Brazilians abroad and those interested in proceedings in Brazil. Specialized support in various areas of law.',
        phone: '+55 62 99616-4242',
        waLink: 'https://wa.me/5562996164242',
      },
      {
        name: 'PORTUGAL',
        flag: '/assets/flag-portugal-hd.png',
        desc: 'Legal support for Brazilians in Portugal and those interested in Lusitanian proceedings. We facilitate your legal adaptation.',
        phone: '+351 937 175 988',
        waLink: 'https://wa.me/351937175988',
      },
      {
        name: 'UNITED KINGDOM',
        flag: '/assets/flag-uk-hd.png',
        desc: 'Legal support for Brazilians in the United Kingdom. Specialized guidance in the British legal system.',
        phone: '+44 7454 323562',
        waLink: 'https://wa.me/447454323562',
      },
    ],
    waLabel: 'WhatsApp',
  },
};

export default function CountriesSection({ lang }: CountriesProps) {
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

  return (
    <section
      id="countries"
      ref={sectionRef}
      className="w-full py-[120px] px-6 bg-[rgba(7,13,26,0.6)] backdrop-blur-sm"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-[#c9a84c]" />
            <span className="text-[#c9a84c] text-xs tracking-[0.2em] uppercase font-medium">
              {c.label}
            </span>
            <span className="w-8 h-[1px] bg-[#c9a84c]" />
          </div>
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
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {c.countries.map((country, i) => (
            <div
              key={country.name}
              className={`relative bg-[#0f172a] rounded-[20px] overflow-hidden border border-[rgba(51,65,85,0.3)] transition-all duration-800 hover:border-[rgba(201,168,76,0.3)] ${
                visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{
                transitionDelay: visible ? `${i * 150}ms` : '0ms',
              }}
            >
              {/* Flag Area */}
              <div className="relative h-[200px] flex items-center justify-center bg-gradient-to-b from-[#0B1120] to-[#0f172a]">
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border-2 border-[rgba(201,168,76,0.3)] shadow-[0_0_30px_rgba(201,168,76,0.15)]">
                  <img
                    src={country.flag}
                    alt={country.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-8 relative">
                <h3
                  className="text-white text-xl font-semibold tracking-[0.02em]"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {country.name}
                </h3>
                <p className="mt-3 text-[#cbd5e1] text-sm leading-[1.7]">{country.desc}</p>

                {/* WhatsApp Button */}
                <a
                  href={country.waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white rounded-full text-xs font-semibold tracking-[0.05em] uppercase transition-all duration-150 hover:brightness-110"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  <MessageCircle size={16} />
                  {c.waLabel}
                </a>

                <p className="mt-3 text-[#64748b] text-xs">{country.phone}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
