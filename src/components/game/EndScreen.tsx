import React from "react";
import styled from "styled-components";
import Button from "../utilities/button";

interface Props {
	message: string;
	resetGame: () => void;
}

const EndScreen = ({ message, resetGame }: Props) => {
	return (
		<EndScreenWrapper>
			<EndMessage>
				<p>{message}</p>
				<Button content="Play Again" onClick={resetGame} />
			</EndMessage>
			<Overlay />
		</EndScreenWrapper>
	);
};

const EndScreenWrapper = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const EndMessage = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-around;
	width: 500px;
	height: 300px;
	background-color: #eee;
	z-index: 2;
	padding: 2rem;
	border-radius: 15px;
`;

const Overlay = styled.div`
	position: absolute;
	z-index: 1;
	top: 0;
	right: 0;
	width: 100%;
	height: 100%;
	background-color: black;
	opacity: 0.6;
`;

export default EndScreen;
