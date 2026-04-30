import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/cms.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', password })
      });

      if (!response.ok) {
        const text = await response.text();
        console.error('Server response not OK:', text);
        setError(`Server error: ${response.status}`);
        return;
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        navigate('/admin/dashboard');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError('Connection error - check console');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-3/4 h-3/4 bg-accent/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-1/4 -left-1/4 w-3/4 h-3/4 bg-accent/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-[#1A1A1A] rounded-[2.5rem] p-8 md:p-12 border border-white/5 shadow-2xl">
          <div className="flex flex-col items-center text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mb-6">
              <ShieldCheck className="text-accent w-8 h-8" />
            </div>
            <h1 className="text-white text-3xl font-bold uppercase font-sans-condensed tracking-tight">Admin <span className="text-accent">Portal</span></h1>
            <p className="text-white/40 text-xs uppercase tracking-widest mt-2">IronOak Power Infrastructure</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-accent transition-colors w-5 h-5" />
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access Password"
                className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-accent transition-all"
                required
              />
            </div>

            {error && (
              <p className="text-red-400 text-xs text-center uppercase tracking-wider font-bold animate-pulse">{error}</p>
            )}

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent text-primary py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {isLoading ? 'Verifying...' : 'Access Dashboard'}
              {!isLoading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>

          <div className="mt-12 pt-8 border-t border-white/5 text-center">
            <p className="text-white/20 text-[10px] uppercase tracking-[0.3em]">Authorized Personnel Only</p>
          </div>
        </div>
      </div>
    </div>
  );
}
