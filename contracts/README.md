# HealthCareToken Smart Contract

**HealthCareToken (HCT)** is an ERC-721 (NFT) implementation designed to incentivize donations by awarding NFTs to donors based on the amount they donate. The contract leverages OpenZeppelin libraries for secure and standardized token operations, and integrates IPFS to store and retrieve NFT metadata.

## Features

- **Donation Registration**: Records donations with the donor's name, surname, and amount.
- **NFT Claiming**: Donors can claim NFTs based on donation thresholds (Bronze, Silver, Gold, Platinum).
- **IPFS Integration**: Stores NFT metadata using IPFS and links it to the NFT.
- **Ownership**: Uses OpenZeppelin's `Ownable` contract for owner-restricted actions.
- **Funds Withdrawal**: The contract owner can withdraw Ether collected from donations.
- **Custom Token IDs**: Assigns unique token IDs for each NFT type.

## Inheritance

The **HealthCareToken** contract inherits from the following OpenZeppelin contracts:

- **ERC721**: Provides standard NFT functionality.
- **ERC721URIStorage**: Adds the ability to store metadata (IPFS) for each token.
- **Ownable**: Manages contract ownership for secure access control.

### Constructor

The constructor initializes the following contracts:
```solidity
constructor() ERC721("Health Care Token", "HCT") Ownable(msg.sender) {}
```
- **ERC721("Health Care Token", "HCT")**: Sets the token name and symbol.
- **Ownable(msg.sender)**: Sets the contract deployer as the owner.

## Donation Structure

The contract records donations using the following struct:

```solidity
struct Donation {
    string name;
    string surname;
    uint256 amount;
}
```

Donations are stored in a mapping:
```solidity
mapping(address => Donation) public donations;
```

## NFT Reward Tiers

The contract has four tiers of NFTs based on donation amounts:

| Tier      | Donation Range (ETH)   | Max Supply | Token ID Range   |
|-----------|------------------------|------------|------------------|
| Bronze    | ≤ 0.31                 | 1000       | 1 - 1000         |
| Silver    | > 0.31 and ≤ 1.56      | 500        | 1001 - 1500      |
| Gold      | > 1.56 and ≤ 7.79      | 250        | 1501 - 1750      |
| Platinum  | > 7.79                 | 25         | 1751 - 1775      |

## Key Functions

### `donate(string _name, string _surname) external payable`

Allows users to donate Ether and records their name and surname. Emits a `DonationReceived` event.

### `claimNFT(string _ipfsHash) external`

Allows donors to claim an NFT based on the donation amount. The reward is based on donation thresholds and the availability of NFTs. After claiming, the donation amount is reset to 0 to prevent multiple claims. Emits an `NFTClaimed` event.

### `withdrawFunds() external onlyOwner`

Allows the contract owner to withdraw all Ether collected from donations. Emits an `OwnerWithdrawal` event.

## Function Overrides

Since **ERC721** and **ERC721URIStorage** implement similar functions, they are overridden in the contract:

```solidity
function tokenURI(uint256 tokenId)
    public
    view
    override(ERC721, ERC721URIStorage)
    returns (string memory)
{
    return super.tokenURI(tokenId);
}
```

## Events

- **`DonationReceived(address donor, string name, string surname, uint256 amount)`**: Emitted when a donation is made.
- **`NFTClaimed(address donor, uint256 tokenId, string ipfsHash)`**: Emitted when an NFT is claimed and minted.

## IPFS Integration

The contract uses IPFS to store metadata associated with each NFT. This is done via the `_ipfsHash` parameter when claiming an NFT, which is stored using `_setTokenURI` from the `ERC721URIStorage` contract.

## Security Considerations

- **Owner Restriction**: Only the contract owner can withdraw funds using the `withdrawFunds()` function.
- **Safe Minting**: The contract uses `_safeMint()` to securely mint NFTs.
- **Donation Validation**: Donation amounts are reset after claiming to prevent abuse.

## To-Do List

- Implement an Oracle to convert donation thresholds from ETH to EUR.
- Add functionality to track and communicate how donated funds are used.
- Integrate an external service to convert donations to EUR directly, mitigating ETH volatility.

## How to Deploy and Interact

### Prerequisites

- **Node.js v20.11.1 (LTS)**: Ensure the correct Node version is installed via Node Version Manager (NVM).
- **Hardhat**: Development environment for compiling, testing, and deploying Solidity contracts.
- **OpenZeppelin**: For standardized and secure contract functionality.

### Deployment Steps

1. Install dependencies with `npm install` (ensure OpenZeppelin and Hardhat are installed).
2. Compile the contract: `npx hardhat compile`.
3. Deploy the contract: `npx hardhat run scripts/deploy.js`.
4. Interact with the contract using a frontend or Hardhat console.

## Conclusion

HealthCareToken is a secure and flexible smart contract that incentivizes donations by offering NFTs in return. The contract follows best practices by inheriting from OpenZeppelin contracts and using IPFS for decentralized metadata storage. With future enhancements planned for transparency and currency conversion, HealthCareToken is designed to evolve and scale.