<template>
	<div id="box">
		<canvas width="200px" height="200px">
			Canvas не работает	
		</canvas>	
	</div>
</template>

<script>
import * as utils from '../utils.js'
export default {
	props: {
		w:'',	
		h:'',
		ax:'',
		ay:'',
		s:'',
		d:''
	},
	mounted() {
		let canvas=document.getElementsByTagName('canvas')[0],
			ctx=canvas.getContext('2d'),
			rectSize=Number(this.s),//rectangle size
			direction='right',
			difficulty=Number(this.d),
			meal={x:0, y:0},//position of meal
			mealExists=false,
			amountX=Number(this.ax), 
			amountY=Number(this.ay),//amount of rectSize squares
			keyPressed=new CustomEvent('keyPressed', {
				detail: {key:0}
			}),
			gameInterval//main game loop--------------------------------
				
		canvas.width=Number(this.w)
		canvas.height=Number(this.h)
        let vueParent=this

		let plrX=Math.floor((canvas.width/rectSize)/2)*rectSize,//set in tha absolute center----
			plrY=Math.floor((canvas.height/rectSize)/2)*rectSize,//start position---------------
			snake=[
				{
					x: plrX,
					y: plrY
				},
				{
					x: plrX-rectSize,
					y: plrY
				},
				{
					x: plrX-2*rectSize,
					y: plrY
				}
			]
	
		ctx.fillStyle='#797D78'
		ctx.fillRect(0,0,canvas.width,canvas.height)
		utils.textMain(ctx, 'Snake', canvas.width/2, canvas.height/2)
		utils.textSecondary(ctx, 'Press start button', canvas.width/2, canvas.height/2+60)
		
		this.$root.$on('keyPressed', (key) => {//getting keyCode from parent-------
			keyPressed.detail.key=key
			document.dispatchEvent(keyPressed)
			if (key==='start' && !gameInterval) {
				utils.fillBg(ctx, amountX, amountY, rectSize)
				gameInterval=setInterval(()=>{
					snakeGameRender(direction)
				},1000/difficulty)
			}
		})
	
		function snakeGameRender(d) {//d is direction--------------
			document.addEventListener('keyPressed', keyHandler)

			if(!isBump()) {
				utils.clearOnlyPlayer(ctx, snake, rectSize)
				
				if (!mealExists) {//render meal--------------------------------------------
					meal=mealCreator()
					utils.cr(meal.x, meal.y, rectSize, ctx)
				} else {
					utils.cr(meal.x, meal.y, rectSize, ctx)
				}
				
				snake.unshift(snake.pop())//rebuild snake---------------------------------
				
				switch(d) {//positioning--------------------------------------------------
					case 'up':
						snake[0].x=snake[1].x
						snake[0].y=snake[1].y-rectSize
						break
					case 'down':
						snake[0].x=snake[1].x
						snake[0].y=snake[1].y+rectSize
						break
					case 'left':
						snake[0].x=snake[1].x-rectSize
						snake[0].y=snake[1].y
						break
					case 'right':
						snake[0].x=snake[1].x+rectSize
						snake[0].y=snake[1].y
						break
				}
				
				snakeRelocation()

				if (snake[0].x===meal.x && snake[0].y===meal.y) {//snake eat meal------
					mealExists=false
					snake.push({
						x:snake[snake.length-1].x,
						y:snake[snake.length-1].y
					})
				}

				for (let el of snake) {//render snake----------------------
					utils.cr(el.x, el.y, rectSize, ctx)
				}
			}
			else {
				clearInterval(gameInterval)
				gameInterval=undefined
                utils.showScore(ctx, snake.length*1235, canvas)
                utils.sendScore('snake', snake.length)
				snake.length=3//cut snake tail------------------------------
			}
		}
		
		function isBump() {//check for collision------------------
			for (let i=1; i<snake.length; i++) {
				if (snake[0].x===snake[i].x && snake[0].y===snake[i].y) {
					return true
				}
			}
			return false
		}

		function mealCreator() {//create random positions of meal------------
			let x, y, mealReady=false
			while(mealReady!==true) {
				x=Math.ceil(utils.randomNumber(0, amountX))-1//alignment by axes------
				x*=rectSize
				y=Math.ceil(utils.randomNumber(0, amountY))-1
				y*=rectSize//alignment by axes----------------------------------------------
				for (let el of snake) {
					if (el.x===x || el.y===y) break
					else {
						mealReady=true
						break
					}
				}
				mealReady=true
				mealExists=true
			}
			return {
				x: x,
				y: y
			}	
		}

		function snakeRelocation() {//snake cell positions---------------
			if (snake[0].x+rectSize>canvas.width) snake[0].x=0.0//have no iadea why 0 is not working
			if (snake[0].y+rectSize>canvas.height) snake[0].y=0.0
			if (snake[0].x<0) snake[0].x=canvas.width-rectSize
			if (snake[0].y<0) snake[0].y=canvas.height-rectSize
		}

		function keyHandler(e) {//where snake to go
			document.removeEventListener('keyPressed', keyHandler)
			if (e.detail.key==='up' && direction!=='down') direction='up'	
			if (e.detail.key==='down' && direction!=='up') direction='down'
			if (e.detail.key==='left' && direction!=='right') direction='left'				
			if (e.detail.key==='right' && direction!=='left') direction='right'
		}
	}	
}
</script>

<style scoped>
	#box {
		position: absolute;
		top:0;
		left: 0;
		z-index: 10;
		width:100%;
		height: 100%;
	}
</style>