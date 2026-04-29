import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Services', href: '#services' },
    { name: 'Calculator', href: '#calculator' },
    { name: 'About', href: '#about' },
    { name: 'Partners', href: '#partners' },
  ];

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <div 
        className={`
          flex items-center justify-between w-full max-w-5xl px-6 md:px-8 py-3 rounded-full transition-all duration-500 relative
          ${isScrolled || isMenuOpen
            ? 'glass text-accent shadow-lg border-white/50' 
            : 'bg-transparent text-white'}
        `}
      >
        <a href="#" className="flex items-center hover:opacity-80 transition-opacity">
          <img 
            src="https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg" 
            alt="Iron Oak Power" 
            className={`h-10 md:h-12 w-auto transition-all duration-500 ${(isScrolled || isMenuOpen) ? '' : 'brightness-0 invert'}`}
          />
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          {navLinks.map(link => (
            <a key={link.name} href={link.href} className="hover:opacity-70 transition-opacity">{link.name}</a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <a href="#calculator" className="hidden sm:block">
            <button className={`
              px-6 py-2 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest transition-all duration-300
              hover:scale-105 active:scale-95 hover:shadow-xl
              ${isScrolled || isMenuOpen ? 'bg-primary text-white' : 'bg-white text-primary'}
            `}>
              Get a Quote
            </button>
          </a>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-current p-1"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu Overlay */}
        <div 
          className={`
            absolute top-full left-0 right-0 mt-4 glass rounded-[2rem] p-6 flex flex-col gap-4 md:hidden transition-all duration-300 origin-top
            ${isMenuOpen ? 'scale-y-100 opacity-100' : 'scale-y-0 opacity-0 pointer-events-none'}
          `}
        >
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMenuOpen(false)}
              className="text-primary font-bold uppercase tracking-[0.2em] text-sm py-2 border-b border-primary/10"
            >
              {link.name}
            </a>
          ))}
          <a href="#calculator" onClick={() => setIsMenuOpen(false)} className="bg-primary text-white text-center py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-2 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
            Get a Quote
          </a>
        </div>
      </div>
    </nav>
  );
}
