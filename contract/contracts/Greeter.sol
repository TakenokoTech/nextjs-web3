// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/utils/Strings.sol";

contract Greeter {
    using Strings for uint256;

    event Tweet(address indexed _from, string _msg);

    function hello() public view returns (string memory) {
        string memory sender = Strings.toHexString(
            uint256(uint160(msg.sender)),
            20
        );
        return string(abi.encodePacked("Hi! ", sender));
    }

    function tweet(string memory _tweet) public {
        emit Tweet(msg.sender, _tweet);
    }
}
