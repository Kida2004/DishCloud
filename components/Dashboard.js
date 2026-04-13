import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAccess } from '../context/AccessContext';

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

const stats = [
   { label: 'Active Reservations', value: 27, change: '+4%', icon: 'event-seat' },
  { label: 'Orders Today', value: 124, change: '+16%', icon: 'receipt-long' },
  { label: 'Pending Feedback', value: 9, change: '-2%', icon: 'message' },
  { label: 'Waitlist', value: 14, change: '+7%', icon: 'schedule' },
];



export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const { lockAdminArea } = useAccess();
  const [activityView, setActivityView] = useState('weekly');

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    lockAdminArea();
    Alert.alert('Logged out', 'You have been logged out.');
    router.replace('/admin-access');
  };

  
  const activityData = {
    weekly: [45, 52, 48, 65, 72, 58, 64],
    monthly: [180, 220, 190, 250, 280, 240, 260, 275, 290, 310, 320, 280],
    yearly: [2400, 2210, 2290, 2000, 2181, 2500, 2100],
  };

  
  const orderRateData = [35, 42, 38, 55, 48, 65, 52, 68, 58, 72, 80, 75];

  const SimpleLineChart = ({ data, labels }) => {
    const maxValue = Math.max(...data);
    const chartHeight = 160;
    const chartWidth = width - 80;
    const interval = 4;
    const chartBlocks = 5;

    const lineLabels = labels || data.map((_, idx) => `W${idx + 1}`);

    return (
      <View style={styles.chartContainer}>
        <View style={styles.lineChartWrapper}>
          <View style={styles.yAxis}>
            {Array.from({ length: chartBlocks + 1 }).map((_, idx) => {
              const value = Math.round(maxValue - (maxValue / chartBlocks) * idx);
              return (
                <View key={idx} style={styles.yAxisRow}>
                  <Text style={styles.yAxisLabel}>{value}</Text>
                  <View style={styles.gridLine} />
                </View>
              );
            })}
          </View>
          <View style={styles.chartPlot}>
            {data.map((value, idx) => {
              const height = (value / maxValue) * chartHeight;
              return (
                <View key={idx} style={[styles.plotPointContainer]}> 
                  <View style={[styles.bar, { height, backgroundColor: '#2d8cff' }]} />
                  <View style={[styles.dot, { bottom: height - 4 }]} />
                  <Text style={[styles.dataPointLabel, { bottom: height + 10 }]}>{value}</Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={styles.xAxis}>
          {lineLabels.map((label, idx) => (
            <Text key={idx} style={styles.xAxisLabel}>{label}</Text>
          ))}
        </View>
      </View>
    );
  };

  const SimpleBarChart = ({ data, view }) => {
    const maxValue = Math.max(...data);
    const chartHeight = 140;
    const chartWidth = width - 80;
    const labels = {
      weekly: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      monthly: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      yearly: ['Y1', 'Y2', 'Y3', 'Y4', 'Y5', 'Y6', 'Y7'],
    };

    const labelSet = labels[view] || data.map((_, idx) => `P${idx + 1}`);

    return (
      <View style={styles.chartContainer}>
        <View style={styles.gridBackground}>
          {Array.from({ length: 5 }).map((_, idx) => (
            <View key={idx} style={styles.gridRow} />
          ))}
        </View>
        <View style={styles.barsContainer}>
          {data.map((value, idx) => {
            const height = (value / maxValue) * chartHeight;
            return (
              <View key={idx} style={styles.barColumn}> 
                <View style={styles.barWrapper}>
                  <View style={[styles.bar, { height, backgroundColor: '#10b981' }]} />
                  <Text style={[styles.dataPointLabel, { color: '#1f2b3d', fontWeight: 'bold' }]}>{value}</Text>
                </View>
                <Text style={styles.barLabel}>{labelSet[idx]}</Text>
              </View>
            );
          })}
        </View>
      </View>
    );
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
                  <View
                    style={[
                      styles.navIconCircle,
                      pathname === route && styles.activeNavIconCircle,
                      hovered && styles.hoverNavIconCircle,
                    ]}>
                    <MaterialIcons
                      name={icon}
                      size={18}
                      color={hovered || pathname === route ? 'black' : 'white'}
                    />
                  </View>
                  <Text
                    style={[
                      styles.navText,
                      pathname === route && styles.activeNavText,
                      hovered && styles.hoverNavText,
                      pressed && styles.pressedNavText,
                    ]}>
                    {label}
                  </Text>
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
              <Text style={styles.mainTitle}>Customer Service Dashboard</Text>
              <Text style={styles.mainSubtitle}>Track your restaurant operations at a glance.</Text>
            </View>
          </View>


          <View style={styles.statsRow}>
            {stats.map(({ label, value, change, icon }) => (
              <View key={label} style={styles.statCard}>
                <View style={styles.statTop}>
                  <MaterialIcons name={icon} size={24} color="#3E332F" />
                  <Text style={[styles.changeText, change.startsWith('+') ? styles.positive : styles.negative]}>{change}</Text>
                </View>
                <Text style={styles.statValue}>{value}</Text>
                <Text style={styles.statLabel}>{label}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.sectionTitle}>Business Status</Text>
          
          {/* Total Sales and Expense Cards */}
          <View style={styles.cardsRow}>
            <View style={styles.infoCard}>
              <View style={styles.cardTop}>
                <Text style={styles.cardLabel}>Total Sales</Text>
                <Text style={[styles.cardChange, styles.positive]}>↑ 34.7%</Text>
              </View>
              <Text style={styles.cardValue}>$1200.00</Text>
              <Text style={styles.cardSubtext}>1200 Items</Text>
            </View>
            <View style={styles.infoCard}>
              <View style={styles.cardTop}>
                <Text style={styles.cardLabel}>Total Expense</Text>
                <Text style={[styles.cardChange, styles.negative]}>↓ 34.7%</Text>
              </View>
              <Text style={styles.cardValue}>$950.00</Text>
              <Text style={styles.cardSubtext}>1500 Items</Text>
            </View>
          </View>

          {/* Order Rate Chart */}
          <View style={styles.chartCard}>
            <Text style={styles.chartTitle}>Order Rate</Text>
            <SimpleLineChart data={orderRateData} labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']} />
          </View>

          {/* Activity Chart */}
          <View style={styles.chartCard}>
            <View style={styles.chartHeader}>
              <Text style={styles.chartTitle}>Activity</Text>
              <View style={styles.viewToggle}>
                <TouchableOpacity 
                  style={[styles.toggleBtn, activityView === 'weekly' && styles.toggleBtnActive]}
                  onPress={() => setActivityView('weekly')}>
                  <Text style={[styles.toggleText, activityView === 'weekly' && styles.toggleTextActive]}>Weekly</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleBtn, activityView === 'monthly' && styles.toggleBtnActive]}
                  onPress={() => setActivityView('monthly')}>
                  <Text style={[styles.toggleText, activityView === 'monthly' && styles.toggleTextActive]}>Monthly</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.toggleBtn, activityView === 'yearly' && styles.toggleBtnActive]}
                  onPress={() => setActivityView('yearly')}>
                  <Text style={[styles.toggleText, activityView === 'yearly' && styles.toggleTextActive]}>Yearly</Text>
                </TouchableOpacity>
              </View>
            </View>
            <SimpleBarChart data={activityData[activityView]} view={activityView} />
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
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    minWidth: 160,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
  },
  cardChange: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 4,
  },
  cardSubtext: {
    fontSize: 12,
    color: '#9ca3af',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  viewToggle: {
    flexDirection: 'row',
    gap: 8,
  },
  toggleBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  toggleBtnActive: {
    backgroundColor: '#dcf472',
    borderColor: '#dcf472',
  },
  toggleText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#1f2b3d',
  },
  chartContainer: {
    marginTop: 16,
  },
  lineChartWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 200,
    marginBottom: 16,
  },
  yAxis: {
    width: 35,
    justifyContent: 'space-between',
    height: 150,
    paddingRight: 8,
    alignItems: 'flex-end',
  },
  yAxisLabel: {
    fontSize: 11,
    color: '#9ca3af',
  },
  chartPlot: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    paddingHorizontal: 4,
    height: 150,
    borderBottomWidth: 1,
    borderColor: '#e5e7eb',
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginLeft: 35,
    paddingHorizontal: 4,
    paddingTop: 8,
  },
  xAxisLabel: {
    fontSize: 11,
    color: '#6b7280',
    fontWeight: '600',
  },
  yAxisRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  plotPointContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  gridLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e5e7eb',
    marginLeft: 6,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#2d8cff',
  },
  dataPointLabel: {
    fontSize: 10,
    color: '#2d8cff',
    position: 'absolute',
    top: -20,
    textAlign: 'center',
  },
  gridBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 30,
    justifyContent: 'space-between',
  },
  gridRow: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
  barsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 150,
    paddingHorizontal: 4,
  },
  barColumn: {
    flex: 1,
    alignItems: 'center',
  },
  barWrapper: {
    position: 'relative',
    alignItems: 'center',
  },
  bar: {
    width: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  barLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
    textAlign: 'center',
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
});
