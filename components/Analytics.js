import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

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

const monthlySalesData = [
  { label: 'Jan', value: 8200 },
  { label: 'Feb', value: 9100 },
  { label: 'Mar', value: 8700 },
  { label: 'Apr', value: 9800 },
  { label: 'May', value: 10400 },
  { label: 'Jun', value: 11200 },
];

const orderRateData = [
  { label: 'Mon', value: 42 },
  { label: 'Tue', value: 48 },
  { label: 'Wed', value: 45 },
  { label: 'Thu', value: 57 },
  { label: 'Fri', value: 63 },
  { label: 'Sat', value: 71 },
  { label: 'Sun', value: 66 },
];

function CircularChartCard({ data, color, valuePrefix = '', valueSuffix = '', centerLabel, totalLabel }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const average = Math.round(total / data.length);
  const maxValue = Math.max(...data.map((item) => item.value));
  const progress = Math.min(total / (maxValue * data.length || 1), 1);
  const progressDegrees = progress * 360;
  const palette = ['#2d8cff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#14b8a6', '#f97316', '#6366f1'];
  const chartEntries = data.map((item, idx) => ({
    ...item,
    color: palette[idx % palette.length],
    share: total ? Math.round((item.value / total) * 100) : 0,
  }));
  const rotation = `${Math.max(progressDegrees - 180, 0)}deg`;

  return (
    <View style={styles.chartCard}>
      <View style={styles.circleChartLayout}>
        <View style={styles.circleChartWrap}>
          <View style={[styles.progressTrack, { borderColor: `${color}20` }]} />
          <View style={styles.progressMask}>
            <View style={styles.progressHalfWrapLeft}>
              <View
                style={[
                  styles.progressHalf,
                  {
                    borderColor: progress > 0.5 ? color : 'transparent',
                    left: 0,
                  },
                ]}
              />
            </View>
            <View style={styles.progressHalfWrapRight}>
              <View
                style={[
                  styles.progressHalf,
                  {
                    borderColor: color,
                    left: -95,
                    transform: [{ rotate: rotation }],
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.progressInner}>
            <Text style={styles.progressValue}>
              {valuePrefix}
              {centerLabel ?? average}
              {valueSuffix}
            </Text>
            <Text style={styles.progressCaption}>{totalLabel}</Text>
          </View>
        </View>

        <View style={styles.legendList}>
          {chartEntries.map((item) => (
            <View key={item.label} style={styles.legendRow}>
              <View style={styles.legendLabelRow}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
              <Text style={styles.legendValue}>
                {valuePrefix}
                {item.value}
                {valueSuffix}
                <Text style={styles.legendShare}>  {item.share}%</Text>
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default function Analytics() {
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
              <Text style={styles.mainTitle}>Analytics & Reports</Text>
              <Text style={styles.mainSubtitle}>View performance metrics and business insights.</Text>
            </View>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="bar-chart" size={24} color="#2d8cff" />
              <Text style={styles.statValue}>$12.4K</Text>
              <Text style={styles.statLabel}>Weekly Revenue</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="trending-up" size={24} color="#10b981" />
              <Text style={styles.statValue}>+23%</Text>
              <Text style={styles.statLabel}>Growth vs Last Week</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="people" size={24} color="#f59e0b" />
              <Text style={styles.statValue}>450</Text>
              <Text style={styles.statLabel}>New Customers</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Top Selling Categories</Text>
          <View style={styles.chipGroup}>
            {['Asian', 'Italian', 'Western', 'Desserts'].map((category, idx) => <View key={idx} style={styles.chip}><Text style={styles.chipText}>{category}</Text></View>)}
          </View>

          <Text style={styles.sectionTitle}>Monthly Sales Trend</Text>
          <CircularChartCard
            data={monthlySalesData}
            color="#2d8cff"
            valuePrefix="$"
            centerLabel={`${Math.round(monthlySalesData.reduce((sum, item) => sum + item.value, 0) / 1000)}K`}
            totalLabel="Total Sales"
          />

          <Text style={styles.sectionTitle}>Order Rate</Text>
          <CircularChartCard
            data={orderRateData}
            color="#10b981"
            valueSuffix="%"
            centerLabel={Math.round(orderRateData.reduce((sum, item) => sum + item.value, 0) / orderRateData.length)}
            totalLabel="Avg Order Rate"
          />
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
    width: width > 800 ? '30%' : '100%',
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
    marginBottom: 8,
  },
  chipGroup: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#eef2ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  chipText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  chartCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  circleChartLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 20,
  },
  circleChartWrap: {
    width: 190,
    height: 190,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressTrack: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 18,
  },
  progressMask: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    transform: [{ rotate: '-90deg' }],
  },
  progressHalfWrapLeft: {
    position: 'absolute',
    left: 0,
    width: 95,
    height: 190,
    overflow: 'hidden',
  },
  progressHalfWrapRight: {
    position: 'absolute',
    right: 0,
    width: 95,
    height: 190,
    overflow: 'hidden',
  },
  progressHalf: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 18,
  },
  progressInner: {
    position: 'absolute',
    width: 128,
    height: 128,
    borderRadius: 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressValue: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1f2b3d',
  },
  progressCaption: {
    marginTop: 6,
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '600',
  },
  legendList: {
    flex: 1,
    minWidth: 220,
    gap: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f7',
  },
  legendLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: '600',
  },
  legendValue: {
    fontSize: 13,
    color: '#1f2b3d',
    fontWeight: '700',
  },
  legendShare: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '600',
  },
});
