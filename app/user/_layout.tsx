import { Redirect, Stack } from 'expo-router';
import { useAccess } from '../../context/AccessContext';

export default function UserLayout() {
  const { isUserUnlocked } = useAccess();

  if (!isUserUnlocked) {
    return <Redirect href="/user-access" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
