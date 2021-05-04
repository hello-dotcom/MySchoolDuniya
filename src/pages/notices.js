// import React from 'react';
// import {API_URL} from '../config/config'
// const Notices = () => {
// 	var ans=[]
// 	fetch(`${API_URL}/admin/notice`,{
// 		method:"GET",
// 		headers:{'Content-Type':'application/json'},
// 	})
// 	.then(res=>res.json())
// 	.then(res=>
// 		{
// 			for(var i=0;i<res.data.length;i++)
// 			{
// 				const divele = document.createElement('div');
// 				divele.className="bg-secondary p-3 m-2";
// 				const h1ele=document.createElement('h1');
// 				h1ele.innerHTML = res.data[i].heading;
// 				divele.appendChild(h1ele);
// 				const h3ele = document.createElement('h3');
// 				h3ele.innerHTML=res.data[i].message;
// 				divele.appendChild(h3ele);
// 				document.getElementById('notice_board').appendChild(divele);
// 			}
// 		})
// 	.catch(err=>console.log(err));
// 	return (
// 		<div
// 			// style={{
// 			// 	display: 'flex',
// 			// 	justifyContent: 'Right',
// 			// 	alignItems: 'Right',
// 			// 	// height: '100vh',
// 			// }}
// 		>
// 			<h1>E - Notice Board (get updated with latest news at school)... </h1>

// 			<div id="notice_board">

// 			</div>
// 		</div>
// 	);
// };

// export default Notices;
import React, { Component } from 'react';
import { API_URL } from '../config/config';
import { withRouter } from 'react-router-dom';
import '../styles/noticeBoard.css';
import FS from 'file-saver';
class Notices extends Component {
	constructor(props) {
		super(props);
		this.state = {
			notices: [],
			loading: 1,
		};
	}
	fetchAllNotices = () => {
		fetch(`${API_URL}/admin/notice`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				this.setState(
					{
						notices: res.data.reverse(),
						loading: 0,
					},
					() => console.log(this.state.notices)
				);
			})
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.fetchAllNotices();
	}
	setCollapsible = (id) => {
		console.log(id);
		var coll = document.getElementsByClassName('content');
		if (coll[id].style.display === 'block') coll[id].style.display = 'none';
		else coll[id].style.display = 'block';
	};
	downloadFile = (filename, notice_no) => {
		console.log(filename);
		fetch(`${API_URL}/getfiles/${filename}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.blob())
			.then((blob) => {
				FS.saveAs(blob, notice_no + '-' + filename);
			})
			.catch((err) => console.log(err));
	};
	deleteNotice = (id) => {
		console.log(id);
		fetch(`${API_URL}/admin/notice`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
			body: JSON.stringify({
				notification_no: id,
			}),
		})
			.then((res) => res.json())
			.then((res) => {
				alert(res.message);
				window.location.reload();
			})
			.catch((err) => console.log(err));
	};
	render() {
		return (
			<div
				className="noticeBoardContainer"
				style={{
					marginTop: '100px',
				}}
			>
				<center>
					<h1>Notice Board</h1>
					{this.state.loading === 0
						? this.state.notices.map((item, index) => {
								return (
									<div className="noticeItem">
										<button
											type="button"
											onClick={() => this.setCollapsible(index)}
											className="collapsible"
										>
											{item.notification_no}:-{item.heading}
										</button>
										<div className="content">
											<p>{item.message}</p>
											<div className="flex justify-content-between">
												{item.filename !== 'empty' ? (
													<p
														onClick={() =>
															this.downloadFile(
																item.filename,
																item.notification_no
															)
														}
														className="fileItem"
													>
														File
													</p>
												) : null}
												{localStorage.getItem('token') &&
												localStorage.getItem('role') === 'Admin' ? (
													<svg
														onClick={() =>
															this.deleteNotice(item.notification_no)
														}
														xmlns="http://www.w3.org/2000/svg"
														width="20"
														height="20"
														fill="red"
														class="bi bi-trash dustbin float-right"
														viewBox="0 0 16 16"
													>
														<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
														<path
															fill-rule="evenodd"
															d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
														/>
													</svg>
												) : null}
											</div>
										</div>
									</div>
								);
						  })
						: null}
				</center>
			</div>
		);
	}
}

export default withRouter(Notices);
