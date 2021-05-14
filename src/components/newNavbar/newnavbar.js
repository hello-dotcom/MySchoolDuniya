import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavbarPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			displayVal: 'none',
			loginToggler: 'unset',
		};
	}
	componentDidMount() {
		// console.log(`comp mounted displayVal = ${this.state.displayVal}`);
		setInterval(() => {
			if (localStorage.getItem('token') === null) {
				this.setState({
					...this.state,
					displayVal: 'none',
					loginToggler: 'unset',
				});
				// console.log(`comp mounted displayVal = ${this.state.displayVal}`);
			} else {
				this.setState({
					...this.state,
					displayVal: 'unset',
					loginToggler: 'none',
				});
				// console.log(`comp mounted displayVal = ${this.state.displayVal}`);
			}
		}, 3 * 1000);
	}

	render() {
		return (
			<Navbar
				expand="lg"
				style={{
					width: '100%',
					justifyContent: 'space-between',
					backgroundColor: 'aqua',
					minHeight: '100px',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 12,
				}}
			>
				<Navbar.Brand
					style={{
						padding: '0.5rem 0.5rem',
						fontWeight: '600',
						fontSize: '1.5rem',
					}}
					href="/"
				>
					SMS
				</Navbar.Brand>
				<Navbar.Toggle
					style={{
						maxWidth: '55px',
						position: 'end',
						justifyContent: 'center',
						marginRight: '50px',
					}}
					aria-controls="basic-navbar-nav"
				/>
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="mr-auto">
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/"
						>
							Home
						</Nav.Link>
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/about"
						>
							About
						</Nav.Link>
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/events"
						>
							Events
						</Nav.Link>
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/notices"
						>
							Notice Board
						</Nav.Link>
						<Nav.Link
							style={{
								display: this.state.displayVal,
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/Logout"
						>
							Logout
						</Nav.Link>
						<Nav.Link
							style={{
								display: this.state.displayVal,
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.2rem',
							}}
							href="/maintainance"
						>
							Dashboard
						</Nav.Link>
					</Nav>
					<NavDropdown
						style={{
							display: this.state.loginToggler,
							position: 'end',
							padding: 'auto',
							margin: 'auto',
							fontWeight: '600',
							fontSize: '1.2rem',
						}}
						title="Login"
						id="basic-nav-dropdown"
					>
						<NavDropdown.Item
							href="/login"
							onClick={() => {
								localStorage.setItem('as', 'student');
								this.props.history.push('/login');
							}}
						>
							Student
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							href="/login"
							onClick={() => {
								localStorage.setItem('as', 'admin');
								this.props.history.push('/login');
							}}
						>
							Faculty
						</NavDropdown.Item>
						<NavDropdown.Divider />
						<NavDropdown.Item
							href="/login"
							onClick={() => {
								localStorage.setItem('as', 'admin');
								this.props.history.push('/login');
							}}
						>
							Admin
						</NavDropdown.Item>
					</NavDropdown>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarPage;
