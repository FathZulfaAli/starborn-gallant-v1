'use client';

import useHeadCheck from '@/hooks/useHeadCheck';
import TictactoeCard from '../tictactoe/tictactoe-card';

export default function DashboardFeature() {
  const ok = useHeadCheck();

  return (
    <>
      {ok ? (
        <div className="m-4 flex h-full flex-col overflow-hidden rounded-2xl bg-[#1d2951] p-5 px-7">
          <TictactoeCard />
        </div>
      ) : null}
    </>
  );
}
