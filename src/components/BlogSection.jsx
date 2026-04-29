import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, ArrowRight, Calendar, User } from 'lucide-react';

export default function BlogSection({ blogs }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const scrollAmount = 400;
    const currentScroll = scrollRef.current.scrollLeft;
    
    gsap.to(scrollRef.current, {
      scrollLeft: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
      duration: 0.8,
      ease: "power2.out"
    });
  };

  if (!blogs || blogs.length === 0) return null;

  return (
    <section id="blog" className="py-24 px-6 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <h4 className="text-accent font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Latest Insights</h4>
            <h2 className="text-dark text-5xl md:text-7xl font-bold uppercase font-sans-condensed leading-[0.9]">
              IronOak <span className="text-accent italic font-serif lowercase">Knowledge</span>
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => scroll('left')}
              className="w-14 h-14 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowLeft size={20} />
            </button>
            <button 
              onClick={() => scroll('right')}
              className="w-14 h-14 rounded-full border border-dark/10 flex items-center justify-center text-dark hover:bg-dark hover:text-white transition-all active:scale-90"
            >
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-12 hide-scrollbar snap-x"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {blogs.map((blog) => (
            <article 
              key={blog.id} 
              className="min-w-[300px] md:min-w-[450px] bg-bg/30 rounded-[2.5rem] overflow-hidden group snap-start border border-dark/5"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <img 
                  src={blog.image || 'https://images.unsplash.com/photo-1509391366360-fe5bb60213ad?q=80&w=1000'} 
                  alt={blog.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-6 left-6 bg-accent text-primary text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
                  Update
                </div>
              </div>
              
              <div className="p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-6 text-[10px] text-dark/40 uppercase tracking-widest font-bold">
                  <span className="flex items-center gap-2">
                    <Calendar size={12} className="text-accent" />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <User size={12} className="text-accent" />
                    By IronOak
                  </span>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold font-sans-condensed group-hover:text-accent transition-colors leading-tight">
                  {blog.title}
                </h3>
                
                <p className="text-dark/60 text-sm leading-relaxed line-clamp-3">
                  {blog.excerpt}
                </p>
                
                <button className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-accent group-hover:gap-6 transition-all">
                  Read Full Article
                  <ArrowRight size={14} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
