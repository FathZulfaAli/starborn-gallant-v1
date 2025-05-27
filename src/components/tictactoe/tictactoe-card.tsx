'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

export default function TictactoeCard() {
  const handleTTTClick = () => {
    redirect('/game/tictactoe');
  };
  return (
    <>
      <span className="text-xl font-bold text-[#F2F4F8] lg:hidden">
        Tic Tac Toe
      </span>
      <motion.div
        className="relative aspect-square w-1/2 cursor-pointer overflow-hidden rounded-xl lg:w-[20%]"
        initial="rest"
        whileHover="hover"
        onClick={() => {
          handleTTTClick();
        }}
      >
        {/* Image with blur */}
        <motion.img
          alt="Game Background"
          src={'/ttt-img.png'}
          height={200}
          width={200}
          className="absolute bottom-0 left-0 z-0 aspect-square h-full w-full rounded-xl object-fill transition-all duration-500"
          variants={{
            rest: { filter: 'blur(0px)' },
            hover: { filter: 'blur(4px)' },
          }}
          transition={{ duration: 0.5 }}
        />

        <motion.span
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 transform text-center text-3xl font-bold text-[#F2F4F8] lg:block"
        >
          Tic Tac Toe
        </motion.span>

        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.5 },
          }}
          transition={{ duration: 0.5 }}
          className="bg-opacity-50 absolute top-1/2 left-1/2 z-10 hidden h-full w-full -translate-x-1/2 -translate-y-1/2 transform rounded-xl bg-black lg:block"
        />
      </motion.div>
    </>
  );
}
