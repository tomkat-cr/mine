// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Mine is ERC721, ERC721URIStorage, AccessControl {
    
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    address payable contractOwner;

    string public constant CONTRACT_NAME = "Mine";
    string public constant CONTRACT_SYMBOL = "MINE";
    string public constant CONTRACT_VERSION = "0.0.1";

    bytes32 public constant CERTIFIER_ROLE = keccak256("CERTIFIER_ROLE");
    bytes32 public constant USER_ROLE = keccak256("USER_ROLE");

    enum FeeType {
        Certifier_Registration,     // 0
        User_Registration,          // 1 (Javier: Aun no se por que el user se registraria)
        Product_Registration,       // 2
        Product_Transfer            // 3
    }

    mapping (address => string) public certifiers;
    mapping (uint256 => uint256) public productsPrice;
    mapping (address => bool) public bannedUsers;
    mapping (FeeType => uint256) public fees;

    constructor() ERC721(CONTRACT_NAME, CONTRACT_SYMBOL) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        contractOwner = payable(msg.sender);
    }

    function safeMint(address to, string memory metadata_url, uint256 price) public payable {
        contractOwner.transfer(fees[FeeType.Product_Registration]);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, metadata_url);
        productsPrice[tokenId] = price;
    
    }

    function updateMetadataURL(uint256 _tokenId, string memory metadata_url) public {
        // Update the URI
        _setTokenURI(_tokenId, metadata_url);
    }

    function getContractVersion() public pure returns (string memory) {
        return CONTRACT_VERSION;
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function banUser(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        bannedUsers[_account] = true;
    }

    function unbanUser(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (bannedUsers[_account]) delete bannedUsers[_account];
    }

    // BUYER STUFF

    function buyProduct(uint256 _tokenId) public payable {
        require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "No puedes comprar siendo Admin");
        require(!hasRole(CERTIFIER_ROLE, msg.sender), "No puedes comprar siendo Certifier");

        uint256 gofPortion = msg.value * fees[FeeType.Product_Transfer] / 100;
        contractOwner.transfer(gofPortion);
        payable(ownerOf(_tokenId)).transfer(msg.value - gofPortion);
        // Token transference missing maybe we could find something in:
        // https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/ERC721Tradable.sol
    }

    // CERTIFIER STUFF

    function certify(uint256 _tokenId, string memory newMetadata) onlyRole(CERTIFIER_ROLE) public {
        updateMetadataURL(_tokenId, newMetadata);
    }

    function registerAsCertifier(string memory certifierDataURL) public payable {
        require(msg.value == fees[FeeType.Certifier_Registration], "Hermano paga lo que es");
        require(!hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin cannot be certifier");
        certifiers[msg.sender] = certifierDataURL;
        contractOwner.transfer(msg.value);
    }

    function addCertifier(address _account) onlyRole(DEFAULT_ADMIN_ROLE) public {
        _grantRole(CERTIFIER_ROLE, _account);
    }

    function removeCertifier(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(CERTIFIER_ROLE, _account);
    }

    // FEE STUFF
    
    function setFee(FeeType feeType, uint256 _feeAmount) onlyRole(DEFAULT_ADMIN_ROLE) public {
        fees[feeType] = _feeAmount;
    }
}
