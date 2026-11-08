import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  hint: string;
  icon: LucideIcon;
  tone: 'brand' | 'sun' | 'ocean' | 'ember';
}

const TONE_CLASSES: Record<StatCardProps['tone'], { chip: string; accent: string }> = {
  brand: { chip: 'bg-brand-100 text-brand-800', accent: 'bg-brand-600' },
  sun: { chip: 'bg-sun-100 text-sun-900', accent: 'bg-sun-400' },
  ocean: { chip: 'bg-ocean-100 text-ocean-900', accent: 'bg-ocean-500' },
  ember: { chip: 'bg-ember-100 text-ember-900', accent: 'bg-ember-600' },
};

export default function StatCard({ label, value, hint, icon: Icon, tone }: StatCardProps) {
  const classes = TONE_CLASSES[tone];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <span className={`absolute inset-x-0 top-0 h-1 ${classes.accent}`} aria-hidden="true" />
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-stone-600">{label}</p>
          <p className="text-3xl font-extrabold leading-[1.15] text-stone-900">{value}</p>
        </div>
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${classes.chip}`}>
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <p className="mt-3 text-xs leading-normal text-stone-500">{hint}</p>
    </div>
  );
}
