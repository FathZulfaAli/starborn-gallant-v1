"use client";

import React, { useEffect, useMemo } from "react";
import { redirect, useParams } from "next/navigation";
import { PublicKey } from "@solana/web3.js";
import Image from "next/image";
import { useSplTokenBalance } from "@/hooks/useSplTokenBalance";
import HistoryTable from "./account-history-table";
import { useAppKitAccount } from "@reown/appkit/react";

export default function AccountUi() {
	const nblrBalance = useSplTokenBalance("AEebqYuDhemMLP16MaLNEJSTFvCSzaiijTbQidFGs9m1");
	const params = useParams();
	const { status } = useAppKitAccount();

	useEffect(() => {
		if (status === "disconnected") redirect("/auth");
	}, [status]);

	const address = useMemo(() => {
		if (!params.pubkey) {
			return;
		}
		try {
			return new PublicKey(params.pubkey);
		} catch (e) {
			console.log(`Invalid public key`, e);
		}
	}, [params]);
	if (!address) {
		return <div>Error loading account</div>;
	}

	const trimmedWallet = address?.toString().slice(0, 5) + "....." + address?.toString().slice(-4);

	const today = new Date();
	const formattedToday = new Intl.DateTimeFormat("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(today);

	return (
		<div className='bg-[#1d2951] flex flex-col h-5/6 p-5 px-7 m-4 rounded-2xl'>
			<div className='flex flex-row justify-between w-full h-full'>
				<div className='bg-black rounded-lg p-3 h-fit w-fit'>
					<p className='text-2xl font-semibold text-[#F2F4F8]'>Balance</p>
					<div className='flex flex-row'>
						<p
							className='text-9xl font-bold cursor-pointer'
							onClick={() => nblrBalance.refetch()}
						>
							{nblrBalance.data?.toString() ?? "0000"}
						</p>

						<p>NBLR</p>
						<Image
							src={"/nblr-logo.png"}
							width={100}
							height={25}
							alt='nblr'
							className='object-contain'
						/>
					</div>
				</div>
				<div className='flex flex-col'>
					<p className='text-2xl font-semibold text-[#F2F4F8]'>{trimmedWallet}</p>
					<span className='text-sm text-gray-400'>{formattedToday}</span>
				</div>
			</div>
			<div className='flex flex-row w-full h-full'>
				<HistoryTable />
			</div>
		</div>
	);
}
