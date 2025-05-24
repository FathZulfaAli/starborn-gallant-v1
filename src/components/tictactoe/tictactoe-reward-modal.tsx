import { useGameHistory } from '@/hooks/useGameHistory';
import { useGetReward } from '@/hooks/useGetReward';
import { useGetTokenForReward } from '@/hooks/useGetTokenForReward';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

type RewardModalProps = {
  address?: string;
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
  address,
  rewardAmount,
  isOpen,
  matchData,
  resetGame,
}: RewardModalProps) {
  const tokenMutation = useGetTokenForReward();
  const rewardMutation = useGetReward();
  const { save } = useGameHistory(address ?? '');

  if (!isOpen) return null;

  const handleClick = async () => {
    const matchPlayed = matchData.matchPlayed;
    const matchWin = matchData.matchWin;
    const winStreak = matchData.winStreak;
    const game = 'ttt';
    console.log('matchData', matchData);

    tokenMutation.mutate(
      { game, matchPlayed, matchWin, winStreak },
      {
        onSuccess: (token) => {
          rewardMutation.mutate(token, {
            onSuccess(link) {
              save({
                game: 'TicTacToe',
                address: address ?? '',
                amount: rewardAmount.toString(),
                txLink: link,
              });
            },
          });
        },
        onError: (error) => {
          console.error('Error getting token:', error);
          alert('Error getting token. Please try again.');
        },
      },
    );
  };
  return (
    <div className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-lg">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
        {rewardAmount === 0 ? (
          <>
            <div className="w-full max-w-md rounded-2xl border border-zinc-700 bg-white p-6 text-center shadow-xl dark:bg-zinc-900">
              <h2 className="text-2xl font-semibold text-zinc-100">To Bad</h2>

              <div className="mt-6">
                <p className="text-sm text-zinc-400">Try Again</p>
              </div>

              <div className="flex w-full items-center justify-between space-x-3">
                <Link
                  href={'/'}
                  className="mt-8 w-1/2 rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700"
                >
                  Go Home
                </Link>
                <button
                  className="mt-8 w-1/2 rounded-xl bg-blue-600 px-4 py-2 font-semibold text-white transition hover:bg-blue-700"
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
              className="w-full max-w-md rounded-2xl border border-zinc-700 bg-white p-6 text-center shadow-xl dark:bg-zinc-900"
              // onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-semibold text-zinc-100">
                🎉 Congratulations
              </h2>

              <div className="mt-6">
                <p className="text-sm text-zinc-400">You earned:</p>
                <p className="mt-2 text-4xl font-bold tracking-wide text-white">
                  {rewardAmount} <span className="text-primary">NBLR</span>
                </p>
              </div>
              <div className="mt-8 flex w-full items-center justify-center space-x-3">
                <button
                  onClick={() => redirect('/')}
                  disabled={!rewardMutation.isSuccess}
                  className="w-1/3 cursor-pointer rounded-xl bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Go Home
                </button>
                <button
                  onClick={handleClick}
                  disabled={
                    tokenMutation.isPending ||
                    rewardMutation.isPending ||
                    rewardMutation.isSuccess
                  }
                  className="w-1/3 cursor-pointer rounded-xl bg-purple-600 px-4 py-2 font-semibold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {rewardMutation.isPending
                    ? 'Claiming...'
                    : rewardMutation.isSuccess
                      ? 'Claimed'
                      : 'Claim Reward'}
                </button>
              </div>

              {rewardMutation.isSuccess && (
                <div className="mt-4 flex flex-row items-center justify-center">
                  <p className="font-medium">🎁 Reward Link:</p>
                  <Link
                    href={rewardMutation.data}
                    target="_blank"
                    className="break-all text-blue-600 underline"
                  >
                    {rewardMutation.data}
                  </Link>
                </div>
              )}
              {rewardMutation.isPending ? 'Claiming Reward...' : null}
              {tokenMutation.isPending ? 'Getting Token Reward...' : null}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
