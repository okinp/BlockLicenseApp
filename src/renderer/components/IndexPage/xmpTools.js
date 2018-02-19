const dom = require('xmldom').DOMParser
const serializer = require('xmldom').XMLSerializer
const xmptoolkit = require('xmptoolkit')
let data = null;
var read = function(fileName){
    var result = false;
    xmptoolkit.readXmp(fileName, (error, rawXmp, rdf) => {
        if ( error){
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
    xmptoolkit.writeXmp(fileName, license, function (error, outFilename) {
        if (error) {
            console.log('Error writing XMP');
        }
    });
}

export default { read, addLicense, data };