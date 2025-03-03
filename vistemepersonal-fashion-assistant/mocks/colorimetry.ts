import { ColorSeason } from '@/types';

export interface ColorPalette {
  season: ColorSeason;
  description: string;
  favorableColors: string[];
  unfavorableColors: string[];
  characteristics: string[];
}

export const colorPalettes: ColorPalette[] = [
  {
    season: 'primavera',
    description: 'Tu paleta es cálida y brillante, con tonos vibrantes y luminosos.',
    favorableColors: [
      '#FF5733', // Coral
      '#FFD700', // Dorado
      '#32CD32', // Verde lima
      '#87CEEB', // Azul cielo
      '#FF69B4', // Rosa cálido
      '#FFA500', // Naranja
      '#FFFF00', // Amarillo
      '#00FF7F', // Verde primavera
      '#FF4500', // Rojo-naranja
      '#FF8C00'  // Naranja oscuro
    ],
    unfavorableColors: [
      '#000000', // Negro
      '#808080', // Gris
      '#4B0082', // Índigo
      '#800000', // Granate
      '#008080'  // Verde azulado
    ],
    characteristics: [
      'Piel con subtono cálido y dorado',
      'Ojos brillantes y claros',
      'Cabello con reflejos dorados o cobrizos',
      'Favorecen los colores cálidos y brillantes'
    ]
  },
  {
    season: 'verano',
    description: 'Tu paleta es fría y suave, con tonos pastel y delicados.',
    favorableColors: [
      '#ADD8E6', // Azul claro
      '#D8BFD8', // Lavanda
      '#F08080', // Coral claro
      '#20B2AA', // Verde agua
      '#778899', // Gris azulado
      '#BC8F8F', // Rosado grisáceo
      '#B0C4DE', // Azul acero claro
      '#F0E68C', // Caqui
      '#E6E6FA', // Lavanda claro
      '#AFEEEE'  // Turquesa pálido
    ],
    unfavorableColors: [
      '#FF4500', // Rojo-naranja
      '#FF8C00', // Naranja oscuro
      '#FFD700', // Dorado
      '#8B4513', // Marrón
      '#000000'  // Negro intenso
    ],
    characteristics: [
      'Piel con subtono frío y rosado',
      'Ojos suaves, a menudo azules o grises',
      'Cabello con tonos ceniza',
      'Favorecen los colores fríos y suaves'
    ]
  },
  {
    season: 'otoño',
    description: 'Tu paleta es cálida y profunda, con tonos terrosos y ricos.',
    favorableColors: [
      '#8B4513', // Marrón
      '#A0522D', // Siena
      '#CD853F', // Ocre
      '#556B2F', // Verde oliva
      '#B8860B', // Dorado oscuro
      '#800000', // Granate
      '#DAA520', // Dorado
      '#BDB76B', // Caqui oscuro
      '#D2691E', // Chocolate
      '#A52A2A'  // Marrón rojizo
    ],
    unfavorableColors: [
      '#000000', // Negro
      '#FF69B4', // Rosa fuerte
      '#00FFFF', // Cian
      '#87CEEB', // Azul cielo
      '#E6E6FA'  // Lavanda claro
    ],
    characteristics: [
      'Piel con subtono cálido y dorado',
      'Ojos intensos, a menudo marrones o verdes',
      'Cabello con tonos cobrizos o castaños',
      'Favorecen los colores cálidos y terrosos'
    ]
  },
  {
    season: 'invierno',
    description: 'Tu paleta es fría y contrastante, con tonos intensos y claros.',
    favorableColors: [
      '#000000', // Negro
      '#FFFFFF', // Blanco puro
      '#FF0000', // Rojo
      '#0000FF', // Azul
      '#800080', // Púrpura
      '#006400', // Verde oscuro
      '#4B0082', // Índigo
      '#DC143C', // Carmesí
      '#00008B', // Azul oscuro
      '#008080'  // Verde azulado
    ],
    unfavorableColors: [
      '#D2691E', // Chocolate
      '#CD853F', // Ocre
      '#F5DEB3', // Trigo
      '#F0E68C', // Caqui
      '#FFD700'  // Dorado
    ],
    characteristics: [
      'Piel con subtono frío y azulado',
      'Ojos intensos y contrastantes',
      'Cabello oscuro o muy claro sin tonos dorados',
      'Favorecen los colores fríos e intensos'
    ]
  }
];

export const getColorPalette = (season: ColorSeason): ColorPalette | undefined => {
  return colorPalettes.find(palette => palette.season === season);
};