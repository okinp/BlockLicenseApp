<template>
<div>
    <v-container fluid id="account-list">
        <v-layout row wrap>
            <v-flex xs12 class="text-center">
                <h1>Delete Account?</h1>
            </v-flex>
            <v-flex xs12 class="text-center">
                <v-btn flat class="app-btn" v-on:click="confirmDelete">Delete</v-btn>
            </v-flex>
        	<v-flex xs12 class="text-center">
            	<v-btn flat class="cancel-btn" v-on:click="cancelDialog">Cancel</v-btn>
      		</v-flex>

        </v-layout>
    </v-container>
</div>
</template>
<script>
export default {
	name: 'confirm-delete-dialog',
	methods: {
      cancelDialog: function(){
        this.$emit("cancel", true);
      },
      confirmDelete: function(){
      	this.$emit("cancel", true);
      	this.$emit("delete", true);
      }
    },
}
</script>
<style lang="scss" scoped>
	.app-btn {
		background-color: #3857b9 !important;
		color: white;
	}
	.cancel-btn {
		color: #3857b9 !important;
	}
</style>