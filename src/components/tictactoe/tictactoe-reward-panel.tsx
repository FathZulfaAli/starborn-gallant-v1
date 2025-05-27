import Image from 'next/image';
import React from 'react';

interface RewardSideBarProps {
  wins: number;
  total: number;
  streak: number;
  reward: string;
  matchResult: 'X' | 'O' | 'draw' | null;
  claimReward: () => void;
  resetGame: () => void;
}

export default function RewardSideBar({
  wins,
  total,
  streak,
  reward,
  matchResult,
  resetGame,
  claimReward,
}: RewardSideBarProps) {
  const totalLosses = total - wins;

  return (
    <div className="rounded-lg bg-white/5 p-4 shadow-md">
      <div className="hidden flex-row items-center lg:flex">
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

      <button
        onClick={resetGame}
        disabled={!!!matchResult}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700 disabled:bg-blue-400 lg:hidden"
      >
        {totalLosses >= 3 ? 'Claim reward' : 'Play Again'}
      </button>

      <div className="mt-1 mb-6 h-0.5 w-3/4 rounded-4xl bg-white shadow-2xl drop-shadow-[0_0_10px_#fff]" />
      <div className="flex flex-row items-center justify-center space-x-10">
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Wins</p>
          <span className="p-2 text-4xl font-semibold lg:p-5 lg:text-5xl">
            {wins}
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Loses</p>
          <span className="p-2 text-4xl font-semibold lg:p-5 lg:text-5xl">
            {total - wins} / 3
          </span>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-sm">Streak</p>
          <span className="p-2 text-4xl font-semibold lg:p-5 lg:text-5xl">
            {streak}
          </span>
        </div>
      </div>

      <span className="text-xl font-bold lg:text-2xl">Match Earnings</span>
      <div className="flex flex-row">
        <p
          className="cursor-pointer text-4xl font-bold lg:text-9xl"
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
