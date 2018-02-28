var utils = (function(){
	var Web3 = require('web3');
	init();
	let init = function(){

        EthTools.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
        EthTools.web3 = new Web3(EthTools.web3Provider);
	}

})();

export default { utils };