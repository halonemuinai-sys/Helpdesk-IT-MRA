'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormError } from '@/components/PageShared';
import { KeyRound, Mail, Loader2 } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Mohon isi email dan password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login gagal.');
      }

      const userRole = data.user.role;
      if (userRole === 'staff') {
        router.push('/input');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo/10 rounded-full blur-3xl" />
      </div>

      <div className="card max-w-md w-full relative z-10 p-8 md:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-2xl backdrop-blur-md bg-white/80 dark:bg-slate-900/80">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-blue-light text-blue dark:bg-blue/10 dark:text-blue rounded-2xl flex items-center justify-center font-black text-lg mx-auto mb-4">
            M
          </div>
          <h1 className="text-2xl font-black text-slate-800 dark:text-slate-100 leading-tight">
            MRA IT Helpdesk
          </h1>
          <p className="text-sm text-text-2 mt-1.5">
            Sign in to access the ticketing dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormError msg={errorMsg} />

          <div>
            <label className="form-label" htmlFor="email-input">Email Address</label>
            <div className="relative flex items-center">
              <Mail className="absolute left-3 w-4 h-4 text-text-3" />
              <input
                id="email-input"
                type="email"
                placeholder="name@mra.co.id"
                className="input-premium pl-10"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="form-label" htmlFor="password-input">Password</label>
            <div className="relative flex items-center">
              <KeyRound className="absolute left-3 w-4 h-4 text-text-3" />
              <input
                id="password-input"
                type="password"
                placeholder="••••••••"
                className="input-premium pl-10"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 bg-blue hover:bg-blue-d text-white font-bold text-sm rounded-xl shadow-lg shadow-blue/20 transition-all flex justify-center items-center gap-2 mt-2"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="text-center mt-6 text-xxs text-text-3">
          Demo: admin@mra.co.id (admin123) / support@mra.co.id (support123)
        </div>
      </div>
    </div>
  );
}
