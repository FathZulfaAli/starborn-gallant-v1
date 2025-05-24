'use client';

import { ConnectButton } from '@/components/wallet/wallet.button';
import { useAppKitAccount } from '@reown/appkit/react';
import Image from 'next/image';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

export default function AuthUi() {
  const { status, address } = useAppKitAccount();
  const router = useRouter();
  const authMutation = useAuth();

  useEffect(() => {
    if (address && status === 'connected') {
      authMutation.mutate(address, {
        onSuccess: () => {
          console.log('User registered successfully');
          router.push('/');
        },
        onError: (error) => {
          console.error('Error registering user:', error);
        },
      });
    }
  }, [status, address]);

  return (
    <section className="relative flex min-h-screen w-full flex-col items-center">
      <Image
        alt=""
        src={'/login-background.webp'}
        sizes="100vw"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute flex h-full w-full flex-col items-center justify-center">
        <ConnectButton />
      </div>
    </section>
  );
}
