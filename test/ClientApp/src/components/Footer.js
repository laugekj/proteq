import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import React, { Component } from 'react';
import './Reset.css';
import './Footer.css';
import Grid from '@material-ui/core/Grid';


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
                <MDBContainer id = 'footermiddle' fluid className="text-md-left"></MDBContainer>
                <MDBRow id ='footerRow'>
                <Grid container spacing={2}>
                        <Grid item xs={1} sm={1} id="tekst0">
                        </Grid>

                        <Grid item xs={2} sm={2} id="tekst1">
                            <p>Vores viden og erfaring inden <br />
                            for IT og jura bruger vi i arbejdet <br />
                            med GDPR, således at I får de sikreste <br />
                            løsninger og overholder GDPR så enkelt <br />
                            som muligt.</p>
                        </Grid>

                        <Grid item xs={1} sm={3} id="tekst2">
                            <p>Du kan altid kontakte os på +45 45 45 45 45</p>
                        </Grid>

                        <Grid item xs={1} sm={2} id="tekst3">
                        <p>Hvad er proteQ?</p>
                        </Grid>

                        <Grid item xs={1} sm={2} id="tekst3">
                        <p>kontakt os på mail: info@proteq.com
                        eller på telefon: +45 45 45 45 45</p>
                        </Grid>
                        </Grid>
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