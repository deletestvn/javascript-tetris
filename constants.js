const COLS = 10;
const ROWS = 20;
const BLOCK_SIZE = 30;

const iTetromino = [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
const jTetromino = [[1, 0, 0], [1, 1, 1], [0, 0, 0]];
const lTetromino = [[0, 0, 1], [1, 1, 1], [0, 0, 0]];
const oTetromino = [[1, 1], [1, 1]];
const sTetromino = [[0, 1, 1], [1, 1, 0], [0, 0, 0]];
const zTetromino = [[1, 1, 0], [0, 1, 1], [0, 0, 0]];
const tTetromino = [[0, 1, 0], [1, 1, 1], [0, 0, 0]];

const Tetrominos = [iTetromino, jTetromino, lTetromino, oTetromino, sTetromino, zTetromino, tTetromino];

const KEY = {
	SPACE: 32,
	LEFT: 37,
	UP: 38,
	RIGHT: 39,
	DOWN: 40
}
Object.freeze(KEY);