export interface ApplicationListResponse {
  items: Application[];
  total: number;
}

export interface AppListItem {
  id: number;
  name: string;
  category: string;
  developer: string;
  rating: number;
  rating_count: number;
  age_rating?: number;
  price: number;
  currency: string;
  icon_url: string;
  short_description?: string;
}

export interface Application {
  id: number;
  name: string;
  category: string;
  developer: string;
  rating: number;
  rating_count: number;
  age_rating?: number;
  price: number;
  currency: string;
  icon_url: string;
  short_description?: string;
  description: string | null;
  seller: string;
  genres: string[];
  screenshot_urls: string[];
  release_date: string;
  version: string;
}
