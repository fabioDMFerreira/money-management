import React from 'react';
import Nav from "reactstrap/lib/Nav";
import NavItem from "reactstrap/lib/NavItem";
import NavLink from "reactstrap/lib/NavLink";
import { Link, withRouter } from "react-router-dom";
import { RouteComponentProps } from 'react-router';
import classnames from 'classnames';

const FinancialForecastNavbar = ({ location: { pathname } }: RouteComponentProps<any>) => (
  <Nav tabs>
    <NavItem>
      <NavLink
        className={classnames({ active: pathname === '/transactions' })}
        tag={Link}
        to="/transactions"
      >
        Transactions
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={classnames({ active: pathname === '/estimates' })}
        tag={Link}
        to="/estimates"
      >
        Estimates
    </NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={classnames({ active: pathname === '/timeline' })}
        tag={Link}
        to="/timeline"
      >
        Timeline
</NavLink>
    </NavItem>
    <NavItem>
      <NavLink
        className={classnames({ active: pathname === '/tags' })}
        tag={Link}
        to="/tags"
      >
        Tags
</NavLink>
    </NavItem>
    {/* <NavItem>
      <NavLink
        className={classnames({ active: pathname === '/settings' })}
        tag={Link}
        to="/settings"
      >
        Settings
</NavLink>
    </NavItem> */}
  </Nav>
)

export default withRouter(FinancialForecastNavbar);
