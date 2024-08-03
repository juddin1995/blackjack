/*----- constants -----*/

/*----- state variables -----*/
let dealerHandCount;
let playerHandCount;
let dealerSum;
let playerSum;
let dealerAceCount;
let playerAceCount; //A can be 1 or 11 depending on the sum of other cards in hand
let hidden;
let deck;
let canHit; // player can draw while playerSum <= 21
let playerBankroll; // Starting bankroll
let currentBet; // Current bet amount
let values;
let types;


// console.log(hitBtnEl);
/*----- functions -----*/
init();

function init() {
  values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
  types = ["C", "D", "H", "S"];
  deck = [];
  deck = buildDeck();
  shuffleDeck();
  dealStartCards();
}

function buildDeck() {
  for (let i = 0; i < types.length; i++) {
    for (let j = 0; j < values.length; j++) {
      deck.push(`${values[j]}-${types[i]}`);
      // deck.push(values[j] + "-" + types[i]);
    }
  }
  return deck;
}

function shuffleDeck() {
  for (let i = 0; i < deck.length - 1; i++) {
    let j = Math.floor(Math.random() * deck.length); // Generate random number between 0 and < 52
    let temp = deck[i];
    deck[i] = deck[j];
    deck[j] = temp;
  }
  return deck;
}
// deal two starter cards to the dealer's hand array 
// deal one starter card to the player's hand array
// ask player to hit another card or stay
function dealStartCards() {
  hidden = deck.pop();
  dealerSum += getValue(hidden);
  dealerAceCount += checkAce(hidden);
  let dealerHandCount = 0;
  // console.log(hidden);
  // console.log(dealerSum);
  while (dealerSum < 17 && dealerHandCount < 2) {
    // img
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./css/cards/${card}.png`;
    dealerSum += getValue(card);
    dealerAceCount += checkAce(card);
    dealerCardsEl.append(cardImg);
    dealerHandCount++;
  }
  console.log(dealerSum);

  for (let i = 0; i < 2; i++) {
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = `./css/cards/${card}.png`;
    playerSum += getValue(card);
    playerAceCount += checkAce(card);
    // document.getElementById("player-cards").append(cardImg);
  }
  console.log(playerSum);
  // document.getElementById("hit").addEventListener("click", hit);
  // document.getElementById("stay").addEventListener("click", stay);
}

function hit() {
  if (!canHit) {
    return;
  }

  let cardImg = document.createElement("img");
  let card = deck.pop();
  cardImg.src = `./css/cards/${card}.png`;
  playerSum += getValue(card);
  playerAceCount += checkAce(card);
  document.getElementById("player-cards").append(cardImg);

  if (reduceAce(playerSum, playerAceCount) > 21) {
    canHit = false;
  }
}

function stay() {
  dealerSum = reduceAce(dealerSum, dealerAceCount);
  playerSum = reduceAce(playerSum, playerAceCount);

  canHit = false;
  document.getElementById("hidden").src = "./css/cards/" + hidden + ".png";

  let message = "";
  if (playerSum > 21) {
    message = "You Lose!";
  } else if (dealerSum > 21) {
    message = "You Win!";
  } else if (playerSum === dealerSum) {
    message = "Tie!";
  } else if (playerSum < dealerSum) {
    message = "You Lose!";
  }

  document.getElementById("dealer-sum").innerText = dealerSum;
  document.getElementById("player-sum").innerText = playerSum;
  document.getElementById("results").innerText = message;
  document.getElementById("results").classList.remove("hidden");
  document.getElementById("results").classList.add("display");
}

function getValue(card) {
  let data = card.split("-");
  let value = data[0];

  if (isNaN(value)) {
    if (value === "A") {
      return 11;
    }
    return 10;
  }
  return parseInt(value);
}

function checkAce(card) {
  if (card[0] === "A") {
    return 1;
  }
  return 0;
}

function reduceAce(playerSum, playerAceCount) {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10;
    playerAceCount -= 1;
  }
  return playerSum;
}


/*----- cached elements  -----*/
const dealerCardsEl = document.getElementById("dealer-cards"); //.append(cardImg);
const playerCardsEl = document.getElementById("player-cards"); //.append(cardImg);
const hitBtnEl = document.getElementById("hit")//.addEventListener("click", hit);
const stayBtnEl = document.getElementById("stay")//.addEventListener("click", stay);

/*----- event listeners -----*/
hitBtnEl.addEventListener("click", hit);