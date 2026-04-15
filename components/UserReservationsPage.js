import { MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Image, Modal, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import UserPageFrame from './UserPageFrame';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const TIME_SLOTS = [
  { label: '12:00 PM', value: '12:00' },
  { label: '12:30 PM', value: '12:30' },
  { label: '1:00 PM', value: '13:00' },
  { label: '1:30 PM', value: '13:30' },
  { label: '6:00 PM', value: '18:00' },
  { label: '6:30 PM', value: '18:30' },
  { label: '7:00 PM', value: '19:00' },
  { label: '7:30 PM', value: '19:30' },
  { label: '8:00 PM', value: '20:00' },
  { label: '8:30 PM', value: '20:30' },
  { label: '9:00 PM', value: '21:00' },
  { label: '9:30 PM', value: '21:30' },
];

const availableTables = [
  { id: 'T12', type: 'Window Table', seats: 2, location: 'Near window' },
  { id: 'T05', type: 'Booth for 4', seats: 4, location: 'Quiet corner' },
  { id: 'T18', type: 'Standard Table', seats: 2, location: 'Main dining' },
  { id: 'T22', type: 'Round Table', seats: 4, location: 'Center area' },
  { id: 'T09', type: 'Private Booth', seats: 6, location: 'Semi-private' },
  { id: 'T14', type: 'Bar Table', seats: 2, location: 'Bar area' },
];

const menuItems = [
  {
    id: 1,
    name: 'Grilled Salmon',
    price: 24.99,
    category: 'Main Course',
    prepTime: '18 mins',
    description: 'Lemon herb salmon with roasted vegetables and garlic butter.',
    image: 'https://plus.unsplash.com/premium_photo-1723478417559-2349252a3dda?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 2,
    name: 'Caesar Salad',
    price: 12.50,
    category: 'Appetizer',
    prepTime: '10 mins',
    description: 'Crisp romaine, parmesan, croutons, and house Caesar dressing.',
    image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 3,
    name: 'Chocolate Cake',
    price: 8.99,
    category: 'Dessert',
    prepTime: '12 mins',
    description: 'Rich layered cake with dark chocolate ganache and berries.',
    image: 'https://images.unsplash.com/photo-1702841579337-410618db2715?w=600&auto=format&fit=crop&q=60',
  },
  {
    id: 4,
    name: 'Espresso',
    price: 4.50,
    category: 'Beverage',
    prepTime: '5 mins',
    description: 'Bold single-shot espresso with a deep aroma and smooth crema.',
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=600&auto=format&fit=crop&q=60',
  },
];

const categories = ['All Items', 'Appetizer', 'Main Course', 'Dessert', 'Beverage'];

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay();
}

function CalendarModal({ visible, onClose, onSelectDate, selectedDate }) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay = getFirstDayOfMonth(viewYear, viewMonth);

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  const isSelected = (day) => {
    if (!day || !selectedDate) return false;
    const s = new Date(selectedDate + 'T00:00:00');
    return s.getFullYear() === viewYear && s.getMonth() === viewMonth && s.getDate() === day;
  };

  const isPast = (day) => {
    if (!day) return false;
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(0, 0, 0, 0);
    const t = new Date(); t.setHours(0, 0, 0, 0);
    return d < t;
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.monthNav}>
            <TouchableOpacity onPress={prevMonth} style={styles.navBtn}>
              <Text style={styles.navArrow}>‹</Text>
            </TouchableOpacity>
            <Text style={styles.monthTitle}>
              {MONTHS[viewMonth]} {viewYear}
            </Text>
            <TouchableOpacity onPress={nextMonth} style={styles.navBtn}>
              <Text style={styles.navArrow}>›</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.dayHeaders}>
            {DAYS.map(d => (
              <View key={d} style={styles.dayHeaderCell}>
                <Text style={styles.dayHeaderText}>{d}</Text>
              </View>
            ))}
          </View>

          <View style={styles.calendarGrid}>
            {cells.map((day, i) => (
              <View key={i} style={styles.calendarCell}>
                {day ? (
                  <TouchableOpacity
                    disabled={isPast(day)}
                    onPress={() => {
                      const dt = new Date(viewYear, viewMonth, day);
                      onSelectDate(dt.toISOString().split('T')[0]);
                      onClose();
                    }}
                    style={[
                      styles.dayCell,
                      isSelected(day) && styles.dayCellSelected,
                      isPast(day) && styles.dayCellPast,
                    ]}
                  >
                    <Text style={[styles.dayText, isSelected(day) && styles.dayTextSelected]}>
                      {day}
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <View style={styles.emptyCell} />
                )}
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

function formatDisplayDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
}

export default function UserReservationsPage() {
  const [guests, setGuests] = useState(2);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [selectedTable, setSelectedTable] = useState(null);
  const [step, setStep] = useState('form'); 

  // Menu states
  const [selectedCategory, setSelectedCategory] = useState('All Items');
  const [orderItems, setOrderItems] = useState([]); 

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [error, setError] = useState('');

  const { width } = useWindowDimensions();
  const isWide = width > 960;

  const filteredMenuItems = useMemo(() => {
    if (selectedCategory === 'All Items') return menuItems;
    return menuItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory]);

  const totalOrderAmount = orderItems.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

  const handleNextToTable = () => {
    if (!date) { setError('Please select a date.'); return; }
    if (!time) { setError('Please select a time.'); return; }
    setError('');
    setStep('table-selection');
  };

  const handleTableSelect = (table) => setSelectedTable(table);

  const handleGoToMenu = () => {
    if (!selectedTable) return;
    setStep('menu');
  };

  const addToOrder = (menuItem) => {
    setOrderItems(prev => {
      const existing = prev.findIndex(i => i.menuItem.id === menuItem.id);
      if (existing !== -1) {
        const updated = [...prev];
        updated[existing].quantity += 1;
        return updated;
      }
      return [...prev, { menuItem, quantity: 1 }];
    });
  };

  const changeQuantity = (id, delta) => {
    setOrderItems(prev =>
      prev.map(item => {
        if (item.menuItem.id === id) {
          const newQty = item.quantity + delta;
          return newQty >= 1 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean)
    );
  };

  const handleConfirmReservation = () => {
    if (orderItems.length === 0) return;
    setStep('confirmed');
  };

  const handleReset = () => {
    setGuests(2);
    setDate('');
    setTime('');
    setSelectedTable(null);
    setOrderItems([]);
    setSelectedCategory('All Items');
    setStep('form');
    setError('');
  };

  const selectedTimeLabel = TIME_SLOTS.find(t => t.value === time)?.label;

  return (
    <UserPageFrame screen="reservations">
      <StatusBar barStyle="dark-content" />

      <CalendarModal
        visible={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        onSelectDate={setDate}
        selectedDate={date}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {step === 'form' && (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Make a Reservation</Text>
              <Text style={styles.subtitle}>Reserve your table at Terraza Noble</Text>
            </View>

            <View style={styles.body}>
              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Number of Guests</Text>
                <View style={styles.card}>
                  <View style={styles.guestRow}>
                    <TouchableOpacity onPress={() => setGuests(g => Math.max(1, g - 1))} style={styles.counterBtn}>
                      <Text style={styles.counterSymbol}>−</Text>
                    </TouchableOpacity>
                    <View style={styles.guestCenter}>
                      <Text style={styles.guestNumber}>{guests}</Text>
                      <Text style={styles.guestWord}>{guests === 1 ? 'Guest' : 'Guests'}</Text>
                    </View>
                    <TouchableOpacity onPress={() => setGuests(g => Math.min(20, g + 1))} style={styles.counterBtn}>
                      <Text style={styles.counterSymbol}>+</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.helperText}>Maximum 20 guests • Larger groups: please call us</Text>
                </View>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Date</Text>
                <TouchableOpacity style={styles.card} onPress={() => setCalendarOpen(true)}>
                  <View style={styles.dateRow}>
                    <View style={styles.iconBox}>
                      <Text style={styles.calendarIcon}>📅</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      {date ? (
                        <Text style={styles.dateText}>{formatDisplayDate(date)}</Text>
                      ) : (
                        <Text style={styles.placeholder}>Select a date</Text>
                      )}
                      <Text style={styles.helperText}>Tap to change date</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <Text style={styles.sectionLabel}>Preferred Time</Text>
                <View style={styles.card}>
                  <Text style={styles.timeGroupLabel}>Lunch Service</Text>
                  <View style={styles.timeGrid}>
                    {TIME_SLOTS.slice(0, 4).map(slot => (
                      <TouchableOpacity
                        key={slot.value}
                        onPress={() => setTime(slot.value)}
                        style={[styles.timeChip, time === slot.value && styles.timeChipActive]}
                      >
                        <Text style={[styles.timeChipText, time === slot.value && styles.timeChipTextActive]}>
                          {slot.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>

                  <View style={styles.timeSeparator} />

                  <Text style={styles.timeGroupLabel}>Dinner Service</Text>
                  <View style={styles.timeGrid}>
                    {TIME_SLOTS.slice(4).map(slot => (
                      <TouchableOpacity
                        key={slot.value}
                        onPress={() => setTime(slot.value)}
                        style={[styles.timeChip, time === slot.value && styles.timeChipActive]}
                      >
                        <Text style={[styles.timeChipText, time === slot.value && styles.timeChipTextActive]}>
                          {slot.label}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </View>

              {!!error && (
                <View style={styles.errorBox}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              {(date || time) && (
                <View style={styles.summaryCard}>
                  <Text style={styles.summaryText}>
                    {guests} {guests === 1 ? 'guest' : 'guests'} •{' '}
                    {date ? new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : ''} •{' '}
                    {time ? selectedTimeLabel : ''}
                  </Text>
                </View>
              )}

              <TouchableOpacity onPress={handleNextToTable} style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>CHOOSE TABLE</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {step === 'table-selection' && (
          <View style={styles.body}>
            <Text style={styles.tableSelectionTitle}>Choose Your Table</Text>
            <Text style={styles.tableSelectionSubtitle}>
              Available tables for {selectedTimeLabel} on{' '}
              {date ? new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : ''}
            </Text>

            <View style={styles.tableGrid}>
              {availableTables.map(table => (
                <TouchableOpacity
                  key={table.id}
                  onPress={() => handleTableSelect(table)}
                  style={[styles.tableCard, selectedTable?.id === table.id && styles.tableCardSelected]}
                >
                  <View style={styles.tableIcon}>
                    <MaterialIcons
                      name="table-restaurant"
                      size={32}
                      color={selectedTable?.id === table.id ? '#fff' : '#4A3728'}
                    />
                  </View>
                  <Text style={[styles.tableType, selectedTable?.id === table.id && styles.tableTypeSelected]}>
                    {table.type}
                  </Text>
                  <Text style={styles.tableInfo}>
                    {table.seats} seats • {table.location}
                  </Text>
                  <Text style={styles.tableId}>Table {table.id}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <TouchableOpacity
              onPress={handleGoToMenu}
              disabled={!selectedTable}
              style={[styles.primaryButton, !selectedTable && { opacity: 0.6 }]}
            >
              <Text style={styles.primaryButtonText}>
                {selectedTable ? `CONTINUE TO MENU (TABLE ${selectedTable.id})` : 'SELECT A TABLE'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('form')} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>BACK TO DETAILS</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'menu' && (
          <View style={styles.body}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Order Your Meal</Text>
              <Text style={styles.menuSubtitle}>
                Table {selectedTable?.id} • {selectedTimeLabel} • {guests} guests
              </Text>
            </View>

            <View style={styles.categoryRow}>
              {categories.map((category) => {
                const isActive = category === selectedCategory;

                return (
                  <TouchableOpacity
                    key={category}
                    onPress={() => setSelectedCategory(category)}
                    style={[styles.categoryTag, isActive && styles.categoryTagActive]}
                  >
                    <Text style={[styles.categoryText, isActive && styles.categoryTextActive]}>
                      {category}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.menuGrid}>
              {filteredMenuItems.map((item) => {
                const currentQty = orderItems.find((o) => o.menuItem.id === item.id)?.quantity || 0;

                return (
                  <View key={item.id} style={[styles.menuCard, isWide && styles.menuCardWide]}>
                    <Image source={{ uri: item.image }} style={styles.menuImage} />

                    <View style={styles.menuBody}>
                      <View style={styles.itemTopRow}>
                        <View style={styles.itemTextBlock}>
                          <Text style={styles.itemName}>{item.name}</Text>
                          <Text style={styles.itemCategory}>{item.category}</Text>
                        </View>

                        <View style={styles.statusPill}>
                          <Text style={styles.statusText}>Available</Text>
                        </View>
                      </View>

                      <Text style={styles.itemDescription}>{item.description}</Text>
                      <Text style={styles.itemMeta}>Prep time: {item.prepTime}</Text>

                      <View style={styles.itemFooter}>
                        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>

                        <View style={styles.quantityControls}>
                          <TouchableOpacity
                            onPress={() => changeQuantity(item.id, -1)}
                            style={styles.qtyBtn}
                            disabled={currentQty === 0}
                          >
                            <Text style={styles.qtyText}>-</Text>
                          </TouchableOpacity>
                          <Text style={styles.qtyValue}>{currentQty}</Text>
                          <TouchableOpacity onPress={() => addToOrder(item)} style={styles.qtyBtn}>
                            <Text style={styles.qtyText}>+</Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>

            {orderItems.length > 0 && (
              <View style={styles.orderSummary}>
                <Text style={styles.summaryTitle}>Current Order ({orderItems.length} items)</Text>
                {orderItems.map((oi, idx) => (
                  <View key={idx} style={styles.summaryRow}>
                    <Text style={styles.summaryItemName}>
                      {oi.quantity} × {oi.menuItem.name}
                    </Text>
                    <Text style={styles.summaryPrice}>
                      ${(oi.menuItem.price * oi.quantity).toFixed(2)}
                    </Text>
                  </View>
                ))}
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalAmount}>${totalOrderAmount.toFixed(2)}</Text>
                </View>
              </View>
            )}

            <TouchableOpacity
              onPress={handleConfirmReservation}
              disabled={orderItems.length === 0}
              style={[styles.primaryButton, orderItems.length === 0 && { opacity: 0.6 }]}
            >
              <Text style={styles.primaryButtonText}>
                {orderItems.length > 0 ? 'CONFIRM RESERVATION & ORDER' : 'ADD ITEMS TO CONTINUE'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setStep('table-selection')} style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>BACK TO TABLE SELECTION</Text>
            </TouchableOpacity>
          </View>
        )}

        {step === 'confirmed' && (
          <View style={styles.body}>
            <View style={styles.confirmCard}>
              <MaterialIcons name="check-circle" size={64} color="#4A3728" />
              <Text style={styles.confirmTitle}>Reservation Confirmed</Text>
              <Text style={styles.confirmSubtitle}>Thank you for choosing Terraza Noble</Text>

              {[
                { label: 'Date', value: formatDisplayDate(date) },
                { label: 'Time', value: selectedTimeLabel },
                { label: 'Guests', value: `${guests} guests` },
                { label: 'Table', value: `${selectedTable?.type} (${selectedTable?.id})` },
              ].map(row => (
                <View key={row.label} style={styles.confirmRow}>
                  <Text style={styles.confirmLabel}>{row.label}</Text>
                  <Text style={styles.confirmValue}>{row.value}</Text>
                </View>
              ))}

              {orderItems.length > 0 && (
                <>
                  <Text style={styles.confirmSectionTitle}>Your Order</Text>
                  {orderItems.map((oi, idx) => (
                    <View key={idx} style={styles.confirmRow}>
                      <Text style={styles.confirmLabel}>
                        {oi.quantity} × {oi.menuItem.name}
                      </Text>
                      <Text style={styles.confirmValue}>
                        ${(oi.menuItem.price * oi.quantity).toFixed(2)}
                      </Text>
                    </View>
                  ))}
                  <View style={styles.confirmRow}>
                    <Text style={styles.confirmLabel}>Order Total</Text>
                    <Text style={styles.confirmValue}>${totalOrderAmount.toFixed(2)}</Text>
                  </View>
                </>
              )}

              <Text style={styles.confirmNote}>
                A confirmation has been sent to your email. We look forward to welcoming you.
              </Text>

              <TouchableOpacity onPress={handleReset} style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>MAKE ANOTHER RESERVATION</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </UserPageFrame>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#F8F5F1',
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 60,
  },
  body: {
    padding: 24,
  },

  // Header
  header: {
    paddingTop: 50,
    paddingBottom: 32,
    paddingHorizontal: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5DED3',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1F1F1F',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555555',
    marginTop: 8,
    textAlign: 'center',
  },
  section: {
    marginBottom: 28,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F1F1F',
    marginBottom: 10,
    paddingLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#E5DED3',
  },

  guestRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  counterBtn: {
    width: 56,
    height: 56,
    borderRadius: 12,
    backgroundColor: '#F5F0E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5DED3',
  },
  counterSymbol: {
    fontSize: 28,
    color: '#4A3728',
    fontWeight: '300',
  },
  guestCenter: {
    alignItems: 'center',
  },
  guestNumber: {
    fontSize: 52,
    fontWeight: '700',
    color: '#1F1F1F',
    lineHeight: 54,
  },
  guestWord: {
    fontSize: 13,
    color: '#888888',
    letterSpacing: 0.5,
  },
  helperText: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginTop: 4,
  },

  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  iconBox: {
    width: 52,
    height: 52,
    borderRadius: 12,
    backgroundColor: '#F8F5F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  calendarIcon: {
    fontSize: 22,
    color: '#8C6F47',
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
  },
  placeholder: {
    fontSize: 16,
    color: '#888888',
  },

  timeGroupLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 10,
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  timeChip: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5DED3',
    backgroundColor: '#FFFFFF',
  },
  timeChipActive: {
    backgroundColor: '#4A3728',
    borderColor: '#4A3728',
  },
  timeChipText: {
    fontSize: 14,
    color: '#555555',
  },
  timeChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  timeSeparator: {
    height: 1,
    backgroundColor: '#E5DED3',
    marginVertical: 18,
  },

  errorBox: {
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  errorText: {
    color: '#B91C1C',
    fontSize: 14,
    textAlign: 'center',
  },

  summaryCard: {
    backgroundColor: '#F8F5F1',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5DED3',
  },
  summaryText: {
    fontSize: 15,
    color: '#1F1F1F',
    textAlign: 'center',
    fontWeight: '500',
  },

  primaryButton: {
    backgroundColor: '#4A3728',
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  secondaryButton: {
    borderWidth: 1,
    borderColor: '#4A3728',
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#4A3728',
    fontSize: 14,
    fontWeight: '700',
  },
  tableSelectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
    marginBottom: 6,
  },
  tableSelectionSubtitle: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 24,
  },
  tableGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 14,
    marginBottom: 32,
  },
  tableCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5DED3',
    alignItems: 'center',
  },
  tableCardSelected: {
    borderColor: '#4A3728',
    backgroundColor: '#4A3728',
  },
  tableIcon: {
    marginBottom: 12,
  },
  tableType: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F1F1F',
    textAlign: 'center',
    marginBottom: 6,
  },
  tableTypeSelected: {
    color: '#FFFFFF',
  },
  tableInfo: {
    fontSize: 13,
    color: '#888888',
    textAlign: 'center',
    marginBottom: 4,
  },
  tableId: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8C6F47',
  },

menuHeader: {
    marginBottom: 24,
  },
  menuTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1F1F1F',
  },
  menuSubtitle: {
    fontSize: 15,
    color: '#555555',
    marginTop: 4,
  },

  categoryRow: {
    marginTop: 8,
    marginBottom: 24,
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

  menuGrid: {
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
  statusText: {
    color: '#15803d',
    fontSize: 12,
    fontWeight: '700',
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
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '900',
    color: '#1f2937',
  },

  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: 8,
    backgroundColor: '#F5F0E9',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5DED3',
  },
  qtyText: {
    fontSize: 18,
    color: '#4A3728',
    fontWeight: '600',
  },
  qtyValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F1F1F',
    minWidth: 20,
    textAlign: 'center',
  },
  orderSummary: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginVertical: 24,
    borderWidth: 1,
    borderColor: '#E5DED3',
  },
  summaryTitle: {
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 12,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  summaryItemName: {
    fontSize: 15,
    color: '#555555',
  },
  summaryPrice: {
    fontSize: 15,
    fontWeight: '600',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5DED3',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#4A3728',
  },

  confirmCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    borderWidth: 1,
    borderColor: '#E5DED3',
    alignItems: 'center',
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1F1F1F',
    marginTop: 16,
    marginBottom: 8,
  },
  confirmSubtitle: {
    fontSize: 15,
    color: '#555555',
    marginBottom: 28,
  },
  confirmSectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1F1F1F',
    marginTop: 20,
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  confirmRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5DED3',
  },
  confirmLabel: {
    fontSize: 14,
    color: '#888888',
  },
  confirmValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1F1F1F',
    textAlign: 'right',
  },
  confirmNote: {
    marginTop: 28,
    fontSize: 14,
    color: '#555555',
    textAlign: 'center',
    lineHeight: 21,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 360,
    borderWidth: 1,
    borderColor: '#E5DED3',
  },
  monthNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  navBtn: {
    padding: 8,
    width: 44,
    alignItems: 'center',
  },
  navArrow: {
    color: '#4A3728',
    fontSize: 24,
  },
  monthTitle: {
    color: '#1F1F1F',
    fontSize: 18,
    fontWeight: '700',
  },
  dayHeaders: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  dayHeaderCell: {
    flex: 1,
    alignItems: 'center',
  },
  dayHeaderText: {
    color: '#888888',
    fontSize: 12,
    fontWeight: '600',
  },
  calendarGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  calendarCell: {
    width: `${100 / 7}%`,
    alignItems: 'center',
    marginBottom: 8,
  },
  dayCell: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dayCellSelected: {
    backgroundColor: '#4A3728',
    borderColor: '#4A3728',
  },
  dayCellPast: {
    opacity: 0.4,
  },
  dayText: {
    fontSize: 16,
    color: '#1F1F1F',
  },
  dayTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  emptyCell: {
    width: 40,
    height: 40,
  },
  closeButton: {
    marginTop: 28,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5DED3',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#555555',
    fontSize: 15,
    fontWeight: '600',
  },
});