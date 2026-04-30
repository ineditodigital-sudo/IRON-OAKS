import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http') || url.startsWith('data:') || url.startsWith('/')) return url;
  if (url.includes('uploads/')) return '/' + url.replace(/^\/+/, '');
  return url;
};

export default function BlogSection({ blogs, onReadMore }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 300;
    const currentScroll = scrollRef.current.scrollLeft;
    
    gsap.to(scrollRef.current, {
      scrollLeft: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-10 px-6 bg-white relative overflow-hidden scroll-mt-32">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
          <div className="max-w-xl">
            <h4 className="text-accent font-bold uppercase tracking-[0.3em] text-[8px] mb-1">Latest Insights</h4>
            <h2 className="text-dark text-3xl md:text-4xl font-bold uppercase font-sans-condensed leading-[0.9]">
              IronOak <span className="text-accent italic font-serif lowercase">Knowledge</span>
            </h2>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => scroll('left')}
              className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft size={14} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-8 h-8 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="min-w-[260px] md:min-w-[320px] max-w-[400px] bg-bg/30 rounded-[1.5rem] overflow-hidden group snap-start border border-dark/5 flex flex-col"
            >
              <div className="aspect-[21/9] overflow-hidden relative shrink-0">
                <img 
                  src={getImageUrl(blog.image) || 'https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=80&w=1000'} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              
              <div className="p-5 md:p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-[8px] text-dark/40 uppercase tracking-widest font-bold">
                    <span className="flex items-center gap-2">
                      <Calendar size={10} className="text-accent" />
                      {blog.date}
                    </span>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold font-sans-condensed group-hover:text-accent transition-colors leading-tight line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-dark/60 text-[10px] leading-relaxed line-clamp-2">
                    {blog.excerpt}
                  </p>
                </div>
                
                <button 
                  onClick={() => onReadMore(blog)}
                  className="mt-2 flex items-center gap-2 text-[8px] font-bold uppercase tracking-widest text-accent group-hover:gap-4 transition-all"
                >
                  Read Full Article
                  <ArrowRight size={10} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
