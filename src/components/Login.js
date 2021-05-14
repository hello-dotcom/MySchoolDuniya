import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import avatar from '../images/avatar.png';
import '../styles/login.css';
import { API_URL } from '../config/config';
import dashboardCheck from './newNavbar/newnavbar';
class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			password: '',
		};
	}
	login = () => {
		alert('hello');
		let id = document.getElementById('id').value.trim();
		let password = document.getElementById('password').value.trim();
		if (id !== '' && password !== '') {
			console.log('hai');
			const as = localStorage.getItem('as');
			fetch(`${API_URL}/${as}/login`, {
				method: 'POST',
				headers: {
					'Content-Type': 'Application/json',
				},
				body: JSON.stringify({
					id: id,
					password: password,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 400) {
						alert(res.message);
					} else if (res.status === 500) {
						alert('Internal system error');
					} else if (res.status === 200) {
						alert(res.message);
						console.log(res);
						localStorage.setItem('token', 'Bearer ' + res.token);

						if (localStorage.getItem('as') === 'student') {
							localStorage.setItem('profile', JSON.stringify(res.output));
							localStorage.setItem('role', 'Student');
							localStorage.setItem('dashLink', '/home2');
							this.props.history.push('/home2');
						} else if (res.output.role === 'Admin') {
							localStorage.setItem('profile', JSON.stringify(res.output));
							localStorage.setItem('role', res.output.role);
							localStorage.setItem('dashLink', '/home1');
							this.props.history.push('/home1');
						} else if (res.output.role === 'Faculty') {
							localStorage.setItem('profile', JSON.stringify(res.output));
							localStorage.setItem('dashLink', '/home3');
							localStorage.setItem('role', 'Faculty');
							this.props.history.push('/home3');
						}

						dashboardCheck();
					}
				})
				.catch((err) => console.log(err));
		} else {
			console.log('fields are empty');
		}
	};
	render() {
		return (
			<div
				className="container"
				style={{ width: '40%', marginLeft: '30%', marginTop: '120px' }}
			>
				<div className="imgcontainer">
					<img src={avatar} alt="Avatar" className="avatar" />
				</div>
				<div className="inpcontainer">
					<label>Username : </label>
					<input
						type="text"
						placeholder="Enter Username"
						name="username"
						id="id"
						required
						style={{ width: '100%' }}
					/>
					<label>Password : </label>
					<input
						type="password"
						placeholder="Enter Password"
						name="password"
						id="password"
						required
					/>
				</div>
				<div className="btncontainer">
					<button onClick={() => this.login()}>Login</button>
				</div>
				<center>
					<div className="btncontainer">
						<span className="psw forgotP">
							Forgot{' '}
							<a onClick={() => this.props.history.push('/forgotpassword')}>
								password?
							</a>
						</span>
					</div>
				</center>
			</div>
		);
	}
}

export default withRouter(Login);
