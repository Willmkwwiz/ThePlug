export function formatMwk(amount: number): string {
  return `MWK ${amount.toLocaleString('en-US')}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1).trimEnd()}…`;
}

export function toWhatsAppDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00')) return digits.slice(2);
  if (digits.startsWith('265')) return digits;
  if (digits.startsWith('0')) return `265${digits.slice(1)}`;
  return `265${digits}`;
}

export function isMobileDevice(): boolean {
  return /Android|iPhone|iPad|iPod|Mobi/i.test(navigator.userAgent);
}
