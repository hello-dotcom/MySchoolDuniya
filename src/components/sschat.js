import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { API_URL } from '../config/config';
import '../styles/chat.css';
class Sschat extends Component {
	constructor(props) {
		super(props);

		this.state = {
			empty: '',
			id1: JSON.parse(localStorage.getItem('profile')).id,
			index: -1,
			student_list: [],
			message_list: [],
		};
	}
	fetchAllStudent = () => {
		fetch(`${API_URL}/student/getAll`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 200) {
					this.setState({
						student_list: res.data,
					});
				} else {
					alert('something went wrong');
				}
			})
			.catch((err) => console.log(err));
	};
	componentDidMount() {
		this.fetchAllStudent();
		setInterval(() => {
			if (this.state.index !== -1) {
				this.getChat(
					this.state.id1,
					this.state.student_list[this.state.index].id
				);
			}
		}, 60 * 1000);
	}
	selectId = (index) => {
		this.setState(
			{
				...this.state,
				index: index,
			},
			() => {
				this.getChat(this.state.id1, this.state.student_list[index].id);
			}
		);
	};
	getChat = (id1, id2) => {
		fetch(`${API_URL}/student/sschat/${id1}/${id2}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: localStorage.getItem('token'),
			},
		})
			.then((res) => res.json())
			.then((res) => {
				if (res.status === 401) {
					alert(res.message);
					localStorage.clear('token');
					localStorage.clear('profile');
					localStorage.clear('role');
					this.props.history.push('/');
				} else if (res.status === 400) {
					alert(res.message);
				} else if (res.status === 200) {
					console.log(res);
					if (res.data !== []) {
						this.setState({
							...this.state,
							message_list: res.data.message,
						});
					} else {
						alert('hello');
						this.setState({
							...this.state,
							message_list: res.data,
						});
					}
				}
			})
			.catch((err) => console.log(err));
	};
	sendMsg = () => {
		const message = document.getElementById('msgInput').value;
		console.log(Date());
		if (message !== '') {
			fetch(`${API_URL}/student/sschat`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: localStorage.getItem('token'),
				},
				body: JSON.stringify({
					id1: this.state.id1,
					id2: this.state.student_list[this.state.index].id,
					message: message,
					created: Date(),
					sender: this.state.id1,
				}),
			})
				.then((res) => res.json())
				.then((res) => {
					if (res.status === 401) {
						alert(res.message);
						localStorage.clear('token');
						localStorage.clear('role');
						localStorage.clear('profile');
						this.props.history.push('/');
					} else if (res.status === 400) {
						alert(res.message);
					} else if (res.status === 200) {
						this.getChat(
							this.state.id1,
							this.state.student_list[this.state.index].id
						);
						document.getElementById('msgInput').value = '';
					}
				})
				.catch((err) => console.log(err));
		}
	};

	render() {
		return (
			<div style={{ marginTop: '100px' }}>
				{/* <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet"> */}
				<div class="Chat_container_CC">
					{/* <!-- Page header start --> */}
					<div class="page-title">
						<div class="row gutters">
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
								<h5 class="title">Chat App</h5>
							</div>
							<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
								<div class="daterange-container">
									<div class="date-range">
										<div id="reportrange">
											<i class="fa fa-calendar cal"></i>
											<span class="range-text">Cool Chat</span>
											<i class="fa fa-chevron-down arrow"></i>
										</div>
									</div>
									<a
										href="#"
										data-toggle="tooltip"
										data-placement="top"
										title=""
										class="download-reports"
										data-original-title="Download CSV"
									>
										<i class="fa fa-download"></i>
									</a>
								</div>
							</div>
						</div>
					</div>
					{/* <!-- Page header end --> */}

					{/* <!-- Content wrapper start --> */}
					<div class="content-wrapper">
						{/* <!-- Row start --> */}

						<div class="row gutters">
							<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
								<div class="card m-0">
									{/* <!-- Row start --> */}
									<div class="row no-gutters">
										<div class="col-xl-4 col-lg-4 col-md-4 col-sm-3 col-3">
											<div class="users-container ">
												<div class="chat-search-box">
													<div class="input-group">
														<input class="form-control" placeholder="Search" />
														<div class="input-group-btn">
															<button
																type="button"
																class="btn btn-info"
																style={{ width: 'auto' }}
															>
																&#128269;
															</button>
														</div>
													</div>
												</div>
												<ul class="users">
													{this.state.student_list.map((item, index) => {
														return (
															<li
																class="person"
																data-chat="person1"
																key={index}
																onClick={() => this.selectId(index)}
															>
																<div class="single_user user">
																	<span class="busy">{item.name[0]}</span>
																</div>
																<p class="name-time">
																	<span class="name">{item.name}</span>
																	<br></br>
																	<span class="time">{item.id}</span>
																</p>
															</li>
														);
													})}
												</ul>
											</div>
										</div>

										<div class="col-xl-8 col-lg-8 col-md-8 col-sm-9 col-9">
											<div class="selected-user">
												{this.state.index !== -1 ? (
													<div className="p-3">
														<div class="single_user">
															<span>
																{this.state.index !== -1
																	? this.state.student_list[this.state.index]
																			.name[0]
																	: null}
															</span>
														</div>
														<span>
															<span class="name">
																{this.state.index !== -1
																	? this.state.student_list[this.state.index]
																			.name
																	: null}
															</span>
														</span>
													</div>
												) : null}
											</div>
											<div class="chat-container">
												<ul class="chat-box chatContainerScroll">
													{this.state.index !== -1 && this.state.message_list
														? this.state.message_list.map((item, index) => {
																if (item.sender === this.state.id1) {
																	return (
																		<li className="chat-right" key={index}>
																			<div className="chat-hour">
																				{item.created.substr(0, 10)}
																				<br></br>
																				{/* {new Date(item.created).getHours()}:{new Date(item.created).getMinutes()} */}
																				{new Date(
																					item.created
																				).toLocaleTimeString('en-US')}
																			</div>
																			<div className="chat-text">
																				{item.msg}
																			</div>
																		</li>
																	);
																} else {
																	return (
																		<li className="chat-left" key={index}>
																			<div className="chat-text">
																				{item.msg}
																			</div>
																			<div className="chat-hour">
																				{item.created.substr(0, 10)}
																				<br></br>
																				{/* {new Date(item.created).getHours()}:{new Date(item.created).getMinutes()} */}
																				{new Date(
																					item.created
																				).toLocaleTimeString('en-US')}
																			</div>
																		</li>
																	);
																}
														  })
														: null}
												</ul>
												<div className="d-flex row">
													{this.state.index !== -1 ? (
														<div class="form-group mt-3 mb-0 col-11">
															<textarea
																class="form-control"
																rows="3"
																id="msgInput"
																placeholder="Type your message here..."
															></textarea>
														</div>
													) : null}
													{this.state.index !== -1 ? (
														<div class="col-1 mt-3 pl-0">
															<button className="send_btn">
																<span
																	className="send_symbol"
																	onClick={() => this.sendMsg()}
																>
																	&#x27A4;
																</span>
															</button>
														</div>
													) : null}
												</div>
											</div>
										</div>
									</div>
									{/* <!-- Row end --> */}
								</div>
							</div>
						</div>
						{/* <!-- Row end --> */}
					</div>
					{/* <!-- Content wrapper end --> */}
				</div>
			</div>
		);
	}
}
export default withRouter(Sschat);
