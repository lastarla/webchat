import React from 'react';
import {hashHistory} from 'react-router';
import axios from 'axios';
import IM from './IM';
import {API_URL} from './config';
import {pathName} from '../config';
import {List, Toast} from 'antd-mobile';

const Item = List.Item;

export default class Lists extends React.Component {
	constructor (props) {
		super(props);

		this.state = {
			friends: []
		};
	}

	componentWillMount () {
		this.fetch();
	} 

	fetch () {
		axios.post(API_URL.friends, {
			userId: this.props.model.userId
		})
		.then((result) => {
			if (result.data.success) {
				this.setState({
					friends: result.data.value.model
				});
			}
			else {
				Toast.info(result.data.value.message);
			}
		})
		.catch((err) => {
			console.log(err)
		});
	}

	friendList (data) {
		const online = data.online ? '[在线]' : '[离线]';

		return (
			<div>
				<IM model={this.props.model} />
				<List>
					<Item　arrow="horizontal" onClick={e => this.handleClick(data.id)}>
						{data.name}
					</Item>
				</List>
			</div>
		);
	}

	handleClick (id) {
		let model = this.props.model;

		model.targetUserId = id;

		// 路由跳转
		hashHistory.push({
			pathname: pathName.CHAT
		});
	}

	render () {
		return (
			<div>
				{
					this.state.friends.map((item) => {
						return this.friendList(item);
					})
				}
			</div>
		)
	}
}