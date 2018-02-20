const BlockLicenseCrowdsale = artifacts.require("./BlockLicenseCrowdsale.sol")

module.exports = function(deployer, network, accounts) {
  const startTime = web3.eth.getBlock(web3.eth.blockNumber).timestamp + 1 // one second in the future
  const endTime = startTime + (86400 * 20) // 20 days
  const rate = new web3.BigNumber(2000)
  //const wallet = accounts[0]
  
  const wallet = '0xbb672036bDf36fDF503fA1F19ef438DF4fBE24b0'

  // deployer.deploy(BlockLicenseCrowdsale, startTime, endTime, rate, wallet, {gas: 46123880 })
  // 	.then(() => console.log("Crowdsale Address" + BlockLicenseCrowdsale.address))
  // 	.then(() => )
    deployer.deploy(BlockLicenseCrowdsale, startTime, endTime, rate, wallet, {gas: 46123880 })
    .then(() => BlockLicenseCrowdsale.deployed())
    .then( inst => {
    	console.log("Crowdsale is: " + inst.address);
    	return inst.token();
    })
    .then(tk => console.log("token-address: " + tk))
    .catch((err)=>{
    	console.log(err.message);
    })

  	// .then(() => BlockLicenseCrowdsale.deployed())
  	// .then(inst => {console.log("Crowdsale Address: " + inst.address); crowdsale = inst; })
  	// .then(crowdsale => { console.log("Token Address: " + crowdsale.token())});
  // BlockLicenseCrowdsale.deployed().then(inst => { crowdsale = inst });
  // crowdsale.token().then(addr => { tokenAddress = addr } )
  // console.log("BLT Address: " + tokenAddress);
};