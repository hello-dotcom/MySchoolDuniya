import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
	background: aqua;
	min-height: 85px;
	display: flex;
	justify-content: space-between;
	padding: 0.2rem calc((100vw - 1000px) / 2);
	z-index: 12;
	position: fixed;
	width: 100%;
	top: 0;
	left: 0;
	/* Third Nav */
	/* justify-content: flex-start; */
	@media screen and (max-width: 768px) {
		flex-direction: column;
		align-items: flex-start;
		width: 100%;
	}
`;

export const NavLink = styled(Link)`
	color: #808080;
	display: flex;
	align-items: center;
	text-decoration: none;
	padding: 0.3rem 1rem;
	height: 100%;
	cursor: pointer;
	&.active {
		color: #000000;
	}
	@media screen and (max-width: 768px) {
		width: 100%;
		text-align: center;
		// text-align: center;
	}
`;

export const Bars = styled(FaBars)`
	display: none;
	color: red;
	// border: 2px solid red;
	// border-radius: 5px;
	@media screen and (max-width: 768px) {
		display: block;
		position: absolute;
		top: 0.75rem;
		right: 1rem;
		transform: translate(-100%, 75%);
		font-size: 1.8rem;
		cursor: pointer;
	}
`;

export const NavMenu = styled.div`
	display: flex;
	align-items: center;
	margin-right: -24px;
	/* Second Nav */
	/* margin-right: 24px; */
	/* Third Nav */
	/* width: 100vw;
white-space: nowrap; */
	@media screen and (max-width: 768px) {
		display: none;
		flex-direction: column;
		text-align: center;
		.active {
			display: flex;
		}
	}
`;

export const NavBtn = styled.nav`
	display: flex;
	align-items: center;
	margin-right: 24px;
	/* Third Nav */
	/* justify-content: flex-end;
width: 100vw; */
	@media screen and (max-width: 768px) {
		display: none;
	}
`;

export const NavBtnLink = styled(Link)`
	border-radius: 4px;
	background: #808080;
	padding: 10px 22px;
	color: #000000;
	outline: none;
	border: none;
	cursor: pointer;
	transition: all 0.2s ease-in-out;
	text-decoration: none;
	/* Second Nav */
	margin-left: 24px;
	&:hover {
		transition: all 0.2s ease-in-out;
		background: #fff;
		color: #808080;
	}
`;
