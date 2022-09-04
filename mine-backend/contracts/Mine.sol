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
    mapping (address => bool) public reviewedCertifiers;
    mapping (uint256 => uint256) public productsPrice;
    mapping (address => bool) public bannedUsers;
    mapping (FeeType => uint256) public fees;
    mapping (uint256 => address) public tokenIdToUser;

    /*
    fees[Certifier_Registration] = 1;   // Fixed amount Gwei
    fees[User_Registration] = 0;        // Fixed amount Gwei
    fees[Product_Registration] = 1;     // Fixed amount Gwei
    fees[Product_Transfer] = 1;         // Percentage
    */

    constructor() ERC721(CONTRACT_NAME, CONTRACT_SYMBOL) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        contractOwner = payable(msg.sender);
    }

    // Contract functions

    function getContractVersion() public pure returns (string memory) {
        return CONTRACT_VERSION;
    }

    // NFT functions

    function safeMint(address _to, string memory _metadataUrl, uint256 _price) public payable {
        contractOwner.transfer(fees[FeeType.Product_Registration]);
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);
        _setTokenURI(tokenId, _metadataUrl);
        productsPrice[tokenId] = _price;
        tokenIdToUser[tokenId] = msg.sender;
    }

    function updateMetadataURL(uint256 _tokenId, string memory _metadataUrl) public {
        // Update the URI
        _setTokenURI(_tokenId, _metadataUrl);
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

    // Banning

    function banUser(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        bannedUsers[_account] = true;
    }

    function unbanUser(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        if (bannedUsers[_account]) delete bannedUsers[_account];
    }

    // Buyer functions

    function buyProduct(uint256 _tokenId, uint256 _gofPortion) public payable {
        require(_tokenId < _tokenIdCounter.current(), "Invalid tokenId.");
        require(hasRole(USER_ROLE, msg.sender), "You should be an user to buy this product.");
        require(_isApprovedOrOwner(_tokenId) != msg.sender, "You cannot buy your own products.");
        require(productPrice(_tokenId) != msg.value, "Transaction amount should be the same as the product price.");

        // uint256 _gofPortion = msg.value * fees[FeeType.Product_Transfer] / 100;
        contractOwner.transfer(_gofPortion);
        payable(_isApprovedOrOwner(_tokenId)).transfer(msg.value - _gofPortion);
        // Token transference missing maybe we could find something in:
        // https://github.com/ProjectOpenSea/opensea-creatures/blob/master/contracts/ERC721Tradable.sol
    }

    /* function ownerOf(uint256 _tokenId) private pure  returns (address) {
        return tokenIdToUser[_tokenId];
    } */

    function _isApprovedOrOwner(uint256 _tokenId) internal view virtual returns (address) {
        require(tokenIdToUser[_tokenId] == address(0x0), "TokenId doesn't exist.");
        // address owner = ERC721.ownerOf(tokenId);
        // return (spender == owner || getApproved(tokenId) == spender || isApprovedForAll(owner, spender));
        return tokenIdToUser[_tokenId];
    }

    function productPrice(uint256 _tokenId) private view returns (uint256) {
        return productsPrice[_tokenId];
    }

    // Certifier functions

    function certify(uint256 _tokenId, string memory _newMetadata) onlyRole(CERTIFIER_ROLE) public {
        updateMetadataURL(_tokenId, _newMetadata);
    }

    function registerAsCertifier(string memory _certifierDataURL) public payable {
        require(msg.value == fees[FeeType.Certifier_Registration], "Value amount is different than the certifier's registration fee.");
        require(hasRole(DEFAULT_ADMIN_ROLE, msg.sender), "Admin cannot be a certifier.");
        require(hasRole(USER_ROLE, msg.sender), "Users cannot be a certifier.");
        certifiers[msg.sender] = _certifierDataURL;
        reviewedCertifiers[msg.sender] = false;
        contractOwner.transfer(msg.value);
        // New certifier must be reviewed by GOF, then GOF will call addCertifier()
    }

    function acceptCertifier(address _account) onlyRole(DEFAULT_ADMIN_ROLE) public {
        _grantRole(CERTIFIER_ROLE, _account);
        reviewedCertifiers[_account] = true;
    }

    function removeCertifier(address _account) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(bytes(certifiers[_account]).length > 0, "Certifier doesn't exist.");
        _revokeRole(CERTIFIER_ROLE, _account);
        delete reviewedCertifiers[_account];
        delete certifiers[_account];
    }

    // FEE STUFF
    
    function setFee(FeeType feeType, uint256 _feeAmount) onlyRole(DEFAULT_ADMIN_ROLE) public {
        fees[feeType] = _feeAmount;
    }
}
