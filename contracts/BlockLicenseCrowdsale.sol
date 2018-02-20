pragma solidity ^0.4.18;

import './BLToken.sol';
import 'zeppelin-solidity/contracts/crowdsale/Crowdsale.sol';


contract BlockLicenseCrowdsale is Crowdsale {
	function BlockLicenseCrowdsale(uint256 _startTime, uint256 _endTime, uint256 _rate, address _wallet)
		Crowdsale(_startTime, _endTime, _rate, _wallet)
		{

		}
	function createTokenContract() internal returns (MintableToken){
		return new BLToken();
	}
    
    function balanceOf(address owner) public view returns (uint256 balance) {
        return token.balanceOf(owner);
    }
    
    function getBLTokenAddress() public view returns (address){
        return address(token);
    }
    function transfer(address _to, uint256 _value) public returns (bool) {
    	return token.transfer(_to, _value);
  	}
}