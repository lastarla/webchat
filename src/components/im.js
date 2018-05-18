import React from 'react';
import {API_URL} from './config';

export default class IM extends React.Component {
	constructor (props) {
		super(props);
	}

	componentWillMount () {
		let model = this.props.model;

		if (model.ws) {
			return;
		}

		const ws = new WebSocket(API_URL.ws);

		ws.addEventListener('open', (event) => {
			ws.send(JSON.stringify({
				type: 'auth',
				from: model.userId,
				to: ''
			}));
		});

		ws.addEventListener('message', (event) => {
			const data = JSON.parse(event.data);
			const id = data.from === model.userId ? data.to : data.from;

			model.chatList[id] = model.chatList[id] || [];
			model.chatList[id].push(data);
		});

		model.ws = ws;

		// 建立沟通
		model.connected = true;
	}

	render () {
		return null;
	}
}