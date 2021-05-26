import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './Navmenu/NavMenu';
import { NavMenuUser } from './Navmenu/NavMenuUser';
import { NavMenuAdmin } from './Navmenu/NavMenuAdmin';
import { Footer } from './Footer';

export class Layout extends Component {
  static displayName = Layout.name;

  constructor(props) {
    super(props);
    this.state = { 
        isLoggedIn: false,
        isAdmin: false
            };
  
  
}

  componentDidMount() {
    var loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
        this.setState({isLoggedIn: true});
        var foundUser = JSON.parse(loggedInUser);
        var foundUserIsAdmin = JSON.parse(foundUser.isAdmin)
        this.setState({isAdmin: foundUserIsAdmin});
    }
}

  render () {

    if (this.state.isLoggedIn) {
      if (this.state.isAdmin) {
        return (
          <div>
            <NavMenuAdmin />
            <Container>
              {this.props.children}
            </Container>
            <Footer />
          </div>
        );
      } else {
        return (
          <div>
            <NavMenuUser />
            <Container>
              {this.props.children}
            </Container>
            <Footer />
          </div>
        );
      }
      } else {
      return (
        <div>
          <NavMenu />
          <Container>
            {this.props.children}
          </Container>
          <Footer />
        </div>
      );
    }
  }
}
