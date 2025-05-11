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

export default function ResetPasswordScreen() {
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleResetPassword = async () => {
    if (!token || !newPassword) {
      Alert.alert('Error', 'Please fill in both fields.');
      return;
    }

    try {
      const response = await fetch('https://coffee-backend-s1ed.onrender.com/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password has been reset!');
      } else {
        Alert.alert('Error', data.message);
      }
    } catch (error) {
      Alert.alert('Network Error', 'Unable to connect to the server.');
    }
  };

  return (
    <LinearGradient colors={['#3B2C27', '#000']} style={styles.container}>
      <StatusBar barStyle="light-content" />
      <View style={styles.card}>
        <Text style={styles.header}>Reset Password</Text>
        <TextInput
          placeholder="Reset Token"
          placeholderTextColor="#ccc"
          value={token}
          onChangeText={setToken}
          style={styles.input}
        />
        <TextInput
          placeholder="New Password"
          placeholderTextColor="#ccc"
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttonText}>Submit</Text>
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
