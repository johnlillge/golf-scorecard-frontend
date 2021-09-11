import React, { useState } from 'react';
import jwt_decode from 'jwt-decode';
import axiosInstance from '../../api/AuthAPI';
import { useHistory } from 'react-router-dom';

const LoginPage = () => {
	const history = useHistory();
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axiosInstance.post('/token/obtain/', {
				username: username,
				password: password
			});
			const responseJson = await response;
			axiosInstance.defaults.headers['Authorization'] = 'JWT ' + responseJson.data.access;
			localStorage.setItem('access_token', responseJson.data.access);
			localStorage.setItem('refresh_token', responseJson.data.refresh);
			localStorage.setItem('username', jwt_decode(responseJson.data.refresh).username);
			localStorage.setItem('userID', jwt_decode(responseJson.data.refresh).user_id);
			history.go(0);
			return responseJson.data;
		} catch (error) {
			throw error;
		}
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form onSubmit={handleSubmit}>
					<h3>Sign In</h3>

					<div className="form-group">
						<label>Username</label>
						<input
							name="username"
							type="text"
							className="form-control"
							value={username}
							onChange={handleChange}
							placeholder="Enter username"
						/>
					</div>

					<div className="form-group">
						<label>Password</label>
						<input
							name="password"
							type="password"
							className="form-control"
							value={password}
							onChange={handleChange}
							placeholder="Enter password"
						/>
					</div>
					<br />
					<button type="submit" className="btn btn-primary btn-block">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
