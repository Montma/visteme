import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';

const categories = [
  { id: 'ABRIGOS', name: 'Abrigos' },
  { id: 'CHAQUETAS', name: 'Chaquetas' },
  { id: 'VESTIDOS', name: 'Vestidos' },
  { id: 'FALDAS_SHORTS', name: 'Faldas y Shorts' },
  { id: 'PANTALONES', name: 'Pantalones' },
  { id: 'CAMISAS_BLUSAS', name: 'Camisas y Blusas' },
  { id: 'CAMISETAS', name: 'Camisetas' },
  { id: 'PUNTO', name: 'Punto' },
  { id: 'CALZADO', name: 'Calzado' },
  { id: 'ACCESORIOS', name: 'Accesorios' },
  { id: 'JOYERIA', name: 'Joyería' },
];

export default function CategoryList() {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handleCategoryPress = (categoryId: string) => {
    router.push(`/categoria/${categoryId}`);
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: colors.text }]}>Categorías</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => (
          <Pressable
            key={category.id}
            style={[
              styles.categoryButton,
              { backgroundColor: colors.primary }
            ]}
            onPress={() => handleCategoryPress(category.id)}
          >
            <Text style={styles.categoryText}>{category.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  categoryText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
});