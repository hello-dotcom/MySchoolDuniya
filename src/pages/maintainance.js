import React from 'react';
import Home from '../components/Home';
const Maintainance = () => {
	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'Right',
				alignItems: 'Right',
				height: '100vh',
				paddingTop: '100px',
			}}
		>
			<h1>Maintainance Work Station</h1>
			<Home></Home>
		</div>
	);
};

export default Maintainance;
