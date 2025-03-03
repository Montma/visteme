import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import { colorPalettes } from '@/mocks/colorimetry';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import ColorimetryCard from '@/components/ColorimetryCard';
import { Camera, ImageIcon, Palette } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ColorimetryScreen() {
  const [analyzing, setAnalyzing] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { user, updateColorimetry } = useUserStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

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
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      analyzeImage(result.assets[0].uri);
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      analyzeImage(result.assets[0].uri);
    }
  };

  const analyzeImage = (uri: string) => {
    setAnalyzing(true);
    
    // Simulate analysis with a timeout
    setTimeout(() => {
      // Randomly select a season for demo purposes
      const seasons = ['primavera', 'verano', 'otoño', 'invierno'];
      const randomSeason = seasons[Math.floor(Math.random() * seasons.length)] as 'primavera' | 'verano' | 'otoño' | 'invierno';
      
      const selectedPalette = colorPalettes.find(palette => palette.season === randomSeason);
      
      if (selectedPalette) {
        updateColorimetry({
          season: randomSeason,
          favorableColors: selectedPalette.favorableColors,
          unfavorableColors: selectedPalette.unfavorableColors,
          date: new Date().toISOString(),
        });
      }
      
      setAnalyzing(false);
      router.push('/colorimetria/resultado');
    }, 2000);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Colorimetría Personal</Text>
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>
            Descubre qué colores favorecen tu tono de piel
          </Text>
        </View>

        {user?.colorimetry ? (
          <ColorimetryCard colorimetry={user.colorimetry} />
        ) : null}

        <View style={[styles.card, { backgroundColor: colors.card }]}>
          <Palette size={32} color={colors.primary} style={styles.cardIcon} />
          <Text style={[styles.cardTitle, { color: colors.text }]}>
            Análisis de Colorimetría
          </Text>
          <Text style={[styles.cardDescription, { color: colors.placeholder }]}>
            Toma o sube una foto de tu rostro con buena iluminación natural para analizar tu colorimetría personal.
          </Text>
          
          <View style={styles.buttonContainer}>
            {Platform.OS !== 'web' && (
              <Pressable 
                style={[styles.button, { backgroundColor: colors.primary }]} 
                onPress={takePhoto}
                disabled={analyzing}
              >
                <Camera size={20} color="white" />
                <Text style={styles.buttonText}>Tomar foto</Text>
              </Pressable>
            )}
            <Pressable 
              style={[styles.button, { backgroundColor: colors.secondary }]} 
              onPress={pickImage}
              disabled={analyzing}
            >
              <ImageIcon size={20} color="white" />
              <Text style={styles.buttonText}>Subir foto</Text>
            </Pressable>
          </View>

          {analyzing && (
            <Text style={[styles.analyzingText, { color: colors.primary }]}>
              Analizando tu colorimetría...
            </Text>
          )}
        </View>

        <View style={[styles.infoCard, { backgroundColor: colors.card }]}>
          <Text style={[styles.infoTitle, { color: colors.text }]}>
            ¿Qué es la colorimetría?
          </Text>
          <Text style={[styles.infoText, { color: colors.placeholder }]}>
            La colorimetría personal es el estudio de los colores que mejor se adaptan a tu tono de piel, color de ojos y cabello.
          </Text>
          <Text style={[styles.infoText, { color: colors.placeholder }]}>
            Se clasifica en cuatro estaciones: Primavera, Verano, Otoño e Invierno, cada una con su paleta de colores específica.
          </Text>
          <Text style={[styles.infoText, { color: colors.placeholder }]}>
            Conocer tu colorimetría te ayudará a elegir prendas que realcen tu belleza natural y te hagan lucir más radiante.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  card: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 8,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    gap: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  analyzingText: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
  },
  infoCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
});