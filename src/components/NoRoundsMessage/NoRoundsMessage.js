import React from 'react';

const NoRoundsMessage = () => {
	return (
		<div className="no-rounds-message">
			<h4>{`${localStorage.getItem('username')} has not entered any rounds.`}</h4>
			<h5>Please enter a round to see this page.</h5>
		</div>
	);
};

export default NoRoundsMessage;
