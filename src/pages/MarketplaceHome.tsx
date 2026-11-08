import { useMemo, useState } from 'react';
import { PackageOpen, RefreshCw } from 'lucide-react';
import ListingCard from '@/components/ListingCard';
import MarketHero from '@/components/home/MarketHero';
import ListingFilters from '@/components/home/ListingFilters';
import { useListings } from '@/hooks/useListings';
import type { ListingCategory } from '@/lib/constants';
import { primaryButtonClassName } from '@/lib/styles';
import type { Listing } from '@/lib/types';

function matchesQuery(listing: Listing, query: string): boolean {
  if (!query) return true;
  const needle = query.toLowerCase();
  return [listing.title, listing.description, listing.area].some((value) => value.toLowerCase().includes(needle));
}

function ListingSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-2xl border border-stone-200 bg-white">
      <div className="aspect-[4/3] bg-stone-200" />
      <div className="space-y-3 p-5">
        <div className="h-5 w-3/4 rounded bg-stone-200" />
        <div className="h-5 w-1/2 rounded bg-stone-200" />
        <div className="h-4 w-full rounded bg-stone-100" />
        <div className="h-10 w-full rounded-xl bg-stone-200" />
      </div>
    </div>
  );
}

export default function MarketplaceHome() {
  const { listings, status, reload } = useListings();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ListingCategory | ''>('');
  const [area, setArea] = useState('');

  const areas = useMemo(
    () => [...new Set(listings.map((listing) => listing.area))].sort((a, b) => a.localeCompare(b)),
    [listings],
  );

  const filtered = useMemo(
    () =>
      listings.filter(
        (listing) =>
          (!category || listing.category === category) && (!area || listing.area === area) && matchesQuery(listing, query.trim()),
      ),
    [listings, category, area, query],
  );

  const hasActiveFilters = Boolean(query || category || area);

  const clearFilters = () => {
    setQuery('');
    setCategory('');
    setArea('');
  };

  return (
    <div>
      <MarketHero query={query} onQueryChange={setQuery} />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm sm:p-6">
          <ListingFilters
            category={category}
            area={area}
            areas={areas}
            onCategoryChange={setCategory}
            onAreaChange={setArea}
          />
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-semibold text-stone-600" aria-live="polite">
            {status === 'ready' && `${filtered.length} live ${filtered.length === 1 ? 'listing' : 'listings'}`}
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-brand-700 underline-offset-4 transition hover:text-brand-900 hover:underline"
            >
              Clear search and filters
            </button>
          )}
        </div>

        {status === 'loading' && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, index) => (
              <ListingSkeleton key={index} />
            ))}
          </div>
        )}

        {status === 'error' && (
          <div className="mt-6 rounded-2xl border border-ember-200 bg-ember-50 p-8 text-center">
            <p className="font-semibold text-ember-800">We could not load the marketplace right now.</p>
            <p className="mt-1 text-sm text-ember-800">Check your internet connection and try again.</p>
            <button type="button" onClick={() => void reload()} className={`${primaryButtonClassName} mt-5`}>
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        )}

        {status === 'ready' && filtered.length === 0 && (
          <div className="mt-6 flex flex-col items-center rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">
              <PackageOpen className="h-7 w-7" />
            </span>
            <p className="mt-4 text-lg font-semibold text-stone-900">No listings match your search yet</p>
            <p className="mt-1 max-w-md text-sm leading-normal text-stone-600">
              Try a different keyword or category, or be the first Verified Plug to post in this area.
            </p>
            <a href="#/post" className={`${primaryButtonClassName} mt-6`}>
              Post an ad
            </a>
          </div>
        )}

        {status === 'ready' && filtered.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        )}
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-brand-800 p-8 text-white sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-xl space-y-2">
            <h2 className="text-2xl font-extrabold leading-[1.2] sm:text-3xl">Sell to buyers across every Lilongwe hub</h2>
            <p className="text-base leading-normal text-brand-100">
              Become a Verified Plug for a one-time 10,000 MWK and start reaching buyers today.
            </p>
          </div>
          <a
            href="#/join"
            className="inline-flex shrink-0 items-center rounded-xl bg-sun-400 px-6 py-3 font-semibold text-sun-900 transition hover:-translate-y-0.5 hover:bg-sun-300"
          >
            Become a Verified Plug
          </a>
        </div>
      </section>
    </div>
  );
}
