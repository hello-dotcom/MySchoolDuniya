import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import avatar from '../images/avatar.png';
import '../styles/login.css';
import { API_URL } from '../config/config';
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
					console.log(res);
					if (res.status === 400) {
						alert(res.message);
					} else if (res.status === 500) {
						alert('Internal system error');
					} else if (res.status === 200) {
						alert(res.message);
						localStorage.setItem('token', 'Bearer ' + res.token);
						if (res.output.role==='Admin') {
							localStorage.setItem('profile',JSON.stringify(res.output));
							localStorage.setItem('role',res.output.role);
							this.props.history.push('/home1');
						} else {
							this.props.hisotry.push('/upload');
						}
					}
				})
				.catch((err) => console.log(err));
		} else {
			console.log('fields are empty');
		}
	};
	render() {
		return (
			// <form onSubmit="">
			// <div className="form-forms ">
			//     <div className="imgcontainer">
			//         <img src={avatar} alt="Avatar" className="avatar" />
			//     </div>
			//     <div className="container">
			//         <label>Username : </label>
			//         <input
			//         type="text"
			//         placeholder="Enter Username"
			//         name="username"
			//         id="id"
			//         required
			//         />
			//         <label>Password : </label>
			//         <input
			//         type="password"
			//         placeholder="Enter Password"
			//         name="password"
			//         id="password"
			//         required
			//         />
			//     </div>
			//     <div className="btncontainer">
			//         <button  onClick={()=>this.login()}>Login</button>
			//     </div>
			//     <center>
			//         <div className="container">
			//         <span className="psw">Forgot <a href="/">password?</a></span>
			//         </div>
			//     </center>

			// </div>
			//   </form>
			<div className="container">
				<div className="imgcontainer">
					<img src={avatar} alt="Avatar" className="avatar" />
				</div>
				 {/* <div className=""> */}
					<div className="row">
						<label className="col-4">Username : </label>
						<input
							className="col-6"
							type="text"
							placeholder="Enter Username"
							name="username"
							id="id"
							required
						/>
					</div>
					<div className="row">
						<label className="col-4">Password : </label>
						<input
							className="col-6"
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
					<div className="btncontainer">
						<span className="psw">
							Forgot <a href="/">password?</a>
						</span>
					</div>
				{/* </div> */}
			</div>
		);
	}
}

export default withRouter(Login);
