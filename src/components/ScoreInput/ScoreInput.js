import React, { useState } from 'react';
import course from '../../data/course.json';
import './ScoreInput.css';

const ScoreInput = (props) => {
	const [ holeScore, setHoleScore ] = useState('');
	const current_hole = course.holes[props.scores.length];

	const handleChange = (e) => {
		e.preventDefault();
		setHoleScore(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		props.addNewScore({ [current_hole.hole_number]: holeScore });
		setHoleScore('');
	};
	return (
		<div className="input-container">
			<h4>{`Current Hole: ${current_hole.hole_number}`}</h4>
			<h4>{`Par: ${current_hole.par}`}</h4>
			<form onSubmit={handleSubmit}>
				<label>
					Score:
					<input type="number" value={holeScore} autoFocus="autofocus" onChange={handleChange} />
				</label>
				<input type="submit" value="Submit" />
			</form>
		</div>
	);
};

export default ScoreInput;
