import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import UserPageFrame from './UserPageFrame';

const reviews = [
  { name: 'Emily Richardson', rating: 5, text: 'Amazing food and excellent service. The salmon and dessert were both outstanding.', date: '2 hours ago' },
  { name: 'David Martinez', rating: 4, text: 'Great atmosphere and very friendly team. I would love a few more vegetarian mains.', date: '5 hours ago' },
  { name: 'Jessica Lee', rating: 5, text: 'Best restaurant in town. The staff made the night feel special from the moment we arrived.', date: '1 day ago' },
  { name: 'Michael Chen', rating: 3, text: 'Food was good, but the wait felt a little long during peak dinner time.', date: '2 days ago' },
  { name: 'Sarah Johnson', rating: 5, text: 'Perfect dining experience. We will definitely reserve again for our next celebration.', date: '3 days ago' },
  { name: 'Robert Wilson', rating: 4, text: 'Very nice ambiance, strong coffee, and a polished dining room.', date: '1 week ago' },
];

const ratingFilters = ['All', '5 Stars', '4 Stars', '3 Stars', 'Recent'];

export default function UserFeedbackPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [draftReplies, setDraftReplies] = useState({});
  const [openReplyKey, setOpenReplyKey] = useState(null);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesSearch =
        review.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        review.text.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) {
        return false;
      }

      if (activeFilter === 'All' || activeFilter === 'Recent') {
        return true;
      }

      const rating = Number(activeFilter[0]);
      return review.rating === rating;
    });
  }, [activeFilter, searchQuery]);

  return (
    <UserPageFrame screen="feedback" showFooter>
      <View style={styles.headerCard}>
        <View style={styles.headerTextBlock}>
          <Text style={styles.title}>Feedback</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#9ca3af" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search reviews by guest name or keyword..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9ca3af"
        />
        {searchQuery.length > 0 ? (
          <Pressable onPress={() => setSearchQuery('')} style={({ pressed }) => [pressed && styles.pressed]}>
            <Ionicons name="close-circle" size={20} color="#9ca3af" />
          </Pressable>
        ) : null}
      </View>

      <View style={styles.filterRow}>
        {ratingFilters.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={({ pressed }) => [
                styles.filterTag,
                isActive && styles.filterTagActive,
                pressed && styles.pressed,
              ]}>
              <Text style={[styles.filterTagText, isActive && styles.filterTagTextActive]}>{filter}</Text>
            </Pressable>
          );
        })}
      </View>

      <Text style={styles.sectionTitle}>
        Recent Reviews {filteredReviews.length < reviews.length ? `(${filteredReviews.length} of ${reviews.length})` : `(${reviews.length})`}
      </Text>

      <View style={styles.reviewList}>
        {filteredReviews.map((review) => (
          <View key={`${review.name}-${review.date}`} style={styles.reviewCard}>
            {(() => {
              const reviewKey = `${review.name}-${review.date}`;
              const isReplyOpen = openReplyKey === reviewKey;

              return (
                <>
            <View style={styles.reviewTop}>
              <View>
                <Text style={styles.reviewerName}>{review.name}</Text>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
              <Text style={styles.ratingText}>{'★'.repeat(review.rating)}</Text>
            </View>
            <Text style={styles.reviewText}>{review.text}</Text>
            <View style={styles.reviewFooter}>
              {!isReplyOpen ? (
                <Pressable onPress={() => setOpenReplyKey(reviewKey)} style={({ pressed }) => [styles.replyLinkWrap, pressed && styles.pressed]}>
                  <Text style={styles.replyLink}>Reply</Text>
                </Pressable>
              ) : (
                <>
                  <TextInput
                    style={styles.replyInput}
                    placeholder="Write your review here..."
                    placeholderTextColor="#9ca3af"
                    value={draftReplies[reviewKey] ?? ''}
                    onChangeText={(text) =>
                      setDraftReplies((current) => ({
                        ...current,
                        [reviewKey]: text,
                      }))
                    }
                    multiline
                  />
                  <View style={styles.replyActions}>
                    <Pressable onPress={() => setOpenReplyKey(null)} style={({ pressed }) => [styles.cancelButton, pressed && styles.pressed]}>
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </Pressable>
                    <Pressable style={({ pressed }) => [styles.replyButton, pressed && styles.pressed]}>
                      <MaterialIcons name="send" size={16} color="#fffaf5" />
                      <Text style={styles.replyButtonText}>Post Review</Text>
                    </Pressable>
                  </View>
                </>
              )}
            </View>
                </>
              );
            })()}
          </View>
        ))}

        {filteredReviews.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="search-off" size={42} color="#d1d5db" />
            <Text style={styles.emptyStateTitle}>No reviews found</Text>
            <Text style={styles.emptyStateText}>Try a different search or switch the rating filter.</Text>
          </View>
        ) : null}
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
    marginTop: 8,
    fontSize: 30,
    lineHeight: 36,
    color: '#1f2937',
    fontWeight: '900',
    maxWidth: 620,
  },
  searchBar: {
    marginTop: 22,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1f2937',
  },
  filterRow: {
    marginTop: 22,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  filterTag: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    backgroundColor: '#eadbc8',
  },
  filterTagActive: {
    backgroundColor: '#6b4f3c',
  },
  filterTagText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#6b4f3c',
  },
  filterTagTextActive: {
    color: '#fffaf5',
  },
  pressed: {
    opacity: 0.88,
  },
  sectionTitle: {
    marginTop: 24,
    fontSize: 22,
    fontWeight: '900',
    color: '#1f2937',
  },
  reviewList: {
    marginTop: 16,
    gap: 14,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 18,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 14,
  },
  reviewerName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1f2937',
  },
  reviewDate: {
    marginTop: 4,
    fontSize: 12,
    color: '#9ca3af',
  },
  ratingText: {
    color: '#d97706',
    fontSize: 16,
    fontWeight: '800',
  },
  reviewText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: '#4b5563',
  },
  reviewFooter: {
    marginTop: 14,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#eee5d9',
    gap: 12,
  },
  replyLinkWrap: {
    alignSelf: 'flex-start',
  },
  replyLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#6b4f3c',
  },
  replyInput: {
    minHeight: 86,
    borderWidth: 1,
    borderColor: '#eadbc8',
    borderRadius: 16,
    backgroundColor: '#fffaf5',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    lineHeight: 20,
    color: '#1f2937',
    textAlignVertical: 'top',
  },
  replyActions: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  cancelButton: {
    alignSelf: 'flex-start',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: '#eadbc8',
  },
  cancelButtonText: {
    color: '#6b4f3c',
    fontSize: 13,
    fontWeight: '700',
  },
  replyButton: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#6b4f3c',
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 14,
  },
  replyButtonText: {
    color: '#fffaf5',
    fontSize: 13,
    fontWeight: '700',
  },
  emptyState: {
    backgroundColor: '#fffaf5',
    borderRadius: 20,
    paddingVertical: 48,
    paddingHorizontal: 24,
    alignItems: 'center',
  },
  emptyStateTitle: {
    marginTop: 14,
    fontSize: 18,
    fontWeight: '800',
    color: '#6b7280',
  },
  emptyStateText: {
    marginTop: 8,
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
  },
});
