export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const legalLinks = [
    { href: '/politica-privacidad', label: 'Política de Privacidad' },
    { href: '/politica-cookies', label: 'Política de Cookies' },
    { href: '/terminos-condiciones', label: 'Términos y Condiciones' },
  ];

  return (
    <footer className="border-t border-border bg-secondary/20">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Legal Links */}
          <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
            {legalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center md:text-right">
            © {currentYear} IvanTechCoach. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
