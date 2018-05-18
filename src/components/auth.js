import React from 'react';
import {Router, Route, hashHistory} from 'react-router';
import {model, pathName} from '../config';
import axios from 'axios';
import {API_URL} from './config';
import SingIn from './signin';

class Auth extends React.Component {

	constructor (props) {
		super(props);

		this.state = {
			auth: false
		};
	}

	componentWillMount () {
		axios.post(API_URL.auth)
		.then((result) => {
			if (result.data.success) {
				var data = result.data.value;
				model.online = data.login;

				this.setState({
					auth: true
				});
			}
			else {
				if (hashHistory.getCurrentLocation().pathname.indexOf('/signin') === -1) {
					hashHistory.push({
						pathname: pathName.SIGNIN
					});
				}
			}
		})
		.catch(function (err) {
			if (err) {
				console.log(err);
			}
		});
	}

	getComponents = () => {
		if (!this.state.auth) {
			if (hashHistory.getCurrentLocation().pathname.indexOf('/signin') > -1) {
				return <SingIn model={model}/>
			}
			else {
				return <div className="loading">请稍候...</div>
			}
		}
		else {
			return <this.props.component model={model}/>
		}
	}

	render () {
		return (
			this.getComponents()
		)
	}
}

export default function (Cn) {
	return (
		<Auth component={Cn}></Auth>
	)
}