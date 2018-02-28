<template>
	<div class="processMessage">
		<div class="messageContainer">
			<p>{{text}}</p>
		    <div class="processIcon">
		    	<i v-if='action ==="loading"' class='fa fa-circle-o-notch fa-spin'></i>
		    	<i v-else-if='action ==="saving"' class='fa fa-gear fa-spin'></i>
		    	<i v-else-if='action ==="done"' class='fa fa-check'></i>
				<i v-else class='fa fa-exclamation-circle'></i>
		    </div>
		</div>
	</div>
</template>
<script>
    export default {
        name: 'process-message',
        props: ['action','text'],
        data: function(){
        	return {
        		ptext: '',
        	}
        },	
  //       watch: {
		// 	text: function(newV, oldV) { // watch it
		//   		//console.log('Prop changed: ', newV, ' | was: ', oldV)
		//   		this.ptext = newV;
		//   		//this.value = newV.priceValue;
		// 	},
		// },
    }
</script>
<style lang="scss" scoped>
	* {
		margin: 0;
    	box-sizing: border-box;     
	}
	.processMessage {
		width: 100%;
		display: flex;
		justify-content: center;
		.messageContainer {
			display:flex;
			width: 50%;
			justify-content: center;
			p {
				width:65%;
				line-height: 24px;
		        color: #8F949D;
		        font-size: 18px;
		        font-weight: 300;
		        text-align: right;
			}
			.processIcon {
				width: 35%;
				padding-left: 15px;
				display: flex;
				justify-content: flex-start;
				height: 24px;
				i {
					display: block;
					font-size: 24px;
					color: gray;
				}
			}
		}

	}
</style>