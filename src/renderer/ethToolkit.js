var ethToolkit = (function(){

	const fs = require('fs');
	const Web3 = require('web3');
	const ethUtil = require('ethereumjs-util');
    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    const util = require('ethereumjs-util');

	let contractAddress = null;
	let contract = null;
	let abi = null;


	let wallet = web3.eth.accounts.wallet.create(0, web3.utils.randomHex(32));

	let init = function(truffleContractJsonFile, contractAddress ){
		this.wallet = this.web3.eth.accounts.wallet.create(0, this.web3.utils.randomHex(32));
		this.abi = require(truffleContractJsonFile).abi;
		console.log(this.abi);
		this.contractAddress = contractAddress;
		this.contract = new this.web3.eth.Contract(this.abi, this.contractAddress);
	}

	let addAccount = function(accountObject){
		this.wallet.add(accountObject);
	}

	/* getBalance: returns Promise */
	let getBalance = function(address){
		return this.web3.eth.getBalance(String(address));
	}

	/* getBalanceFromAccount: returns Promise */
	let getBalanceFromAccount = function(account){
		let address = account.accountObject.address;
		return this.web3.eth.getBalance(String(address));
	}

	let convertToEth = function(value){
		return parseFloat(this.web3.utils.fromWei(value,'ether')).toFixed(4);
	}

	/* sendEther: returns Promise */
	let sendEther = function(fromAccountIndex, toPublicKey, valueInEth ){
			let valueInWei = this.web3.utils.toWei(String(valueInEth));
			return	this.web3.eth.sendTransaction({	from: fromAccountIndex,
				    								to: toPublicKey,
				                                    gas: 22000,
				                                    value: valueInWei});
	}

	/* addFile: returns Promise */
	let addFile = function(hash, pricesInEth){
        const pricesInWei = pricesInEth.map(x => {
			return this.web3.utils.toWei(String(x.priceValue));
		});
		let hexHash = this.web3.utils.asciiToHex(hash);
		return this.contract.methods.addFile(hexHash,pricesInWei).call({from: address, gasPrice: '20000000000000', gas: 5000000 });
	}

	let toWei = function(value){
		return this.web3.utils.toWei(String(value));
	}

	let isValidAddress = function(address){
		return this.util.isValidAddress(address);
	}

	let isValidPrivateKey = function(key){
		let pk = Buffer.from(key,'hex');
		return this.util.isValidPrivate(pk);
	}

	let createRandomAccount = function(){
		const seed = this.web3.utils.randomHex(32);
		let acc = this.web3.eth.accounts.create(seed);
		this.addAccount(acc);
		return acc;
	}

	let createAccountFromPrivateKey = function(privateKey){
		let pk = privateKey.substring(0,2)=='0x'?privateKey:'0x'+ privateKey;
		let acc = this.web3.eth.accounts.privateKeyToAccount(pk);
		this.addAccount(acc);
		return acc;
	}

	return {
		init: init,
		addAccount: addAccount,
		getBalance: getBalance,
		getBalanceFromAccount: getBalanceFromAccount,
		convertToEth: convertToEth,
		sendEther: sendEther,
		addFile: addFile,
		toWei: toWei,
		isValidAddress: isValidAddress,
		createRandomAccount: createRandomAccount,
		createAccountFromPrivateKey: createAccountFromPrivateKey
	}

})();

module.exports = ethToolkit;