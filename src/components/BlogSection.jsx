import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  return '/' + url;
};

export default function BlogSection({ blogs, onReadMore }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 350;
    const currentScroll = scrollRef.current.scrollLeft;
    
    gsap.to(scrollRef.current, {
      scrollLeft: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-16 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-xl">
            <h4 className="text-accent font-bold uppercase tracking-[0.3em] text-[8px] mb-2">Latest Insights</h4>
            <h2 className="text-dark text-4xl md:text-5xl font-bold uppercase font-sans-condensed leading-[0.9]">
              IronOak <span className="text-accent italic font-serif lowercase">Knowledge</span>
            </h2>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft size={16} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-10 h-10 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-8 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="min-w-[280px] md:min-w-[380px] bg-bg/30 rounded-[2rem] overflow-hidden group snap-start border border-dark/5"
            >
              <div className="aspect-[16/9] overflow-hidden relative">
                <img 
                  src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=80&w=1000'} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-6 md:p-8 space-y-4">
                <div className="flex items-center gap-4 text-[9px] text-dark/40 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-2">
                    <Calendar size={10} className="text-accent" />
                    {blog.date}
                  </span>
                </div>
                
                <h3 className="text-xl md:text-2xl font-bold font-sans-condensed group-hover:text-accent transition-colors leading-tight line-clamp-2">
                  {blog.title}
                </h3>
                
                <p className="text-dark/60 text-xs leading-relaxed line-clamp-2">
                  {blog.excerpt}
                </p>
                
                <button 
                  onClick={() => onReadMore(blog)}
                  className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-widest text-accent group-hover:gap-5 transition-all"
                >
                  Read Full Article
                  <ArrowRight size={12} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
