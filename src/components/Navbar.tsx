import { useState } from 'react';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const Navbar = () => {
  const [language, setLanguage] = useState('es');
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll for sticky CTA
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 100);
    });
  }

  const navLinks = [
    { href: '#servicios', label: { es: 'Servicios', ca: 'Serveis', en: 'Services' } },
    { href: '#blog', label: { es: 'Blog/Contenido', ca: 'Blog/Contingut', en: 'Blog/Content' } },
    { href: '#acerca-de', label: { es: 'Acerca de Mí', ca: 'Sobre Mi', en: 'About Me' } },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo Avatar */}
          <a href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="h-10 w-10 rounded-full bg-accent flex items-center justify-center text-accent-foreground font-bold">
              IT
            </div>
            <span className="font-bold text-lg hidden sm:inline">IvanTechCoach</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-foreground hover:text-accent transition-colors"
              >
                {link.label[language as keyof typeof link.label]}
              </a>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu */}
          <div className="flex items-center gap-2">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-[70px] h-9 border-none">
                <Globe className="h-4 w-4 mr-1" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="es">ES</SelectItem>
                <SelectItem value="ca">CA</SelectItem>
                <SelectItem value="en">EN</SelectItem>
              </SelectContent>
            </Select>

            {/* Mobile Hamburger Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px]">
                <nav className="flex flex-col gap-4 mt-8">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {link.label[language as keyof typeof link.label]}
                    </a>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      {/* Sticky CTA Button (appears after scroll) */}
      {isScrolled && (
        <Button
          className="fixed top-20 right-4 z-40 shadow-lg"
          size="sm"
          onClick={() => window.location.href = '#consulta'}
        >
          {language === 'es' ? 'Agenda Consultoría' : language === 'ca' ? 'Agenda Consultoria' : 'Book Consultation'}
        </Button>
      )}
    </>
  );
};
