import { useState, useEffect } from 'react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-8 left-0 right-0 z-50 flex justify-center px-4">
      <div 
        className={`
          flex items-center justify-between w-full max-w-5xl px-8 py-3 rounded-full transition-all duration-500
          ${isScrolled 
            ? 'glass text-accent shadow-lg border-white/50' 
            : 'bg-transparent text-white'}
        `}
      >
        <div className="flex items-center">
          <img 
            src="https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg" 
            alt="Iron Oak Power" 
            className={`h-12 w-auto transition-all duration-500 ${!isScrolled ? 'brightness-0 invert' : ''}`}
          />
        </div>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium uppercase tracking-widest">
          <a href="#services" className="hover:opacity-70 transition-opacity">Services</a>
          <a href="#about" className="hover:opacity-70 transition-opacity">About</a>
          <a href="#partners" className="hover:opacity-70 transition-opacity">Partners</a>
        </div>

        <button className={`
          px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 magnetic-btn
          ${isScrolled ? 'bg-primary text-white' : 'bg-white text-primary'}
        `}>
          <span>Contact</span>
        </button>
      </div>
    </nav>
  );
}
