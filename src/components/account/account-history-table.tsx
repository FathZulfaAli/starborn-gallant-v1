import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

const histories = [
  {
    game: 'TicTacToe',
    amount: '123412314123',
    txLink: 'https://explorer.solana.com/tx/123412314123',
  },
];

export default function HistoryTable() {
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
            {histories.map((history) => (
              <tr key={history.game} className="hover:bg-black/10">
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
                    {history.txLink}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
}
