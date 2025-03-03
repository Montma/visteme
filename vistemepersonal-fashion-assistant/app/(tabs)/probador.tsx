import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/auth-store';
import { useFittingRoomStore } from '@/store/fitting-room-store';
import { products } from '@/mocks/products';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import FittingRoomItem from '@/components/FittingRoomItem';
import { Camera, Plus } from 'lucide-react-native';

export default function FittingRoomScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { items } = useFittingRoomStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const handleAddItem = () => {
    router.push('/probador/nuevo');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Probador Virtual</Text>
        <Text style={[styles.subtitle, { color: colors.placeholder }]}>
          Prueba prendas virtualmente antes de comprarlas
        </Text>
      </View>

      <Pressable 
        style={[styles.addButton, { backgroundColor: colors.primary }]} 
        onPress={handleAddItem}
      >
        <Plus size={20} color="white" />
        <Text style={styles.addButtonText}>Probar nueva prenda</Text>
      </Pressable>

      {items.length > 0 ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <FittingRoomItem item={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Camera size={64} color={colors.placeholder} />
          <Text style={[styles.emptyTitle, { color: colors.text }]}>
            No tienes prendas en el probador
          </Text>
          <Text style={[styles.emptySubtitle, { color: colors.placeholder }]}>
            Añade prendas para probarlas virtualmente
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
});