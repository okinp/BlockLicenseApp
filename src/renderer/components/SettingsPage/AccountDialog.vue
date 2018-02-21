<template>
  <v-dialog persistent v-model="shown" min-width="500px" max-width="612px" class="acountDialog">
      <v-card>
         <close-bar @close="cancelDialog"></close-bar>
         <component class="dialog-s" :is="dialogOption" :showDialog="shown" :accountIndex="accountIndex" @cancel="cancelDialog" @delete="deleteAccount"></component>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  import ConfirmDeleteDialog from './ConfirmDeleteDialog';
  import NewAccountDialog from './NewAccountDialog';
  import EditAccountDialog from './EditAccountDialog';
  export default {
    name: "account-dialog",
    props: ['shown', 'dialogOption', 'accountIndex'],
    components: { CloseBar, ConfirmDeleteDialog, NewAccountDialog, EditAccountDialog },
    methods: {
      cancelDialog: function(){
        this.$emit("cancel", true);
      },
      deleteAccount: function(){
        this.$emit("delete", true);
      }
    },
  }
</script>
<style scoped>
 .dialog-s {

 }


</style>