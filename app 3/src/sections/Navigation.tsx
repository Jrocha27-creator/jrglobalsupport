import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavigationProps {
  lang: 'pt' | 'en';
  onLangChange: (lang: 'pt' | 'en') => void;
}

const NAV_PT = [
  { label: 'INICIO', href: '#hero' },
  { label: 'SOBRE NOS', href: '#about' },
  { label: 'AREAS DE ATUACAO', href: '#services' },
  { label: 'CONTATO', href: '#contact' },
];

const NAV_EN = [
  { label: 'HOME', href: '#hero' },
  { label: 'ABOUT US', href: '#about' },
  { label: 'PRACTICE AREAS', href: '#services' },
  { label: 'CONTACT', href: '#contact' },
];

export default function Navigation({ lang, onLangChange }: NavigationProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);

  const navItems = lang === 'pt' ? NAV_PT : NAV_EN;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['hero', 'about', 'services', 'countries', 'contact'];
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] flex items-center transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(7,13,26,0.95)] backdrop-blur-xl border-b border-[rgba(51,65,85,0.3)]'
            : 'bg-[rgba(7,13,26,0.4)] backdrop-blur-sm border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1280px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-2"
          >
            <span
              className="text-[#c9a84c] text-2xl tracking-[0.02em]"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
            >
              JR
            </span>
            <span
              className="text-[#c9a84c]/80 text-[10px] tracking-[0.15em] uppercase hidden sm:inline"
              style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 500 }}
            >
              Global Support
            </span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative text-sm tracking-[0.05em] transition-colors duration-300 hover:text-[#c9a84c] ${
                    isActive ? 'text-[#c9a84c]' : 'text-[#cbd5e1]'
                  }`}
                  style={{ fontFamily: "'Montserrat', system-ui, sans-serif", fontWeight: 500 }}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#c9a84c]" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Language Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => onLangChange('pt')}
              className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                lang === 'pt' ? 'border-[#c9a84c] scale-110' : 'border-[#334155] opacity-60 hover:opacity-100'
              }`}
              title="Portugues"
            >
              <img src="/assets/flag-brazil-hd.png" alt="PT" className="w-full h-full object-cover" />
            </button>
            <button
              onClick={() => onLangChange('en')}
              className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                lang === 'en' ? 'border-[#c9a84c] scale-110' : 'border-[#334155] opacity-60 hover:opacity-100'
              }`}
              title="English"
            >
              <img src="/assets/flag-uk-hd.png" alt="EN" className="w-full h-full object-cover" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-[#c9a84c] p-2"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#070d1a]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-8 md:hidden">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-5 right-5 text-[#c9a84c] p-2"
            aria-label="Close menu"
          >
            <X size={28} />
          </button>

          {/* Mobile Logo */}
          <span
            className="text-[#c9a84c] text-4xl mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400 }}
          >
            JR
          </span>

          {navItems.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="text-2xl text-[#cbd5e1] hover:text-[#c9a84c] transition-colors duration-300"
              style={{
                fontFamily: "'Montserrat', system-ui, sans-serif",
                fontWeight: 700,
                animation: `fadeInUp 0.4s ease-out ${i * 100}ms both`,
              }}
            >
              {item.label}
            </a>
          ))}
          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={() => { onLangChange('pt'); setMobileOpen(false); }}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                lang === 'pt' ? 'border-[#c9a84c] text-[#c9a84c]' : 'border-[#334155] text-[#64748b]'
              }`}
            >
              Portugues
            </button>
            <button
              onClick={() => { onLangChange('en'); setMobileOpen(false); }}
              className={`px-4 py-2 rounded-full text-sm border transition-all ${
                lang === 'en' ? 'border-[#c9a84c] text-[#c9a84c]' : 'border-[#334155] text-[#64748b]'
              }`}
            >
              English
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
