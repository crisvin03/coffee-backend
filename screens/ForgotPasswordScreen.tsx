import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  StatusBar,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');

  const handleRequestReset = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email.');
      return;
    }

    try {
      const response = await fetch('https://coffee-backend-s1ed.onrender.com/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Reset Token', `Use this token: ${data.token}`);
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Failed to connect to the server.');
    }
  };

  return (
    <LinearGradient colors={['#3B2C27', '#000']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.header}>Forgot Password</Text>
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />
        <TouchableOpacity style={styles.button} onPress={handleRequestReset}>
          <Text style={styles.buttonText}>Request Reset</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  card: { backgroundColor: '#ffffff10', padding: 25, borderRadius: 16 },
  header: { color: '#fff', fontSize: 22, marginBottom: 20, textAlign: 'center' },
  input: {
    backgroundColor: '#ffffff20',
    color: '#fff',
    padding: 14,
    borderRadius: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#C77B4D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
