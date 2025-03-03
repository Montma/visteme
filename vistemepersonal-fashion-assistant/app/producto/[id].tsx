import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView, useColorScheme, Linking } from 'react-native';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { getProductById } from '@/mocks/products';
import Colors from '@/constants/colors';
import { Heart, ShoppingBag, Share2, Shirt } from 'lucide-react-native';
import { useFittingRoomStore } from '@/store/fitting-room-store';

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const { addItem } = useFittingRoomStore();
  
  const product = getProductById(id as string);

  if (!product) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>Producto no encontrado</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Volver</Text>
        </Pressable>
      </View>
    );
  }

  const handleBuy = () => {
    Linking.openURL(product.url);
  };

  const handleTryOn = () => {
    addItem({
      id: Date.now().toString(),
      productId: product.id,
      date: new Date().toISOString(),
    });
    router.push('/probador');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen 
        options={{
          title: product.name,
          headerRight: () => (
            <Pressable style={styles.headerButton}>
              <Heart size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView>
        <Image
          source={{ uri: product.imageUrl }}
          style={styles.image}
          contentFit="cover"
        />
        
        <View style={styles.content}>
          <Text style={[styles.store, { color: colors.primary }]}>{product.store}</Text>
          <Text style={[styles.name, { color: colors.text }]}>{product.name}</Text>
          <Text style={[styles.price, { color: colors.text }]}>{product.price.toFixed(2)} €</Text>
          
          <Text style={[styles.description, { color: colors.text }]}>{product.description}</Text>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Colores disponibles</Text>
            <View style={styles.colorsContainer}>
              {product.colors.map((color, index) => (
                <View key={index} style={styles.colorItem}>
                  <View 
                    style={[
                      styles.colorSwatch, 
                      { backgroundColor: colorToHex(color) }
                    ]} 
                  />
                  <Text style={[styles.colorName, { color: colors.text }]}>{capitalizeFirstLetter(color)}</Text>
                </View>
              ))}
            </View>
          </View>
          
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Tallas disponibles</Text>
            <View style={styles.sizesContainer}>
              {product.sizes.map((size) => (
                <View 
                  key={size} 
                  style={[
                    styles.sizeButton, 
                    { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
                  ]}
                >
                  <Text style={[styles.sizeText, { color: colors.text }]}>{size}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={[styles.footer, { backgroundColor: colors.card }]}>
        <Pressable 
          style={[styles.tryOnButton, { backgroundColor: colors.secondary }]} 
          onPress={handleTryOn}
        >
          <Shirt size={20} color="white" />
          <Text style={styles.tryOnButtonText}>Probar</Text>
        </Pressable>
        <Pressable 
          style={[styles.buyButton, { backgroundColor: colors.primary }]} 
          onPress={handleBuy}
        >
          <ShoppingBag size={20} color="white" />
          <Text style={styles.buyButtonText}>Comprar</Text>
        </Pressable>
        <Pressable style={[styles.shareButton, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]}>
          <Share2 size={20} color={colors.text} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Helper functions
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function colorToHex(colorName: string): string {
  const colorMap: Record<string, string> = {
    'negro': '#000000',
    'blanco': '#FFFFFF',
    'gris': '#808080',
    'azul': '#0000FF',
    'azul marino': '#000080',
    'rojo': '#FF0000',
    'verde': '#008000',
    'amarillo': '#FFFF00',
    'rosa': '#FFC0CB',
    'morado': '#800080',
    'naranja': '#FFA500',
    'marrón': '#A52A2A',
    'beige': '#F5F5DC',
    'camel': '#C19A6B',
    'multicolor': 'linear-gradient(to right, red, orange, yellow, green, blue, indigo, violet)',
  };
  
  return colorMap[colorName.toLowerCase()] || '#CCCCCC';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    padding: 8,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 16,
  },
  backLink: {
    fontSize: 16,
    fontWeight: '600',
  },
  image: {
    width: '100%',
    height: 400,
  },
  content: {
    padding: 16,
  },
  store: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  colorSwatch: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  colorName: {
    fontSize: 12,
  },
  sizesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  sizeButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  tryOnButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginRight: 8,
    gap: 8,
  },
  tryOnButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
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
  shareButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
});