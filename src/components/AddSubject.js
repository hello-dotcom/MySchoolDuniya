import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../config/config';
import '../styles/addClass.css';
class AddSubject extends Component {
	constructor(props) {
		super(props);
		this.state = {
			opt: 'A',
			subjectList: [],
			method: 'POST',
			subject_id: '',
			subject_name: '',
			class: '',
		};
	}
	addsubject = () => {
		const cls = this.state.class;
		const subject_id = this.state.subject_id;
		const subject_name = this.state.subject_name;
		if (
			cls.trim() === '' ||
			subject_id.trim() === '' ||
			subject_name.trim() === ''
		) {
			alert("fields can't be empty");
		} else {
			fetch(`${API_URL}/admin/subject`, {
				method: this.state.method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					class: cls,
					subject_id: subject_id,
					subject_name: subject_name,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 401) {
						alert(res.message);
						localStorage.clear('token');
						localStorage.clear('role');
						this.props.history.push('/');
					} else if (res.status === 400) {
						alert(res.message);
					} else if (res.status === 200) {
						alert(res.message);
						window.location.reload();
					}
				})
				.catch((err) => console.log(err));
		}
	};
	getAllSubjects = () => {
		fetch(`${API_URL}/admin/subject`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 400) {
					alert(res.message);
					window.location.reload();
				} else if (res.status === 200) {
					// alert(res.message);
					this.setState({
						subjectList: res.data,
					});
				}
			})
			.catch((err) => console.log(err));
	};
	onChangeHandler = (event) => {
		this.setState(
			{
				...this.state,
				[event.target.name]: event.target.value,
			},
			() => {
				if (this.state.opt === 'B') {
					this.getAllSubjects();
				}
			}
		);
	};
	deleteSubject = (id) => {
		if (
			window.confirm(
				'Are you sure want to delete ' + this.state.subjectList[id] + ' subject'
			)
		) {
			fetch(`${API_URL}/admin/subject`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					class: this.state.subjectList[id].class_id,
					subject_id: this.state.subjectList[id].subject_id,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status == 401) {
						alert(res.message);
						localStorage.clear('token');
						localStorage.clear('role');
						this.props.history.push('/');
					} else if (res.status == 200) {
						alert(res.message);
						window.location.reload();
					}
				})
				.catch((err) => console.log(err));
		}
	};
	render() {
		return (
			<div style={{ marginTop: '100px' }}>
				<div className="container">
					<center>
						<label className="item_heading" for="A">
							&#9960;
						</label>
						<input
							type="radio"
							id="A"
							name="opt"
							value="A"
							onChange={this.onChangeHandler}
						></input>
						<label className="item_heading" for="B">
							&#9745;
						</label>
						<input
							type="radio"
							id="B"
							name="opt"
							value="B"
							onChange={this.onChangeHandler}
						></input>
					</center>
					<br></br>
					{this.state.opt === 'A' ? (
						<div>
							<label className="item_heading" for="class">
								Class :
							</label>
							<input
								id="class"
								name="class"
								type="text"
								required
								value={this.state.class}
								onChange={this.onChangeHandler}
							></input>
							<label className="item_heading" for="subject_id">
								Subject Id :
							</label>
							<input
								id="subject_id"
								name="subject_id"
								type="text"
								required
								value={this.state.subject_id}
								onChange={this.onChangeHandler}
							></input>
							<br></br>
							<label className="item_heading" for="subject_name">
								Subject:
							</label>
							<input
								id="subject_name"
								name="subject_name"
								type="text"
								required
								value={this.state.subject_name}
								onChange={this.onChangeHandler}
							></input>
							<br></br>
							<center>
								<button onClick={() => this.addsubject()}>Add</button>
							</center>
						</div>
					) : (
						<center>
							<table>
								<thead>
									<tr>
										<th>Class</th>
										<th>Subject Id</th>
										<th>Subject Name</th>
										{localStorage.getItem('token') !== null &&
										localStorage.getItem('role') === 'Admin' ? (
											<div>
												<td className="item_delete"> Delete </td>
											</div>
										) : null}
									</tr>
								</thead>
								<tbody>
									{this.state.subjectList.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.class_id}</td>
												<td>{item.subject_id}</td>
												<td>{item.subject_name}</td>
												{localStorage.getItem('token') !== null &&
												localStorage.getItem('role') === 'Admin' ? (
													<div>
														<td
															className="item_delete item_delete_bin"
															onClick={() => this.deleteSubject(index)}
														>
															{' '}
															&#128465;{' '}
														</td>
													</div>
												) : null}
											</tr>
										);
									})}
								</tbody>
							</table>
						</center>
					)}
				</div>
			</div>
		);
	}
}
export default withRouter(AddSubject);
