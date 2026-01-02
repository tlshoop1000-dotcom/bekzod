
export enum PlanType {
  FREE = 'FREE',
  MONTHLY = 'MONTHLY',
  QUARTERLY = 'QUARTERLY',
  YEARLY = 'YEARLY'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Transaction {
  id: string;
  planName: string;
  amount: number;
  date: string;
  status: 'Muvaffaqiyatli' | 'Kutilmoqda' | 'Rad etildi';
  customerEmail: string;
}

export interface MerchantConfig {
  merchantId: string;
  cardNumber: string;
  provider: 'payme' | 'click' | 'stripe';
  isActive: boolean;
}

export type AuthMode = 'login' | 'register';

export interface Plan {
  id: PlanType;
  name: string;
  price: number;
  duration: string;
  features: string[];
  colorCustomization: boolean;
  logoUpload: boolean;
  advancedAnalytics: boolean;
  highResExport: boolean;
}

export type InputType = 'text' | 'url' | 'image' | 'video';

export interface QRState {
  value: string;
  fgColor: string;
  bgColor: string;
  logoImage?: string;
  inputType: InputType;
  analyticsEnabled: boolean;
}
