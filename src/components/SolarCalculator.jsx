import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Calculator, CheckCircle2, RefreshCcw } from 'lucide-react';

export default function SolarCalculator() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    bill: '',
    name: '',
    phone: '',
    email: ''
  });
  const [results, setResults] = useState(null);
  
  const formRef = useRef(null);
  const stepRef = useRef(null);

  const steps = [
    {
      id: 'bill',
      question: "What is your monthly electricity bill?",
      type: 'number',
      placeholder: "e.g., 150",
      prefix: "$",
      required: true
    },
    {
      id: 'name',
      question: "What is your name?",
      type: 'text',
      placeholder: "Your full name",
      required: true
    },
    {
      id: 'phone',
      question: "What is your phone number?",
      type: 'tel',
      placeholder: "e.g., +1 234 567 890",
      required: false
    },
    {
      id: 'email',
      question: "What is your email address?",
      type: 'email',
      placeholder: "name@example.com",
      required: true
    }
  ];

  const handleNext = () => {
    const currentStep = steps[step];
    if (currentStep.required && !formData[currentStep.id]) {
      gsap.to(stepRef.current, { x: 10, duration: 0.1, repeat: 3, yoyo: true });
      return;
    }

    if (step < steps.length - 1) {
      gsap.to(stepRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.3,
        onComplete: () => {
          setStep(step + 1);
          gsap.fromTo(stepRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 });
        }
      });
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const bill = parseFloat(formData.bill);
    const monthlyKWh = bill / 0.12;
    const systemSizeKW = monthlyKWh / 110; // Approx 110kWh/month per kW
    const cost = systemSizeKW * 1000 * 2.50;
    const annualSaving = bill * 12 * 0.76;
    const lifetimeSaving = annualSaving * 30;

    setResults({
      cost: cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      annual: annualSaving.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
      lifetime: lifetimeSaving.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    });

    gsap.to(stepRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        setStep(steps.length);
        gsap.fromTo(stepRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
      }
    });
  };

  const reset = () => {
    setStep(0);
    setFormData({ bill: '', name: '', phone: '', email: '' });
    setResults(null);
  };

  return (
    <section id="calculator" className="relative min-h-[70vh] bg-primary flex items-center justify-center py-16 px-6 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-4xl" ref={formRef}>
        <div ref={stepRef}>
          {step < steps.length ? (
            <div className="flex flex-col items-center text-center">
              <div className="mb-8 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                  <Calculator className="text-accent w-5 h-5" />
                </div>
                <span className="text-accent uppercase tracking-widest text-[10px] font-bold">Step {step + 1} of {steps.length}</span>
              </div>

              <h2 className="text-white text-2xl md:text-4xl font-bold mb-8 font-sans-condensed uppercase leading-tight">
                {steps[step].question}
              </h2>

              <div className="w-full max-w-md relative group">
                {steps[step].prefix && (
                  <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 text-xl font-bold">{steps[step].prefix}</span>
                )}
                <input
                  type={steps[step].type}
                  value={formData[steps[step].id]}
                  onChange={(e) => setFormData({ ...formData, [steps[step].id]: e.target.value })}
                  onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                  placeholder={steps[step].placeholder}
                  autoFocus
                  className={`
                    w-full bg-white/5 border-b-2 border-white/20 text-white text-xl md:text-2xl py-3 px-6 outline-none 
                    transition-all duration-300 focus:border-accent group-hover:border-white/40
                    ${steps[step].prefix ? 'pl-12' : ''}
                  `}
                />
              </div>

              <button
                onClick={handleNext}
                className="mt-12 group flex items-center gap-4 bg-accent text-primary px-8 py-4 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:scale-105 hover:bg-white active:scale-95"
              >
                {step === steps.length - 1 ? "Get Your Quote" : "Next Question"}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-white/30 text-[10px] uppercase tracking-widest">Press Enter ↵</p>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <div className="mb-8 w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center animate-pulse">
                <CheckCircle2 className="text-accent w-8 h-8" />
              </div>
              
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 font-sans-condensed uppercase text-center">
                Your Energy <span className="text-accent">Independence</span>
              </h2>
              <p className="text-white/60 text-base md:text-lg mb-12 text-center max-w-2xl font-light">
                Based on your monthly bill of ${formData.bill}, here are your estimated potential savings with IronOak Power.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
                {[
                  { label: "Estimated System Cost", value: results.cost, desc: "Total investment before incentives" },
                  { label: "Annual Savings", value: results.annual, desc: "Estimated reduction in utility bills" },
                  { label: "Lifetime Savings", value: results.lifetime, desc: "Projected 30-year energy savings" }
                ].map((item, i) => (
                  <div key={i} className="bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10 text-center group hover:bg-white/10 transition-colors duration-500">
                    <span className="text-accent uppercase tracking-widest text-[10px] font-bold block mb-4">{item.label}</span>
                    <div className="text-white text-3xl md:text-4xl font-bold mb-4 font-sans-condensed">{item.value}</div>
                    <p className="text-white/30 text-xs leading-relaxed uppercase">{item.desc}</p>
                  </div>
                ))}
              </div>

              <div className="mt-16 flex flex-col md:flex-row gap-6">
                <button className="bg-accent text-primary px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-white hover:scale-105">
                  Book a Consultation
                </button>
                <button 
                  onClick={reset}
                  className="flex items-center gap-3 text-white/50 border border-white/10 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-white/5 hover:text-white"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Recalculate
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
