import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, SafeAreaView, Platform } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/auth-store';
import { useFittingRoomStore } from '@/store/fitting-room-store';
import { products } from '@/mocks/products';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { Camera, ImageIcon, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import ProductCard from '@/components/ProductCard';

export default function NewFittingRoomItemScreen() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addItem } = useFittingRoomStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const takePhoto = async () => {
    if (Platform.OS === 'web') {
      alert('Esta función no está disponible en la web');
      return;
    }
    
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      alert('Se necesita permiso para acceder a la cámara');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUserImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setUserImage(result.assets[0].uri);
    }
  };

  const handleSelectProduct = (productId: string) => {
    setSelectedProduct(productId);
  };

  const handleCreateFitting = () => {
    if (!selectedProduct) {
      alert('Por favor, selecciona una prenda');
      return;
    }

    if (!userImage) {
      alert('Por favor, sube o toma una foto');
      return;
    }

    setProcessing(true);

    // Simulate processing with a timeout
    setTimeout(() => {
      const newItem = {
        id: Date.now().toString(),
        productId: selectedProduct,
        userImage,
        date: new Date().toISOString(),
      };
      
      addItem(newItem);
      setProcessing(false);
      router.replace('/probador');
    }, 2000);
  };

  if (!isAuthenticated) {
    router.replace('/');
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen options={{ title: 'Probar Prenda' }} />
      
      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>1. Selecciona una prenda</Text>
        <FlatList
          data={products}
          renderItem={({ item }) => (
            <Pressable 
              style={[
                styles.productItem,
                selectedProduct === item.id && { borderColor: colors.primary, borderWidth: 2 }
              ]}
              onPress={() => handleSelectProduct(item.id)}
            >
              <ProductCard product={item} compact />
              {selectedProduct === item.id && (
                <View style={[styles.selectedBadge, { backgroundColor: colors.primary }]}>
                  <Check size={16} color="white" />
                </View>
              )}
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.productList}
        />

        <Text style={[styles.sectionTitle, { color: colors.text }]}>2. Sube o toma una foto</Text>
        <View style={styles.imageSection}>
          {userImage ? (
            <View style={styles.userImageContainer}>
              <Image
                source={{ uri: userImage }}
                style={styles.userImage}
                contentFit="cover"
              />
              <Pressable 
                style={[styles.changeImageButton, { backgroundColor: colors.primary }]}
                onPress={pickImage}
              >
                <Text style={styles.changeImageButtonText}>Cambiar imagen</Text>
              </Pressable>
            </View>
          ) : (
            <View style={styles.imageButtons}>
              {Platform.OS !== 'web' && (
                <Pressable 
                  style={[styles.imageButton, { backgroundColor: colors.primary }]}
                  onPress={takePhoto}
                >
                  <Camera size={24} color="white" style={styles.buttonIcon} />
                  <Text style={styles.imageButtonText}>Tomar foto</Text>
                </Pressable>
              )}
              <Pressable 
                style={[styles.imageButton, { backgroundColor: colors.secondary }]}
                onPress={pickImage}
              >
                <ImageIcon size={24} color="white" style={styles.buttonIcon} />
                <Text style={styles.imageButtonText}>Subir foto</Text>
              </Pressable>
            </View>
          )}
        </View>

        <Pressable 
          style={[
            styles.createButton, 
            { backgroundColor: colors.primary },
            (!selectedProduct || !userImage || processing) && { opacity: 0.6 }
          ]} 
          onPress={handleCreateFitting}
          disabled={!selectedProduct || !userImage || processing}
        >
          <Text style={styles.createButtonText}>
            {processing ? 'Procesando...' : 'Crear Prueba Virtual'}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  productList: {
    paddingVertical: 8,
  },
  productItem: {
    position: 'relative',
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageSection: {
    marginBottom: 24,
  },
  imageButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },
  imageButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  buttonIcon: {
    marginRight: 8,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  userImageContainer: {
    alignItems: 'center',
  },
  userImage: {
    width: 200,
    height: 266,
    borderRadius: 8,
    marginBottom: 12,
  },
  changeImageButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  changeImageButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  createButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 'auto',
  },
  createButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});