import { CheckCircle2, Lock } from 'lucide-react';
import { useState, type FormEvent } from 'react';
import FormField from '@/components/FormField';
import ImageUploader from '@/components/ImageUploader';
import { CATEGORIES, type ListingCategory } from '@/lib/constants';
import { supabase } from '@/lib/supabase';
import { inputClassName, primaryButtonClassName } from '@/lib/styles';
import { validatePhone, validateRequiredText } from '@/lib/validation';
import { getVerifiedPlugName } from '@/lib/verification';

interface ListingForm {
  title: string;
  price: string;
  category: ListingCategory | '';
  area: string;
  contactPhone: string;
  description: string;
  imageUrl: string | null;
}

type FormErrors = Partial<Record<keyof ListingForm, string>>;

const EMPTY_FORM: ListingForm = {
  title: '',
  price: '',
  category: '',
  area: '',
  contactPhone: '',
  description: '',
  imageUrl: null,
};

const MAX_PRICE_MWK = 1000000000;
const MAX_DESCRIPTION = 500;

function validateForm(form: ListingForm): FormErrors {
  const errors: FormErrors = {};
  const titleError = validateRequiredText(form.title, 3, 120, 'Item title');
  if (titleError) errors.title = titleError;

  const price = Number(form.price);
  if (!form.price.trim() || !Number.isInteger(price) || price <= 0 || price > MAX_PRICE_MWK) {
    errors.price = 'Enter a whole-number price in MWK greater than zero.';
  }

  if (!form.category) errors.category = 'Choose a category.';

  const areaError = validateRequiredText(form.area, 2, 100, 'Lilongwe area');
  if (areaError) errors.area = areaError;

  const phoneError = validatePhone(form.contactPhone);
  if (phoneError) errors.contactPhone = phoneError;

  const descriptionError = validateRequiredText(form.description, 1, MAX_DESCRIPTION, 'Description');
  if (descriptionError) errors.description = descriptionError;

  return errors;
}

function JoinFirstNotice() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-sun-100 text-sun-800">
        <Lock className="h-8 w-8" />
      </span>
      <h1 className="mt-6 text-3xl font-extrabold leading-[1.2] text-stone-900">Verified Plugs only</h1>
      <p className="mt-3 text-base leading-normal text-stone-600">
        Complete your Verified Plug registration first. It is a one-time 10,000 MWK membership, and it unlocks posting
        on the marketplace.
      </p>
      <a href="#/join" className={`${primaryButtonClassName} mt-8`}>
        Become a Verified Plug
      </a>
    </div>
  );
}

export default function PostNewAd() {
  const [verifiedName] = useState<string | null>(getVerifiedPlugName);
  const [form, setForm] = useState<ListingForm>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [published, setPublished] = useState(false);

  if (!verifiedName) return <JoinFirstNotice />;

  const updateField = <K extends keyof ListingForm>(key: K, value: ListingForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validateForm(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0 || !form.category) return;

    setSubmitting(true);
    setSubmitError(null);
    const { error } = await supabase.from('listings').insert({
      title: form.title.trim(),
      price_mwk: Number(form.price),
      category: form.category,
      area: form.area.trim(),
      contact_phone: form.contactPhone.trim(),
      description: form.description.trim(),
      image_url: form.imageUrl,
    });
    setSubmitting(false);

    if (error) {
      setSubmitError('We could not publish your ad. Check your connection and try again.');
      return;
    }
    setPublished(true);
  };

  const postAnother = () => {
    setForm(EMPTY_FORM);
    setErrors({});
    setSubmitError(null);
    setPublished(false);
  };

  if (published) {
    return (
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <CheckCircle2 className="h-9 w-9" />
        </span>
        <h1 className="mt-6 text-3xl font-extrabold leading-[1.2] text-stone-900">Your ad is live</h1>
        <p className="mt-3 text-base leading-normal text-stone-600">
          Buyers across Lilongwe can now find "{form.title.trim()}" on the marketplace and message you on WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <a href="#/" className={primaryButtonClassName}>
            Back to marketplace
          </a>
          <button
            type="button"
            onClick={postAnother}
            className="inline-flex items-center justify-center rounded-xl border border-stone-300 bg-white px-6 py-3 font-semibold text-stone-800 transition hover:-translate-y-0.5 hover:border-brand-500 hover:text-brand-800"
          >
            Post another ad
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mb-8 space-y-2">
        <p className="text-sm font-semibold text-brand-700">Signed up as {verifiedName}</p>
        <h1 className="text-4xl font-extrabold leading-[1.15] text-stone-900">Post a new ad</h1>
        <p className="text-base leading-normal text-stone-600">
          Describe what you are selling. Your ad goes live on the marketplace as soon as you publish it.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        noValidate
        className="space-y-6 rounded-3xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
      >
        <FormField label="Item title" htmlFor="item-title" error={errors.title}>
          <input
            id="item-title"
            type="text"
            value={form.title}
            onChange={(event) => updateField('title', event.target.value)}
            placeholder="e.g. Samsung Galaxy A14, 128GB"
            className={inputClassName}
            aria-invalid={Boolean(errors.title)}
          />
        </FormField>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Price (MWK)" htmlFor="item-price" error={errors.price}>
            <input
              id="item-price"
              type="number"
              inputMode="numeric"
              min={1}
              step={1}
              value={form.price}
              onChange={(event) => updateField('price', event.target.value)}
              placeholder="e.g. 150000"
              className={inputClassName}
              aria-invalid={Boolean(errors.price)}
            />
          </FormField>

          <FormField label="Category" htmlFor="item-category" error={errors.category}>
            <select
              id="item-category"
              value={form.category}
              onChange={(event) => updateField('category', event.target.value as ListingCategory)}
              className={inputClassName}
              aria-invalid={Boolean(errors.category)}
            >
              <option value="" disabled>
                Choose a category
              </option>
              {CATEGORIES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <FormField label="Lilongwe area" htmlFor="item-area" error={errors.area}>
            <input
              id="item-area"
              type="text"
              value={form.area}
              onChange={(event) => updateField('area', event.target.value)}
              placeholder="e.g. Area 25"
              className={inputClassName}
              aria-invalid={Boolean(errors.area)}
            />
          </FormField>

          <FormField
            label="WhatsApp number for buyers"
            htmlFor="item-phone"
            error={errors.contactPhone}
            hint="Buyers will message this number."
          >
            <input
              id="item-phone"
              type="tel"
              inputMode="tel"
              value={form.contactPhone}
              onChange={(event) => updateField('contactPhone', event.target.value)}
              placeholder="e.g. 0980 631 974"
              className={inputClassName}
              aria-invalid={Boolean(errors.contactPhone)}
            />
          </FormField>
        </div>

        <FormField
          label={`Description (${form.description.trim().length}/${MAX_DESCRIPTION})`}
          htmlFor="item-description"
          error={errors.description}
          hint="Mention condition, size, and anything a buyer should know. Shoppers see the first part on the card."
        >
          <textarea
            id="item-description"
            rows={5}
            maxLength={MAX_DESCRIPTION}
            value={form.description}
            onChange={(event) => updateField('description', event.target.value)}
            placeholder="Describe the item, its condition, and where to collect it."
            className={`${inputClassName} resize-y leading-normal`}
            aria-invalid={Boolean(errors.description)}
          />
        </FormField>

        <div className="space-y-2">
          <p className="block text-sm font-semibold text-stone-800">Photo</p>
          <ImageUploader value={form.imageUrl} onChange={(dataUrl) => updateField('imageUrl', dataUrl)} />
        </div>

        {submitError && (
          <p role="alert" className="rounded-xl bg-ember-50 px-4 py-3 text-sm text-ember-800">
            {submitError}
          </p>
        )}

        <div className="flex flex-col-reverse gap-3 border-t border-stone-200 pt-6 sm:flex-row sm:justify-end">
          <a
            href="#/"
            className="inline-flex items-center justify-center rounded-xl px-6 py-3 font-semibold text-stone-700 transition hover:bg-stone-100"
          >
            Cancel
          </a>
          <button type="submit" disabled={submitting} className={primaryButtonClassName}>
            {submitting ? 'Publishing...' : 'Publish ad'}
          </button>
        </div>
      </form>
    </div>
  );
}
