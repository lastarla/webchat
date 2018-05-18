import React from 'react';
import {model} from '../config';

export default class App extends React.Component {
	render () {
		return (
			<div model={model}>
				{this.props.children}
			</div>
		)
	}
}