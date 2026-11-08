import { BadgeCheck, CheckCircle2, Smartphone, Store, Users } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import FormField from '@/components/FormField';
import { MEMBERSHIP_FEE_MWK, type MobileMoneyProvider } from '@/lib/constants';
import { formatMwk } from '@/lib/format';
import { supabase } from '@/lib/supabase';
import { inputClassName, primaryButtonClassName } from '@/lib/styles';
import { validatePhone, validateRequiredText } from '@/lib/validation';
import { saveVerifiedPlug } from '@/lib/verification';

interface RegistrationForm {
  fullName: string;
  neighborhood: string;
  provider: MobileMoneyProvider | '';
  phone: string;
}

type FormErrors = Partial<Record<keyof RegistrationForm, string>>;

const BENEFITS = [
  { icon: BadgeCheck, text: 'Your listings carry the Verified Plug badge, so buyers know you are a registered seller.' },
  { icon: Users, text: 'Get seen by buyers across every Lilongwe hub, not just your own neighborhood.' },
  { icon: Store, text: 'Post as many listings as you need, with photos and direct WhatsApp contact.' },
];

const PROVIDER_OPTIONS: { value: MobileMoneyProvider; tagline: string }[] = [
  { value: 'Airtel Money', tagline: 'Pay with your Airtel line' },
  { value: 'TNM Mpamba', tagline: 'Pay with your TNM line' },
];

const EMPTY_FORM: RegistrationForm = { fullName: '', neighborhood: '', provider: '', phone: '' };

function validateForm(form: RegistrationForm): FormErrors {
  const errors: FormErrors = {};
  const nameError = validateRequiredText(form.fullName, 2, 100, 'Full name');
  if (nameError) errors.fullName = nameError;
  const neighborhoodError = validateRequiredText(form.neighborhood, 2, 100, 'Neighborhood');
  if (neighborhoodError) errors.neighborhood = neighborhoodError;
  if (!form.provider) errors.provider = 'Choose Airtel Money or TNM Mpamba.';
  const phoneError = validatePhone(form.phone);
  if (phoneError) errors.phone = phoneError;
  return errors;
}

export default function MembershipRegistration() {
  const [form, setForm] = useState<RegistrationForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [registeredName, setRegisteredName] = useState<string | null>(null);

  const updateField = <K extends keyof RegistrationForm>(key: K, value: RegistrationForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !form.provider) return;

    setSubmitting(true);
    setSubmitError(null);
    const fullName = form.fullName.trim();
    const { error } = await supabase.from('members').insert({
      full_name: fullName,
      neighborhood: form.neighborhood.trim(),
      provider: form.provider,
      phone: form.phone.trim(),
      status: 'Verified',
      fee_mwk: MEMBERSHIP_FEE_MWK,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError('We could not save your registration. Check your connection and try again.');
      return;
    }
    saveVerifiedPlug(fullName);
    setRegisteredName(fullName);
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <aside className="space-y-8 lg:col-span-2">
          <div className="space-y-4">
            <p className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-sm font-semibold text-brand-800">
              <BadgeCheck className="h-4 w-4" />
              Verified Plug Program
            </p>
            <h1 className="text-4xl font-extrabold leading-[1.15] text-stone-900">Become a Verified Plug</h1>
            <p className="text-base leading-normal text-stone-600">
              Verified Plugs are trusted sellers on The Plug &amp; Socket App. Pay once, register your details, and start
              listing items for buyers across Lilongwe.
            </p>
          </div>

          <div className="rounded-3xl bg-brand-800 p-8 text-white shadow-xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-sun-200">One-time membership fee</p>
            <p className="mt-2 text-4xl font-extrabold">{formatMwk(MEMBERSHIP_FEE_MWK)}</p>
            <div className="mt-6 flex items-start gap-3 rounded-xl bg-sun-100 p-4 text-sm leading-normal text-sun-900">
              <Smartphone className="mt-0.5 h-5 w-5 shrink-0" />
              <p>Payment is simulated for now. No money is taken when you register.</p>
            </div>
          </div>

          <ul className="space-y-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit.text} className="flex items-start gap-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <p className="pt-1.5 text-sm leading-normal text-stone-700">{benefit.text}</p>
              </li>
            ))}
          </ul>
        </aside>

        <div className="lg:col-span-3">
          {registeredName ? (
            <div className="rounded-3xl border border-brand-200 bg-white p-8 shadow-lg sm:p-10">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
                <CheckCircle2 className="h-8 w-8" />
              </span>
              <h2 className="mt-6 text-3xl font-extrabold leading-[1.2] text-stone-900">
                Welcome, {registeredName}. You are now a Verified Plug.
              </h2>
              <p className="mt-3 text-base leading-normal text-stone-600">
                Your registration is saved with a status of Verified. Your listings will show the Verified Plug badge
                and reach buyers in every Lilongwe hub.
              </p>
              <div className="mt-6 rounded-2xl bg-stone-50 p-6">
                <p className="text-sm font-semibold text-stone-800">Next steps</p>
                <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-normal text-stone-700">
                  <li>Post your first ad with a clear title, a fair price, and a photo if you have one.</li>
                  <li>Keep your WhatsApp number handy so buyers can contact you straight away.</li>
                </ol>
              </div>
              <a href="#/post" className={`${primaryButtonClassName} mt-8 w-full sm:w-auto`}>
                Post my first ad
              </a>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
            >
              <div>
                <h2 className="text-2xl font-extrabold text-stone-900">Your registration</h2>
                <p className="mt-1 text-sm leading-normal text-stone-600">Takes about a minute.</p>
              </div>

              <FormField label="Full name" htmlFor="full-name" error={errors.fullName}>
                <input
                  id="full-name"
                  type="text"
                  autoComplete="name"
                  value={form.fullName}
                  onChange={(event) => updateField('fullName', event.target.value)}
                  placeholder="e.g. Chikondi Phiri"
                  className={inputClassName}
                  aria-invalid={Boolean(errors.fullName)}
                />
              </FormField>

              <FormField
                label="Lilongwe neighborhood"
                htmlFor="neighborhood"
                error={errors.neighborhood}
                hint="Type the area you trade from, for example Area 25 or Kawale."
              >
                <input
                  id="neighborhood"
                  type="text"
                  value={form.neighborhood}
                  onChange={(event) => updateField('neighborhood', event.target.value)}
                  placeholder="e.g. Area 18"
                  className={inputClassName}
                  aria-invalid={Boolean(errors.neighborhood)}
                />
              </FormField>

              <fieldset className="space-y-3">
                <legend className="text-sm font-semibold text-stone-800">Mobile money provider</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {PROVIDER_OPTIONS.map((option) => {
                    const selected = form.provider === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`flex cursor-pointer items-start gap-3 rounded-xl border-2 p-4 transition ${
                          selected
                            ? 'border-brand-600 bg-brand-50 shadow-sm'
                            : 'border-stone-200 bg-white hover:border-brand-300 hover:bg-stone-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="provider"
                          value={option.value}
                          checked={selected}
                          onChange={() => updateField('provider', option.value)}
                          className="mt-1 h-4 w-4 accent-brand-700"
                        />
                        <span>
                          <span className="block font-semibold text-stone-900">{option.value}</span>
                          <span className="block text-xs leading-normal text-stone-600">{option.tagline}</span>
                        </span>
                      </label>
                    );
                  })}
                </div>
                {errors.provider && (
                  <p role="alert" className="text-sm text-ember-700">
                    {errors.provider}
                  </p>
                )}
              </fieldset>

              <FormField
                label="Phone number"
                htmlFor="phone"
                error={errors.phone}
                hint="The number buyers will see for your membership. Use your WhatsApp number."
              >
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  value={form.phone}
                  onChange={(event) => updateField('phone', event.target.value)}
                  placeholder="e.g. 0980 631 974"
                  className={inputClassName}
                  aria-invalid={Boolean(errors.phone)}
                />
              </FormField>

              {submitError && (
                <p role="alert" className="rounded-xl bg-ember-50 px-4 py-3 text-sm text-ember-800">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-semibold text-stone-700">Membership fee: {formatMwk(MEMBERSHIP_FEE_MWK)}</p>
                <button type="submit" disabled={submitting} className={primaryButtonClassName}>
                  {submitting ? 'Registering...' : 'Register as a Verified Plug'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
