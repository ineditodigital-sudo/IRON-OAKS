import { useEffect, useRef } from 'react';
import { X, Calendar, User, ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('uploads/')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function BlogModal({ blog, onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Entry Animation
    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, 
      { opacity: 0 }, 
      { opacity: 1, duration: 0.4, ease: "power2.out" }
    ).fromTo(contentRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "-=0.2"
    );

    // Lock body scroll
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 30, opacity: 0, duration: 0.3, ease: "power2.in" })
      .to(modalRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "-=0.1");
  };

  if (!blog) return null;

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-primary/95 backdrop-blur-xl overflow-y-auto px-6 py-12 md:py-24"
    >
      <button 
        onClick={handleClose}
        className="fixed top-8 right-8 z-[110] bg-white/10 p-4 rounded-full text-white hover:bg-accent hover:text-primary transition-all group"
      >
        <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
      </button>

      <div 
        ref={contentRef}
        className="max-w-4xl mx-auto"
      >
        {/* Header Media */}
        <div className="relative aspect-[21/9] rounded-[2.5rem] overflow-hidden mb-12 border border-white/10 shadow-2xl">
          <img 
            src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=80&w=1000'} 
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-6 text-xs text-accent uppercase tracking-widest font-bold">
            <span className="flex items-center gap-2">
              <Calendar size={14} />
              {blog.date}
            </span>
            <span className="flex items-center gap-2">
              <User size={14} />
              IronOak Editorial
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white font-sans-condensed uppercase leading-[0.95] tracking-tight">
            {blog.title}
          </h1>

          <div className="prose prose-invert prose-accent max-w-none">
            <p className="text-white/80 text-xl font-normal leading-relaxed whitespace-pre-line first-letter:text-5xl first-letter:font-bold first-letter:text-accent first-letter:mr-3 first-letter:float-left">
              {blog.excerpt}
            </p>
            
            <div className="h-px w-full bg-white/10 my-12" />
            
            <div className="text-white/60 leading-relaxed space-y-6">
              <p>
                Sustainability is no longer just a buzzword; it's a fundamental pillar of modern infrastructure. At IronOak Power, we believe that energy independence is the cornerstone of a resilient future. Our latest research into solar technology highlights significant leaps in efficiency and storage capacity, making solar more viable than ever for a wider range of properties.
              </p>
              <p>
                From residential installations to massive commercial infrastructure, the transition to clean energy is accelerating. We are proud to be at the forefront of this change, providing the expertise and technology needed to build systems that are truly built to last.
              </p>
            </div>
          </div>

          <div className="pt-16 border-t border-white/5">
            <div className="bg-accent/10 p-10 rounded-[2.5rem] border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="text-center md:text-left">
                <p className="text-accent/70 text-lg font-bold uppercase tracking-widest leading-tight">Ready to see your savings?</p>
                <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mt-1">Free solar consultation included</p>
              </div>
              <button 
                onClick={() => {
                  handleClose();
                  setTimeout(() => {
                    const el = document.getElementById('calculator');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }, 500);
                }}
                className="bg-accent text-primary px-10 py-5 rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-white hover:scale-105 active:scale-95 transition-all shadow-xl shadow-accent/20"
              >
                Start Calculation
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
