import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Chat from './Chat';
import Fschat from './Fschat';
import Fachat from './Fachat';
class NewChat2 extends Component {
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
				<Tabs defaultActiveKey="ffchat" id="uncontrolled-tab-example">
					<Tab eventKey="ffchat" title="FFChat">
						<Chat></Chat>
					</Tab>
					<Tab eventKey="fschat" title="FSChat">
						<Fschat></Fschat>
					</Tab>
					<Tab eventKey="fachat" title="FAChat">
						<Fachat></Fachat>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default withRouter(NewChat2);
