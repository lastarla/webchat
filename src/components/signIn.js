import React from 'react';
import {hashHistory, Link} from 'react-router';
import {Button, InputItem, Toast} from 'antd-mobile';
import axios from 'axios';
import {API_URL} from './config';
import {pathName} from '../config';

export default class SignIn extends React.Component {
	constructor(props) {
		debugger
		super(props);
		this.state = {
			loading: false,
			username: '',
			password: ''
		};
	}

	handleSignIn(e) {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		});

		axios.post(API_URL.signin, {
			username: this.state.username,
			password: this.state.password
		}).then((result) => {

			var data = result.data;
			var model = this.props.model;

			if (data.success) {
				model.online = true;
				model.userId = data.value.userId;

				// 路由跳转
				hashHistory.push({
					pathname: pathName.FRIENDS
				});
			}
			else {
				Toast.info(data.value.message);
			}

			this.setState({
				loading: false
			});
		}).catch((err) => {
			console.log(err);
			this.setState({
				loading: false
			});
		});
	}

	handleInput(type, value) {
		var data = {};

		data[type] = value;

		this.setState(data);
	}

	render() {
		return (
			<div className="login-container">
				<div className="login-content">
					<div className="input-item">
						<InputItem placeholder="用户名" onChange={e => this.handleInput('username', e)}/>
					</div>
					<div className="input-item">
						<InputItem type="password" placeholder="密码" onChange={e => this.handleInput('password', e)}/>
					</div>
					<div className="login-ok">
						<Button type="primary" onClick={e => this.handleSignIn(e)} loading={this.state.loading}>登录</Button>
					</div>
					<div>
						<a className="logup-btn" href="">立即注册</a>
					</div>
				</div>
			</div>
		)
	}
}