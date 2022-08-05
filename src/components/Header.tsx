import React from "react";
import styled from 'styled-components';

const Header = () => {
    return (
        <HeaderWrapper>
            BATTLESHIP
        </HeaderWrapper>
    );
}

const HeaderWrapper = styled.div`
    padding: 3rem;
    font-family: 'Big Shoulders Stencil Text', cursive;
    font-size: 12rem;
    font-weight: 900;
    letter-spacing: 1rem;
    line-height: 1;
    text-align: center;
`

export default Header;