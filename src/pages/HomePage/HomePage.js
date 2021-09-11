import React, { useState } from 'react';
import ScoreInput from '../../components/ScoreInput/ScoreInput';
import ScoreSubmit from '../../components/ScoreSubmit/ScoreSubmit';
import ScorecardContainer from '../../components/ScorecardContainer/ScorecardContainer';
import SigninMessage from '../../components/SigninMessage/SigninMessage';

const HomePage = () => {
	const [ scores, setScores ] = useState([]);

	const addNewScore = (holeScore) => {
		const currentScores = [ ...scores ];
		currentScores.push(holeScore);
		setScores(currentScores);
	};

	return (
		<div>
			{<ScorecardContainer scores={scores} />}
			<br />
			{!localStorage.getItem('userID') && <SigninMessage />}
			{localStorage.getItem('userID') &&
			scores.length < 9 && <ScoreInput scores={scores} addNewScore={addNewScore} />}
			{localStorage.getItem('userID') && scores.length === 9 && <ScoreSubmit scores={scores} />}
		</div>
	);
};

export default HomePage;
