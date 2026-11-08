export function validatePhone(value: string): string | null {
  const trimmed = value.trim();
  if (!/^\+?[0-9\s]+$/.test(trimmed) || trimmed.length > 20) {
    return 'Use digits only, for example 0980 631 974.';
  }
  const digitCount = trimmed.replace(/\D/g, '').length;
  if (digitCount < 9 || digitCount > 13) {
    return 'Phone numbers should have 9 to 13 digits.';
  }
  return null;
}

export function validateRequiredText(value: string, min: number, max: number, label: string): string | null {
  const length = value.trim().length;
  if (length < min) return `${label} must be at least ${min} characters.`;
  if (length > max) return `${label} must be ${max} characters or fewer.`;
  return null;
}
