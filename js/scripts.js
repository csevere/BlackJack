$(document).ready(function(){
	// console.log("Sanity Check")

	/////////////////////////
	//////MAIN VARIABLES/////
	/////////////////////////
	// A fresh, perfect ordered deck of cards
	const freshDeck = createDeck();
	// We will keep all player/dealer cards in this array
	var playersHand = [];
	var dealersHand = [];
	var theDeck = freshDeck.slice();
	var currentPlayerTotal = Number($('.total-amount').attr('value'));
	var betAmount = Number($('.bet-amount').attr('value'));
	$('.hit-button').css("visibility", "hidden");
	$('.stand-button').css("visibility", "hidden");
	$('.double-button').css("visibility", "hidden");

	//hide the cards at start of game
	$('.card').css("visibility", "hidden");
	$('.message').text("Place your bets!");



	/////////////////////////
	//////EVENT HANDLERS/////
	/////////////////////////
	$('.deal-button').click(function(){
		// $('.message').text("Place your bets!");
		$('.card-1').css("visibility", "visible");
		$('.card-2').css("visibility", "visible");
		// $('#d2').css("visibility", "visible");


		// The deal stuff happens here...
		// Here, theDeck is still a copy of freshDeck
		// shuffleDeck();
		// Here, theDeck is shuffled, no longer in order of freshDeck
		// console.log(theDeck);
		// console.log(freshDeck);
		reset();

		// $('.message').text('Shuffling the cards...').fadeout();


		$('.hit-button').css("visibility", "visible");
		$('.stand-button').css("visibility", "visible");
		$('.double-button').css("visibility", "visible");
		$('.deal-button').css("visibility", "hidden");





		// We have a shuffled deck, add the 1 and 3rd card to the playersHand and the DOM
		// Do the same for the dealer
		playersHand.push(theDeck.shift()); //Remove top card from theDeck and give to player
		dealersHand.push(theDeck.shift()); //Remove (next) top card and give to dealer
		playersHand.push(theDeck.shift()); //Remove (next) top card and give to player
		dealersHand.push(theDeck.shift()); //Remove (next) top card and give to dealer

		// Chnage the DOM to add teh images
		// placeCard(DoM name of who, card-X for slot, card value to send)

		setTimeout(function(){placeCard('player',1,playersHand[0]);},200)

		setTimeout(function(){placeCard('player',2,playersHand[1]);},1600)

		// setTimeout(function(){placeCard('dealer',1,dealersHand[0]);},800)
		setTimeout(function(){placeCard('dealer',2,dealersHand[1]);},2000)



		calculateTotal(playersHand,'player');
		// calculateTotal(dealersHand,'dealer');


	});

	$('.hit-button').click(function(){

		$('.card-3').css("visibility", "visible");
		setTimeout(function(){placeCard('dealer',1,dealersHand[0]);},800)
		calculateTotal(dealersHand,'dealer');

		//if-else statements



		// Hit functionallity...
		// Player wants a new card. This means:
		// 1. shift OFF of theDeck
		// 2. push on to playersHand
		// 3. Run placeCard to put the new card (image) in the DOM
		// 4. Run calculateTotal to find out the new hand total

		if(calculateTotal(playersHand, 'player') < 21){
			playersHand.push(theDeck.shift()); //This covers 1 & 2
			var lastCardIndex = playersHand.length - 1;
			var slotForNewCard = playersHand.length;

			$('.card-4').css("visibility", "visible");
			$('#d4').css("visibility", "hidden");

			placeCard('player',slotForNewCard,playersHand[lastCardIndex]); //3
			calculateTotal(playersHand, 'player'); //4
		}
	});




	$('.stand-button').click(function(){
		// On click stand...
		// Player has given control over the dealer.
		// Dealer MUST hit until dealer has 17 or more
		setTimeout(function(){placeCard('dealer',1,dealersHand[0]);},800)
		$('#d3').css("visibility", "visible");
		var dealerTotal = calculateTotal(dealersHand,'dealer');
		while(dealerTotal < 17){
			// Hit works the same...
			// 1. Push card from top of deck onto dealers hand
			// 2. update DOM (placecard)
			// 3. Update dealerTotal
			dealersHand.push(theDeck.shift());
			var lastCardIndex = dealersHand.length - 1;
			var slotForNewCard = dealersHand.length;
			placeCard('dealer',slotForNewCard,dealersHand[lastCardIndex]); //3
			dealerTotal = calculateTotal(dealersHand, 'dealer'); //4
		}
		checkWin();
	});

	/////////////////////////////////////////////////
	//////////////UTILITY FUNCTIONS//////////////////
	/////////////////////////////////////////////////
	function reset(){
		//reset the chips
		$('#chip4').click(function(){
			var chip4 = Number($('#chip4').attr('value'));
			console.log(chip4);
		});

		$('#chip3').click(function(){
			var chip3 = Number($('#chip3').attr('value'));
			console.log(chip3);
		});


		$('#chip2').click(function(){
			var chip2 = Number($('#chip2').attr('value'));
			console.log(chip2);
		});


		$('#chip1').click(function(){
			var chip1 = Number($('#chip1').attr('value'));
			console.log(chip1);
		});



		// In order to reset the game, we need to:
		// 1. Reset the deck.
		$('.message').text("Place your bets!");
		theDeck = freshDeck.slice();
		shuffleDeck();
		// 2. Reset the player and dealer hand arrays
		playersHand = [];
		dealersHand = [];
		// 3. REset the cards in the DOM
		$('.card').html('');
		// 4. Reset the totals for both players
		$('.dealer-total-number').html('0')
		$('.player-total-number').html('0')




		// Number($('#chip3').attr('value'))
		// Number($('#chip2').attr('value'));
		// Number($('#chip1').attr('value'))




		$('.message').text('');

	}


	function checkWin(){
		// var currentPlayerTotal = Number($('.total-amount').attr('value'));
		// var betAmount = Number($('.bet-amount').attr('value'));
		var newPlayerTotal
		var newBetAmount


		var playerTotal = calculateTotal(playersHand, 'player');
		var dealerTotal = calculateTotal(dealersHand, 'dealer'); //4
		var winner = "";

		$('.hit-button').css("visibility", "hidden");
		$('.stand-button').css("visibility", "hidden");
		$('.double-button').css("visibility", "hidden");
		$('.deal-button').css("visibility", "visible");

		// $('.card').css("visibility", "hidden");

		('.card-1').css("visibility", "visible");
		('.card-2').css("visibility", "visible");
		('.card-3').css("visibility", "visible");
		('.card-4').css("visibility", "visible");



			$('#d1').css("visibility", "visible");
			$('#d2').css("visibility", "visible");
			$('#d3').css("visibility", "visible");




		// If Player has more than 21. Player Busts.
		if(playerTotal > 21){
			winner = "You have busted. Dealer wins. Bye-bye, ";
			newPlayerTotal = currentPlayerTotal -= betAmount;
			console.log(betAmount);

		}else if(dealerTotal > 21){
			winner = "Dealer has busted. You win! Yeah, hello, sweet ";
			newPlayerTotal = currentPlayerTotal += betAmount;

			console.log(newPlayerTotal);
			console.log(betAmount);

		}else{
			// Neither player has busted. See who won...
			if(playerTotal > dealerTotal){
				winner = "You beat the dealer! Yeah, hello, sweet ";
				newPlayerTotal = currentPlayerTotal += betAmount;
				console.log(newPlayerTotal);
				console.log(betAmount);
			}else if(playerTotal < dealerTotal){
				winner = "The dealer won! Bye-bye, ";
				newPlayerTotal = currentPlayerTotal -= betAmount;
				console.log(betAmount);
				console.log(newPlayerTotal);
			}else{
				winner = "PUSH"
				newPlayerTotal = currentPlayerTotal;
				$('.message').text(winner);

			}
		}
		$('.message').text(winner + "$" + betAmount + "!" + " Place your bets.");
		$('.text1').text('$' + newPlayerTotal);

		// $('.text2').text('$' + "0")

		// $('.message').text("Won " + newPlayerTotal "!");

	}

	function calculateTotal(hand, who){
		console.log(hand);
		// hand will be an array (either playersHand or dealersHand)
		// who will be what the DOM knows the player as (dealer or player)
		var totalHandValue = 0;
		var thisCardValue = 0;
		var hasAce = false;
		var totalAces = 0;
		for(let i = 0; i < hand.length; i++){
			thisCardValue = Number(hand[i].slice(0,-1));
			if(thisCardValue > 10){
				thisCardValue = 10;
			}else if(thisCardValue == 1){
				// this is an Ace!
				hasAce = true;
				totalAces++;
				thisCardValue = 11;
			}
			totalHandValue += thisCardValue;
			// console.log(thisCardValue)
		}
		for(let i = 0; i< totalAces; i++){
			if(totalHandValue > 21){
				totalHandValue -= 10
			}
		}

		// We have teh total, now update the DOM.
		var totalToUpdate = '.' + who + '-total-number';
		$(totalToUpdate).text(totalHandValue);
		return totalHandValue;
	}

	function placeCard(who, where, what, dcard){
		// Find the DOM element, based on the args, that we want to change
		// i.e., find the element that we want to put the image in
		var slotForCard = '.' + who + '-cards .card-' + where;
		// console.log(slotForCard);
		var imageTag = '<img src="cards/'+what+'.png">';

		$(slotForCard).html(imageTag)
		$(slotForCard).addClass('dealt')
		// $('.card').animate({
		// 		left: '40px';
		// })
	}


	function createDeck(){
		var newDeck = [];
		// Two loops, one for suit, one for card value
		var suits = ['h','s','d','c'];
		// Outter loop which iterates the suit/letter...
		for(let s = 0; s < suits.length; s++){
			// Inner Loop which iterates the values/Number
			for(let c = 1; c <= 13; c++){
				// Push onto newDeck array, the value[c] + suit[s]
				newDeck.push(c+suits[s]);
				// s = 0, c = 1
				// s = 0, c = 2
				// s = 0, c = 3...
				// s = 0, c = 13

				// s = 1, c = 1
				// s = 1, c = 2
				// s = 1, c = 3 ...
				// s = 1, c = 13

				// s = 2, c = 1
			}
		}
		return newDeck;
	}

	function shuffleDeck(){
		// Swap 2 elements in the array many, many times to shuffle.
		for(let i = 0; i < 14000; i++){
			var random1 = Math.floor(Math.random() * 52);
			var random2 = Math.floor(Math.random() * 52);
			// Store in temp, the value at index random1, in array theDeck (for later)
			var temp = theDeck[random1];
			// Overwrite what's at index random1 with what's at index random2
			theDeck[random1] = theDeck[random2];
			// Overwrite what's at index random2 with what's in temp
			theDeck[random2] = temp;
		}
	}



var currentPlayerTotal = Number($('.total-amount').attr('value'));
var betAmount = Number($('.bet-amount').attr('value'));


$('#chip4').click(function(){
	var chip4 = Number($('#chip4').attr('value'));
	var betTotal
	var UpdatedTotal
	// var newTotal = currentPlayerTotal - chip4;

	if(currentPlayerTotal <= 0){
		$('.message').text("You are out of money, fool! Play and win some more!");
		$('.text1').text('$' + '0');
		$('#chip4').off("click");
		UpdatedTotal = 0;
		betTotal = betAmount;
	}else{
		betTotal = betAmount += chip4;
		UpdatedTotal = currentPlayerTotal -= chip4;

	}

	console.log(UpdatedTotal);
	$('.text1').text('$' + UpdatedTotal);
	$('.text2').text('$' + betTotal);
	console.log("this chip4 works");


});

$('#chip3').click(function(){
	var chip3 = Number($('#chip3').attr('value'));
	var betTotal
	var UpdatedTotal
	// var newTotal = currentPlayerTotal - chip4;

	if(currentPlayerTotal <= 0){
		$('.message').text('You are out of money, fool! Play and win some more!');
		$('.text1').text('$' + '0');
		$('#chip3').off("click");
		UpdatedTotal = 0;
		betTotal = betAmount;
	}else{
		betTotal = betAmount += chip3;
		UpdatedTotal = currentPlayerTotal -= chip3;

	}

	console.log(UpdatedTotal);
	$('.text1').text('$' + UpdatedTotal);
	$('.text2').text('$' + betTotal);
	console.log("this chip3 works");

});



$('#chip2').click(function(){
	var chip2 = Number($('#chip2').attr('value'));
	var betTotal
	var UpdatedTotal
	// var newTotal = currentPlayerTotal - chip4;

	if(currentPlayerTotal <= 0){
		$('.message').text('You are out of money, fool! Play and win some more!');
		$('.text1').text('$' + '0');
		$('#chip2').off("click");
		UpdatedTotal = 0;
		betTotal = betAmount;
	}else{
		betTotal = betAmount += chip2;
		UpdatedTotal = currentPlayerTotal -= chip2;

	}

	console.log(UpdatedTotal);
	$('.text1').text('$' + UpdatedTotal);
	$('.text2').text('$' + betTotal);
	console.log("this chip2 works");

});


$('#chip1').click(function(){
	var chip1 = Number($('#chip1').attr('value'));
	var betTotal
	var UpdatedTotal
	// var newTotal = currentPlayerTotal - chip4;

	if(currentPlayerTotal <= 0){
		$('.message').text('You are out of money, fool! Play and win some more!');
		$('.text1').text('$' + '0');
		$('#chip1').off("click");
		UpdatedTotal = 0;
		betTotal = betAmount;
	}else{
		betTotal = betAmount += chip1;
		UpdatedTotal = currentPlayerTotal -= chip1;
	}

	console.log(UpdatedTotal);
	$('.text1').text('$' + UpdatedTotal);
	$('.text2').text('$' + betTotal);
	console.log("this chip2 works");

});

$('.double-button').click(function(){
		var doubleBet
		var doubleTotal

	if(currentPlayerTotal < betAmount){
		$('.message').text('Not enough money, fool! Play and win some more!');
		// $('.text1').text('$' + '0');
		$('.double-button').off("click");
		doubleTotal = currentPlayerTotal;
		doubleBet = betAmount;

	}else{
		doubleTotal = Number(currentPlayerTotal -= betAmount);
		doubleBet = Number(betAmount += betAmount);

		}
		$('.text1').text('$' + doubleTotal);
		$('.text2').text('$' + doubleBet);

	$('.double-button').css("visibility", "hidden");


});

$('#chipx').click(function(){
	// var chipx = Number($('#chip1').attr('value'));
	var betTotal
	var UpdatedTotal
	// var newTotal = currentPlayerTotal - chip4;

	// if(currentPlayerTotal <= 0){
	// 	$('.message').text('You are out of money, fool! Play and win some more!');
	// 	$('.text1').text('$' + '0');
	// 	$('#chip1').off("click");
	// 	UpdatedTotal = 0;
	// 	betTotal = betAmount;
	// }else{
		betTotal = betAmount - betAmount;
		UpdatedTotal = currentPlayerTotal + betAmount;


	console.log(UpdatedTotal);
	$('.text1').text('$' + UpdatedTotal);
	$('.text2').text('$' + betTotal);
	console.log("this chipx works");

});






});
