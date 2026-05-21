import { Instagram, Linkedin, Mail, FacebookIcon } from 'lucide-react';
<div className="flex items-center gap-4 mt-4">
  <a
    href="https://instagram.com/SEUINSTAGRAM"
    className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
    aria-label="Instagram"
  >
    <Instagram size={18} />
  </a>

  <a
    href="https://linkedin.com/in/SEULINKEDIN"
    className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
    aria-label="LinkedIn"
  >
    <Linkedin size={18} />
  </a>

  <a
    href="https://facebook.com/SEUFACEBOOK"
    className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
    aria-label="Facebook"
  >
    <FacebookIcon size={18} />
  </a>

  <a
    href="mailto:contato@jrglobalsupport.com"
    className="text-[#64748b] hover:text-[#c9a84c] transition-colors duration-200"
    aria-label="Email"
  >
    <Mail size={18} />
  </a>
</div>
