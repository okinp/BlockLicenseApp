<template>
  <v-dialog persistent v-model="shown" min-width="500px" max-width="612px" class="acountDialog">
      <v-card>
        <close-bar @close="cancelDialog"></close-bar>
        <v-container fluid id="account-list">
            <v-layout row wrap>
                <v-flex xs12 class="text-center">
                    <h1>Transfer {{value}}ETH ?</h1>
                </v-flex>
                <v-flex xs12 class="text-center">
                    <v-btn flat class="app-btn" v-on:click="confirmTransfer">Confirm</v-btn>
                </v-flex>
              <v-flex xs12 class="text-center">
                  <v-btn flat class="cancel-btn" v-on:click="cancelDialog">Cancel</v-btn>
              </v-flex>
            </v-layout>
        </v-container>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  export default {
    name: "transfer-dialog",
    props: ['shown', 'value', 'address'],
    components: { CloseBar },
    methods: {
      cancelDialog: function(){
        this.$emit("cancel", true);
      },
      confirmTransfer: function(){
        this.$emit("transfer", true);
        this.$emit("cancel", true);
      }
    },
  }
</script>
<style lang="scss" scoped>
  .app-btn {
    background-color: #3857b9 !important;
    color: white;
  }
  .cancel-btn {
    color: #3857b9 !important;
  }
  h1 {
    /*margin-bottom: 12px;*/
    &.second {
      margin-bottom: 12px;
      margin-top: 12px;
    }
  }
</style>