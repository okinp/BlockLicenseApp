pragma solidity ^0.4.18;

import 'zeppelin-solidity/contracts/token/ERC20/MintableToken.sol';

contract BLToken is MintableToken {
	string public name = "Test BlockLicense Token";
	string public symbol = "TBLT";
	uint256 public decimals = 18;
}