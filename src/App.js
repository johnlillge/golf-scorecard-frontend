import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import AppNav from './components/AppNav/AppNav.js';
import HomePage from './pages/HomePage/HomePage.js';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Logout from './components/Logout/Logout';
import RoundPage from './pages/RoundPage/RoundPage';
import BestScoresPage from './pages/BestScoresPage/BestScoresPage';
import AverageScorePage from './pages/AverageScoresPage/AverageScorePage';

function App() {
	return (
		<div>
			<Router>
				<AppNav />
				<div>
					<Route exact path="/" component={HomePage} />
					{localStorage.getItem('userID') ? (
						<Switch>
							<Route exact path="/rounds" component={RoundPage} />
							<Route exact path="/best-scores" component={BestScoresPage} />
							<Route exact path="/average-scores" component={AverageScorePage} />
							<Route exact path="/signin" render={(props) => <Redirect {...props} to={'/'} />} />
							<Route exact path="/signup" render={(props) => <Redirect {...props} to={'/'} />} />
							<Route exact path="/logout" component={Logout} />
						</Switch>
					) : (
						<Switch>
							<Route exact path="/rounds" render={(props) => <Redirect {...props} to={'/signin'} />} />
							<Route
								exact
								path="/best-scores"
								render={(props) => <Redirect {...props} to={'/signin'} />}
							/>
							<Route
								exact
								path="/average-scores"
								render={(props) => <Redirect {...props} to={'/signin'} />}
							/>
							<Route exact path="/signin" render={(props) => <LoginPage {...props} />} />
							<Route exact path="/signup" render={(props) => <SignupPage {...props} />} />
							<Route exact path="/logout" render={(props) => <Redirect {...props} to={'/'} />} />
						</Switch>
					)}
				</div>
			</Router>
		</div>
	);
}

export default App;
