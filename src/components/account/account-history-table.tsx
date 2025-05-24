import React, { use } from 'react';
import Link from 'next/link';
import { useGameHistory } from '@/hooks/useGameHistory';

export default function HistoryTable({ address }: { address: string }) {
  const { history } = useGameHistory(address);

  const trimExplorerUrl = (url: string): string => {
    const base = 'https://explorer.solana.com/tx/';
    const txHash = url.split('/tx/')[1]?.split('?')[0] ?? '';
    const shortTx = txHash.slice(0, 22); // or 20–24 chars depending on your UI
    return `${base}${shortTx}`;
  };

  return (
    <>
      <section className="flex h-full w-full flex-col">
        <p className="text-xl font-semibold text-[#F2F4F8]">Game History</p>

        <table className="min-w-full border-collapse overflow-hidden rounded-md border border-gray-200">
          <thead>
            <tr>
              <th className="w-[100px] border-b px-4 py-2 text-left">Game</th>
              <th className="border-b px-4 py-2 text-left">Amount</th>
              <th className="border-b px-4 py-2 text-right">Explorer</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={3} className="border-b px-4 py-2 text-center">
                  No game history found.
                </td>
              </tr>
            ) : (
              history.map((history) => (
                <tr key={history.txLink} className="hover:bg-black/10">
                  <td className="border-b px-4 py-2 font-medium">
                    {history.game}
                  </td>
                  <td className="border-b px-4 py-2">{history.amount}</td>
                  <td className="border-b px-4 py-2 text-right">
                    <Link
                      href={history.txLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {trimExplorerUrl(history.txLink)}
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
