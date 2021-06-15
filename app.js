const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next-piece-board');
const ctxNext = canvasNext.getContext('2d');

const moves = {
	[KEY.SPACE]: p => ({...p, y: p.y + 1}),
	[KEY.DOWN]: p => ({...p, y: p.y + 1}),
	[KEY.LEFT]: p => ({...p, x: p.x - 1}),
	[KEY.RIGHT]: p => ({...p, x: p.x + 1}),
	[KEY.UP]: p => p.rotate()
};




let board = new Board(ctx, ctxNext);
let time = {start: 0, elapsed: 0, level: 1000};
let requestId;

addEventListener();



function addEventListener() {
	document.addEventListener('keydown', event => {
		if(moves[event.keyCode]) {
			event.preventDefault();
			let p = moves[event.keyCode](board.piece);
			console.log(p);
			if(board.isValidMove(p)){
				if(event.keyCode == KEY.SPACE) {
					while(board.isValidMove(p)) {
						board.piece.move(p);
						p = moves[KEY.DOWN](board.piece);
					}
				}
				else {
					board.piece.move(p);
				}
			} else console.log("Invalid Move!");
		}	
	});
}

function animate(now = 0){
	time.elapsed = now - time.start;
	if(time.elapsed > time.level) {
		time.start = now;
		board.drop();
	}
	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	board.draw();
	requestId = requestAnimationFrame(animate);
}

function play() {
	board.reset();
	console.table(board.grid);
	let piece = new Piece(ctx);
	board.piece = piece;

	time.start = performance.now();
	animate();
}
