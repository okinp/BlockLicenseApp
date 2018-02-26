<template>
	<div>
		<vue-editor :id="id"  v-model="textModel" :placeholder="placeholder" :editorToolbar="customToolbar" @input="emitChange"></vue-editor>
	</div>

</template>

<script>
import { VueEditor } from 'vue2-editor'
export default {
	name: 'text-area',
	props: ['valid', 'id', 'placeholder', 'rules'],
	components: { VueEditor },
	data: function(){
		return {
			textModel: '',
			customToolbar: [ ['bold', 'italic', 'underline'], ],
		}
	},
	methods: {
		getContent: function(){
			return this.textModel;
		},
		emitChange: function(v){
			//alert(v);
			this.$emit('input', v);
		}
	}
}
</script>
<style lang="scss">
	.ql-container, #license-editor {
		border-top: 1px solid #ccc !important;	
	}

    .ql-editor {
        min-height: 100px;
        max-height: 100px;
    }

</style>