import { Eye, EyeOff, LockKeyhole, Loader2 } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import { supabase } from '@/lib/supabase';
import { inputClassName, primaryButtonClassName } from '@/lib/styles';

type Mode = 'signin' | 'signup';

function describeAuthError(message: string): string {
  if (message.includes('Invalid login credentials')) {
    return 'That email and password do not match. Please try again.';
  }
  if (message.includes('already registered')) {
    return 'An account with this email already exists. Sign in instead.';
  }
  if (message.includes('at least')) {
    return 'Your password must be at least 6 characters.';
  }
  return 'Something went wrong. Check your connection and try again.';
}

export default function OwnerSignIn() {
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const switchMode = (next: Mode) => {
    setMode(next);
    setError(null);
    setNotice(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError('Enter your email and password.');
      return;
    }

    setSubmitting(true);
    setError(null);
    setNotice(null);

    if (mode === 'signin') {
      const { error: signInError } = await supabase.auth.signInWithPassword({ email: trimmedEmail, password });
      if (signInError) setError(describeAuthError(signInError.message));
    } else {
      const { data, error: signUpError } = await supabase.auth.signUp({ email: trimmedEmail, password });
      if (signUpError) {
        setError(describeAuthError(signUpError.message));
      } else if (!data.session) {
        setNotice('Account created. Sign in with your email and password to open the dashboard.');
        setMode('signin');
        setPassword('');
      }
    }

    setSubmitting(false);
  };

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:px-6">
      <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-lg">
        <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-800 text-white">
          <LockKeyhole className="h-7 w-7" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold leading-[1.2] text-stone-900">Owner Dashboard</h1>
        <p className="mt-2 text-sm leading-normal text-stone-600">
          Sign in to see platform growth. Only the owner account can view member details.
        </p>

        <div className="mt-6 grid grid-cols-2 rounded-xl bg-stone-100 p-1" role="tablist">
          {(['signin', 'signup'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={mode === tab}
              onClick={() => switchMode(tab)}
              className={`rounded-lg py-2 text-sm font-semibold transition ${
                mode === tab ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab === 'signin' ? 'Sign in' : 'Create account'}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="space-y-1.5">
            <label htmlFor="owner-email" className="block text-sm font-semibold text-stone-800">
              Email
            </label>
            <input
              id="owner-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={inputClassName}
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="owner-password" className="block text-sm font-semibold text-stone-800">
              Password
            </label>
            <div className="relative">
              <input
                id="owner-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`${inputClassName} pr-12`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-800"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          {notice && <p className="rounded-xl bg-brand-50 px-4 py-3 text-sm text-brand-900">{notice}</p>}
          {error && (
            <p role="alert" className="rounded-xl bg-ember-50 px-4 py-3 text-sm text-ember-800">
              {error}
            </p>
          )}

          <button type="submit" disabled={submitting} className={`${primaryButtonClassName} w-full`}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
            {mode === 'signin' ? 'Sign in' : 'Create owner account'}
          </button>
        </form>
      </div>
    </div>
  );
}
