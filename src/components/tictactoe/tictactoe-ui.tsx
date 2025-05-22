"use client";

import { useEffect, useState } from "react";
import {
	checkGameStatus,
	formatTokenAmount,
	getBotMove,
	winRewardCounter,
} from "./tictactoe-feature";
import TictactoePlayerRole from "./tictactoe-player-role";
import Image from "next/image";
import RewardSideBar from "./tictactoe-reward-panel";
import ClaimRewardModal from "./tictactoe-reward-modal";
type Cell = "X" | "O" | null;

export default function TicTacToeBoard() {
	const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
	const [matchResult, setMatchResult] = useState<"X" | "O" | "draw" | null>(null);
	const [winStreak, setWinStreak] = useState(0);
	const [playerRole, setPlayerRole] = useState<Cell>(null);
	const [turn, setTurn] = useState<"player" | "bot">("player");
	const [wins, setWins] = useState(0);
	const [totalPlays, setTotalPlays] = useState(0);
	const [claimModal, setClaimModal] = useState(false);

	const earnings = winRewardCounter(wins, winStreak);
	const formatedToken = formatTokenAmount(earnings);

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

	const totalLosses = totalPlays - wins;
	useEffect(() => {
		if (matchResult === "X" || matchResult === "O" || matchResult === "draw") {
			setTotalPlays((prev) => prev + 1);
		}

		if (totalLosses >= 3) {
			setClaimModal(true);
		}
	}, [matchResult]);

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
				setWins((prev) => prev + 1);
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

	const newGame = () => {
		setBoard(Array(9).fill(null));
		setTotalPlays(0);
		setMatchResult(null);
		setClaimModal(false);
		setWins(0);
	};

	const matchData = {
		matchPlayed: totalPlays,
		matchWin: wins,
		winStreak: winStreak,
	};

	return (
		<>
			{playerRole === null ? (
				<TictactoePlayerRole onPick={(role) => setPlayerRole(role)} />
			) : (
				<>
					<div className='min-h-screen bg-black text-white flex items-center justify-center px-4 relative'>
						<RewardSideBar
							wins={wins}
							total={totalPlays}
							streak={winStreak}
							reward={formatedToken.toString()}
							claimReward={() => setClaimModal(true)}
						/>
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
							<div className='flex flex-col text-right min-w-1/3 bg-white/5 p-7 rounded-lg shadow-md'>
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
								<p className='min-w-full'>
									<span className='text-gray-400'>Game Status:</span>{" "}
									<span className='text-yellow-400'>
										{matchResult === null
											? "Progress"
											: matchResult === "draw"
											? "Draw!"
											: matchResult === playerRole
											? "win! 🎉"
											: "lose! 😢"}
									</span>
								</p>
								<p>
									<span className='text-gray-400'>Win Streak:</span>{" "}
									<span className='text-white'>{winStreak}</span>
								</p>
								{matchResult && (
									<button
										onClick={resetGame}
										className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition'
									>
										{totalLosses >= 3 ? "Claim reward" : "Play Again"}
									</button>
								)}
							</div>
						</div>
					</div>
					<ClaimRewardModal
						rewardAmount={formatedToken}
						isOpen={claimModal}
						matchData={matchData}
						resetGame={async () => newGame()}
					/>
				</>
			)}
		</>
	);
}
