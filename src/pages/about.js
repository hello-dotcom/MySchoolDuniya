import React from 'react';

const About = () => {
	return (
		<div
			style={{
				backgroundColor: 'honeydew',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'Right',
				alignItems: 'Right',
				height: '100vh',
				paddingTop: '100px',
			}}
		>
			<center
				style={{
					color: 'purple',
					textShadow: '2px 2px 3px green',
				}}
			>
				<h1>About Our Esteemed Web Portal for School ... </h1>
			</center>
			<p
				style={{
					fontSize: '1.2rem',
					fontWeight: '600',
					paddingLeft: '15px',
					maxWidth: '900px',
					border: '4px solid red',
					borderRadius: '0px 10px 0px 10px',
					boxShadow: '2px 2px 5px blue',
					alignSelf: 'center',
				}}
			>
				Telangana State Model School is a paradise of learning for your child,
				encompassing technological aids with the inculcation of the value system
				that will personify respect, dedication, discipline, integrity and moral
				values which will brighten the future of your child.
			</p>
			<p
				style={{
					fontSize: '1.2rem',
					fontWeight: '600',
					paddingLeft: '15px',
					maxWidth: '900px',
					border: '4px solid blue',
					borderRadius: '0px 10px 0px 10px',
					boxShadow: '2px 2px 5px red',
					alignSelf: 'center',
				}}
			>
				We empower each student to become courageous to live by his conviction
				throughout his life. Well dedicated and qualified staff, infrastructure,
				the vastness of campus to facilitate all activities like sports and well
				designed and unique extracurricular activities, serene and natural
				environment by virtue of its location, all these help the student to
				willingly involve in the process of identifying his own power and
				purpose.
			</p>
			<p
				style={{
					fontSize: '1.2rem',
					fontWeight: '600',
					paddingLeft: '15px',
					maxWidth: '900px',
					border: '4px solid red',
					borderRadius: '0px 10px 0px 10px',
					alignSelf: 'center',
					boxShadow: '2px 2px 5px blue',
				}}
			>
				We help children connect with their surroundings in new ways, so they
				discover what is meaningful to them in the moment and in the future.
			</p>
		</div>
	);
};

export default About;
