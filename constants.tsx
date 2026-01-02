
import { Plan, PlanType } from './types';

export const PLANS: Plan[] = [
  {
    id: PlanType.FREE,
    name: 'Bepul',
    price: 0,
    duration: 'Umrbod',
    features: ['Matn va URL uchun QR', 'Standart dizayn', 'Cheksiz scan'],
    colorCustomization: false,
    logoUpload: false,
    advancedAnalytics: false,
    highResExport: false
  },
  {
    id: PlanType.MONTHLY,
    name: '1 Oylik',
    price: 5,
    duration: 'oyiga',
    features: ['Ranglarni o\'zgartirish', 'Reklamasiz', 'Premium server'],
    colorCustomization: true,
    logoUpload: false,
    advancedAnalytics: false,
    highResExport: true
  },
  {
    id: PlanType.QUARTERLY,
    name: '3 Oylik',
    price: 10,
    duration: '3 oy uchun',
    features: ['Logo qo\'shish imkoniyati', 'Barcha ranglar', 'High-res yuklash'],
    colorCustomization: true,
    logoUpload: true,
    advancedAnalytics: false,
    highResExport: true
  },
  {
    id: PlanType.YEARLY,
    name: '1 Yillik',
    price: 70,
    duration: 'yiliga',
    features: ['Analytics (Yaqinda)', 'Video QR qo\'llab quvvatlash', 'Maxsus ramkalar', '24/7 Support'],
    colorCustomization: true,
    logoUpload: true,
    advancedAnalytics: true,
    highResExport: true
  }
];
