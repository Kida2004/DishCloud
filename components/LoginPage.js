import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (email && password) {
      Alert.alert('Login Attempt', `Email: ${email}\nPassword: ${password}`);
      router.push('/dashboard');
    } else {
      Alert.alert('Error', 'Please enter both email and password');
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Welcome to Terraza Noble</Text>
          <Text style={styles.subtitle}>Sign in to access your customer service dashboard</Text>
          <Text style={styles.label}>Email Address</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={() => setRememberMe(!rememberMe)} style={styles.checkbox}>
              <Ionicons name={rememberMe ? 'checkbox' : 'square-outline'} size={20} color="#333" />
            </TouchableOpacity>
            <Text style={styles.checkboxLabel}>Remember me</Text>
          </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Forgot Password', 'Reset instructions sent to your email.')}>
            <Text style={styles.forgotText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.helpButton} onPress={() => Alert.alert('Help', 'Contact support for assistance.')}>
        <Text style={styles.helpText}>?</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBox: {
    backgroundColor: '#ffffff',
    padding: 30,
    borderRadius: 12,
    width: 360,
    height: 480,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 20,
    color: '#666',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    alignSelf: 'flex-start',
    width: '90%',
    paddingLeft: 12,
  },
  input: {
    width: '90%',
    height: 45,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f9f9f9',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 6,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  helpButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  helpText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    fontSize: 14,
    color: '#333',
  },
  forgotText: {
    fontSize: 14,
    color: '#007AFF',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
