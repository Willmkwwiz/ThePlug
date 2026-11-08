import { Search, X } from 'lucide-react';
import type { FormEvent } from 'react';

interface MarketHeroProps {
  query: string;
  onQueryChange: (value: string) => void;
}

const HERO_IMAGE =
  'https://images.pexels.com/photos/39916933/pexels-photo-39916933.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export default function MarketHero({ query, onQueryChange }: MarketHeroProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section className="relative isolate overflow-hidden">
      <img src={HERO_IMAGE} alt="" aria-hidden="true" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-stone-900/90 via-brand-900/80 to-brand-800/70" />

      <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 md:py-24 lg:px-8">
        <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-sun-200 ring-1 ring-white/20 backdrop-blur">
          Verified Plugs across every Lilongwe hub
        </p>
        <h1 className="text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl md:text-6xl">
          Buy, Sell, and Connect
          <span className="block text-sun-300">Only in Lilongwe.</span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-normal text-stone-200 sm:text-lg">
          Find fresh maize, used cars, electronics, and more from trusted local sellers, then chat with them directly on WhatsApp.
        </p>

        <form
          onSubmit={handleSubmit}
          role="search"
          className="mx-auto mt-8 flex max-w-2xl flex-col gap-2 rounded-2xl bg-white p-2 shadow-2xl sm:flex-row"
        >
          <label htmlFor="marketplace-search" className="sr-only">
            Search listings
          </label>
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-stone-500" />
            <input
              id="marketplace-search"
              type="search"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              placeholder="Search phones, maize, Yatu, sofas..."
              className="w-full rounded-xl bg-transparent py-3 pl-12 pr-10 text-base text-stone-900 placeholder:text-stone-500 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                onClick={() => onQueryChange('')}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-lg text-stone-500 transition hover:bg-stone-100 hover:text-stone-900"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="rounded-xl bg-brand-700 px-6 py-3 font-semibold text-white transition hover:bg-brand-800"
          >
            Search
          </button>
        </form>
      </div>

      <div className="flex h-1.5">
        <span className="flex-1 bg-brand-600" />
        <span className="flex-1 bg-sun-400" />
        <span className="flex-1 bg-ember-600" />
      </div>
    </section>
  );
}
