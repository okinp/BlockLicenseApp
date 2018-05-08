<template>
  <v-dialog v-model="isVisible" class="appDialog" persistent>
      <v-card>
        <close-bar @close="cancel"></close-bar>
        <slot name="component"></slot>
        <button-bar :active="buttonEnabled" @confirm="confirm" @cancel="cancel" :applyText="applyText"></button-bar>
      </v-card>
  </v-dialog>
</template>
<script>
  import ButtonBar from '../Common/ButtonBar'
  import CloseBar from '../Common/CloseBar'
  export default {
    name: "app-dialog",
    props: ['show','enabled', 'applyText' ],
    components: { CloseBar, ButtonBar },
    methods: {
      cancel: function(){
        this.$emit("cancel", true);
      },
      confirm: function(){
        this.$emit("confirm", true);
      },
      isActive: function(){
        return false;
      } 
    },
    computed: {

    },
    data(){
      return {
        isVisible: this.show,
        buttonEnabled: this.enabled
      }
    },
    watch: {
      show: function(now, before){
        this.isVisible = now;
      },
      enabled: function(now,before){
        this.buttonEnabled = now;
      }
    }
  }
</script>
<style lang='scss' >
.appDialog {
  width: 60%;
}
</style>