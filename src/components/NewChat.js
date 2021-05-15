import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Fschat from './Fschat';
import Fachat from './Fachat';
import Chat from './Chat';
class NewChat extends Component {
	render() {
		return (
			<div
				style={{
					border: '2px solid blue',
					borderRadius: '15px 0px',
					borderShadow: '5px 5px 5px 5px black',
					padding: '5px',
					fontSize: '1.2rem',
					fontWeight: '600',
				}}
			>
				<Tabs defaultActiveKey="aschat" id="uncontrolled-tab-example">
					<Tab eventKey="aschat" title="ASChat">
						<Fschat></Fschat>
					</Tab>
					<Tab eventKey="afchat" title="AFChat">
						<Chat></Chat>
					</Tab>
					<Tab eventKey="aachat" title="AAChat">
						<Fachat></Fachat>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default withRouter(NewChat);
