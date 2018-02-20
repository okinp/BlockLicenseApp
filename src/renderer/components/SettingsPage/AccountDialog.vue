<template>
  <v-dialog persistent v-model="shown" max-width="500px">
      <v-card>
         <close-bar @close="cancelDialog"></close-bar>
         <component :is="dialogOption" @cancel="cancelDialog" @delete="deleteAccount"></component>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  import ConfirmDeleteDialog from './ConfirmDeleteDialog';
  import NewAccountDialog from './NewAccountDialog';
  export default {
    name: "account-dialog",
    props: ['shown', 'dialogOption'],
    components: { CloseBar, ConfirmDeleteDialog, NewAccountDialog },
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