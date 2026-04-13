import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAccess } from '../context/AccessContext';

const navItems = [
  { label: 'Home', route: '/user', icon: 'home-filled' },
  { label: 'Menu', route: '/user/menu', icon: 'restaurant-menu' },
  { label: 'Reservations', route: '/user/reservations', icon: 'event-seat' },
  { label: 'Profile', route: '/user/profile', icon: 'person' },
];

const contentMap = {
  home: {
    eyebrow: 'Guest Dashboard',
    title: 'Everything your guests need in one place',
    subtitle: 'Browse featured dishes, track reservations, and manage your visit from the customer side.',
    cards: [
      { icon: 'star', title: 'Chef Specials', text: 'See limited-time dishes and house favorites before you arrive.' },
      { icon: 'schedule', title: 'Fast Booking', text: 'Check reservation windows and secure your preferred dining time.' },
      { icon: 'chat-bubble', title: 'Guest Support', text: 'Reach staff quickly for changes, dietary notes, or special requests.' },
    ],
  },
  menu: {
    eyebrow: 'Digital Menu',
    title: 'Explore dishes before you order',
    subtitle: 'Guests can review curated highlights, prep details, and category picks without entering the admin dashboard.',
    cards: [
      { icon: 'lunch-dining', title: 'Signature Plates', text: 'Grilled Salmon, herb chicken, and seasonal pasta are featured tonight.' },
      { icon: 'local-bar', title: 'Drinks', text: 'Coffee, mocktails, and pairings are grouped for quick browsing.' },
      { icon: 'icecream', title: 'Desserts', text: 'End the meal with cakes, plated sweets, and rotating pastry specials.' },
    ],
  },
  reservations: {
    eyebrow: 'Reservations',
    title: 'Manage bookings without admin tools',
    subtitle: 'This user area is focused on guest tasks like viewing booking status, arrival notes, and upcoming visits.',
    cards: [
      { icon: 'calendar-month', title: 'Upcoming Booking', text: 'Friday at 7:30 PM for four guests on the patio.' },
      { icon: 'notifications-active', title: 'Arrival Notes', text: 'Receive reminders, seating updates, and wait-time messages.' },
      { icon: 'edit-calendar', title: 'Change Requests', text: 'Request edits to party size or notes before check-in.' },
    ],
  },
  profile: {
    eyebrow: 'Guest Profile',
    title: 'Keep preferences and visit details together',
    subtitle: 'Store favorites, dietary preferences, and visit history in the customer portal.',
    cards: [
      { icon: 'favorite', title: 'Saved Favorites', text: 'Quick access to dishes and drinks guests reorder most often.' },
      { icon: 'restaurant', title: 'Dietary Notes', text: 'Gluten-free, vegetarian, and allergy details stay easy to reference.' },
      { icon: 'receipt-long', title: 'Visit History', text: 'See recent reservations, requests, and loyalty touchpoints.' },
    ],
  },
};

export default function UserPortalShell({ screen = 'home' }) {
  const router = useRouter();
  const { lockUserArea } = useAccess();
  const content = contentMap[screen] ?? contentMap.home;

  const handleLogout = () => {
    lockUserArea();
    router.replace('/user-access');
  };

  return (
    <View style={styles.page}>
      <View style={styles.sidebar}>
        <Text style={styles.brand}>Terraza Noble</Text>
        <Text style={styles.sideLabel}>User Pages</Text>

        <View style={styles.navList}>
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
                <MaterialIcons name={item.icon} size={18} color={isActive ? '#1f2937' : '#f8fafc'} />
                <Text style={[styles.navText, isActive && styles.navTextActive]}>{item.label}</Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable onPress={handleLogout} style={({ pressed }) => [styles.exitButton, pressed && styles.navItemPressed]}>
          <MaterialIcons name="lock" size={18} color="#fff" />
          <Text style={styles.exitButtonText}>Lock User Area</Text>
        </Pressable>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentInner} showsVerticalScrollIndicator={false}>
        <Text style={styles.eyebrow}>{content.eyebrow}</Text>
        <Text style={styles.title}>{content.title}</Text>
        <Text style={styles.subtitle}>{content.subtitle}</Text>

        <View style={styles.heroCard}>
          <View>
            <Text style={styles.heroTitle}>Passkey protected access</Text>
            <Text style={styles.heroText}>Guests only reach this space after entering the passkey, while admin pages remain on their separate workflow.</Text>
          </View>
          <View style={styles.heroBadge}>
            <MaterialIcons name="verified-user" size={28} color="#6b4f3c" />
          </View>
        </View>

        <View style={styles.cardGrid}>
          {content.cards.map((card) => (
            <View key={card.title} style={styles.card}>
              <View style={styles.cardIcon}>
                <MaterialIcons name={card.icon} size={22} color="#fffaf5" />
              </View>
              <Text style={styles.cardTitle}>{card.title}</Text>
              <Text style={styles.cardText}>{card.text}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#f5ede3',
  },
  sidebar: {
    width: 240,
    backgroundColor: '#6b4f3c',
    paddingTop: 28,
    paddingHorizontal: 18,
    paddingBottom: 24,
  },
  brand: {
    fontSize: 20,
    fontWeight: '800',
    color: '#fffaf5',
  },
  sideLabel: {
    marginTop: 6,
    color: '#eadbc8',
    fontSize: 13,
  },
  navList: {
    marginTop: 28,
    gap: 10,
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
    marginTop: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#c26a2d',
    borderRadius: 14,
    paddingVertical: 13,
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
  eyebrow: {
    color: '#9a3412',
    fontWeight: '800',
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  title: {
    marginTop: 8,
    fontSize: 34,
    lineHeight: 40,
    color: '#1f2937',
    fontWeight: '900',
    maxWidth: 560,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    lineHeight: 24,
    color: '#6b7280',
    maxWidth: 700,
  },
  heroCard: {
    marginTop: 24,
    borderRadius: 24,
    backgroundColor: '#fffaf5',
    padding: 22,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f2937',
  },
  heroText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280',
    maxWidth: 520,
  },
  heroBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#f3e6d8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGrid: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  card: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6b4f3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280',
  },
});
