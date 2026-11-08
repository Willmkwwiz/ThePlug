import { BadgeCheck, MapPin, MessageCircle, ShieldCheck, Store } from 'lucide-react';
import { MEMBERSHIP_FEE_MWK, BRAND_NAME } from '@/lib/constants';
import { formatMwk } from '@/lib/format';

const STEPS = [
  { title: 'Register', text: 'Fill in your name, neighborhood, mobile money provider, and phone number.' },
  { title: 'Pay once', text: `A one-time membership fee of ${formatMwk(MEMBERSHIP_FEE_MWK)}. Payment is simulated for now.` },
  { title: 'Post and sell', text: 'Publish your listings with a price, photo, and WhatsApp number for buyers.' },
];

const BENEFITS = [
  { icon: BadgeCheck, title: 'Trusted listings', text: 'Verified Plugs are registered sellers, so buyers can shop with more confidence.' },
  { icon: MapPin, title: 'Exposure across every hub', text: 'Your items appear to buyers in City Centre, Old Town, Area 25, Kawale, and every other Lilongwe hub.' },
  { icon: MessageCircle, title: 'Direct WhatsApp contact', text: 'Buyers reach you straight on WhatsApp, with no middleman and no extra app to install.' },
  { icon: Store, title: 'Simple listing tools', text: 'Post an ad in minutes and publish it straight to the marketplace.' },
];

const FAQS = [
  {
    question: 'How do I know a seller is genuine?',
    answer: 'Look for sellers who are Verified Plugs. Ask to see the item in person, and meet in a busy public place during daylight.',
  },
  {
    question: 'Should I pay before I see the item?',
    answer: 'No. Inspect the item, test electronics, and check vehicle papers before you send any money. Pay only when you are satisfied.',
  },
  {
    question: 'Which payment methods are safest?',
    answer: 'Pay in cash on collection where possible. If you use mobile money, confirm the recipient name and number before you send.',
  },
  {
    question: 'What if a price looks too good to be true?',
    answer: 'It probably is. Compare with similar listings in the same category, and be cautious of urgent requests to move the chat off WhatsApp.',
  },
];

export default function AboutPage() {
  return (
    <div>
      <section className="bg-brand-800 text-white">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-20 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-sun-300">Lilongwe, made local</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.15] sm:text-5xl">About {BRAND_NAME}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-normal text-brand-100 sm:text-lg">
            The Plug &amp; Socket App is a local marketplace for people in Lilongwe. It connects everyday buyers with
            trusted sellers in every city hub, from maize and used cars to phones, fashion, and home power.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold leading-[1.2] text-stone-900">How sellers join as Verified Plugs</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.title} className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sun-400 font-extrabold text-sun-900">
                {index + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-stone-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-normal text-stone-600">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold leading-[1.2] text-stone-900">Why become a Verified Plug</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {BENEFITS.map((benefit) => (
              <div key={benefit.title} className="flex gap-4 rounded-2xl border border-stone-200 p-6 transition hover:border-brand-300 hover:shadow-md">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-700">
                  <benefit.icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold text-stone-900">{benefit.title}</h3>
                  <p className="mt-1 text-sm leading-normal text-stone-600">{benefit.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-ocean-100 text-ocean-900">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <h2 className="text-3xl font-extrabold leading-[1.2] text-stone-900">Safety tips and FAQ</h2>
        </div>
        <div className="mt-8 divide-y divide-stone-200 overflow-hidden rounded-2xl border border-stone-200 bg-white">
          {FAQS.map((faq) => (
            <details key={faq.question} className="group p-6">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-semibold text-stone-900">
                {faq.question}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-100 text-stone-700 transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-normal text-stone-600">{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
