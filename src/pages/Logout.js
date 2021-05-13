import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import Home from '../components/Home';

class Logout extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: '',
		};
	}
	componentDidMount() {
		localStorage.clear('token');
		localStorage.clear('role');
		localStorage.clear('profile');
		this.props.history.push('/');
	}
	render() {
		return <></>;
	}
}

export default withRouter(Logout);
