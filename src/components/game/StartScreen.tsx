import React, { useState } from "react";
import styled, { css } from "styled-components";
import Ship from "../utilities/Ship";
import GameBoard from "../utilities/GameBoard";
import Button from "../utilities/button";
import { v4 as uuidv4 } from "uuid";

interface Props {
	gameBoard: GameBoard;
	setPlayerBoard: (gameBoard: GameBoard) => void;
	setStartGame: (starGame: boolean) => void;
}

const StartScreen = ({ gameBoard, setPlayerBoard, setStartGame }: Props) => {
	const ships = [
		new Ship(5),
		new Ship(4),
		new Ship(3),
		new Ship(3),
		new Ship(2),
	];

	const shipNames = [
		"Carrier",
		"Battleship",
		"Destroyer",
		"Submarine",
		"Patrol Boat",
	];

	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentShipName, setCurrentShipName] = useState(shipNames[0]);
	const [currentShip, setCurrentShip] = useState(ships[0]);
	const [isVertical, setIsVertical] = useState(false);

	const toggleRotate = () => {
		setIsVertical(!isVertical);
	};

	const onBoardClick = (row: number, column: number) => {
		let gameBoardCopy: GameBoard = Object.assign(
			Object.create(Object.getPrototypeOf(gameBoard)),
			gameBoard
		);

		if (
			!gameBoardCopy.isPlacementPossible(currentShip, row, column, isVertical)
		)
			return;

		gameBoardCopy.placeShip(currentShip, row, column, isVertical);
		setPlayerBoard(gameBoardCopy);
		setCurrentIndex(currentIndex + 1);
		setCurrentShip(ships[currentIndex + 1]);
		setCurrentShipName(shipNames[currentIndex + 1]);

		if (currentIndex > 3) {
			setStartGame(true);
		}
	};

	const loadFields = () => {
		const fields = [];
		for (let row = 0; row < gameBoard.board.length; row++) {
			for (let column = 0; column < gameBoard.board[row].length; column++) {
				fields.push(
					<Field
						key={uuidv4()}
						isFilled={gameBoard.board[row][column] ? true : false}
						onClick={() => onBoardClick(row, column)}
					>
						<FieldHover
							shipLength={currentShip.length}
							isVertical={isVertical}
						/>
					</Field>
				);
			}
		}
		return fields;
	};

	return (
		<StartScreenWrapper>
			<StartWindow>
				<p>
					<strong>Welcome to Battleship</strong>
				</p>
				<p>
					Place your <u>{currentShipName}</u>
				</p>
				<Button onClick={toggleRotate} content="Rotate" />
				<Board>{loadFields()}</Board>
			</StartWindow>
			<Overlay />
		</StartScreenWrapper>
	);
};

const StartScreenWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	font-size: 3rem;
`;
const StartWindow = styled.div`
	position: relative;
	z-index: 2;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	width: 50rem;
	height: 80rem;
	padding: 5rem;
	background-color: #f5f5f5;
`;

const Board = styled.div`
	display: grid;
	grid-template-columns: repeat(10, 4rem);
	grid-template-rows: repeat(10, 4rem);
	width: 40rem;
	height: 40rem;
	border: 0.1rem solid #222;
`;
interface IField {
	isFilled: boolean;
}

const Field = styled.div<IField>`
	border: 0.1rem solid #222;
	cursor: pointer;

	${({ isFilled }) =>
		isFilled &&
		css`
			background-color: #444;
		`}
`;

interface IFieldHover {
	shipLength: number;
	isVertical: boolean;
}

const FieldHover = styled.div<IFieldHover>`
	position: relative;
	height: 3.8rem;
	width: 3.8rem;

	&:hover {
		background-color: #85ffb5;

		${({ isVertical, shipLength }) =>
			!isVertical &&
			css`
				width: calc(3.8rem+ 4rem * ${shipLength - 1});
			`}

		${({ isVertical, shipLength }) =>
			!isVertical &&
			css`
				height: calc() (3.8rem + 4rem * ${shipLength - 1});
			`}
	}
`;

const Overlay = styled.div`
	position: absolute;
	z-index: 1;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
	background-color: black;
	opacity: 0.6;
`;

export default StartScreen;
