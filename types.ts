
export enum Screen {
  WELCOME = 'WELCOME',
  LOGIN = 'LOGIN',
  ROLE_SELECTION = 'ROLE_SELECTION',
  HOME = 'HOME',
  STYLIST_DETAILS = 'STYLIST_DETAILS',
  BOOKING_CALENDAR = 'BOOKING_CALENDAR',
  BOOKINGS_LIST = 'BOOKINGS_LIST',
  FAVORITES = 'FAVORITES',
  PROFILE = 'PROFILE',
  PROFILE_SETTINGS = 'PROFILE_SETTINGS',
  PROFILE_PAYMENTS = 'PROFILE_PAYMENTS',
  PROFILE_NOTIFICATIONS = 'PROFILE_NOTIFICATIONS',
  STYLIST_DASHBOARD = 'STYLIST_DASHBOARD',
}

export interface Service {
  name: string;
  price: number;
  duration: number; // in minutes
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  text: string;
  date: string;
}

export interface Stylist {
  id: string;
  name: string;
  imageUrl: string;
  portfolioUrls: string[]; // Added for slideshow
  specialties: string[];
  rating: number;
  location: string;
  about: string;
  services: Service[];
  reviews: Review[];
}

export interface Booking {
  id: string;
  stylistId: string;
  stylistName: string;
  stylistImage: string;
  serviceName: string;
  price: number;
  date: Date;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface User {
  name: string;
  email: string;
  avatarUrl: string;
}
