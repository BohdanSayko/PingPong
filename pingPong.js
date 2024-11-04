class Player {
    constructor(name, activeHand) {
        this.name = name;
        this.activeHand = activeHand;
        this.actions = ['hit', 'miss'];
    }

    serve() {
        console.log(`${this.name} serves`);
    }

    hit() {
        console.log(`${this.name} hit the ball`);
    }

    miss() {
        console.log(`${this.name} missed`);
    }

    getRandomAction() {
        let randomIndex = Math.floor(Math.random() * this.actions.length);
        return randomIndex;
    }
}

class ScoreBoard {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.scores = { [player1.name]: 0, [player2.name]: 0 };
    }

    addPoint(player) {
        this.scores[player.name]++;
    }

    displayScore() {
        console.log(`${this.player1.name}: ${this.scores[this.player1.name]}\n${this.player2.name}: ${this.scores[this.player2.name]}`);
    }

    hasWinner() {
        return this.scores[this.player1.name] === 21 || this.scores[this.player2.name] === 21;
    }

    getWinner() {
        if (this.scores[this.player1.name] === 21) {
            console.log(`${this.player1.name} is the winner!`);
        } else if (this.scores[this.player2.name] === 21) {
            console.log(`${this.player2.name} is the winner!`);
        }
    }
}

class GameEngine {
    constructor(player1, player2) {
        this.player1 = player1;
        this.player2 = player2;
        this.scoreBoard = new ScoreBoard(player1, player2);
        this.currentPlayer = player1;
        this.opponentPlayer = player2;
    }

    play() {
        this.currentPlayer.serve();

        while (!this.scoreBoard.hasWinner()) {
            if (this.opponentPlayer.actions[this.opponentPlayer.getRandomAction()] === 'hit') {
                this.opponentPlayer.hit();
                this.scoreBoard.addPoint(this.opponentPlayer);
            } else if (this.opponentPlayer.actions[this.opponentPlayer.getRandomAction()] === 'miss') {
                this.opponentPlayer.miss();
                this.scoreBoard.addPoint(this.currentPlayer);
            }

            this.scoreBoard.displayScore();
            console.log("\n");

            let temp = this.currentPlayer;
            this.currentPlayer = this.opponentPlayer;
            this.opponentPlayer = temp;
        }

        this.scoreBoard.getWinner();
    }
}

const player1 = new Player('Mark', 'right');
const player2 = new Player('Carl', 'left');
const engine = new GameEngine(player1, player2);

engine.play();
