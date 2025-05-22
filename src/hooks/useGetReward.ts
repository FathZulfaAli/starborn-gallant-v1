"use client";

import { useAppKitAccount } from "@reown/appkit/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";

export function useGetReward() {
	const { address, isConnected } = useAppKitAccount();

	return useMutation({
		mutationFn: async (token: string) => {
			if (!isConnected || !address) throw new Error("Wallet not connected");
			try {
				const response = await axios.post(
					process.env.GET_REWARD_API || "https://sb-server.vercel.app/api/get-reward",
					{
						wallet: address,
						token: token,
					}
				);
				return response.data.link;
			} catch (error: any) {
				console.log("useGetReward body", address, token);
				console.log("Error in useGetReward:", error.response?.data);
				return "Failed to get reward";
			}
		},
	});
}
