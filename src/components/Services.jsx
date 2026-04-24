import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import service1 from '../assets/images/service-1.png';
import service2 from '../assets/images/service-2.png';
import service3 from '../assets/images/service-3.png';

gsap.registerPlugin(ScrollTrigger);

export default function Services() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const cards = cardsRef.current;
    
    let ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        if (i === cards.length - 1) return;

        const nextCard = cards[i + 1];
        
        // As the next card enters from the bottom, the current card scales and blurs
        gsap.to(card, {
          scale: 0.9,
          filter: "blur(20px)",
          opacity: 0.5,
          ease: "none",
          scrollTrigger: {
            trigger: nextCard,
            start: "top 100%", // Start when the top of the next card hits the bottom of the screen
            end: "top 0%",    // End when the top of the next card hits the top of the screen
            scrub: true,
          }
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const services = [
    {
      title: "Residential Solar Installations",
      desc: "We don’t just install your system and walk away. Our ongoing maintenance services ensure your solar and energy systems are performing at their best — year after year. With real-time expert support, you can feel confident in your investment.",
      image: service1,
      tag: "01 / RESIDENTIAL SOLUTIONS"
    },
    {
      title: "Commercial Solar Installations",
      desc: "We design and install custom solar energy systems that reduce your reliance on the grid and lower your long-term energy expenses. From rooftop arrays to ground-mounted systems, our team delivers solutions that are built to perform — and built to last.",
      image: service2,
      tag: "02 / COMMERCIAL INFRASTRUCTURE"
    },
    {
      title: "Project Consulting & Development Support",
      desc: "From feasibility assessments to permitting and incentive navigation, Iron Oak Power provides the guidance you need to bring your project to life. Our team works closely with property owners, developers, and business leaders to streamline the process and deliver results.",
      image: service3,
      tag: "03 / CONSULTING & SUPPORT"
    }
  ];

  return (
    <section id="services" ref={containerRef} className="bg-bg text-primary">
      {/* Introduction Header */}
      <div className="min-h-[70vh] flex items-center justify-center px-6 py-32 md:px-12 bg-bg">
        <div className="max-w-5xl mx-auto text-center">
          <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold block mb-10">Our Services</span>
          <h2 className="text-4xl md:text-7xl font-light leading-[1.1] mb-12 text-primary uppercase">
            Powering Your <br />
            <span className="font-medium italic lowercase font-serif">Future Independence</span>
          </h2>
          <p className="text-primary/70 text-lg md:text-2xl leading-relaxed max-w-3xl mx-auto font-light">
            At IronOak Power, we specialize in providing reliable, high-performance solar and energy solutions for commercial, industrial, and agricultural properties. Whether you're looking to reduce operating costs, achieve energy independence, or meet sustainability targets, our team is here to guide you every step of the way.
          </p>
        </div>
      </div>

      {/* Stacking Cards Container */}
      <div className="relative">
        {services.map((service, index) => (
          <div
            key={index}
            ref={(el) => (cardsRef.current[index] = el)}
            className="h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden"
            style={{ zIndex: index + 1 }}
          >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
              <img 
                src={service.image} 
                alt={service.title} 
                className="w-full h-full object-cover grayscale-[30%] contrast-[1.1]"
              />
              <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
            </div>

            {/* Card Content */}
            <div className="relative z-10 container mx-auto px-6 md:px-24">
              <div className="max-w-4xl">
                <div className="flex items-center gap-6 mb-8">
                  <div className="h-px w-20 bg-accent" />
                  <span className="text-accent uppercase tracking-[0.5em] text-sm font-bold">
                    {service.tag}
                  </span>
                </div>
                
                <h3 className="text-5xl md:text-8xl font-bold mb-10 leading-none tracking-tight text-white uppercase font-sans-condensed">
                  {service.title}
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-8">
                    <p className="text-white/80 text-lg md:text-2xl leading-relaxed mb-12 font-light">
                      {service.desc}
                    </p>
                    
                    <button className="group flex items-center gap-6 text-white border border-white/30 px-10 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-accent hover:border-accent hover:scale-105 active:scale-95">
                      Request a Quote
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                    </button>
                  </div>
                  
                  {/* Decorative Number */}
                  <div className="hidden md:block md:col-span-4 text-right">
                    <span className="text-[12rem] font-bold text-white/5 leading-none select-none">
                      0{index + 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="absolute bottom-12 right-12 text-white/40 text-xs font-bold tracking-[0.3em] uppercase hidden md:block">
              Iron Oak Power / {index + 1} of 3
            </div>
          </div>
        ))}
      </div>
      
      {/* Bottom spacer */}
      <div className="h-[20vh] bg-dark" />
    </section>
  );
}
