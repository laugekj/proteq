import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import React, { Component } from 'react';
import './Reset.css';
import './Footer.css';


export class Footer extends Component {
    static displayName = Footer.name;

    render () {
          return (
            <MDBFooter className="font-small pt-4 mt-4">
              <MDBContainer id = 'footerBar' fluid className="text-md-left">
                <MDBRow id ='footerRow'>
                    <ul>
                      <li className="list">
                        <a href="#!">Om os</a>
                      </li>
                      <li className="list">
                        <a href="#!">Kundeservice</a>
                      </li>
                      <li className="list">
                        <a href="#!">FAQ </a>
                      </li>
                      <li className="list">
                        <a href="#!">Kontakt os</a>
                      </li>
                    </ul>
                </MDBRow>
              </MDBContainer>
              <div  id = 'buttomFooter' className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                  &copy; {new Date().getFullYear()} Copyright: ProteQ
                </MDBContainer>
              </div>
            </MDBFooter>
          );
        }
    }