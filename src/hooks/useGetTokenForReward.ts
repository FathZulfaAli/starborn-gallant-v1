"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

type TokenRequest = {
	matchPlayed: number;
	matchWin: number;
	winStreak: number;
};

export function useGetTokenForReward() {
	const { address, isConnected } = useAppKitAccount();

	return useMutation({
		mutationFn: async ({ matchPlayed, matchWin, winStreak }: TokenRequest) => {
			if (!isConnected || !address) throw new Error("Wallet not connected");

			const response = await axios.post(
				process.env.GET_TOKEN_API || "https://sb-server.vercel.app/api/get-token",
				{
					wallet: address,
					matchPlayed,
					matchWin,
					winStreak,
				}
			);
			return response.data.token;
		},
	});
}
