"use client";

import React from "react";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";

export default function TictactoeCard() {
	const handleTTTClick = () => {
		redirect("/tictactoe");
	};
	return (
		<motion.div
			className='relative  w-[20%]  rounded-xl overflow-hidden aspect-square cursor-pointer'
			initial='rest'
			whileHover='hover'
			onClick={() => {
				handleTTTClick();
			}}
		>
			{/* Image with blur */}
			<motion.img
				alt='Game Background'
				src={"/ttt-img.png"}
				height={200}
				width={200}
				className='rounded-xl object-fill aspect-square absolute bottom-0 left-0 w-full h-full  transition-all duration-500 z-0'
				variants={{
					rest: { filter: "blur(0px)" },
					hover: { filter: "blur(4px)" },
				}}
				transition={{ duration: 0.5 }}
			/>
			<motion.span
				variants={{
					rest: { opacity: 0 },
					hover: { opacity: 1 },
				}}
				transition={{ duration: 0.5 }}
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[#F2F4F8] font-bold text-3xl text-center z-20'
			>
				Tic Tac Toe
			</motion.span>

			<motion.div
				variants={{
					rest: { opacity: 0 },
					hover: { opacity: 0.5 },
				}}
				transition={{ duration: 0.5 }}
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-50 rounded-xl w-full h-full z-10'
			/>
		</motion.div>
	);
}
