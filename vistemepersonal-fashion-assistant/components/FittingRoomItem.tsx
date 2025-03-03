import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { FittingRoomItem as FittingRoomItemType } from '@/types';
import { getProductById } from '@/mocks/products';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { Eye, Share2 } from 'lucide-react-native';

interface FittingRoomItemProps {
  item: FittingRoomItemType;
}

export default function FittingRoomItem({ item }: FittingRoomItemProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  
  const product = getProductById(item.productId);

  const handlePress = () => {
    router.push(`/probador/${item.id}`);
  };

  const handleShare = () => {
    // In a real app, this would use the Share API
    alert('Compartir funcionalidad');
  };

  if (!product) return null;

  return (
    <Pressable 
      style={[styles.container, { backgroundColor: colors.card }]} 
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        {item.resultImage ? (
          <Image
            source={{ uri: item.resultImage }}
            style={styles.resultImage}
            contentFit="cover"
          />
        ) : (
          <View style={[styles.placeholderContainer, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]}>
            <Text style={[styles.placeholderText, { color: colors.placeholder }]}>
              Imagen pendiente
            </Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={[styles.date, { color: colors.placeholder }]}>
          {new Date(item.date).toLocaleDateString()}
        </Text>
        <View style={styles.actions}>
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.primary }]} 
            onPress={handlePress}
          >
            <Eye size={16} color="white" />
            <Text style={styles.actionText}>Ver</Text>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, { backgroundColor: colors.secondary }]} 
            onPress={handleShare}
          >
            <Share2 size={16} color="white" />
            <Text style={styles.actionText}>Compartir</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    width: 100,
    height: 120,
  },
  resultImage: {
    width: '100%',
    height: '100%',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 12,
    textAlign: 'center',
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 4,
  },
  actionText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '600',
  },
});