// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

contract Token {
    string public name;
    string public symbol;

    uint256 public totalSupply = 1000000;

    address public owner;

    mapping(address => uint256) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    // Initialize the contract
    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    // Transfer function
    function transfer(address to, uint256 amount) external {
        require(balances[msg.sender] >= amount, "Not enough tokens!");

        balances[msg.sender] -= amount;
        balances[to] += amount;

        emit Transfer(msg.sender, to, amount);
    }

    // Read only function to check account balances
    function balanceOf(address account) external view returns (uint256) {
        return balances[account];
    }
}
