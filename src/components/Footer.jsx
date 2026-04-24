import { Mail, Phone, MapPin, Camera, Globe, MessageSquare } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white rounded-t-[4rem] md:rounded-t-[6rem] px-8 md:px-20 pt-32 pb-12 overflow-hidden relative">
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
              <a href="#about" className="text-white/60 hover:text-white transition-colors">About</a>
              <a href="#partners" className="text-white/60 hover:text-white transition-colors">Partners</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Contact</span>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4" />
                <span>hello@ironoak.com</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 000-POWER</span>
              </div>
              <div className="flex items-center gap-2 text-white/60 text-sm">
                <MapPin className="w-4 h-4" />
                <span>Oak Valley, CA</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-accent text-xs font-bold uppercase tracking-widest">Social</span>
              <div className="flex gap-4">
                <Camera className="w-5 h-5 text-white/40 hover:text-accent transition-colors cursor-pointer" />
                <Globe className="w-5 h-5 text-white/40 hover:text-accent transition-colors cursor-pointer" />
                <MessageSquare className="w-5 h-5 text-white/40 hover:text-accent transition-colors cursor-pointer" />
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
          
          <div className="flex gap-8 text-[10px] text-white/40 uppercase font-bold tracking-widest">
            <a href="#" className="hover:text-accent">Privacy Policy</a>
            <a href="#" className="hover:text-accent">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-accent opacity-5 rounded-full blur-3xl pointer-events-none" />
    </footer>
  );
}
