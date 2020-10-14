import Styled from "styled-components";

export const ButtonTest = Styled.button`
	outline: 0;
	border: 0;
	text-transform: uppercase;
	padding: 16px 48px;
	border-radius: 24px;
	font-family: sans-serif;
	font-weight: bold;
	font-size: 14px;
	cursor: pointer;
	transition: all ease-in .2s;

	&.primary {
		background-color: #1ED760;
		color: white;
	}
	
	&.primary:hover {
		background-color: #4bdf80;
	}
	
	&.secondary {
		background-color: white;
		color: black;
		box-shadow: 0 0 0 2px black inset;
	}
	
	&.secondary:hover {
		background-color: black;
		color: white;
	}
`;
