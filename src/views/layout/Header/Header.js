import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavbarBrand } from 'reactstrap';

import styles from './Header.css';

export default () => (
  <NavbarBrand>
    <FontAwesomeIcon icon={faMoneyBillWave} />
  </NavbarBrand>
);
