import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import ProductCard from './ProductCard';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { ChevronRight } from 'lucide-react-native';

interface ProductCarouselProps {
  title: string;
  products: Product[];
  onSeeAll?: () => void;
}

export default function ProductCarousel({ title, products, onSeeAll }: ProductCarouselProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handleSeeAll = () => {
    if (onSeeAll) {
      onSeeAll();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
        {onSeeAll && (
          <Pressable onPress={handleSeeAll} style={styles.seeAllButton}>
            <Text style={[styles.seeAllText, { color: colors.primary }]}>Ver todo</Text>
            <ChevronRight size={16} color={colors.primary} />
          </Pressable>
        )}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} compact />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
});