import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ColorimetryResult } from '@/types';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface ColorimetryCardProps {
  colorimetry: ColorimetryResult;
}

export default function ColorimetryCard({ colorimetry }: ColorimetryCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handlePress = () => {
    router.push('/colorimetria/resultado');
  };

  const getSeasonName = (season: string): string => {
    const seasons: Record<string, string> = {
      'primavera': 'Primavera',
      'verano': 'Verano',
      'otoño': 'Otoño',
      'invierno': 'Invierno'
    };
    return seasons[season] || season;
  };

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]} 
      onPress={handlePress}
    >
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>
          Tu colorimetría: {getSeasonName(colorimetry.season)}
        </Text>
        <Text style={[styles.date, { color: colors.placeholder }]}>
          Análisis realizado el {new Date(colorimetry.date).toLocaleDateString()}
        </Text>
        <View style={styles.colorsContainer}>
          <Text style={[styles.subtitle, { color: colors.text }]}>Colores favorables:</Text>
          <View style={styles.colorPalette}>
            {colorimetry.favorableColors.slice(0, 5).map((color, index) => (
              <View 
                key={index} 
                style={[styles.colorSwatch, { backgroundColor: color }]} 
              />
            ))}
          </View>
        </View>
      </View>
      <ChevronRight size={20} color={colors.placeholder} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginBottom: 12,
  },
  colorsContainer: {
    marginTop: 8,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  colorPalette: {
    flexDirection: 'row',
  },
  colorSwatch: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});