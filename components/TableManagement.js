import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const navItems = [
  { label: 'Dashboard', route: '/dashboard', icon: 'dashboard' },
  { label: 'Reservations', route: '/reservations', icon: 'event-seat' },
  { label: 'Orders', route: '/orders', icon: 'receipt-long' },
  { label: 'Menu Management', route: '/menumanagement', icon: 'restaurant-menu' },
  { label: 'Feedback', route: '/feedback', icon: 'message' },
  { label: 'Table Management', route: '/tablemanagement', icon: 'table-restaurant' },
  { label: 'Waitlist', route: '/waitlist', icon: 'schedule' },
  { label: 'Live Chat', route: '/livechat', icon: 'chat' },
  { label: 'Analytics', route: '/analytics', icon: 'bar-chart' },
  { label: 'Settings', route: '/settings', icon: 'settings' },
];


export default function TableManagement() {
  const router = useRouter();
  const pathname = usePathname();

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
        <Text style={styles.brand}>Terraza Noble</Text>
        <View style={styles.divider} />
        <ScrollView showsVerticalScrollIndicator={false} style={styles.navContainer}>
          {navItems.map(({ label, route, icon }) => (
            <Pressable
              key={label}
              onPress={() => handleNavigation(route)}
              style={({ hovered, pressed }) => [
                styles.navItem,
                pathname === route && styles.activeNavItem,
                hovered && styles.hoverNavItem,
                pressed && styles.pressedNavItem,
              ]}>
              {({ hovered, pressed }) => (
                <View style={styles.navContent}>
                  <View style={[styles.navIconCircle, pathname === route && styles.activeNavIconCircle, hovered && styles.hoverNavIconCircle]}>
                    <MaterialIcons name={icon} size={18} color={hovered || pathname === route ? 'black' : 'white'} />
                  </View>
                  <Text style={[styles.navText, pathname === route && styles.activeNavText, hovered && styles.hoverNavText, pressed && styles.pressedNavText]}>{label}</Text>
                </View>
              )}
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          onPress={handleLogout}
          style={({ hovered, pressed }) => [
            styles.logoutButton,
            hovered && styles.logoutButtonHover,
            pressed && styles.logoutButtonPressed,
          ]}>
          <Ionicons name="log-out" size={16} color="#ffffff" />
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </View>

      <View style={styles.mainSection}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.mainContent}>
          <View style={styles.headerRow}>
            <View>
              <Text style={styles.mainTitle}>Table Management</Text>
              <Text style={styles.mainSubtitle}>Monitor and organize restaurant table availability.</Text>
            </View>
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, {backgroundColor: '#10b981'}]} />
              <Text style={styles.legendText}>Available</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, {backgroundColor: '#f59e0b'}]} />
              <Text style={styles.legendText}>Occupied</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendBox, {backgroundColor: '#6b7280'}]} />
              <Text style={styles.legendText}>Reserved</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Restaurant Floor Plan</Text>
          <View style={styles.floorPlan}>
            {[{id: '1', status: 'Available', guests: 0}, {id: '2', status: 'Occupied', guests: 4}, {id: '3', status: 'Occupied', guests: 2}, {id: '4', status: 'Available', guests: 0}, {id: '5', status: 'Reserved', guests: 6}, {id: '6', status: 'Available', guests: 0}, {id: 'VIP', status: 'Occupied', guests: 8}, {id: '7', status: 'Available', guests: 0}].map((table) => {
              const statusColor = table.status === 'Available' ? '#10b981' : table.status === 'Occupied' ? '#f59e0b' : '#6b7280';
              return (
                <TouchableOpacity key={table.id} style={[styles.tableIcon, {borderColor: statusColor}]}>
                  <MaterialIcons name="table-restaurant" size={28} color={statusColor} />
                  <Text style={styles.tableNumber}>{table.id}</Text>
                  {table.guests > 0 && <Text style={styles.guestCount}>{table.guests}</Text>}
                </TouchableOpacity>
              );
            })}
          </View>

          <Text style={[styles.sectionTitle, {marginTop: 24}]}>Table Details</Text>
          {[{table: 'Table 1', status: 'Available', duration: '-'}, {table: 'Table 2', status: 'Occupied', duration: '45 min'}, {table: 'VIP Table', status: 'Occupied', duration: '30 min'}].map((detail, idx) => (
            <View key={idx} style={styles.tableDetailCard}>
              <View style={styles.tableDetailTop}>
                <Text style={styles.tableDetailName}>{detail.table}</Text>
                <Text style={[styles.tableDetailStatus, {color: detail.status === 'Available' ? '#10b981' : '#f59e0b'}]}>● {detail.status}</Text>
              </View>
              <Text style={styles.tableDetailDuration}>Duration: {detail.duration}</Text>
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
    backgroundColor: '#99897D',
    paddingVertical: 20,
    paddingHorizontal: 12,
    borderRightWidth: width > 900 ? 1 : 0,
    borderRightColor: '#e5e7eb',
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
    color: 'white',
    marginBottom: 16,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
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
    backgroundColor: '#99897D',
  },
  activeNavItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
  },
  navText: {
    fontSize: 14,
    color: 'white',
    fontFamily: 'Arial',
  },
  activeNavText: {
    color: 'black',
    fontWeight: '600',
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  navIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  activeNavIconCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  hoverNavIconCircle: {
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
  },
  hoverNavItem: {
    backgroundColor: '#99897D',
  },
  hoverNavText: {
    color: 'black',
  },
  pressedNavItem: {
    opacity: 0.85,
  },
  pressedNavText: {
    color: 'black',
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
  logoutButtonHover: {
    backgroundColor: '#c53030',
  },
  logoutButtonPressed: {
    opacity: 0.9,
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
  legendRow: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendBox: {
    width: 16,
    height: 16,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '500',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 16,
  },
  floorPlan: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    gap: 16,
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  tableIcon: {
    width: 80,
    height: 80,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
  },
  tableNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginTop: 4,
  },
  guestCount: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#f59e0b',
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: 4,
    marginTop: 2,
  },
  tableDetailCard: {
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
  tableDetailTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tableDetailName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  tableDetailStatus: {
    fontSize: 13,
    fontWeight: '600',
  },
  tableDetailDuration: {
    fontSize: 12,
    color: '#6b7280',
  },
});

