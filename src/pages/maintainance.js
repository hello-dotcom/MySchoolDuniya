import React from 'react';
import Home from '../components/Home';
import bg5 from '../images/bg5.png';
const Maintainance = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'Right',
				alignItems: 'Right',
				height: '100vh',
				paddingTop: '100px',
				backgroundColor: 'honeydew',
				backgroundImage: { bg5 },
			}}
		>
			<Home></Home>
		</div>
	);
};

export default Maintainance;
