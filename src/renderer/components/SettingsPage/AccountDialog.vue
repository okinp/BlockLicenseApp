<template>
  <v-dialog persistent v-model="shown" max-width="500px">
      <v-card>
         <close-bar @close="closeDialog"></close-bar>  
        <v-card-title>
          Dialog 2
        </v-card-title>
        <v-card-text>
          <component :is="dialogOption"></component>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog2=false" v-on:click.native="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  import ConfirmDelete from './ConfirmDelete';
  export default {
    name: "account-dialog",
    props: ['shown', 'dialogOption'],
    components: { CloseBar, ConfirmDelete },
    methods: {
      closeDialog: function(){
        this.$emit("close", true);
      }
    },
  }
</script>