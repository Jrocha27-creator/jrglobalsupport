import { useEffect, useRef, useState } from 'react';
import { Clock, UserCheck, Globe, MessageCircle } from 'lucide-react';

interface ContactProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    label: 'FALE CONOSCO',
    heading: 'ESCOLHA SEU PAIS E ENTRE EM CONTATO',
    body: 'Nossos especialistas estao prontos para ajudar voce. Escolha o pais onde esta e fale conosco pelo WhatsApp para um atendimento personalizado.',
    badges: [
      { icon: Clock, text: 'Atendimento 24h' },
      { icon: UserCheck, text: 'Consultoria Personalizada' },
      { icon: Globe, text: 'Equipe Multinacional' },
    ],
    contacts: [
      {
        country: 'Brasil',
        flag: '/assets/flag-brazil-hd.png',
        phone: '+55 62 99616-4242',
        waLink: 'https://wa.me/5562996164242',
      },
      {
        country: 'Portugal',
        flag: '/assets/flag-portugal-hd.png',
        phone: '+351 937 175 998',
        waLink: 'https://wa.me/351937175998',
      },
      {
        country: 'Reino Unido',
        flag: '/assets/flag-uk-hd.png',
        phone: '+44 7454 323562',
        waLink: 'https://wa.me/447454323562',
      },
    ],
    waLabel: 'WhatsApp',
  },
  en: {
    label: 'CONTACT US',
    heading: 'CHOOSE YOUR COUNTRY AND GET IN TOUCH',
    body: 'Our specialists are ready to help you. Choose the country where you are and contact us via WhatsApp for personalized service.',
    badges: [
      { icon: Clock, text: '24/7 Support' },
      { icon: UserCheck, text: 'Personalized Consulting' },
      { icon: Globe, text: 'Multinational Team' },
    ],
    contacts: [
      {
        country: 'Brazil',
        flag: '/assets/flag-brazil-hd.png',
        phone: '+55 62 99616-4242',
        waLink: 'https://wa.me/5562996164242',
      },
      {
        country: 'Portugal',
        flag: '/assets/flag-portugal-hd.png',
        phone: '+351 937 175 998',
        waLink: 'https://wa.me/351937175998',
      },
      {
        country: 'United Kingdom',
        flag: '/assets/flag-uk-hd.png',
        phone: '+44 7454 323562',
        waLink: 'https://wa.me/447454323562',
      },
    ],
    waLabel: 'WhatsApp',
  },
};

export default function ContactSection({ lang }: ContactProps) {
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
      id="contact"
      ref={sectionRef}
      className="w-full py-[120px] px-6 bg-[rgba(15,23,42,0.85)] backdrop-blur-sm"
    >
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column */}
        <div
          className={`transition-all duration-700 ${
            visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
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

          <p className="mt-6 text-[#cbd5e1] leading-[1.7]">{c.body}</p>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center gap-6 mt-10">
            {c.badges.map((badge, i) => {
              const Icon = badge.icon;
              const isLast = i === c.badges.length - 1;
              return (
                <div key={badge.text} className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Icon className="w-5 h-5 text-[#c9a84c]" strokeWidth={1.5} />
                    <span className="text-[#cbd5e1] text-xs tracking-[0.05em]">
                      {badge.text}
                    </span>
                  </div>
                  {!isLast && <span className="w-[1px] h-6 bg-[#1e293b] hidden sm:block" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Contact Cards */}
        <div className="flex flex-col gap-4">
          {c.contacts.map((contact, i) => (
            <div
              key={contact.country}
              className={`flex items-center gap-5 bg-[rgba(15,23,42,0.6)] border border-[rgba(51,65,85,0.4)] rounded-2xl p-6 transition-all duration-600 hover:border-[rgba(201,168,76,0.3)] ${
                visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
              }`}
              style={{
                transitionDelay: visible ? `${i * 100}ms` : '0ms',
              }}
            >
              {/* Flag */}
              <div className="w-12 h-12 rounded-full overflow-hidden border border-[rgba(51,65,85,0.4)] flex-shrink-0">
                <img
                  src={contact.flag}
                  alt={contact.country}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3
                  className="text-white text-base font-semibold"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {contact.country}
                </h3>
                <p className="text-[#cbd5e1] text-sm">{contact.phone}</p>
              </div>

              {/* WhatsApp Button */}
              <a
                href={contact.waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-[#25D366] text-white rounded-full text-xs font-semibold tracking-[0.05em] uppercase transition-all duration-150 hover:brightness-110 flex-shrink-0"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
              >
                <MessageCircle size={14} />
                <span className="hidden sm:inline">{c.waLabel}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
