import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hls from 'hls.js';
import { Award, MessagesSquare, HeartHandshake } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('uploads/')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function About({ data }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const videoRef = useRef(null);

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
    }, containerRef);
    
    // HLS Support for Video
    const video = videoRef.current;
    const videoSrc = getImageUrl(data?.videoUrl) || "https://video.squarespace-cdn.com/content/v1/685d9c11e3d5cf3b64cda10e/29eaaae8-599d-4008-b7e2-764e69efbe26/playlist.m3u8";

    if (videoSrc.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(videoSrc);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = videoSrc;
      }
    } else {
      video.src = videoSrc;
    }

    return () => ctx.revert();
  }, [data]);

  return (
    <section 
      ref={containerRef}
      id="about"
      className="relative min-h-[90vh] bg-bg overflow-hidden py-20 px-6 md:px-12 flex flex-col justify-center"
    >
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <video 
          ref={videoRef}
          autoPlay 
          muted 
          loop 
          playsInline
          poster="https://video.squarespace-cdn.com/content/v1/685d9c11e3d5cf3b64cda10e/29eaaae8-599d-4008-b7e2-764e69efbe26/thumbnail"
          className="w-full h-full object-cover grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-transparent to-bg" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold block mb-6">About our company</span>
            <h2 
              ref={textRef}
              className="text-primary text-5xl md:text-6xl lg:text-7xl leading-[0.9] font-sans-condensed font-bold uppercase mb-8"
            >
              Who we are
            </h2>
            <p className="text-primary/80 text-lg md:text-xl font-light leading-relaxed mb-10">
              IronOak Power designs and builds durable solar systems that empower homeowners and businesses to take control of their energy future.
            </p>
            
            <div className="space-y-8">
              <div className="border-l-2 border-accent pl-8 py-2">
                <span className="text-accent uppercase tracking-widest text-[10px] font-bold block mb-2">Core Services</span>
                <p className="text-primary/60 text-base leading-relaxed">
                  Design, construction, management, inspection, and maintenance of residential and commercial solar systems across Canada, USA, Bahamas, and beyond.
                </p>
              </div>

              <div className="border-l-2 border-accent pl-8 py-2">
                <span className="text-accent uppercase tracking-widest text-[10px] font-bold block mb-2">Customer Benefits</span>
                <p className="text-primary/60 text-base leading-relaxed">
                  Lower utility bills or generate income by selling clean energy.
                </p>
              </div>
            </div>
          </div>
          
          <div className="lg:pt-10">
            <div className="bg-dark/50 backdrop-blur-xl p-8 md:p-12 rounded-3xl border border-white/5 shadow-2xl">
              <span className="inline-block bg-accent px-3 py-1.5 text-primary text-[10px] font-bold tracking-[0.3em] uppercase mb-10 rounded-sm">
                Key Commitments
              </span>
              
              <ul className="space-y-10">
                {[
                  { 
                    title: "Quality craftsmanship", 
                    desc: "Precision and durability in every installation",
                    icon: Award 
                  },
                  { 
                    title: "Clear communication", 
                    desc: "Timely and transparent updates throughout the process",
                    icon: MessagesSquare 
                  },
                  { 
                    title: "Exceptional service", 
                    desc: "Dedicated support from start to finish",
                    icon: HeartHandshake 
                  }
                ].map((item, i) => (
                  <li key={i} className="group flex items-start gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-lg shadow-accent/20">
                      <item.icon className="w-6 h-6 text-dark" strokeWidth={2} />
                    </div>
                    <div>
                      <h4 className="text-white text-xl font-bold uppercase font-sans-condensed mb-2 tracking-tight">
                        {item.title}
                      </h4>
                      <p className="text-white/40 text-sm font-light">
                        {item.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
