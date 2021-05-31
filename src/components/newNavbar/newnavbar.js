import React, { Component } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

class NavbarPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
			displayVal: 'none',
			loginToggler: 'unset',
			dashLink: '/',
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
					dashLink: localStorage.getItem('dashLink'),
				});
				// console.log(`comp mounted displayVal = ${this.state.displayVal}`);
			}
		}, 10);
	}

	render() {
		return (
			<Navbar
				expand="lg"
				style={{
					width: '100%',
					justifyContent: 'space-between',
					backgroundColor: '#05F636',
					// '#2180DE'
					minHeight: '100px',
					position: 'fixed',
					top: 0,
					left: 0,
					zIndex: 12,
					color: 'blue',
				}}
			>
				<Navbar.Brand
					style={{
						padding: '0.5rem 0.5rem',
						fontWeight: '600',
						color: 'honeydew',
						fontSize: '1.7rem',
					}}
					href="/"
				>
					SMS
				</Navbar.Brand>
				<Navbar.Toggle
					style={{
						maxWidth: '55px',
						color: 'white',
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
								color: 'white',
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.4rem',
							}}
							href="/"
						>
							Home
						</Nav.Link>
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								color: 'white',
								fontSize: '1.4rem',
							}}
							href="/about"
						>
							About
						</Nav.Link>
						<Nav.Link
							style={{
								padding: '0.5rem 0.5rem',
								color: 'white',
								fontWeight: '600',
								fontSize: '1.4rem',
							}}
							href="/events"
						>
							Events
						</Nav.Link>
						<Nav.Link
							style={{
								color: 'white',
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								fontSize: '1.4rem',
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
								color: 'white',
								fontSize: '1.4rem',
							}}
							href={this.state.dashLink}
						>
							Dashboard
						</Nav.Link>

						{/* <Nav.Link
							style={{
								display: this.state.displayVal,
								padding: '0.5rem 0.5rem',
								fontWeight: '600',
								color: 'white',
								fontSize: '1.4rem',
							}}
							href="/maintainance"
						>
							Maintainance
						</Nav.Link> */}
					</Nav>
					<NavDropdown
						style={{
							display: this.state.loginToggler,
							position: 'end',
							padding: 'auto',
							margin: 'auto',
							color: 'blue',
							backgroundColor: 'honeydew',
							borderRadius: '15px',
							fontWeight: '600',
							fontSize: '1.4rem',
							// paddingRight: '-100px',
							marginRight: '-100px',
						}}
						title="Login"
						// id="basic-nav-dropdown"
					>
						<NavDropdown.Item
							style={{
								color: 'blue',
								fontSize: '1.2rem',
								fontWeight: '600',
							}}
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
							style={{
								color: 'blue',
								fontSize: '1.2rem',
								fontWeight: '600',
							}}
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
							style={{
								color: 'blue',
								fontSize: '1.2rem',
								fontWeight: '600',
							}}
							href="/login"
							onClick={() => {
								localStorage.setItem('as', 'admin');
								this.props.history.push('/login');
							}}
						>
							Admin
						</NavDropdown.Item>
					</NavDropdown>
					<Nav className="mr-auto">
						<Nav.Link
							style={{
								display: this.state.displayVal,
								color: 'white',
								padding: '0.5rem',
								fontWeight: '600',
								fontSize: '1.4rem',
								marginRight: '-100px',
							}}
							href="/Logout"
						>
							Logout
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default NavbarPage;
