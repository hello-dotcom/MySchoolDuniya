import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import '../styles/addStudent.css';

class Work extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	render() {
		return (
			<div className="text-center">
				<h1>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Working on below things</h1>

				<button
					onClick={() => this.props.history.push('/addstudent')}
					className="btn btn-primary"
				>
					Add Student
				</button>
				<button
					onClick={() => this.props.history.push('/student')}
					className="btn btn-primary"
				>
					goto Student
				</button>
				<button
					onClick={() => {
						localStorage.setItem('as','admin')
						this.props.history.push('/login')}}
					
					className="btn btn-success"
				>
					Admin Login
				</button>
				<button
					onClick={() => this.props.history.push('/upload')}
					className="btn btn-secondary"
				>
					Upload
				</button>
			</div>
		);
	}
}
export default withRouter(Work);
