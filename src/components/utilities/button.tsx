import React from "react";
import styled from 'styled-components'

interface props {
    content: string;
    onClick: () => void;
}

const Button = ({content, onClick}:props) => {
    return (
        <ButtonWrapper onClick={onClick}>{content}</ButtonWrapper>
    );
}

const ButtonWrapper = styled.button`
    border-radius: 15px;
    background-color: #36454f;
    color: #f5f5f5;
    transition: transform 0.1s ease-in-out;
    cursor: pointer;

    &:hover {
        transform: scale(1.03);
    }
`

export default Button;