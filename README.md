# blackjack
REQUIREMENTS 
Set up a deck, with following requirements:

- 52 cards

- one through ten, of each suit, value what's on card

- ace, of each suit, value = 1 or 11

- jacks/queens/kings, of each suite, value = 10

Set up bank system:
- starter cash

- place a betting function amount

- if player wins player gets 1.5X amount of money

Maybe this is set up as an array, with four arrays (one for each suit). Don't want to explicitly write out a 52 length array, so set up a method that does this for you. Alternatively, maybe use hash key/values? key is suit and value is card type? Arrays are ordered though.

Shuffle the cards - randomize deck somehow. Can you just randomize an entire array? Look that up - go back to book shuffle exercise for reference. Probably separate init/shuffle methods. That way, only need to create deck once, can re-shuffle for a new game.

Ask for the players name, store it as a variable.
Deal the initial cards:
- 2 to player
- 2 to dealer
- save the cards in each hand (smaller arrays) and total (integer)

Write a method for players turn:
- ask them hit/stay?
- deal them card 2 if hit
- if stay, move on to dealers turn
- if broke or blackjack deliver message
- if player loses they lose money betted 

Write a method for dealers turn:
- if hand value < 17, hit
- check if hand > player hand
- if so, dealer wins, end of game
- if broke or blackjack deliver message

Once game over, and outcome correctly reported, ask player if they want to play again & loop back through game after shuffling.