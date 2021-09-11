import React from 'react';
import { ListGroup } from 'react-bootstrap';
import './RoundList.css';

const RoundList = (props) => {
	const handleClick = (round, e) => {
		e.preventDefault();
		props.setSelectedRound(round);
	};

	return (
		<div className="list-container">
			<h1 className="list-header">Your Completed Rounds</h1>
			<br />
			{props.rounds.length > 0 ? (
				<ListGroup variant="flush" className="round-listgroup">
					{props.rounds
						.sort((a, b) => b.id - a.id)
						.map((round, index) => (
							<ListGroup.Item
								key={`round-listgroup-${index}`}
								action
								onClick={(e) => handleClick(round, e)}
							>{`Date Played: ${round.time_finished
								.toLocaleString()
								.substring(0, 10)} Total Score: ${round.total_score}`}</ListGroup.Item>
						))}
				</ListGroup>
			) : (
				<h3>User has no rounds yet</h3>
			)}
		</div>
	);
};

export default RoundList;
