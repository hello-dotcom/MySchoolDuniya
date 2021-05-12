import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../config/config';
import '../styles/studentrescheck.css';
import { Table } from 'react-bootstrap';
class StudentResCheck extends Component {
	constructor(props) {
		super(props);

		this.state = {
			results: [],
			id: JSON.parse(localStorage.getItem('profile')).id,
			name: JSON.parse(localStorage.getItem('profile')).name,
			class: JSON.parse(localStorage.getItem('profile')).class,
		};
	}
	getMyResults = () => {
		fetch(`${API_URL}/student/results/${this.state.id}/${this.state.class}`, {
			method: 'GET',
			headers: {
				Authorization: localStorage.getItem('token'),
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 401) {
					alert(res.message);
					localStorage.clear('token');
					localStorage.clear('profile');
					localStorage.clear('role');
					this.props.history.push('/');
				} else if (res.status === 400) {
					alert(res.message);
				} else if (res.status === 200) {
					this.setState({
						...this.state,
						results: res.data,
					});
				}
			})
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.getMyResults();
	}
	render() {
		return (
			<div className="studentrescheck-container">
				<Table striped bordered hover>
					<thead>
						<tr>
							<td>Subject Id</td>
							<td> FA 1 </td>
							<td> FA 2 </td>
							<td> FA 3 </td>
							<td> FA 4 </td>
							<td> Quarterly </td>
							<td> Half Yearly </td>
							<td> Final </td>
						</tr>
					</thead>
					<tbody>
						{this.state.results.map((item, index) => {
							return (
								<tr key={index}>
									<td>{item.subject_id}</td>
									<td>{item.fa1}</td>
									<td>{item.fa2}</td>
									<td>{item.fa3}</td>
									<td>{item.fa4}</td>
									<td>{item.qa}</td>
									<td>{item.ha}</td>
									<td>{item.final}</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			</div>
		);
	}
}

export default withRouter(StudentResCheck);
