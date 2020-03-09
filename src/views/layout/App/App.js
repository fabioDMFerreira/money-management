
import './App.css';

import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import UserBar from 'views/layout/UserBar';

import ErrorBoundary from '../ErrorBoundary';
import Main from '../Main';
import SideNav from '../SideNav';

const App = () =>


// if (!isAuthenticated) {
//   getTokenSilently({
//     audience: 'https://mmanagement.auth0.com/api/v2/'
//   })
//     .then(token => {
//       console.log({ token });
//     })
//     .catch(err => {
//       loginWithRedirect({
//         audience: 'https://mmanagement.auth0.com/api/v2/'
//       });
//     })

//   return <span>Loading...</span>
// }

// useEffect(() => {
//   const fetchAlbums = async () => {
//     const idTokenClaims = await getIdTokenClaims();
//     const accessToken = await getTokenSilently();
//     if (!idTokenClaims) {
//       return;
//     }
//     const result = await fetch('/api/albums', {
//       method: 'GET',
//       headers: {
//         Authorization: 'Bearer ' + idTokenClaims.__raw
//       }
//     });
//     const data = await result.json();
//     console.log(data);
//   }

//   fetchAlbums()
// }, [])

  (
    <Router>
      <div id="root">
        <Container fluid>
          <Row>
            <Col xs={2}>
              <SideNav />
            </Col>
            <Col xs={10} style={{ background: '#fff', minHeight: '100vh' }}>
              <UserBar />
              <Container fluid className="pb-4">
                <ErrorBoundary>
                  <Main />
                </ErrorBoundary>
              </Container>
            </Col>
          </Row>
        </Container>
      </div>
    </Router >
  );
export default App;
