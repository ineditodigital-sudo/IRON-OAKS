import { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { gsap } from 'gsap';

export default function TermsOfService({ onClose }) {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.4 })
      .fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, "-=0.2");

    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleClose = () => {
    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(contentRef.current, { y: 30, opacity: 0, duration: 0.3 })
      .to(modalRef.current, { opacity: 0, duration: 0.3 }, "-=0.1");
  };

  return (
    <div 
      ref={modalRef}
      className="fixed inset-0 z-[100] bg-primary overflow-y-auto pt-32 pb-24 px-6 md:px-20"
    >
      <button 
        onClick={handleClose}
        className="fixed top-8 right-8 z-[110] bg-white/10 p-4 rounded-full text-white hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div ref={contentRef} className="max-w-4xl mx-auto text-white/80 font-light leading-relaxed">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans-condensed uppercase">Terms of Service</h1>
        <p className="text-accent font-bold mb-12">Last updated: August 26, 2025</p>

        <section className="mb-12">
          <p className="mb-6">
            These Terms of Service govern your use of ironoakpower.com and your purchase of solar and related energy services from Iron Oak Power Inc. (“Iron Oak Power,” “we,” “us,” or “our”). By using our website, requesting a quote, signing a proposal, or receiving services from us, you agree to these Terms.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">1) Who we are and how to contact us</h2>
          <div className="space-y-2 bg-white/5 p-6 rounded-2xl border border-white/10 text-sm">
            <p><span className="text-accent font-bold">Legal name:</span> Iron Oak Power Inc.</p>
            <p><span className="text-accent font-bold">Website:</span> https://www.ironoakpower.com</p>
            <p><span className="text-accent font-bold">Email:</span> info@ironoakpower.com</p>
            <p><span className="text-accent font-bold">Phone:</span> (613) 503-0127</p>
            <p><span className="text-accent font-bold">Mailing address:</span> 51 Curtis St, Picton, ON K0K 2T0 Canada</p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">2) Scope of services</h2>
          <p>We provide consultation, design, permitting, equipment procurement, installation, interconnection support, monitoring setup, and maintenance for residential and commercial solar and related energy systems. The specific services for your project will be described in a written Proposal or Statement of Work that includes scope, pricing, and schedule assumptions.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">3) Quotes and proposals</h2>
          <ul className="list-disc pl-6 space-y-4 opacity-80">
            <li>Quotes are estimates based on information available at the time. They are valid for the period stated on the quote.</li>
            <li>Proposals become binding only when signed by you and accepted by us in writing.</li>
            <li>Production estimates, savings calculations, and payback timelines are projections. Actual results vary due to weather, shading, equipment performance, utility rates, and your energy usage.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">4) Site access and customer responsibilities</h2>
          <p>You agree to provide safe access to the property for site assessment, installation, inspections, and service. You represent that you own the property or have authority to authorize the work. You are responsible for clearing work areas and for protecting pets, valuables, and fragile items.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">8) Payments and deposits</h2>
          <p className="mb-4">A deposit of 25% or may be required upon signing. Progress payments may be tied to milestones such as materials procurement, substantial completion, and final commissioning.</p>
          <p>Invoices are due upon receipt unless stated otherwise. Late amounts may accrue interest at 1.5% per month or the maximum allowed by law, whichever is lower.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">14) Warranties</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-white font-bold mb-2">Manufacturer Warranties</h3>
              <p>Manufacturer warranties apply to the equipment you purchase. We will pass through any available manufacturer warranties and provide documentation at or after installation.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-2">Workmanship Warranty</h3>
              <p>We warrant our installation workmanship for 1 year from substantial completion. We will correct defects in our workmanship at no additional charge within the warranty period. This warranty excludes normal wear, misuse, accidents, acts of nature, and modifications by others.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">19) Disclaimer and limitation of liability</h2>
          <p>To the maximum extent permitted by law, we are not liable for indirect, incidental, special, exemplary, or consequential damages including lost savings or lost profits. Our total liability for any claim arising out of the agreement or the services will not exceed the amounts you paid to us for the specific project giving rise to the claim.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">23) Governing law and venue</h2>
          <p>For projects located in Canada, these Terms are governed by the laws of the province and country where the project is located. For projects located in the United States, these Terms are governed by the laws of the state where the project is located.</p>
        </section>

        <section className="border-t border-white/10 pt-12 text-sm opacity-50">
          <p>Email: info@ironoakpower.com</p>
          <p>Phone: (613) 503-0127</p>
          <p>Mail: 51 Curtis St, Picton, ON K0K 2T0 Canada</p>
        </section>
      </div>
    </div>
  );
}
