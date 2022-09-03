// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/KeeperCompatible.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MineApp is ERC721, ERC721URIStorage, KeeperCompatibleInterface {
    using Counters for Counters.Counter;

    string CONTRACT_NAME = "MineApp";
    string CONTRACT_SYMBOL = "MINEGOF";
    string CONTRACT_VERSION = "1.0.0";

    Counters.Counter public tokenIdCounter;
 
    uint256 interval;

    constructor(uint _interval) ERC721(CONTRACT_NAME, CONTRACT_SYMBOL) {
    }

function safeMint(address to, string memory metadata_url) public {
    uint256 tokenId = tokenIdCounter.current();
    tokenIdCounter.increment();
    _safeMint(to, tokenId);
    updateMetadataURL(tokenId, metadata_url);
}

    function updateMetadataURL(uint256 _tokenId, string memory metadata_url) public {
        // Update the URI
        _setTokenURI(_tokenId, newUri);
    }

    function getContractVersion() public returns (string) {
        return CONTRACT_VERSION;
    }

    // helper function to compare strings
    function compareStrings(string memory a, string memory b)
        public
        pure
        returns (bool)
    {
        return (keccak256(abi.encodePacked((a))) ==
            keccak256(abi.encodePacked((b))));
    }

    // The following functions is an override required by Solidity.
    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    // The following functions is an override required by Solidity.
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}