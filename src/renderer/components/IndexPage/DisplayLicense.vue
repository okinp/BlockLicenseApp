<template>
    <div>
        <filename-banner :fileName="fileName"/>
        <close-bar @close="closeEmited"/>
<!--
        licenseObj.workDescription
        licenseObj.licenseDescription
        licenseObj.prices
-->
        <v-container fluid id="info">
            <v-layout row wrap>
                <v-flex xs4>
                    <p>Creator:</p>
                    <p>E-mail:</p>
                    <p>Title:</p>
                    <p>License type:</p>
                </v-flex>
                <v-flex xs8 >
                    <p>{{licenseObj.creator}}</p>
                    <p>{{licenseObj.email}}</p>
                    <p>{{licenseObj.workTitle?licenseObj.workTitle:'Untitled Work'}}</p>
                    <p>{{ licenseObj.licenseType == 1 ? 'ClosedLicense' : 'OpenLicense' }}</p>
                </v-flex>
            </v-layout>
        </v-container>
        <v-container fluid id="licensingOptions">
            <v-layout row wrap>
                <v-flex xs12 id="licenseHeader">
                    <h2>Licensing Options</h2>
                    <p>{{licenseObj.licenseDescription}}</p>
                </v-flex>
                <v-flex xs12 v-for="price in prices" :key="price.idx">
                    <v-layout row wrap>
                        <v-flex xs8 style="position:relative">
                            <div class="bottom">
                                <h2>{{price.name}}</h2>
                                <p><span class="amount">{{price.value}} BLT</span></p>
                            </div>
                        </v-flex>
                        <v-flex xs4>
                            <v-btn class="app-btn buy" v-on:click="alert(price.idx)" flat>BUY LICENSE</v-btn>
                        </v-flex>
                    </v-layout>
                    <hr class="divider">
                </v-flex>
            </v-layout>
        </v-container>
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
            alert: function(i){
//                console.log(i);
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
            }
        }
    }
</script>
<style scoped lang="scss">
    #info {
        padding-top: 0;
        color: #666E7A;
        background: #fff;
        border-bottom: 1px solid rgba(0,0,0,0.08);
        > div > div > p:last-child {
            margin-bottom: 0;
        }
         p {
            margin: 0 0 5px 0;
            margin-bottom: 5px;
        }        
    }

    #licensingOptions{
        padding: 15px 30px;
        background: #F8F9FA;
        color: #666E7A;
        h2 {
            color: #666E7A;
            font-size: 16px;
            font-weight: 500;
            line-height: 22px;
            margin-bottom: 0;        
        }
        p {
            margin-top: 0;
            margin-bottom: 2px;
            line-height: 20px;
        }
        .amount {
           color: #3857B9;
        }
        .about {
           color: #BFC6D0;
        }
        hr.divider {
            margin-top: 13px;
            margin-bottom: 20px;
            border-top: 1px solid #dcdfe4;
        }
        button.app-btn.buy {
            float: right;
        }
        .bottom {
            position: absolute;
            bottom: 0;
        }
    }
    #licenseHeader{
        margin: 15px 0 48px 0;
    }        
</style>