<template>
    <div class="main-content">
		<wallet-selector @selectedAccount="setSelectedAccount"/>
        <transfer-form :selectedIndex="selectedIndex"></transfer-form>
    </div>
</template>
<style scoped>
	#app {
		position: fixed;
		width: 100%;
		top: 70px;
	}
    .main-content { 
        width: 100%;
/*        height: 100%;*/
        flex-grow: 1;
        display: flex;
        flex-direction: column;
     }
</style>
<script>
    import WalletSelector from './IndexPage/WalletSelector'
	import TransferForm from './TransferPage/TransferForm'
	export default {
		name: 'transfer',
		components: { WalletSelector, TransferForm },
        methods: {
            setSelectedAccount: function(x){
                this.selectedIndex = x;
            }
        },
        data: function(){
            return {
                selectedIndex: 0,
                transfer: '0'
            }
        }
	}
</script>