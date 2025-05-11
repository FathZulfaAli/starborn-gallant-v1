"use client";

import { useQuery } from "@tanstack/react-query";
import { Connection, PublicKey } from "@solana/web3.js";
import { getAssociatedTokenAddress, getAccount, getMint } from "@solana/spl-token";
import { useAppKitAccount } from "@reown/appkit/react";

const connection = new Connection("https://api.devnet.solana.com"); // change this if needed

export function useSplTokenBalance(mintAddress: string) {
	const { address, isConnected } = useAppKitAccount();

	return useQuery({
		queryKey: ["spl-token-balance", mintAddress, address],
		enabled: isConnected && !!address,
		queryFn: async () => {
			const mint = new PublicKey(mintAddress);
			const owner = new PublicKey(address!);
			const ata = await getAssociatedTokenAddress(mint, owner);

			const accountInfo = await getAccount(connection, ata);
			const mintInfo = await getMint(connection, mint);

			const rawBalance = Number(accountInfo.amount);
			const decimalBalance = rawBalance / Math.pow(10, mintInfo.decimals);

			return decimalBalance;
		},
		staleTime: 1000 * 30, // cache for 30 seconds
		refetchOnWindowFocus: false,
		retry: 1,
	});
}
