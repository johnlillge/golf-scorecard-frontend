import React, { useState, useEffect } from 'react';
import NoRoundsMessage from '../../components/NoRoundsMessage/NoRoundsMessage';
import roundsInstance from '../../api/RoundsAPI';
import ScorecardContainer from '../../components/ScorecardContainer/ScorecardContainer';

const AverageScorePage = () => {
	const [ scores, setScores ] = useState([]);
	const [ hasScores, setHasScores ] = useState(false);

	const populateScores = async () => {
		const avgScores = [ { 1: 0 }, { 2: 0 }, { 3: 0 }, { 4: 0 }, { 5: 0 }, { 6: 0 }, { 7: 0 }, { 8: 0 }, { 9: 0 } ];
		try {
			const response = await roundsInstance.get(`?player=${localStorage.getItem('userID')}`);
			const userRounds = response.data;
			for (const round of userRounds) {
				for (const score of round.scores) {
					avgScores[score.hole_num - 1][score.hole_num] += score.hole_score;
				}
			}
			for (let i = 0; i < 9; i++) {
				avgScores[i][i + 1] = Number((avgScores[i][i + 1] / userRounds.length).toFixed(0));
			}
			setScores(avgScores);
			if (userRounds.length > 0) {
				setHasScores(true);
			}
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		populateScores();
	}, []);

	return (
		<div>
			<h1 className="page-header">Combination of Average Scores</h1>
			{hasScores ? <ScorecardContainer scores={scores} /> : <NoRoundsMessage />}
		</div>
	);
};

export default AverageScorePage;
