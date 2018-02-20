<template>
<div class="account">
    <div class="name">
        <div class="edit-account">
            <a href="#" @click="copyPublicKeyToClipboard" title="Copy public key">
                <i class="fa fa-clipboard"></i>
            </a>
            <span>{{ accountData.name }}</span>
        </div>
    </div>
    <div class="balance">
        <div class="amounts">
            <p>
                <span class="amount">{{accountData.balance.eth}}</span> 
                ETH
            </p>
        </div>
        <div class="makePrimary">
            <v-btn class="app-btn" v-bind:class="{ 'btn--disabled': !accountData.primary}"  @click="makePrimary" flat title="Set account as primary">Primary</v-btn>
        </div>
        <div class="controls">
            <a href="#" @click="deleteAccount" title="Delete account">
                <i class="fa fa-close"></i>
            </a>
            <a href="#" @click="editAccount" title="Edit account">
                <i class="fa fa-chevron-right"></i>
            </a>
        </div>
    </div>
</div>
</template>
<style lang="scss" scoped>
.account {
    background-color: #EEF2F6;
    color: #BFC6D0;
    height: 80px;
    display:flex;
    padding: 12px 24px;
    margin: 12px 0;
    .name {
        width: 50%;
        .edit-account {
            display:flex;
            align-items: center;
            height: 100%;
            span {
                font-size: 18px;
                height: 18px;
                line-height: 18px;

                color: #666e7a;
                margin: 0;                
            }
            a {

                text-decoration: none;
                font-size: 18px;
                height: 18px;
                line-height: 18px;
                color: #d6dde4;
                margin: 0 8px;
            }
        }            
    }
    .balance {
        width: 50%;
        border-left: 1px solid #ddd;
        display: flex;
        padding-left: 12px;
        .amounts {
            width: 40%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            p {
                margin: 0;
                color: #BFC6D0;
                font-size: 18px;
                & > span.amount {
                    color: #3857B9;
                }            
            }
        }
        .makePrimary {
            width: 40%;
            display: flex;
            align-items: center;
            .app-btn {
                box-sizing: border-box;
                height: 27px;
                font-size: 12px;
                //background-color: #3857b9;
                background-color: #3857B9 !important;
                //background-color: #3857B9;
                color: white;
                pointer-events: none;
                &.btn--disabled {
                    background-color: #d6dde4 !important;
                    color: white  !important;
                    pointer-events: all;
                }
            }
        }
        .controls {
            width: 20%;
            display: flex;
            flex-direction: column;
            a {
                height: 50%;
                font-size: 28px;
                i {
                    float: right;
                    color: #d6dde4;
                    line-height: 28px;
                }
            }
        }
    }
}
</style>

<script>
export default {
    name: 'account',
    props: ['accountData', 'accountIndex'],
    methods: {
        editAccount: function () {
            this.$store.commit('Wallet/SET_EDIT_ACCOUNT', this.accountIndex);
            this.$emit("editAccount", true);
        },
        deleteAccount: function(){
            this.$store.commit('Wallet/SET_EDIT_ACCOUNT', this.accountIndex);
            //this.$store.commit('Wallet/DELETE_ACCOUNT', this.accountIndex);
            this.$emit("deleteAccount", true);
            this.$emit("accountIndex", this.accountIndex);
        },
        makePrimary: function(){
            this.$store.commit('Wallet/SET_PRIMARY_ACCOUNT', this.accountIndex);
        },
        currentAccount: function(){
            return accountData;
        },
        copyPublicKeyToClipboard: function(){
            this.$store.commit('Wallet/SET_EDIT_ACCOUNT', this.accountIndex);
            // Create the textarea input to hold our text.
            const element = document.createElement('textarea');
            element.value = this.$store.getters['Wallet/editAccount'].accountObject.address;
            // Add it to the document so that it can be focused.
             document.body.appendChild(element);
            // Focus on the element so that it can be copied.
            element.focus();
            element.setSelectionRange(0, element.value.length);
            // Execute the copy command.
            document.execCommand('copy');
            // Remove the element to keep the document clear.
            document.body.removeChild(element);
        },
    },
}
</script>