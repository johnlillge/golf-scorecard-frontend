import React, { useState, useEffect } from 'react';
import roundsInstance from '../../api/RoundsAPI';
import RoundList from '../../components/RoundList/RoundList';
import RoundSelected from '../../components/RoundSelected/RoundSelected';

const RoundPage = () => {
	const [ rounds, setRounds ] = useState([]);
	const [ selectedRound, setSelectedRound ] = useState({});

	const populateRounds = async () => {
		try {
			const response = await roundsInstance.get(`?player=${localStorage.getItem('userID')}`);
			setRounds(response.data);
			return response;
		} catch (e) {
			console.log(e);
		}
	};

	useEffect(() => {
		populateRounds();
	}, []);

	return (
		<div>
			{selectedRound.scores ? (
				<RoundSelected
					selectedRound={selectedRound}
					setSelectedRound={setSelectedRound}
					populateRounds={populateRounds}
				/>
			) : (
				<RoundList rounds={rounds} setSelectedRound={setSelectedRound} />
			)}
		</div>
	);
};

export default RoundPage;
