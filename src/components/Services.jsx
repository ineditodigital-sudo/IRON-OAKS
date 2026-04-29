import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import service1 from '../assets/images/service-1.png';
import service2 from '../assets/images/service-2.png';
import service3 from '../assets/images/service-3.png';

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

  return (
    <section id="services" ref={containerRef} className="bg-bg text-primary pt-24 pb-20">
      <div className="container mx-auto px-6 md:px-12">
        {/* Introduction Header */}
        <div className="services-header max-w-5xl mb-16">
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block mb-4">Our Services</span>
          <h2 className="text-4xl md:text-6xl font-light leading-[1.1] mb-8 text-primary uppercase">
            Powering Your <br />
            <span className="font-medium italic lowercase font-serif">Future Independence</span>
          </h2>
          <p className="text-primary/70 text-base md:text-lg leading-relaxed max-w-3xl font-light">
            At IronOak Power, we specialize in providing reliable, high-performance solar and energy solutions for commercial, industrial, and agricultural properties.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 bg-dark transition-shadow duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
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
              <div className="relative h-full flex flex-col justify-end p-8 md:p-10">
                <div className="mb-6">
                  <span className="inline-block bg-accent/20 backdrop-blur-md border border-accent/30 px-3 py-1.5 text-accent text-[9px] md:text-[10px] font-bold tracking-[0.3em] uppercase mb-6 transform transition-all duration-500 group-hover:translate-x-2">
                    {service.tag.includes(' / ') ? service.tag.split(' / ')[1] : service.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight uppercase font-sans-condensed">
                    {service.title}
                  </h3>
                  <div className="h-0.5 w-12 bg-accent transform origin-left transition-all duration-500 group-hover:w-full" />
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 opacity-100 md:opacity-0 translate-y-0 md:translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 line-clamp-4 md:h-32">
                  {service.desc}
                </p>
                
                <a href="#calculator" className="opacity-100 md:opacity-0 translate-y-0 md:translate-y-4 transition-all duration-500 delay-100 group-hover:opacity-100 group-hover:translate-y-0">
                  <button className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:text-accent">
                    Get a Quote
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
              </div>

              {/* Decorative Number */}
              <div className="absolute top-8 right-8 text-white/5 text-6xl font-bold select-none transition-opacity duration-500 group-hover:opacity-10">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
