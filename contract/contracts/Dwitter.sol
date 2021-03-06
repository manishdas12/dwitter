//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Dwitter {
    struct User {
        address wallet;
        string name;
        string username;
        string bio;
        string avatar;
    }
    struct Dweet {
        address wallet;
        string dweetContent;
    }
    mapping(address => string) public usernames;
    mapping(string => User) public users;

    function signup(string memory _username, string memory _name, string memory _bio, string memory _avatar) public {
        require(bytes(usernames[msg.sender]).length == 0, "user already exists");
        require(users[_username].wallet == address(0), "user name is taken, please try another one");


        users[_username] = User({
            wallet: msg.sender,
            name: _name,
            bio: _bio,
            username: _username,
            avatar: _avatar
        });
        usernames[msg.sender] = _username;
    }
    function dweet(string memory _dweetContent) public {
        require(condition);
    }
    function getUser(address _wallet) public view returns (User memory) {
        return users[usernames[_wallet]];
    }
}