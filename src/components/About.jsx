import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split text animation effect
      const text = textRef.current;
      const content = text.textContent;
      text.innerHTML = content.split(' ').map(word => 
        `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}&nbsp;</span></span>`
      ).join('');

      gsap.to(text.querySelectorAll('span span'), {
        y: 0,
        duration: 1,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        }
      });

      // Parallax effect for image
      gsap.to(imageRef.current, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative min-h-screen bg-dark overflow-hidden py-32 px-6 md:px-12 flex flex-col justify-center"
    >
      {/* Background with organic texture parallax */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <img 
          ref={imageRef}
          src="https://imagenes.inedito.digital/IRONOAK%20POWER/bc_solar_incentives.webp" 
          alt="About Background"
          className="w-full h-[140%] object-cover object-center grayscale contrast-125"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-8">Vision & Mission</span>
          <h2 
            ref={textRef}
            className="text-white text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-sans-condensed font-bold uppercase"
          >
            Pioneering the next generation of solar infrastructure
          </h2>
        </div>
        
        <div className="flex flex-col gap-8">
          <p className="text-white/60 text-lg md:text-xl font-metrics leading-relaxed">
            At Iron Oak Power, we believe that energy should be as resilient as nature itself. 
            Our approach combines laboratory-grade engineering with sustainable materials to 
            create systems that don't just generate power, but redefine reliability.
          </p>
          
          <div className="flex flex-col gap-4 border-l-2 border-accent pl-8 py-2">
            <div className="flex items-end gap-2">
              <span className="text-white text-4xl font-bold font-sans-condensed leading-none">25+</span>
              <span className="text-accent text-xs font-bold uppercase tracking-widest pb-1">Years Warranty</span>
            </div>
            <p className="text-white/40 text-sm">Industrial-grade components built to withstand extreme environments.</p>
          </div>

          <button className="self-start mt-4 px-10 py-4 rounded-full border border-white/20 text-white uppercase tracking-widest text-xs font-bold hover:bg-white hover:text-dark transition-all duration-500 magnetic-btn">
            <span>Read our manifesto</span>
          </button>
        </div>
      </div>
    </section>
  );
}
