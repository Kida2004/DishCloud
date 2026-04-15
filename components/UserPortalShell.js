import { MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import UserPageFrame from './UserPageFrame';

const contentMap = {
  home: {
    title: 'Terraza Noble History',
    heroText:
      'Terraza Noble is opened as a neighborhood restaurant focused on fresh seasonal cuisine, warm service, and a welcoming rooftop atmosphere.',
    description:
      'Our restaurant blends locally sourced ingredients with classic recipes to create a memorable dining experience for every guest.',
    history:
      'Founded in 2015, Terraza Noble grew from a small chef-driven concept into a community favorite. Over the years we have refined our menu, created special gatherings, and become known for thoughtful hospitality.',
    showHeroBadge: false,
    cards: [],
    highlights: [
    'There is events so you wont get bored going there.',
    'The seating is comfortable and intriguing to try the food.',
    'It has a good variety of selection of menu food.',
    'The food is cooked homemade.',
  ],
  },
  menu: {
    eyebrow: 'Menu',
    title: 'Explore the restaurant menu',
    subtitle:
      'Give guests a simple menu page with popular starters, mains, drinks, and desserts laid out like a real restaurant website.',
    heroTitle: 'Fresh ingredients and crowd favorites',
    heroText:
      'Use this screen like a customer-facing menu landing page that helps visitors quickly see what the restaurant is known for.',
    heroStatLabel: 'Most Popular',
    heroStatValue: 'Truffle Pasta',
    cards: [
      { icon: 'brunch-dining', title: 'Starters', text: 'Burrata toast, roasted tomato soup, and crispy calamari begin the meal.' },
      { icon: 'dinner-dining', title: 'Main Courses', text: 'Truffle pasta, grilled salmon, ribeye steak, and herb chicken lead the menu.' },
      { icon: 'local-bar', title: 'Drinks & Dessert', text: 'House mocktails, espresso, citrus tart, and chocolate cake round out the experience.' },
    ],
    highlights: [
      'Designed for guests to browse before arrival.',
      'Menu sections feel simple and easy to scan.',
      'Can later be replaced with real dishes and prices.',
    ],
  },
  reservations: {
    eyebrow: 'Reservations',
    title: 'Reserve a table in just a few taps',
    subtitle:
      'This page works like a reservation page on a restaurant website, guiding guests to book, review hours, and plan their visit.',
    heroTitle: 'Book for lunch, dinner, or special occasions',
    heroText:
      'Keep reservations friendly and guest-facing, with a simple overview of booking times, seating options, and special requests.',
    heroStatLabel: 'Next Open Slot',
    heroStatValue: 'Tonight at 7:30 PM',
    cards: [
      { icon: 'calendar-month', title: 'Easy Booking', text: 'Show date, time, party size, and seating preference in a simple guest-friendly format.' },
      { icon: 'event-seat', title: 'Seating Options', text: 'Mention indoor dining, patio seating, and cozy evening tables for couples or groups.' },
      { icon: 'notifications-active', title: 'Visit Notes', text: 'Support allergy notes, celebrations, and arrival details without exposing admin tools.' },
    ],
    highlights: [
      'Reservation links are visible right in the top navigation.',
      'Clear for guests, separate from the admin workflow.',
      'Good foundation for a future live booking form.',
    ],
  },
  feedback: {
    eyebrow: 'Feedback',
    title: 'Let guests share their dining experience',
    subtitle:
      'This page can feel like a restaurant feedback page where customers leave impressions, ratings, and suggestions after visiting.',
    heroTitle: 'Reviews help the restaurant improve',
    heroText:
      'Instead of a profile page, this route now gives guests a simple place to talk about service, food quality, and ambiance.',
    heroStatLabel: 'Guest Rating',
    heroStatValue: '4.8 / 5',
    cards: [
      { icon: 'thumb-up', title: 'Food Feedback', text: 'Collect quick comments on flavor, presentation, and favorite dishes from the menu.' },
      { icon: 'room-service', title: 'Service Feedback', text: 'Invite guests to rate hospitality, speed, and overall comfort during the visit.' },
      { icon: 'forum', title: 'Suggestions', text: 'Make space for ideas about menu additions, reservation flow, or atmosphere improvements.' },
    ],
    highlights: [
      'Replaces the old Profile tab with a clearer public-facing section.',
      'Fits the restaurant website style better for guests.',
      'Ready to connect to a future review form if needed.',
    ],
  },
};

export default function UserPortalShell({ screen = 'home' }) {
  const { width } = useWindowDimensions();
  const content = contentMap[screen] ?? contentMap.home;
  const isCompact = width < 840;

  return (
    <UserPageFrame screen={screen} showFooter={screen === 'home'}>
      <View>
        <View style={[styles.heroCard, isCompact && styles.heroCardCompact]}>
          <View style={styles.heroTextBlock}>
            <Text style={styles.eyebrow}>{content.eyebrow}</Text>
            <Text style={styles.title}>{content.title}</Text>
            <Text style={styles.subtitle}>{content.subtitle}</Text>

            <View style={styles.heroPanel}>
              <Text style={styles.heroTitle}>{content.heroTitle}</Text>
              <Text style={styles.heroText}>{content.heroText}</Text>
              {content.description ? <Text style={styles.heroText}>{content.description}</Text> : null}
              {content.history ? <Text style={[styles.heroText, styles.historyText]}>{content.history}</Text> : null}
            </View>
          </View>

          {content.showHeroBadge !== false ? (
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeLabel}>{content.heroStatLabel}</Text>
              <Text style={styles.heroBadgeValue}>{content.heroStatValue}</Text>
            </View>
          ) : null}
        </View>

        {content.cards?.length ? (
          <View style={styles.cardGrid}>
            {content.cards.map((card) => (
              <View key={card.title} style={styles.card}>
                <View style={styles.cardIcon}>
                  <MaterialIcons name={card.icon} size={22} color="#fffaf5" />
                </View>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardText}>{card.text}</Text>
              </View>
            ))}
          </View>
        ) : null}

        {content.highlights?.length ? (
          <View style={styles.highlightsSection}>
            <Text style={styles.sectionTitle}>Reasons to come back</Text>
            <View style={styles.highlightsList}>
              {content.highlights.map((item) => (
                <View key={item} style={styles.highlightItem}>
                  <MaterialIcons name="check-circle" size={18} color="#9a3412" />
                  <Text style={styles.highlightText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </UserPageFrame>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 28,
    backgroundColor: '#fffaf5',
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
  heroCardCompact: {
    flexDirection: 'column',
  },
  heroTextBlock: {
    flex: 1,
    minWidth: 280,
  },
  title: {
    marginTop: 8,
    fontSize: 34,
    lineHeight: 40,
    color: '#1f2937',
    fontWeight: '900',
    maxWidth: 560,
  },
  heroPanel: {
    marginTop: 24,
    borderRadius: 20,
    backgroundColor: '#f3e6d8',
    padding: 20,
  },
  heroText: {
    marginTop: 8,
    fontSize: 16,
    lineHeight: 21,
    color: 'black',
    maxWidth: 520,
  },
  historyText: {
    marginTop: 14,
  },
  heroBadge: {
    minWidth: 180,
    borderRadius: 24,
    backgroundColor: '#6b4f3c',
    alignItems: 'flex-start',
    justifyContent: 'center',
    padding: 20,
  },
  heroBadgeLabel: {
    color: '#eadbc8',
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroBadgeValue: {
    color: '#fffaf5',
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '900',
    marginTop: 10,
  },
  cardGrid: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'center',
  },
  card: {
    width: 250,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6b4f3c',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1f2937',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280',
  },
  highlightsSection: {
    marginTop: 24,
    backgroundColor: '#fffaf5',
    borderRadius: 24,
    padding: 22,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#1f2937',
  },
  highlightsList: {
    marginTop: 14,
    gap: 12,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  highlightText: {
    flex: 1,
    fontSize: 14,
    lineHeight: 21,
    color: '#6b7280',
  },
});
