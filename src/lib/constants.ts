import { Car, Cpu, Shirt, Wheat, Zap, type LucideIcon } from 'lucide-react';

export const BRAND_NAME = 'The Plug & Socket App';
export const MEMBERSHIP_FEE_MWK = 10000;
export const OWNER_EMAIL = 'willmkwwiz@gmail.com';
export const CONTACT_EMAIL = 'willmkwwiz@gmail.com';
export const CONTACT_PHONE = '0980631974';

export const PROVIDERS = ['Airtel Money', 'TNM Mpamba'] as const;
export type MobileMoneyProvider = (typeof PROVIDERS)[number];

export type ListingCategory = 'Electronics' | 'Used Cars' | 'Agriculture' | 'Home/Power' | 'Fashion';

export const CATEGORIES: { value: ListingCategory; label: string; icon: LucideIcon }[] = [
  { value: 'Electronics', label: 'Electronics', icon: Cpu },
  { value: 'Used Cars', label: 'Used Cars (Yatu)', icon: Car },
  { value: 'Agriculture', label: 'Agriculture (Maize)', icon: Wheat },
  { value: 'Home/Power', label: 'Home/Power', icon: Zap },
  { value: 'Fashion', label: 'Fashion', icon: Shirt },
];

export const LILONGWE_HUBS = [
  'City Centre',
  'Old Town',
  'Area 2',
  'Area 3',
  'Area 9',
  'Area 10',
  'Area 18',
  'Area 25',
  'Area 47',
  'Kawale',
  'Chinsapo',
  'Kanengo',
  'Mgona',
  'Lingadzi',
];
