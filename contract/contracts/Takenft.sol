// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Context.sol";
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
        // uint256 identicon = uint256(
        //     keccak256(abi.encodePacked(block.timestamp, secrets[tokenId]))
        // );
        // string memory a = string(identicon);
        return secrets[tokenId];
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
