pragma solidity ^0.4.18;

contract Licenses {

	struct File {
		address owner;
		uint256[] prices;
		mapping( address => uint8[]) buyerss;
	}

	mapping( bytes16 => File) public store;

	function addFile( bytes16 hash, uint256[] prices) public returns (bytes16)
	{
		File memory f = store[hash];
		require ( f.owner == address(0) );
		store[hash] = File(msg.sender, prices);
		return hash;
	}

	function buyFile(bytes16 hash, uint8 priceId ) public payable
	{
		File memory f = store[hash];
		require( f.owner != msg.sender );
		require( priceId <= f.prices.length -1 );
		require( f.prices[priceId] == msg.value);
		store[hash].buyers[msg.sender].push(priceId);
		//f.buyers[msg.sender].push(priceId);
	}

	function getBought(bytes16 hash) public view returns (uint8[])
	{
		File storage f = store[hash];
		uint8[] storage paidOptions = f.buyers[msg.sender];
		//require( f.owner != msg.sender );
		return paidOptions;
	}

	function isOwner(bytes16 hash) public view returns (bool)
	{
		File memory f = store[hash]; 
		//require ( f.owner != address(0));
		if ( f.owner == msg.sender){
			return true;
		}
		return false;
	}

	function getPrices(bytes16 hash) public view returns (uint256 [] )
	{
		File memory f = store[hash];
		// uint256[] memory prices = new uint256[](1);
		return f.prices;
	}

	function test() public pure returns (bool)
	{
		return true;
	}
}