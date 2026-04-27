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

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
            <div className="flex flex-col gap-4">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Navigation</span>
              <a href="#" className="text-white/60 hover:text-white transition-colors">Home</a>
              <a href="#services" className="text-white/60 hover:text-white transition-colors">Services</a>
              <a href="#calculator" className="text-white/60 hover:text-white transition-colors">Calculator</a>
              <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
              <a href="#partners" className="text-white/60 hover:text-white transition-colors">Partners</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Contact</span>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <a href="mailto:Info@ironoakpower.com" className="hover:text-white transition-colors">Info@ironoakpower.com</a>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4" />
                <a href="tel:6139221093" className="hover:text-white transition-colors">613-922-1093</a>
              </div>
              <div className="flex items-start gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span>IronOak Power Inc.<br />51 Curtis St. ON.<br />K0k 2T0</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Hours of Operations</span>
              <div className="text-white/60 text-sm flex flex-col gap-2">
                <div className="flex justify-between gap-4">
                  <span>Mon - Fri</span>
                  <span className="text-white">8am - 5pm</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Sat - Sun</span>
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
          
          <div className="flex flex-wrap gap-8 text-[10px] text-white/40 uppercase font-bold tracking-widest">
            <button onClick={onPrivacyClick} className="hover:text-accent cursor-pointer transition-colors">Privacy Policy</button>
            <button onClick={onTermsClick} className="hover:text-accent cursor-pointer transition-colors">Terms of Service</button>
            <button onClick={onCancellationClick} className="hover:text-accent cursor-pointer transition-colors">Cancellation Policy</button>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
