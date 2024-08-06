/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h'];
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A'];
const MSG_LOOKUP = {
  null: 'Good Luck!',
  'T': "It's a Push",
  'P': 'Player Wins!',
  'D': 'Dealer Wins',
  'PBJ': 'Player Has Blackjack 😃',
  'DBJ': 'Dealer Has Blackjack 😔',
};
const mainDeck = buildMainDeck();

/*----- app's state (variables) -----*/
let deck;  // shuffled deck - deck shuffled in handleDeal()
let pHand, dHand;  // player/dealer hands (arrays)
let pTotal, dTotal;  // best point value of hand
let bankroll, bet;  // bankroll how much money we have & bet is the amount of the bet
let outcome;  // result of the hand (see MSG_LOOKUP)

/*----- cached element references -----*/
const msgEl = document.getElementById('msg');
const dealerHandEl = document.getElementById('dealer-hand');
const dealerTotalEl = document.getElementById('dealer-total');
const playerHandEl = document.getElementById('player-hand');
const playerTotalEl = document.getElementById('player-total');
const betEl = document.getElementById('bet');
const bankrollEl = document.getElementById('bankroll');
const handActiveControlsEl = document.getElementById('hand-active-controls');
const handOverControlsEl = document.getElementById('hand-over-controls');
const dealBtn = document.getElementById('deal-btn');
const betBtns = document.querySelectorAll('#bet-controls > button');

/*----- event listeners -----*/
dealBtn.addEventListener('click', handleDeal);
document.getElementById('bet-controls').addEventListener('click', handleBet); // Event delegation to each bet button
document.getElementById('hit-btn').addEventListener('click', handleHit);
document.getElementById('stand-btn').addEventListener('click', handleStand);

/*----- functions -----*/
init();

function handleStand() {
  dealerPlay();
  if (pTotal === dTotal) {
    outcome = 'T';
  } else if (dTotal > pTotal && pTotal > 21) {
    outcome = 'D';
  } else if (dTotal === 21) {
    outcome = 'DBJ'
  } else if (pTotal > 21 && dTotal > pTotal) {
    outcome = 'P';
  } else {
    outcome = 'PBJ';
  }
  settleBet();
  render();
}

function dealerPlay(cb) {
  while (dTotal < 17) {
    dHand.push(deck.pop());
    dTotal = getHandTotal(dHand);
  }
}

function handleHit() {
  pHand.push(deck.pop());
  pTotal = getHandTotal(pHand);
  if (pTotal > 21) {
    outcome = 'D';
    settleBet();
  };
  render();
}

function handleBet(evt) {
  const btn = evt.target;
  if (btn.tagName !== 'BUTTON') return;
  const betAmt = parseInt(btn.innerText.replace('$', ''));
  bet += betAmt;
  bankroll -= betAmt;
  render();
}

function handleDeal() {
  outcome = null;
  deck = getNewShuffledDeck();
  dHand = [];
  pHand = [];
  dHand.push(deck.pop(), deck.pop());
  pHand.push(deck.pop(), deck.pop());
  // Check for Blackjack
  dTotal = getHandTotal(dHand);
  pTotal = getHandTotal(pHand);
  if (dTotal === 21 && pTotal === 21) {
    outcome = 'T';
  } else if (dTotal === 21) {
    outcome = 'DBJ';
  } else if (pTotal === 21) {
    outcome = 'PBJ';
  }
  if (outcome) settleBet();
  render();
}

function settleBet() {
  if (outcome === 'PBJ') {
    bankroll += bet + (bet * 1.5);
  } else if (outcome === 'P') {
    bankroll += bet * 2;
  }
  bet = 0;
}

// compute the best score for the hand passed in
function getHandTotal(hand) {
  let total = 0;
  let aces = 0;
  hand.forEach(function(card) {
    total += card.value;
    if (card.value === 11) aces++;
  });
  while (total > 21 && aces) {
    total -= 10;
    aces--;
  }
  return total;
}

// initialize state, then call render()
function init() {
  outcome = null;
  dHand = [];
  pHand = [];
  pTotal = dTotal = 0;
  bankroll = 1000;
  bet = 0;
  render();
}

// Visualize all state to the DOM
function render() {
  renderHands();
  bankrollEl.innerHTML = bankroll;
  betEl.innerHTML = bet;
  renderControls();
  renderBetBtns();
  msgEl.innerHTML = MSG_LOOKUP[outcome];
}

function renderBetBtns() {
  betBtns.forEach(function(btn) {
    const btnAmt = parseInt(btn.innerText.replace('$', ''));
    btn.disabled = btnAmt > bankroll;
  })
}

function renderControls() {
  handOverControlsEl.style.visibility = handInPlay() ? 'hidden' : 'visible';
  handActiveControlsEl.style.visibility = handInPlay() ? 'visible' : 'hidden';
  dealBtn.style.visibility = bet >= 1 && !handInPlay() ? 'visible' : 'hidden';
}

function renderHands() {
  playerTotalEl.innerHTML = pTotal;
  dealerTotalEl.innerHTML = outcome ? dTotal : '??';
  playerHandEl.innerHTML = pHand.map(card => `<div class="card ${card.face}"></div>`).join('');
  dealerHandEl.innerHTML = dHand.map((card, idx) => `<div class="card ${idx === 1 && !outcome ? 'back' : card.face}"></div>`).join('');
}

function handInPlay() {
  return pHand.length && !outcome;
}

function getNewShuffledDeck() {
  // Create a copy of the mainDeck (leave mainDeck untouched!)
  const tempDeck = [...mainDeck]; // spread syntax splits each object in mainDeck and stores them as an array in tempDeck
  const newShuffledDeck = []; // initialize an empty array to store the deck after shuffling
  // add a random card to tempDeck while the index is still a number less than 53
  while (tempDeck.length) { 
    // Get a random index for a card still in the tempDeck
    const rndIdx = Math.floor(Math.random() * tempDeck.length);
    // Note the [0] after splice - this is because splice always returns an array and we just want the card object in that array
    newShuffledDeck.push(tempDeck.splice(rndIdx, 1)[0]);
  }
  return newShuffledDeck;
}

function buildMainDeck() {
  const deck = [];
  // Use nested forEach to generate card objects
  suits.forEach(function(suit) {
    ranks.forEach(function(rank) {
      deck.push({
        // The 'face' property maps to the library's CSS classes for cards
        face: `${suit}${rank}`,
        // Setting the 'value' property for game of blackjack, not war
        value: Number(rank) || (rank === 'A' ? 11 : 10) // if the rank is 02 - 09 then value is 1-9, if the card rank is A then value is 11, if card rank is J, Q, or K then value is 10.  
      });
    });
  });
  return deck; // returns the deck built in an order to the mainDeck constant.
}