pragma solidity ^0.4.18;

contract Licenses {

	struct File {
		address owner;
		uint256[] prices;
		mapping( address => uint8[]) buyers;
	}

	mapping( bytes16 => File) public store;

	function addFile( bytes16 hash, uint256[] prices) public returns (bytes16)
	{
		File storage f = store[hash];
		require ( f.owner != address(0) );
		store[hash] = File(msg.sender, prices);
		return hash;
	}

	function buyFile(bytes16 hash, uint8 priceId ) public payable
	{
		File storage f = store[hash];
		require( f.owner != msg.sender );
		require( priceId <= f.prices.length -1 );
		require( f.prices[priceId] == msg.value);
		f.buyers[msg.sender].push(priceId);
	}

	function getBought(bytes16 hash) public view returns (uint8[])
	{
		File storage f = store[hash];
		require( f.owner != msg.sender );
		return f.buyers[msg.sender];
	}

	function isOwner(bytes16 hash) public view returns (bool)
	{
		File storage f = store[hash];
		require ( f.owner != address(0));
		bool returnValue = false;
		if ( f.owner == msg.sender){
			returnValue = true;
		}
		return returnValue;
	}
}