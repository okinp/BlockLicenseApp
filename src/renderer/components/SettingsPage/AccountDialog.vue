<template>
  <v-dialog v-model="isVisible" class="bl-dialog" persistent>
      <v-card>
        <close-bar @close="hide"></close-bar>
        <component :is="option" :accountIndex="accountIndex" @hide="hide"></component>
      </v-card>
  </v-dialog>
</template>
<script>

  import CloseBar from '../Common/CloseBar'
  import ConfirmDeleteDialog from './ConfirmDeleteDialog';
  import NewAccountDialog from './NewAccountDialog';
  import EditAccountDialog from './EditAccountDialog';
  import ButtonBar from '../Common/ButtonBar';
  export default {
    name: "account-dialog",
    props: ['visible', 'dialogOption', 'accountIndex'],
    components: { CloseBar, ConfirmDeleteDialog, NewAccountDialog, EditAccountDialog, ButtonBar },
    methods: {
      hide: function(){
        this.$emit("hide", true);
      },
    },
    data(){
      return {
        isVisible: this.visible,
        option: this.dialogOption
      }
    },
    watch: {
      visible: function(now, before){
        this.isVisible = now;
      },
      dialogOption: function(now, before){
        this.option = now;
      }
    }
  }
</script>
<style lang="scss">
  .dialog {
    width: 65% !important;
  }
</style>