<template>
    <div class="newLicense">
        <filename-banner :fileName="fileName"/>
        <close-bar @close="closeEmited"/>
        <v-form v-model="valid" ref="newLicenseForm" class="licenseForm">
            <div class="workInfo">
                <div class="basic">
                    <div class="item">
                        <v-text-field class="itemField" label="Work Title" v-model="title" :rules="rules.workTitle" required/>
                    </div>
                    <div class="item">
                        <v-text-field class="itemField" label="Creator Name" v-model="creatorName" :rules="rules.creatorName" required />
                    </div>
                    <div class="item">
                        <v-text-field class="itemField" label="Email" v-model="email" :rules="rules.validateEmail" required />
                    </div>
                </div>
                <div class="details">
                    <v-text-field label="Work Description" v-model="workDescription" :rules="rules.validateDescription" :no-resize="true" :rows="3" multi-line/>
                </div>
            </div>
            <div class="licenseInfo">
                <div class="settings">
                    <div class="selectLicense">
                        <v-select v-bind:items="licenseItems" v-on:change="onChange" label="License" single-line bottom :rules="rules.validateLicenseSelect"  required />
                    </div>
                    <div class="licenseName" v-if="saveCustomLicense">
                        <v-text-field label="License Title" v-model="license.title" :rules="rules.validateLicenseTitle"  required />
                    </div>
                    <div class="saveLicense">
                        <v-checkbox label="Save license" v-model="saveCustomLicense" light></v-checkbox>
                    </div>
                </div>
                <div class="description">
                    <v-text-field label="License Description" v-model="license.description" :rules="rules.validateLicenseDescription" :rows="4" :no-resize="true" multi-line  required/>
                </div>  
                <div class="prices">
                    <div class="price" v-for="(option,idx) in license.prices" :option="option" :key="option.priceId"  v-if="showCustomLicense && licenseKey=='1'">
                        <pricing-option :description="option.priceName" :value="option.priceValue" :index="idx" @deletePrice="removePricingOption" @changedPrice= "editPricingOption"></pricing-option>
                    </div>
                </div>
                <div class="addPrice">
                    <a href="#" id="add-price" v-on:click="addPricingOption">+ ADD PRICING OPTION</a>
                </div>
            </div>    
        </v-form>
        <div class="buttons">
            <div class="item">
                <v-btn flat class="app-btn" v-on:click="applyLicense" v-bind:class="{ 'btn--disabled': !valid}">Confirm</v-btn>
            </div>
            <div class="item">
                <v-btn flat class="cancel-btn" v-on:click="closeEmited">Cancel</v-btn>
            </div>
        </div>
    </div>
</template>
<script>
    import FilenameBanner from './FilenameBanner'
    import CloseBar from '../Common/CloseBar'
    import PricingOption from './PricingOption'

    export default {
        name: 'new-license',
        components: { FilenameBanner, CloseBar, PricingOption },
        props: ['path'],
        computed: {
            licenseItems: function(){
                var licenses = null
                if ( this.licenseKey === '1') {
                 licenses = this.$store.getters['Licenses/closedLicenses'];
                } else {
                 licenses = this.$store.getters['Licenses/openLicenses'];
                }
                var newList = [{text: '+Create License', value: 0}] 
                var json = require('./defaultLicenses.json');
                let jsonList = json.map(function(x,idx){
                    return {text: x.title, value: idx + 1 }
                })
                let len = jsonList.length;
                
                var licList = licenses.map(function(x, idx){
                    return {text: x.title, value: idx + 1 + len}
                })
                let L1 = newList.concat(jsonList);
                return L1.concat(licList);
            }, 
        },
        methods: {
            onChange: function(x){
                this.selectedIndex = x;
                this.$refs.newLicenseForm.validate();
                this.showCustomLicense = true;
                delete require.cache[require.resolve('./defaultLicenses.json')]
                const json = require('./defaultLicenses.json');

                if ( this.selectedIndex == 0 ){
                     this.license = {
                         title: '',
                         description: '',
                         prices: [
                            { priceName: '', priceValue: '', priceId: this.generateId() }
                         ]
                    }
                } else if ( this.selectedIndex > 0 && this.selectedIndex <= json.length )
                {
                    this.license = json[this.selectedIndex - 1];
                }
                else {
                    let getter = 'Licenses/openLicenses'
                    if (this.licenseKey==='1'){
                        getter = 'Licenses/closedLicenses'   
                    }
                    let licenses = this.$store.getters[getter];
                    this.license = JSON.parse(JSON.stringify(licenses[x-1]));
                } 
            },
            closeEmited: function(){
                //console.log(this.license);
                this.$emit("close", true);
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
                if ( this.saveCustomLicense ){
                    //console.log('saving license')
                    console.log(this.license);
                    this.licenseKey === '1' ? this.$store.commit('Licenses/ADD_CLOSED_LICENSE', this.license):this.$store.commit('Licenses/ADD_OPEN_LICENSE', this.license);
                }
                this.generateRDF();
                this.$emit("close", true);
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
            },
            removePricingOption: function(idx){
                if (this.license.prices.length > 1){
                    this.license.prices.splice(idx, 1);
                }
            },
            editPricingOption: function(price){
                let idx = price.index;
                this.license.prices[idx].priceName = price.name;
                this.license.prices[idx].priceValue = price.value;
            }
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
                selectedIndex: null,
                showCustomLicense: false,
                saveCustomLicense: false,
                addPriceFormShown: false,
                priceName: '',
                priceValue: '',
                valid: false,
                contractAddress: '',
                rules: {
                    workTitle:                     
                    [ (v) => !!v || 'Title is required',
                      (v) => v.length>6 ? true:'Title must be at least 6 characters long'
                    ],
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
                    [ (v) => {
                        // console.log('It is: ' + this.selectedIndex);
                        // console.log(v);
                        return this.selectedIndex !== null ? true: 'You need to select a license' 
                    }],
                    licenseDescription:
                    [ (v)=> v.length > 20?true:false],
                    priceDescription: [ (v)=> v.length > 8? true:"Price description must be at least 8 characters long"],
                    priceValue: [ (v)=> v > 0 ?true:"Value > 0"]
                },
                license: {
                    title: '',
                    description: '',
                    prices: [
                        { priceName: '', priceValue: '', priceId: 0 }
                    ]
                },
            }
        }
    }
</script>
<style lang="scss" scoped>
    * {
        margin: 0;
        box-sizing: border-box;     
    }
    .newLicense {
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        background-color: #f8f9fa;
        .licenseForm {
            display:flex;
            width: 100%;
            flex-direction: column;
            padding: 0 24px;
            .workInfo {
                width: 100%;
                display: flex;
                flex-direction: column;
                .basic {
                    display: flex;
                    width: 100%;
                    justify-content: space-between;
                    .item {
                        width: 32%;
                    }
                }
                .details {
                    display: flex;
                    width: 100%;
                }
            }
            .licenseInfo {
                width: 100%;
                display: flex;
                flex-direction: column;
                .settings {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    .selectLicense {
                        width: 32%;
                        display: flex;
                    }
                    .licenseName {
                        width: 32%;
                        display: flex;
                    }
                    .saveLicense {
                        width: 32%;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                    }
                }
                .description {
                    width: 100%;
                    display: flex;
                }
                .prices {
                    margin-top: 30px;
                    min-height: 218px;
                    max-height: 218px;
                    overflow-y: auto;
                    padding: 0 10px 0 0;
                }
                .addPrice {
                    width: 100%;
                    height: 60px;
                    font-size: 14px;
                    font-weight: 500;
                    text-align: left;
                    display: flex;
                    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
                    padding-right: 24px;
                    justify-content: flex-end;
                    a {
                        text-decoration: none;
                        cursor: pointer;
                        float: right;
                        display:block;
                        height: 100%;
                        line-height: 60px;
                        color: #b8bbc0;
                    }
                }
            }
        }
        .buttons {
            display: flex;
            width: 100%;
            flex-direction: column;
            flex-grow: 1;
            justify-content: flex-end;
            .item {
                display: flex;
                width: 100%;
                justify-content: center;
                margin: 5px 0;
                .app-btn {
                    width: 120px;
                }
            }
        }
    }
</style>