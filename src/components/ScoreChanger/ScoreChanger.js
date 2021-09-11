import React, { useState } from 'react';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

const ScoreChanger = (props) => {
	const [ selectedHole, setSelectedHole ] = useState('Hole');
	const [ newScore, setNewScore ] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		props.updateRound(selectedHole, newScore);
		setSelectedHole('Hole');
		setNewScore('');
	};

	return (
		<div className="score-change-div">
			Update a Score
			<InputGroup>
				<DropdownButton variant="outline-secondary" title={selectedHole}>
					{props.selectedRound.scores.map((score) => (
						<Dropdown.Item onClick={() => setSelectedHole(`${score.hole_num}`)}>
							{score.hole_num}
						</Dropdown.Item>
					))}
				</DropdownButton>
				<FormControl
					type="number"
					value={newScore}
					onChange={(e) => setNewScore(e.target.value)}
					aria-label="Enter new score"
				/>
				<Button onClick={handleSubmit}>Submit</Button>
			</InputGroup>
		</div>
	);
};

export default ScoreChanger;
