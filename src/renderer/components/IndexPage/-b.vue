<template>
    <div>
        <filename-banner :fileName="fileName"/>
        <close-bar @close="closeEmited"/>
        <v-form v-model="valid" ref="form">
            <v-container fluid>
                <v-layout row wrap>
                    <v-flex xs6 style="padding-right:12px">
                        <v-text-field label="Creator Name" v-model="creatorName" :rules="rules.creatorName" required>
                        </v-text-field>
                    </v-flex>
                    <v-flex xs6 style="padding-left:12px">
                        <v-text-field label="Email" v-model="email" :rules="rules.validateEmail" required></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                        <v-text-field label="Work Title" v-model="title" :rules="rules.validateTitle"></v-text-field>
                    </v-flex>
                    <v-flex xs12 >
                        <v-text-field label="Work Description" v-model="description" :rules="rules.validateDescription" multi-line/>
                    </v-flex>
                    <v-flex xs6>
                        <p class="form-section-title">License Type</p>
                        <v-radio-group v-model="licenseKey" row :mandatory="false">
                            <v-radio label="OpenLicense" value='0' ></v-radio>
                            <v-radio label="ClosedLicense" value='1'></v-radio>
                        </v-radio-group>
                    </v-flex>
                    <v-flex xs12 class="text-center">
                        <v-select
                            v-bind:items="items"
                            v-on:change="onChange"
                            label="License"
                            single-line
                            bottom 
                            :rules="rules.validateLicenseSelect" 
                            required
                        >
                        </v-select>
                    </v-flex>
                        <v-flex xs12 v-if="showCustomLicense">
                            <v-text-field label="License Title" v-model="license.title" :rules="rules.validateLicenseTitle" v-if="saveCustomLicense" required/>
                        </v-flex>
                        <v-flex xs12 v-if="showCustomLicense">
                            <v-text-field label="License Description" v-model="license.description" :rules="rules.validateLicenseDescription" multi-line  required/>
                        </v-flex>
                        <v-flex xs12 v-if="showCustomLicense">
                            <v-checkbox label="Save license for future use" v-model="saveCustomLicense" light></v-checkbox>
                        </v-flex>
                </v-layout>
                <v-layout row wrap v-for="option in license.prices" :key="option.priceId"  v-if="showCustomLicense && licenseKey=='1'">
                    <v-flex xs8>
                        <v-text-field label="Name" v-model="option.priceName" required></v-text-field>
                    </v-flex>
                    <v-flex xs3>
                        <v-text-field label="Value" v-model="option.priceValue" required></v-text-field>
                    </v-flex>
                    <v-flex xs1>
                        <h4>BLT</h4>
                    </v-flex>
                </v-layout>
                <v-layout row wrap v-if="showCustomLicense && licenseKey=='1'">
                    <v-flex xs12 class="text-right">
                        <a href="#" id="add-price" v-on:click="addPricingOption">+ ADD PRICING OPTION</a>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-form>
        <v-btn class="app-btn" v-on:click="applyLicense" v-bind:class="{ 'btn--disabled': !valid}">APPLY</v-btn>
        <a href="#"  :click="cancel">CANCEL</a>
    </div>
</template>
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
//                console.log('saving--')
                if ( this.saveCustomLicense ){
//                    console.log('saving')
                    this.licenseKey === '1' ? this.$store.commit('Licenses/ADD_CLOSED_LICENSE', this.license):this.$store.commit('Licenses/ADD_OPEN_LICENSE', this.license);;
                }
                this.generateRDF();
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
                description: '',
                //licenseDescription: '',
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
                    [ () => this.selectedIndex !== 0 ?'You need to select a license':true ]
                },
                license: {
                    title: '',
                    description: '',
                    prices: [
                        { priceName: '', priceValue: '', priceId: 0 }
                    ]
                }
            }
        }
    }
</script>
<style scoped>
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