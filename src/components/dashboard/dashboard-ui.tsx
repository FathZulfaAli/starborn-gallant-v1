'use client';

import useHeadCheck from '@/hooks/useHeadCheck';
import TictactoeCard from '../tictactoe/tictactoe-card';

export default function DashboardFeature() {
  const ok = useHeadCheck();

  return (
    <>
      {ok ? (
        <div className="m-1.5 flex h-full flex-col overflow-hidden rounded-2xl bg-[#1d2951] p-3 lg:m-4 lg:p-5 lg:px-7">
          <TictactoeCard />
        </div>
      ) : null}
    </>
  );
}
