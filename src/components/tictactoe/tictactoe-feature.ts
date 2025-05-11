type Cell = "X" | "O" | null;

export const checkGameStatus = (board: Cell[]): "X" | "O" | "draw" | null => {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const [a, b, c] of winPatterns) {
		if (board[a] && board[a] === board[b] && board[b] === board[c]) {
			return board[a];
		}
	}

	if (board.every((cell) => cell !== null)) return "draw";

	return null;
};

export const getBotMove = (board: Cell[], playerRole: Cell): number => {
	const winPatterns = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	// Determine AI role
	const aiRole = playerRole === "X" ? "O" : "X";

	// Try to win if possible
	for (const pattern of winPatterns) {
		const [a, b, c] = pattern;
		const values = [board[a], board[b], board[c]];
		if (values.filter((v) => v === aiRole).length === 2 && values.includes(null)) {
			return pattern[values.indexOf(null)];
		}
	}

	// Try to block the player from winning
	for (const pattern of winPatterns) {
		const [a, b, c] = pattern;
		const values = [board[a], board[b], board[c]];
		if (values.filter((v) => v === playerRole).length === 2 && values.includes(null)) {
			return pattern[values.indexOf(null)];
		}
	}

	// Else just pick the first available spot
	return board.findIndex((cell) => cell === null);
};
