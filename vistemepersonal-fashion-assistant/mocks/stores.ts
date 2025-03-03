import { Store } from '@/types';

export const stores: Store[] = [
  {
    id: '1',
    name: 'El Pecado Moda',
    description: 'Tienda de moda con las últimas tendencias en ropa y accesorios para mujer.',
    logo: 'https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?q=80&w=1887&auto=format&fit=crop',
    locations: [
      {
        address: 'Calle Mayor 25',
        city: 'Madrid',
        hours: 'Lun-Sáb: 10:00-20:00, Dom: Cerrado',
        phone: '+34 912 345 678'
      },
      {
        address: 'Avenida Diagonal 405',
        city: 'Barcelona',
        hours: 'Lun-Sáb: 10:00-21:00, Dom: 11:00-19:00',
        phone: '+34 932 345 678'
      }
    ],
    website: 'https://elpecadomoda.com'
  },
  {
    id: '2',
    name: 'Mixture',
    description: 'Boutique de moda con diseños exclusivos y prendas de alta calidad.',
    logo: 'https://images.unsplash.com/photo-1589363460779-cd717d2ed8fa?q=80&w=1887&auto=format&fit=crop',
    locations: [
      {
        address: 'Gran Vía 65',
        city: 'Madrid',
        hours: 'Lun-Sáb: 10:30-20:30, Dom: Cerrado',
        phone: '+34 913 456 789'
      },
      {
        address: 'Calle Serrano 47',
        city: 'Madrid',
        hours: 'Lun-Sáb: 10:00-20:00, Dom: Cerrado',
        phone: '+34 914 567 890'
      },
      {
        address: 'Paseo de Gracia 55',
        city: 'Barcelona',
        hours: 'Lun-Sáb: 10:00-21:00, Dom: 11:00-20:00',
        phone: '+34 933 456 789'
      }
    ],
    website: 'https://mixture.com'
  }
];

export const getStoreById = (id: string) => {
  return stores.find(store => store.id === id);
};