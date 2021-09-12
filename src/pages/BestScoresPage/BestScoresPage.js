import React, { useState, useEffect } from 'react';
import NoRoundsMessage from '../../components/NoRoundsMessage/NoRoundsMessage';
import roundsInstance from '../../api/RoundsAPI';
import ScorecardContainer from '../../components/ScorecardContainer/ScorecardContainer';

const BestScoresPage = () => {
	const [ scores, setScores ] = useState([]);
	const [ hasScores, setHasScores ] = useState(false);

	const populateScores = async () => {
		const bestScores = [
			{ 1: 20 },
			{ 2: 20 },
			{ 3: 20 },
			{ 4: 20 },
			{ 5: 20 },
			{ 6: 20 },
			{ 7: 20 },
			{ 8: 20 },
			{ 9: 20 }
		];
		try {
			const response = await roundsInstance.get(`?player=${localStorage.getItem('userID')}`);
			const userRounds = response.data;
			for (const round of userRounds) {
				for (const score of round.scores) {
					if (Object.values(bestScores[score.hole_num - 1])[0] > score.hole_score) {
						bestScores[score.hole_num - 1][score.hole_num] = score.hole_score;
					}
				}
			}
			setScores(bestScores);
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
			<h1 className="page-header">Combination of Best Scores</h1>
			{hasScores ? <ScorecardContainer scores={scores} /> : <NoRoundsMessage />}
		</div>
	);
};

export default BestScoresPage;
