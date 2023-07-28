//THINGS TO RESOLVE
//HOW TO MAKE COPY OF STATE IN INIT
//NAN PROBLEM AFTER RESET
//HOW TO CLEAR THE CARDS FROM THE PAGE
//HOW TO GET THE CARDS TO SHOW AGAIN
//GLOBAL
const INIT_STATE = {
  p: 0,
  d: 0,
  playerCards: [],
  dealerCards: [],
};

//STATE VARIABLES

let suits = ["clubs", "diamonds", "hearts", "spades"];
let faces = [
  { face: "A", value: [11, 1] },
  { face: "2", value: 2 },
  { face: "3", value: 3 },
  { face: "4", value: 4 },
  { face: "5", value: 5 },
  { face: "6", value: 6 },
  { face: "7", value: 7 },
  { face: "8", value: 8 },
  { face: "9", value: 9 },
  { face: "10", value: 10 },
  { face: "J", value: 10 },
  { face: "Q", value: 10 },
  { face: "K", value: 10 },
];

const deck = [];
suits.forEach((element) => {
  faces.forEach((card) => {
    let tempCard = { ...card };
    tempCard["suit"] = element;
    deck.push(tempCard);
  });
});
console.log(deck);

let state;

let winner;

let numberGenerator;

let usedCards = [];

// CACHED ELEMENTS
const btnHit = document.getElementById("hitBtn");
btnHit.disabled = true;
const btnDeal = document.getElementById("dealBtn");
const btnStand = document.getElementById("standBtn");
btnStand.disabled = true;
const resetBtn = document.getElementById("resetBtn");
resetBtn.disabled = true;

const playerDivs = document.querySelector(".player-cards");
const dealerDivs = document.querySelector(".dealer-cards");
const dealerCard1Text = document.getElementById("dealer-card1-Text");
const dealerCard2Text = document.getElementById("dealer-card2-Text");
const playerCard1Text = document.getElementById("player-card1-Text");
const playerCard2Text = document.getElementById("player-card2-Text");

const pScoreEl = document.querySelector(".p-score");
const dScoreEl = document.querySelector(".d-score");
const winnerEl = document.getElementById("winnerText");

console.log(btnDeal);

//EVENT LISTENERS

btnHit.addEventListener("click", handleHitClick);
btnDeal.addEventListener("click", handleDealClick);
btnStand.addEventListener("click", handleStandClick);
resetBtn.addEventListener("click", handleResetClick);

//FUNCTIONS

init();
function init() {
  console.log('initstate', INIT_STATE)
  state = JSON.parse(JSON.stringify(INIT_STATE));
  winner = null;
  numberGenerator = 52;
  render();
}

function calculateDealerScore() {
  let dTotal = state.d;
  if (state.dealerCards[0].face === "A") {
    state.dealerCards[0].value = 11;
  }
  dTotal = dTotal + state.dealerCards[0].value;
  state.d = dTotal;
  render();
  determineWinner();
}

function calculatePlayerScore() {
  let pTotal = state.p;
  state.playerCards.forEach((pCard) => {
    if (pCard.face === "A") {
      if (pTotal > 10) {
        pCard.value = 1;
      } else {
        pCard.value = 11;
      }
    }
    pTotal = pTotal + pCard.value;
  });
  state.p = pTotal;
  render();
  determineWinner();
}

function determineWinner() {
  if (state.p === 21 && state.d === 21) {
    console.log("Push");
    winner = "Push, it's a Tie";
  } else if (state.d === 21 && state.p !== 21) {
    console.log("dealer wins");
    winner = "Dealer wins";
  } else if (state.p > 21) {
    console.log("dealer wins");
    winner = "Dealer wins";
  } else if (state.d > 21) {
    console.log("player wins");
    winner = "Player wins";
  }
  renderWinner();
}

function render() {
  //render dealer cards on the screen
  if (state.dealerCards.length > 0) {
    dealerCard1Text.innerText = `${state.dealerCards[0].face}`;
    dealerCard2Text.innerText = `${state.dealerCards[1].face}`;
    dealerCard2Text.classList.add("hidden");
  } else {
    dealerCard1Text.innerText = "Click Deal to begin";
  }

  // Render player cards
  if (state.playerCards.length > 0) {
    playerCard1Text.innerText = `${state.playerCards[0].face}`;
    playerCard2Text.innerText = `${state.playerCards[1].face}`;
  } else {
    playerCard1Text.innerText = "Click Deal to begin";
  }
  //rendering dealer and player scores on the screen
  dScoreEl.innerText = state.d;
  pScoreEl.innerText = state.p;
}

function randomCardGenerate() {
  let output;
  const cardNumber = Math.floor(Math.random() * numberGenerator);
  output = deck[cardNumber];
  usedCards.push(deck.splice(cardNumber, 1)[0]);
  numberGenerator = numberGenerator - 1;
  return output;
}

function handleDealClick(event) {
  btnDeal.disabled = true;
  let playerCard1 = randomCardGenerate();
  let playerCard2 = randomCardGenerate();
  let dealerCard1 = randomCardGenerate();
  let dealerCard2 = randomCardGenerate();
  state.playerCards.push(playerCard1);
  state.playerCards.push(playerCard2);
  state.dealerCards.push(dealerCard1);
  state.dealerCards.push(dealerCard2);
  btnHit.disabled = false;
  btnStand.disabled = false;
  calculateDealerScore();
  calculatePlayerScore();
  render();
}

function handleHitClick() {
  if (state.p >= 21) {
    btnHit.disabled = true;
  } else {
    let newPlyerCard = randomCardGenerate();
    const newPlayerDiv = document.createElement("div");
    newPlayerDiv.classList.add("player-extra-cards","card");
    const newSpan = document.createElement("span");
    newSpan.textContent = newPlyerCard.face;
    newPlayerDiv.appendChild(newSpan);
    const playerDivs = document.querySelector(".player-cards");
    playerDivs.appendChild(newPlayerDiv);
    state.playerCards.push(newPlyerCard);
    //updating player score after hit
    if (newPlyerCard.face === "A") {
      if (state.p > 10) {
        newPlyerCard.value = 1;
      } else {
        newPlyerCard.value = 11;
      }
    }
    state.p += newPlyerCard.value;
    //rendering player score on the screen after hit
    pScoreEl.innerText = state.p;
    determineWinner();
  }
}

function handleStandClick() {
  btnStand.disabled = true;
  if (winner === null) {
    btnHit.disabled = true;
    dealerCard2Text.classList.remove("hidden");
    let d2Total = state.d;
    if (state.dealerCards[1].face === "A") {
      if (d2Total > 10) {
        state.dealerCards[1].value = 1;
      } else {
        state.dealerCards[1].value = 11;
      }
    }
    d2Total = d2Total + state.dealerCards[1].value;
    state.d = d2Total;
    dScoreEl.innerText = state.d;
    while (state.d <= 16) {
      let newDealerCard = randomCardGenerate();
      if (newDealerCard.face === "A") {
        if (state.d > 10) {
          newDealerCard.value = 1;
        } else {
          newDealerCard.value = 11;
        }
      }
      state.d = state.d + newDealerCard.value;
      dScoreEl.innerText = state.d;
      state.dealerCards.push(newDealerCard);
      let newDealerCardEl = document.createElement("div");
      newDealerCardEl.classList.add('dealer-extra-card', 'card');
      newDealerCardEl.innerText = newDealerCard.face;
      let dealerDivEl = document.querySelector(".dealer-cards");
      dealerDivEl.appendChild(newDealerCardEl);
      if (state.d >= 17) {
        break;
      }
    }
    if (state.p === 21 && state.d === 21) {
      console.log("push");
      winner = "Push. It's a tie";
    } else if (state.p === 21 && state.d !== 21) {
      console.log("player wins");
      winner = "Player wins";
    } else if (state.d === 21 && state.p !== 21) {
      console.log("dealer wins");
      winner = "Dealer wins";
    } else if (state.d > 21) {
      console.log("player wins");
      winner = "Player wins";
    } else if (state.p > state.d && state.p < 21) {
      console.log("Player wins");
      winner = "Player wins";
    } else if (state.d > state.p && state.d < 21) {
      console.log("Dealer wins");
      winner = "Dealer wins";
    } else if (state.d === state.p) {
      console.log("Push. It's a tie");
      winner = "Push. It's a tie";
    }
  }
  renderWinner();
}

function renderWinner() {
  winnerEl.innerText = winner;
  if (winner !== null) {
    resetBtn.disabled = false;
    btnStand.disabled = true;
  }
}


function removeAllElementsOfClassName(className){
  document.querySelectorAll('.'+className).forEach(e => e.remove());
}
function handleResetClick() {
  resetBtn.disabled = true;
  usedCards.forEach((usedCard) => {
    deck.push(usedCard);
  });
  usedCards = [];
  btnDeal.disabled = false;
  btnHit.disabled = true;
  btnStand.disabled = true;
  winnerEl.innerText = "";
  dealerCard1Text.textContent = "";
  dealerCard2Text.textContent = "";
  playerCard1Text.textContent = "";
  playerCard2Text.textContent = "";
  removeAllElementsOfClassName('player-extra-cards');
  removeAllElementsOfClassName('dealer-extra-card');
  init();
}