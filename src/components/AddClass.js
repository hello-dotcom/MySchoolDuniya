import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../config/config';
import '../styles/addClass.css';
class AddClass extends Component {
	constructor(props) {
		super(props);

		this.state = {
			opt: 'A',
			classList: [],
			class: '',
			teacher: '',
			method: 'POST',
		};
	}
	addclass = () => {
		const cls = this.state.class;
		const teacher = this.state.teacher;
		if (cls.trim() === '' || teacher.trim() === '') {
			alert("fields can't be empty");
		} else {
			fetch(`${API_URL}/admin/class`, {
				method: this.state.method,
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					class: cls,
					teacher: teacher,
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
	getAllClasses = () => {
		fetch(`${API_URL}/admin/class`, {
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
						classList: res.data,
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
					this.getAllClasses();
				}
			}
		);
	};
	editClass = (id) => {
		this.setState(
			{
				method: 'PUT',
				opt: 'A',
				teacher: this.state.classList[id].teacher,
				class: this.state.classList[id].class_id,
			},
			() => console.log(this.state)
		);
	};
	deleteClass = (id) => {
		if (
			window.confirm(
				'Are you sure want to delete ' + this.state.classList[id] + ' class'
			)
		) {
			fetch(`${API_URL}/admin/class`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					class: this.state.classList[id].class_id,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 401) {
						alert(res.message);
						localStorage.clear('token');
						localStorage.clear('role');
						this.props.history.push('/');
					} else if (res.status === 200) {
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
								disabled={this.state.method === 'PUT' ? true : false}
							></input>
							<lable className="item_heading" for="teacher">
								Class Teacher Id :
							</lable>
							<input
								id="teacher"
								name="teacher"
								type="text"
								required
								value={this.state.teacher}
								onChange={this.onChangeHandler}
							></input>
							<br></br>
							<center>
								<button onClick={() => this.addclass()}>
									{this.state.method === 'PUT' ? 'Edit' : 'Add'}
								</button>
							</center>
						</div>
					) : (
						<center>
							<table>
								<thead>
									<tr>
										<th>Class</th>
										<th>Class Teacher Id</th>
										{localStorage.getItem('token') !== null &&
										localStorage.getItem('role') === 'Admin' ? (
											<div>
												<td className="item_edit"> Edit</td>
												<td className="item_delete"> Delete </td>
											</div>
										) : null}
									</tr>
								</thead>
								<tbody>
									{this.state.classList.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.class_id}</td>
												<td>{item.teacher}</td>
												{localStorage.getItem('token') !== null &&
												localStorage.getItem('role') === 'Admin' ? (
													<div>
														<td
															className="item_edit"
															onClick={() => this.editClass(index)}
														>
															{' '}
															&#9998;{' '}
														</td>
														<td
															className="item_delete item_delete_bin"
															onClick={() => this.deleteClass(index)}
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

export default withRouter(AddClass);
