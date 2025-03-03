import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Pressable, Platform } from 'react-native';
import { Send, Camera, Image as ImageIcon } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  onSendImage: (uri: string) => void;
}

export default function ChatInput({ onSendMessage, onSendImage }: ChatInputProps) {
  const [message, setMessage] = useState('');
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onSendImage(result.assets[0].uri);
    }
  };

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
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      onSendImage(result.assets[0].uri);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      {Platform.OS !== 'web' && (
        <Pressable style={styles.iconButton} onPress={takePhoto}>
          <Camera size={24} color={colors.primary} />
        </Pressable>
      )}
      <Pressable style={styles.iconButton} onPress={pickImage}>
        <ImageIcon size={24} color={colors.primary} />
      </Pressable>
      <TextInput
        style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5', color: colors.text }]}
        placeholder="Escribe un mensaje..."
        placeholderTextColor={colors.placeholder}
        value={message}
        onChangeText={setMessage}
        multiline
        maxLength={500}
      />
      <Pressable 
        style={[styles.sendButton, { backgroundColor: colors.primary }]} 
        onPress={handleSend}
        disabled={!message.trim()}
      >
        <Send size={20} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  iconButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginHorizontal: 8,
    maxHeight: 100,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});