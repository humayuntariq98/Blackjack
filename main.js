//GLOBAL STATE

const INIT_STATE = {
  p: 0,
  d: 0,
  playerCards: [],
  dealerCards: [],
};

//STATE VARIABLES

let suits = ["club", "diamond", "heart", "spade"];
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
//Creating a deck

const deck = [];
suits.forEach((element) => {
  faces.forEach((card) => {
    let tempCard = { ...card };
    tempCard["suit"] = element;
    deck.push(tempCard);
  });
});

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
const dealerCard2Element = document.querySelector(".dealer-card2");
const playerCard2Element = document.querySelector(".player-card2");

const pScoreEl = document.querySelector(".p-score");
const dScoreEl = document.querySelector(".d-score");
const winnerEl = document.getElementById("winnerText");

const dealerCard1Icon = document.getElementById("dealer-card1-icon");
const dealerCard2Icon = document.getElementById("dealer-card2-icon");
const playerCard1Icon = document.getElementById("player-card1-icon");
const playerCard2Icon = document.getElementById("player-card2-icon");

console.log(btnDeal);

//EVENT LISTENERS, HIT, DEAL, STAND, RESET

btnHit.addEventListener("click", handleHitClick);
btnDeal.addEventListener("click", handleDealClick);
btnStand.addEventListener("click", handleStandClick);
resetBtn.addEventListener("click", handleResetClick);

//FUNCTIONS

init();
function init() {
  console.log("initstate", INIT_STATE);
  state = JSON.parse(JSON.stringify(INIT_STATE));
  winner = null;
  numberGenerator = 52;
  render();
}
//TO CALCULATE DEALERS SCORE

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
//TO CALCULATE PLAYER'S SCORE

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
//WINNING LOGIC

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
//RENDERING STATE TO THE SCREEN

function render() {
  //render dealer cards on the screen

  if (state.dealerCards.length > 0) {
    dealerCard1Text.innerText = `${state.dealerCards[0].face}`;
    dealerCard1Text.classList.add("card-text");
    dealerCard1Text.classList.remove("small-text");
    dealerCard2Text.innerText = `${state.dealerCards[1].face}`;
    dealerCard2Text.classList.add("card-text");
    dealerCard2Text.classList.remove("small-text");
    dealerCard2Text.classList.add("hidden");
  } else {
    dealerCard1Text.innerText = "Click Deal to begin";
  }

  // Render player cards

  if (state.playerCards.length > 0) {
    playerCard1Text.innerText = `${state.playerCards[0].face}`;
    playerCard1Text.classList.add("card-text");
    playerCard1Text.classList.remove("small-text");
    playerCard2Text.innerText = `${state.playerCards[1].face}`;
    playerCard2Text.classList.add("card-text");
    playerCard2Text.classList.remove("small-text");
  } else {
    playerCard1Text.innerText = "Click Deal to begin";
  }
  //rendering dealer and player scores on the screen

  dScoreEl.innerText = state.d;
  pScoreEl.innerText = state.p;
}
//GENERATING RANDOM CARD FROM THE DECK

function randomCardGenerate() {
  let output;
  const cardNumber = Math.floor(Math.random() * numberGenerator);
  output = deck[cardNumber];
  usedCards.push(deck.splice(cardNumber, 1)[0]);
  numberGenerator = numberGenerator - 1;
  return output;
}
// DEAL CLICK HANDLER

function handleDealClick(event) {
  btnDeal.disabled = true;

  //generating card for player and dealer

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

  //Adding span to show icon of the cards

  addIconToSpan(dealerCard1Icon, state.dealerCards[0].suit, dealerCard1Text);
  addIconToSpan(dealerCard2Icon, state.dealerCards[1].suit, dealerCard2Text);
  playerCard2Element.classList.remove("hidden");
  addIconToSpan(playerCard1Icon, state.playerCards[0].suit, playerCard1Text);
  addIconToSpan(playerCard2Icon, state.playerCards[1].suit, playerCard2Text);
}
//HIT CLICK HANDLER

function handleHitClick() {
  if (state.p >= 21) {
    btnHit.disabled = true;
  } else {
    //Generating a new card for the player if the score is not already >=21

    let newPlyerCard = randomCardGenerate();
    const newPlayerDiv = document.createElement("div");
    newPlayerDiv.classList.add("player-extra-cards", "card");
    const newSpan = document.createElement("span");
    newSpan.classList.add("card-text");

    //Creating span element to show icon of created card

    const iconSpan = document.createElement("span");
    addIconToSpan(iconSpan, newPlyerCard.suit, newSpan);
    newSpan.textContent = newPlyerCard.face;
    newPlayerDiv.appendChild(newSpan);
    newPlayerDiv.appendChild(iconSpan);
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
//STAND CLICK HANDLER

function handleStandClick() {
  btnStand.disabled = true;
  if (winner === null) {
    btnHit.disabled = true;

    //Show second card of dealer along with icon and render dealer score after second card on the screen

    dealerCard2Element.classList.remove("hidden");
    dealerCard2Text.classList.remove("hidden");
    dealerCard2Icon.classList.remove("hidden");
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

    //Generating another card for the dealer till the score is <=16

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

      //Creating new element for the new card and icon and appending it to dealer div

      let newDealerCardEl = document.createElement("div");
      const newDealerCardTextSpan = document.createElement("span");
      newDealerCardTextSpan.classList.add("card-text");
      newDealerCardEl.classList.add("dealer-extra-card", "card");
      const dealerIconSpan = document.createElement("span");
      addIconToSpan(dealerIconSpan, newDealerCard.suit, newDealerCardTextSpan);
      newDealerCardTextSpan.innerText = newDealerCard.face;
      newDealerCardEl.appendChild(newDealerCardTextSpan);
      newDealerCardEl.appendChild(dealerIconSpan);
      let dealerDivEl = document.querySelector(".dealer-cards");
      dealerDivEl.appendChild(newDealerCardEl);
      if (state.d >= 17) {
        break;
      }
    }
    //Check win logic once stand is clicked

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
//RENDERING WINNER TO THE SCREEN

function renderWinner() {
  winnerEl.innerText = winner;
  if (winner !== null) {
    resetBtn.disabled = false;
    btnStand.disabled = true;
  }
}
//FUNCTION TO REMOVE ALL CARDS THAT WERE ADDED THROUGH HIT OR STAND FROM THE SCREEN.

function removeAllElementsOfClassName(className) {
  document.querySelectorAll("." + className).forEach((e) => e.remove());
}

//RESET CLICK HANDLER

function handleResetClick() {
  resetBtn.disabled = true;

  //Getting the deck back to 52, and emptying the used cards array.

  usedCards.forEach((usedCard) => {
    deck.push(usedCard);
  });
  usedCards = [];
  btnDeal.disabled = false;
  btnHit.disabled = true;
  btnStand.disabled = true;

  //Clearing out all divs along with icons

  winnerEl.innerText = "";
  dealerCard1Text.textContent = "";
  dealerCard2Text.textContent = "";
  playerCard1Text.textContent = "";
  playerCard2Text.textContent = "";
  dealerCard1Text.classList.add("small-text");
  playerCard1Text.classList.add("small-text");
  playerCard2Text.classList.add("small-text");
  dealerCard1Icon.innerHTML = "";
  dealerCard2Icon.innerHTML = "";
  playerCard1Icon.innerHTML = "";
  playerCard2Icon.innerHTML = "";
  playerCard2Element.classList.add("hidden");
  dealerCard2Element.classList.add("hidden");

  //invoking function to remove all cards added through hit or stand

  removeAllElementsOfClassName("player-extra-cards");
  removeAllElementsOfClassName("dealer-extra-card");
  const elementsOfClassDanger = document.querySelectorAll(".text-danger");
  elementsOfClassDanger.forEach((element) => {
    element.classList.remove("text-danger");
  });
  winnerEl.classList.add("text-danger");
  init();
}

//FUNCTION TO ADD ICON TO THE CARDS IN THE SPANS

function addIconToSpan(spanElement, suit, textSpan) {
  const icon = document.createElement("i");
  icon.classList.add("bi", "bi-suit-" + suit + "-fill");
  if (suit === "diamond" || suit === "heart") {
    icon.classList.add("text-danger");
    textSpan.classList.add("text-danger");
  }
  spanElement.classList.add("text-center");
  spanElement.appendChild(icon);
}
