// var twoRandomScores = function(){
//   var score1 = Math.random() * 10;
//   var score2 = Math.random() * 10;
//   return score1 + score2;
// };
//
// twoRandomScores();
//
// var randomScore = Math.floor(Math.random()  * 52);
// console.log("I got the score " + randomScore)



//getting 13 unique values from random number between 1-52
//need 13 unique numbers to represent each card in a suits


//First, let's think about how the random value between 1 and 52
//relates to a deck of cards.
//(a) Let's say that scores between 1 and 13 represent Hearts.
//(b) Let's say that scores between 14 to 26 represent Diamonds.
//(c) Let's say that scores between 27 to 39 represent Clubs.
//(d) Let's say that scores between 40 to 52 represent Spades.
//If you get a score of 34, this card has the suit Clubs.
//How can we translate 34 to a score of between 0 and 12 for Clubs?

//
// var deal = Math.floor(Math.random() * 52);
// var final = deal % 13;
// console.log(final);

//each suit has a value from 0 - 12
//where 0 is King, 11 is Queen, and 10 is Jack





//We've nearly finished thinking through how to deal a card and
//give it a proper blackjack value. We've gone from getting a
//random value between 1 and 52 to now having a value between 0 and 12.
//And we know that each of the 13 unique values between 0 and 12
//is a particular card in a suit. Now we have to worry about specific
//values. First, we need to define some things:

// A score of 0 is the King.

// A score of 11 is the Jack.

// A score of 12 is the Queen.

//They all have values of 10 in blackjack***, not 0, 11 or 12!

var outcome;
var deal = Math.floor(Math.random() * 40);
if(deal % 2 === 0){
    outcome = "even";
}else{
    outcome = "odd";
}

//
//
// var card = Math.floor(Math.random() * 52);

//----------PUTTING IT ALL TOGETHER--------------


// Define a function called deal
// It should return a random number between 1 and 52

var deal = function(){
    var card = Math.floor(Math.random() * 52);
    return card;
}


// Declare two variables
// For both variables, assign values gotten by calling the function
var card1 = deal();
var card2 = deal();


// Define a function called score, which will assign points by
// adding up the cards:
// var score = function(){
//     return card1 + card2;
// }

// Make a getValue function here, which should convert a card to
// the value that card is worth
var getValue = function(card){
    if(card % 13 === 0 || card % 13 > 10){
      return card = 10; //we have to assign the value not use ==
    }else if(card % 13 == 1){
      return card = 11;
    }else{
      return card % 13;
    }  ;
}

//Our score function converts our cards to a score
//This getValue function will eventually be used to take a card
//(which we represent by a number between 1 and 52) as a parameter
//and return the value of the card for scoring in
//Blackjack (1 through 11).

var score = function () {
    return getValue(card1) + getValue(card2);
};
