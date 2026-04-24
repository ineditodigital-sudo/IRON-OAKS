import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';

gsap.registerPlugin(ScrollTrigger);

export default function Partners() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Split text animation
      const text = textRef.current;
      const content = text.textContent;
      text.innerHTML = content.split(' ').map(word => 
        `<span class="inline-block overflow-hidden"><span class="inline-block translate-y-full">${word}&nbsp;</span></span>`
      ).join('');

      gsap.to(text.querySelectorAll('span span'), {
        y: 0,
        duration: 1,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: text,
          start: "top 80%",
        }
      });
    }, containerRef);
    
    // HLS Support
    const video = videoRef.current;
    const videoSrc = "https://video.squarespace-cdn.com/content/v1/685d9c11e3d5cf3b64cda10e/29eaaae8-599d-4008-b7e2-764e69efbe26/playlist.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      // Native support (Safari)
      video.src = videoSrc;
    }

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef}
      id="partners"
      className="relative h-screen bg-bg overflow-hidden flex items-center justify-center px-6"
    >
      {/* Background Media (HLS Video) with Semi-transparency */}
      <div className="absolute inset-0 z-0">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://video.squarespace-cdn.com/content/v1/685d9c11e3d5cf3b64cda10e/29eaaae8-599d-4008-b7e2-764e69efbe26/thumbnail"
          className="w-full h-full object-cover opacity-20 grayscale scale-110"
        />
        <div className="absolute inset-0 bg-bg/60 mix-blend-multiply" />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <img 
          src="https://imagenes.inedito.digital/IRONOAK%20POWER/LOGO-IRONOAK-AZUL.svg" 
          alt="Iron Oak Power Logo"
          className="w-48 md:w-64 mx-auto mb-16 opacity-80 brightness-0 invert"
        />
        
        <h2 
          ref={textRef}
          className="text-primary text-5xl md:text-8xl font-sans-condensed font-bold uppercase leading-none tracking-tighter mb-12"
        >
          About our company
        </h2>

        <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale contrast-150">
          <div className="text-2xl font-bold font-sans-condensed">SIEMENS</div>
          <div className="text-2xl font-bold font-sans-condensed">TESLA</div>
          <div className="text-2xl font-bold font-sans-condensed">SUNPOWER</div>
          <div className="text-2xl font-bold font-sans-condensed">ABB</div>
        </div>
      </div>
    </section>
  );
}
