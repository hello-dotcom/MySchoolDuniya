import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/addTeacher.css';
import axios from 'axios';
import { API_URL } from '../config/config';
class AddTeacher extends Component {
	constructor(props) {
		super(props);
		this.state = {
			id: '',
			name: '',
			parent_name: '',
			email: '',
			password: '',
			subject: '',
			dob: '',
			phone: '',
			address: '',
			qualification: '',
			role: 'Admin',
			load_file: 0,
			file: '',
			stored_file: 0,
			filename: '',
		};
	}
	handleChange = (event) => {
		let name = event.target.name;
		if (name !== 'file') {
			this.setState({
				...this.state,
				[name]: event.target.value,
			});
		} else {
			this.setState({
				...this.state,
				[name]: event.target.files[0],
				load_file: 1,
			});
		}
	};
	addFaculty = () => {
		const {
			id,
			name,
			password,
			address,
			phone,
			email,
			qualification,
			subject,
			dob,
			role,
			parent_name,
			file,
		} = this.state;
		const phoneregex = /^[1-9][0-9]{9}$/;
		const emailregex = /^([a-z-9A-Z\.-]+)@([a-z0-9A-Z-]+)\.([a-z]{2,8})(.[a-z]{2,8})?$/;
		const passwordregex = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+()]).{8,20}$/;
		if (
			id.trim() === '' ||
			name.trim() === '' ||
			password.trim() === '' ||
			address.trim() === '' ||
			phone.trim() === '' ||
			email.trim() === '' ||
			qualification.trim() === '' ||
			subject.trim() === '' ||
			dob.trim() === '' ||
			role.trim() === '' ||
			parent_name.trim() === ''
		) {
			alert("fields can't be empty");
			return;
		} else if (!id.startsWith('Fac') || id.length !== 7) {
			alert('id is incorrect');
			return;
		} else if (!phoneregex.test(phone)) {
			alert('phone number is not valid');
			return;
		} else if (!emailregex.test(email)) {
			alert('email is not valid');
			return;
		} else if (!passwordregex.test(password)) {
			alert(
				'password must have a number, one uppercase ,one lower case letter and one special character'
			);
			return;
		} else if (this.state.load_file == 0) {
			alert('image uploading is required');
			return;
		} else {
			const form = new FormData();
			form.append('file', this.state.file);
			axios
				.post(`${API_URL}/upload`, form, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then((res) => {
					const fl = res.data.file.filename;
					fetch(`${API_URL}/admin/newone`, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: localStorage.getItem('token'),
						},
						body: JSON.stringify({
							id: id,
							name: name,
							password: password,
							address: address,
							email: email,
							phone: phone,
							subject: subject,
							qualification: qualification,
							dob: dob,
							parent_name: parent_name,
							role: role,
							filename: fl,
						}),
					})
						.then((res) => res.json())
						.then((res) => {
							if (res.status === 401) {
								localStorage.clear('token');
								localStorage.clear('role');
								this.props.history.push('/');
							} else if (res.status === 400) {
								alert(res.message);
							} else if (res.status === 200) {
								alert(res.message);
								this.props.history.push('/');
							}
						})
						.catch((err) => console.log(err));
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		return (
			<div className="container" style={{ marginTop: '100px' }}>
				<center>
					<h2>Add Teacher Form</h2>
				</center>
				<input
					type="text"
					placeholder="Enter Id"
					name="id"
					id="id"
					value={this.state.id}
					onChange={this.handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Enter Fullname"
					name="name"
					value={this.state.name}
					onChange={this.handleChange}
					id="name"
					required
				/>
				<input
					type="text"
					placeholder="Enter Parent's name"
					name="parent_name"
					value={this.state.parent_name}
					onChange={this.handleChange}
					id="parent_name"
					required
				/>
				<input
					type="text"
					placeholder="Enter Email"
					name="email"
					id="email"
					value={this.state.email}
					onChange={this.handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Enter Address"
					name="address"
					id="address"
					value={this.state.address}
					onChange={this.handleChange}
					required
				/>
				<input
					type="text"
					placeholder="Enter Phone No"
					name="phone"
					value={this.state.phone}
					onChange={this.handleChange}
					id="phone"
					required
				/>

				<label>Date Of Birth : </label>
				<input
					type="date"
					id="dob"
					name="dob"
					min="1950-01-01"
					max="2018-12-31"
					value={this.state.dob}
					onChange={this.handleChange}
				/>
				<input
					type="text"
					placeholder="Enter Qualification"
					name="qualification"
					value={this.state.qualification}
					onChange={this.handleChange}
					id="qualification"
					required
				/>
				<input
					type="text"
					placeholder="Enter Subject"
					name="subject"
					value={this.state.subject}
					onChange={this.handleChange}
					id="subject"
					required
				/>
				<input
					type="password"
					placeholder="Enter Password"
					name="password"
					id="password"
					value={this.state.password}
					onChange={this.handleChange}
					required
				/>
				<label for="role">Role : </label>
				<select
					id="role"
					name="role"
					required
					value={this.state.role}
					onChange={this.handleChange}
				>
					<option value="Admin">Admin</option>
					<option value="Faculty">Faculty</option>
				</select>
				<br></br>
				<label for="file">Upload Image :</label>
				<input
					type="file"
					id="file"
					name="file"
					required
					onChange={this.handleChange}
				></input>

				<div className="btncontainer">
					<button type="submit" onClick={() => this.addFaculty()}>
						Add
					</button>
				</div>
			</div>
		);
	}
}
export default withRouter(AddTeacher);
