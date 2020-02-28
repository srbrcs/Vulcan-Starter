import React from 'react';
import { Components, registerComponent, withCurrentUser } from 'meteor/vulcan:core';
import { Link } from 'react-router-dom';
import Users from 'meteor/vulcan:users';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { IndexLinkContainer } from 'react-router-bootstrap';

const NavLink = ({ to, label }) => (
  <Nav.Item eventKey={to}>
    <IndexLinkContainer to={to}>
      <Nav.Link>{label}</Nav.Link>
    </IndexLinkContainer>
  </Nav.Item>
);

const Header = ({ currentUser }) => (
  <div className="header">
    <Navbar collapseOnSelect expand="lg" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav variant="tabs" expand="lg">
          <NavLink to="/" label="Survey" />
          {currentUser && <NavLink to="/account" label="Account" />}
          {Users.isAdmin(currentUser) && (
            <>
              <NavLink to="/admin/surveys" label="Surveys Dashboard" />{' '}
              <NavLink to="/admin/responses" label="Responses Dashboard" />
              <NavLink to="/admin/users" label="Users Dashboard" />
            </>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </div>
);

registerComponent('Header', Header, withCurrentUser);

export default Header;
