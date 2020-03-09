import React, { useState } from 'react';
import Col from 'reactstrap/lib/Col';
import Container from 'reactstrap/lib/Container';
import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import Row from 'reactstrap/lib/Row';
import { Auth0User } from 'views/providers/react-auth0-spa.provider';

interface UserBarProps {
  user: Auth0User;
  logout: () => void;
}

export default ({ user, logout }: UserBarProps) => {
  const [userActionsDropdownOpen, setDropdown] = useState(false);
  const toggleUserDropdown = () => setDropdown(!userActionsDropdownOpen);

  return (
    <Container fluid>
      <Row >
        <Col xs={6} />
        <Col xs={6}>
          <Dropdown isOpen={userActionsDropdownOpen} toggle={toggleUserDropdown} className="float-right">
            <DropdownToggle nav caret>
              <img src={user.picture} alt="profile" className="rounded-circle img-fluid img-thumbnail" width={30} height={30} />
              {' '}{user.nickname}
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem header>
                {user.email}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={logout}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </Container>
  );
};
