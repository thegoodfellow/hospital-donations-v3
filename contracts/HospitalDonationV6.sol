// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

//Downgraded to node v20.11.1 to get the Long-TermSupported version for HardHat (used Node Version Manager)

//removed Counters library since it is no longer supported by openZeppelin in latest version 5.0 
//

//added a URI to the contract that is stored using IPFS
//the contract now inherits from ERC721URIStorage
//to the event NFTClaimed has been added the argument _ipfsHash
//claimNFT func:
//takes in the argument _ipfsHash
//_mintNFT func:
//takes the argument _ipfsHash in, call _safeMint instead of _mint

//records name and surname of the donors as well
//added a struct to record the Donation with attributes: name, surname, amount
//in donations mapping replaced the amount with the donation struct
//donate func & claimNFT func modified accordingly with the Donation struct

//differenciate the NFT given as reward based on the aomunt donated
//set different max supplies for bronze, silver, gold and platinum to give different rarities
//defined the number of NFTs supplied for each type to check if there are still available to mint
//defined 3 constant (amount threeshold) to check which type of NFT has to be claimed
//defined and ID for each type so the user knows which type of NFT has received
//claimNFT func:
//if (donations[msg.sender] > BRONZE_THRESHOLD && donations[msg.sender] <= SILVER_THRESHOLD && silverSupply < SILVER_MAX_SUPPLY)
//_mintNFT func:
//overwritten _mint func to have different IDs based on the type --> _mint(recipient, startId + supply), calls _setTokenURI to map the tokenId with ipfsHash
//tokenURI and supportsInterface are overridden, they have the same signature in ERC721 and ERC721URIStorage, not allowed within solidity


//used Ownable from OpenZeppelin
//explicity called Ownable contructor

//donate func:
//donor sends ETH to contract
//donation is registered into donations mapping
//claimNFT func:
//check if the caller donation is greater than 0
//NFT is minted to donor address
//set donation amount to 0 (into mapping)
//withdrawFunds func:
//transfer ETH of the contract to the owner address

//to-do eventually add oracle so can have the thresholds in euros...think about that..might be tricky..lot of implications/complications
//to-do eventually add function to update/write the contract on how the money are spent (communication of impact) 
//to-do eventually external service to convert the donations straight away in euro to mitigate/avoid volatility..

//to-do NFT claiming pattern?? 
//each time a donation goes through the amount is summed with the ones of previos donations if no NFT had been claimed for those
//we give a NFT per donation
//another way...

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract HealthCareToken is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    struct Donation {
        string name;
        string surname;
        uint256 amount;
    }

    mapping(address => Donation) public donations;

    uint256 public constant BRONZE_MAX_SUPPLY = 1000;
    uint256 public constant SILVER_MAX_SUPPLY = 500;
    uint256 public constant GOLD_MAX_SUPPLY = 250;
    uint256 public constant PLATINUM_MAX_SUPPLY = 25;

    uint256 public bronzeSupply;
    uint256 public silverSupply;
    uint256 public goldSupply;
    uint256 public platinumSupply;

    uint256 public constant BRONZE_THRESHOLD = 0.31 ether;
    uint256 public constant SILVER_THRESHOLD = 1.56 ether;
    uint256 public constant GOLD_THRESHOLD = 7.79 ether;

    uint256 public constant BRONZE_START_ID = 1;
    uint256 public constant SILVER_START_ID = 1001;
    uint256 public constant GOLD_START_ID = 1501;
    uint256 public constant PLATINUM_START_ID = 1751;

    event DonationReceived(address donor, string name, string surname, uint256 amount);
    event NFTClaimed(address donor, uint256 tokenId, string ipfsHash);

    constructor() ERC721("Health Care Token", "HCT") Ownable(msg.sender) {}

    function donate(string memory _name, string memory _surname) external payable {
        require(msg.value > 0, "Donation amount must be greater than 0");

        address sender = _msgSender();
        if (donations[sender].amount > 0) {
            donations[sender].amount += msg.value;
        } else {
            donations[sender] = Donation(_name, _surname, msg.value);
        }
        emit DonationReceived(sender, _name, _surname, msg.value);
    }

    function claimNFT(string memory _ipfsHash) external {
        address sender = _msgSender();
        require(donations[sender].amount > 0, "Sender has not donated");

        uint256 tokenId = _tokenIdCounter;
        _tokenIdCounter++;

        if (donations[sender].amount <= BRONZE_THRESHOLD && bronzeSupply < BRONZE_MAX_SUPPLY) {
            _mintNFT(sender, tokenId, BRONZE_START_ID, bronzeSupply, _ipfsHash);
            bronzeSupply++;
        } else if (donations[sender].amount > BRONZE_THRESHOLD && donations[sender].amount <= SILVER_THRESHOLD && silverSupply < SILVER_MAX_SUPPLY) {
            _mintNFT(sender, tokenId, SILVER_START_ID, silverSupply, _ipfsHash);
            silverSupply++;
        } else if (donations[sender].amount > SILVER_THRESHOLD && donations[sender].amount <= GOLD_THRESHOLD && goldSupply < GOLD_MAX_SUPPLY) {
            _mintNFT(sender, tokenId, GOLD_START_ID, goldSupply, _ipfsHash);
            goldSupply++;
        } else if (donations[sender].amount > GOLD_THRESHOLD && platinumSupply < PLATINUM_MAX_SUPPLY) {
            _mintNFT(sender, tokenId, PLATINUM_START_ID, platinumSupply, _ipfsHash);
            platinumSupply++;
        } else {
            revert("Donation amount does not meet the requirements for any NFT type or max supply reached");
        }

        emit NFTClaimed(sender, tokenId, _ipfsHash);

        // Reset donation amount to prevent donor from claiming multiple times
        donations[sender].amount = 0;
    }

    function _mintNFT(address recipient, uint256 /* tokenId */, uint256 startId, uint256 supply, string memory _ipfsHash) private {
        _safeMint(recipient, startId + supply);
        _setTokenURI(startId + supply, _ipfsHash);
    }

    function withdrawFunds() external onlyOwner {
        require(address(this).balance > 0, "Contract balance is zero");

        payable(owner()).transfer(address(this).balance);
    }


    // The following functions are overrides required by Solidity.

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
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }


}
