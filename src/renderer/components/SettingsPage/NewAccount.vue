<template>
    <div>
        <v-form v-model="valid" ref="form">
            <v-container fluid id="account-list">
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <h1>New Account</h1>
                    </v-flex>
                    <v-flex xs4>
                        <v-radio-group v-model="autoKey" row :mandatory="false">
                            <v-radio label="Auto" value='1' ></v-radio>
                            <v-radio label="Manual" value='0'></v-radio>
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs12>
                     <v-text-field label="Name" v-model="name" :rules="[rules.validateName]">
                     </v-text-field>
                    </v-flex>
                    <v-flex xs12 v-if="autoKey=='0'">
                     <v-text-field label="Private Key" v-model="privateKey" :rules="[rules.validatePrivateKey]">
                     </v-text-field>
                    </v-flex>
                    <v-flex xs12 class="text-center">
                        <v-btn id="app-btn" v-on:click="addAccount" v-bind:class="{ 'btn--disabled': !valid}">Add</v-btn>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
  </div>
</template>
<script>
import CloseBar from '../Common/CloseBar'
export default {
    name: 'new-account',
    components: { CloseBar },
    methods: {
        addAccount: function(){
            var account = null;
            if ( this.autoKey==='1' )
            {
//                console.log('Adding auto private key')
                account = this.$EthTools.web3.eth.accounts.create(this.$EthTools.web3.utils.randomHex(32));       
            } else {
//                console.log('Adding private key')
                account = this.$EthTools.web3.eth.accounts.privateKeyToAccount(this.privateKey.substring(0,2)=='0x'?this.privateKey:'0x'+this.privateKey);
            }
            var w = { name: this.name, accountObject: account };
            this.$store.commit('Wallet/ADD_ACCOUNT', w);
            this.$EthTools.wallet.add(account);
            this.$emit("formSubmitted", true);
        }
    },
    computed: {

    },
    data: function(){
        return {
            name: '',
            privateKey: '',
            valid: false,
            rules: {
                validateName: function(value){
                    return value.length >= 6 ? true : 'Name must be at least 6 characters long'
                },
                validatePrivateKey: function(value){
                    const ethUtil = require('ethereumjs-util');
                    var isValid = false;
                    try {
                        isValid = ethUtil.isValidPrivate(Buffer.from(value,'hex'));
                    }
                    catch(err) {
                        isValid = false;
                    }
                    return isValid? true:'Invalid Key'
                }
            },
            autoKey: '1',
        }
    }
}
</script>