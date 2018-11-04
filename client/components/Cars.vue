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
			rectSize=Number(this.s),//rectangle size-----------
			direction='',
			difficulty=Number(this.d),//game speed---------------
			cars=[],//positions of cars {x:0, y:0}-------------------
			amountX=Number(this.ax), 
			amountY=Number(this.ay),//amount of rectSize squares-------------
			keyPressed=new CustomEvent('keyPressed', {
				detail: {key:0}
			}),
			gameInterval,//main game loop--------------------------------
            directionX, directionY,//uses to minimize code-----------------
            score=0,
            borderMove=0, 
            carsAppearFreq=amountY-2			
        
        canvas.width=Number(this.w)
		canvas.height=Number(this.h)
        
        let plrX=Math.floor((canvas.width/rectSize)/2)*rectSize,//set in tha absolute center----
            racer=buildCar(plrX, canvas.height)
            cars[0]=buildCar(plrX,0)
		
		ctx.fillStyle='#797D78'
		ctx.fillRect(0,0,canvas.width,canvas.height)
		utils.textMain(ctx, 'Cars', canvas.width/2, canvas.height/2)
		utils.textSecondary(ctx, 'Press start button', canvas.width/2, canvas.height/2+60)
		
		this.$root.$on('keyPressed', (key) => {//getting keyCode from parent-------
			keyPressed.detail.key=key
			document.dispatchEvent(keyPressed)
			if (key==='start' && !gameInterval) {
                utils.fillBg(ctx, amountX, amountY, rectSize)
                
				gameInterval=setInterval(()=>{
					carsGameRender(direction)
				},1000/difficulty)
			}
		})
	
		function carsGameRender(d) {//d is direction------------------------
			document.addEventListener('keyPressed', keyHandler)
            
            if(!isBump()) {
				utils.clearOnlyPlayer(ctx, racer, rectSize)//clear racer---------------------- 
				for(let i=0; i<cars.length; i++) {//clear cars-------------------
        			utils.clearOnlyPlayer(ctx, cars[i], rectSize)
                }
                for(let y=0; y<amountY; y++) {//clear border------------------------
                    utils.clearDot(ctx, 0, y*rectSize, rectSize)
                    utils.clearDot(ctx, (amountX-1)*rectSize, y*rectSize, rectSize)
                }
                
                if(borderMove>5) borderMove=0//build border for left and right sides---------------------
                borderMove++
                border()
                
                if(cars[cars.length-1][0].y>carsAppearFreq*rectSize) {//create cars--------------------------------
                    if(cars.length<6) {
                        cars.push(buildCar(Math.floor(utils.randomNumber(1,amountX-3))*rectSize,0))
                    }   
                }
                if(cars[0][6].y>canvas.height) {//if the car has left abroad, then delete it--------------------
                    cars.shift()
                    score++
                    if(score%10===0 && carsAppearFreq>3) carsAppearFreq--//linear complication-------------------------
                }
                for(let i=0; i<cars.length; i++) {//traffic of cars---------------------
        			for(let el of cars[i]) {
                        el.y+=rectSize
                    }
                }

                    switch(d) {
                        case 'up':
                            if(racer[6].y>0) directionY=-1
                            else directionY=0
                            directionX=0
                        break
                        case 'down':
                            if(racer[0].y<canvas.height-rectSize) directionY=1
                            else directionY=0
                            directionX=0
                        break
                        case 'left':
                            if(racer[0].x>rectSize) directionX=-1
                            else directionX=0
                            directionY=0
                        break
                        case 'right':
                            if(racer[2].x<canvas.width-2*rectSize) directionX=1
                            else directionX=0
                            directionY=0
                        break
                        default:
                            directionX=0
                            directionY=0
                    }
				
                for(let i=0; i<cars.length; i++) {//render cars------------------
        			for(let el of cars[i]) {
                        utils.cr(el.x,el.y,rectSize,ctx)
                    }
                }

				for (let el of racer) {//render racer----------------------
                    el.x+=directionX*rectSize
                    el.y+=directionY*rectSize
                    utils.cr(el.x, el.y, rectSize, ctx)
				}
			}
			else {//game over-----------------------------
				clearInterval(gameInterval)
				gameInterval=undefined
                utils.showScore(ctx, score*1235, canvas)
                utils.sendScore('cars', score)
				cars[0]=buildCar(plrX,0)//decrease in the number of cars------------------------------
                racer=buildCar(plrX, canvas.height)//return to start position-------
            }
		}
		
		function isBump() {//check collision----------------------
			for (let i=0; i<cars.length; i++) {
                for(let j=0; j<7; j++) {
                    for(let er of racer) {
                        if(er.x===cars[i][j].x && er.y===cars[i][j].y) return true
                    }
                }
			}
			return false
		}

		function border() {//create border-----------------
            let ch=0
            for(let i=borderMove-5; i<amountY; i++) {
                ch++
                if(ch>4) {
                    if(ch==6) ch=0
                    continue
                }
                utils.cr(0,i*rectSize,rectSize,ctx)
                utils.cr((amountX-1)*rectSize,i*rectSize,rectSize,ctx)
            }
        }

        function buildCar(x,y) {
            let car=[
				{
					x: x,
					y: y-rectSize
				},
				{
					x: x+rectSize,
                    y: y-2*rectSize
				},
				{
					x: x+2*rectSize,
					y: y-rectSize
                },
                {
					x: x,
					y: y-3*rectSize
                },
                {
					x: x+rectSize,
					y: y-3*rectSize
                },
                {
					x: x+2*rectSize,
					y: y-3*rectSize
                },
                {
					x: x+rectSize,
					y: y-4*rectSize
				}
            ]
            return car
        }

		function keyHandler(e) {//where snake to go
			document.removeEventListener('keyPressed', keyHandler)
            if (e.detail.key==='up') direction='up'	
			if (e.detail.key==='down') direction='down'
			if (e.detail.key==='left') direction='left'				
            if (e.detail.key==='right') direction='right' 
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