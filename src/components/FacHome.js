import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/stdHome.css';
import { API_URL } from '../config/config';
import NewChat2 from './NewChat2';
import ProcessLeave from './ProcessLeave';
import { Tab, Row, Col, ListGroup } from 'react-bootstrap';

class FacHome extends Component {
	constructor(props) {
		super(props);

		this.state = {
			display: '',
			load_file: 0,
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
													borderRadius: '5px',
													color: 'red',
													letterSpacing: '0.5px',
													fontSize: '1.4rem',
													fontWeight: '600',
													boxShadow: '1px 1px 2px black',
												}}
												href="#ffchat"
												onClick={() => {
													this.setDisplay('chat');
												}}
											>
												Chat
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
												href="#process_leave"
												onClick={() => {
													this.setDisplay('process_leave');
												}}
											>
												Process Leave
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
							) : this.state.display === 'chat' ? (
								<NewChat2></NewChat2>
							) : this.state.display === 'process_leave' ? (
								<ProcessLeave></ProcessLeave>
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

export default withRouter(FacHome);
