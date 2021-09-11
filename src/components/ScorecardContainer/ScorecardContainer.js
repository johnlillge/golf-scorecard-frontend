import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ScorecardContainer.css';
import course from '../../data/course.json';

const ScorecardContainer = (props) => {
	const scoreFill = () => {
		const fillerScores = [];
		for (let i = props.scores.length + 1; i < 10; i++) {
			fillerScores.push({ [i]: '' });
		}
		const scoresCopy = props.scores.concat(fillerScores);
		return scoresCopy;
	};

	return (
		<div>
			<Container className="scorecard-container">
				<Row key="course-row" className="course-row default-row">
					<Col className="default-col">{course.name}</Col>
				</Row>

				<Row key="hole-row" className="hole-row default-row">
					<Col key="hole-row-first-col" xs={2} className="first-col default-col">
						Hole
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`hole-row-${index}`} className="default-col">
							{hole.hole_number}
						</Col>
					))}
					<Col key="hole-row-total" className="default-col">
						Total
					</Col>
				</Row>

				<Row key="champ-yds-row" className="champ-yds-row default-row">
					<Col key="champ-yds-first-col" xs={2} className="first-col default-col default-col">
						Championship Yards
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`champ-yds-row-${index}`} className="default-col">
							{hole.championship_yds}
						</Col>
					))}
					<Col key="champ-yds-row-total" className="default-col">
						{course.holes.map((hole) => hole.championship_yds).reduce((a, b) => a + b, 0)}
					</Col>
				</Row>

				<Row key="mens-yds-row" className="mens-yds-row default-row">
					<Col key="mens-yds-first-col" xs={2} className="first-col default-col">
						Mens Yards
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`mens-yds-row-${index}`} className="default-col">
							{hole.mens_yds}
						</Col>
					))}
					<Col key="mens-yds-row-total" className="default-col">
						{course.holes.map((hole) => hole.mens_yds).reduce((a, b) => a + b, 0)}
					</Col>
				</Row>

				<Row key="ladies-yds-row" className="ladies-yds-row default-row">
					<Col key="ladies-yds-first-col" xs={2} className="first-col default-col">
						Ladies Yards
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`ladies-yds-row-${index}`} className="default-col">
							{hole.ladies_yds}
						</Col>
					))}
					<Col key="ladies-yds-row-total" className="default-col">
						{course.holes.map((hole) => hole.ladies_yds).reduce((a, b) => a + b, 0)}
					</Col>
				</Row>

				<Row key="player-row" className="player-row default-row">
					<Col key="player-row-first-col" xs={2} className="first-col default-col">
						{localStorage.getItem('username') ? localStorage.getItem('username') : 'Your Name Here'}
					</Col>
					{scoreFill().map((score, index) => (
						<Col key={`player-row-${index}`} className="default-col">
							{score[`${index + 1}`]}
						</Col>
					))}
					<Col key="player-row-total" className="default-col">
						{props.scores
							.map((score, index) => score[`${index + 1}`])
							.reduce((a, b) => parseInt(a, 10) + parseInt(b, 10), 0)}
					</Col>
				</Row>

				<Row key="par-row" className="par-row default-row">
					<Col key="par-row-first-col" xs={2} className="first-col default-col">
						Par
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`par-row-${index}`} className="default-col">
							{hole.par}
						</Col>
					))}
					<Col key="par-row-total" className="default-col">
						{course.holes.map((hole) => hole.par).reduce((a, b) => a + b, 0)}
					</Col>
				</Row>

				<Row key="handicap-row" className="handicap-row default-row">
					<Col key="handicap-row-first-col" xs={2} className="first-col default-col">
						Handicap
					</Col>
					{course.holes.map((hole, index) => (
						<Col key={`handicap-row-${index}`} className="default-col">
							{hole.handicap}
						</Col>
					))}
					<Col key="handicap-row-blank" className="default-col" />
				</Row>
			</Container>
		</div>
	);
};

export default ScorecardContainer;
