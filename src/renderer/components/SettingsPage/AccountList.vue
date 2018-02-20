<template>
    <div class="accounts">
        <h1 class="text-center">Accounts</h1>
        <div class="text-right" id="add-account" v-bind:class="{ hidden: !isHidden }">
            <a href="#" v-on:click="newAccount">+ ADD ACCOUNT</a>
        </div>
        <div id="account-list">   
            <account :accountData="w" :accountIndex="idx" @editAccount="editAccount" @deleteAccount="deleteAccount" @accountIndex="setAccountIndex" :class="{hidden: accountListIsEmpty}"  v-for="(w,idx) in accounts" :key="idx"></account>
        </div>

        <close-bar @close="closeEmited" v-if="!isHidden"/>
        <component :is="getComponent"  @formSubmitted="submitForm" v-if="!isHidden"></component>
        <account-dialog :shown="showDialog" :dialogOption="getDialogOption" @cancel="cancelDialog" @delete="acceptDelete"></account-dialog>
    </div>
</template>
<script>
    import Account from './Account'
    import NewAccount from './NewAccount'
    import EditAccount from './EditAccount'
    import CloseBar from '../Common/CloseBar'
    import AccountDialog from './AccountDialog'
    export default {
        name: "account-list",
        components: { Account, NewAccount, EditAccount, CloseBar, AccountDialog },
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
            },
            getDialogOption: function(){
                return this.actions[this.action];
            }
        },
        methods: {
            closeEmited: function(){
                this.isHidden = true;
                this.isEdit = false;
            },
            newAccount: function(){
                this.action = 1;
                this.showDialog = true;
            },
            show: function(){
              this.isHidden = false  
            },
            editAccount: function(){
                this.isEdit = true;
                this.isHidden = false;
                this.showDialog = true;
            },
            deleteAccount: function(){
                this.action = 0;
                this.showDialog = true;
            },
            submitForm: function(){
                this.isHidden = true;
                this.isEdit = false;
            },
            cancelDialog: function(){
                this.showDialog = false;
            },
            acceptDelete: function(){
                this.$store.commit('Wallet/DELETE_ACCOUNT', this.accountIndex);
            },
            setAccountIndex: function(idx){
                this.accountIndex = idx;
            }
        },
        data() {
            return {
                isHidden: true,
                isEdit: false,
                showDialog: false,
                action: 0,
                actions: ['confirm-delete-dialog', 'new-account-dialog','edit-account-dialog'],
                accountIndex: null
            }
        }
    }
</script>

<style lang="scss" scoped>
.accounts {
    #add-account {
        width: 100%;
        height: 60px;
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #BFC6D0;
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