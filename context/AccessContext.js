import { createContext, useContext, useMemo, useState } from 'react';

const AccessContext = createContext(null);

export function AccessProvider({ children }) {
  const [isUserUnlocked, setIsUserUnlocked] = useState(false);
  const [isAdminUnlocked, setIsAdminUnlocked] = useState(false);

  const value = useMemo(
    () => ({
      isUserUnlocked,
      isAdminUnlocked,
      unlockUserArea: () => setIsUserUnlocked(true),
      lockUserArea: () => setIsUserUnlocked(false),
      unlockAdminArea: () => setIsAdminUnlocked(true),
      lockAdminArea: () => setIsAdminUnlocked(false),
    }),
    [isAdminUnlocked, isUserUnlocked]
  );

  return <AccessContext.Provider value={value}>{children}</AccessContext.Provider>;
}

export function useAccess() {
  const context = useContext(AccessContext);

  if (!context) {
    throw new Error('useAccess must be used within an AccessProvider');
  }

  return context;
}
