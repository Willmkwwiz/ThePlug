import type { Member } from '@/lib/types';
import { formatDateTime } from '@/lib/format';

export default function MembersTable({ members }: { members: Member[] }) {
  if (members.length === 0) {
    return (
      <div className="px-6 py-12 text-center text-sm text-stone-600">
        No Verified Plugs have registered yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-stone-200 text-left text-sm">
        <thead className="bg-stone-50 text-xs uppercase tracking-wider text-stone-600">
          <tr>
            <th scope="col" className="px-5 py-3 font-semibold">Name</th>
            <th scope="col" className="px-5 py-3 font-semibold">Neighborhood</th>
            <th scope="col" className="px-5 py-3 font-semibold">Provider</th>
            <th scope="col" className="px-5 py-3 font-semibold">Phone</th>
            <th scope="col" className="px-5 py-3 font-semibold">Status</th>
            <th scope="col" className="px-5 py-3 font-semibold">Registered</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-100 bg-white text-stone-800">
          {members.map((member) => (
            <tr key={member.id} className="transition hover:bg-brand-50/60">
              <td className="whitespace-nowrap px-5 py-4 font-semibold text-stone-900">{member.full_name}</td>
              <td className="whitespace-nowrap px-5 py-4">{member.neighborhood}</td>
              <td className="whitespace-nowrap px-5 py-4">{member.provider}</td>
              <td className="whitespace-nowrap px-5 py-4 tabular-nums">{member.phone}</td>
              <td className="whitespace-nowrap px-5 py-4">
                <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-1 text-xs font-semibold text-brand-900">
                  {member.status}
                </span>
              </td>
              <td className="whitespace-nowrap px-5 py-4 text-stone-600">{formatDateTime(member.registered_at)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
