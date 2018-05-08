<template>
	<div class="button-group">
	    <div class="accept">
	        <v-btn flat class="app-btn" v-on:click="confirm"  v-bind:class="{ 'btn--disabled': !isActive}">{{applyText}}</v-btn>
	    </div>
		<div class="cancel">
	    	<v-btn flat class="cancel-btn" v-on:click="cancel">Cancel</v-btn>
		</div>
	</div>
</template>
<style lang="scss" scoped>
	.button-group {
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10px 0;
		.accept, .cancel {
			.app-btn {
		    background-color: #3857b9 !important;
		    color: white;
		}
	  	.app-btn.btn--disabled {
		    opacity: 0.5;
		    .btn__content {
		      color: white !important;
		    }
	  	}
	  .cancel-btn {
	    color: #3857b9 !important;
	  }
	}
}
</style>
<script>
export default {
	name: "button-bar",
	props: ["applyText", "cancelText", "active"],
	data: function(){
		return {
			isActive: this.active
		}
	},
	methods: {
		confirm: function(){
			this.$emit('confirm', true);
		},
		cancel: function(){
			this.$emit('cancel', true);
		}
	},
    watch: {
      active: function(now, before){
        this.isActive = now;
      }
    }
}
</script>
