import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

const menuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    price: '$24.99',
    category: 'Main Course',
    status: 'Available',
    prepTime: '18 mins',
    description: 'Lemon herb salmon with roasted vegetables and garlic butter.',
    image: 'https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Z3JpbGxlZCUyMHNhbG1vbnxlbnwwfHwwfHx8MA%3D%3D',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    price: '$12.50',
    category: 'Appetizer',
    status: 'Available',
    prepTime: '10 mins',
    description: 'Crisp romaine, parmesan, croutons, and house Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Flc2FyJTIwc2FsYWR8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    price: '$8.99',
    category: 'Dessert',
    status: 'Unavailable',
    prepTime: '12 mins',
    description: 'Rich layered cake with dark chocolate ganache and berries.',
    image: 'https://images.unsplash.com/photo-1702841579337-410618db2715?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTV8fGNob2NvbGF0ZSUyMGNha2V8ZW58MHx8MHx8fDA%3D',
  },
  {
    id: 4,
    name: 'Espresso',
    price: '$4.50',
    category: 'Beverage',
    status: 'Available',
    prepTime: '5 mins',
    description: 'Bold single-shot espresso with a deep aroma and smooth crema.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZXNwcmVzc298ZW58MHx8MHx8fDA%3D',
  },
];


export default function MenuManagement() {
  const router = useRouter();
  const pathname = usePathname();
  const [menuItemsData, setMenuItemsData] = useState(menuItems);

  const handleNavigation = (route) => {
    if (route) {
      router.push(route);
    }
  };

  const handleLogout = () => {
    Alert.alert('Logged out', 'You have been logged out.');
    router.replace('/');
  };

  const handleHideItem = (itemId) => {
    setMenuItemsData((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, hidden: !item.hidden } : item
      )
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
              <Text style={styles.mainTitle}>Menu Management</Text>
              <Text style={styles.mainSubtitle}>Update menu items, pricing, and availability.</Text>
            </View>
            <TouchableOpacity style={styles.addBtn}>
              <MaterialIcons name="add" size={20} color="#fff" />
              <Text style={styles.addBtnText}>Add Menu Item</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.categoryScroll}>
            <TouchableOpacity style={[styles.categoryTag, { borderBottomWidth: 3, borderBottomColor: '#2d8cff' }]}>
              <Text style={styles.categoryTagActive}>All Items</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>Appetizers</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>Main Courses</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>Desserts</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>Beverages</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.menuItemsGrid}>
            {menuItemsData.map((item) => (
              <View key={item.id} style={[styles.menuItem, item.hidden && styles.hiddenMenuItem]}>
                <Image source={{ uri: item.image }} style={styles.menuImage} />
                <View style={styles.itemHeader}>
                  <View style={styles.itemTextContent}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    {item.hidden ? (
                      <View style={styles.hiddenBadge}>
                        <Text style={styles.hiddenBadgeText}>Hidden</Text>
                      </View>
                    ) : null}
                    <Text style={styles.itemCategory}>{item.category}</Text>
                    <Text style={styles.itemDescription}>{item.description}</Text>
                    <Text style={styles.itemDetails}>Prep time: {item.prepTime}</Text>
                    {item.details ? <Text style={styles.itemDetails}>{item.details}</Text> : null}
                  </View>
                  <View style={styles.statusContainer}>
                    <Text style={[styles.itemStatus, item.status === 'Available' ? {color: '#10b981'} : {color: '#ef4444'}]}>
                      ●
                    </Text>
                    <Text style={[styles.statusText, item.status === 'Available' ? {color: '#10b981'} : {color: '#ef4444'}]}>
                      {item.status}
                    </Text>
                  </View>
                </View>
                <View style={styles.itemFooter}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  <View style={styles.itemActions}>
                    <Pressable
                      style={({ hovered, pressed }) => [
                        styles.editBtn,
                        hovered && styles.editBtnHover,
                        pressed && styles.actionBtnPressed,
                      ]}>
                      <View style={styles.actionBtnContent}>
                        <Text style={styles.editBtnText}>Edit</Text>
                        <MaterialIcons name="edit" size={16} color="#ffffff" />
                      </View>
                    </Pressable>
                    <Pressable
                      onPress={() => handleHideItem(item.id)}
                      style={({ hovered, pressed }) => [
                        styles.hideBtn,
                        hovered && styles.hideBtnHover,
                        pressed && styles.actionBtnPressed,
                      ]}>
                      <View style={styles.actionBtnContent}>
                        <Text style={styles.hideBtnText}>{item.hidden ? 'Show' : 'Hide'}</Text>
                        <MaterialIcons name={item.hidden ? 'visibility' : 'visibility-off'} size={16} color="#ffffff" />
                      </View>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
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
  categoryScroll: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
    paddingBottom: 12,
  },
  categoryTag: {
    paddingVertical: 8,
    paddingHorizontal: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  categoryTagText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#6b7280',
  },
  categoryTagActive: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2d8cff',
  },
  menuItemsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  menuItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: width > 900 ? '48%' : '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  menuImage: {
    width: '100%',
    height: 170,
    backgroundColor: '#e5e7eb',
  },
  itemTextContent: {
    flex: 1,
    paddingRight: 14,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  itemCategory: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4,
    marginBottom: 8,
  },
  itemDescription: {
    fontSize: 13,
    color: '#374151',
    lineHeight: 19,
    marginBottom: 6,
  },
  itemDetails: {
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '600',
  },
  itemStatus: {
    fontSize: 20,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  itemActions: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  editBtn: {
    backgroundColor: '#EAD637',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 92,
    justifyContent: 'center',
  },
  editBtnHover: {
    backgroundColor: '#d4c130',
  },
  editBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  hideBtn: {
    backgroundColor: '#6b7280',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    minWidth: 92,
    justifyContent: 'center',
  },
  hideBtnHover: {
    backgroundColor: '#4b5563',
  },
  hideBtnText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: '600',
  },
  hiddenMenuItem: {
    opacity: 0.45,
    borderColor: '#d1d5db',
    borderWidth: 1,
  },
  hiddenBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#f97316',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
  },
  hiddenBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  actionBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  actionBtnPressed: {
    opacity: 0.88,
  },
});