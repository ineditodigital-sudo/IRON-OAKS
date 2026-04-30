import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowLeft, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('uploads/')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function Services({ data }) {
  const containerRef = useRef(null);
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Header Animation
      gsap.from(".services-header > *", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-header",
          start: "top 85%",
        }
      });

      // Cards Animation
      gsap.from(".service-card", {
        y: 80,
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 85%",
          toggleActions: "play none none reverse"
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [data]);
  const services = data || [];
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = window.innerWidth < 768 ? 320 : 450;
    const currentScroll = scrollRef.current.scrollLeft;
    
    gsap.to(scrollRef.current, {
      scrollLeft: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  return (
    <section id="services" ref={containerRef} className="bg-bg text-primary pt-16 pb-12 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction Header */}
        <div className="services-header flex flex-col md:flex-row justify-between items-end mb-10 gap-8">
          <div className="max-w-2xl">
            <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block mb-3">Our Services</span>
            <h2 className="text-3xl md:text-5xl leading-[1.1] mb-6 text-primary uppercase">
              Powering Your <br />
              <span className="font-medium italic lowercase font-serif">Future Independence</span>
            </h2>
            <p className="text-primary/70 text-sm md:text-base leading-relaxed max-w-xl">
              At IronOak Power, we specialize in providing reliable, high-performance solar and energy solutions for commercial, industrial, and agricultural properties.
            </p>
          </div>

          <div className="flex gap-3 mb-2">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all active:scale-90"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Services Carousel */}
        <div 
          ref={scrollRef}
          className="services-grid flex gap-6 overflow-x-auto pb-8 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {services.map((service, index) => (
            <div
              key={service.id || index}
              className="service-card group relative min-w-[280px] md:min-w-[380px] aspect-[16/11] overflow-hidden rounded-[2rem] border border-white/10 bg-dark transition-shadow duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] snap-start"
            >
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <img 
                  src={getImageUrl(service.image)} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale-[30%] brightness-[0.7] contrast-[1.1] transition-all duration-700 group-hover:grayscale-0 group-hover:brightness-[0.4]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
              </div>

              {/* Card Content */}
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <div className="mb-4">
                  <span className="inline-block bg-accent/20 backdrop-blur-md border border-accent/30 px-3 py-1 text-white text-[8px] md:text-[9px] font-bold tracking-[0.3em] uppercase mb-4 transform transition-all duration-500 group-hover:translate-x-2">
                    {service.tag}
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 leading-tight uppercase font-sans-condensed">
                    {service.title}
                  </h3>
                  <div className="h-0.5 w-10 bg-accent transform origin-left transition-all duration-500 group-hover:w-full" />
                </div>

                <p className="text-white/60 text-xs md:text-sm leading-relaxed mb-6 opacity-100 md:opacity-0 translate-y-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-3 overflow-hidden">
                  {service.desc || "Customized energy solutions for your specific needs."}
                </p>
                
                <a href="#calculator" className="opacity-100 md:opacity-0 translate-y-0 md:translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                  <button className="flex items-center gap-2 text-white text-[9px] font-bold uppercase tracking-[0.2em] hover:text-accent">
                    Get a Quote
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </a>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-6 right-6 text-white/5 text-4xl font-bold select-none transition-opacity duration-500 group-hover:opacity-10">
                {String(index + 1).padStart(2, '0')}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
