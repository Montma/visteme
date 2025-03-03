import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, FlatList, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useAuthStore } from '@/store/auth-store';
import { useChatStore } from '@/store/chat-store';
import { ChatMessage as ChatMessageType } from '@/types';
import { searchProducts } from '@/mocks/products';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';

export default function AssistantScreen() {
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { messages, addMessage } = useChatStore();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace('/');
    }
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (messages.length === 0) {
      // Add welcome message if no messages exist
      addMessage({
        id: '1',
        text: '¡Hola! Soy tu asistente personal de moda. ¿En qué puedo ayudarte hoy? Puedes preguntarme sobre tendencias, combinar prendas o buscar algo específico.',
        sender: 'assistant',
        timestamp: Date.now(),
      });
    }
  }, [messages, addMessage]);

  const handleSendMessage = (text: string) => {
    // Add user message
    const userMessageId = Date.now().toString();
    addMessage({
      id: userMessageId,
      text,
      sender: 'user',
      timestamp: Date.now(),
    });

    // Simulate AI response
    setTimeout(() => {
      let responseText = '';
      let products = [];

      // Simple keyword matching for demo purposes
      const lowercaseText = text.toLowerCase();
      if (lowercaseText.includes('vestido') || lowercaseText.includes('vestidos')) {
        responseText = 'Aquí tienes algunos vestidos que podrían interesarte:';
        products = searchProducts('vestido');
      } else if (lowercaseText.includes('pantalón') || lowercaseText.includes('pantalones')) {
        responseText = 'He encontrado estos pantalones que podrían gustarte:';
        products = searchProducts('pantalón');
      } else if (lowercaseText.includes('chaqueta') || lowercaseText.includes('abrigo')) {
        responseText = 'Mira estas chaquetas y abrigos:';
        products = searchProducts('chaqueta');
      } else if (lowercaseText.includes('zapato') || lowercaseText.includes('calzado')) {
        responseText = 'Aquí tienes opciones de calzado:';
        products = searchProducts('calzado');
      } else if (lowercaseText.includes('accesorio') || lowercaseText.includes('joyería')) {
        responseText = 'Estos accesorios complementarán tu look:';
        products = searchProducts('accesorio');
      } else {
        responseText = 'Puedo ayudarte a encontrar prendas que se adapten a tu estilo. ¿Qué tipo de ropa estás buscando? Puedes preguntarme por vestidos, pantalones, chaquetas, calzado o accesorios.';
      }

      addMessage({
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'assistant',
        timestamp: Date.now() + 1,
        products: products.slice(0, 3),
      });
    }, 1000);
  };

  const handleSendImage = (uri: string) => {
    // Add user image message
    const userMessageId = Date.now().toString();
    addMessage({
      id: userMessageId,
      text: 'He subido una imagen para análisis',
      sender: 'user',
      timestamp: Date.now(),
      imageUrl: uri,
    });

    // Simulate AI response to image
    setTimeout(() => {
      addMessage({
        id: (Date.now() + 1).toString(),
        text: 'He analizado tu imagen. Basándome en ella, te recomiendo estas prendas que combinarían bien:',
        sender: 'assistant',
        timestamp: Date.now() + 1,
        products: searchProducts('').slice(0, 3),
      });
    }, 1500);
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <ChatMessage message={item} />}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />
        <ChatInput onSendMessage={handleSendMessage} onSendImage={handleSendImage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  messageList: {
    padding: 16,
    paddingBottom: 8,
  },
});