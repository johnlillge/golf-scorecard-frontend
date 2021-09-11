import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../../api/AuthAPI';

const SignupPage = (props) => {
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const signup = async () => {
			try {
				const response = await axiosInstance.post('/user/create/', {
					username: username,
					email: email,
					password: password
				});
				return response;
			} catch (error) {
				console.log(error);
			}
		};
		signup();
		console.log('submit finished now redirect');
		history.push('/signin');
	};

	const handleChange = (e) => {
		if (e.target.name === 'username') {
			setUsername(e.target.value);
		} else if (e.target.name === 'email') {
			setEmail(e.target.value);
		} else {
			setPassword(e.target.value);
		}
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-inner">
				<form onSubmit={handleSubmit}>
					<h3>Sign Up</h3>

					<div className="form-group">
						<label>Email address</label>
						<input
							name="email"
							type="email"
							className="form-control"
							value={email}
							onChange={handleChange}
							placeholder="Enter email"
						/>
					</div>

					<div className="form-group">
						<label>Username</label>
						<input
							name="username"
							type="text"
							className="form-control"
							value={username}
							onChange={handleChange}
							placeholder="Enter email"
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
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignupPage;
