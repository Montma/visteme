import React from 'react';
import { StyleSheet, View, Text, ScrollView, Pressable, SafeAreaView } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUserStore } from '@/store/user-store';
import { getColorPalette } from '@/mocks/colorimetry';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { Share2 } from 'lucide-react-native';

export default function ColorimetryResultScreen() {
  const router = useRouter();
  const { user } = useUserStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  if (!user?.colorimetry) {
    return (
      <View style={[styles.notFound, { backgroundColor: colors.background }]}>
        <Text style={[styles.notFoundText, { color: colors.text }]}>No hay resultados de colorimetría</Text>
        <Pressable onPress={() => router.push('/colorimetria')}>
          <Text style={[styles.backLink, { color: colors.primary }]}>Realizar análisis</Text>
        </Pressable>
      </View>
    );
  }

  const colorPalette = getColorPalette(user.colorimetry.season);

  const getSeasonName = (season: string): string => {
    const seasons: Record<string, string> = {
      'primavera': 'Primavera',
      'verano': 'Verano',
      'otoño': 'Otoño',
      'invierno': 'Invierno'
    };
    return seasons[season] || season;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <Stack.Screen 
        options={{
          title: 'Tu Colorimetría',
          headerRight: () => (
            <Pressable style={styles.headerButton}>
              <Share2 size={24} color={colors.text} />
            </Pressable>
          ),
        }} 
      />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={[styles.header, { backgroundColor: colors.card }]}>
          <Text style={[styles.title, { color: colors.text }]}>
            Tu colorimetría es: {getSeasonName(user.colorimetry.season)}
          </Text>
          <Text style={[styles.date, { color: colors.placeholder }]}>
            Análisis realizado el {new Date(user.colorimetry.date).toLocaleDateString()}
          </Text>
          {colorPalette && (
            <Text style={[styles.description, { color: colors.text }]}>
              {colorPalette.description}
            </Text>
          )}
        </View>

        {colorPalette && (
          <>
            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Características</Text>
              {colorPalette.characteristics.map((characteristic, index) => (
                <View key={index} style={styles.characteristicItem}>
                  <View style={[styles.bullet, { backgroundColor: colors.primary }]} />
                  <Text style={[styles.characteristicText, { color: colors.text }]}>
                    {characteristic}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Colores que te favorecen</Text>
              <View style={styles.colorsContainer}>
                {user.colorimetry.favorableColors.map((color, index) => (
                  <View key={index} style={styles.colorItem}>
                    <View 
                      style={[
                        styles.colorSwatch, 
                        { backgroundColor: color }
                      ]} 
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Colores a evitar</Text>
              <View style={styles.colorsContainer}>
                {user.colorimetry.unfavorableColors.map((color, index) => (
                  <View key={index} style={styles.colorItem}>
                    <View 
                      style={[
                        styles.colorSwatch, 
                        { backgroundColor: color }
                      ]} 
                    />
                  </View>
                ))}
              </View>
            </View>

            <View style={[styles.section, { backgroundColor: colors.card }]}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>Recomendaciones</Text>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                • Busca prendas en los colores que te favorecen para realzar tu tono de piel.
              </Text>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                • Utiliza los colores a evitar solo como acentos, lejos de tu rostro.
              </Text>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                • Para ocasiones formales, elige tonos neutros de tu paleta.
              </Text>
              <Text style={[styles.recommendationText, { color: colors.text }]}>
                • Complementa tu guardarropa con accesorios en colores que te favorecen.
              </Text>
            </View>
          </>
        )}

        <Pressable 
          style={[styles.button, { backgroundColor: colors.primary }]} 
          onPress={() => router.push('/colorimetria')}
        >
          <Text style={styles.buttonText}>Volver a Colorimetría</Text>
        </Pressable>
      </ScrollView>
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
  scrollContent: {
    padding: 16,
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
  header: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
  },
  section: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  characteristicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bullet: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  characteristicText: {
    fontSize: 16,
    lineHeight: 22,
  },
  colorsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorItem: {
    alignItems: 'center',
    marginBottom: 8,
  },
  colorSwatch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  recommendationText: {
    fontSize: 16,
    lineHeight: 22,
    marginBottom: 8,
  },
  button: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});