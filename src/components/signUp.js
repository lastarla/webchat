import React from 'react';
import {Button, InputItem, Toast} from 'antd-mobile';
import axios from 'axios';

export default class SignUp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			username: '',
			password: ''
		};
	}

	handleSignUp(e) {
		if (this.state.loading) {
			return;
		}

		this.setState({
			loading: true
		});

		axios.post('/signup', {
			username: this.state.username,
			password: this.state.password
		}).then((result) => {
			var data = result.data;

			if (data.success) {
				// 路由跳转
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
						<Button type="primary" onClick={e => this.handleSignUp(e)} loading={this.state.loading}>注册</Button>
					</div>
				</div>
			</div>
		)
	}
}