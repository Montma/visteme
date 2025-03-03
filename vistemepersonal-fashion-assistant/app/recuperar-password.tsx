import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import Colors from '@/constants/colors';
import { useColorScheme } from 'react-native';
import { Send } from 'lucide-react-native';

export default function RecoverPasswordScreen() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const colorScheme = useColorScheme() || 'light';
  const colors = Colors[colorScheme === 'dark' ? 'dark' : 'light'];

  const handleSubmit = () => {
    // In a real app, this would send a password reset email
    if (email) {
      setSubmitted(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Recuperar Contraseña</Text>
          <Text style={[styles.subtitle, { color: colors.placeholder }]}>
            Ingresa tu correo electrónico y te enviaremos instrucciones para restablecer tu contraseña
          </Text>
        </View>

        {!submitted ? (
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={[styles.label, { color: colors.text }]}>Correo electrónico</Text>
              <TextInput
                style={[styles.input, { backgroundColor: colorScheme === 'dark' ? '#2A2A2A' : '#F5F5F5', color: colors.text }]}
                placeholder="correo@ejemplo.com"
                placeholderTextColor={colors.placeholder}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <Pressable 
              style={[styles.submitButton, { backgroundColor: colors.primary }]} 
              onPress={handleSubmit}
            >
              <Send size={20} color="#FFFFFF" />
              <Text style={styles.submitButtonText}>Enviar instrucciones</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.successContainer}>
            <Text style={[styles.successTitle, { color: colors.text }]}>¡Correo enviado!</Text>
            <Text style={[styles.successMessage, { color: colors.placeholder }]}>
              Hemos enviado instrucciones para restablecer tu contraseña a {email}. Por favor, revisa tu bandeja de entrada.
            </Text>
            <Pressable 
              style={[styles.backButton, { backgroundColor: colors.primary }]} 
              onPress={() => router.back()}
            >
              <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
            </Pressable>
          </View>
        )}

        {!submitted && (
          <Pressable style={styles.backLink} onPress={() => router.back()}>
            <Text style={[styles.backLinkText, { color: colors.primary }]}>Volver al inicio de sesión</Text>
          </Pressable>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  formContainer: {
    width: '100%',
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
  submitButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backLink: {
    alignItems: 'center',
    marginTop: 16,
  },
  backLinkText: {
    fontSize: 16,
    fontWeight: '600',
  },
  successContainer: {
    alignItems: 'center',
    padding: 16,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
  },
  backButton: {
    borderRadius: 8,
    padding: 14,
    alignItems: 'center',
    width: '100%',
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});