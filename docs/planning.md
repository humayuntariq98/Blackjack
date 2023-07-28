# Blackjack - Project 1 Planning

Humayun Tariq Mughal

## Game Choice - Blackjack

## Wireframes

![Blackjack Wireframe](https://github.com/humayuntariq98/Blackjack/assets/138518548/9002370f-7cba-40fb-a618-345b4a682622)

## Pseudocode
1. Defining the required constants.
- Defining the INIT_STATE object.

2. Defining the required variables to track the state of the game.
- Array of objects to store deck of cards with multiple properties 
- Winner 
- State
- Number Generator
- Array of cards used

3. Caching the HTML elements that will be accessed through user activity.
- Deal. Two cards to the player and two cards to the dealer.
- Hit. Player gets another card.
- Stand. Dealer shows the second card and keeps picking a card till score is greater than 16. 
- Reset. Restart the game.

4. Adding event listeners to the cached buttons elements.

5. Defining the functions to provide functionality to the game.
- Init function. Intialize all state variables and call render.
- Render. Responsible for rendering player and dealer cards to the screen along with updating the score.
- Calculate Player Score. Makes calculation related to player score.
- Calculate Dealer Score. Calculates the dealer score.
- Determine Winner. This is where the win logic lives which checks to see if there is a winner.
- Random Card Generator. Responsible for generating a random card from the deck at any given time.
- Click Handlers for Deal, Hit, Stand, Reset
- Render Winner. Display winner.
- Render Icons. Display card icons to the screen.

6. Disabling buttons when not needed.
- Only the buttons that can be clicked at any given time should be allowed to click.



 
