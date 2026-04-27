import { X } from 'lucide-react';

export default function PrivacyPolicy({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-primary overflow-y-auto pt-32 pb-24 px-6 md:px-20">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] bg-white/10 p-4 rounded-full text-white hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto text-white/80 font-light leading-relaxed">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans-condensed uppercase">Privacy Policy</h1>
        <p className="text-accent font-bold mb-12">Last updated: August 26, 2025</p>

        <section className="mb-12">
          <p className="mb-6">
            This Privacy Policy explains how IronOak Power Inc. (“IronOak Power,” “we,” “us,” or “our”) collects, uses, discloses, and protects personal information when you visit ironoakpower.com, contact us, request a quote, or use our residential and commercial solar and energy services across Canada and the United States.
          </p>
          <p className="mb-6 italic">By using our website or services, you agree to this Privacy Policy.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">1. Who we are and how to contact us</h2>
          <div className="space-y-2 bg-white/5 p-6 rounded-2xl border border-white/10">
            <p><span className="text-accent font-bold">Controller:</span> IronOak Power Inc.</p>
            <p><span className="text-accent font-bold">Website:</span> https://www.ironoakpower.com</p>
            <p><span className="text-accent font-bold">Email:</span> info@ironoakpower.com</p>
            <p><span className="text-accent font-bold">Mailing address:</span> 51 Curtis St, Picton, ON K0K 2T0 Canada</p>
          </div>
          <p className="mt-6 text-sm">You may contact us using the details above for any privacy questions or to exercise your rights described below.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">2. Scope and jurisdictions</h2>
          <p>
            This Policy covers personal information collected in Canada and the United States. We aim to meet or exceed the requirements of Canada’s federal Personal Information Protection and Electronic Documents Act (PIPEDA) and substantially similar provincial laws where they apply, and the major US state privacy laws governing consumer data. Where local laws impose stricter requirements, we will comply with those requirements.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">3. Information we collect</h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-white font-bold mb-4 border-l-2 border-accent pl-4">Information you provide to us</h3>
              <ul className="list-disc pl-6 space-y-2 opacity-80">
                <li><span className="font-bold">Identity and contact details:</span> name, email, phone number, address, service location, preferred contact method.</li>
                <li><span className="font-bold">Project and property information:</span> roof type, photos or video of property and meter, shade and structural details, utility provider, utility account information required for interconnection, historical usage if you provide it, access instructions.</li>
                <li><span className="font-bold">Pre-qualification and financing:</span> information needed to determine eligibility for financing or incentives, including income range or credit-related information that you provide.</li>
                <li><span className="font-bold">Communications:</span> inquiries, quote requests, emails, calls, texts, meeting notes, survey responses, testimonials, and reviews.</li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 border-l-2 border-accent pl-4">Information collected automatically</h3>
              <p>Device and usage data: IP address, browser type, device identifiers, pages visited, time on site, referring pages. Cookies and similar technologies: session cookies, analytics, advertising and social pixels.</p>
            </div>
            <div>
              <h3 className="text-white font-bold mb-4 border-l-2 border-accent pl-4">Information from third parties</h3>
              <p>Lead sources and partners, financing and incentive partners, and marketing and analytics providers.</p>
            </div>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">4. How we use personal information</h2>
          <p className="mb-4">We collect and use personal information to:</p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li>Provide and manage services: consult, design, permit, finance, install, interconnect, monitor, and service solar and related energy systems.</li>
            <li>Prepare quotes and proposals: assess site conditions, energy usage, savings potential, incentives, and eligibility.</li>
            <li>Coordinate with third parties: utilities, AHJs, permitting offices, rebate programs, and financing partners.</li>
            <li>Communicate with you: respond to inquiries, schedule assessments, send project updates, and invoices.</li>
            <li>Improve our website and services: analytics, troubleshooting, and quality assurance.</li>
            <li>Marketing and remarketing: show or measure ads and promotions, subject to your choices.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">5. Disclosures and categories of recipients</h2>
          <p className="mb-4">We disclose personal information to:</p>
          <ul className="list-disc pl-6 space-y-2 opacity-80">
            <li>Installers, subcontractors, and suppliers.</li>
            <li>Utilities, permitting authorities, and government incentive programs.</li>
            <li>Financing partners and lenders.</li>
            <li>Service providers and processors (hosting, CRM, communications, analytics).</li>
            <li>Professional advisors and business transfers.</li>
            <li>Law enforcement or regulators when required by law.</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">6. Cookies and targeted advertising</h2>
          <p>We use cookies, pixels, and similar technologies for functionality, analytics, and advertising. You can control cookies through browser settings. We follow CASL in Canada and US CAN-SPAM/TCPA requirements.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">9. Retention</h2>
          <p>We retain personal information only as long as necessary to fulfill the purposes described and to meet legal, accounting, or reporting requirements. When no longer required, we securely delete or anonymize it.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">10. Security</h2>
          <p>We use administrative, technical, and physical safeguards appropriate to the sensitivity of the information. No method of transmission or storage is fully secure.</p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">11. Your rights</h2>
          <p className="mb-4"><span className="text-accent font-bold">Canada:</span> Request access, correction, or withdraw consent. Contact our Privacy Officer.</p>
          <p><span className="text-accent font-bold">United States:</span> Know and access, correct, delete, or opt-out of sale/sharing for targeted advertising depending on your state of residence.</p>
        </section>

        <section className="border-t border-white/10 pt-12 text-sm opacity-50">
          <p>Email: info@ironoakpower.com</p>
          <p>Mail: 51 Curtis St, Picton, ON K0K 2T0 Canada</p>
        </section>
      </div>
    </div>
  );
}
