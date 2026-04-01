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


export default function Settings() {
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
              style={[styles.navItem, route === '/settings' && styles.activeNavItem]}
              onPress={() => handleNavigation(route)}>
              <Text style={[styles.navText, route === '/settings' && styles.activeNavText]}>{label}</Text>
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
              <Text style={styles.mainTitle}>Settings</Text>
              <Text style={styles.mainSubtitle}>Configure your restaurant management system.</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>General</Text>
          {[
            { label: 'Restaurant Name', value: 'Terraza Noble CMS', icon: 'restaurant' },
            { label: 'Location', value: '123 Main St, City', icon: 'location-sharp' },
            { label: 'Email', value: 'contact@terraza-noble.com', icon: 'email' },
            { label: 'Phone', value: '+1 (555) 987-6543', icon: 'phone' },
            { label: 'Website', value: 'www.terraza-noble.com', icon: 'public' },
            { label: 'Business Hours', value: 'Mon-Sun 10:00 AM - 11:00 PM', icon: 'access-time' },
          ].map((item, idx) => (
            <View key={idx} style={styles.settingCard}>
              <MaterialIcons name={item.icon} size={20} color="#2d8cff" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingDesc}>{item.value}</Text>
              </View>
              <TouchableOpacity style={styles.settingAction}><Text style={styles.settingActionText}>Edit</Text></TouchableOpacity>
            </View>
          ))}

          <Text style={styles.sectionTitle}>More Configurations</Text>
          {[
            { label: 'SMS Notifications', status: true },
            { label: 'Table Auto-Expiry (mins)', status: '30' },
            { label: 'Reservation Reminder', status: '15 mins before' },
            { label: 'Daily Backup', status: true },
          ].map((item, idx) => (
            <View key={idx} style={styles.settingCard}>
              <MaterialIcons name="tune" size={20} color="#2d8cff" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingDesc}>{item.status.toString()}</Text>
              </View>
              <TouchableOpacity style={[styles.settingAction, item.status === true || item.status === '30' || item.status === '15 mins before' ? styles.actionActive : styles.actionInactive]}>
                <Text style={styles.settingActionText}>{item.status === true ? 'On' : item.status === false ? 'Off' : 'Edit'}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Features</Text>
          {[
            { label: 'Online Ordering', status: true },
            { label: 'Push Notifications', status: false },
            { label: 'Auto Confirm', status: true },
          ].map((item, idx) => (
            <View key={idx} style={styles.settingCard}>
              <MaterialIcons name="settings" size={20} color="#2d8cff" />
              <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingDesc}>{item.status ? 'Enabled' : 'Disabled'}</Text>
              </View>
              <TouchableOpacity style={[styles.settingAction, item.status ? styles.actionActive : styles.actionInactive]}>
                <Text style={styles.settingActionText}>{item.status ? 'On' : 'Off'}</Text>
              </TouchableOpacity>
            </View>
          ))}

          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.settingCard}>
            <MaterialIcons name="lock" size={20} color="#2d8cff" />
            <View style={styles.settingInfo}>
              <Text style={styles.settingLabel}>Change Password</Text>
              <Text style={styles.settingDesc}>Update your account password</Text>
            </View>
            <TouchableOpacity style={styles.settingAction}><Text style={styles.settingActionText}>Change</Text></TouchableOpacity>
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 12,
    marginTop: 12,
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1f2b3d',
  },
  settingDesc: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  settingAction: {
    backgroundColor: '#e8f1ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 6,
  },
  settingActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2d8cff',
  },
  actionActive: {
    backgroundColor: '#10b981',
  },
  actionInactive: {
    backgroundColor: '#f3f4f6',
  },
});