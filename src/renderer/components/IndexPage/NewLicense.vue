<template>
    <div class="newLicense">
        <filename-banner :fileName="fileName"/>
        <close-bar @close="closeEmited"/>
        <div class="licenseData">  
            <v-form v-model="valid" ref="newLicenseForm2" class="licenseForm">
                <div class="workInfo">
                    <div class="basic">

                        <div class="item">
                            <v-text-field class="itemField" label="Creator Name" v-model="creatorName" :rules="rules.creatorName" required />
                        </div>
                        <div class="item">
                            <v-text-field class="itemField" label="Email" v-model="email" :rules="rules.validateEmail" required />
                        </div>
                        <div class="item">
                            <v-text-field class="itemField" label="Work Title" v-model="title" :rules="rules.validateTitle" />
                        </div>
                    </div>
                    <div class="more">
                        <div class="workDescription">

                            <!-- <vue-editor id="firstEditor" v-model="workDescription" :placeholder="'Work Description'"></vue-editor> -->
<!-- 
                            <v-text-field label="Work Description" v-model="description" :rules="rules.validateDescription" multi-line/> -->
                        </div>
                    </div>
                </div>
                <div class="licenseInfo">
                    <v-select v-bind:items="items" v-on:change="onChange" label="License" single-line bottom :rules="rules.validateLicenseSelect"  required />

                </div>
            </v-form>
            <v-container fluid id="account-list">
                <v-layout row wrap>
                    <v-flex xs12 class="text-center">
                        <v-btn flat class="app-btn" v-on:click="applyLicense" v-bind:class="{ 'btn--disabled': !valid}">Confirm</v-btn>
                    </v-flex>
                  <v-flex xs12 class="text-center">
                      <v-btn flat class="cancel-btn" v-on:click="closeEmited">Cancel</v-btn>
                  </v-flex>
                </v-layout>
            </v-container>
        </div>
    </div>
</template>
<style lang="scss">
    .workDescription {
        height: 100%;
        .ql-toolbar {
            display: none;
        }
        #firstEditor {
            border: 1px solid #ccc;
            border-radius: 5px;
            .ql-editor {
                min-height: 100px;
                max-height: 100px;
            }
        }
    }

    .licenseInfo {
        .ql-toolbar {
            display: none;
        }
        #secondEditor {
            border: 1px solid #ccc;
            border-radius: 5px;
            .ql-editor {
                min-height: 150px;
                max-height: 150px;
            }
        }
    }


    .card {
        ul.list {
          background-color: white;
          .list__tile__title {
            color: dimgray;
          }
          .list__tile--active {
            .list__tile__title {
              color: #3857B9 !important;
            }
          }
        }
    }

</style>

<style lang="scss" scoped>
    h1.h-app {
        color: #8F949D;
        margin: 0;
        font-size: 23px;
        font-weight: 300;
        border-bottom: 1px solid rgb(204,204,204);
    }
    .ql-editor {
        max-height: 200px;
        min-height: 200px;
    }
    .newLicense {
        padding: 0;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        .licenseData {
            padding: 0 24px;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
            .licenseForm {
                display: flex;
                flex-direction: column;
                box-sizing: border-box;
                padding: 0;
                .workInfo {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    width: 100%;
                    .basic {
                        width: 100%;
                        display: flex;
                        box-sizing: border-box;
                        justify-content: space-between;
                        .item {
                            padding-right:24px;
                            display: flex;
                            justify-content: center;
                            width: 100%;
                            .itemField {
                                width:100%;
                            }
                            &:nth-of-type(3){
                                padding-right: 0;
                            }
                        }


                    }
                    .more {
                        width: 100%;
                        .workDescription {
                            height: 100%;
                            .ql-toolbar {
                                display: none;
                            }
                        }
                    }
                }
                .licenseInfo {
                    padding: 0;
                    display: flex;
                    flex-direction: column;
                    box-sizing: border-box;
                    width: 100%;
                }
            }
        }
    }



ql-toolbar {
    display: none !important;
}



    #add-price {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #BFC6D0;    
        text-decoration: none;
    }
    .form-section-title {
        color: rgba(0,0,0,0.54);
        font-size: 16px;
    }

</style>
<script>
    import FilenameBanner from './FilenameBanner'
    import CloseBar from '../Common/CloseBar'
    import PricingOptionEdit from './PricingOptionEdit'

    export default {
        name: 'new-license',
        components: { FilenameBanner, CloseBar, PricingOptionEdit },
        props: ['path'],
        computed: {
            items: function(){
                var licenses = null
//                this.$store.commit('Licenses/CLEAR_LICENSES')
                if ( this.licenseKey === '1') {
//                     console.log('closed license vuex called')
                 licenses = this.$store.getters['Licenses/closedLicenses'];
                } else {
//                    console.log('Open license vuex called')
                 licenses = this.$store.getters['Licenses/openLicenses'];
                }
                var newList = [{text: '+ Create your custom license', value: 0}] 
                var licList = licenses.map(function(x, idx){
                    return {text: x.title, value: idx + 1}
                })
                //var licList = [];
                return newList.concat(licList);
            }, 
        },
        methods: {
            onChange: function(x){
                this.selectedIndex = x;
//                console.log('onChange Called' + x);
//                this.$emit("selectedAccount", x);
                this.showCustomLicense = true;
                if ( this.selectedIndex == 0 ){
                     this.license = {
                         title: '',
                         description: '',
                         prices: [
                            { priceName: '', priceValue: '', priceId: 0 }
                         ]
                    }
                } else {
                    var getter = 'Licenses/openLicenses'
                    if (this.licenseKey==='1'){
                        getter = 'Licenses/closedLicenses'   
                    }
                    var licenses = this.$store.getters[getter];
                    //deep clone data trick
                    this.license = JSON.parse(JSON.stringify(licenses[x-1]));
                    //var copy = Object.assign({}, obj);
                } 
            },
            closeEmited: function(){
                this.$emit("close", true);
            },
            show: function(){
            
            },
            alertMe: (v) =>{
                alert(v);
            },
            generateRDF: function(){
                var xmlescape = require('xml-escape');

                var start = 
                `<rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:block="http://www.blocklicense.io/rdf">
                    <rdf:Description rdf:nodeID="genid1">
                        <rdf:type rdf:resource="http://njh.me/blocklicense"/>
                        <block:address>`+xmlescape(this.contractAddress)+`</block:address>
                        <block:creator>`+xmlescape(this.creatorName)+`</block:creator>
                        <block:email>`+xmlescape(this.email)+`</block:email>
                        <block:work-title>`+xmlescape(this.title)+`</block:work-title>
                        <block:work-description>`+xmlescape(this.description)+`</block:work-description>
                        <block:type>`+xmlescape(this.licenseKey)+`</block:type>
                        <block:license-description>`+xmlescape(this.license.description)+`</block:license-description>`;
                var i =0;
                var middle ='';
                middle+= `<block:prices><rdf:Bag>`
                for (i=0;i<this.license.prices.length;i++){
                    middle+=`<rdf:li>`+xmlescape(this.license.prices[i].priceValue)+`</rdf:li>`
                }
                middle+=`</rdf:Bag></block:prices>`
                middle+= `<block:pricenames><rdf:Bag>`
                for (i=0;i<this.license.prices.length;i++){
                    middle+=`<rdf:li>`+xmlescape(this.license.prices[i].priceName)+`</rdf:li>`
                }
                middle+=`</rdf:Bag></block:pricenames>`
                var end = `   </rdf:Description></rdf:RDF>`;
                var final = start+middle+end;
                this.$emit("rdf", final);
            },
            applyLicense: function(){
                console.log(this.licenseDescription);
// //                console.log('saving--')
//                 if ( this.saveCustomLicense ){
// //                    console.log('saving')
//                     this.licenseKey === '1' ? this.$store.commit('Licenses/ADD_CLOSED_LICENSE', this.license):this.$store.commit('Licenses/ADD_OPEN_LICENSE', this.license);;
//                 }
//                 this.generateRDF();
                this.$emit("close", true);
            },
            cancel: function(){
                
            },
            generateId: function(){
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
                    return v.toString(16);
                });
            },
            addPricingOption: function(){
                let p = { priceName: '', priceValue: '', priceId: this.generateId()}
                this.license.prices.push(p);
            }
        },
        created: function(){
            //this.selectedIndex = this.$store.getters['Wallet/primaryIndex']
            //this.$emit("selectedAccount", this.selectedIndex);
        },
        data: function(){
            return {
                fileName: this.path,
                creatorName: '',
                email: '',
                title: '',
                workDescription: '',
                licenseDescription: '',
                licenseKey: '1',
                //licenseTitle: '',
                selectedIndex: 0,
                showCustomLicense: false,
                saveCustomLicense: false,
                addPriceFormShown: false,
                priceName: '',
                priceValue: '',
                valid: false,
                contractAddress: '',
                rules: {
                    creatorName:                     
                    [ (v) => !!v || 'Name is required',
                      (v) => v.length>6 ? true:'Name must be at least 6 characters long'
                    ],
                    validateEmail:
                    [ (v) => !!v || 'E-mail is required',
                      (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
                    ],
                    validateLicenseTitle: 
                    [ (v)=> v.length > 6?true:"License title is too short"],
                    validateLicenseDescription: 
                    [ (v)=> v.length > 30?true:"Description is too short"],
                    validateLicenseSelect:
                    [ () => this.selectedIndex !== 0 ?'You need to select a license':true ],
                    licenseDescription:
                    [ (v)=> v.length > 20?true:false]
                },
                license: {
                    title: '',
                    description: '',
                    prices: [
                        { priceName: '', priceValue: '', priceId: 0 }
                    ]
                },
                customToolbar: [
                  ['bold', 'italic', 'underline'],
                ],
            }
        }
    }
</script>