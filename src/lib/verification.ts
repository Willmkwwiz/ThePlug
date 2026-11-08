const VERIFIED_PLUG_KEY = 'plugsocket:verified-plug';

export function saveVerifiedPlug(name: string): void {
  window.localStorage.setItem(VERIFIED_PLUG_KEY, name);
}

export function getVerifiedPlugName(): string | null {
  return window.localStorage.getItem(VERIFIED_PLUG_KEY);
}
