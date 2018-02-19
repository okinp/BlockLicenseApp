<template>
    <div>
        <v-container fluid id="saving">
            <v-layout row wrap>
                <v-flex xs12>
                	<div class="loader-container">
                		<div class="loader-row">
                			<div class="loader"></div>
                		</div>
                	</div>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
    export default {
        name: 'saving-license',
        computed: {

        },
        methods: {

        },
        data: function(){
            return {
                fileName: this.path,
            }
        }
    }
</script>
<style scoped lang="scss">
	#saving{
		padding-top: 130px;
	}
	.loader-container {
		padding: 0;
	    margin: 0;
	    display: flex;
	    align-items: center;
	    justify-content: center;
	}
	.loader-row {
		width: auto;
	}
	.loader {

	  border: 16px solid #f3f3f3;
	  border-radius: 50%;
	  border-top: 16px solid #3498db;
	  border-bottom: 16px solid #3498db;
	  width: 120px;
	  height: 120px;
	  animation: spin 1.8s linear infinite;
	}
	@keyframes spin {
	  0% { transform: rotate(0deg); }
	  100% { transform: rotate(360deg); }
	}
</style>