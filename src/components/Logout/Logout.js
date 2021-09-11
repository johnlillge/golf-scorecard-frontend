import React, { useEffect } from 'react';
import axiosInstance from '../../api/AuthAPI';
import { useHistory } from 'react-router-dom';

const Logout = () => {
	const history = useHistory();

	useEffect(() => {
		const logoutFunc = async () => {
			try {
				const response = await axiosInstance
					.post('/blacklist/', {
						refresh_token: localStorage.getItem('refresh_token')
					})
					.then(() => {
						localStorage.removeItem('access_token');
						localStorage.removeItem('refresh_token');
						localStorage.removeItem('username');
						localStorage.removeItem('userID');
						axiosInstance.defaults.headers['Authorization'] = null;
						history.go(0);
						return response;
					});
			} catch (e) {
				console.log(e);
			}
		};
		logoutFunc();
	});
	return <div>Should be logged out</div>;
};

export default Logout;
