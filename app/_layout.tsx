
import { AuthProvider } from '@/contexts/authProvider';
import { SyncProvider } from '@/contexts/syncContext';
import { Slot } from 'expo-router';
import 'react-native-get-random-values';

export default function RootLayout() {
  return (
    <AuthProvider>
      <SyncProvider>
        <Slot/>
      </SyncProvider>
    </AuthProvider>
  )
}
