import React, { useState, useEffect, useCallback } from 'react';
import ScorecardContainer from '../ScorecardContainer/ScorecardContainer';
import ScoreChanger from '../ScoreChanger/ScoreChanger';
import roundsInstance from '../../api/RoundsAPI';
import { useHistory, Link } from 'react-router-dom';

const RoundSelected = (props) => {
	const history = useHistory();
	const [ formattedScores, setFormattedScores ] = useState([]);

	const formatScores = useCallback(
		() => {
			return props.selectedRound.scores.map((hole) => {
				const fScore = {};
				fScore[hole.hole_num] = hole.hole_score;
				return fScore;
			});
		},
		[ props.selectedRound.scores ]
	);

	const deleteRound = async (e) => {
		e.preventDefault();
		try {
			const response = await roundsInstance.delete(`/${props.selectedRound.id}/`);
			props.setSelectedRound({});
			props.populateRounds();
			return response;
		} catch (e) {
			console.log(e);
		}
		history.push('/rounds');
	};

	const updateRound = (hole_num, hole_score) => {
		const duplicateRound = JSON.parse(JSON.stringify(props.selectedRound));
		for (const score of duplicateRound.scores) {
			if (score.hole_num === Number(hole_num)) {
				score.hole_score = Number(hole_score);
			}
		}
		const putRequest = async () => {
			try {
				const body = {};
				body.player = localStorage.getItem('userID');
				body.total_score = duplicateRound.scores.map((score) => score.hole_score).reduce((a, b) => a + b);
				body.scores = duplicateRound.scores.map((score) => ({
					hole_num: score.hole_num,
					hole_score: score.hole_score
				}));
				const response = await roundsInstance.put(`/${props.selectedRound.id}/`, body);
				if (response.data) {
					history.push('/rounds');
				}
				return response;
			} catch (e) {
				console.log(e);
			}
		};
		putRequest();
		props.setSelectedRound(duplicateRound);
	};

	useEffect(
		() => {
			setFormattedScores(formatScores());
		},
		[ formatScores ]
	);

	return (
		<div>
			<ScorecardContainer scores={formattedScores} />
			<div className="round-detail-div">
				<Link to={'/rounds'} onClick={() => props.setSelectedRound({})}>
					Back to Previous Rounds
				</Link>
				<form className="round-delete-button" onSubmit={deleteRound}>
					<input type="submit" value="Delete Round" />
				</form>
			</div>
			<ScoreChanger selectedRound={props.selectedRound} updateRound={updateRound} />
		</div>
	);
};

export default RoundSelected;
