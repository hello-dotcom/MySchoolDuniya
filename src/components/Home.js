import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: '',
		};
	}

	render() {
		return (
			<div className="text-center">
				<h1>hai</h1>
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
						localStorage.setItem('as', 'admin');
						this.props.history.push('/login');
					}}
					className="btn btn-success"
				>
					Login
				</button>
				<button
					onClick={() => this.props.history.push('/upload')}
					className="btn btn-secondary"
				>
					Upload
				</button>
				<button
					onClick={() => this.props.history.push('/addteacher')}
					className="btn btn-primary"
				>
					Add Teacher
				</button>
                <button
					onClick={() => this.props.history.push('/chat')}
					className="btn btn-primary"
				>
					Chat
				</button>
                <button
					onClick={() => this.props.history.push('/leave')}
					className="btn btn-primary"
				>
					Leave
				</button>
			</div>
		);
	}
}
export default withRouter(Home);
