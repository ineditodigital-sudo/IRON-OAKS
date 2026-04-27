import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import SolarCalculator from './components/SolarCalculator';
import About from './components/About';
import Partners from './components/Partners';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CancellationPolicy from './components/CancellationPolicy';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showCancellation, setShowCancellation] = useState(false);

  useEffect(() => {
    // Global GSAP Context
    let ctx = gsap.context(() => {
      // Global section reveals
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
  }, []);

  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <Services />
      <SolarCalculator />
      <About />
      <Partners />
      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)} 
        onTermsClick={() => setShowTerms(true)}
        onCancellationClick={() => setShowCancellation(true)}
      />

      {showPrivacy && <PrivacyPolicy onClose={() => setShowPrivacy(false)} />}
      {showTerms && <TermsOfService onClose={() => setShowTerms(false)} />}
      {showCancellation && <CancellationPolicy onClose={() => setShowCancellation(false)} />}
    </main>
  );
}

export default App;
