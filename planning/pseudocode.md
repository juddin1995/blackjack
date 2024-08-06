# User Stories
1. As  a user, I want to see a landing page so that I know I am playing blackjack.
2. As a user, I want to see a bankroll with a starting amount of $1000.
3. As a user, I want to see buttons to place my bet ($25, $100, $500).
4. As a user, I want to see the bet amount placed subtracted from the bankroll.
5. As a user, I want to see a card in my hand and a card face down on the dealer's hand with one faced up (The first card's value hidden for the dealer hand and the second one is not).
6. As a user, I want a button called deal to start the game.
7. As a user, I want a deck of 52 cards to draw from.
8. As a user, I want to have a button to hit (add/draw a card to my hand).
9. As a user, I want to have a button to stand (skip to the computer turn if computer has less than 17, computer draws a card).
10. As a user, I want to see the total value of my hand.
11. As a user, I want to see the total value of the dealer's hand after I click stand.
12. As a user, I want to see the cards drawn by me and the computer on the screen (except for dealer's hidden card which should be faced down until the end of the round).
13. As a user, I want to see who won the round after clicking stand.
14. As a user, I want to see my bankroll increase/decrease by the bet amount when I win/lose.
15. As a user, I want to be able to continue playing until my bankroll is empty ($0).

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


Betting system:

- when a player places a bet that amount gets removed from their bank

- chips to place the bet

- add and remove chips 

- confirm bet 

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