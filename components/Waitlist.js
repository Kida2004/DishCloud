import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const navItems = [
  { label: 'Dashboard', route: '/dashboard' },
  { label: 'Reservations', route: '/reservations' },
  { label: 'Orders', route: '/orders' },
  { label: 'Menu Management', route: '/menumanagement' },
  { label: 'Feedback', route: '/feedback' },
  { label: 'Table Management', route: '/tablemanagement' },
  { label: 'Waitlist', route: '/waitlist' },
  { label: 'Customer Profiles', route: '/customerprofiles' },
  { label: 'Live Chat', route: '/livechat' },
  { label: 'Analytics', route: '/analytics' },
  { label: 'Settings', route: '/settings' },
];


export default function Waitlist() {
  const router = useRouter();

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been logged out.');
    router.replace('/');
  };

  return (
    <View style={styles.appWrapper}>
      <View style={styles.sidebar}>
        <Text style={styles.brand}>Terraza Noble CMS</Text>
        <View style={styles.divider} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.navContainer}>
          {navItems.map(({ label, route }) => (
            <TouchableOpacity
              key={label}
              style={[styles.navItem, route === '/waitlist' && styles.activeNavItem]}
              onPress={() => handleNavigation(route)}>
              <Text style={[styles.navText, route === '/waitlist' && styles.activeNavText]}>{label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out" size={16} color="#ffffff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.mainSection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContent}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.mainTitle}>Waitlist</Text>
              <Text style={styles.mainSubtitle}>Manage customer waiting queue and notifications.</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.addBtnText}>Add Party</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="people" size={24} color="#2d8cff" />
              <Text style={styles.statValue}>8</Text>
              <Text style={styles.statLabel}>In Waitlist</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="schedule" size={24} color="#f59e0b" />
              <Text style={styles.statValue}>25m</Text>
              <Text style={styles.statLabel}>Avg Wait</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="trending-up" size={24} color="#8b5cf6" />
              <Text style={styles.statValue}>34</Text>
              <Text style={styles.statLabel}>Today Served</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Waiting Queue</Text>
          {[{position: 1, name: 'Johnson Family', guests: 6, time: '5 min ago', phone: '+1(555)123-4567'}, {position: 2, name: 'Smith Party', guests: 4, time: '12 min ago', phone: '+1(555)234-5678'}, {position: 3, name: 'Williams Group', guests: 2, time: '18 min ago', phone: '+1(555)345-6789'}, {position: 4, name: 'Brown Family', guests: 5, time: '22 min ago', phone: '+1(555)456-7890'}].map((entry, idx) => (
            <View key={idx} style={styles.waitlistCard}>
              <View style={styles.positionBadge}>
                <Text style={styles.positionNumber}>{entry.position}</Text>
              </View>
              <View style={styles.partyInfo}>
                <Text style={styles.partyName}>{entry.name}</Text>
                <Text style={styles.partyDetails}>{entry.guests} guests  •  Waited {entry.time}</Text>
                <Text style={styles.phone}>{entry.phone}</Text>
              </View>
              <View style={styles.waitlistActions}>
                <TouchableOpacity style={styles.seatBtn}>
                  <Text style={styles.seatBtnText}>Seat Party</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.removeBtn} onPress={() => Alert.alert('Removed', `${entry.name} removed from waitlist.`)}>
                  <Text style={styles.removeBtnText}>Remove</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  appWrapper: {
    flex: 1,
    flexDirection: width > 900 ? 'row' : 'column',
    backgroundColor: '#f3f5f9',
  },
  sidebar: {
    width: width > 900 ? 250 : '100%',
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRightWidth: width > 900 ? 1 : 0,
    borderRightColor: '#e5e9f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 10,
    position: 'relative',
  },
  brand: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2d8cff',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginBottom: 16,
  },
  navContainer: {
    flex: 1,
    marginBottom: 60,
  },
  navItem: {
    paddingVertical: 9,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  navText: {
    fontSize: 14,
    color: '#444',
  },
  activeNavItem: {
    backgroundColor: '#e8f1ff',
  },
  activeNavText: {
    color: '#2d8cff',
    fontWeight: 'bold',
  },
  listCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  reservationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  guestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  reservationMeta: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  status: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  mainSection: {
    flex: 1,
    padding: 20,
    minHeight: '100%',
    position: 'relative',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  featureCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: width > 900 ? '47%' : '100%',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  featureIcon: {
    backgroundColor: '#2d8cff',
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 6,
  },
  featureDesc: {
    fontSize: 13,
    color: '#6b7280',
  },
  activityContainer: {
    marginTop: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 1,
  },
  activityItem: {
    marginBottom: 10,
  },
  activityTime: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: 'bold',
  },
  activityText: {
    fontSize: 14,
    color: '#1f2b3d',
    marginTop: 2,
  },
  logoutButton: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e53e3e',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
  mainContent: {
    paddingBottom: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  mainTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  mainSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 6,
  },
  addBtn: {
    backgroundColor: '#2d8cff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  addBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: width > 800 ? 'row' : 'column',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: width > 800 ? '32%' : '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 16,
  },
  waitlistCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  positionBadge: {
    backgroundColor: '#2d8cff',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  positionNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  partyInfo: {
    flex: 1,
  },
  partyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  partyDetails: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  phone: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 2,
  },
  waitlistActions: {
    flexDirection: 'row',
    gap: 8,
  },
  seatBtn: {
    backgroundColor: '#10b981',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  seatBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  removeBtn: {
    backgroundColor: '#ef4444',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  removeBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});

