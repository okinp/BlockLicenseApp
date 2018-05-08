<template>
  <div class="bl-dialog">
    <h1>Delete Account</h1>
    <h1>"{{getWalletName()}}" ?</h1>
    <button-bar :active="true" @confirm="deleteAccount" @cancel="cancelDialog" :applyText="'Delete'"></button-bar>
  </div>
</template>
<script>
import ButtonBar from '../Common/ButtonBar';
export default {
	name: 'confirm-delete-dialog',
  components: { ButtonBar },
  props: ['accountIndex'],
  methods: {
    deleteAccount: function(){
      this.$store.commit('Wallet/DELETE_ACCOUNT', this.idx );
      this.$emit("hide", true);
    },
    cancelDialog: function(){
      this.$emit("hide", true);
    },
    getWalletName: function(){
      return this.$store.getters['Wallet/nameAtIndex'](this.idx);
    }
  },
  data: function(){
    return {
      idx: 0,
    }
  },
  watch: {
    accountIndex: function(now, before){
      this.idx = now;
    }
  },
}
</script>
<style lang="scss" scoped>
  .bl-dialog {
    width: 100%;
    height: 230px;
    display: flex;
    flex-direction: column;
    h1,h2 {
      text-align: center;
      padding: 10px 0;
      display: inline-block;
    }
    h1 {
      emph {
        font-weight:500;
      }
    }
    .button-group {
      margin-top: auto;
    }
  }
  .dialog {
    width: 50% !important;
  }

</style>