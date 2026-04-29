import { Mail, Phone, MapPin, Camera, Globe, MessageSquare } from 'lucide-react';

export default function Footer({ onPrivacyClick, onTermsClick, onCancellationClick }) {
  return (
    <footer className="bg-primary text-white px-8 md:px-20 pt-32 pb-12 overflow-hidden relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-24">
          <div>
            <h2 className="text-4xl md:text-6xl font-sans-condensed font-bold uppercase mb-8 leading-tight">
              Let's build the <br />
              <span className="text-accent italic font-serif">Energy future</span> together
            </h2>
            <p className="text-white/40 max-w-md font-metrics text-lg">
              Partner with the industry leaders in sustainable power infrastructure. 
              Efficiency, durability, and innovation at every scale.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-x-4 md:gap-x-12 gap-y-12">
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest">Navigation</span>
              <div className="flex flex-col gap-2 md:gap-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors text-xs md:text-base">Home</a>
                <a href="#services" className="text-white/60 hover:text-white transition-colors text-xs md:text-base">Services</a>
                <a href="#calculator" className="text-white/60 hover:text-white transition-colors text-xs md:text-base">Calculator</a>
                <a href="#about" className="text-white/60 hover:text-white transition-colors text-xs md:text-base">About</a>
              </div>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest">Contact</span>
              <div className="flex flex-col gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-white/60 text-[10px] md:text-sm">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                  <a href="mailto:Info@ironoakpower.com" className="hover:text-white transition-colors truncate">
                    <span className="md:hidden">Email</span>
                    <span className="hidden md:inline">Info@ironoakpower.com</span>
                  </a>
                </div>
                <div className="flex items-center gap-2 text-white/60 text-[10px] md:text-sm">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                  <a href="tel:6139221093" className="hover:text-white transition-colors">
                    <span className="md:hidden">Call</span>
                    <span className="hidden md:inline">613-922-1093</span>
                  </a>
                </div>
                <div className="flex items-start gap-2 text-white/60 text-[10px] md:text-sm">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 shrink-0" />
                  <span className="md:hidden">ON, Canada</span>
                  <span className="hidden md:inline">IronOak Power Inc.<br />51 Curtis St. ON.<br />K0k 2T0</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-accent text-[10px] md:text-xs font-bold uppercase tracking-widest">
                <span className="md:hidden">Hours</span>
                <span className="hidden md:inline">Hours of Operations</span>
              </span>
              <div className="text-white/60 text-[10px] md:text-sm flex flex-col gap-2">
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-4">
                  <span className="whitespace-nowrap">
                    <span className="md:hidden">M - F</span>
                    <span className="hidden md:inline">Mon - Fri</span>
                  </span>
                  <span className="text-white font-bold">8am - 5pm</span>
                </div>
                <div className="flex flex-col md:flex-row md:justify-between gap-1 md:gap-4">
                  <span className="whitespace-nowrap">
                    <span className="md:hidden">S - S</span>
                    <span className="hidden md:inline">Sat - Sun</span>
                  </span>
                  <span className="text-white/30 italic">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center">
            <img 
              src="https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg" 
              alt="Iron Oak Power" 
              className="h-10 w-auto brightness-0 invert"
            />
          </div>
          
          <div className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">
            © 2026 Iron Oak Power. All rights reserved. Built to last.
          </div>
          
          <div className="grid grid-cols-3 gap-2 md:flex md:gap-8 text-[8px] sm:text-[10px] text-white/40 uppercase font-bold tracking-widest text-center">
            <button onClick={onPrivacyClick} className="hover:text-accent cursor-pointer transition-colors whitespace-nowrap">Privacy Policy</button>
            <button onClick={onTermsClick} className="hover:text-accent cursor-pointer transition-colors whitespace-nowrap">Terms of Service</button>
            <button onClick={onCancellationClick} className="hover:text-accent cursor-pointer transition-colors whitespace-nowrap">Cancellation Policy</button>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
