import type { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string | null;
  hint?: string;
  children: ReactNode;
}

export default function FormField({ label, htmlFor, error, hint, children }: FormFieldProps) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={htmlFor} className="block text-sm font-semibold text-stone-800">
        {label}
      </label>
      {children}
      {error ? (
        <p role="alert" className="text-sm text-ember-700">
          {error}
        </p>
      ) : hint ? (
        <p className="text-xs leading-normal text-stone-500">{hint}</p>
      ) : null}
    </div>
  );
}
