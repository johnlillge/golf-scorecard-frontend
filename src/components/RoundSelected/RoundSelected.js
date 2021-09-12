import React, { useState, useEffect, useCallback } from 'react';
import ScorecardContainer from '../ScorecardContainer/ScorecardContainer';
import ScoreChanger from '../ScoreChanger/ScoreChanger';
import roundsInstance from '../../api/RoundsAPI';
import { useHistory } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

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
				<Card className="text-center" border="secondary">
					<Card.Header>
						<h4>Update a Score</h4>
					</Card.Header>
					<Card.Body>
						<ScoreChanger selectedRound={props.selectedRound} updateRound={updateRound} />
					</Card.Body>
					<Card.Footer>
						<div />
					</Card.Footer>
					<Card.Footer>
						<Row>
							<div className="col ml-0 px-0 text-start">
								<Button
									className="btn-sm pl-0"
									href={'/rounds'}
									onClick={() => {
										props.setSelectedRound({});
										props.populateRounds();
									}}
								>
									Previous Rounds
								</Button>
							</div>
							<div className="col mr-0 px-0 text-end">
								<Button
									className="btn-sm pr-0"
									variant="danger"
									type="submit"
									value="Delete Round"
									onSubmit={deleteRound}
								>
									Delete Round
								</Button>
							</div>
						</Row>
					</Card.Footer>
				</Card>
			</div>
		</div>
	);
};

export default RoundSelected;
