import { useEffect, useState } from 'react';

export const ROUTES = ['/', '/join', '/post', '/about', '/owner'] as const;
export type Route = (typeof ROUTES)[number];

function readRoute(): Route {
  const path = window.location.hash.replace(/^#/, '') || '/';
  return (ROUTES as readonly string[]).includes(path) ? (path as Route) : '/';
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(readRoute);

  useEffect(() => {
    const handleChange = () => {
      setRoute(readRoute());
      window.scrollTo({ top: 0 });
    };
    window.addEventListener('hashchange', handleChange);
    return () => window.removeEventListener('hashchange', handleChange);
  }, []);

  return route;
}
