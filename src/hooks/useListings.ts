import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Listing } from '@/lib/types';

export type LoadStatus = 'loading' | 'ready' | 'error';

export function useListings() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [status, setStatus] = useState<LoadStatus>('loading');

  const load = useCallback(async () => {
    setStatus('loading');
    const { data, error } = await supabase
      .from('listings')
      .select('id, title, price_mwk, category, area, contact_phone, description, image_url, created_at')
      .order('created_at', { ascending: false })
      .limit(200);

    if (error || !Array.isArray(data)) {
      setStatus('error');
      return;
    }
    setListings(data as Listing[]);
    setStatus('ready');
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { listings, status, reload: load };
}
