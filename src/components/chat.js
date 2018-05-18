import React from 'react';
import {hashHistory} from 'react-router';
import {Button, InputItem} from 'antd-mobile';
import {pathName} from '../config';
import axios from 'axios';
import {API_URL} from './config';

export default class Chat extends React.Component {
	constructor (props) {
		super(props);

		let model = this.props.model;

		model.chatList[model.targetUserId]
			= model.chatList[model.targetUserId] || [];

		this.state = {
			userId: model.userId,
			chats:  model.chatList[model.targetUserId],
			message: ''
		};
	}

	componentWillMount () {
		let model = this.props.model;

		model.ws && model.ws.addEventListener('message', (event) => {

			this.setState({
				chats: model.chatList[model.targetUserId]
			});
		});

		// this.historyMsg();
	}

	// historyMsg () {
	// 	let model = this.props.model;

	// 	axios.post(API_URL.historymsg, {
	// 		from: model.userId,
	// 		to: model.targetUserId
	// 	})
	// 	.then((result) => {
	// 		if (result.data.success) {
	// 			var data = result.data.value.model;

	// 			data = data.concat(model.chatList[model.targetUserId]);
	// 			model.chatList[model.targetUserId] = data;

	// 			this.setState({
	// 				chats: model.chatList[model.targetUserId]
	// 			});
	// 		}
	// 	})
	// 	.catch(function (err) {
	// 		if (err) {
	// 			console.log(err);
	// 		}
	// 	});
	// }

	getMsgItem (data) {
		var result = null;

		switch(data.type) {
			case 'system':
				result = this.systemContent(data);
				break;
			case 'auth':
				result = this.authContent(data);
				break;
			case 'push':
				result = this.chatContent(data);
				break;
			default:
				result = this.defaultContent();
		}

		return result;
	}
	
	defaultContent () {
		return this.systemContent({
			message: '暂不支持该类型消息'
		});
	}

	authContent (data) {
		return this.systemContent(data);
	}

	systemContent (data) {

		return (
			<div className="system-message">
				<div className="system-msg-content">{data.message}</div>
			</div>
		);
	}

	chatContent (data) {

		let className = 'chat-item';

		if (data.from !== this.state.userId) {
			className = 'chat-item chat-item-right';
		}

		return (
			<div className={className}>
				<div className="chat-item-container">
					<div className="chat-item-title">{data.name}</div>
					<div className="chat-item-content">{data.msg}</div>
				</div>
			</div>
		);
	}

	handleInput (value) {
		this.setState({
			message: value
		});
	}

	send (e) {
		if (!this.state.message) {
			return;
		}

		let model = this.props.model;

		model.ws.send(JSON.stringify({
			type: 'push',
			from: this.state.userId,
			to: model.targetUserId,
			msg: this.state.message
		}));

		this.setState({
			message: ''
		});
	}

	render () {
		let model = this.props.model;

		return (
			<div className="chat-container">
				<div className="chat-content">
					{
						this.state.chats.map((item) => {
							return this.getMsgItem(item);
						})
					}
				</div>
				<div className="chat-handle">
					<div className="input-item chat-input">
						<InputItem disabled={!model.connected} value={this.state.message} onChange={e => this.handleInput(e)}/>
					</div>
					<div className="chat-btn">
						<Button disabled={!model.connected} type="primary" onClick={e => this.send(e)}>发送</Button>
					</div>
				</div>
			</div>
		)
	}
}