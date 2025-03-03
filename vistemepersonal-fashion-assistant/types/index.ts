export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  store: 'ElPecadoModa' | 'Mixture';
  category: Category;
  colors: string[];
  sizes: Size[];
  url: string;
}

export type Category = 
  | 'ABRIGOS'
  | 'CHAQUETAS'
  | 'VESTIDOS'
  | 'FALDAS_SHORTS'
  | 'PANTALONES'
  | 'CAMISAS_BLUSAS'
  | 'CAMISETAS'
  | 'PUNTO'
  | 'CALZADO'
  | 'ACCESORIOS'
  | 'JOYERIA';

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export type ColorSeason = 'primavera' | 'verano' | 'otoño' | 'invierno';

export interface User {
  id: string;
  email: string;
  name: string;
  size?: Size;
  favoriteColors: string[];
  preferredStyles: string[];
  colorimetry?: ColorimetryResult;
  profilePicture?: string;
}

export interface ColorimetryResult {
  season: ColorSeason;
  favorableColors: string[];
  unfavorableColors: string[];
  date: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: number;
  products?: Product[];
  imageUrl?: string;
}

export interface Store {
  id: string;
  name: string;
  description: string;
  logo: string;
  locations: StoreLocation[];
  website: string;
}

export interface StoreLocation {
  address: string;
  city: string;
  hours: string;
  phone: string;
}

export interface FittingRoomItem {
  id: string;
  productId: string;
  userImage?: string;
  resultImage?: string;
  date: string;
}