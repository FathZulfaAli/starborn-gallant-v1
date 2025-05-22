import Image from "next/image";
import React from "react";

interface RewardSideBarProps {
	wins: number;
	total: number;
	streak: number;
	reward: string;
	claimReward: () => void;
}

export default function RewardSideBar({
	wins,
	total,
	streak,
	reward,
	claimReward,
}: RewardSideBarProps) {
	return (
		<div className='bg-white/5 p-4 rounded-lg shadow-md'>
			<div className='flex flex-row items-center'>
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
			<div className='w-3/4 h-0.5 bg-white mb-6 mt-1 shadow-2xl drop-shadow-[0_0_10px_#fff] rounded-4xl ' />
			<div className='flex flex-row items-center justify-center space-x-10'>
				<div className='flex flex-col items-center justify-center'>
					<p className='text-sm'>Wins</p>
					<span className='text-5xl font-semibold p-5'>{wins}</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<p className='text-sm'>Loses</p>
					<span className='text-5xl font-semibold p-5'>{total - wins} / 3</span>
				</div>
				<div className='flex flex-col items-center justify-center'>
					<p className='text-sm'>Streak</p>
					<span className='text-5xl font-semibold p-5'>{streak}</span>
				</div>
			</div>
			<span className='text-2xl font-bold'>Match Earnings</span>
			<div className='flex flex-row'>
				<p
					className='text-9xl font-bold cursor-pointer'
					// onClick={() => nblrBalance.refetch()}
				>
					{reward ? reward : "0000"}
				</p>

				<p>NBLR</p>
			</div>

			<button
				disabled={reward === "0" || reward === "0000" || reward === "0.00"}
				className='px-4 py-2 w-full bg-green-600 text-white rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed mt-4'
				onClick={claimReward}
			>
				Stop and Claim
			</button>
		</div>
	);
}
