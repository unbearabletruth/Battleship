# Battleship game
The implementation of a [Battleship](https://en.wikipedia.org/wiki/Battleship_(game)) game. Based on The Odin Project [guide](https://www.theodinproject.com/lessons/node-path-javascript-battleship).
The project aim was to build something fun that can be also challenging. In addition, the goal was to use tests in a real project environment. 
## Specific rules
Two players have ten ships: one which takes 4 cells, two 3 cells long, three 2 cells long and four taking 1 cell. Ships are placed leaving adjacent cells empty. When the enemy ship is sunk it becomes visible.
## How to play
Start the game by clicking the enemy board (right one). Click "New Game" to start a new game. You can enter your nickname by clicking edit icon (pencil above the board). 
## Tools
* html
* css
* javascript ES6
* webpack
* jest
## How to run
* install [node.js](https://nodejs.org/en)
* git clone git@github.com:unbearabletruth/Battleship.git
* cd Battleship
* npm install
* npm run watch
* open up the ./dist/index.html or use a live server
## Computer
* hits inside board
* doesn't shoot twice in the same coordinates
* checks adjacent cells if hit on target in the previous turn 
* doesn't shoot adjacent cells if ship is sunk
