<template>
	<div class="price">
	    <div class="description">
	        <v-text-field label="Name" v-model="priceName" :rules="rules.priceDescription" :change="onNameChanged" required></v-text-field>
	    </div>
	    <div class="value">
	        <v-text-field label="Value" v-model="priceValue" :rules="rules.priceValue" type="number" required></v-text-field>
	    </div>
	    <p>ETH</p>
	    <div class="control">
            <a href="#" v-on:click="deleteOption" title="Remove Price">
                <i class="fa fa-close"></i>
            </a>
        </div>
	</div>
</template>
<script>
export default {
	name: 'pricing-option',
	props: ['description','value','index'],
	data: function(){
		return {
	        rules: {
	            priceDescription: [ (v)=> v.length > 8? true:"Price description must be at least 8 characters long"],
	            priceValue: [ (v)=> v > 0 ?true:"Value > 0"]
	        },
	        priceName: this.description,
	        priceValue: this.value,
	        idx: '',
        }
    },
	watch: {
		description: function(newV, oldV) { // watch it
		  console.log('Prop changed: ', newV, ' | was: ', oldV)
		  this.priceName = newV;
		  //this.value = newV.priceValue;
		},
		value: function(newV, oldV){
			this.priceValue = newV;
		},
		index: function(newV, oldV){
			this.idx = newV;
		}
	},
	methods: {
		deleteOption: function(){
			this.$emit('deletePrice', this.idx);
		},
		onNameChanged: function(v){
			this.description = v;
		}
	},
	updated: function(){
		var price = { name: this.priceName, value: this.priceValue, index: this.index };
		this.$emit('changedPrice', price);
	}
}
</script>
<style lang="scss" scoped>
	* {
		margin: 0;
		box-sizing: border-box;		
	}

	.price {
		width: 100%;
		display: flex;
		padding: 10px;
		margin: 10px 10px 10px 0;
		background-color: #f1f1f1;
		border-radius: 5px;
		align-items: center;
		.description {
			width: 70%;
			display: flex;
			padding: 0 10px;
		}
		.value {
			width: 20%;
			display: flex;
			padding: 0 10px;	
		}
		p {
			width: 5%;
			font-weight: 500;
			color: #8F949D;

		}
		.control {
            width: 5%;
            display: flex;
            flex-direction: column;
            a {
                height: 100%;
                font-size: 14px;
                text-decoration: none;
                i {
                    float: right;
                    color: #d6dde4;
                    line-height: 28px;
                }
            }
		}
	}
</style>