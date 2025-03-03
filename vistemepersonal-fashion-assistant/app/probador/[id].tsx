import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, SafeAreaView, useColorScheme, Platform } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useFittingRoomStore } from '@/store/fitting-room-store';
import { getProductById } from '@/mocks/products';
import Colors from '@/constants/colors';
import { Share2, ShoppingBag, Trash2 } from 'lucide-react-native';

export default function FittingRoomDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { items, removeItem } = useFittingRoomStore();
  
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  
  const item = items.find(item => item.id === id);
  const product = item ? getProductById(item.productId) : null;

  useEffect(() => {
    if (!item || !product) {
      router.replace('/probador');
    }
  }, [item, product, router]);

  const handleShare = () => {
    // In a real app, this would use the Share API
    alert('Compartir funcionalidad');
  };

  const handleDelete = () => {
    setShowConfirmDelete(true);
  };

  const confirmDelete = () => {
    if (item) {
      removeItem(item.id);
      router.replace('/probador');
    }
  };

  const cancelDelete = () => {
    setShowConfirmDelete(false);
  };

  if (!item || !product) {
    return null;
  }

  // For demo purposes, we'll use the product image as the "result" if no result image exists
  const resultImage = item.resultImage || product.imageUrl;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen 
        options={{
          title: 'Probador Virtual',
          headerRight: () => (
            <Pressable style={styles.headerButton} onPress={handleShare}>
              <Share2 size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      
      <View style={styles.content}>
        <Text style={[styles.productName, { color: colors.text }]}>{product.name}</Text>
        <Text style={[styles.store, { color: colors.primary }]}>{product.store}</Text>
        
        <View style={styles.imagesContainer}>
          <View style={styles.imageWrapper}>
            <Text style={[styles.imageLabel, { color: colors.text }]}>Original</Text>
            <Image
              source={{ uri: product.imageUrl }}
              style={styles.productImage}
              contentFit="cover"
            />
          </View>
          
          <View style={styles.imageWrapper}>
            <Text style={[styles.imageLabel, { color: colors.text }]}>Resultado</Text>
            <Image
              source={{ uri: resultImage }}
              style={styles.resultImage}
              contentFit="cover"
            />
          </View>
        </View>
        
        <View style={styles.infoCard}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>Información</Text>
          <Text style={[styles.infoText, { color: colors.placeholder }]}>
            Prueba virtual creada el {new Date(item.date).toLocaleDateString()}
          </Text>
          <Text style={[styles.infoText, { color: colors.placeholder }]}>
            Precio: {product.price.toFixed(2)} €
          </Text>
        </View>
        
        <View style={styles.actions}>
          <Pressable 
            style={[styles.buyButton, { backgroundColor: colors.primary }]} 
            onPress={() => router.push(`/producto/${product.id}`)}
          >
            <ShoppingBag size={20} color="white" />
            <Text style={styles.buyButtonText}>Ver Producto</Text>
          </Pressable>
          
          <Pressable 
            style={[styles.deleteButton, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]} 
            onPress={handleDelete}
          >
            <Trash2 size={20} color={colors.notification} />
            <Text style={[styles.deleteButtonText, { color: colors.notification }]}>Eliminar</Text>
          </Pressable>
        </View>
      </View>
      
      {showConfirmDelete && (
        <View style={styles.confirmOverlay}>
          <View style={[styles.confirmDialog, { backgroundColor: colors.card }]}>
            <Text style={[styles.confirmTitle, { color: colors.text }]}>¿Eliminar prueba?</Text>
            <Text style={[styles.confirmText, { color: colors.placeholder }]}>
              Esta acción no se puede deshacer.
            </Text>
            <View style={styles.confirmButtons}>
              <Pressable 
                style={[styles.confirmButton, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]} 
                onPress={cancelDelete}
              >
                <Text style={[styles.confirmButtonText, { color: colors.text }]}>Cancelar</Text>
              </Pressable>
              <Pressable 
                style={[styles.confirmButton, { backgroundColor: colors.notification }]} 
                onPress={confirmDelete}
              >
                <Text style={[styles.confirmButtonText, { color: 'white' }]}>Eliminar</Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  store: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  imageLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  resultImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  infoCard: {
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 4,
  },
  actions: {
    flexDirection: 'row',
    marginTop: 'auto',
  },
  buyButton: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    gap: 8,
  },
  buyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  deleteButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  confirmOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  confirmDialog: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 12,
    padding: 20,
  },
  confirmTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 14,
    marginBottom: 20,
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  confirmButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  confirmButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
});