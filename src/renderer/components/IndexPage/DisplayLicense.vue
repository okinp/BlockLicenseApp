<template>
    <div>
        <filename-banner :fileName="fileName"/>
        <close-bar @close="closeEmited"/>
        <div id="info">
            <div class="labels">
                <p>Creator:</p>
                <p>E-mail:</p>
                <p>Title:</p>
                <p>License type:</p>
            </div>
            <div class="data">
                <p>{{licenseObj.creator}}</p>
                <p>{{licenseObj.email}}</p>
                <p>{{licenseObj.workTitle?licenseObj.workTitle:'Untitled Work'}}</p>
                <p>{{ licenseObj.licenseType == 1 ? 'ClosedLicense' : 'OpenLicense' }}</p>
            </div>
        </div>
        <div class="description" v-if="licenseObj.description">
            <div class="descriptionHeader">
                <h2>Work Description</h2>
                <p>{{licenseObj.description}}</p>
            </div>
        </div>
        <div class="description">
            <div class="descriptionHeader">
                <h2>Licensing Options</h2>
                <p>{{licenseObj.licenseDescription}}</p>
            </div>
        </div>
        <div class="prices" v-for="price in prices" :key="price.idx">
            <div class="price">
                <div class="priceWithLabel">
                    <h3>{{price.name}}</h3>
                    <p><span class="amount">{{price.value}}ETH</span><span class="amountDollars"> - ABOUT ${{price.value*ethInDollars}}</span></p>
                </div>
                <div class="buy">
                    <v-btn class="app-btn buy" v-on:click="print(price.idx)" flat>BUY LICENSE</v-btn>
                </div>
            </div>
        </div>
    </div>
</template>
<!--
    creator: ob['block:creator'],
    email: ob['block:email'],
    workTitle: ob['block:work-title'],
    workDescription: ob['block:work-description'],
    licenseType: ob['block:type'],
    licenseDescription: ob['block:license-descrption'],
    prices: [{name, value}]
-->
<script>
    import FilenameBanner from './FilenameBanner'
    import CloseBar from '../Common/CloseBar'
    export default {
        name: 'display-license',
        components: { FilenameBanner, CloseBar },
        props: ['path'],
        computed: {

        },
        methods: {
            closeEmited: function(){
                this.$emit("close", true);
            },
            prices: function(){
              return this.licenseObj.prices.map((v,idx)=>{
                  v.idx = idx;
                  return v;
              })
            },
            print: function(i){
                console.log(i);
            }
        },
        created: function(){
            this.prices = this.licenseObj.prices.map((v,idx)=>{
              v.idx = idx;
              return v;
            })
        },
        data: function(){
            return {
                fileName: this.path,
                licenseObj: this.$store.getters['Licenses/current'],
                ethInDollars: this.$EthTools.price_usd,
            }
        }
    }
</script>
<style scoped lang="scss">

    .closeBar{
        background-color: white;
    }

    #info {
        display: flex;
        color: #666E7A;
        background: #fff;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        width: 100%;
        box-sizing: border-box;
        padding: 0 24px;
        padding-bottom: 31px;
        .labels, .data {
            dislay: flex;
            flex-direction: column;
        }
        .labels {
            width: 20%;
        }
        .data {
            width: 80%;
        }
        p {
            margin-bottom: 5px;
        }
    }

    .description {
        margin: 15px 0 48px 0;
        padding: 15px 24px;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        color: #666E7A;
        .descriptionHeader {
            h2 {
                font-size: 16px;
                font-weight: 500;
                line-height: 22px;
                margin-bottom: 0
            }
            p {
                margin-top: 0;
                margin-bottom: 2px;
                line-height: 20px;
            }
        }
    }

    .prices {
        padding: 15px 24px;
        display: flex;
        height: 89px;
        box-sizing: border-box;
        .price {
            width: 100%;
            display: flex;
            border-bottom: 1px solid rgba(0,0,0,0.08);
            .priceWithLabel {
                width: 60%;
                height: 100%;
                h3 {
                    color: #666E7A;
                    font-size: 16px;
                    font-weight: 500;
                    line-height: 22px;
                    margin-bottom: 0; 
                }
                .amount {
                   color: #3857B9;
                }
                .amountDollars {
                    color: #bfc6d0;
                    padding-left: 0px;
                }
            }
            .buy {
                width: 40%;
                display: flex;
                justify-content: flex-end;
                button {
                    box-sizing: border-box;
                    line-height: 58px;
                    height: 43px;
                    width: 120px;
                    border-radius: 5px;
                }
            }
        }
    }
</style>