# Blackjack
A front end browser based game to challenge me and enhance my skills with HTML CSS and JavaScript. The game is based on chance but has some strategy involved as well. The rule are as follows : <br>
- Blackjack hands are scored by their point total.<br>
 - The hand with the highest total wins as long as it doesn't exceed 21. <br>
- A hand with a higher total than 21 is said to bust. 
- Cards 2 through 10 are worth their face value, and face cards (jack, queen, king) are also worth 10. 
- An ace's value is 11 unless this would cause the player to bust, in which case it is worth 1. 

## Gameplay - Screenshots and Description

### Game Start
![Start Screen](<Game Start.png>)
When the game begins and the player clicks on deal, 2 cards are distributed each to the player and the dealer. However, the dealer only has one card face up.
The player can choose to Hit, but if the combined score of cards exceeds 21, the dealer wins.
If the player chooses to stand, the dealer shows the second card.

### Dealer Wins
![Dealer Wins](<Dealer Wins.png>)
If the player stands, and the combined total of the dealer's cards is less than 17, the dealer keeps taking a card from the deck until the score exceeds 16. If the dealers score is greater than that of the player, the dealer wins.

### Player Wins
![Player Wins](<Player Wins-1.png>)
However, if the dealers score exceeds 21, the player wins. Moreover, if the player takes a Hit, and then chooses to stand, the dealer shows their cards, keeps taking a card until the score is greater than 16 and then scores are compared. If the player's score is higher, the player wins.
## Technologies Used

- HTML
- CSS
- Bootstrap (CSS Framework) - [Documentation](https://getbootstrap.com/docs/5.3/components/card/)
- JavaScript

## Getting Started

Try out your luck with this game of chance - [Game Link]([https://github.com/humayuntariq98/Blackjack](https://blackjackinjs.netlify.app/))

## Future Features

1. Audios.
2. Wagering.
3. Multiple Players.
