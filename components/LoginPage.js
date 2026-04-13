import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { USER_DEMO_EMAIL, USER_DEMO_PASSWORD } from '../config/access';
import { useAccess } from '../context/AccessContext';

export default function LoginPage() {
  const router = useRouter();
  const { unlockUserArea } = useAccess();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    if (email.trim().toLowerCase() !== USER_DEMO_EMAIL || password !== USER_DEMO_PASSWORD) {
      Alert.alert('Invalid login', 'Use the guest email and password for the user side.');
      return;
    }

    unlockUserArea();
    router.push('/user');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://plus.unsplash.com/premium_photo-1661962305366-0c62646fd249?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cmVzdGF1cmFudCUyMGJhY2tncm91bmR8ZW58MHx8MHx8fDA%3D' }}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.loginBox}>
          <Text style={styles.title}>Welcome to Terraza Noble</Text>
          <Text style={styles.subtitle}>User sign in with email and password. Admin access is protected separately by passkey.</Text>
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
            <Text style={styles.buttonText}>User Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.userButton} onPress={() => router.push('/admin-access')}>
            <Text style={styles.userButtonText}>Admin Passkey Access</Text>
          </TouchableOpacity>
          <Text style={styles.demoHint}>Guest demo: {USER_DEMO_EMAIL} / {USER_DEMO_PASSWORD}</Text>
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
  userButton: {
    marginTop: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: '#1f2937',
  },
  userButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  demoHint: {
    width: '90%',
    marginTop: 12,
    textAlign: 'center',
    fontSize: 12,
    color: '#6b7280',
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
