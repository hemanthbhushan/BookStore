// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./BookToken.sol";

contract BookContract {
    struct BookDetails {
        address BookOwner;
        string BookName;
        string Author;
        uint BookPrice;
        bool sale;
    }
    mapping(address => mapping(string => BookDetails)) public BookOwner;
    mapping(address => uint) public claimToken;

    event BookPurchased(
        address indexed buyer,
        string bookName,
        string author,
        uint bookPrice
    );

    BookToken public token;

    constructor(address _tokenAddress) {
        token = BookToken(_tokenAddress);
    }

    function listBookForSale(BookDetails memory _details) external {
        require(bytes(_details.BookName).length > 0, "Book name is required");
        require(bytes(_details.Author).length > 0, "Author name is required");
        require(_details.BookPrice > 0, "Book price must be greater than zero");
        require(
            _details.BookOwner == msg.sender,
            "Only the book owner can list it for sale"
        );

        BookOwner[msg.sender][_details.BookName] = BookDetails({
            BookOwner: msg.sender,
            BookName: _details.BookName,
            Author: _details.Author,
            BookPrice: _details.BookPrice,
            sale: true
        });
    }

    function buyBook(address _bookOwner, string memory _bookName) external {
        require(_bookOwner != address(0), "Invalid book owner address");
        require(bytes(_bookName).length > 0, "Book name is required");
        require(
            BookOwner[_bookOwner][_bookName].sale == true,
            "Book is not listed for sale"
        );
        require(_bookOwner != msg.sender, "You cannot buy your own book");

        BookDetails memory _tempDetails = BookOwner[_bookOwner][_bookName];

        require(
            token.balanceOf(msg.sender) >= _tempDetails.BookPrice,
            "Insufficient tokens"
        );

        token.transferFrom(msg.sender, address(this), _tempDetails.BookPrice);
        claimToken[_bookOwner] = _tempDetails.BookPrice;

        BookOwner[msg.sender][_tempDetails.BookName] = BookDetails({
            BookOwner: msg.sender,
            BookName: _tempDetails.BookName,
            Author: _tempDetails.Author,
            BookPrice: _tempDetails.BookPrice,
            sale: false
        });

        emit BookPurchased(
            msg.sender,
            _tempDetails.BookName,
            _tempDetails.Author,
            _tempDetails.BookPrice
        );
    }

    function withdrawToken() external {
        require(claimToken[msg.sender] > 0, "No tokens");
        token.transfer(msg.sender, claimToken[msg.sender]);
        claimToken[msg.sender] = 0;
    }
}
