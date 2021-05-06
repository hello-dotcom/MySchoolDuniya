import React from 'react';
import { Carousel } from 'react-bootstrap';
import img1 from '../images/img1.png';
import img2 from '../images/img2.png';
import img4 from '../images/img4.png';
import pp from '../images/pp.png';
const Home = () => {
	return (
		<div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'Right',
					alignItems: 'Right',
					paddingTop: '100px',
				}}
			>
				<h1>Welcome to School Management System</h1>
			</div>
			<div
				style={{
					margin: 'auto',
					padding: 'auto',
					maxWidth: '900px',
					maxHeight: '400px',
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
							src={img1}
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
							src={img2}
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
							src={pp}
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
							src={img4}
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
