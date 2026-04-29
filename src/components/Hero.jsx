import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('api/uploads')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function Hero({ data }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      }, "-=0.8");
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative h-[100dvh] w-full overflow-hidden flex items-end pb-24 px-6 md:px-12"
    >
      {/* Background Media */}
      <div className="absolute inset-0 z-0">
        {data.videoUrl ? (
          <video 
            src={getImageUrl(data.videoUrl)}
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img 
            src={getImageUrl(data.fallbackImage) || "https://imagenes.inedito.digital/IRONOAK%20POWER/Gemini_Generated_Image_g6qwymg6qwymg6qw.webp"} 
            alt="Iron Oak Power Hero"
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent mix-blend-multiply opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="flex flex-col gap-2">
          <h1 
            ref={titleRef}
            className="text-white text-4xl md:text-7xl lg:text-8xl font-sans-condensed font-bold uppercase leading-none tracking-tighter"
          >
            {data.title || "Built to last."}
          </h1>
          <h2 
            ref={subtitleRef}
            className="text-accent text-5xl md:text-8xl lg:text-9xl font-serif italic font-light leading-none -mt-1 md:-mt-4"
          >
            {data.italic || "Powered by nature"}
          </h2>
        </div>
      </div>
    </section>
  );
}
