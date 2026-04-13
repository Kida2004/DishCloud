import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Dimensions, Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
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

const chats = [
  {
    id: 1,
    staff: 'Mia Walker',
    lastMessage: 'Need more napkins in the kitchen',
    time: 'Now',
    status: 'Online',
    messages: [
      { id: 1, text: 'Hey team, we\'re running low on napkins.', sender: 'Mia', time: '10:30 AM', isMe: false },
      { id: 2, text: 'Got it, I\'ll restock.', sender: 'You', time: '10:31 AM', isMe: true },
      { id: 3, text: 'Need more napkins in the kitchen', sender: 'Mia', time: '10:32 AM', isMe: false },
    ],
  },
  {
    id: 2,
    staff: 'Owen Harris',
    lastMessage: 'Table 5 is ready for service',
    time: '3m ago',
    status: 'Online',
    messages: [
      { id: 1, text: 'Table 5 is ready for service', sender: 'Owen', time: '10:28 AM', isMe: false },
      { id: 2, text: 'Thanks, sending the waiter.', sender: 'You', time: '10:29 AM', isMe: true },
    ],
  },
  {
    id: 3,
    staff: 'Noah White',
    lastMessage: 'Inventory check: low on wine',
    time: '5m ago',
    status: 'Away',
    messages: [
      { id: 1, text: 'Inventory check: low on wine', sender: 'Noah', time: '10:25 AM', isMe: false },
      { id: 2, text: 'Order more from supplier.', sender: 'You', time: '10:26 AM', isMe: true },
    ],
  },
];


export default function LiveChat() {
  const router = useRouter();
  const pathname = usePathname();
  const { lockAdminArea } = useAccess();
  const [selectedChat, setSelectedChat] = useState(chats[0]);
  const [newMessage, setNewMessage] = useState('');
  const [chatData, setChatData] = useState(chats);

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

  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const newMsg = {
        id: selectedChat.messages.length + 1,
        text: newMessage,
        sender: 'You',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      };
      setChatData(prev => prev.map(chat =>
        chat.id === selectedChat.id
          ? { ...chat, messages: [...chat.messages, newMsg], lastMessage: newMessage, time: 'Now' }
          : chat
      ));
      setSelectedChat(prev => ({ ...prev, messages: [...prev.messages, newMsg], lastMessage: newMessage, time: 'Now' }));
      setNewMessage('');
    }
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
        <View style={styles.chatList}>
          <View style={styles.chatListHeader}>
            <Text style={styles.chatListTitle}>Staff Chats</Text>
            <TouchableOpacity style={styles.newChatBtn}>
              <MaterialIcons name="add" size={20} color="#2d8cff" />
            </TouchableOpacity>
          </View>
          <ScrollView showsVerticalScrollIndicator={false}>
            {chatData.map((chat) => (
              <TouchableOpacity
                key={chat.id}
                style={[styles.chatItem, selectedChat.id === chat.id && styles.selectedChatItem]}
                onPress={() => handleSelectChat(chat)}
              >
                <View style={styles.chatItemAvatar}>
                  <Text style={styles.chatItemAvatarText}>{chat.staff.charAt(0)}</Text>
                </View>
                <View style={styles.chatItemContent}>
                  <View style={styles.chatItemHeader}>
                    <Text style={styles.chatItemName}>{chat.staff}</Text>
                    <Text style={styles.chatItemTime}>{chat.time}</Text>
                  </View>
                  <Text style={styles.chatItemMessage} numberOfLines={1}>{chat.lastMessage}</Text>
                </View>
                <View style={[styles.statusDot, { backgroundColor: chat.status === 'Online' ? '#10b981' : '#f59e0b' }]} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
        <View style={styles.chatView}>
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderAvatar}>
              <Text style={styles.chatHeaderAvatarText}>{selectedChat.staff.charAt(0)}</Text>
            </View>
            <View style={styles.chatHeaderInfo}>
              <Text style={styles.chatHeaderName}>{selectedChat.staff}</Text>
              <Text style={styles.chatHeaderStatus}>{selectedChat.status}</Text>
            </View>
          </View>
          <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
            {selectedChat.messages.map((msg) => (
              <View key={msg.id} style={[styles.messageBubble, msg.isMe ? styles.sentBubble : styles.receivedBubble]}>
                <Text style={[styles.messageText, msg.isMe ? styles.sentText : styles.receivedText]}>{msg.text}</Text>
                <Text style={[styles.messageTime, msg.isMe ? styles.sentTime : styles.receivedTime]}>{msg.time}</Text>
              </View>
            ))}
          </ScrollView>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.messageInput}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              onSubmitEditing={handleSendMessage}
            />
            <TouchableOpacity style={styles.sendBtn} onPress={handleSendMessage}>
              <MaterialIcons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
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
    elevation: 50,
    zIndex: 100,
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
    elevation: 100,
    zIndex: 200,
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
  mainSection: {
    flex: 1,
    flexDirection: width > 900 ? 'row' : 'column',
  },
  chatList: {
    width: width > 900 ? 350 : '100%',
    backgroundColor: '#fff',
    borderRightWidth: width > 900 ? 1 : 0,
    borderRightColor: '#e5e7eb',
  },
  chatListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chatListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  newChatBtn: {
    padding: 8,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  selectedChatItem: {
    backgroundColor: '#f0f9ff',
  },
  chatItemAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2d8cff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatItemAvatarText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatItemContent: {
    flex: 1,
  },
  chatItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatItemName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  chatItemTime: {
    fontSize: 12,
    color: '#6b7280',
  },
  chatItemMessage: {
    fontSize: 14,
    color: '#4b5563',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  chatView: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  chatHeaderAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2d8cff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  chatHeaderAvatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatHeaderInfo: {
    flex: 1,
  },
  chatHeaderName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2b3d',
  },
  chatHeaderStatus: {
    fontSize: 12,
    color: '#10b981',
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    maxWidth: '70%',
    padding: 12,
    borderRadius: 18,
    marginBottom: 8,
  },
  sentBubble: {
    alignSelf: 'flex-end',
    backgroundColor: '#2d8cff',
  },
  receivedBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  sentText: {
    color: '#fff',
  },
  receivedText: {
    color: '#1f2b3d',
  },
  messageTime: {
    fontSize: 10,
    marginTop: 4,
  },
  sentTime: {
    color: '#e0f2fe',
    alignSelf: 'flex-end',
  },
  receivedTime: {
    color: '#9ca3af',
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    fontSize: 14,
    marginRight: 8,
  },
  sendBtn: {
    backgroundColor: '#2d8cff',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
