<template>
    <div class="main-content">
		<wallet-selector @selectedAccount="setSelectedAccount"/>
        <component :is="getComponent" :path="path" @close="closeEmited" @rdf="rdfEmitted" @filePath="fileSelected"></component>
    </div>
</template>
<style scoped>
    .main-content { 
        width: 100%;
/*        height: 100%;*/
        flex-grow: 1;
        display: flex;
        flex-direction: column;
     }
</style>
<script>
	import WalletSelector from './IndexPage/WalletSelector'
	import FileDrop from './IndexPage/FileDrop'
    import NewLicense from './IndexPage/NewLicense'
    import DisplayLicense from './IndexPage/DisplayLicense'
    import SavingLicense from './IndexPage/SavingLicense'
    import xmpTools from './IndexPage/xmpTools.js'
    const dom = require('xmldom').DOMParser
    const serializer = require('xmldom').XMLSerializer
    const xmptoolkit = require('xmptoolkit')
    const JXON = require('jxon')
	export default {
		name: 'welcome',
		components: { WalletSelector, FileDrop, NewLicense, DisplayLicense, SavingLicense },
        methods: {
            setSelectedAccount: function(x){
                this.selectedAccountIndex = x; 
            },
            fileSelected: function(path){
                    //this.closeEmited();
                    this.path = path;
                    xmptoolkit.readXmp(path, (error, rawXmp, rdf) => {
                        if ( error){
                            console.log('Cannot read file')
                        } else {
                            const doc = new dom().parseFromString(rdf);
                            const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
                            const blocklicenseXM = doc.getElementsByTagName('block:creator')[0];
                            if (blocklicenseXM!=undefined ) {
                                this.rdf = new serializer().serializeToString(rdfElement);
                                var ob = JXON.stringToJs(this.rdf)['rdf:RDF']['rdf:Description'];
//                                console.log(ob)
                                var licenseObj = {
                                    creator: ob['block:creator'],
                                    email: ob['block:email'],
                                    workTitle: ob['block:work-title'],
                                    workDescription: ob['block:work-description'],
                                    licenseType: ob['block:type'],
                                    licenseDescription: ob['block:license-description'],
                                    prices: []
                                }
                                var priceNames = ob['block:pricenames']['rdf:Bag']['rdf:li'];
                                var priceValues = ob['block:prices']['rdf:Bag']['rdf:li'];
                                if ( priceNames.length === priceValues.length ){
                                    this.actionIndex = 1;
                                    var l = priceNames.length;
                                    for (var i=0; i<l; i++ )
                                    {
                                        licenseObj.prices.push({name: priceNames[i], value: priceValues[i]});
                                    }
                                    this.licenseObj  = licenseObj;
//                                    console.log(this.licenseObj)
                                }
                            }
                        }
                        if ( this.actionIndex === 1 ){
                            this.$store.commit('Licenses/SET_CURRENT_LICENSE_OBJ', this.licenseObj);
                        }
                    })
            },
            closeEmited: function(){
                this.path = null;
                this.actionIndex = 0;
            },
            rdfEmitted: function(data){
                this.actionIndex = 3;
                xmptoolkit.writeXmp(this.path, data, function (error, outFilename) {
                    if (error) {
                        alert('Error writing XMP');
                    } else {
                        this.actionIndex = 0;
                    }
                });
            }
        },
        computed: {
            getComponent: function(){
                return this.actions[this.actionIndex]; 
            }
        },
        data: function(){
            return {
                selectedAccountIndex: 0,
                path: null,
                rdf: null,
                actionIndex: 0,
                actions: ['file-drop', 'display-license', 'new-license', 'saving-license'],
                licenseObj: null
            }
        }
	}
</script>