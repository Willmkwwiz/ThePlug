import { Check, Copy, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { isMobileDevice, toWhatsAppDigits } from '@/lib/format';

type Feedback = 'copied' | 'failed' | null;

export default function WhatsAppButton({ phone, itemTitle }: { phone: string; itemTitle: string }) {
  const [feedback, setFeedback] = useState<Feedback>(null);
  const digits = toWhatsAppDigits(phone);
  const displayNumber = `+${digits}`;

  const handleClick = async () => {
    if (isMobileDevice()) {
      const message = `Hi, I saw "${itemTitle}" on The Plug & Socket App. Is it still available?`;
      window.open(`https://wa.me/${digits}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      return;
    }

    try {
      await navigator.clipboard.writeText(displayNumber);
      setFeedback('copied');
    } catch {
      setFeedback('failed');
    }
  };

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={handleClick}
        className="group/wa flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-brand-800 hover:shadow-md active:translate-y-0"
      >
        <MessageCircle className="h-4 w-4 transition group-hover/wa:scale-110" />
        Chat on WhatsApp
      </button>

      {feedback === 'copied' && (
        <p role="status" className="flex items-start gap-2 rounded-lg bg-brand-50 px-3 py-2 text-xs leading-normal text-brand-800">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>
            Number {displayNumber} copied. Open WhatsApp on your phone and paste it into a new chat.
          </span>
        </p>
      )}
      {feedback === 'failed' && (
        <p role="status" className="flex items-start gap-2 rounded-lg bg-stone-100 px-3 py-2 text-xs leading-normal text-stone-700">
          <Copy className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span>Copy this number and message the seller on WhatsApp: {displayNumber}</span>
        </p>
      )}
    </div>
  );
}
