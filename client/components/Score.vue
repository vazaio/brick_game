<template>
    <div id="score">
        <div>
            <span>Snake</span>
            <span>{{Number(s)*1235}}</span>
        </div>
        <div>
            <span>Cars</span>
            <span>{{Number(c)*1235}}</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
		s:'',
		c:''
	}
}
</script>

<style scoped>
    #score {
        position: absolute;
        top:0;
        left: 0;
        z-index: 10;
        width:100%;
        height: 100%;
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
    #score div {
        display: block;
        width:80%;
        margin:10px 0;
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-pack: justify;
            -ms-flex-pack: justify;
                justify-content: space-between;
    }
    #score div span {
        display: block;
        font-size:5vh;
        color:#3b3b3b;
        -webkit-animation: flashing 2s steps(4, end) infinite;
                animation: flashing 2s steps(4, end) infinite;
        -webkit-box-sizing: border-box;
                box-sizing: border-box;
        border: 3px solid #3b3b3b;
        padding: 5px;
    }
    @-webkit-keyframes flashing {
        form,to {
            border: 3px solid #3b3b3b;
        }
        50% {
            border: 3px solid rgba(0,0,0,0);
        }
    }
    @keyframes flashing {
        form,to {
            border: 3px solid #3b3b3b;
        }
        50% {
            border: 3px solid rgba(0,0,0,0);
        }
    }
</style>


