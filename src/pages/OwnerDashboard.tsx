import { BadgeCheck, LayoutList, LogOut, Receipt, Wallet } from 'lucide-react';
import MembersTable from '@/components/owner/MembersTable';
import StatCard from '@/components/owner/StatCard';
import { useAuthSession } from '@/hooks/useAuthSession';
import { useOwnerStats } from '@/hooks/useOwnerStats';
import { MEMBERSHIP_FEE_MWK, OWNER_EMAIL } from '@/lib/constants';
import { formatMwk } from '@/lib/format';
import { supabase } from '@/lib/supabase';
import { primaryButtonClassName } from '@/lib/styles';
import OwnerSignIn from '@/components/owner/OwnerSignIn';

function Spinner() {
  return (
    <div className="flex justify-center py-24">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-100 border-t-brand-700" />
    </div>
  );
}

function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => void supabase.auth.signOut()}
      className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-semibold text-stone-700 transition hover:border-stone-400 hover:bg-stone-50"
    >
      <LogOut className="h-4 w-4" />
      Sign out
    </button>
  );
}

function NotOwnerNotice() {
  return (
    <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
      <h1 className="text-3xl font-extrabold leading-[1.2] text-stone-900">Owner access only</h1>
      <p className="mt-3 text-base leading-normal text-stone-600">
        This account does not have access to the Owner Dashboard. Sign out and use the owner account instead.
      </p>
      <div className="mt-8">
        <SignOutButton />
      </div>
    </div>
  );
}

function DashboardContent() {
  const { stats, status, reload } = useOwnerStats();

  if (status === 'loading' || !stats) {
    if (status === 'error') {
      return (
        <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
          <p className="font-semibold text-ember-800">The dashboard could not load right now.</p>
          <button type="button" onClick={() => void reload()} className={`${primaryButtonClassName} mt-5`}>
            Try again
          </button>
        </div>
      );
    }
    return <Spinner />;
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Verified members"
          value={stats.totalMembers.toLocaleString('en-US')}
          hint="Plugs who completed registration"
          icon={BadgeCheck}
          tone="brand"
        />
        <StatCard
          label="Total revenue"
          value={formatMwk(stats.totalMembers * MEMBERSHIP_FEE_MWK)}
          hint="Members x 10,000 MWK fee"
          icon={Wallet}
          tone="sun"
        />
        <StatCard
          label="Active listings"
          value={stats.activeListings.toLocaleString('en-US')}
          hint="Ads live on the marketplace"
          icon={LayoutList}
          tone="ocean"
        />
        <StatCard
          label="Membership fee"
          value={formatMwk(MEMBERSHIP_FEE_MWK)}
          hint="One-time, per Verified Plug"
          icon={Receipt}
          tone="ember"
        />
      </div>

      <section className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
        <div className="border-b border-stone-200 px-6 py-5">
          <h2 className="text-xl font-extrabold text-stone-900">Most recent Verified Plugs</h2>
          <p className="mt-1 text-sm text-stone-600">The latest 10 members, newest first.</p>
        </div>
        <MembersTable members={stats.recentMembers} />
      </section>
    </div>
  );
}

export default function OwnerDashboard() {
  const { session, loading } = useAuthSession();

  if (loading) return <Spinner />;
  if (!session) return <OwnerSignIn />;

  const isOwner = session.user.email?.toLowerCase() === OWNER_EMAIL;

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-2">
          <p className="text-sm font-semibold text-brand-700">Owner Dashboard</p>
          <h1 className="text-4xl font-extrabold leading-[1.15] text-stone-900">Platform growth</h1>
        </div>
        {isOwner && <SignOutButton />}
      </div>
      {isOwner ? <DashboardContent /> : <NotOwnerNotice />}
    </div>
  );
}
