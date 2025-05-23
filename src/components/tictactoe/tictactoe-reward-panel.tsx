import Image from 'next/image';
import React from 'react';

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
    <div className="rounded-lg bg-white/5 p-4 shadow-md">
      <div className="flex flex-row items-center">
        <Image
          src={'/sg-logo.png'}
          width={50}
          height={50}
          alt="logo"
          className="object-contain"
        />
        <div className="ml-2">
          <p className="text-2xl font-bold text-[#F2F4F8]">Starborn</p>
          <p className="text-2xl font-bold text-[#F2F4F8]">Gallant</p>
        </div>
      </div>
      <div className="mt-1 mb-6 h-0.5 w-3/4 rounded-4xl bg-white shadow-2xl drop-shadow-[0_0_10px_#fff]" />
      <div className="flex flex-row items-center justify-center space-x-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Wins</p>
          <span className="p-5 text-5xl font-semibold">{wins}</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Loses</p>
          <span className="p-5 text-5xl font-semibold">{total - wins} / 3</span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Streak</p>
          <span className="p-5 text-5xl font-semibold">{streak}</span>
        </div>
      </div>
      <span className="text-2xl font-bold">Match Earnings</span>
      <div className="flex flex-row">
        <p
          className="cursor-pointer text-9xl font-bold"
          // onClick={() => nblrBalance.refetch()}
        >
          {reward ? reward : '0000'}
        </p>

        <p>NBLR</p>
      </div>

      <button
        disabled={reward === '0' || reward === '0000' || reward === '0.00'}
        className="mt-4 w-full rounded-lg bg-green-600 px-4 py-2 text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={claimReward}
      >
        Stop and Claim
      </button>
    </div>
  );
}
