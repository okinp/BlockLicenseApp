<template>
    <div class="accounts">
        <h1 class="text-center">Accounts</h1>
        <div id="account-list">   
            <account :accountData="w" :accountIndex="idx" @editAccount="editAccount" :class="{hidden: accountListIsEmpty}"  v-for="(w,idx) in accounts" :key="idx"></account>
        </div>
        <div class="text-right" id="add-account" v-bind:class="{ hidden: !isHidden }">
            <a href="#" v-on:click="show">+ ADD ACCOUNT</a>
        </div>
        <close-bar @close="closeEmited" v-if="!isHidden"/>
        <component :is="getComponent"  @formSubmitted="submitForm" v-if="!isHidden"></component>
    </div>
</template>
<script>
    import Account from './Account'
    import NewAccount from './NewAccount'
    import EditAccount from './EditAccount'
    import CloseBar from '../Common/CloseBar'
    export default {
        name: "account-list",
        components: { Account, NewAccount, EditAccount, CloseBar },
        computed: {
            accounts: function(){
                return this.$store.getters['Wallet/accounts'];
            },
            accountListIsEmpty: function(){
                return this.$store.getters['Wallet/accounts'].length === 0 ? true:false;
            },
            getComponent: function(){
//                console.log(this.isEdit?'edit-account':'new-account');
                return this.isEdit?'edit-account':'new-account'
            }
        },
        methods: {
            closeEmited: function(){
                this.isHidden = true;
                this.isEdit = false;
            },
            show: function(){
              this.isHidden = false  
            },
            editAccount: function(){
                this.isEdit = true;
                this.isHidden = false;
            },
            submitForm: function(){
                this.isHidden = true;
                this.isEdit = false;
            }
        },
        data() {
            return {
                isHidden: true,
                isEdit: false
            }
        }
    }
</script>

<style lang="scss" scoped>
.accounts {
    #add-account {
        width: 100%;
        padding-top: 16px;
        padding-right: 24px;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #BFC6D0;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        a {
            text-decoration: none;
            cursor: pointer;
            float: right;
        }
    }
    #account-list {
        min-height: 725px;
        max-height: 725px;
        overflow-y: auto;
        padding-top: 0;
        padding-bottom: 0px;
    }
}
</style>