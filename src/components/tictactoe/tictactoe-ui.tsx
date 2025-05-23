'use client';

import { useEffect, useState } from 'react';
import {
  checkGameStatus,
  formatTokenAmount,
  getBotMove,
  winRewardCounter,
} from './tictactoe-feature';
import TictactoePlayerRole from './tictactoe-player-role';
import RewardSideBar from './tictactoe-reward-panel';
import ClaimRewardModal from './tictactoe-reward-modal';
import { useAppKitAccount } from '@reown/appkit/react';
import { redirect } from 'next/navigation';

type Cell = 'X' | 'O' | null;

export default function TicTacToeBoard() {
  const [board, setBoard] = useState<Cell[]>(Array(9).fill(null));
  const [matchResult, setMatchResult] = useState<'X' | 'O' | 'draw' | null>(
    null,
  );
  const [winStreak, setWinStreak] = useState(0);
  const [playerRole, setPlayerRole] = useState<Cell>(null);
  const [turn, setTurn] = useState<'player' | 'bot'>('player');
  const [wins, setWins] = useState(0);
  const [totalPlays, setTotalPlays] = useState(0);
  const [claimModal, setClaimModal] = useState(false);
  const earnings = winRewardCounter(wins, winStreak);
  const formatedToken = formatTokenAmount(earnings);
  const aiRole = playerRole === 'X' ? 'O' : 'X';
  const { status } = useAppKitAccount();

  useEffect(() => {
    if (status === 'disconnected') redirect('/auth');
  }, [status]);

  useEffect(() => {
    if (turn === 'bot' && matchResult === null) {
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
            setTurn('player');
          }
        }, 500);
      }
    }
  }, [turn, board, matchResult, playerRole, aiRole]);

  const totalLosses = totalPlays - wins;
  useEffect(() => {
    if (matchResult === 'X' || matchResult === 'O' || matchResult === 'draw') {
      setTotalPlays((prev) => prev + 1);
    }

    if (totalLosses >= 3) {
      setClaimModal(true);
    }
  }, [matchResult]);

  const handleClick = (index: number) => {
    if (board[index] !== null || matchResult !== null || turn !== 'player')
      return;

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
      setTurn('bot');
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
    setWinStreak(0);
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
          <div className="relative flex min-h-screen items-center justify-center bg-black px-4 text-white">
            <RewardSideBar
              wins={wins}
              total={totalPlays}
              streak={winStreak}
              reward={formatedToken.toString()}
              claimReward={() => setClaimModal(true)}
            />
            <div className="flex w-full max-w-4xl flex-col gap-8 md:flex-row">
              {/* Game board */}
              <div className="mx-auto grid w-full max-w-sm grid-cols-3 gap-4">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    className="flex h-24 w-24 items-center justify-center rounded-md border border-white bg-gradient-to-br from-gray-900 to-gray-800 text-4xl font-bold shadow-[0_0_10px_rgba(255,255,255,0.2)] transition-transform duration-200 hover:scale-105"
                    onClick={() => handleClick(index)}
                  >
                    {cell === 'X' ? (
                      <span className="text-blue-400 drop-shadow-[0_0_5px_#3b82f6]">
                        {cell}
                      </span>
                    ) : cell === 'O' ? (
                      <span className="text-pink-400 drop-shadow-[0_0_5px_#ec4899]">
                        {cell}
                      </span>
                    ) : null}
                  </button>
                ))}
              </div>

              {/* Info panel */}
              <div className="flex min-w-1/3 flex-col rounded-lg bg-white/5 p-7 text-right shadow-md">
                <p>
                  <span className="text-gray-400">Your Role:</span>{' '}
                  <span
                    className={`font-bold ${
                      playerRole === 'X' ? 'text-blue-400' : 'text-pink-400'
                    }`}
                  >
                    {playerRole}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">AI Role:</span>{' '}
                  <span
                    className={`font-bold ${
                      aiRole === 'X' ? 'text-blue-400' : 'text-pink-400'
                    }`}
                  >
                    {aiRole}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Turn:</span>{' '}
                  <span className="text-green-400">{turn}</span>
                </p>
                <p className="min-w-full">
                  <span className="text-gray-400">Game Status:</span>{' '}
                  <span className="text-yellow-400">
                    {matchResult === null
                      ? 'Progress'
                      : matchResult === 'draw'
                        ? 'Draw!'
                        : matchResult === playerRole
                          ? 'win! 🎉'
                          : 'lose! 😢'}
                  </span>
                </p>
                <p>
                  <span className="text-gray-400">Win Streak:</span>{' '}
                  <span className="text-white">{winStreak}</span>
                </p>
                {matchResult && (
                  <button
                    onClick={resetGame}
                    className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
                  >
                    {totalLosses >= 3 ? 'Claim reward' : 'Play Again'}
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
