import { Product } from '@/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Abrigo de lana',
    price: 129.99,
    description: 'Abrigo de lana con corte clásico y botones frontales. Perfecto para el invierno.',
    imageUrl: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?q=80&w=687&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'ABRIGOS',
    colors: ['negro', 'gris', 'camel'],
    sizes: ['S', 'M', 'L', 'XL'],
    url: 'https://elpecadomoda.com/abrigo-lana'
  },
  {
    id: '2',
    name: 'Vestido floral',
    price: 79.99,
    description: 'Vestido con estampado floral y corte midi. Ideal para primavera y verano.',
    imageUrl: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1887&auto=format&fit=crop',
    store: 'Mixture',
    category: 'VESTIDOS',
    colors: ['multicolor', 'azul'],
    sizes: ['XS', 'S', 'M', 'L'],
    url: 'https://mixture.com/vestido-floral'
  },
  {
    id: '3',
    name: 'Pantalón de cuero',
    price: 89.99,
    description: 'Pantalón de cuero sintético con corte ajustado. Estilo moderno y versátil.',
    imageUrl: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?q=80&w=687&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'PANTALONES',
    colors: ['negro'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    url: 'https://elpecadomoda.com/pantalon-cuero'
  },
  {
    id: '4',
    name: 'Blusa de seda',
    price: 59.99,
    description: 'Blusa de seda con cuello en V y mangas largas. Elegante y sofisticada.',
    imageUrl: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?q=80&w=1974&auto=format&fit=crop',
    store: 'Mixture',
    category: 'CAMISAS_BLUSAS',
    colors: ['blanco', 'negro', 'rosa'],
    sizes: ['S', 'M', 'L'],
    url: 'https://mixture.com/blusa-seda'
  },
  {
    id: '5',
    name: 'Chaqueta vaquera',
    price: 69.99,
    description: 'Chaqueta vaquera clásica con botones metálicos. Un básico para cualquier armario.',
    imageUrl: 'https://images.unsplash.com/photo-1611312449408-fcece27cdbb7?q=80&w=1169&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'CHAQUETAS',
    colors: ['azul'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    url: 'https://elpecadomoda.com/chaqueta-vaquera'
  },
  {
    id: '6',
    name: 'Falda plisada',
    price: 49.99,
    description: 'Falda plisada midi con cintura elástica. Elegante y cómoda.',
    imageUrl: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?q=80&w=1964&auto=format&fit=crop',
    store: 'Mixture',
    category: 'FALDAS_SHORTS',
    colors: ['negro', 'beige', 'rojo'],
    sizes: ['XS', 'S', 'M', 'L'],
    url: 'https://mixture.com/falda-plisada'
  },
  {
    id: '7',
    name: 'Botas de cuero',
    price: 119.99,
    description: 'Botas de cuero con tacón medio y cremallera lateral. Versátiles y duraderas.',
    imageUrl: 'https://images.unsplash.com/photo-1605812860427-4024433a70fd?q=80&w=1035&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'CALZADO',
    colors: ['negro', 'marrón'],
    sizes: ['36', '37', '38', '39', '40'],
    url: 'https://elpecadomoda.com/botas-cuero'
  },
  {
    id: '8',
    name: 'Collar de perlas',
    price: 39.99,
    description: 'Collar de perlas sintéticas con cierre de plata. Elegante y atemporal.',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1887&auto=format&fit=crop',
    store: 'Mixture',
    category: 'JOYERIA',
    colors: ['blanco'],
    sizes: ['única'],
    url: 'https://mixture.com/collar-perlas'
  },
  {
    id: '9',
    name: 'Jersey de punto',
    price: 59.99,
    description: 'Jersey de punto grueso con cuello redondo. Cálido y confortable.',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1972&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'PUNTO',
    colors: ['gris', 'beige', 'azul marino'],
    sizes: ['S', 'M', 'L', 'XL'],
    url: 'https://elpecadomoda.com/jersey-punto'
  },
  {
    id: '10',
    name: 'Camiseta básica',
    price: 19.99,
    description: 'Camiseta básica de algodón con cuello redondo. Un básico imprescindible.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1780&auto=format&fit=crop',
    store: 'Mixture',
    category: 'CAMISETAS',
    colors: ['blanco', 'negro', 'gris', 'azul'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    url: 'https://mixture.com/camiseta-basica'
  },
  {
    id: '11',
    name: 'Bolso de cuero',
    price: 89.99,
    description: 'Bolso de cuero con asas y correa ajustable. Espacioso y elegante.',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?q=80&w=876&auto=format&fit=crop',
    store: 'ElPecadoModa',
    category: 'ACCESORIOS',
    colors: ['negro', 'marrón', 'camel'],
    sizes: ['única'],
    url: 'https://elpecadomoda.com/bolso-cuero'
  },
  {
    id: '12',
    name: 'Vestido de noche',
    price: 149.99,
    description: 'Vestido largo de noche con escote en V y abertura lateral. Elegante y sofisticado.',
    imageUrl: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=1908&auto=format&fit=crop',
    store: 'Mixture',
    category: 'VESTIDOS',
    colors: ['negro', 'rojo', 'azul noche'],
    sizes: ['XS', 'S', 'M', 'L'],
    url: 'https://mixture.com/vestido-noche'
  }
];

export const getProductsByCategory = (category: string) => {
  return products.filter(product => product.category === category);
};

export const getProductsByStore = (store: 'ElPecadoModa' | 'Mixture') => {
  return products.filter(product => product.store === store);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const searchProducts = (query: string) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(
    product => 
      product.name.toLowerCase().includes(lowercaseQuery) || 
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery) ||
      product.colors.some(color => color.toLowerCase().includes(lowercaseQuery))
  );
};