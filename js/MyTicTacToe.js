import { Utils } from "../utils/Utils.js";

export class MyTicTacToe extends Utils {
	constructor() {
		super();
		this.currentPlayer;
		this.plays;
		this.x = 0; //x score
		this.o = 0; //o score
		this.gameContainerEl = document.querySelector(".game-container");
		this.boxesEl = this.gameContainerEl.querySelectorAll(".box");
		this.currentPlayerEl =
			this.gameContainerEl.querySelector(".current-player");
		this.resultEl = this.gameContainerEl.querySelector(".result");
		this.audios = {
			pop: {
				path: "./sound/pop.wav",
			},
			win: {
				path: "./sound/win_short.wav",
			},
			draw: {
				path: "./sound/fail_drum.mp3",
			},
			click: {
				path: "./sound/click.mp3",
			},
		};
		this.init();
	}
	init() {
		this.showMenu();
		this.createAudios(this.audios);
		this.boxesEl.forEach((box, idx) => {
			box.addEventListener("click", () => this.checkBox(box, idx));
		});
		this.gameContainerEl
			.querySelector(".start")
			.addEventListener("click", () => {
				this.playAudio(this.audios.click);
				this.startGame();
			});
		this.gameContainerEl.querySelector(`div[data-x]`).textContent = this.x;
		this.gameContainerEl.querySelector(`div[data-o]`).textContent = this.o;
	}
	startGame() {
		this.plays = new Array(this.boxesEl.length).fill(false);
		this.currentPlayer = "o";
		this.changePlayer();
		this.boxesEl.forEach((box) => (box.className = "box"));
		this.hideMenu();
	}
	showMenu() {
		this.gameContainerEl.classList.add("blocked");
	}
	hideMenu() {
		this.gameContainerEl.classList.remove("blocked");
	}
	checkBox(box, idx) {
		if (!this.plays[idx]) {
			this.playAudio(this.audios.pop);
			setTimeout(() => {
				this.plays[idx] = this.currentPlayer;
				box.classList.add(this.currentPlayer);
				this.checkVictory(idx);
			}, 150);
		}
	}
	changePlayer() {
		if (!this.plays.some((play) => !play)) this.gameOver();
		this.currentPlayerEl.classList.remove(this.currentPlayer);
		this.currentPlayer = this.currentPlayer === "x" ? "o" : "x";
		this.currentPlayerEl.classList.add(this.currentPlayer);
	}
	checkVictory(idx) {
		const winLine =
			this.checkHorinzontal(idx) ||
			this.checkVertical(idx) ||
			this.checkDiagonal();
		return winLine ? this.gameOver(winLine) : this.changePlayer();
	}
	gameOver(winLine) {
		let audio;
		if (winLine) {
			winLine.forEach((box) => box.classList.add("win"));
			audio = this.audios.win;
			this.resultEl.innerHTML = `<div class="${this.currentPlayer}"></div> <h3>venceu!</h3>`;
			this.gameContainerEl.querySelector(
				`div[data-${this.currentPlayer}]`
			).textContent = ++this[this.currentPlayer];
		} else {
			audio = this.audios.draw;
			this.resultEl.innerHTML = "<h3>Empate!</h3>";
		}
		setTimeout(() => this.playAudio(audio), 150);
		this.gameContainerEl.classList.add("blocked");
	}
	checkHorinzontal(idx) {
		if ((idx + 1) % 3 === 0) {
			return this.plays[idx] === this.plays[idx - 1] &&
				this.plays[idx] === this.plays[idx - 2]
				? [this.boxesEl[idx], this.boxesEl[idx - 1], this.boxesEl[idx - 2]]
				: false;
		}
		return this.checkHorinzontal(idx + 1);
	}
	checkVertical(idx) {
		if (idx + 1 <= 3) {
			return this.plays[idx] === this.plays[idx + 3] &&
				this.plays[idx] === this.plays[idx + 2 * 3]
				? [this.boxesEl[idx], this.boxesEl[idx + 3], this.boxesEl[idx + 2 * 3]]
				: false;
		}
		return this.checkVertical(idx - 3);
	}
	checkDiagonal() {
		return (
			this.plays[4] &&
			(this.plays[2] === this.plays[4] && this.plays[2] === this.plays[6]
				? [this.boxesEl[2], this.boxesEl[4], this.boxesEl[6]]
				: this.plays[0] === this.plays[4] && this.plays[0] === this.plays[8]
				? [this.boxesEl[0], this.boxesEl[4], this.boxesEl[8]]
				: false)
		);
	}
}
