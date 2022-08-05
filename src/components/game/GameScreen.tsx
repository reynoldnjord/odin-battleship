import React, { useEffect, useState } from "react";
import styled from 'styled-components';
import GameBoard from "../utilities/GameBoard";
import StartScreen from "./StartScreen";
import EndScreen from "./EndScreen";
import Player from "../utilities/Player";
import Board from "./Board";

const GameScreen = () => {
    const [player, setPlayer] = useState(new Player('Player'));
    const [playerBoard, setPlayerBoard] = useState(new GameBoard());
    const [computer, setComputer] = useState(new Player('Computer'));
    const [computerBoard, setComputerBoard] = useState(new GameBoard());
    const [startGame, setStartGame] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [winnerMessage, setWinnerMessage] = useState('');

    useEffect(() => {
        const randomBoard = new GameBoard();
        randomBoard.placeShipRandom();
        setComputerBoard(randomBoard);
    }, []);

    const resetGame = () => {
        setPlayer(new Player('Player'));
        setPlayerBoard(new GameBoard());
        setComputer(new Player('Computer'));
        setComputerBoard(new GameBoard());
        setStartGame(false);
        setGameOver(false);
    }

    const handleBoardClick = (positionX: number, positionY: number) => {
        if (player.hasHit(positionX, positionY)) return

        let playerClone: Player = Object.assign(
            Object.create(Object.getPrototypeOf(player)),
            player
        )

        let computerClone: Player = Object.assign(
            Object.create(Object.getPrototypeOf(computer)),
            computer
        )

        let playerBoardClone: GameBoard = Object.assign(
            Object.create(Object.getPrototypeOf(playerBoard)),
            playerBoard
        )

        let computerBoardClone: GameBoard = Object.assign(
            Object.create(Object.getPrototypeOf(computerBoard)),
            computerBoard
        )

        playerClone.attack(positionX, positionY, computerBoardClone);
        setPlayer(playerClone);
        setComputerBoard(computerBoardClone);
        if (computerBoard.isGameOver()) {
            setWinnerMessage('You Won')
            setGameOver(true);
            return;
        }

        computerClone.randomAttack(playerBoardClone);
        setComputer(computerClone);
        setComputerBoard(computerBoardClone);
        if (playerBoard.isGameOver()) {
            setWinnerMessage('Computer Won');
            setGameOver(true);
            return
        }
    }

    return (
        <GameScreenWrapper>
            {startGame ? (
                ''
            ) : (
                <StartScreen 
                    gameBoard={playerBoard}
                    setPlayerBoard={setPlayerBoard}
                    setStartGame={setStartGame} 
                />
            )}
            {gameOver ? (
                <EndScreen 
                    message={winnerMessage} 
                    resetGame={resetGame}
                />
            ) : (
                ""
            )}
            <Boards>
                <Board gameboard={playerBoard} owner={player} enemy={computer}></Board>
                <Board gameboard={computerBoard} owner={computer} enemy={player} onFieldClick={handleBoardClick}></Board>
            </Boards>
        </GameScreenWrapper>
    );
}

const GameScreenWrapper = styled.div`
    margin-top: 5rem;
    font-size: 5rem;
`

const Boards = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5rem;

`

export default GameScreen;