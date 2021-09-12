import React, { useState } from 'react';
import course from '../../data/course.json';
import './ScoreInput.css';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

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
			<Card className="text-center" border="secondary">
				<Card.Body>
					<Card.Title>{`Current Hole: ${current_hole.hole_number}`}</Card.Title>
					<Card.Text>{`Par: ${current_hole.par}`}</Card.Text>
					<InputGroup>
						<FormControl
							type="number"
							value={holeScore}
							autoFocus="autofocus"
							onChange={handleChange}
							aria-label="Enter new score"
						/>
						<Button onClick={handleSubmit}>Submit</Button>
					</InputGroup>
				</Card.Body>
			</Card>
		</div>
	);
};

export default ScoreInput;
