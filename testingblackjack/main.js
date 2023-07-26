
let INIT_STATE = {
    p: 0,
    d: 0,
    playerCards: [],
    dealerCards: []
}

//hit button only works till the player score <21
//when the stand button gets clicked only the the dealerrcard2 is shown on the sreen. so it will have no interruption with scores
//updateScore function

// randomCardGenerate function to exclude cards from the deck
//IN HIT FUNCTION, IF P SCORE > 21 STOP GAME
//IN DEAL FUNCTION IF CLICKED ONCE CANNOT BE CLICKED AGAIN
//direct blackjack, then whatever happens
//player sum calculate and player sum function
// state variables (suits, faces, deck,scores,winner)

let suits = ["clubs", "diamonds", "hearts", "spades"];
let faces = [
{face: "A",
 value: [11,1]
},
{face: "2",
    value: 2
},
{face: "3",
    value: 3 
},
{face: "4",
    value: 4
},
{face: "5",
    value: 5
},
{face: "6",
    value: 6
},
{face: "7",
    value: 7
},
{face: "8",
    value: 8
},
{face: "9",
    value: 9
},
{face: "10",
    value: 10
},
{face: "J",
    value: 10
},
{face: "Q",
    value: 10
},
{face: "K",
    value: 10
}
]

const deck = [];
suits.forEach((element)=>{
    faces.forEach((card)=>{
        let tempCard = {...card}
        tempCard['suit'] = element
        deck.push(tempCard)
    })
})
console.log(deck);


let state;

let winner;

// Event Listeners
const btnHit = document.getElementById("hitBtn")
btnHit.disabled = true;
const btnDeal = document.getElementById("dealBtn")
const btnStand = document.getElementById("standBtn")
btnStand.disabled = true;

const dealerCard1Text = document.getElementById('dealer-card1-Text')
const dealerCard2Text = document.getElementById('dealer-card2-Text')
const playerCard1Text = document.getElementById('player-card1-Text')
const playerCard2Text = document.getElementById('player-card2-Text')

const pScoreEl = document.querySelector(".p-score")
const dScoreEl = document.querySelector(".d-score")

console.log(btnDeal);

btnHit.addEventListener("click", handleHitClick);
btnDeal.addEventListener("click", handleDealClick);
btnStand.addEventListener("click", handleStandClick);

//Functions Section

init();
function init(){
state = {...INIT_STATE};
winner = null;
render();
// calculateScore();
}

function calculateDealerScore(){
    // if(state.d === 21 && state.p === 21) {
    //     console.log('Push')
    // } else if (state.d === 21 || state.p > 21 ){
    //     console.log("dealer wins")
    // } else if (state.p === 21 || state.d > 21) {
    //     console.log("player wins")
    // } else if (state.d < 21 && state.p < 21) {
 //calculating dealer score

//     let dTotal = state.d;
//     state.dealerCards.forEach((dCard)=>{
//      if (dCard.face === "A"){
//          if(dTotal>10){
//              dCard.value = 1
//          } else {
//              dCard.value = 11
//          }
//      }
//      dTotal = dTotal + dCard.value
//  })

    let dTotal = state.d
        if (state.dealerCards[0].face === "A") {
            state.dealerCards[0].value = 11
        }
        dTotal = dTotal + state.dealerCards[0].value
        state.d = dTotal
        console.log(state.d)
        render();
        determineWinner();
}

 function calculatePlayerScore(){

 let pTotal = state.p;
 state.playerCards.forEach((pCard)=>{
     if (pCard.face === "A"){
         if(pTotal>10){
             pCard.value = 1
         } else {
             pCard.value = 11
         }
     }
     pTotal = pTotal + pCard.value
 })
 state.p = pTotal
 console.log(state.p)

 render();
 determineWinner();
}

function determineWinner(){
    if (state.p === 21 && state.d === 21 ) {
        console.log("Push")
        winner = "Push, it's a Tie"
    // } else if (state.p === 21 && state.d !== 21) {
    //     console.log("player wins")
    //     winner = "Player wins"
    } else if (state.d === 21 && state.p !== 21) {
        console.log("dealer wins")
        winner = "Dealer wins"
    } else if (state.p > 21) {
        console.log("dealer wins")
        winner = "Dealer wins"
    } else if (state.d > 21) {
        console.log("player wins")
        winner = "Player wins"
    }
}

function render(){
//render dealer cards on the screen
if (state.dealerCards.length > 0) {
    dealerCard1Text.innerText = `${state.dealerCards[0].face}`;
    dealerCard2Text.innerText = `${state.dealerCards[1].face}`;
    dealerCard2Text.classList.add("hidden")
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
  dScoreEl.innerText = state.d
  pScoreEl.innerText = state.p 

}


function randomCardGenerate(){
let output;
const cardNumber = Math.floor(Math.random()*52);
output = deck[cardNumber]
return output
}




function handleDealClick(event){
if (state.playerCards.length === 2 || state.dealerCards.length === 2){
btnDeal.removeEventListener("click", handleDealClick)
} else {
let playerCard1 = randomCardGenerate()
let playerCard2 = randomCardGenerate()
let dealerCard1 = randomCardGenerate()
let dealerCard2 = randomCardGenerate()
state.playerCards.push(playerCard1)
state.playerCards.push(playerCard2)
state.dealerCards.push(dealerCard1)
state.dealerCards.push(dealerCard2)
btnHit.disabled = false;
btnStand.disabled = false;
console.log(dealerCard1);
calculateDealerScore();
calculatePlayerScore();
render();

}
}

function handleHitClick(){
    if(state.p >=21){
        btnHit.removeEventListener("click", handleHitClick)
    } else {
let newPlyerCard = randomCardGenerate()
const newPlayerDiv = document.createElement("div")
const newSpan = document.createElement("span")
newSpan.textContent = newPlyerCard.face;
newPlayerDiv.appendChild(newSpan);
const playerDivs = document.querySelector(".player-cards")
playerDivs.appendChild(newPlayerDiv);
state.playerCards.push(newPlyerCard);
//updating player score after hit
if (newPlyerCard.face === "A"){
    if(state.p>10){
        newPlyerCard.value = 1
    } else {
        pCard.value = 11
    }
}
state.p += newPlyerCard.value
//rendering player score on the screen after hit
pScoreEl.innerText = state.p;
determineWinner();
}
}

//coding stand
//once state.p >= 21 disable the button or remove event listener
function handleStandClick () {
    btnStand.removeEventListener("click", handleStandClick)
    if (winner === null) {
        btnHit.disabled = true;
        console.log("Stand clicked")
        dealerCard2Text.classList.remove("hidden")
        let d2Total = state.d;
        if (state.dealerCards[1].face === "A") {
            if(d2Total>10){
             state.dealerCards[1].value = 1
         } else {
             state.dealerCards[1].value = 11
         }
     }
        d2Total = d2Total + state.dealerCards[1].value
        state.d = d2Total
        dScoreEl.innerText = state.d

    //create new cards with loop
        
    // and score calculate again using for loop for the remnaining cards
    //render score on the screen
    //winning comparison again
    } else {
        
    }
}
// stand will disable the hit button as well DONE

// if the score is less than equal to 16, add another card to dealer, render it, and update the score
// if the score is still the same repeat, 
//if the score is greater than 16 and less than 21, determine winner function runs WHICH COMPARES THE SCORE (CHECK IT)
// if dealer score is equal to 21, dealer wins
//if dealer score is greater than 21 player wins
//can use while loop like while (state.d <= 16 add new card)
//once the player clicks stand