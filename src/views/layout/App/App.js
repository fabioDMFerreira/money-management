
import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Navbar from 'reactstrap/lib/Navbar';
import Row from 'reactstrap/lib/Row';

import ErrorBoundary from '../ErrorBoundary';
import Main from '../Main';
import NavbarComponent from '../Navbar';
import SideNav from '../SideNav';

const App = () => (
  <Router>
    <div id="root">
      <Container fluid>
        <Row>
          <Col xs={2}>
            <SideNav />
          </Col>
          <Col xs={10} style={{ background: '#fff', minHeight: '100vh' }}>
            <Navbar id="navbar" color="primary" dark expand="md">
              <Container fluid>
                {/* <Header /> */}
                <NavbarComponent />
              </Container>
            </Navbar>
            <Container fluid className="pb-4">
              <ErrorBoundary>
                <Main />
              </ErrorBoundary>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>
);

export default App;
