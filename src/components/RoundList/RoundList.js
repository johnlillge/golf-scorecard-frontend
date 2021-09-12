import React from 'react';
import NoRoundsMessage from '../NoRoundsMessage/NoRoundsMessage';
import { ListGroup } from 'react-bootstrap';
import './RoundList.css';

const RoundList = (props) => {
	const handleClick = (round, e) => {
		e.preventDefault();
		props.setSelectedRound(round);
	};

	return (
		<div>
			<h1 className="page-header">Your Completed Rounds</h1>
			{props.rounds.length > 0 ? (
				<div className="list-container">
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
				</div>
			) : (
				<NoRoundsMessage />
			)}
		</div>
	);
};

export default RoundList;
