import { Instagram, Facebook, Mail } from 'lucide-react';

interface FooterProps {
  lang: 'pt' | 'en';
}

const CONTENT = {
  pt: {
    tagline: 'Conectando voce a solucoes juridicas, onde voce estiver.',
    navTitle: 'NAVEGACAO',
    navLinks: [
      { label: 'Inicio', href: '#hero' },
      { label: 'Sobre Nos', href: '#about' },
      { label: 'Areas de Atuacao', href: '#services' },
      { label: 'Contato', href: '#contact' },
    ],
    servicesTitle: 'SERVICOS',
    serviceLinks: [
      'Apoio Documental',
      'Organizacao de Documentos',
      'Encaminhamento Habilitado',
      'Acompanhamento Administrativo',
      'Brasileiros no Exterior',
      'Orientacao Inicial',
    ],
    contactTitle: 'CONTATO',
    contacts: [
      { country: 'Brasil', phone: '+55 62 99616-4242', flag: '/assets/flag-brazil-hd.png' },
      { country: 'Portugal', phone: '+351 937 175 988', flag: '/assets/flag-portugal-hd.png' },
      { country: 'Reino Unido', phone: '+44 7454 323562', flag: '/assets/flag-uk-hd.png' },
    ],
    copyright: '2025 JR Global Support. Todos os direitos reservados.',
  },
  en: {
    tagline: 'Connecting you to legal solutions, wherever you are.',
    navTitle: 'NAVIGATION',
    navLinks: [
      { label: 'Home', href: '#hero' },
      { label: 'About Us', href: '#about' },
      { label: 'Practice Areas', href: '#services' },
      { label: 'Contact', href: '#contact' },
    ],
    servicesTitle: 'SERVICES',
    serviceLinks: [
      'Documental Support',
      'Document Organization',
      'Qualified Referral',
      'Administrative Monitoring',
      'Brazilians Abroad',
      'Initial Guidance',
    ],
    contactTitle: 'CONTACT',
    contacts: [
      { country: 'Brazil', phone: '+55 62 99616-4242', flag: '/assets/flag-brazil-hd.png' },
      { country: 'Portugal', phone: '+351 937 175 988', flag: '/assets/flag-portugal-hd.png' },
      { country: 'United Kingdom', phone: '+44 7454 323562', flag: '/assets/flag-uk-hd.png' },
    ],
    copyright: '2025 JR Global Support. All rights reserved.',
  },
};

export default function Footer({ lang }: FooterProps) {
  const c = CONTENT[lang];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-[rgba(7,13,26,0.9)] backdrop-blur-sm border-t border-[rgba(30,41,59,0.3)]">
      <div className="max-w-[1280px] mx-auto px-6 pt-16 pb-8">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span
                className="text-[#c9a84c] text-2xl"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                JR
              </span>
              <span
                className="text-[#c9a84c] text-[10px] tracking-[0.12em] uppercase"
                style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 500 }}
              >
                GLOBAL SUPPORT
              </span>
            </div>
            <span className="text-[#64748b] text-[9px] tracking-[0.15em] uppercase block mt-0.5">
              {lang === 'pt' ? 'ASSESSORIA INTERNACIONAL' : 'INTERNATIONAL ADVISORY'}
            </span>
            <p className="mt-4 text-[#cbd5e1] text-sm leading-relaxed max-w-[280px]">
              {c.tagline}
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.1em] uppercase font-medium mb-4">
              {c.navTitle}
            </h4>
            <div className="flex flex-col gap-3">
              {c.navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="text-[#cbd5e1] text-sm hover:text-[#c9a84c] transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.1em] uppercase font-medium mb-4">
              {c.servicesTitle}
            </h4>
            <div className="flex flex-col gap-2.5">
              {c.serviceLinks.map((service) => (
                <span key={service} className="text-[#cbd5e1] text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[#c9a84c] text-xs tracking-[0.1em] uppercase font-medium mb-4">
              {c.contactTitle}
            </h4>
            <div className="flex flex-col gap-3">
              {c.contacts.map((contact) => (
                <div key={contact.country} className="flex items-center gap-2">
                  <img
                    src={contact.flag}
                    alt={contact.country}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-[#cbd5e1] text-sm">{contact.phone}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4">
              <a
                href="#"
                className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
                aria-label="LinkedIn"
              >
                <Facebook size={18} />
              </a>
              <a
                href="mailto:contato@jrglobalsupport.com"
                className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-[rgba(30,41,59,0.2)] flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[#64748b] text-xs tracking-[0.03em]">
            &copy; {c.copyright}
          </p>
          <p className="text-[#64748b] text-xs tracking-[0.03em]">
            JR Global Support
          </p>
        </div>
      </div>
    </footer>
  );
}
