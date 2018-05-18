import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, hashHistory, IndexRoute, Link} from 'react-router';
import App from './components/app';
import SignIn from './components/signIn';
import SignUp from './components/signUp';
import Lists from './components/list';
import Chat from './components/chat';
import Auth from './components/auth';

import {model, pathName} from './config';
import style from './index.less';

ReactDOM.render(
	<Router history={hashHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={() => {return Auth(SignIn)}} />
			<Route path={pathName.SIGNIN} component={() => {return Auth(SignIn)}} />
			<Route path={pathName.SIGNUP} component={() => {return Auth(SignUp)}} />
			<Route path={pathName.FRIENDS} component={() => {return Auth(Lists)}} />
			<Route path={pathName.CHAT} component={() => {return Auth(Chat)}}/>
		</Route>
	</Router>
, document.getElementById('app'));

