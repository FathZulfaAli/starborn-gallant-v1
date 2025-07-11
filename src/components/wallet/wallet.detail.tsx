"use client";

import { useEffect } from "react";
import {
	useAppKitState,
	useAppKitTheme,
	useAppKitEvents,
	useAppKitAccount,
	useWalletInfo,
} from "@reown/appkit/react";
import { useClientMounted } from "@/hooks/useClientMount";
import { useSplTokenBalance } from "@/hooks/useSplTokenBalance";

export const InfoList = () => {
	const kitTheme = useAppKitTheme();
	const state = useAppKitState();
	const { address, caipAddress, isConnected, embeddedWalletInfo } = useAppKitAccount();
	const events = useAppKitEvents();
	const walletInfo = useWalletInfo();
	const mounted = useClientMounted();
	const nblrBalance = useSplTokenBalance("AEebqYuDhemMLP16MaLNEJSTFvCSzaiijTbQidFGs9m1");

	useEffect(() => {
		console.log("Events: ", events);
	}, [events]);

	return !mounted ? null : (
		<>
			<section>
				<h2>useAppKit</h2>
				<pre>
					Address: {address}
					<br />
					caip Address: {caipAddress}
					<br />
					Connected: {isConnected.toString()}
					<br />
					Account Type: {embeddedWalletInfo?.accountType}
					<br />
					Nebularis Token Balance: {nblrBalance?.toString()}
					<br />
					{embeddedWalletInfo?.user?.email &&
						`Email: ${embeddedWalletInfo?.user?.email}\n`}
					{embeddedWalletInfo?.user?.username &&
						`Username: ${embeddedWalletInfo?.user?.username}\n`}
					{embeddedWalletInfo?.authProvider &&
						`Provider: ${embeddedWalletInfo?.authProvider}\n`}
				</pre>
			</section>

			<section>
				<h2>Theme</h2>
				<pre>
					Theme: {kitTheme.themeMode}
					<br />
				</pre>
			</section>

			<section>
				<h2>State</h2>
				<pre>
					Selected Network ID: {state.selectedNetworkId?.toString()}
					<br />
					loading: {state.loading.toString()}
					<br />
					open: {state.open.toString()}
					<br />
				</pre>
			</section>

			<section>
				<h2>WalletInfo</h2>
				<pre>
					Name: {walletInfo.walletInfo?.name?.toString()}
					<br />
				</pre>
			</section>
		</>
	);
};
