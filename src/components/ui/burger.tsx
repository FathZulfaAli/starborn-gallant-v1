import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MobileMenu from './mobile-menu';

function BurgerMenu() {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const handleOnClick = () => setIsClicked(!isClicked);

  return (
    <>
      <div
        onClick={handleOnClick}
        className="flex cursor-pointer flex-col space-y-2 overflow-hidden rounded-sm bg-gray-800 p-1 lg:hidden"
      >
        {/* Top Line */}
        <motion.div
          className="h-[2px] w-6 rounded-full bg-white"
          animate={{
            rotate: isClicked ? 45 : 0,
            y: isClicked ? 10 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Middle Line */}
        <motion.div
          className="h-[2px] w-6 rounded-full bg-white"
          animate={{
            x: isClicked ? 30 : 0,
            type: 'tween',
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Bottom Line */}
        <motion.div
          className="h-[2px] w-6 rounded-full bg-white"
          animate={{
            rotate: isClicked ? -45 : 0,
            y: isClicked ? -10 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <MobileMenu isOpen={isClicked} />
    </>
  );
}

export default BurgerMenu;
