import './Header.css';

import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavbarBrand } from 'reactstrap';

export default () => (
  <NavbarBrand>
    <FontAwesomeIcon icon={faMoneyBillWave} />
  </NavbarBrand>
);
