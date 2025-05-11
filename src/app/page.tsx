import DashboardFeature from "@/components/dashboard/dashboard-ui";
import { ActionButtonList } from "@/components/wallet/wallet.button";
import { InfoList } from "@/components/wallet/wallet.detail";
import Image from "next/image";

export default function Home() {
	return (
		<main className='flex-1 overflow-hidden'>
			<DashboardFeature />
		</main>
	);
}
