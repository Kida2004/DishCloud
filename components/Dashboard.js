import { FontAwesome5, Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const navItems = [
  'Dashboard',
  'Reservations',
  'Orders',
  'Menu Management',
  'Feedback',
  'Table Management',
  'Waitlist',
  'Customer Profiles',
  'Live Chat',
  'Analytics',
  'Settings',
];

const stats = [
  { label: 'Active Reservations', value: 27, change: '+4%', icon: 'restaurant' },
  { label: 'Orders Today', value: 124, change: '+16%', icon: 'receipt' },
  { label: 'Pending Feedback', value: 9, change: '-2%', icon: 'message' },
  { label: 'Waitlist', value: 14, change: '+7%', icon: 'clock' },
];

const features = [
  { title: 'Reservations', description: 'Manage table bookings and arrivals.', icon: 'calendar' },
  { title: 'Orders', description: 'Track orders and kitchen progress.', icon: 'shopping-cart' },
  { title: 'Menu Management', description: 'Update dishes, prices and availability.', icon: 'menu' },
  { title: 'Customer Feedback', description: 'Review feedback and ratings.', icon: 'thumbs-up' },
  { title: 'Table Management', description: 'Optimize seating layout in real time.', icon: 'grid' },
  { title: 'Waitlist', description: 'Monitor waiting guests efficiently.', icon: 'list' },
  { title: 'Live Chat', description: 'Support chat with in-house staff.', icon: 'chatbubbles' },
  { title: 'Analytics', description: 'Real-time performance reporting.', icon: 'bar-chart' },
];

export default function Dashboard() {
  const router = useRouter();

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
          {navItems.map((item) => (
            <TouchableOpacity key={item} style={styles.navItem}>
              <Text style={styles.navText}>{item}</Text>
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
              <Text style={styles.mainTitle}>Customer Service Dashboard</Text>
              <Text style={styles.mainSubtitle}>Track your restaurant operations at a glance.</Text>
            </View>
            <TouchableOpacity style={styles.headerBtn}>
              <Text style={styles.headerBtnText}>New Reservations</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            {stats.map(({ label, value, change, icon }) => (
              <View key={label} style={styles.statCard}>
                <View style={styles.statTop}>
                  <MaterialIcons name={icon} size={24} color="#2d8cff" />
                  <Text style={[styles.changeText, change.startsWith('+') ? styles.positive : styles.negative]}>{change}</Text>
                </View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Quick Access Features</Text>
          <View style={styles.grid}>
            {features.map((feature) => (
              <View key={feature.title} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <FontAwesome5 name={feature.icon} size={18} color="#ffffff" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDesc}>{feature.description}</Text>
              </View>
            ))}
          </View>

          <Text style={[styles.sectionTitle, { marginTop: 22 }]}>Recent Activity</Text>
          <View style={styles.activityContainer}>
            <View style={styles.activityItem}>
              <Text style={styles.activityTime}>10:55 AM</Text>
              <Text style={styles.activityText}>New reservation created for Table 12, 6 guests.</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityTime}>09:45 AM</Text>
              <Text style={styles.activityText}>Order #880 ready for pickup.</Text>
            </View>
            <View style={styles.activityItem}>
              <Text style={styles.activityTime}>08:15 AM</Text>
              <Text style={styles.activityText}>Feedback submitted by customer Maria S.</Text>
            </View>
          </View>
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
});
