"use client";

import { createAppKit } from "@reown/appkit/react";
import React from "react";
import { networks, projectId, solanaWeb3JsAdapter } from "./reown.config";

// Set up metadata
const metadata = {
	name: "next-reown-appkit",
	description: "next-reown-appkit",
	url: "https://github.com/0xonerb/next-reown-appkit-ssr", // origin must match your domain & subdomain
	icons: ["https://avatars.githubusercontent.com/u/179229932"],
};

// Create the modal
export const modal = createAppKit({
	adapters: [solanaWeb3JsAdapter],
	projectId: projectId,
	networks: networks,
	metadata,
	themeMode: "dark",
	themeVariables: {
		"--w3m-accent": "#000000",
	},
	featuredWalletIds: ["a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393"],
	enableNetworkSwitch: false,
	// TODO: add your own terms and conditions and privacy policy URLs
	termsConditionsUrl: "https://www.mytermsandconditions.com",
	privacyPolicyUrl: "https://www.myprivacypolicy.com",
	features: {
		connectMethodsOrder: ["wallet"],
		onramp: false,
		email: false,
		socials: false,
	},
});

function ReownAppkitProvider({ children }: { children: React.ReactNode }) {
	return <>{children}</>;
}

export default ReownAppkitProvider;
