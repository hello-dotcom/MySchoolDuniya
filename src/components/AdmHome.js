import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/admHome.css';
import { API_URL } from '../config/config';
import AddTeacher from './AddTeacher';
import AddStudent from './AddStudent';
import AddClass from './AddClass';
import AddSubject from './AddSubject';
import ProcessLeave from './ProcessLeave';
import Attendance from './Attendance';
import Results from './Results';
import NewChat from './NewChat';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';
class AdmHome extends Component {
	constructor(props) {
		super(props);
		this.state = {
			display: '',
			load_file: 0,
			notice_file: '',
			filename: 'empty',
			set: 0,
		};
	}
	setDisplay = (value) => {
		this.setState(
			{
				display: value,
			},
			() => {
				if (value === 'profile') {
					this.getImage();
				} else {
					this.setState({
						load_file: 0,
						set: 0,
						filename: 'empty',
					});
				}
			}
		);
	};
	getImage = async () => {
		const buffer = await fetch(
			`${API_URL}/getfiles/${
				JSON.parse(localStorage.getItem('profile')).filename
			}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		)
			.then((res) => res.arrayBuffer())
			.catch((err) => -1);
		if (buffer !== -1) {
			const imgg = document.getElementById('profilepic');
			imgg.src = URL.createObjectURL(
				new Blob([buffer], { type: 'image/jpeg' })
			);
			imgg.width = 300;
			imgg.height = 300;
			// document.getElementById('profilepic').appendChild(imgg);
		}
		this.setState();
	};
	addNotice = () => {
		const heading = document.getElementById('heading').value;
		const message = document.getElementById('message').value;
		if (heading.trim() !== '' && message.trim() !== '') {
			if (this.state.load_file === 1) {
				const form = new FormData();
				form.append('file', this.state.notice_file);
				axios
					.post(`${API_URL}/upload`, form, {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
					})
					// .then(res=>res.json())
					.then((res) => {
						console.log(res);
						const fl = res.data.file.filename;
						fetch(`${API_URL}/admin/notice`, {
							method: 'POST',
							headers: {
								Authorization: localStorage.getItem('token'),
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								heading: heading,
								message: message,
								filename: fl,
							}),
						})
							.then((res) => res.json())
							.then((res) => {
								if (res.status === 401) {
									alert(res.message);
									localStorage.clear('token');
									this.props.history.push('/');
								} else if (res.status === 400) {
									alert(res.message);
								} else if (res.status === 200) {
									alert(res.message);
									this.props.history.push('/notices');
								}
							})
							.catch((err) => console.log(err));
					})
					.catch((err) => console.log(err));
			} else {
				fetch(`${API_URL}/admin/notice`, {
					method: 'POST',
					headers: {
						Authorization: localStorage.getItem('token'),
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						heading: heading,
						message: message,
						filename: 'empty',
					}),
				})
					.then((res) => res.json())
					.then((res) => {
						if (res.status === 400) {
							alert(res.message);
						} else if (res.status === 401) {
							alert(res.message);
							localStorage.clear('token');
							this.props.history.push('/');
						} else if (res.status === 500) {
							alert('Internal Server Error, Please try after some time');
						} else if (res.status === 200) {
							alert(res.message);
							this.props.history.push('/notices');
						}
					})
					.catch((err) => console.log(err));
			}
		} else {
			alert("fields can't be empty");
		}
	};
	onChangeHandler = (event) => {
		// console.log(event.target.files[0]);
		this.setState({
			...this.state,
			load_file: 1,
			notice_file: event.target.files[0],
		});
	};
	render() {
		return localStorage.getItem('token') !== null ? (
			<div style={{ marginTop: '100px' }}>
				<div className="d-flex row">
					<div className="col-3">
						<div
							style={{
								backgroundColor: 'honeydew',
								padding: '10px',
								margin: '10px',
							}}
						>
							<Tab.Container
								id="list-group-tabs-example"
								defaultActiveKey="#profile"
							>
								<Row>
									<Col sm={11}>
										<ListGroup
											style={{
												color: 'red',
											}}
										>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
													borderRadius: '5px',
												}}
												href="#profile"
												onClick={() => {
													this.setDisplay('profile');
												}}
											>
												Profile
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#notice"
												onClick={() => {
													this.setDisplay('notice');
												}}
											>
												Notice
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#student"
												onClick={() => {
													this.setDisplay('student');
												}}
											>
												Student
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#faculty"
												onClick={() => {
													this.setDisplay('faculty');
												}}
											>
												Faculty
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#class"
												onClick={() => {
													this.setDisplay('class');
												}}
											>
												Class
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#subject"
												onClick={() => {
													this.setDisplay('subject');
												}}
											>
												subject
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#processleave"
												onClick={() => {
													this.setDisplay('processleave');
												}}
											>
												Process Leave
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#attendance"
												onClick={() => {
													this.setDisplay('attendance');
												}}
											>
												Attendance
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													color: 'red',
													letterSpacing: '0.5px',
													borderRadius: '5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#results"
												onClick={() => {
													this.setDisplay('results');
												}}
											>
												Results
											</ListGroup.Item>
											<ListGroup.Item
												action
												style={{
													borderRadius: '5px',
													color: 'red',
													letterSpacing: '0.5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#chat"
												onClick={() => {
													this.setDisplay('chat');
												}}
											>
												Chat
											</ListGroup.Item>
										</ListGroup>
									</Col>
								</Row>
							</Tab.Container>
						</div>
					</div>
					<div className="col-9">
						<div>
							{this.state.display === 'profile' ? (
								<div className="profileContainer row ">
									<div className="col-8">
										<h4 className="profile_field">
											Id:{JSON.parse(localStorage.getItem('profile')).id}
										</h4>
										<h4 className="profile_field">
											Name:{JSON.parse(localStorage.getItem('profile')).name}
										</h4>
										<h4 className="profile_field">
											Phone:{JSON.parse(localStorage.getItem('profile')).phone}
										</h4>
										<h4 className="profile_field">
											Email:{JSON.parse(localStorage.getItem('profile')).email}
										</h4>
										<h4 className="profile_field">
											Address:
											{JSON.parse(localStorage.getItem('profile')).address}
										</h4>
										<h4 className="profile_field">
											Subject:
											{JSON.parse(localStorage.getItem('profile')).subject}
										</h4>
										<h4 className="profile_field">
											Qualification:
											{
												JSON.parse(localStorage.getItem('profile'))
													.qualification
											}
										</h4>
										<h4 className="profile_field">
											Date of Birth:
											{JSON.parse(localStorage.getItem('profile')).dob}
										</h4>
										<h4 className="profile_field">
											Parent Name:
											{JSON.parse(localStorage.getItem('profile')).parent_name}
										</h4>
										<h4 className="profile_field">
											Role:{JSON.parse(localStorage.getItem('profile')).role}
										</h4>
									</div>
									<div className="col-4">
										<img id="profilepic" src="" alt=""></img>
									</div>
								</div>
							) : this.state.display === 'notice' ? (
								<div className="profileContainer">
									<h1>Adding Notice</h1>
									<label for="heading" className="label_item">
										Heading:
									</label>
									<br></br>
									<textarea id="heading" rows="4" cols="50" required></textarea>
									<br></br>
									<label for="message" className="label_item">
										Message:
									</label>
									<br></br>
									<textarea
										id="message"
										rows="10"
										cols="50"
										required
									></textarea>
									<br></br>
									<label for="file" className="label_item">
										Upload File:
									</label>
									<br></br>
									<input
										type="file"
										name="file"
										id="file"
										onChange={this.onChangeHandler}
									></input>
									<br></br>
									<center>
										<button
											className="noticebtn"
											onClick={() => this.addNotice()}
										>
											Add
										</button>
									</center>
								</div>
							) : this.state.display === 'faculty' ? (
								<AddTeacher></AddTeacher>
							) : this.state.display === 'student' ? (
								<AddStudent></AddStudent>
							) : this.state.display === 'class' ? (
								<AddClass></AddClass>
							) : this.state.display === 'subject' ? (
								<AddSubject></AddSubject>
							) : this.state.display === 'processleave' ? (
								<ProcessLeave></ProcessLeave>
							) : this.state.display === 'attendance' ? (
								<Attendance></Attendance>
							) : this.state.display === 'chat' ? (
								<NewChat></NewChat>
							) : this.state.display === 'results' ? (
								<Results></Results>
							) : null}
						</div>
					</div>
				</div>
			</div>
		) : (
			<h1>hai</h1>
		);
	}
}

export default withRouter(AdmHome);
