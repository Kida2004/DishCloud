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


export default function CustomerProfiles() {
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
              style={[styles.navItem, route === '/customerprofiles' && styles.activeNavItem]}
              onPress={() => handleNavigation(route)}>
              <Text style={[styles.navText, route === '/customerprofiles' && styles.activeNavText]}>{label}</Text>
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
              <Text style={styles.mainTitle}>Customer Profiles</Text>
              <Text style={styles.mainSubtitle}>Access customer information and dining history.</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <MaterialIcons name="search" size={20} color="#6b7280" />
            <Text style={styles.searchPlaceholder}>Search customers...</Text>
          </View>

          <Text style={styles.sectionTitle}>Top Customers</Text>
          {[{name: 'John Anderson', visits: 18, lastVisit: '2 days ago', spent: '$1,240', status: 'VIP'}, {name: 'Emma Wilson', visits: 14, lastVisit: '1 week ago', spent: '$980', status: 'Regular'}, {name: 'David Martinez', visits: 12, lastVisit: '3 days ago', spent: '$850', status: 'Regular'}, {name: 'Sarah Thompson', visits: 16, lastVisit: 'Today', spent: '$1,100', status: 'VIP'}].map((customer, idx) => (
            <View key={idx} style={styles.customerCard}>
              <View style={styles.customerHeader}>
                <View style={styles.customerAvatar}>
                  <Text style={styles.avatarText}>{customer.name.charAt(0)}</Text>
                </View>
                <View style={styles.customerInfo}>
                  <Text style={styles.customerName}>{customer.name}</Text>
                  <Text style={styles.customerEmail}>Last visit: {customer.lastVisit}</Text>
                </View>
                <View style={[styles.statusBadge, {backgroundColor: customer.status === 'VIP' ? '#f59e0b' : '#e5e7eb'}]}>
                  <Text style={[styles.statusText, {color: customer.status === 'VIP' ? '#fff' : '#6b7280'}]}>{customer.status}</Text>
                </View>
              </View>
              <View style={styles.customerStats}>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Visits</Text>
                  <Text style={styles.statValue}>{customer.visits}</Text>
                </View>
                <View style={styles.stat}>
                  <Text style={styles.statLabel}>Total Spent</Text>
                  <Text style={styles.statValue}>{customer.spent}</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.viewBtn}><Text style={styles.viewBtnText}>View Profile</Text></TouchableOpacity>
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
  headerBtn: {
    backgroundColor: '#2d8cff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  headerBtnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statsRow: {
    flexDirection: width > 800 ? 'row' : 'column',
    justifyContent: 'space-between',
    gap: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: width > 800 ? '24%' : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  statTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  statLabel: {
    fontSize: 13,
    color: '#6b7280',
  },
  changeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  positive: {
    color: '#16a34a',
  },
  negative: {
    color: '#dc2626',
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2b3d',
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 24,
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  searchPlaceholder: {
    fontSize: 14,
    color: '#9ca3af',
  },
  customerCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  customerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  customerAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2d8cff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  customerInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  customerEmail: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  customerStats: {
    flexDirection: 'row',
    gap: 24,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 11,
    color: '#6b7280',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginTop: 2,
  },
  viewBtn: {
    backgroundColor: '#e8f1ff',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewBtnText: {
    color: '#2d8cff',
    fontWeight: '600',
    fontSize: 13,
  },
});