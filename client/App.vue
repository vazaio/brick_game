<template>
	<main>
		<div>
			<img src="./assets/tetris.png" alt="tetrisimg">
			<section class="canvasWindow">
				<div id="box"
					:style="{left:`-${activeMenuSlide*96}%`}"
				>
					<router-link
						:to="{name:'snake', params:{
							w:canvasW,
							h:canvasH,
							ax:rectAmountX,
							ay:rectAmountY,
							s:rectSize,
							d:difficulty
						}}"
						class="menu"
						v-show="menu"
                        @click.native="menu=false"
					>
						<span>Snake</span>
						<img src="./assets/snake.png" alt="snake" id="gameIconSnake">
					</router-link>
					<router-link
						:to="{name:'cars', params:{
							w:canvasW,
							h:canvasH,
							ax:rectAmountX,
							ay:rectAmountY,
							s:rectSize,
							d:difficulty
						}}"
						class="menu next"
						v-show="menu"
                        @click.native="menu=false"
					>
						<span>Cars</span>
						<img src="./assets/cars.png" id="gameIconCars" 
                            style="height:19%; left:12%; transform:translateX(-50%)" 
                            alt="cars">
					</router-link>
                    <router-link
						:to="{name:'score', params:{
							s:score.snake,
							c:score.cars
						}}"
						class="menu next-2"
						v-show="menu"
                        @click.native="menu=false"
					>
						<span>Hightscore</span>
						<img src="./assets/podium.svg" id="gameIconScore" 
                            style="height:17%; left:1%"    
                            alt="score">
					</router-link>
					<router-view class="menu"
						:style="{left:`${activeMenuSlide*100}%`}"
					> 
					</router-view>
				</div>
			</section>
            <router-link :to="{name:'about'}" id="about">
            </router-link>
			<div id="keySettingsBtn"
				v-if="menu"
				@click="showSettings=!showSettings"
			>
				<img src="./assets/settings.svg" alt="set">		
			</div>
			<div class="canvasWindow settings" 
				v-if="showSettings"	
				id="keySettings"
			>
				<div id="keyBox">
					<div>
						<button v-for="(key, index) in keys"
							:key="index"
							@click="keySetHandler(index)"
							class="btn"
							>
						{{index.toUpperCase()+' || '+key}}
						</button>
						<section>
							<input v-model="setDifficulty"
								type="text" 
								class="setText" 
								placeholder="difficulty"
							>
							<span>Difficulty</span>
						</section>
						<section style="bottom:-50%">
							<input v-model="setSize"
								type="text" 
								class="setText" 
								placeholder="game size"
							>
							<span>Game size</span>
						</section>
					</div>	
					<span>
						<p>
							Press key for	
						</p>
						<p>
							{{keySetSelected.toUpperCase()}}
						</p> 
					</span>
				</div>		
			</div>
		<!--button block @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@-->
		<section id="btnBox">	
			
			<div id="backResetBtn">
                <div>
                    <div class="ellipsBtn gameBtn" id="backBtn"></div>
                    <span class="btnName">BACK</span>
                </div>
                <div>
                    <div class="ellipsBtn gameBtn" id="resetBtn"></div>
                    <span class="btnName">RESET</span>
                </div>
			</div>
			
			<div id="actionBtn">
				<div class="arrowsFireBtn">
					<div id="up" class="arrowsBtn">
                        <span class="btnName">UP</span>
                        <div class="gameBtn" id="upBtn"></div>
                    </div>
                    <div id="down" class="arrowsBtn">
                        <div class="gameBtn" id="downBtn"></div>
                        <span class="btnName">DOWN</span>
                    </div>
                    <div id="left" class="arrowsBtn">
                        <div class="gameBtn" id="leftBtn"></div>
                        <span class="btnName">LEFT</span>
                    </div>
                    <div id="right" class="arrowsBtn">
                        <div class="gameBtn" id="rightBtn"></div>
                        <span class="btnName">RIGHT</span>
                    </div>
				</div>
				<div class="arrowsFireBtn" id="fire">
                        <span class="btnName">FIRE</span>
                        <div class="gameBtn" id="startBtn"></div>
                        <span class="btnName">START</span>
                </div>
			</div>
		</section>
		<!--button block @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@2222-->
		</div>
	</main>
</template>

<script>

export default {
	data() {
		return {
			canvasW:0,//canvas height
            canvasH:0,// and width
            canvasInitialH:0,
            canvasInitialW:0,
			rectAmountX:0, // amount of squares by x------send this obj to all components
			rectAmountY:0,//amount of squares by y
			rectSize:24,// size of squares
			showSettings:false,
			canv:{},
			difficulty:6,//game speed-----------
			setDifficulty:'',
            setSize:'',
			keys: {
				up:38,
				down:40,
				left:37,
				right:39,
				start:13,
                back:8,
                reset:109
			},
			keySetSelected:'choose key',//selected key from key settings
			keyPressed:'right',
			activeMenuSlide:0,
            menu:true,
            score: {
                snake:0,
                cars:0
            }
		}
	},
	watch: {
		setDifficulty() {
			if (this.setDifficulty>0 && this.setDifficulty<61) {
				this.difficulty=this.setDifficulty
				this.changeSettingClass(0,'success')
			}
			else this.changeSettingClass(0,'failure')
		},
		setSize() {
			if (this.setSize>9 && this.setSize<51) {
				this.rectSize=this.setSize
				this.changeSettingClass(1,'success')
			}
			else this.changeSettingClass(1,'failure')
		},
		rectSize() {
			this.dimensioning()//recalculation of canvas sizes---------------------------4
        }
	},
	methods: {
		keySetHandler(keyName) {
			this.keySetSelected=keyName
			document.addEventListener('keyup', this.keySet)
		},
		keySet(e) {//set new key-------------------------------------
			for (let key in this.keys) {
				if (key===this.keySetSelected) {
					this.keys[key]=e.keyCode
					for (let el in this.keys) {//check for identical keys-------------
						if (this.keys[key]===this.keys[el] && key!==el) {
							this.keys[el]=''
							break
						}
					}
					break
				}
			}
			document.removeEventListener('keyup', this.keySet)
            this.keySetSelected=`done`
		}, 
		dimensioning() {//window size calculation-----------------------------
			this.rectAmountX=Math.floor(this.canvasInitialW/this.rectSize)
			this.canvasW=this.rectAmountX*this.rectSize
			this.rectAmountY=Math.floor(this.canvasInitialH/this.rectSize)
			this.canvasH=this.rectAmountY*this.rectSize
		},
		changeSettingClass(i, type) {//input box(settings) highlighting-------------------
			let classList=['setTextSuccess', 'setTextFailure']
			if (type==='failure') classList.unshift(classList.pop()) 
				document.getElementsByClassName('setText')[i].classList.remove(classList[1])
				document.getElementsByClassName('setText')[i].classList.add(classList[0])	
        }	
	},
	mounted() {
        if(localStorage.getItem('snake')) {//check for the existence of records-------------------
            this.score.snake=localStorage.getItem('snake')
        }
        
        if(localStorage.getItem('cars')) {
            this.score.cars=localStorage.getItem('cars')
        }
        
        document.addEventListener('score', (e) => {//getting high scores from games----------------------
            if(e.detail.name='snake' && e.detail.score>this.score.snake) {
                this.score.snake=e.detail.score
                localStorage.setItem('snake', this.score.snake)
            }
            else if(e.detail.name='cars' && e.detail.score>this.score.cars) {
                this.score.cars=e.detail.score   
                localStorage.setItem('cars', this.score.cars)
            }
        })
        
        let btnBox=document.getElementsByClassName('gameBtn')
        let gameBtnDown = new Event('keydown')
        
        for (let el of btnBox) {//add eventlistener click for every button--------
            el.addEventListener('click', (e) => {
                let gameBtnName=e.target.id.slice(0,-3)
                for (let key in this.keys) {
                    if (gameBtnName===key) {
                        gameBtnDown.keyCode=this.keys[key]
                        document.dispatchEvent(gameBtnDown)
                        break
                    }
                }
            })
        }
        
        this.canv=document.querySelector('#box')
        this.canvasInitialH=this.canv.clientHeight
        this.canvasInitialW=this.canv.clientWidth
		this.dimensioning()//first dimensioning---------------------------------
        
        document.addEventListener('keydown', (e) => {//send key value to components by $root--------
            for (let key in this.keys) {
				if(this.keys[key]===e.keyCode) {
					this.keyPressed=key
					break
				}
				else this.keyPressed='unknwn'
			}
        
        if (this.keyPressed==='back' && this.menu) {//back button logic---------------------
			this.keyPressed='unknwn'
        }
        else if (this.keyPressed==='back' && !this.menu) {
            this.menu=true
            document.querySelector('#about').click()
        }
        
        if (this.keyPressed==='start' && this.showSettings) {//start button logic--------
            this.keyPressed='unknwn'
        }
        else if (this.keyPressed==='start' && this.showSettings===false) {
            this.canv.children[this.activeMenuSlide].click()
            this.menu=false
        }
        
        if (this.keyPressed==='reset') {//reset button logic-------------------------
            document.querySelector('#about').click() 
            window.location.reload()
        }
        
        if(this.menu && !this.showSettings) {//menu animation logic------------------------------------------------
			if (this.keyPressed==='right' && this.activeMenuSlide<2) {
				this.activeMenuSlide++
			}
			if (this.keyPressed==='left' && this.activeMenuSlide>0) {
				this.activeMenuSlide--
			}	
		}
        
        for (let el of btnBox) {//button animation-------------------------------
            el.classList.remove('activeBtn')
            if ((el.id.slice(0,-3))===this.keyPressed) {
                el.classList.add('activeBtn')
            }
        }
        
        this.$root.$emit('keyPressed', this.keyPressed)//send key to game component-------------------		
	})	
	}
}
</script>

<style scoped>
    .gameBtn {
        -webkit-box-shadow: inset -2px -2px 8px 4px rgba(0,0,0,0.6);
                box-shadow: inset -2px -2px 8px 4px rgba(0,0,0,0.6);
    }
    .activeBtn {
        -webkit-transition:all .2s;
        -o-transition:all .2s;
        transition:all .2s;
        -webkit-box-shadow: inset 4px 4px 8px 4px rgba(0,0,0,0.6);
                box-shadow: inset 4px 4px 8px 4px rgba(0,0,0,0.6);
    }
    #about {
        display: none;
    }
	#btnBox {
		position: absolute;
		font-size: 20px;
		color:white;
		top: 68vh;
		width:92%;
		margin-left:4%;
		direction: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
	}
	#backResetBtn {
		width:100%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
	}
    #backResetBtn div {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
    }
    .ellipsBtn {
        height: 1vh;
        width:5vh;
        border-radius: 10px;
        margin:0 20px;
        background-color: red;
    }
    .btnName {
        display: block;
        font-size: 1.5vh;
        color: #B59C37;
        margin-top:3px;
    }
	#actionBtn {
		display:-webkit-box;
		display:-ms-flexbox;
		display:flex;
		-webkit-box-pack: justify;
		    -ms-flex-pack: justify;
		        justify-content: space-between;
		width:100%;
		height: 25vh;
	}
    .arrowsBtn {
        width:30%;
        height:30%;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        position: absolute;
    }
    .arrowsBtn div {
        width:70%;
        height: 70%;
        border-radius: 50%;
        background-color: #FFDD00;
    }
    .arrowsFireBtn {
		width:22vh;
		height:22vh;
        position: relative;
    }
    #up {
        top:0;
        left:50%;
        -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
                transform: translateX(-50%);
    }
    #down {
        bottom:0;
        left:50%;
        -webkit-transform: translateX(-50%);
            -ms-transform: translateX(-50%);
                transform: translateX(-50%);
    }
    #left {
        left:3%;
        top:50%;
        -webkit-transform: translateY(-38%);
            -ms-transform: translateY(-38%);
                transform: translateY(-38%);
    }
    #right {
        right:3%;
        top:50%;
        -webkit-transform: translateY(-38%);
            -ms-transform: translateY(-38%);
                transform: translateY(-38%);
    }
    #fire {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
            -ms-flex-direction: column;
                flex-direction: column;
        -webkit-box-pack: center;
            -ms-flex-pack: center;
                justify-content: center;
        -webkit-box-align: center;
            -ms-flex-align: center;
                align-items: center;
        width: 12vh; 
    }
    #fire div {
        width:60%;
        height: 60%;
        border-radius: 20px;
        background-color:#FFDD00;
    }
	main {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		height: 100vh; width: 100vw;
		background-color:rgba(255,221,0,1);
		overflow:hidden;
	}
	main div {
		position: relative;
	}
	main div img {
		height: 100vh;
	}
	.canvasWindow {
		position: absolute;
		top:6vh;
		left:6vh;
		height: 59vh;
		border:2px solid black;
		width:43vh;
		border-radius: 20px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
        overflow: hidden;
	}
	#box {
		width: 96%;
		height: 96%;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column; 
		-webkit-box-pack: center; 
		    -ms-flex-pack: center; 
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		position: relative;
		-webkit-transition: 1.2s steps(10,end);
		-o-transition: 1.2s steps(10,end);
		transition: 1.2s steps(10,end);
	}
	#box a {
		-webkit-transition: inherit;
		-o-transition: inherit;
		transition: inherit;
		text-decoration: none;
	}
	#box a span {
		color:#3b3b3b;
		font-size:40px;
	}
	#box a img {
		position: relative;
		top:20%;
		height: 7%;
		left:-30%;
	}
    #gameIconSnake {
        -webkit-animation: gameSnakeGo 5s steps(20, end) infinite;
                animation: gameSnakeGo 5s steps(20, end) infinite;
    }
    #gameIconCars {
        -webkit-animation: gameCarsGo 5s steps(20, end) infinite;
                animation: gameCarsGo 5s steps(20, end) infinite;
    }
    #gameIconScore {
        -webkit-animation: gameScoreGo 1s steps(2, end) infinite;
                animation: gameScoreGo 1s steps(2, end) infinite;
    }
 	.menu {
		position: absolute;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		top:0;
		left:0;
		width: 100%;
		height: 100%;
	}
	.next {
		left:100%;
	}
	.next-2 {
		left:200%;
	}
	#keySettingsBtn{
		width:50px;
		height: 50px;
		position: absolute;
		bottom:1vh;
		right: 2vw;
		z-index: 10;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	#keySettingsBtn img {
		widows: 4vh;
		height: 4vh;
	}
	#keySettingsBtn:hover {
		cursor: pointer;
	}
	.settings {
		background-color: #797D78; 
		z-index: 11;
	}
	#keyBox {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	#keyBox div {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		position: relative;
	}
	#keyBox span {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-orient: vertical;
		-webkit-box-direction: normal;
		    -ms-flex-direction: column;
		        flex-direction: column;
		-webkit-box-pack: center;
		    -ms-flex-pack: center;
		        justify-content: center;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
		color:#3b3b3b;
		font-size: 20px;
		margin-left:20px;
	}
	#keyBox div section {
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		    -ms-flex-align: center;
		        align-items: center;
	}
	#keyBox div section span {
		margin-left:0px;
		display: block;
	}
	.btn {
		background: none;
		border: 1px solid #3b3b3b;
		margin:5px;
		font-size: 20px;
		color:#3b3b3b;	
	}
	.btn:hover {
		background-color: #3b3b3b;
		color: whitesmoke;
	}
	.btn:focus, .setText:focus {
		outline: none;
	}
	.setText {
		position: relative;
		background: none;
		border:1px solid #3b3b3b;
		width: 40px;
		height: 24px;
		margin:0 5px 5px 5px;
		text-align: center;
		font-size:20px;
		color:#3b3b3b;
		-webkit-transition: .6s;
		-o-transition: .6s;
		transition: .6s;
	}
	.setTextSuccess {
		border: 1px solid #24FF24;
	}
	.setTextFailure {
		border: 1px solid lightcoral;
	}
	@-webkit-keyframes gameSnakeGo {
		from, to {
			left:-30%;
		}
		50% {
			left:30%;
		}
	}
	@keyframes gameSnakeGo {
		from, to {
			left:-30%;
		}
		50% {
			left:30%;
		}
	}
    @-webkit-keyframes gameCarsGo {
		from, to {
			top:0%;
		}
		50% {
			top:30%;
		}
	}
    @keyframes gameCarsGo {
		from, to {
			top:0%;
		}
		50% {
			top:30%;
		}
	}
    @-webkit-keyframes gameScoreGo {
		from, to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
    @keyframes gameScoreGo {
		from, to {
			opacity: 1;
		}
		50% {
			opacity: 0;
		}
	}
	@media screen and (min-width: 100px) and (max-width: 767px) {
		#keyBox span {
			font-size: 14px;		
		}
		.btn, .setText {
			font-size: 14px;
		}
	}
</style>

