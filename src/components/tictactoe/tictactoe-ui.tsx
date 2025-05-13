"use client";

import { useEffect, useState } from "react";
import { checkGameStatus, getBotMove } from "./tictactoe-feature";
import TictactoePlayerRole from "./tictactoe-player-role";
import Image from "next/image";

type Cell = "X" | "O" | null;

export default function TicTacToeBoard() {
	const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
	const [matchResult, setMatchResult] = useState<"X" | "O" | "draw" | null>(null);
	const [winStreak, setWinStreak] = useState(0);
	const [playerRole, setPlayerRole] = useState<Cell>(null);
	const [turn, setTurn] = useState<"player" | "bot">("player");

	const aiRole = playerRole === "X" ? "O" : "X";

	useEffect(() => {
		if (turn === "bot" && matchResult === null) {
			const botIndex = getBotMove(board, playerRole);
			if (botIndex !== -1) {
				const newBoard = [...board];
				newBoard[botIndex] = aiRole;
				setTimeout(() => {
					setBoard(newBoard);
					const botStatus = checkGameStatus(newBoard);
					if (botStatus) {
						setMatchResult(botStatus);
						setWinStreak(0);
					} else {
						setTurn("player");
					}
				}, 500);
			}
		}
	}, [turn, board, matchResult, playerRole, aiRole]);

	const handleClick = (index: number) => {
		if (board[index] !== null || matchResult !== null || turn !== "player") return;

		const newBoard = [...board];
		newBoard[index] = playerRole;
		setBoard(newBoard);

		const playerStatus = checkGameStatus(newBoard);

		if (playerStatus) {
			setMatchResult(playerStatus);
			if (playerStatus === playerRole) {
				setWinStreak((prev) => prev + 1);
			} else {
				setWinStreak(0);
			}
		} else {
			setTurn("bot");
		}
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setMatchResult(null);
	};

	return (
		<>
			{playerRole === null ? (
				<TictactoePlayerRole onPick={(role) => setPlayerRole(role)} />
			) : (
				<div className='min-h-screen bg-black text-white flex items-center justify-center px-4'>
					<div className='bg-white/5 p-4 rounded-lg shadow-md'>
						<div className='flex flex-row items-center mb-4'>
							<Image
								src={"/sg-logo.png"}
								width={50}
								height={50}
								alt='logo'
								className='object-contain'
							/>
							<div className='ml-2'>
								<p className='text-2xl font-bold text-[#F2F4F8]'>Starborn</p>
								<p className='text-2xl font-bold text-[#F2F4F8]'>Gallant</p>
							</div>
						</div>
						<span className='text-5xl font-semibold text-white'>Match Earning</span>
					</div>
					<div className='flex flex-col md:flex-row gap-8 max-w-4xl w-full'>
						{/* Game board */}
						<div className='grid grid-cols-3 gap-4 w-full max-w-sm mx-auto'>
							{board.map((cell, index) => (
								<button
									key={index}
									className='w-24 h-24 border border-white rounded-md flex items-center justify-center text-4xl font-bold 
                     hover:scale-105 transition-transform duration-200 
                     shadow-[0_0_10px_rgba(255,255,255,0.2)] bg-gradient-to-br from-gray-900 to-gray-800'
									onClick={() => handleClick(index)}
								>
									{cell === "X" ? (
										<span className='text-blue-400 drop-shadow-[0_0_5px_#3b82f6]'>
											{cell}
										</span>
									) : cell === "O" ? (
										<span className='text-pink-400 drop-shadow-[0_0_5px_#ec4899]'>
											{cell}
										</span>
									) : null}
								</button>
							))}
						</div>

						{/* Info panel */}
						<div className='flex flex-col text-right space-y-2 text-sm md:text-base font-mono tracking-wide bg-white/5 p-4 rounded-lg shadow-md'>
							<p>
								<span className='text-gray-400'>Your Role:</span>{" "}
								<span
									className={`font-bold ${
										playerRole === "X" ? "text-blue-400" : "text-pink-400"
									}`}
								>
									{playerRole}
								</span>
							</p>
							<p>
								<span className='text-gray-400'>AI Role:</span>{" "}
								<span
									className={`font-bold ${
										aiRole === "X" ? "text-blue-400" : "text-pink-400"
									}`}
								>
									{aiRole}
								</span>
							</p>
							<p>
								<span className='text-gray-400'>Turn:</span>{" "}
								<span className='text-green-400'>{turn}</span>
							</p>
							<p>
								<span className='text-gray-400'>Game Status:</span>{" "}
								<span className='text-yellow-400'>
									{matchResult === null
										? "In Progress"
										: matchResult === "draw"
										? "Draw!"
										: matchResult === playerRole
										? "You win! 🎉"
										: "You lose! 😢"}
								</span>
							</p>
							<p>
								<span className='text-gray-400'>Win Streak:</span>{" "}
								<span className='text-white'>{winStreak}</span>
							</p>
							{matchResult && (
								<div className='flex flex-col space-y-2 justify-center mt-4'>
									<button
										onClick={resetGame}
										className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
									>
										Play Again
									</button>
									<button
										onClick={resetGame}
										className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition'
									>
										Stop and Claim
									</button>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
}
