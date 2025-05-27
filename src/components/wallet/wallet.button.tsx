'use client';
import {
  useDisconnect,
  useAppKit,
  useAppKitNetwork,
  useAppKitAccount,
} from '@reown/appkit/react';
import { networks } from '@/providers/reown/reown.config';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const ActionButtonList = () => {
  const { disconnect } = useDisconnect();
  const { open } = useAppKit();
  const { switchNetwork } = useAppKitNetwork();

  const handleDisconnect = async () => {
    try {
      await disconnect();
      redirect('/auth');
    } catch (error) {
      console.error('Failed to disconnect:', error);
    }
  };
  return (
    <div>
      <button onClick={() => open()}>Open</button>
      <button onClick={handleDisconnect}>Disconnect</button>
      <button onClick={() => switchNetwork(networks[1])}>Switch</button>
    </div>
  );
};

export const ConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();
  const { disconnect } = useDisconnect();
  const [modal, setModal] = useState(false);
  const [copied, setCopied] = useState(false);

  const trimmedPublicKey =
    address?.toString().slice(0, 5) + '.....' + address?.toString().slice(-4);

  const copyToClipboard = async () => {
    if (address) {
      await navigator.clipboard.writeText(address.toString());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Revert after 2 seconds
    }
  };

  const handleModal = () => setModal(!modal);

  const handleDisconnect = async () => {
    setModal(false);
    disconnect();
    setTimeout(() => {
      redirect('/auth');
    }, 2000);
  };

  return (
    <div className="relative">
      <button
        onClick={isConnected ? handleModal : () => open()}
        className="rounded-lg bg-blue-700 px-2 py-1 font-semibold text-[#F2F4F8]"
      >
        {isConnected ? trimmedPublicKey : 'Connect Wallet'}
      </button>

      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -5 }}
            transition={{ duration: 0.2 }}
            className="absolute z-10 mt-2 h-auto items-center justify-center rounded-lg bg-[#1C1C1E] text-center text-white lg:w-full"
          >
            <div
              className="flex cursor-pointer flex-col items-center justify-center p-2 font-medium"
              onClick={copyToClipboard}
            >
              {copied ? (
                <span className="text-green-600">Copied 🍀</span>
              ) : (
                <span>Copy Address</span>
              )}
            </div>
            <span
              className="flex cursor-pointer flex-col items-center justify-center p-2 font-medium"
              onClick={handleDisconnect}
            >
              Disconnect
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
