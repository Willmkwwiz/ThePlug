import { Plug } from 'lucide-react';
import { BRAND_NAME, CONTACT_EMAIL, CONTACT_PHONE, LILONGWE_HUBS } from '@/lib/constants';

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-stone-900 text-stone-300">
      <div className="h-1.5 flex">
        <span className="flex-1 bg-brand-600" />
        <span className="flex-1 bg-sun-400" />
        <span className="flex-1 bg-ember-600" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3 lg:px-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Plug className="h-5 w-5" />
            </span>
            <span className="text-lg font-extrabold text-white">{BRAND_NAME}</span>
          </div>
          <p className="max-w-sm text-sm leading-normal text-stone-400">
            Lilongwe's trusted local marketplace, powered by the Verified Plug community.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Lilongwe Hubs</h2>
          <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {LILONGWE_HUBS.map((hub) => (
              <li key={hub}>
                <a href="#/" className="transition hover:text-sun-300">
                  {hub}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-extrabold uppercase tracking-wider text-white">Quick Links</h2>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="#/join" className="transition hover:text-sun-300">
                Become a Verified Plug
              </a>
            </li>
            <li>
              <a href="#/about" className="transition hover:text-sun-300">
                About The Plug &amp; Socket App
              </a>
            </li>
            <li>
              <a href={`mailto:${CONTACT_EMAIL}`} className="transition hover:text-sun-300">
                {CONTACT_EMAIL}
              </a>
            </li>
            <li>
              <a href={`tel:${CONTACT_PHONE}`} className="transition hover:text-sun-300">
                {CONTACT_PHONE}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-stone-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-stone-400 sm:flex-row sm:px-6 lg:px-8">
          <p>© 2026 The Plug &amp; Socket App.</p>
          <a href="#/owner" className="transition hover:text-stone-200">
            Owner login
          </a>
        </div>
      </div>
    </footer>
  );
}
