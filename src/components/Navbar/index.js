import React from 'react';
import {
	Nav,
	NavLink,
	Bars,
	NavMenu,
	NavBtn,
	NavBtnLink,
} from './NavbarElements';
import './navbarstyles.css';

const Navbar = () => {
	return (
		<>
			<Nav>
				<Bars></Bars>

				<NavMenu>
					<NavLink to="/" activeStyle>
						Home
					</NavLink>
					<NavLink to="/about" activeStyle>
						About
					</NavLink>
					<NavLink to="/events" activeStyle>
						Events
					</NavLink>
					<NavLink to="/notices" activeStyle>
						Notice Board
					</NavLink>
					<NavLink to="/maintainance" activeStyle>
						Maintainance
					</NavLink>
				</NavMenu>

				<NavBtn
					style={{
						marginRight: '70px',
					}}
				>
					<NavBtnLink to="/login">Sign In</NavBtnLink>
				</NavBtn>
			</Nav>
		</>
	);
};

export default Navbar;
