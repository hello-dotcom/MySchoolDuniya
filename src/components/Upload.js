import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class Upload extends Component {
	constructor(props) {
		super(props);
		this.state = {
			files: [],
		};
	}
	getAllFiles = () => {
		fetch('https://studentsms.herokuapp.com/getfiles', {
			method: 'GET',
			headers: {
				'Content-Type': 'Application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.files !== false) {
					var div = document.createElement('div');

					div.innerHTML = '';

					for (var file in res.files) {
						console.log(res.files[file]);
						div.innerHTML +=
							'<span style="display:inline;"><img src="image/' +
							res.files[file].filename +
							'"></span>';
					}
					document.getElementById('emoji').appendChild(div);
					this.setState({
						files: res.files,
					});
				}
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div>
				<button onClick={() => this.getAllFiles()}>hai</button>
				<div class="emoji" id="emoji">
					<ul id="emojiz"></ul>
					{this.state.files.map((file) => {
						if (
							file.contentType === 'image/png' ||
							file.contentType === 'image/jpeg'
						) {
							return (
								// <img src="image/<%= file.filename %>" alt=""/>
								<img></img>
							);
						}
					})}
					{/* <img src="image/<%= file.filename %>" alt=""/> */}
				</div>
			</div>
		);
	}
}
export default withRouter(Upload);
