'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Page() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
    }
  }, []);
  return (
    <section className="no-scrollbar relative h-screen w-screen overflow-hidden">
      <div className="flex h-screen w-screen items-center justify-center">
        <p className="text-xl font-bold text-white">Term of Service</p>
      </div>

      <motion.div
        drag="x"
        dragConstraints={{ left: -windowWidth, right: 0 }}
        dragElastic={0.2}
        className="absolute top-0 left-0 z-10 flex h-screen w-screen items-center justify-center bg-white"
        initial={{ x: '-100%' }}
        animate={{ x: '-95%' }}
        exit={{ x: '-100%' }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.5,
        }}
      >
        <div className="absolute top-1/2 -right-6 -translate-y-1/2 cursor-grab rounded-lg bg-gray-800 px-2 py-1 text-white">
          ⇠ ⇢
        </div>

        <p className="text-xl font-bold text-black">Privacy Policy</p>
      </motion.div>
    </section>
  );
}
