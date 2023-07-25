// randomCardGenerate function to exclude cards from the deck
//Value of A
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


let state = {
        p: 0,
        d: 0,
        playerCards: [],
        dealerCards: []
    };

let winner;

// Event Listeners
const btnHit = document.getElementById("hitBtn")
const btnDeal = document.getElementById("dealBtn")
const btnStand = document.getElementById("standBtn")

console.log(btnDeal);

btnHit.addEventListener("click", handleHitClick);
btnDeal.addEventListener("click", handleDealClick);
// btnStand.addEventListener("click", handleStandClick);

//Functions Section


function randomCardGenerate(){
    let output;
    const cardNumber = Math.floor(Math.random()*52);
    output = deck[cardNumber]
    return output
}




function handleDealClick(event){
   let playerCard1 = randomCardGenerate()
   let playerCard2 = randomCardGenerate()
   let dealerCard1 = randomCardGenerate()
   let dealerCard2 = randomCardGenerate()
   state.playerCards.push(playerCard1)
   state.playerCards.push(playerCard2)
   state.dealerCards.push(dealerCard1)
   state.dealerCards.push(dealerCard2)
   const dealerCard1Text = document.getElementById('dealer-card1-Text')
   const dealerCard2Text = document.getElementById('dealer-card2-Text')
   const playerCard1Text = document.getElementById('player-card1-Text')
   const playerCard2Text = document.getElementById('player-card2-Text')
   console.log(dealerCard1);
   dealerCard1Text.innerText = dealerCard1.face
   dealerCard2Text.innerText = dealerCard2.face
   playerCard1Text.innerText = playerCard1.face
   playerCard2Text.innerText = playerCard2.face
}

function handleHitClick(){
    let newPlyerCard = randomCardGenerate()
    const newPlayerDiv = document.createElement("div")
    const newSpan = document.createElement("span")
    newSpan.textContent = newPlyerCard.face;
    newPlayerDiv.appendChild(newSpan);
    const playerDivs = document.querySelector(".player-cards")
    playerDivs.appendChild(newPlayerDiv);
    state.playerCards.push(newPlyerCard);


}




    
