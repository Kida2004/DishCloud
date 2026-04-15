import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useAccess } from '../context/AccessContext';

const navItems = [
  { label: 'Home', route: '/user', icon: 'home' },
  { label: 'Menu', route: '/user/menu', icon: 'restaurant-menu' },
  { label: 'Reservations', route: '/user/reservations', icon: 'event-seat' },
  { label: 'Feedback', route: '/user/feedback', icon: 'rate-review' },
];

export default function UserPageFrame({ screen = 'home', children, contentContainerStyle, showFooter = false }) {
  const router = useRouter();
  const { lockUserArea } = useAccess();
  const { width } = useWindowDimensions();
  const isCompact = width < 840;

  const handleLogout = () => {
    lockUserArea();
    router.replace('/user-access');
  };

  return (
    <View style={styles.page}>
      <View style={styles.topBar}>
        <View style={styles.brandBlock}>
          <Text style={styles.brand}>Terraza Noble</Text>
        </View>

        <View style={[styles.navList, isCompact && styles.navListCompact]}>
          {navItems.map((item) => {
            const isActive = item.route === (screen === 'home' ? '/user' : `/user/${screen}`);

            return (
              <Pressable
                key={item.route}
                onPress={() => router.push(item.route)}
                style={({ pressed }) => [
                  styles.navItem,
                  isActive && styles.navItemActive,
                  pressed && styles.navItemPressed,
                ]}>
                <MaterialIcons name={item.icon} size={18} color={isActive ? '#1f2937' : '#fffaf5'} />
                <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={handleLogout} style={({ pressed }) => [styles.exitButton, pressed && styles.navItemPressed]}>
          <MaterialIcons name="lock" size={18} color="#fff" />
          <Text style={styles.exitButtonText}>Exit</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={[
          styles.contentInner,
          showFooter && { paddingBottom: 0 },
          contentContainerStyle,
        ]}
        showsVerticalScrollIndicator={false}>
        {children}
        {showFooter ? (
          <View style={styles.footer}>
            <Text style={styles.footerBrand}>Terraza Noble</Text>
            <Text style={styles.footerText}>Home | Menu | Reservations | Feedback</Text>
            <Text style={styles.footerSubtext}>Fresh dining, warm service, and a simple guest experience for every visit.</Text>
            <Text style={styles.footerInfo}>Open daily: 11:30 AM - 10:00 PM</Text>
            <Text style={styles.footerInfo}>123 Terrace Avenue | (555) 123-4567 | hello@terrazanoble.com</Text>
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
  },
  topBar: {
    backgroundColor: '#99897D',
    paddingTop: 24,
    paddingHorizontal: 22,
    paddingBottom: 18,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 16,
  },
  brandBlock: {
    marginRight: 'auto',
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fffaf5',
  },
  navList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  navListCompact: {
    width: '100%',
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  navItemActive: {
    backgroundColor: '#f3e6d8',
  },
  navItemPressed: {
    opacity: 0.88,
  },
  navText: {
    color: '#fffaf5',
    fontWeight: '700',
    fontSize: 14,
  },
  navTextActive: {
    color: '#1f2937',
  },
  exitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#c26a2d',
    borderRadius: 14,
    paddingVertical: 13,
    paddingHorizontal: 18,
  },
  exitButtonText: {
    color: '#fff',
    fontWeight: '800',
  },
  content: {
    flex: 1,
  },
  contentInner: {
    padding: 28,
    paddingBottom: 40,
  },
  footer: {
    marginTop: 40,
    marginHorizontal: -28,
    backgroundColor: '#6b4f3c',
    paddingVertical: 30,
    paddingHorizontal: 28,
    marginBottom: -33,
    alignItems: 'center',
  },
  footerBrand: {
    color: '#fffaf5',
    fontSize: 20,
    fontWeight: '800',
  },
  footerText: {
    marginTop: 8,
    color: '#eadbc8',
    fontSize: 14,
    fontWeight: '700',
  },
  footerSubtext: {
    marginTop: 8,
    color: '#f3e6d8',
    fontSize: 13,
    textAlign: 'center',
  },
  footerInfo: {
    marginTop: 8,
    color: '#eadbc8',
    fontSize: 13,
    textAlign: 'center',
  },
});
