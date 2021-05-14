import React from 'react';
import { Carousel } from 'react-bootstrap';
import bg from '../images/bg.png';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';
import bg5 from '../images/bg5.png';

const Home = () => {
	return (
		<div
			style={{
				backgroundColor: 'honeydew',
				paddingBottom: '100px',
			}}
		>
			<div
				style={{
					display: 'flex',
					justifyContent: 'Right',
					alignItems: 'Right',
					paddingTop: '100px',
					color: 'blue',
					margin: 'auto',
				}}
			>
				<center>
					<h1>Welcome to School Management System</h1>
				</center>
			</div>
			<div
				style={{
					margin: 'auto',
					padding: 'auto',
					maxWidth: '900px',
					maxHeight: 'auto',
				}}
			>
				<Carousel>
					<Carousel.Item interval={2000}>
						<img
							style={{
								height: '400px',
								width: '900px',
							}}
							className="d-block w-100"
							src={bg}
							alt="First slide"
						/>
						<Carousel.Caption>
							<h3>First slide label</h3>
							<p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
							style={{
								height: '400px',
								width: '900px',
							}}
							className="d-block w-100"
							src={bg2}
							alt="Second slide"
						/>
						<Carousel.Caption>
							<h3>Second slide label</h3>
							<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
							style={{
								height: '400px',
								width: '900px',
							}}
							className="d-block w-100"
							src={bg3}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Third slide label</h3>
							<p>
								Praesent commodo cursus magna, vel scelerisque nisl consectetur.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
					<Carousel.Item interval={2000}>
						<img
							style={{
								height: '400px',
								width: '900px',
							}}
							className="d-block w-100"
							src={bg5}
							alt="Third slide"
						/>
						<Carousel.Caption>
							<h3>Fourth slide label</h3>
							<p>
								Praesent commodo cursus magna, vel scelerisque nisl consectetur.
							</p>
						</Carousel.Caption>
					</Carousel.Item>
				</Carousel>
			</div>
		</div>
	);
};

export default Home;
