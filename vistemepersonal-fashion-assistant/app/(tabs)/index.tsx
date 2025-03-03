import React, { useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView, RefreshControl, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import { products, getProductsByStore } from '@/mocks/products';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import SearchBar from '@/components/SearchBar';
import CategoryList from '@/components/CategoryList';
import ProductCarousel from '@/components/ProductCarousel';

export default function InspirationScreen() {
  const [refreshing, setRefreshing] = React.useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { user } = useUserStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // In a real app, this would fetch fresh data
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  if (!isAuthenticated || !user) {
    return null;
  }

  const elPecadoProducts = getProductsByStore('ElPecadoModa');
  const mixtureProducts = getProductsByStore('Mixture');
  
  // Get recommended products based on user preferences (mock implementation)
  const getRecommendedProducts = () => {
    if (user.favoriteColors.length > 0 || user.preferredStyles.length > 0) {
      return products.slice(0, 4);
    }
    return products.slice(4, 8);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: colors.text }]}>
            ¡Hola, {user.name}!
          </Text>
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>
            Descubre tu estilo personal
          </Text>
        </View>

        <SearchBar />
        <CategoryList />

        <ProductCarousel
          title="Recomendado para ti"
          products={getRecommendedProducts()}
          onSeeAll={() => router.push('/buscar?q=recomendado')}
        />

        <ProductCarousel
          title="El Pecado Moda"
          products={elPecadoProducts}
          onSeeAll={() => router.push('/tienda/1')}
        />

        <ProductCarousel
          title="Mixture"
          products={mixtureProducts}
          onSeeAll={() => router.push('/tienda/2')}
        />

        <ProductCarousel
          title="Novedades"
          products={products.slice().reverse()}
          onSeeAll={() => router.push('/buscar?q=novedades')}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 8,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
});