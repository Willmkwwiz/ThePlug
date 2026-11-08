import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Member } from '@/lib/types';

export interface OwnerStats {
  totalMembers: number;
  activeListings: number;
  recentMembers: Member[];
}

export function useOwnerStats() {
  const [stats, setStats] = useState<OwnerStats | null>(null);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const load = useCallback(async () => {
    setStatus('loading');
    const [membersResult, listingsResult] = await Promise.all([
      supabase
        .from('members')
        .select('id, full_name, neighborhood, provider, phone, status, fee_mwk, registered_at', { count: 'exact' })
        .order('registered_at', { ascending: false })
        .limit(10),
      supabase.from('listings').select('id', { count: 'exact', head: true }),
    ]);

    if (membersResult.error || listingsResult.error || !Array.isArray(membersResult.data)) {
      setStatus('error');
      return;
    }

    setStats({
      totalMembers: membersResult.count ?? 0,
      activeListings: listingsResult.count ?? 0,
      recentMembers: membersResult.data as Member[],
    });
    setStatus('ready');
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { stats, status, reload: load };
}
