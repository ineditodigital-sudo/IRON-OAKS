import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ArrowRight, Calculator, CheckCircle2, RefreshCcw, X, Zap } from 'lucide-react';

export default function SolarCalculator() {
  const [isStarted, setIsStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    bill: '',
    name: '',
    phone: '',
    email: ''
  });
  const [results, setResults] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  
  const formRef = useRef(null);
  const stepRef = useRef(null);
  const inputRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    if (isStarted && overlayRef.current) {
      // Fade and scale in the entire overlay
      gsap.fromTo(overlayRef.current, 
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      // Animate the inner content with a rise and scale effect
      gsap.fromTo(formRef.current,
        { y: 60, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, delay: 0.1, ease: "power4.out" }
      );

      // Animate decorative background blobs
      gsap.fromTo(overlayRef.current.querySelectorAll('.blob'),
        { scale: 0.2, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5, stagger: 0.2, ease: "power2.out" }
      );
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted && inputRef.current) {
      inputRef.current.focus();
    }
  }, [step, isStarted]);

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

  const handleStart = () => {
    setIsStarted(true);
    // Optional: Request browser fullscreen (user must trigger this)
    try {
      if (document.documentElement.requestFullscreen) {
        // document.documentElement.requestFullscreen(); // Disabled by default for better UX, but can be enabled if user insists
      }
    } catch (e) { console.log(e); }
  };

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

  const handleBack = () => {
    if (step > 0) {
      gsap.to(stepRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.3,
        onComplete: () => {
          setStep(step - 1);
          gsap.fromTo(stepRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3 });
        }
      });
    }
  };

  const calculateResults = () => {
    setIsCalculating(true);
    
    gsap.to(stepRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      onComplete: () => {
        // Simulated calculation delay for better UX/feedback
        setTimeout(() => {
          const bill = parseFloat(formData.bill);
          const monthlyKWh = bill / 0.12;
          const systemSizeKW = monthlyKWh / 110; 
          const cost = systemSizeKW * 1000 * 2.50;
          const annualSaving = bill * 12 * 0.76;
          const lifetimeSaving = annualSaving * 30;

          setResults({
            cost: cost.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            annual: annualSaving.toLocaleString('en-US', { style: 'currency', currency: 'USD' }),
            lifetime: lifetimeSaving.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
          });

          setIsCalculating(false);
          setStep(steps.length);
          gsap.fromTo(stepRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        }, 3000);
      }
    });
  };

  const reset = () => {
    setStep(0);
    setFormData({ bill: '', name: '', phone: '', email: '' });
    setResults(null);
    setIsSubmitted(false);
    setIsSending(false);
    setIsCalculating(false);
  };

  const closeCalculator = () => {
    if (overlayRef.current) {
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIsStarted(false);
          reset();
        }
      });
      gsap.to(formRef.current, {
        y: 40,
        scale: 0.95,
        opacity: 0,
        duration: 0.4,
        ease: "power2.in"
      });
    } else {
      setIsStarted(false);
      reset();
    }
  };

  const handleBook = async () => {
    setIsSending(true);
    
    const payload = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      bill: formData.bill,
      cost: results.cost,
      annual: results.annual,
      lifetime: results.lifetime
    };

    try {
      // Add a minimum delay of 2.5s for the loading animation
      const [response] = await Promise.all([
        fetch('./send-email.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        }),
        new Promise(resolve => setTimeout(resolve, 2500))
      ]);

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      console.error('Error sending email:', error);
      alert('There was an error sending your request. Please try again later.');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <>
      {/* Entry Section */}
      <section id="calculator" className="relative py-24 px-6 bg-dark overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-[160px]" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-full mb-8">
            <Zap className="text-accent w-4 h-4 fill-accent" />
            <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest">Energy Savings Calculator</span>
          </div>
          
          <h2 className="text-white text-5xl md:text-7xl font-bold uppercase font-sans-condensed mb-8 leading-[0.9]">
            Calculate Your <br />
            <span className="text-accent italic font-serif lowercase">Solar Potential</span>
          </h2>
          
          <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-light">
            Discover how much you can save with IronOak Power in just 60 seconds. Our algorithm calculates system size, costs, and lifetime savings.
          </p>
          
          <button 
            onClick={handleStart}
            className="group relative inline-flex items-center gap-4 bg-accent text-primary px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 active:scale-95"
          >
            Start Calculation
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </button>
        </div>
      </section>

      {/* Fullscreen Overlay */}
      {isStarted && (
        <div 
          ref={overlayRef}
          className="fixed inset-0 z-[100] bg-primary flex items-center justify-center p-6 md:p-12 overflow-y-auto"
        >
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="blob absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-accent/10 rounded-full blur-[140px]" />
            <div className="blob absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[140px]" />
            <div className="absolute inset-0 bg-primary/20 backdrop-blur-[2px]" />
          </div>

          {/* Close Button */}
          <button 
            onClick={closeCalculator}
            className="fixed top-8 right-8 z-[110] bg-white/10 hover:bg-white/20 p-4 rounded-full text-white transition-all hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative z-10 w-full max-w-4xl" ref={formRef}>
            <div ref={stepRef}>
              {isCalculating ? (
                <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-accent/10 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-accent rounded-full animate-spin" />
                    <Zap className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-accent w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-white text-3xl md:text-5xl font-bold uppercase font-sans-condensed tracking-tight mb-4">
                    Calculating your <span className="text-accent">Potential</span>
                  </h2>
                  <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">Analyzing energy patterns...</p>
                </div>
              ) : isSending ? (
                <div className="flex flex-col items-center text-center animate-in fade-in duration-500">
                  <div className="relative w-20 h-20 md:w-24 md:h-24 mb-8">
                    <div className="absolute inset-0 border-4 border-white/5 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-white rounded-full animate-spin" />
                    <CheckCircle2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-8 h-8 animate-pulse" />
                  </div>
                  <h2 className="text-white text-3xl md:text-5xl font-bold uppercase font-sans-condensed tracking-tight mb-4">
                    Securing your <span className="text-accent">Savings</span>
                  </h2>
                  <p className="text-white/40 uppercase tracking-[0.3em] text-[10px]">Sending request to our team...</p>
                </div>
              ) : step < steps.length ? (
                <div className="flex flex-col items-center text-center">
                  <div className="mb-8 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <Calculator className="text-accent w-6 h-6" />
                    </div>
                    <span className="text-accent uppercase tracking-widest text-xs font-bold">Step {step + 1} of {steps.length}</span>
                  </div>

                  <h2 className="text-white text-3xl md:text-6xl font-bold mb-12 font-sans-condensed uppercase leading-tight tracking-tight">
                    {steps[step].question}
                  </h2>

                  <div className="w-full max-w-lg relative group">
                    {steps[step].prefix && (
                      <span className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 text-3xl font-bold">{steps[step].prefix}</span>
                    )}
                    <input
                      ref={inputRef}
                      type={steps[step].type}
                      value={formData[steps[step].id]}
                      onChange={(e) => setFormData({ ...formData, [steps[step].id]: e.target.value })}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder={steps[step].placeholder}
                      className={`
                        w-full bg-transparent border-b-2 border-white/20 text-white text-3xl md:text-5xl py-6 px-4 outline-none 
                        transition-all duration-300 focus:border-accent group-hover:border-white/40
                        ${steps[step].prefix ? 'pl-12' : ''}
                      `}
                    />
                  </div>

                  <div className="mt-16 flex items-center gap-4">
                    {step > 0 && (
                      <button
                        onClick={handleBack}
                        className="group flex items-center justify-center w-14 h-14 rounded-full border border-white/20 text-white transition-all hover:bg-white/10 active:scale-95"
                        title="Previous Question"
                      >
                        <ArrowRight className="w-6 h-6 rotate-180" />
                      </button>
                    )}
                    
                    <button
                      onClick={handleNext}
                      className="group flex items-center gap-6 bg-accent text-primary px-12 py-6 rounded-full font-bold uppercase tracking-widest text-sm transition-all hover:scale-105 hover:bg-white active:scale-95"
                    >
                      {step === steps.length - 1 ? "Get My Results" : "Continue"}
                      <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                    </button>
                  </div>

                  <p className="mt-8 text-white/20 text-xs uppercase tracking-[0.3em]">Press Enter to continue</p>
                </div>
              ) : isSubmitted ? (
                <div className="flex flex-col items-center text-center animate-in fade-in zoom-in duration-500">
                  <div className="mb-8 w-20 h-20 rounded-full bg-accent flex items-center justify-center shadow-lg shadow-accent/20">
                    <CheckCircle2 className="text-primary w-10 h-10" />
                  </div>
                  <h2 className="text-white text-3xl md:text-6xl font-bold mb-6 font-sans-condensed uppercase tracking-tight">
                    Request <span className="text-accent">Sent</span>
                  </h2>
                  <p className="text-white/60 text-lg md:text-xl mb-12 max-w-2xl font-light">
                    Your consultation request has been sent successfully. Our team will contact you soon to discuss your solar potential.
                  </p>
                  <div className="flex justify-center">
                    <button 
                      onClick={closeCalculator}
                      className="bg-accent text-primary px-16 py-5 rounded-full font-bold uppercase tracking-widest text-xs transition-all hover:bg-white hover:scale-105 shadow-xl shadow-accent/20"
                    >
                      Close Calculator
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
                  <div className="mb-4 w-12 h-12 md:w-20 md:h-20 rounded-full bg-accent/20 flex items-center justify-center">
                    <CheckCircle2 className="text-accent w-6 h-6 md:w-10 md:h-10" />
                  </div>
                  
                  <h2 className="text-white text-2xl md:text-6xl font-bold mb-2 md:mb-6 font-sans-condensed uppercase text-center leading-tight">
                    Your Energy <span className="text-accent">Independence</span>
                  </h2>
                  <p className="text-white/60 text-xs md:text-lg mb-6 md:mb-12 text-center max-w-2xl font-light">
                    Estimated savings for your ${formData.bill}/mo bill.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-6 w-full">
                    {[
                      { label: "System Cost", value: results.cost, desc: "Before incentives" },
                      { label: "Annual Savings", value: results.annual, desc: "Utility reduction" },
                      { label: "Lifetime Savings", value: results.lifetime, desc: "30-year projection" }
                    ].map((item, i) => (
                      <div key={i} className="bg-white/5 backdrop-blur-xl p-3 md:p-8 rounded-2xl border border-white/10 text-center flex flex-col md:block justify-center">
                        <span className="text-accent uppercase tracking-widest text-[8px] md:text-[10px] font-bold block mb-1 md:mb-4">{item.label}</span>
                        <div className="text-white text-xl md:text-4xl font-bold mb-1 md:mb-4 font-sans-condensed">{item.value}</div>
                        <p className="hidden md:block text-white/30 text-[10px] leading-relaxed uppercase tracking-wider">{item.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 md:mt-16 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <button 
                      onClick={handleBook}
                      disabled={isSending}
                      className="bg-accent text-primary px-8 md:px-16 py-4 md:py-6 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:bg-white hover:scale-105 shadow-xl shadow-accent/20 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Book Free Consultation
                    </button>
                    <button 
                      onClick={reset}
                      className="flex items-center justify-center gap-3 text-white/50 border border-white/10 px-8 md:px-16 py-4 md:py-6 rounded-full font-bold uppercase tracking-widest text-[10px] md:text-xs transition-all hover:bg-white/5 hover:text-white"
                    >
                      <RefreshCcw className="w-4 h-4" />
                      Recalculate
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
