import React from 'react';
import { Navbar, Nav, Form, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AppNav = () => {
	const authButton = () => {
		if (!localStorage.getItem('username')) {
			return (
				<ButtonGroup>
					<Button variant="secondary" as={Link} to="/signin">
						Signin
					</Button>&nbsp;
					<Button variant="secondary" as={Link} to="/signup">
						Signup
					</Button>
				</ButtonGroup>
			);
		} else {
			return (
				<Button variant="secondary" as={Link} to="/logout">
					Logout
				</Button>
			);
		}
	};

	return (
		<Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" className="mb-3">
			<Navbar.Toggle aria-controls="responsive-navbar-nav" />
			<Navbar.Collapse id="responsive-navbar-nav">
				<Nav className="mr-auto">
					<Nav.Link as={Link} to="/">
						Home
					</Nav.Link>
					<Nav.Link as={Link} to="/rounds">
						My Previous Rounds
					</Nav.Link>
				</Nav>
			</Navbar.Collapse>
			<Form inline="true" className="mx-3">
				{authButton()}
			</Form>
		</Navbar>
	);
};

export default AppNav;
