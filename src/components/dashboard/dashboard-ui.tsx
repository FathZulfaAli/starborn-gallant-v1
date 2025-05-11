import TictactoeCard from "../tictactoe/tictactoe-card";

export default function DashboardFeature() {
	return (
		<div className='bg-[#1d2951] h-full flex flex-col p-5 px-7 m-4 rounded-2xl overflow-hidden'>
			<TictactoeCard />
		</div>
	);
}
