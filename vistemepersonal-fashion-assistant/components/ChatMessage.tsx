import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChatMessage as ChatMessageType, Product } from '@/types';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { ExternalLink } from 'lucide-react-native';

interface ChatMessageProps {
  message: ChatMessageType;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];
  const isUser = message.sender === 'user';

  const handleProductPress = (productId: string) => {
    router.push(`/producto/${productId}`);
  };

  return (
    <View style={[
      styles.container,
      isUser ? styles.userContainer : styles.assistantContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser 
          ? [styles.userBubble, { backgroundColor: colors.primary }] 
          : [styles.assistantBubble, { backgroundColor: colors.card }]
      ]}>
        <Text style={[
          styles.text,
          { color: isUser ? 'white' : colors.text }
        ]}>
          {message.text}
        </Text>
        
        {message.imageUrl && (
          <Image
            source={{ uri: message.imageUrl }}
            style={styles.image}
            contentFit="cover"
          />
        )}
        
        {message.products && message.products.length > 0 && (
          <View style={styles.productsContainer}>
            {message.products.map((product: Product) => (
              <Pressable 
                key={product.id}
                style={[styles.productCard, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5' }]}
                onPress={() => handleProductPress(product.id)}
              >
                <Image
                  source={{ uri: product.imageUrl }}
                  style={styles.productImage}
                  contentFit="cover"
                />
                <View style={styles.productInfo}>
                  <Text style={[styles.productStore, { color: colors.primary }]}>
                    {product.store}
                  </Text>
                  <Text style={[styles.productName, { color: colors.text }]} numberOfLines={1}>
                    {product.name}
                  </Text>
                  <Text style={[styles.productPrice, { color: colors.text }]}>
                    {product.price.toFixed(2)} €
                  </Text>
                </View>
                <Pressable 
                  style={styles.linkButton}
                  onPress={() => router.push(product.url)}
                >
                  <ExternalLink size={16} color={colors.primary} />
                </Pressable>
              </Pressable>
            ))}
          </View>
        )}
      </View>
      <Text style={[styles.timestamp, { color: colors.placeholder }]}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  assistantContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    borderRadius: 18,
    padding: 12,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  assistantBubble: {
    borderBottomLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 22,
  },
  timestamp: {
    fontSize: 12,
    marginTop: 4,
    marginHorizontal: 4,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 12,
    marginTop: 8,
  },
  productsContainer: {
    marginTop: 12,
  },
  productCard: {
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 8,
  },
  productImage: {
    width: 70,
    height: 70,
  },
  productInfo: {
    flex: 1,
    padding: 8,
    justifyContent: 'center',
  },
  productStore: {
    fontSize: 12,
    fontWeight: '600',
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 2,
  },
  productPrice: {
    fontSize: 13,
    fontWeight: '600',
  },
  linkButton: {
    padding: 8,
    justifyContent: 'center',
  },
});