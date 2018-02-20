<template>
  <v-dialog persistent v-model="shown" max-width="500px">
      <v-card>
         <close-bar @close="closeDialog"></close-bar>  
        <v-card-title>
          Dialog 2
        </v-card-title>
        <v-card-text>

      <!--         <v-btn color="primary" dark @click.stop="dialog3 = !dialog3">Open Dialog 3</v-btn>
          <v-select
            :items="select"
            label="A Select List"
            item-value="text"
          ></v-select> -->
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" flat @click.stop="dialog2=false" v-on:click.native="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  export default {
    name: "account-dialog",
    components: { CloseBar },
    props: ['shown'],
    methods: {
      closeDialog: function(){
        this.$emit("close", true);
      }
    }
  }
</script>