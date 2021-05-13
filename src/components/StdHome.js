import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import '../styles/stdHome.css';
import { API_URL } from '../config/config';
import StudentAtdCheck from './StudentAtdCheck';
import StudentResCheck from './StudentResCheck';
import Sschat from './sschat';
import Sfchat from './Sfchat';
import Sachat from './Sachat';
import Leave from './Leave';

class StdHome extends Component {
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
						<div className="side_nav_container">
							<li
								className="item"
								value="profile"
								onClick={() => this.setDisplay('profile')}
							>
								Profile
							</li>
							<li
								className="item"
								value="check_attendance"
								onClick={() => this.setDisplay('check_attendance')}
							>
								Check Attendance
							</li>
							<li
								className="item"
								value="check_results"
								onClick={() => this.setDisplay('check_results')}
							>
								Check Results
							</li>
							<li
								className="item"
								value="chat"
								onClick={() => this.setDisplay('chat')}
							>
								SSChat
							</li>
							<li
								className="item"
								value="chat"
								onClick={() => this.setDisplay('sfchat')}
							>
								SFChat
							</li>
							<li
								className="item"
								value="chat"
								onClick={() => this.setDisplay('sachat')}
							>
								SAChat
							</li>
							<li
								className="item"
								value="apply_leave"
								onClick={() => this.setDisplay('apply_leave')}
							>
								Apply Leave
							</li>
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
											Class:
											{JSON.parse(localStorage.getItem('profile')).class}
										</h4>
										<h4 className="profile_field">
											Date of Birth:
											{JSON.parse(localStorage.getItem('profile')).dob}
										</h4>
										<h4 className="profile_field">
											Parent Name:
											{JSON.parse(localStorage.getItem('profile')).parent_name}
										</h4>
									</div>
									<div className="col-4">
										<img id="profilepic" src="" alt=""></img>
									</div>
								</div>
							) : this.state.display === 'check_attendance' ? (
								<StudentAtdCheck></StudentAtdCheck>
							) : this.state.display === 'check_results' ? (
								<StudentResCheck></StudentResCheck>
							) : this.state.display === 'chat' ? (
								(localStorage.setItem('chatType', 'sschat'),
								(<Sschat></Sschat>))
							) : this.state.display === 'sachat' ? (
								(localStorage.setItem('chatType', 'sachat'),
								(<Sachat></Sachat>))
							) : this.state.display === 'apply_leave' ? (
								<Leave></Leave>
							) : this.state.display === 'sfchat' ? (
								(localStorage.setItem('chatType', 'sfchat'),
								(<Sfchat></Sfchat>))
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

export default withRouter(StdHome);
