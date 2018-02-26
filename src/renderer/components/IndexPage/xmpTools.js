const dom = require('xmldom').DOMParser
const serializer = require('xmldom').XMLSerializer
const xmptoolkit = require('xmptoolkit')
let data = null;
var read = function(fileName){
    var result = false;
    xmptoolkit.readXmp(fileName, (error, rawXmp, rdf) => {
        if ( error ){
            console.log('Cannot read file')
        } else {
            const doc = new dom().parseFromString(rdf);
            const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
            const blocklicenseXM = doc.getElementsByTagName('block:creator')[0];
            if (blocklicenseXM!=undefined ) {
//                console.log('shouldDisplay')
                this.data = new serializer().serializeToString(rdfElement);
                result = true;
            }
        }
    })
//    console.log('This should be: ' + result)
    return result;
}
    
var addLicense = function(fileName,license){
    xmptoolkit.writeXmp(fileName, license,  (error, outFilename) => {
        if (error) {
            console.log('Error writing XMP');
        }
    });
}

var saveLicenseAsync = function(fileName, license ){
    return new Promise(function(resolve, reject){
        xmptoolkit.writeXmp(fileName, license,  (error, outFilename) => {
            if (error !== null )  reject(error);
            resolve(outFilename);
        });
    })
}

const writeAsync = (fileName, license ) => new Promise((resolve, reject)=>{
    let write = xmptoolkit.writeXmp(fileName, license, (error, outFilename)=>{
            if (error !== null )  reject(error);
            resolve(outFilename);
    });
});

var readLicenseAsync = function(filename){
    return new Promise(function(resolve,reject){
        xmptoolkit.readXmp(fileName, (error, rawXmp, rdf) => {
            if (error !== null )  reject(Error(error));
            console.log(rawXmp);
            resolve({xmp: rawXmp, rdf: rdf });
        })
    })
}

var processRdf = function(rdf){
    return new Promise(function(resolve, reject){
        const doc = new dom().parseFromString(rdf);
        const rdfElement = doc.getElementsByTagName('rdf:RDF')[0];
        const blocklicenseXM = doc.getElementsByTagName('block:creator')[0];
        if (blocklicenseXM!=undefined ) {
            console.log('shouldDisplay')
            this.data = new serializer().serializeToString(rdfElement);
            result = true;
        }
    })
}

export default { read, readLicenseAsync, saveLicenseAsync, writeAsync, addLicense, data };