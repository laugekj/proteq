import React, { Component } from 'react';
import { Collapse, Container, Navbar, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import './../Reset.css';
import Logo from "./../images/logo-enkel-gdpr.png"


export class NavMenuUser extends Component {
  static displayName = NavMenuUser.name;

  constructor (props) {
    super(props);
    this.state = {
      user: localStorage.getItem("user")
    };
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

    handleLogout () {
    localStorage.clear();
  }

  render () {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container className="nav-container">
          <img src={Logo} alt="website logo"/>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} className="nav-text" to="/dashboard">Startside</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="nav-text" to="/Profile">Min Profil</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink tag={Link} className="nav-text" to="/logout">Log ud</NavLink>
                </NavItem>

              </ul>
            </Collapse>
          </Container>
        </Navbar>
      </header>
    );
  }
}