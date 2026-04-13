import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { ADMIN_PASSKEY } from '../config/access';
import { useAccess } from '../context/AccessContext';

export default function AdminAccessPage() {
  const router = useRouter();
  const { unlockAdminArea } = useAccess();
  const [passkey, setPasskey] = useState('');

  const handleAdminUnlock = () => {
    if (!passkey.trim()) {
      Alert.alert('Passkey required', 'Enter the admin passkey to continue.');
      return;
    }

    if (passkey.trim() !== ADMIN_PASSKEY) {
      Alert.alert('Invalid passkey', 'That passkey does not match the admin access code.');
      return;
    }

    unlockAdminArea();
    router.replace('/dashboard');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&auto=format&fit=crop&q=80' }}
      style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.card}>
          <View style={styles.badge}>
            <MaterialIcons name="admin-panel-settings" size={22} color="#fff" />
          </View>
          <Text style={styles.title}>Admin Access</Text>
          <Text style={styles.subtitle}>Enter the admin passkey to unlock the dashboard, reports, and management tools.</Text>

          <Text style={styles.label}>Admin Passkey</Text>
          <TextInput
            value={passkey}
            onChangeText={setPasskey}
            secureTextEntry
            placeholder="Enter admin passkey"
            style={styles.input}
          />

          <Pressable onPress={handleAdminUnlock} style={({ pressed }) => [styles.primaryButton, pressed && styles.buttonPressed]}>
            <Text style={styles.primaryButtonText}>Open Admin Area</Text>
          </Pressable>

          <Pressable onPress={() => router.replace('/')} style={({ pressed }) => [styles.secondaryButton, pressed && styles.buttonPressed]}>
            <Text style={styles.secondaryButtonText}>Back to User Login</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#fffaf5',
    borderRadius: 24,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 8,
  },
  badge: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#6b4f3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1f2937',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280',
    marginTop: 8,
    marginBottom: 22,
  },
  label: {
    fontSize: 13,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#d6d3d1',
    backgroundColor: '#fff',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    fontSize: 15,
    marginBottom: 16,
  },
  primaryButton: {
    backgroundColor: '#1f2937',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryButton: {
    marginTop: 12,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    backgroundColor: '#efe7dd',
  },
  secondaryButtonText: {
    color: '#6b4f3c',
    fontSize: 14,
    fontWeight: '700',
  },
  buttonPressed: {
    opacity: 0.88,
  },
});
