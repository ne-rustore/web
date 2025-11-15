export interface Application {
  id: number;
  name: string;
  description: string | null;
  category: string;
  genres: string[];
  developer: string;
  seller: string;
  rating: number;
  rating_count: number;
  price: number;
  currency: string;
  icon_url: string;
  screenshot_urls: string[];
  release_date: string;
  version: string;
}

export interface ApplicationListResponse {
  items: Application[];
  total: number;
}
