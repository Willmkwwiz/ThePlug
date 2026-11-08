import { Menu, Plug, X } from 'lucide-react';
import { useState } from 'react';
import type { Route } from '@/lib/router';

const NAV_LINKS: { path: Route; label: string }[] = [
  { path: '/', label: 'Marketplace' },
  { path: '/post', label: 'Post an Ad' },
  { path: '/about', label: 'About' },
];

export default function SiteHeader({ route }: { route: Route }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-stone-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#/" className="group flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-white transition group-hover:rotate-12">
            <Plug className="h-5 w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-extrabold text-stone-900">The Plug &amp; Socket</span>
            <span className="block text-xs font-semibold text-brand-700">Lilongwe Marketplace</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={`#${link.path}`}
              aria-current={route === link.path ? 'page' : undefined}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                route === link.path ? 'bg-brand-50 text-brand-800' : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
              }`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#/join"
            className="ml-3 inline-flex items-center rounded-xl bg-sun-400 px-4 py-2 text-sm font-semibold text-sun-900 shadow-sm transition hover:-translate-y-0.5 hover:bg-sun-300 hover:shadow-md"
          >
            Become a Verified Plug
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-stone-700 transition hover:bg-stone-100 md:hidden"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <nav className="border-t border-stone-200 bg-white px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.path}
              href={`#${link.path}`}
              onClick={() => setMenuOpen(false)}
              className="block rounded-lg px-3 py-3 text-base font-semibold text-stone-700 hover:bg-stone-100"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#/join"
            onClick={() => setMenuOpen(false)}
            className="mt-2 block rounded-xl bg-sun-400 px-4 py-3 text-center font-semibold text-sun-900"
          >
            Become a Verified Plug
          </a>
        </nav>
      )}
    </header>
  );
}
