"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useQuery } from "@tanstack/react-query";

export function useGetReward(action: string) {
	const { address, isConnected } = useAppKitAccount();

	return useQuery({
		queryKey: ["reward", address, action],
		enabled: isConnected && !!address,
		queryFn: async () => {
			const response = await fetch(
				`https://api.devnet.solana.com/v1/reward/${address}/${action}`
			);
			if (!response.ok) {
				throw new Error("Network response was not ok");
			}
			const data = await response.json();
			return data;
		},
		staleTime: 1000 * 30, // cache for 30 seconds
		refetchOnWindowFocus: false,
		retry: 1,
	});
}
