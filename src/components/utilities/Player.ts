import GameBoard from "./GameBoard";

class Player {
	name: string;
	hitCords: number[][];

	constructor(name: string) {
		this.name = name;
		this.hitCords = [];
	}

	attack(positionX: number, positionY: number, gameboard: GameBoard) {
		if (this.hasHit(positionX, positionY)) return;

		this.hitCords.push([positionX, positionY]);
		gameboard.receiveAttack(positionX, positionY);
	}

	randomAttack(gameboard: GameBoard) {
		if (this.hasHit.length === 100) return;

		let positionX = Math.floor(Math.random() * 10);
		let positionY = Math.floor(Math.random() * 10);

		while (this.hasHit(positionX, positionY)) {
			positionX = Math.floor(Math.random() * 10);
			positionY = Math.floor(Math.random() * 10);
		}

		this.hitCords.push([positionX, positionY]);
		gameboard.receiveAttack(positionX, positionY);
	}

	hasHit(positionX: number, positionY: number) {
		for (let i = 0; i < this.hitCords.length; i++) {
			if (
				this.hitCords[i][0] === positionX &&
				this.hitCords[i][1] === positionY
			)
				return true;
		}
		return false;
	}
}

export default Player;
