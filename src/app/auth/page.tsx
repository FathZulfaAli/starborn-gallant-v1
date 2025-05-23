"use client";

import { ConnectButton } from "@/components/wallet/wallet.button";
import { useAppKitAccount } from "@reown/appkit/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

export default function Page() {
	const { status } = useAppKitAccount();

	useEffect(() => {
		if (status === "connected") redirect("/");
	}, [status]);

	return (
		<section className='relative flex flex-col items-center w-full min-h-screen'>
			<Image
				alt=''
				src={"/login-background.webp"}
				sizes='100vw'
				layout='fill'
				objectFit='cover'
			/>
			<div className='absolute flex flex-col items-center justify-center w-full h-full '>
				<ConnectButton />
			</div>
		</section>
	);
}
