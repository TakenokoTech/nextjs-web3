// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Takenft is Context, ERC721Enumerable, Ownable {
    mapping(uint256 => string) secrets;

    constructor() ERC721("TakeNft", "TNF") {}

    function tokenURI(uint256 tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(bytes(secrets[tokenId]).length > 0);
        bytes32 hash1 = keccak256(abi.encodePacked(secrets[tokenId], "1"));
        // bytes32 hash2 = keccak256(abi.encodePacked(secrets[tokenId], "2"));
        // bytes32 hash3 = keccak256(abi.encodePacked(secrets[tokenId], "3"));
        // bytes32 hash4 = keccak256(abi.encodePacked(secrets[tokenId], "4"));
        string memory identicon1 = Strings.toString(uint256(hash1));
        // string memory identicon2 = Strings.toString(uint256(hash2));
        // string memory identicon3 = Strings.toString(uint256(hash3));
        // string memory identicon4 = Strings.toString(uint256(hash4));
        return
            string(
                abi.encodePacked(
                    identicon1
                    // identicon2,
                    // identicon3,
                    // identicon4
                )
            );
    }

    function mint(address to, string memory secret) public onlyOwner {
        uint256 tokenId = totalSupply();
        secrets[tokenId] = secret;
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        delete secrets[tokenId];
        _burn(tokenId);
    }
}
