import { MapPin, Package } from 'lucide-react';
import WhatsAppButton from '@/components/WhatsAppButton';
import { CATEGORIES } from '@/lib/constants';
import { formatMwk, truncate } from '@/lib/format';
import type { Listing } from '@/lib/types';

export default function ListingCard({ listing }: { listing: Listing }) {
  const categoryLabel = CATEGORIES.find((category) => category.value === listing.category)?.label ?? listing.category;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-50">
        {listing.image_url ? (
          <img
            src={listing.image_url}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Package className="h-12 w-12 text-brand-300" aria-hidden="true" />
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-brand-800 shadow-sm">
          {categoryLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug text-stone-900">{listing.title}</h3>
          <p className="mt-1 text-xl font-extrabold text-brand-800">{formatMwk(listing.price_mwk)}</p>
        </div>
        <p className="flex items-center gap-1.5 text-sm font-semibold text-stone-600">
          <MapPin className="h-4 w-4 shrink-0 text-ember-600" aria-hidden="true" />
          {listing.area}
        </p>
        <p className="text-sm leading-normal text-stone-600">{truncate(listing.description, 80)}</p>
        <div className="mt-auto pt-2">
          <WhatsAppButton phone={listing.contact_phone} itemTitle={listing.title} />
        </div>
      </div>
    </article>
  );
}
