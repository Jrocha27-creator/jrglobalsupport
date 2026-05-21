import { useEffect, useRef, useState } from 'react';
import { FileCheck, FolderOpen, UserCheck, ClipboardList, Globe, Compass } from 'lucide-react';

interface ServicesProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    label: 'AREAS DE ATUACAO',
    heading: 'SOLUÇÕES JURÍDICAS GLOBAIS',
    subtext:
      'Oferecemos suporte jurídico completo e personalizado para atender às suas necessidades em diferentes países e áreas do direito.',
    services: [
      {
        icon: FileCheck,
        title: 'APOIO DOCUMENTAL',
        desc: 'Auxílio na organização, conferência e preparação inicial de documentos. Garantimos que toda a documentação esteja em ordem para análise jurídica.',
      },
      {
        icon: FolderOpen,
        title: 'ORGANIZAÇÃO DE DOCUMENTOS',
        desc: 'Estruturação de documentos para facilitar análise e encaminhamento. Organizamos processos e papéis de forma clara e eficiente.',
      },
      {
        icon: UserCheck,
        title: 'ENCAMINHAMENTO HABILITADO',
        desc: 'Encaminhamento responsável para advogado ou profissional habilitado quando necessário. Conectamos você ao especialista certo.',
      },
      {
        icon: ClipboardList,
        title: 'ACOMPANHAMENTO ADMINISTRATIVO',
        desc: 'Suporte no acompanhamento de procedimentos administrativos e comunicação com partes envolvidas. Estamos ao seu lado em cada etapa.',
      },
      {
        icon: Globe,
        title: 'BRASILEIROS NO EXTERIOR',
        desc: 'Apoio especializado para brasileiros com interesses no Brasil, Portugal e Reino Unido. Resolvemos questões jurídicas transnacionais.',
      },
      {
        icon: Compass,
        title: 'ORIENTAÇÃO INICIAL',
        desc: 'Primeiro atendimento para entender a situação e indicar o caminho adequado. Analisamos seu caso e traçamos a melhor estratégia.',
      },
    ],
  },
  en: {
    label: 'PRACTICE AREAS',
    heading: 'GLOBAL LEGAL SOLUTIONS',
    subtext:
      'We provide complete and personalized legal support to meet your needs in different countries and areas of law.',
    services: [
      {
        icon: FileCheck,
        title: 'DOCUMENTAL SUPPORT',
        desc: 'Assistance in organizing, reviewing and preparing initial documentation. We ensure all documentation is in order for legal analysis.',
      },
      {
        icon: FolderOpen,
        title: 'DOCUMENT ORGANIZATION',
        desc: 'Structuring documents to facilitate analysis and referral. We organize processes and papers clearly and efficiently.',
      },
      {
        icon: UserCheck,
        title: 'QUALIFIED REFERRAL',
        desc: 'Responsible referral to a lawyer or qualified professional when necessary. We connect you with the right specialist.',
      },
      {
        icon: ClipboardList,
        title: 'ADMINISTRATIVE MONITORING',
        desc: 'Support in monitoring administrative procedures and communication with involved parties. We are by your side every step of the way.',
      },
      {
        icon: Globe,
        title: 'BRAZILIANS ABROAD',
        desc: 'Specialized support for Brazilians with interests in Brazil, Portugal and the United Kingdom. We solve cross-border legal issues.',
      },
      {
        icon: Compass,
        title: 'INITIAL GUIDANCE',
        desc: 'First consultation to understand the situation and indicate the appropriate path. We analyze your case and chart the best strategy.',
      },
    ],
  },
};

export default function ServicesSection({ lang }: ServicesProps) {
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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full py-[120px] px-6 bg-[rgba(15,23,42,0.85)] backdrop-blur-sm"
    >
      <div className="max-w-[1280px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[800px] mx-auto">
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
          <p className="mt-4 text-[#cbd5e1] leading-[1.7]">{c.subtext}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {c.services.map((service, i) => {
            const Icon = service.icon;
            return (
              <div
                key={service.title}
                className={`bg-[rgba(15,23,42,0.5)] border border-[rgba(51,65,85,0.3)] rounded-2xl p-10 transition-all duration-400 hover:border-[rgba(201,168,76,0.5)] hover:bg-[rgba(201,168,76,0.03)] hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transitionDelay: visible ? `${i * 120}ms` : '0ms',
                  transitionDuration: '700ms',
                }}
              >
                <Icon className="w-12 h-12 text-[#c9a84c]" strokeWidth={1.5} />
                <h3
                  className="mt-5 text-white text-lg font-semibold tracking-[0.02em]"
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif" }}
                >
                  {service.title}
                </h3>
                <p className="mt-3 text-[#cbd5e1] text-sm leading-[1.7]">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
