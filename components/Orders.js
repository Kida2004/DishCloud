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


export default function Orders() {
  const router = useRouter();

  const orders = [
    { id: '#1001', customer: 'John Smith', table: 'Table 5', items: 3, status: 'Preparing', time: '12:45 PM', total: '$45.99', priority: 'Normal' },
    { id: '#1002', customer: 'Sarah Connor', table: 'Table 2', items: 2, status: 'Ready', time: '12:30 PM', total: '$32.50', priority: 'High' },
    { id: '#1003', customer: 'Mike Johnson', table: 'Counter', items: 1, status: 'Completed', time: '12:15 PM', total: '$18.75', priority: 'Low' },
    { id: '#1004', customer: 'Emma Wilson', table: 'Table 8', items: 4, status: 'Pending', time: '12:50 PM', total: '$62.30', priority: 'Normal' },
    { id: '#1005', customer: 'Alex Brown', table: 'Table 12', items: 2, status: 'Preparing', time: '12:40 PM', total: '$28.99', priority: 'High' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'Pending': return '#fbbf24';
      case 'Preparing': return '#3b82f6';
      case 'Ready': return '#10b981';
      case 'Completed': return '#6b7280';
      default: return '#6b7280';
    }
  };

  const getPriorityIcon = (priority) => {
    if (priority === 'High') return '⭐';
    return '';
  };

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
              style={[styles.navItem, route === '/orders' && styles.activeNavItem]}
              onPress={() => handleNavigation(route)}>
              <Text style={[styles.navText, route === '/orders' && styles.activeNavText]}>{label}</Text>
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
              <Text style={styles.mainTitle}>Orders</Text>
              <Text style={styles.mainSubtitle}>Track orders and manage customer requests in real-time.</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.addBtnText}>New Order</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="shopping-cart" size={24} color="#2d8cff" />
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Total Orders</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="schedule" size={24} color="#f59e0b" />
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Preparing</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="check-circle" size={24} color="#10b981" />
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Ready</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="trending-up" size={24} color="#8b5cf6" />
              <Text style={styles.statValue}>$1,240</Text>
              <Text style={styles.statLabel}>Daily Revenue</Text>
            </View>
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>All Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Pending</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>In Progress</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}>
              <Text style={styles.filterTagText}>Completed</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>Active Orders</Text>
          {orders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderTop}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderCustomer}>{order.customer}</Text>
                </View>
                <Text style={[styles.orderStatus, { backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }]}>
                  {order.status} {getPriorityIcon(order.priority)}
                </Text>
              </View>
              <View style={styles.orderDetails}>
                <View style={styles.detailItem}>
                  <MaterialIcons name="table-chart" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{order.table}</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="restaurant-menu" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{order.items} items</Text>
                </View>
                <View style={styles.detailItem}>
                  <MaterialIcons name="access-time" size={16} color="#6b7280" />
                  <Text style={styles.detailText}>{order.time}</Text>
                </View>
              </View>
              <View style={styles.orderFooter}>
                <Text style={styles.orderTotal}>{order.total}</Text>
                <TouchableOpacity style={styles.actionBtn}>
                  <Text style={styles.actionBtnText}>View Details</Text>
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
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterTag: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  filterTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  orderCard: {
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
  orderTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  orderCustomer: {
    fontSize: 13,
    color: '#6b7280',
    marginTop: 4,
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  orderDetails: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  actionBtn: {
    backgroundColor: '#e8f1ff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  actionBtnText: {
    color: '#2d8cff',
    fontWeight: '600',
    fontSize: 12,
  },
});

