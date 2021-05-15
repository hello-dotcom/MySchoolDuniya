import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Tabs, Tab } from 'react-bootstrap';
import Sschat from './sschat';
import Sfchat from './Sfchat';
import Sachat from './Sachat';
class NewChat3 extends Component {
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
				<Tabs defaultActiveKey="sschat" id="uncontrolled-tab-example">
					<Tab eventKey="sschat" title="SSChat">
						<Sschat></Sschat>
					</Tab>
					<Tab eventKey="sfchat" title="SFChat">
						<Sfchat></Sfchat>
					</Tab>
					<Tab eventKey="sachat" title="SAChat">
						<Sachat></Sachat>
					</Tab>
				</Tabs>
			</div>
		);
	}
}

export default withRouter(NewChat3);
