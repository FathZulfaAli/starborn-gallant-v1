import React from "react";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const histories = [
	{
		game: "TicTacToe",
		amount: "123412314123",
		txLink: "https://explorer.solana.com/tx/123412314123",
	},
];

export default function HistoryTable() {
	return (
		<>
			<section className='flex flex-col w-full h-full'>
				<p className='text-[#F2F4F8] font-semibold text-xl'>Game History</p>

				<table className='min-w-full border-collapse border border-gray-200 rounded-md overflow-hidden'>
					<thead>
						<tr>
							<th className='w-[100px] text-left px-4 py-2 border-b'>Game</th>
							<th className='text-left px-4 py-2 border-b'>Amount</th>
							<th className='text-right px-4 py-2 border-b'>Explorer</th>
						</tr>
					</thead>
					<tbody>
						{histories.map((history) => (
							<tr key={history.game} className='hover:bg-black/10'>
								<td className='font-medium px-4 py-2 border-b'>{history.game}</td>
								<td className='px-4 py-2 border-b'>{history.amount}</td>
								<td className='text-right px-4 py-2 border-b'>
									<Link
										href={history.txLink}
										target='_blank'
										rel='noopener noreferrer'
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
