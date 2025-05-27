'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAppKitAccount } from '@reown/appkit/react';
import { ConnectButton } from '../wallet/wallet.button';

type ModalMenuProps = {
  isOpen: boolean;
};

export default function MobileMenu({ isOpen }: ModalMenuProps) {
  const { address } = useAppKitAccount();
  return (
    <motion.div
      className="fixed top-0 left-0 flex w-full items-center justify-center lg:hidden"
      initial={{ x: '100%', y: '65%' }}
      animate={{ x: isOpen ? '50%' : '100%', y: '65%' }}
      exit={{ x: '100%', y: '65%' }}
      transition={{ duration: 1, ease: 'backInOut' }}
    >
      <div className="w-11/12 rounded-3xl bg-white p-6 text-black">
        <div className="flex flex-col gap-y-4">
          <Link href={'/'}>Home</Link>
          <Link href={`/account/${address}`}>Account</Link>
          <ConnectButton />
        </div>
      </div>
    </motion.div>
  );
}
