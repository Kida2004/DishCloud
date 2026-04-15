import { useMemo, useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import UserPageFrame from './UserPageFrame';

const menuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    price: '$24.99',
    category: 'Main Course',
    status: 'Available',
    prepTime: '18 mins',
    description: 'Lemon herb salmon with roasted vegetables and garlic butter.',
    image: 'https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    price: '$12.50',
    category: 'Appetizer',
    status: 'Available',
    prepTime: '10 mins',
    description: 'Crisp romaine, parmesan, croutons, and house Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    price: '$8.99',
    category: 'Dessert',
    status: 'Available',
    prepTime: '12 mins',
    description: 'Rich layered cake with dark chocolate ganache and berries.',
    image: 'https://images.unsplash.com/photo-1702841579337-410618db2715?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Espresso',
    price: '$4.50',
    category: 'Beverage',
    status: 'Available',
    prepTime: '5 mins',
    description: 'Bold single-shot espresso with a deep aroma and smooth crema.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=60',
  },
];

const categories = ['All Items', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

export default function UserMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const { width } = useWindowDimensions();
  const isWide = width > 960;

  const filteredItems = useMemo(() => {
    if (selectedCategory === 'All Items') {
      return menuItems;
    }

    return menuItems.filter((item) => item.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <UserPageFrame screen="menu" showFooter>
      <View style={styles.headerCard}>
        <View style={styles.headerTextBlock}>
          <Text style={styles.title}>Menu of Terraza Noble</Text>
        </View>
      </View>

      <View style={styles.categoryRow}>
        {categories.map((category) => {
          const isActive = category === selectedCategory;

          return (
            <Pressable
              key={category}
              onPress={() => setSelectedCategory(category)}
              style={({ pressed }) => [
                styles.categoryTag,
                isActive && styles.categoryTagActive,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>{category}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.menuGrid}>
        {filteredItems.map((item) => (
          <View key={item.id} style={[styles.menuCard, isWide && styles.menuCardWide]}>
            <Image source={{ uri: item.image }} style={styles.menuImage} />
            <View style={styles.menuBody}>
              <View style={styles.itemTopRow}>
                <View style={styles.itemTextBlock}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemCategory}>{item.category}</Text>
                </View>
                <View style={[styles.statusPill, item.status !== 'Available' && styles.statusPillMuted]}>
                  <Text style={[styles.statusText, item.status !== 'Available' && styles.statusTextMuted]}>{item.status}</Text>
                </View>
              </View>

              <Text style={styles.itemDescription}>{item.description}</Text>
              <Text style={styles.itemMeta}>Prep time: {item.prepTime}</Text>

              <View style={styles.itemFooter}>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </UserPageFrame>
  );
}

const styles = StyleSheet.create({
  headerCard: {
    backgroundColor: '#fffaf5',
    borderRadius: 28,
    padding: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    gap: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 3,
  },
  headerTextBlock: {
    flex: 1,
    minWidth: 260,
  },
  title: {
    fontSize: 30,
    lineHeight: 36,
    color: '#1f2937',
    fontWeight: '900',
    maxWidth: 620,
  },
  categoryRow: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  categoryTag: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#eadbc8',
  },
  categoryTagActive: {
    backgroundColor: '#6b4f3c',
  },
  categoryText: {
    color: '#6b4f3c',
    fontSize: 13,
    fontWeight: '700',
  },
  categoryTextActive: {
    color: '#fffaf5',
  },
  pressed: {
    opacity: 0.88,
  },
  menuGrid: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  menuCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 22,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  menuCardWide: {
    width: '48.7%',
  },
  menuImage: {
    width: '100%',
    height: 190,
    backgroundColor: '#e5e7eb',
  },
  menuBody: {
    padding: 18,
  },
  itemTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
  },
  itemTextBlock: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
  },
  itemCategory: {
    marginTop: 4,
    fontSize: 12,
    color: '#9a3412',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  statusPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#dcfce7',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusPillMuted: {
    backgroundColor: '#fef3c7',
  },
  statusText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '700',
  },
  statusTextMuted: {
    color: '#b45309',
  },
  itemDescription: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#4b5563',
  },
  itemMeta: {
    marginTop: 8,
    fontSize: 12,
    color: '#9ca3af',
    fontWeight: '700',
  },
  itemFooter: {
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#eee5d9',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1f2937',
  },
});
