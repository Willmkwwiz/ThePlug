import type { ListingCategory, MobileMoneyProvider } from '@/lib/constants';

export interface Listing {
  id: string;
  title: string;
  price_mwk: number;
  category: ListingCategory;
  area: string;
  contact_phone: string;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface Member {
  id: string;
  full_name: string;
  neighborhood: string;
  provider: MobileMoneyProvider;
  phone: string;
  status: string;
  fee_mwk: number;
  registered_at: string;
}
