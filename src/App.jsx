import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ContentProvider, useContent } from './context/ContentContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SolarCalculator from './components/SolarCalculator';
import About from './components/About';
import Partners from './components/Partners';
import BlogSection from './components/BlogSection';
import BlogModal from './components/BlogModal';
import Footer from './components/Footer';
import AdminLogin from './components/AdminLogin';
import AdminPanel from './components/AdminPanel';

import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CancellationPolicy from './components/CancellationPolicy';

gsap.registerPlugin(ScrollTrigger);

function MainSite() {
  const { content, loading } = useContent();
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (loading || !content) return;

    let ctx = gsap.context(() => {
      const sections = document.querySelectorAll('section');
      sections.forEach(section => {
        gsap.from(section, {
          opacity: 0,
          y: 50,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        });
      });
    });

    return () => ctx.revert();
  }, [loading, content]);

  if (loading || !content) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-accent font-bold uppercase tracking-[0.5em] animate-pulse">IronOak Power</div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{content.seo.title}</title>
        <meta name="description" content={content.seo.description} />
        <meta name="keywords" content={content.seo.keywords} />
        <meta property="og:title" content={content.seo.title} />
        <meta property="og:description" content={content.seo.description} />
        <meta property="og:image" content={content.seo.ogImage} />
      </Helmet>

      <Navbar />
      <Hero data={content.hero} />
      <Services data={content.services} />
      <SolarCalculator />
      <About data={content.about} />
      <Partners />
      <BlogSection blogs={content.blogs} onReadMore={(blog) => setSelectedBlog(blog)} />
      <Footer 
        data={content.footer}
        onPrivacyClick={() => setShowPrivacy(true)} 
        onTermsClick={() => setShowTerms(true)}
        onCancellationClick={() => setShowCancellation(true)}
      />

      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showCancellation && <CancellationPolicy onClose={() => setShowCancellation(false)} />}
    </>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ContentProvider>
        <Router>
          <Routes>
            <Route path="/" element={<MainSite />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminPanel />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </ContentProvider>
    </HelmetProvider>
  );
}

export default App;
