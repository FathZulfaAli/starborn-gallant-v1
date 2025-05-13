import React from "react";

export default function TictactoePlayerRole({ onPick }: { onPick: (role: "X" | "O") => void }) {
	return (
		<>
			<div
				id='modal'
				className='fixed top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20'
			>
				<div className='bg-white p-4 rounded shadow-lg w-fit h-fit text-center'>
					<h1 className='text-3xl text-black font-bold mb-5'>Pick your Hero</h1>
					<div className='flex items-center justify-center gap-x-2'>
						<button
							onClick={() => onPick("X")}
							className='w-40 aspect-square bg-black text-white text-2xl flex items-center justify-center'
						>
							X
						</button>
						<button
							onClick={() => onPick("O")}
							className='w-40 aspect-square bg-black text-white text-2xl flex items-center justify-center'
						>
							O
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
