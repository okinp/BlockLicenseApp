var ethToolkit = (function(){

	const fs = require('fs');
	const Web3 = require('web3');
    let util = require('ethereumjs-util');
    

    let web3 = null;
    let wallet = null;
	let contractAddress = null;
	let contract = null;
	let abi = null;


	let init = function(_abi, _contractAddress ){
		let provider = new Web3.providers.HttpProvider('http://localhost:7545');
		web3 = new Web3(provider);
		wallet = web3.eth.accounts.wallet.create(0, web3.utils.randomHex(32));
		abi = _abi;
		contractAddress = _contractAddress;
		contract = new web3.eth.Contract(abi, contractAddress);
	}

	let addAccount = function(_accountObject){
		wallet.add(_accountObject);
	}

	/* getBalance: returns Promise */
	let getBalance = function(_address){
		return web3.eth.getBalance(String(_address));
	}

	/* getBalanceFromAccount: returns Promise */
	let getBalanceFromAccount = function(_account){
		let address = _account.accountObject.address;
		return web3.eth.getBalance(String(address));
	}

	let convertToEth = function(_value){
		return parseFloat(web3.utils.fromWei(_value,'ether')).toFixed(4);
	}

	/* sendEther: returns Promise */
	let sendEther = function(_fromAccountIndex, _toPublicKey, _valueInEth ){
			let valueInWei = web3.utils.toWei(String(_valueInEth));
			return	web3.eth.sendTransaction({		from: _fromAccountIndex,
				    								to: _toPublicKey,
				                                    gas: 22000,
				                                    value: valueInWei});
	}

	/* addFile: returns Promise */
	let addFile = function(_hash, _pricesInEth, _address){
        let pricesInWei = _pricesInEth.map(function(x){
        	return web3.utils.toWei(String(x.priceValue));
        });
		let hexHash = web3.utils.asciiToHex(_hash);
		return contract.methods.addFile(hexHash,pricesInWei).send({from: _address, gasPrice: '2000000000', gas: 5000000 });
	}

	/* addFile: returns Promise */
	let isOwner = function(_hash, _address){
		let hexHash = web3.utils.asciiToHex(_hash);
		return contract.methods.isOwner(hexHash).call({from: _address, gasPrice: '2000000000', gas: 5000000 });
	}

	let toWei = function(_value){
		return web3.utils.toWei(String(_value));
	}

	let isValidAddress = function(_address){
		return util.isValidAddress(_address);
	}

	let isValidPrivateKey = function(_key){
		// let pk = Buffer.from(_key,'hex');
		// return util.isValidPrivate(pk);
		return  util.isValidPrivate(Buffer.from(_key,'hex'));
	}

	let createRandomAccount = function(){
		const seed = web3.utils.randomHex(32);
		let acc = web3.eth.accounts.create(seed);
		addAccount(acc);
		return acc;
	}

	let createAccountFromPrivateKey = function(_privateKey){
		let pk = _privateKey.substring(0,2)=='0x'?_privateKey:'0x'+ _privateKey;
		let acc = web3.eth.accounts.privateKeyToAccount(pk);
		addAccount(acc);
		return acc;
	}

	let getWeb3 = function(){
		return web3;
	}

	return {
		init: init,
		addAccount: addAccount,
		getBalance: getBalance,
		getBalanceFromAccount: getBalanceFromAccount,
		convertToEth: convertToEth,
		sendEther: sendEther,
		addFile: addFile,
		isOwner: isOwner,
		toWei: toWei,
		isValidAddress: isValidAddress,
		createRandomAccount: createRandomAccount,
		createAccountFromPrivateKey: createAccountFromPrivateKey,
		web3: web3,
		getWeb3: getWeb3
	}
})();

module.exports = ethToolkit;