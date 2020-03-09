import React, { useState } from 'react';
import Col from 'reactstrap/lib/Col';
import Dropdown from 'reactstrap/lib/Dropdown';
import DropdownItem from 'reactstrap/lib/DropdownItem';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import Row from 'reactstrap/lib/Row';
import { Auth0User } from 'views/providers/react-auth0-spa.provider';

interface UserBarProps {
  user: Auth0User;
  logout: (options: any) => void;
}

export default ({ user, logout }: UserBarProps) => {
  const [userActionsDropdownOpen, setDropdown] = useState(false);
  const toggleUserDropdown = () => setDropdown(!userActionsDropdownOpen);

  return (
    <div className="mb-4" style={{ borderBottom: '1px solid rgba(0, 0, 0, 0.125)' }}>

      <Row >
        <Col xs={6} />
        <Col xs={6}>
          <Dropdown isOpen={userActionsDropdownOpen} toggle={toggleUserDropdown} className="float-right">
            <DropdownToggle nav caret>
              <img src={user.picture} alt="profile" className="rounded-circle img-fluid img-thumbnail" width={30} height={30} />
              {' '}{user.nickname}
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem header>
                {user.email}
              </DropdownItem>
              <DropdownItem divider />
              <DropdownItem onClick={() => logout({ returnTo: window.location.origin })}>Logout</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};
