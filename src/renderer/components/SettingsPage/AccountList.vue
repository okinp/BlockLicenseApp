<template>
    <div class="accounts">
        <h1 class="text-center">Accounts</h1>
        <div class="text-right" id="add-account">
            <a href="#" v-on:click="showNewAccountForm">+ ADD ACCOUNT</a>
        </div>
        <div id="account-list">   
            <account :accountData="account" :accountIndex="idx" @editAccountPressed="showEditAccountForm" @deleteAccountPressed="showDeleteAccountForm" @accountIndex="setAccountIndex" :class="{hidden: accountListIsEmpty}"  v-for="(account,idx) in accounts" :key="idx"></account>
        </div>
        <account-dialog :visible="this.dialogIsShown" :dialogOption="getDialogOption" :accountIndex="accountIndex" @hide="hideDialog"></account-dialog>
    </div>
</template>
<script>
    import Account from './Account'
    import AccountDialog from './AccountDialog'
    export default {
        name: "account-list",
        components: { Account, AccountDialog },
        computed: {
            accounts: function(){
                return this.$store.getters['Wallet/accounts'];
            },
            accountListIsEmpty: function(){
                return this.$store.getters['Wallet/accounts'].length === 0 ? true:false;
            },
            getDialogOption: function(){
                return this.actions[this.action];
            }
        },
        methods: {
            showDeleteAccountForm: function(){
                this.action = 0;
                this.showDialog();
            },
            showNewAccountForm: function(){
                this.action = 1;
                this.showDialog();
            },
            showEditAccountForm: function(){
                this.action = 2;
                this.showDialog();
            },
            showDialog: function(){
                this.dialogIsShown = true;  
            },
            hideDialog: function(){
                this.dialogIsShown = false;
            },
            setAccountIndex: function(idx){
                this.accountIndex = idx;
            }
        },
        data() {
            return {
                action: 0,
                actions: ['confirm-delete-dialog', 'new-account-dialog','edit-account-dialog'],
                accountIndex: null,
                dialogIsShown: false,
            }
        }
    }
</script>

<style lang="scss" scoped>

.accounts {
    display: flex;
    flex-direction: column;
    margin-top: 50px;
    #add-account {
        width: 100%;
        height: 60px;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        display: flex;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        padding-right: 24px;
        justify-content: flex-end;
        a {
            text-decoration: none;
            cursor: pointer;
            float: right;
            display:block;
            height: 100%;
            line-height: 60px;
            color: #3857B9;
        }
    }
    #account-list {
        height: 100%;
        flex-grow: 1;
        padding-top: 0;
        padding-bottom: 0px;
    }
}
</style>