import { Redirect, Stack, useSegments } from 'expo-router';
import { AccessProvider } from '../context/AccessContext';
import { useAccess } from '../context/AccessContext';

function RootNavigator() {
  const segments = useSegments();
  const { isAdminUnlocked } = useAccess();
  const topSegment = segments[0];
  const isAdminRoute =
    topSegment &&
    topSegment !== 'user' &&
    topSegment !== 'user-access' &&
    topSegment !== 'admin-access';

  if (isAdminRoute && !isAdminUnlocked) {
    return <Redirect href="/admin-access" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    <AccessProvider>
      <RootNavigator />
    </AccessProvider>
  );
}
