import React from 'react';
import roundsInstance from '../../api/RoundsAPI';
import { useHistory } from 'react-router-dom';
import './ScoreSubmit.css';

const ScoreSubmit = (props) => {
	const history = useHistory();

	const handleSubmit = (e) => {
		e.preventDefault();
		const postRound = async () => {
			try {
				const body = {};
				body.player = localStorage.getItem('userID');
				body.total_score = props.scores
					.map((score, index) => score[`${index + 1}`])
					.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0);
				body.scores = props.scores.map((score, index) => ({
					hole_num: index + 1,
					hole_score: parseInt(Object.values(score)[0], 10)
				}));
				const response = await roundsInstance.post('/', body);
				if (response.data) {
					history.push('/rounds');
				}
				return response;
			} catch (e) {
				console.log(e);
			}
		};
		postRound();
	};

	return (
		<div>
			<form className="score-submit" onSubmit={handleSubmit}>
				<input type="submit" value="Submit Round" />
			</form>
		</div>
	);
};

export default ScoreSubmit;
