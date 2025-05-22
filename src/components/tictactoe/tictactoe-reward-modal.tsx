import { useGetReward } from "@/hooks/useGetReward";
import { useGetTokenForReward } from "@/hooks/useGetTokenForReward";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

type RewardModalProps = {
	isOpen: boolean;
	rewardAmount: number | string;
	matchData: {
		matchPlayed: number;
		matchWin: number;
		winStreak: number;
	};
	resetGame: () => {};
};

export default function ClaimRewardModal({
	rewardAmount,
	isOpen,
	matchData,
	resetGame,
}: RewardModalProps) {
	const tokenMutation = useGetTokenForReward();
	const rewardMutation = useGetReward();

	if (!isOpen) return null;

	const handleClick = async () => {
		const matchPlayed = matchData.matchPlayed;
		const matchWin = matchData.matchWin;
		const winStreak = matchData.winStreak;
		console.log("matchData", matchData);

		tokenMutation.mutate(
			{ matchPlayed, matchWin, winStreak },
			{
				onSuccess: (token) => {
					rewardMutation.mutate(token);
				},
				onError: (error) => {
					console.error("Error getting token:", error);
					alert("Error getting token. Please try again.");
				},
			}
		);
	};
	return (
		<div className='fixed top-0 left-0 w-full h-full backdrop-blur-lg flex items-center justify-center z-20'>
			<div className='fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4'>
				{rewardAmount === 0 ? (
					<>
						<div className='bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-zinc-700'>
							<h2 className='text-2xl font-semibold text-zinc-100'>To Bad</h2>

							<div className='mt-6'>
								<p className='text-zinc-400 text-sm'>Try Again</p>
							</div>

							<div className='flex items-center justify-between w-full space-x-3'>
								<Link
									href={"/"}
									className='mt-8 w-1/2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition'
								>
									Go Home
								</Link>
								<button
									className='mt-8 w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition'
									onClick={resetGame}
								>
									Try Again
								</button>
							</div>
						</div>
					</>
				) : (
					<>
						<div
							className='bg-white dark:bg-zinc-900 rounded-2xl shadow-xl p-6 w-full max-w-md text-center border border-zinc-700'
							// onClick={(e) => e.stopPropagation()}
						>
							<h2 className='text-2xl font-semibold text-zinc-100'>
								🎉 Congratulations
							</h2>

							<div className='mt-6'>
								<p className='text-zinc-400 text-sm'>You earned:</p>
								<p className='text-4xl font-bold text-white mt-2 tracking-wide'>
									{rewardAmount} <span className='text-primary'>NBLR</span>
								</p>
							</div>
							<div className='flex items-center justify-between w-full space-x-3'>
								{/* <button
									className='mt-8 w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition'
									onClick={handleClaim}
								>
									{isLoading ? "Wait Okay" : "Claim Here"}
								</button> */}
								<Link
									href={"/"}
									className='mt-8 w-1/3 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-xl transition'
								>
									Go Home
								</Link>
								<button
									onClick={handleClick}
									disabled={tokenMutation.isPending || rewardMutation.isPending}
									className='bg-purple-600 px-4 py-2 text-white w-1/3 cursor-pointer hover:bg-purple-700 rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed'
								>
									{rewardMutation.isPending ? "Claiming..." : "Claim"}
								</button>
								<button
									className='mt-8 w-1/3 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-xl transition'
									onClick={resetGame}
								>
									Play Again
								</button>
							</div>

							{rewardMutation.isSuccess && (
								<div className='mt-4 flex flex-row items-center justify-center'>
									<p className='font-medium'>🎁 Reward Link:</p>
									<Link
										href={rewardMutation.data}
										target='_blank'
										className='text-blue-600 underline break-all'
									>
										{rewardMutation.data}
									</Link>
								</div>
							)}
							{rewardMutation.isPending ? "Claiming Reward..." : null}
							{tokenMutation.isPending ? "Getting Token Reward..." : null}
						</div>
					</>
				)}
			</div>
		</div>
	);
}
