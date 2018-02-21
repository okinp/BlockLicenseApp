<template>
    <div class="main-content">
		<wallet-selector @selectedAccount="setSelectedAccount"/>
        <component :is="getComponent" :selectedIndex="selectedIndex"></component>
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
    import BuyForm from './TransferPage/BuyForm'
	export default {
		name: 'transfer',
		components: { WalletSelector, TransferForm, BuyForm },
        methods: {
            setSelectedAccount: function(x){
                this.selectedIndex = x;
            }
        },
        computed: {
            getComponent: function(){
//                console.log('getComponent')
//                console.log(this.display)
                return this.transfer=='0'?'transfer-form':'buy-form'; 
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