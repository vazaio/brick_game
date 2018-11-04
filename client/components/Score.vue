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
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    #score div {
        display: block;
        width:80%;
        margin:10px 0;
        display: flex;
        justify-content: space-between;
    }
    #score div span {
        display: block;
        font-size:5vh;
        color:#3b3b3b;
        animation: flashing 2s steps(4, end) infinite;
        box-sizing: border-box;
        border: 3px solid #3b3b3b;
        padding: 5px;
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


