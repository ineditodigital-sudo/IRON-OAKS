import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Layout, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".partner-content > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="partners"
      className="bg-dark text-white py-20 px-6 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Branding & Info */}
          <div className="lg:col-span-5 partner-content">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block mb-4">Our Partners</span>
            <div className="mb-8">
              <img 
                src="https://imagenes.inedito.digital/IRONOAK%20POWER/TransparentLogo.webp" 
                alt="Superior Gen Logo" 
                className="h-20 md:h-28 w-auto brightness-0 invert opacity-90"
              />
            </div>
            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-8 font-light">
              Superior Gen is a specialized solar design partner working with IronOak Power to deliver efficient, code-compliant, and high-quality solar system designs.
            </p>
            <div className="h-px w-full bg-white/10 mb-8" />
            <p className="text-white/50 text-xs leading-relaxed italic">
              Together, Superior Gen provides precise design support while IronOak Power ensures professional installation and energy solutions.
            </p>
          </div>

          {/* Right Column: Expertise Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-6 partner-content">
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500">
              <Layout className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-xl font-bold uppercase font-sans-condensed mb-4 tracking-tight">Comprehensive Solar Design</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                From initial concepts to fully engineered layouts tailored to each property.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500">
              <Shield className="w-10 h-10 text-accent mb-6" />
              <h3 className="text-xl font-bold uppercase font-sans-condensed mb-4 tracking-tight">Attention to Detail</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Focused on performance, compliance, and seamless integration for homes and businesses.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors duration-500 md:col-span-2">
              <div className="flex flex-col md:flex-row md:items-center gap-8">
                <MessageSquare className="w-10 h-10 text-accent shrink-0" />
                <div>
                  <h3 className="text-xl font-bold uppercase font-sans-condensed mb-2 tracking-tight">Trusted Service</h3>
                  <p className="text-white/40 text-sm leading-relaxed">
                    Clear communication, responsive support, and dependable collaboration throughout projects. This partnership offers clients a complete solar package emphasizing efficiency, reliability, and long-term value.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
