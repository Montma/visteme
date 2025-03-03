import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { Product } from '@/types';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handlePress = () => {
    router.push(`/producto/${product.id}`);
  };

  return (
    <Pressable 
      style={[
        styles.container, 
        compact ? styles.compactContainer : {}, 
        { backgroundColor: colors.card }
      ]} 
      onPress={handlePress}
    >
      <Image
        source={{ uri: product.imageUrl }}
        style={compact ? styles.compactImage : styles.image}
        contentFit="cover"
        transition={200}
      />
      <View style={compact ? styles.compactContent : styles.content}>
        <Text 
          style={[
            styles.store, 
            compact ? styles.compactStore : {}, 
            { color: colors.primary }
          ]}
        >
          {product.store}
        </Text>
        <Text 
          style={[
            styles.name, 
            compact ? styles.compactName : {}, 
            { color: colors.text }
          ]} 
          numberOfLines={compact ? 1 : 2}
        >
          {product.name}
        </Text>
        <Text 
          style={[
            styles.price, 
            compact ? styles.compactPrice : {}, 
            { color: colors.text }
          ]}
        >
          {product.price.toFixed(2)} €
        </Text>
        {!compact && (
          <Text 
            style={[styles.description, { color: colors.placeholder }]} 
            numberOfLines={2}
          >
            {product.description}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  compactContainer: {
    width: 160,
    marginRight: 12,
  },
  image: {
    width: '100%',
    height: 200,
  },
  compactImage: {
    width: '100%',
    height: 160,
  },
  content: {
    padding: 12,
  },
  compactContent: {
    padding: 8,
  },
  store: {
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 4,
  },
  compactStore: {
    fontSize: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  compactName: {
    fontSize: 14,
  },
  price: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 6,
  },
  compactPrice: {
    fontSize: 13,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
  },
});