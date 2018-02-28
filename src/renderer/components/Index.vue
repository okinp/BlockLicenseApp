<template>
    <div class="main-content">
		<wallet-selector @selectedAccount="setSelectedAccount"/>
        <component :is="getComponent" :path="path" :selectedAccountIndex="selectedAccountIndex"
                    @close="closeNewLicenseEmited" 
                    @rdf="rdfEmitted"
                    @prices="pricesEmitted" 
                    @filePath="fileSelected"></component>
        <save-dialog    :shown="showDialog" 
                        :path="path" 
                        :processingStage="currentStage"
                        :actionA="xmpAction"
                        :actionB="hashAction"
                        :actionC="ethAction" 
                        @cancel="closeDialogEmited"
                        @process="applyLicense">Saving</save-dialog>
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
    import SaveDialog from './IndexPage/SaveDialog'
    import xmpTools from './IndexPage/xmpTools.js'

    const dom = require('xmldom').DOMParser
    const serializer = require('xmldom').XMLSerializer
    const xmptoolkit = require('xmptoolkit')
    const JXON = require('jxon')
	export default {
		name: 'welcome',
		components: { WalletSelector, FileDrop, NewLicense, DisplayLicense, SaveDialog },
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
                                //console.log(rdfElement);
                                //console.log('contains bl data');
                                this.rdf = new serializer().serializeToString(rdfElement);
                                var ob = JXON.stringToJs(this.rdf)['rdf:RDF']['rdf:Description'];
                                var licenseObj = {
                                    creator: ob['block:creator'],
                                    email: ob['block:email'],
                                    workTitle: ob['block:work-title'],
                                    workDescription: ob['block:work-description'],
                                    licenseType: ob['block:type'],
                                    licenseDescription: ob['block:license-description'],
                                    prices: []
                                }
                                console.log(licenseObj)
                                var priceNames = ob['block:pricenames']['rdf:Bag']['rdf:li'];
                                var priceValues = ob['block:prices']['rdf:Bag']['rdf:li'];
                                if ( Array.isArray(priceNames) && Array.isArray(priceValues) )
                                {
                                    if ( priceNames.length === priceValues.length ){
                                        this.actionIndex = 1;
                                        var l = priceNames.length;
                                        for (var i=0; i<l; i++ )
                                        {
                                            licenseObj.prices.push({name: priceNames[i], value: priceValues[i]});
                                        }
                                        this.licenseObj  = licenseObj;
                                        console.log(this.licenseObj)
                                    } 
                                } else {
                                    this.actionIndex = 1;
                                    console.log('Not array');
                                    licenseObj.prices.push({name: priceNames, value: priceValues});
                                    this.licenseObj  = licenseObj;
                                }
                            } else {
                                console.log(rdfElement);
                                this.actionIndex = 2;
                            }
                        }
                        if ( this.actionIndex === 1 ){
                            this.$store.commit('Licenses/SET_CURRENT_LICENSE_OBJ', this.licenseObj);
                        }
                    })
            },
            closeNewLicenseEmited: function(){
                //this.path = null;
                this.actionIndex = 0;
                
            },
            closeDialogEmited: function(){
                this.path = null;
                this.showDialog = false;
            },
            rdfEmitted: function(data){
                console.log('rdf emitted');
                this.actionIndex = 0;
                this.showDialog = true;
                this.rdfData = data;
            },
            pricesEmitted: function(data){
                let prices = data;
                const map1 = prices.map(x => {
                    return this.$EthTools.web3.utils.toWei(String(x.priceValue));
                });
                this.weiPrices = map1;
            },
            resetStates: function(data){
                this.xmpAction ='saving';
                this.hashAction = 'saving';
                this.ethAction = 'saving';
                this.currentAction = 0;
            },
            applyLicense: function(){
                this.currentStage = 0;
                const md5File = require('md5-file/promise')
                let contractJson = require('../../../build/contracts/Licenses.json');
                let contractAddress = this.$EthTools.contractAddress;
                let licenseContract = new this.$EthTools.web3.eth.Contract(contractJson.abi, contractAddress);
                let accounts = this.$store.getters['Wallet/accounts'];
                let address = accounts[this.selectedAccountIndex].accountObject.address;
                this.resetStates();
                this.xmpAction ="saving";
                this.currentStage = 1;
                console.log('apply license called');
                xmpTools.writeAsync(this.path, this.rdfData)
                .then((path)=>{
                    this.currentStage = 2;
                    this.actionIndex = 0;
                    this.showLoader = false;
                    this.xmpAction = 'done';
                    return md5File(path);
                })
                .then(hash=>{
                    this.currentStage = 3;
                    this.hash = hash;
                    this.hashAction =  'done';
                    let hexHash = this.$EthTools.web3.utils.asciiToHex(this.hash);
                    console.log('hash:' + hexHash);
                    let res = false;
                    //alert(address);
                    //res = licenseContract.methods.test().call({from: address, gasPrice: '20000000000000', gas: 5000000 });
                    res = licenseContract.methods.addFile(hexHash,this.weiPrices).call({from: address, gasPrice: '20000000000000', gas: 5000000 });
                    //alert(res);
                    return res;

                    // return licenseContract.methods.addFile(hexHash,this.weiPrices).call({from: accounts[this.selectedAccountIndex].private, gasPrice: '20000000000000', gas: 5000000 });
                })
                .then((result)=>{
                    console.log('eth result:' + result);
                    this.ethAction =  'done';
                })
                .catch( e=>{
                  console.log('error occured');
                  console.log(e);  
                })
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
                rdfData: null,
                actionIndex: 0,
                actions: ['file-drop', 'display-license', 'new-license'],
                licenseObj: null,
                showLoader: true,
                showDialog: false,
                currentStage: 0,
                xmpAction: 'saving',
                hashAction: 'saving',
                ethAction: 'saving',
                hash:'',
                weiPrices: null
            }
        }
	}
</script>