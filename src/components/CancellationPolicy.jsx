import { X } from 'lucide-react';

export default function CancellationPolicy({ onClose }) {
  return (
    <div className="fixed inset-0 z-[100] bg-primary overflow-y-auto pt-32 pb-24 px-6 md:px-20">
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] bg-white/10 p-4 rounded-full text-white hover:bg-white/20 transition-all"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="max-w-4xl mx-auto text-white/80 font-light leading-relaxed">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 font-sans-condensed uppercase">Service Cancellation Policy</h1>
        <p className="text-accent font-bold mb-12">Last updated: August 26, 2025</p>

        <section className="mb-12">
          <p className="mb-6">
            This Service Cancellation Policy explains how you can cancel a solar or energy services project with Iron Oak Power Inc. and what fees may apply. It applies in addition to any non-waivable cancellation rights you may have under consumer protection laws.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">1) How to cancel</h2>
          <p>
            To cancel, send written notice to <span className="text-accent">info@ironoakpower.com</span> or mail your notice to 51 Curtis St, Picton, ON K0K 2T0. Include your name, service address, and project number. Your cancellation is effective when we receive your notice.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">3) Iron Oak Power voluntary cooling off period</h2>
          <p>
            In addition to any statutory rights, we offer a voluntary cooling off period of <span className="text-white font-bold">2 calendar days</span> starting on the date you sign the Proposal. If you cancel within this period and before we have incurred third party costs, we will refund your deposit in full.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">4) Cancellation stages and fees</h2>
          <div className="space-y-6">
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-accent font-bold mb-2 uppercase text-xs tracking-widest">A) Before site audit</h3>
              <p className="text-white">Fee: $0. Full refund of deposit, less any authorized third party costs.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-accent font-bold mb-2 uppercase text-xs tracking-widest">B) After site audit / engineering starts</h3>
              <p className="text-white">Fee: Lesser of 10% of project price or actual time and materials incurred.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-accent font-bold mb-2 uppercase text-xs tracking-widest">C) After permit submission</h3>
              <p className="text-white">Fee: Actual time and materials, plus non-refundable fees and a $500 administrative fee.</p>
            </div>
            <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
              <h3 className="text-accent font-bold mb-2 uppercase text-xs tracking-widest">D) After materials are procured</h3>
              <p className="text-white">Fee: All costs above, plus restocking fees, freight, and storage.</p>
            </div>
          </div>
          <p className="mt-8 text-sm opacity-60 italic">
            Refunds are processed to the original payment method within 10 business days after finalization of charges.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 uppercase font-sans-condensed">5) Rescheduling</h2>
          <p>
            If you want to reschedule installation, notify us at least <span className="text-white font-bold">30 business days</span> before your scheduled date. We will accommodate changes subject to availability. Short notice rescheduling may incur a fee.
          </p>
        </section>

        <section className="border-t border-white/10 pt-12 text-sm opacity-50">
          <p>Email: info@ironoakpower.com</p>
          <p>Phone: (613) 922-1093</p>
          <p>Mail: 51 Curtis St, Picton, ON K0K 2T0 Canada</p>
        </section>
      </div>
    </div>
  );
}
