import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

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


export default function Feedback() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const reviews = [
    {name: 'Emily Richardson', rating: 5, text: 'Amazing food and excellent service!', date: '2 hours ago'},
    {name: 'David Martinez', rating: 4, text: 'Great atmosphere, could improve portion sizes', date: '5 hours ago'},
    {name: 'Jessica Lee', rating: 5, text: 'Best restaurant in town, highly recommended!', date: '1 day ago'},
    {name: 'Michael Chen', rating: 3, text: 'Food was okay, but service was slow', date: '2 days ago'},
    {name: 'Sarah Johnson', rating: 5, text: 'Perfect dining experience, will come back!', date: '3 days ago'},
    {name: 'Robert Wilson', rating: 4, text: 'Great food, nice ambiance', date: '1 week ago'}
  ];

  const filteredReviews = reviews.filter(review =>
    review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    review.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              style={[styles.navItem, route === '/feedback' && styles.activeNavItem]}
              onPress={() => handleNavigation(route)}>
              <Text style={[styles.navText, route === '/feedback' && styles.activeNavText]}>{label}</Text>
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
              <Text style={styles.mainTitle}>Customer Feedback</Text>
              <Text style={styles.mainSubtitle}>View and respond to customer reviews and comments.</Text>
            </View>
          </View>

          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#9ca3af" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search reviews by customer name or content..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9ca3af"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#9ca3af" />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <MaterialIcons name="star" size={24} color="#fbbf24" />
              <Text style={styles.statValue}>4.8</Text>
              <Text style={styles.statLabel}>Avg Rating</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="message" size={24} color="#2d8cff" />
              <Text style={styles.statValue}>156</Text>
              <Text style={styles.statLabel}>Total Reviews</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="thumb-up" size={24} color="#10b981" />
              <Text style={styles.statValue}>92%</Text>
              <Text style={styles.statLabel}>Positive</Text>
            </View>
            <View style={styles.statCard}>
              <MaterialIcons name="reply" size={24} color="#8b5cf6" />
              <Text style={styles.statValue}>45</Text>
              <Text style={styles.statLabel}>Responded</Text>
            </View>
          </View>

          <View style={styles.filterRow}>
            <TouchableOpacity style={[styles.filterTag, {backgroundColor: '#e5e9f0'}]}><Text style={{color: '#fff', fontWeight: '600'}}>⭐⭐⭐⭐⭐</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}><Text style={styles.filterTagText}>⭐⭐⭐⭐</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}><Text style={styles.filterTagText}>⭐⭐⭐</Text></TouchableOpacity>
            <TouchableOpacity style={styles.filterTag}><Text style={styles.filterTagText}>Recent</Text></TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>
            Recent Reviews {filteredReviews.length < reviews.length && `(${filteredReviews.length} of ${reviews.length})`}
          </Text>
          {filteredReviews.length > 0 ? (
            filteredReviews.map((review, idx) => (
              <View key={idx} style={styles.feedbackCard}>
                <View style={styles.feedbackTop}>
                  <View>
                    <Text style={styles.reviewerName}>{review.name}</Text>
                    <Text style={styles.reviewDate}>{review.date}</Text>
                  </View>
                  <Text style={styles.rating}>{'⭐'.repeat(review.rating)}</Text>
                </View>
                <Text style={styles.reviewText}>{review.text}</Text>
                <View style={styles.feedbackActions}>
                  <TouchableOpacity style={styles.replyBtn}><Text style={styles.replyBtnText}>Reply</Text></TouchableOpacity>
                  <TouchableOpacity style={styles.archiveBtn}><Text style={styles.archiveBtnText}>Archive</Text></TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <MaterialIcons name="search-off" size={48} color="#d1d5db" />
              <Text style={styles.emptyStateTitle}>No reviews found</Text>
              <Text style={styles.emptyStateText}>Try adjusting your search terms</Text>
            </View>
          )}
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
  searchInput: {
    flex: 1,
    fontSize: 14,
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
    width: width > 800 ? '24%' : '100%',
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
  filterRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
    flexWrap: 'wrap',
  },
  filterTag: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
  },
  filterTagText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6b7280',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2b3d',
    marginBottom: 16,
  },
  feedbackCard: {
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
  feedbackTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  reviewDate: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
  },
  rating: {
    fontSize: 16,
  },
  reviewText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  feedbackActions: {
    flexDirection: 'row',
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6b7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});

