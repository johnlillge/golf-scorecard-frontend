import React from 'react';
import { useHistory } from 'react-router-dom';
import './SigninMessage.css';

const SigninMessage = () => {
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push('/signin');
	};

	return (
		<div className="signin-message-wrapper">
			<h3>Sign in to start a round!</h3>
			<form className="signin-button" onSubmit={handleSubmit}>
				<input type="submit" value="Sign In" />
			</form>
		</div>
	);
};

export default SigninMessage;
