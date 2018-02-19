<template>
  <div class="infobar">
    <div id="wallet-selector" v-if="selectedIndex!==-1">
        <div id="wallet" >
          <v-select 
                    :items="accounts"
                    v-model="selectedIndex"
                    label="Select Account"
                    v-on:change="onChange"
                    item-value="index"
                    item-text="name"
                    single-line
                    bottom > 
          </v-select>
        </div>
        <div id="balance">        
          <p><span class="amount">{{ethBalance}}</span> ETH</p>
        </div>
    </div>
  </div>
</template>
<script>
  module.exports =  {
    name: 'wallet-selector',
    data() {
        return {
            selectedIndex: null,
        }
    },
    computed: {
        accounts: function() {
            return this.$store.getters['Wallet/accounts'].map((x,idx)=>{
                x.index = idx;
                return x;
            });
        },
        ethBalance: function(){
            return this.$store.getters['Wallet/accounts'][this.selectedIndex].balance.eth;
        },
        bltBalance: function(){
            return this.$store.getters['Wallet/accounts'][this.selectedIndex].balance.blt;
        }
    },
    methods: {
        onChange: function(x){
            this.selectedIndex = x;
            this.$emit("selectedAccount", x);
        }
    },
    created: function(){
        this.selectedIndex = this.$store.getters['Wallet/primaryIndex']
        this.$emit("selectedAccount", this.selectedIndex);
    }
 }
</script>
<style lang="scss">
  .infobar {
    width: 100%;
    height: 64px;
    background-color: #EEF2F6;
    color: #BFC6D0;
    padding: 12px 24px;
    font-size: 18px;
    #wallet-selector {
      box-sizing: border-box;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;
      #wallet {
        width: 50%;
        & > .input-group {
            height: 40px;
            padding-top: 0;
            & > label {
                top: 0;
                font-size: 18px;
                height: 40px;
                line-height: 40px;
                color: #BFC6D0;
            }
            & > .input-group__input {
                height: 40px;
                & > i {
                  font-size: 30px;
                  color: rgba(0, 0, 0, 0.3);
                }
            }
            & > .input-group__details {
              padding-top: 0;
              &::before, &::after {
                height: 0;
              }   
            }
        }
      }
      #balance {
        width: 50%;
        height: 100%;
        display: flex;
        justify-content: flex-end;
        p {
          margin: 0;
          line-height: 40px;
          border-left: 1px solid #ddd;
          padding-left: 20px;
          padding-right: 55px;
          .amount {
            color: #3857B9;
          }
        }
      }
      .list__tile, .input-group--select .input-group__selections__comma {
          font-size: 18px;
          color: dimgray;
      }
      .list__tile__title,#wallet-selector .input-group__selections__comma:not(.input-group__selections__comma--active) {
          color: #666e7a;
      }
    }
  }
</style>