export function textMain(ctx, text, x, y) {//huuuge font size----------
	ctx.fillStyle='#3b3b3b'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.font = '38px Sans'
	ctx.fillText(text, x, y)
}

export function textSecondary(ctx, text, x, y) {//tiny font---------------------
	ctx.fillStyle='#3b3b3b'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.font = '26px Sans'
	ctx.fillText(text, x, y)
}

export function showScore(ctx, score, canv) {//show last screen(score)----------------
	setTimeout(() => {
		ctx.fillStyle='#797D78'
		ctx.fillRect(0,0,canv.width,canv.height)
		textMain(ctx, 'Score', canv.width/2, canv.height/2)
		textMain(ctx, score, canv.width/2, canv.height/2+60)
		textSecondary(ctx, 'Press start or back button', canv.width/2, canv.height/2+120)
	}, 1000)
}

export function fillBg(ctx, amountX, amountY, size) {//fill background--------------------------
	for (let i=0; i<=amountX; i++) {
		for(let j=0; j<=amountY; j++) {
			ctx.fillStyle='#757575'
			ctx.fillRect( (i*size), (j*size), size, size)
			ctx.fillStyle='#797D78'
			ctx.fillRect( (i*size)+1, (j*size)+1, size-2, size-2)
			ctx.fillStyle='#757575'
			ctx.fillRect( (i*size)+4, (j*size)+4, size-8, size-8)
		}
	}
}

export function clearOnlyPlayer(ctx, player, size) {
	for(let el of player) {
		ctx.fillStyle='#757575'
		ctx.fillRect( el.x, el.y, size, size)
		ctx.fillStyle='#797D78'
		ctx.fillRect( el.x+1, el.y+1, size-2, size-2)
		ctx.fillStyle='#757575'
		ctx.fillRect( el.x+4, el.y+4, size-8, size-8)
	}
}

export function clearDot(ctx, x, y, size) {
    ctx.fillStyle='#757575'
    ctx.fillRect( x, y, size, size)
    ctx.fillStyle='#797D78'
    ctx.fillRect( x+1, y+1, size-2, size-2)
    ctx.fillStyle='#757575'
    ctx.fillRect( x+4, y+4, size-8, size-8)
}

export function cr(x,y,size,ctx) {//create rectangle
	ctx.fillStyle='#3b3b3b'
	ctx.fillRect(x,y,size, size)
	ctx.fillStyle='#797D78'
	ctx.fillRect(x+1, y+1, size-2, size-2)
	ctx.fillStyle='#3b3b3b'
	ctx.fillRect(x+4,y+4,size-8, size-8)
}

export function randomNumber(min, max) {
	return (Math.random()*(max-min))+min
}
export function sendScore(name, score) {
    document.dispatchEvent(new CustomEvent('score',{detail:{name:name,score:score}}))
}