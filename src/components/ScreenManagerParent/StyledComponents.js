import styled from 'styled-components';


export const ButtonsContainer = styled.div`
    align-items: center;
    border-bottom: solid thin var(--colors-border-gray);
    color: var(--colors-white);
    display: flex;
    height: 3.375rem;
    padding: 1rem;
    top: 0.625rem;
    width: 100%;
`;

export const BackButton = styled.button`
    align-items: center;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 0;
    width: 2rem;
    &:focus, &:active {
        outline: none;
        box-shadow: none;
    }
    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`;

export const Content = styled.div`
    height: calc(100% - 3rem);
    color: var(--colors-black);
    position: relative;
    width: 100%;
`;

export const ScreenManagerContainer = styled.div`
    height: 100%;
    width: 100%;
    h4 {
        margin-top: 0;
    }
`;
