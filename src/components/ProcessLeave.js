import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../config/config';
import '../styles/processLeave.css';
import { Table } from 'react-bootstrap';
class ProcessLeave extends Component {
	constructor(props) {
		super(props);

		this.state = {
			leavesList: [],
		};
	}
	getAllLeaveApplications = () => {
		const id = JSON.parse(localStorage.getItem('profile')).id;
		fetch(`${API_URL}/admin/sleave/${id}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 401) {
					alert(res.message);
					localStorage.clear('token');
					localStorage.clear('profile');
					localStorage.clear('role');
				} else if (res.status === 400) {
					alert(res.message);
				} else if (res.status === 200) {
					this.setState(
						{
							leavesList: res.data,
						},
						() => console.log(this.state.leavesList)
					);
				}
			})
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.getAllLeaveApplications();
	}
	updateLeave = (id, status) => {
		fetch(`${API_URL}/admin/sleave`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
			body: JSON.stringify({
				id: id,
				status: status,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 401) {
					alert(res.message);
					localStorage.clear('token');
					localStorage.clear('role');
					localStorage.clear('profile');
				} else if (res.status === 400) {
					alert(res.message);
				} else if (res.status === 200) {
					this.setState({
						...this.state,
						leavesList: this.state.leavesList.filter((item) => item._id !== id),
					});
				}
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div>
				<div className="leavesContainer">
					<h1>Process Leaves</h1>
					<div>
						<Table striped bordered hover>
							<thead>
								<tr>
									<td>Id</td>
									<td>Name</td>
									<td>Date of Start</td>
									<td>Date of Return</td>
									<td>Reason</td>
									<td>Status</td>
									<td>Update</td>
								</tr>
							</thead>
							<tbody>
								{this.state.leavesList.map((item, index) => {
									return (
										<tr key={index}>
											<td>{item.id}</td>
											<td>{item.name}</td>
											<td>{item.date_of_start.substr(0, 10)}</td>
											<td>{item.date_of_return.substr(0, 10)}</td>
											<td>{item.reason}</td>
											<td>
												<select id="stat">
													<option value="pending">Pending</option>
													<option value="Accepted">Accepted</option>
													<option value="Rejected">Rejected</option>
												</select>
											</td>
											<td>
												<button
													className="btnele"
													onClick={() => {
														this.updateLeave(
															item._id,
															document.getElementsByTagName('select')[index]
																.value,
															index
														);
													}}
												>
													Update
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</Table>
					</div>
				</div>
			</div>
		);
	}
}

export default withRouter(ProcessLeave);
