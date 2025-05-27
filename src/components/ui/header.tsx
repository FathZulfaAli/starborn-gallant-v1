'use client';

import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import React, { ReactNode, use, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ConnectButton } from '../wallet/wallet.button';
import { useAppKitAccount } from '@reown/appkit/react';
import { useClientMounted } from '@/hooks/useClientMount';
import { useSplTokenBalance } from '@/hooks/useSplTokenBalance';
import BurgerMenu from './burger';

type ListItem = { text: string; link: string };

const list: ListItem[] = [
  { text: 'Home', link: '/' },
  { text: 'Account', link: '/account/{pubkey}' },
];
const hiddenPaths = ['/game', '/auth', '/termsofserviceprivacyandpolicy'];

export default function Header() {
  const [selected, setSelected] = useState(list[0]);
  const { address, isConnected } = useAppKitAccount();
  const nblrBalance = useSplTokenBalance(
    'AEebqYuDhemMLP16MaLNEJSTFvCSzaiijTbQidFGs9m1',
  );
  const isMounted = useClientMounted();
  const router = useRouter();
  const pathname = usePathname();

  const hideHeader = hiddenPaths.some((path) => pathname.startsWith(path));

  useEffect(() => {
    if (!address) {
      setSelected(list[0]);
    }
  }, [address]);

  const handleClick = (item: ListItem) => {
    const link = item.link.includes('{pubkey}')
      ? isConnected
        ? item.link.replace('{pubkey}', address || '')
        : item.link
      : item.link;

    setSelected(item);
    router.push(link);
  };

  if (hideHeader) return null;

  return (
    <>
      {/* Mobile */}
      <div className="m-1.5 flex h-[7%] items-center justify-between rounded-lg bg-gray-900 pr-2.5 lg:hidden">
        <div className="flex flex-row items-center">
          <Image
            src={'/sg-logo.png'}
            width={50}
            height={50}
            alt="logo"
            className="object-contain"
          />
          <span className="font-bold text-[#F2F4F8]">Starborn Gallant</span>
        </div>
        <BurgerMenu />
      </div>

      {/* Dekstop */}
      <div className="mx-5 hidden shrink-0 flex-row justify-between lg:flex">
        {/* Logo Section */}
        <div className="flex flex-row items-center">
          <Image
            src={'/sg-logo.png'}
            width={70}
            height={70}
            alt="logo"
            className="object-contain"
          />
          <div className="ml-2">
            <p className="text-3xl font-bold text-[#F2F4F8]">Starborn</p>
            <p className="text-3xl font-bold text-[#F2F4F8]">Gallant</p>
          </div>
        </div>

        {/* Animated Menu Section */}
        <div className="relative grid grid-cols-2 self-center overflow-hidden rounded-lg bg-[#1C1C1E] text-center">
          {list.map((item, index) => {
            const isSelected = selected === item;
            return (
              <div
                key={index}
                className="relative z-10 cursor-pointer px-2 py-1 text-sm font-semibold sm:text-base"
                onClick={() => handleClick(item)}
              >
                {isSelected && (
                  <motion.div
                    layoutId="tabHighlight"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      backgroundColor: '#295DDB',
                      borderRadius: '0.5rem',
                    }}
                    exit={{ opacity: 0 }}
                    transition={{
                      type: 'spring',
                      stiffness: 400,
                      damping: 30,
                      opacity: { duration: 0.15 },
                      backgroundColor: { duration: 0.3 },
                    }}
                    className="absolute inset-0 z-0"
                  />
                )}
                <span
                  className={`relative z-10 ${
                    isSelected ? 'text-[#F2F4F8]' : 'text-gray-400'
                  }`}
                >
                  {item.text}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right-side Wallet and Currency */}
        <div className="flex flex-row items-center space-x-4">
          {isMounted && (
            <>
              <div className="flex flex-row items-center space-x-2 self-center rounded-lg bg-[#1C1C1E] px-2 py-1 text-center">
                <p className="font-semibold text-[#F6C94A]">
                  {nblrBalance.data?.toString() ?? '0000'}
                </p>
                <Image
                  src={'/nblr-logo.png'}
                  width={25}
                  height={25}
                  alt="nblr"
                  className="object-contain"
                />
              </div>
              <ConnectButton />
            </>
          )}
        </div>
      </div>
    </>
  );
}
