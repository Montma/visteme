import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView, Switch, TextInput, SafeAreaView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Image } from 'expo-image';
import { useAuthStore } from '@/store/auth-store';
import { useUserStore } from '@/store/user-store';
import { useChatStore } from '@/store/chat-store';
import { useFittingRoomStore } from '@/store/fitting-room-store';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { LogOut, Camera, User, Settings, Heart, Shirt, Palette } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { Size } from '@/types';

export default function ProfileScreen() {
  const router = useRouter();
  const { isAuthenticated, logout } = useAuthStore();
  const { user, updateProfile, updateSize, updateFavoriteColors, updatePreferredStyles, updateProfilePicture, clearUser } = useUserStore();
  const { clearMessages } = useChatStore();
  const { clearItems } = useFittingRoomStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const [name, setName] = useState(user?.name || '');
  const [selectedSize, setSelectedSize] = useState<Size | undefined>(user?.size);
  
  // Style preferences
  const styleOptions = ['Casual', 'Formal', 'Deportivo', 'Elegante', 'Bohemio', 'Minimalista'];
  const [selectedStyles, setSelectedStyles] = useState<string[]>(user?.preferredStyles || []);

  // Color preferences
  const colorOptions = [
    { name: 'Negro', value: '#000000' },
    { name: 'Blanco', value: '#FFFFFF' },
    { name: 'Azul', value: '#0000FF' },
    { name: 'Rojo', value: '#FF0000' },
    { name: 'Verde', value: '#008000' },
    { name: 'Amarillo', value: '#FFFF00' },
    { name: 'Rosa', value: '#FFC0CB' },
    { name: 'Morado', value: '#800080' },
    { name: 'Naranja', value: '#FFA500' },
    { name: 'Gris', value: '#808080' },
    { name: 'Marrón', value: '#A52A2A' },
    { name: 'Beige', value: '#F5F5DC' },
  ];
  const [selectedColors, setSelectedColors] = useState<string[]>(user?.favoriteColors || []);

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setSelectedSize(user.size);
      setSelectedStyles(user.preferredStyles);
      setSelectedColors(user.favoriteColors);
    }
  }, [user]);

  const handleLogout = () => {
    logout();
    clearUser();
    clearMessages();
    clearItems();
    router.replace('/');
  };

  const handleUpdateProfile = () => {
    updateProfile({ name });
    updateSize(selectedSize);
    updateFavoriteColors(selectedColors);
    updatePreferredStyles(selectedStyles);
    alert('Perfil actualizado correctamente');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      updateProfilePicture(result.assets[0].uri);
    }
  };

  const toggleStyle = (style: string) => {
    if (selectedStyles.includes(style)) {
      setSelectedStyles(selectedStyles.filter(s => s !== style));
    } else {
      setSelectedStyles([...selectedStyles, style]);
    }
  };

  const toggleColor = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter(c => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Pressable style={styles.profileImageContainer} onPress={pickImage}>
            {user.profilePicture ? (
              <Image
                source={{ uri: user.profilePicture }}
                style={styles.profileImage}
                contentFit="cover"
              />
            ) : (
              <View style={[styles.profileImagePlaceholder, { backgroundColor: colors.primary }]}>
                <User size={40} color="white" />
              </View>
            )}
            <View style={[styles.cameraButton, { backgroundColor: colors.secondary }]}>
              <Camera size={16} color="white" />
            </View>
          </Pressable>
          
          <Text style={[styles.email, { color: colors.placeholder }]}>{user.email}</Text>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <User size={16} color={colors.primary} style={styles.sectionIcon} /> Información Personal
          </Text>
          
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Nombre</Text>
            <TextInput
              style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5', color: colors.text }]}
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: colors.text }]}>Talla</Text>
            <View style={styles.sizeContainer}>
              {(['XS', 'S', 'M', 'L', 'XL', 'XXL'] as Size[]).map((size) => (
                <Pressable
                  key={size}
                  style={[
                    styles.sizeButton,
                    selectedSize === size ? 
                      { backgroundColor: colors.primary } : 
                      { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
                  ]}
                  onPress={() => setSelectedSize(size)}
                >
                  <Text 
                    style={[
                      styles.sizeButtonText, 
                      { color: selectedSize === size ? 'white' : colors.text }
                    ]}
                  >
                    {size}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Heart size={16} color={colors.primary} style={styles.sectionIcon} /> Preferencias de Estilo
          </Text>
          
          <View style={styles.styleContainer}>
            {styleOptions.map((style) => (
              <Pressable
                key={style}
                style={[
                  styles.styleButton,
                  selectedStyles.includes(style) ? 
                    { backgroundColor: colors.primary } : 
                    { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }
                ]}
                onPress={() => toggleStyle(style)}
              >
                <Text 
                  style={[
                    styles.styleButtonText, 
                    { color: selectedStyles.includes(style) ? 'white' : colors.text }
                  ]}
                >
                  {style}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: colors.card }]}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            <Palette size={16} color={colors.primary} style={styles.sectionIcon} /> Colores Favoritos
          </Text>
          
          <View style={styles.colorContainer}>
            {colorOptions.map((color) => (
              <Pressable
                key={color.value}
                style={[
                  styles.colorButton,
                  { backgroundColor: color.value },
                  selectedColors.includes(color.value) && styles.colorButtonSelected
                ]}
                onPress={() => toggleColor(color.value)}
              >
                {selectedColors.includes(color.value) && (
                  <View style={styles.colorCheck} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <Pressable 
          style={[styles.saveButton, { backgroundColor: colors.primary }]} 
          onPress={handleUpdateProfile}
        >
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </Pressable>

        <Pressable 
          style={[styles.logoutButton, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]} 
          onPress={handleLogout}
        >
          <LogOut size={20} color={colors.notification} />
          <Text style={[styles.logoutButtonText, { color: colors.notification }]}>Cerrar Sesión</Text>
        </Pressable>
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
    alignItems: 'center',
    marginBottom: 24,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileImagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  email: {
    fontSize: 16,
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
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 8,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  sizeContainer: {
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
  sizeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  styleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  styleButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  styleButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  colorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorButtonSelected: {
    borderWidth: 2,
    borderColor: '#3B82F6',
  },
  colorCheck: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  saveButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    padding: 14,
    marginBottom: 16,
    gap: 8,
  },
  logoutButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});