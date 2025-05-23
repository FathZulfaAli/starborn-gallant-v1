'use client';

import { useAppKitAccount } from '@reown/appkit/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useHeadCheck() {
  const { isConnected } = useAppKitAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/auth');
    }
  }, []);

  return isConnected;
}
