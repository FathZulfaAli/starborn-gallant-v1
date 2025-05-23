import React from 'react';

export default function TictactoePlayerRole({
  onPick,
}: {
  onPick: (role: 'X' | 'O') => void;
}) {
  return (
    <>
      <div
        id="modal"
        className="fixed top-0 left-0 z-20 flex h-full w-full items-center justify-center backdrop-blur-lg"
      >
        <div className="h-fit w-fit rounded bg-white p-4 text-center shadow-lg">
          <h1 className="mb-5 text-3xl font-bold text-black">Pick your Hero</h1>
          <div className="flex items-center justify-center gap-x-2">
            <button
              onClick={() => onPick('X')}
              className="flex aspect-square w-40 items-center justify-center bg-black text-2xl text-white"
            >
              X
            </button>
            <button
              onClick={() => onPick('O')}
              className="flex aspect-square w-40 items-center justify-center bg-black text-2xl text-white"
            >
              O
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
