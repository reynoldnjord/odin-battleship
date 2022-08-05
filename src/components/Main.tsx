import React from "react";
import styled from 'styled-components';
import GameScreen from "./game/GameScreen";

const Main = () => {
    return (
        <MainWrapper>
            <GameScreen />
        </MainWrapper>
    );
}

const MainWrapper = styled.div`
    padding: 3rem;
`

export default Main;