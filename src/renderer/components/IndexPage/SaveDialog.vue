<template>
  <v-dialog persistent v-model="shown" min-width="500px" max-width="612px" height="283px" class="saveDialog">
      <v-card height="301px">
        <close-bar @close="cancelDialog"></close-bar>
        <v-container fluid id="saveDialog">
            <v-layout row wrap>
                <v-flex xs12 class="text-center" v-if="processingStage==0">
                    <h1>Apply license?</h1>
                </v-flex>
                <v-flex xs12 class="text-center" v-if="processingStage==0">
                    <v-btn flat class="app-btn" v-on:click="confirmProcess">Confirm</v-btn>
                </v-flex>
              <v-flex xs12 class="text-center" v-if="processingStage==0">
                  <v-btn flat class="cancel-btn" v-on:click="cancelDialog">Cancel</v-btn>
              </v-flex>
              <v-flex xs12 id="messages" class="text-center" v-if="processing">
                  <process-message :action="actionA" :text="'Saving data to file'" v-if="processingStage>=1"></process-message>
                  <process-message :action="actionB" :text="'Calculating file ID'" v-if="processingStage>=2"></process-message>
                  <process-message :action="actionC" :text="'Saving to Ethereum'" v-if="processingStage>=3"></process-message>
              </v-flex>
            </v-layout>
        </v-container>
      </v-card>
  </v-dialog>
</template>
<script>
  import CloseBar from '../Common/CloseBar';
  import ProcessMessage from './ProcessMessage';
  export default {
    name: "save-dialog",
    props: ['shown', 'path','processingStage', 'actionA', 'actionB', 'actionC'],
    components: { CloseBar, ProcessMessage },
    methods: {
      cancelDialog: function(){
        this.$emit("cancel", true);
      },
      confirmProcess: function(){
        this.$emit("process", true);
        //this.$emit("cancel", true);
      },
    },
    data: function(){
      return {
        processing: true,
      }
    }
  }
</script>
<style lang="scss" scoped>

  #saveDialog {

  }
  #messages {
    margin-top: 50px;
  }



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