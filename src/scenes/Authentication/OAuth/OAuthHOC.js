import React, { Component } from 'react';
import { func } from 'prop-types';
import { connect } from 'react-redux';

import { setToken } from 'store/authentication';
import Socket from 'Socket';

import './OAuth.css';

const socket = Socket();


const API_URL = process.env.REACT_APP_API_URL;

export default (provider, BaseComponent) => {
	class OAuth extends Component {
		static propTypes = {
			setToken: func.isRequired,
		};

		state = {
			disabled: false,
		}

		constructor(props) {
			super(props);
			this.startAuth = this.startAuth.bind(this);
		}

		componentDidMount() {
			socket.on(provider, (data) => {
				if (this.popup) {
					this.popup.close();
				}
				if (data && data.token) {
					this.props.setToken(data.token);
				}
			});
		}

		checkPopup() {
			const check = setInterval(() => {
				const { popup } = this;
				if (!popup || popup.closed || popup.closed === undefined) {
					clearInterval(check);
					this.setState({ disabled: false });
				}
			}, 1000);
		}

		openPopup() {
			const width = 600,
				height = 600;
			const left = (window.innerWidth / 2) - (width / 2);
			const top = (window.innerHeight / 2) - (height / 2);
			const url = `${API_URL}/api/users/${provider}?socketId=${socket.id}`;

			return window.open(
				url, '',
				`toolbar=no, location=no, directories=no, status=no, menubar=no,
				scrollbars=no, resizable=no, copyhistory=no, width=${width},
				height=${height}, top=${top}, left=${left}`,
			);
		}

		startAuth = () => {
			if (!this.state.disabled) {
				window.authenticateCallback = function(token) {
					setToken(token);
				};

				window.open(`${ API_URL }/api/users/${ provider }`);
				// this.popup = this.openPopup();
				// this.checkPopup();
				// this.setState({ disabled: true });
			}
		}

		render() {
			const { disabled } = this.state;


			return (
				<div className='oauth'>
					<BaseComponent
						onClick={this.startAuth}
						disabled={disabled}
					/>
				</div>
			);
		}
	}

	return connect(null, { setToken })(OAuth);

};
