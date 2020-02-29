

import { faCloud, faCogs, faCreditCard, faGlobe, faMoneyBillWave, faTag, faWallet } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DASHBOARD, FORECAST, RULES, TAG_TRANSACTIONS, TAGS, TIMELINE, TRANSACTIONS, WALLETS } from 'locale/consts';
import React from 'react';
import { Translate } from 'react-localize-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Nav, SideNav } from 'react-sidenav';
import styled from 'styled-components';
import LanguagesToggle from 'views/containers/LanguagesToggle';


const Container = styled.div`
  background: #2d353c;
  color: #a8acb1;

  a{
    color:#fff;

    &:hover{
      text-decoration:none;
      color:#fff;
    }
  }
`;

const FlexCont = styled.div < { selected: boolean } >`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  color: ${props => (props.selected ? '#FFF' : 'inherit')};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: ${props => (props.selected ? '#242a31' : 'inherit')};
  &:hover {
    background: #242a31;
  }
`;
const IconCont = styled.span < { selected: boolean } >`
  color: ${props => (props.selected ? '#679D37' : 'inherit')};
  line-height: 16px;
`;
const TextCont = styled.span < { selected: boolean } >`
  padding-left: 6px;
  line-height: 22px;
`;
interface NavItemProp {
  icon: any;
  title: string;
  to: string;
  active: boolean;
}
const NavItem: React.FC<NavItemProp> = (props: any) => (
  <FlexCont selected={props.active}>
    <Link to={props.to}>
      <IconCont selected={props.active}>
        <FontAwesomeIcon icon={props.icon} />
      </IconCont>
      <TextCont selected={props.active}><Translate id={props.title} /></TextCont>
    </Link>
  </FlexCont>
);

const NavTitle = styled.div`
  padding: 8px;
  font-size: 0.92em;
`;
const SubTitle = styled.div < { selected: boolean } >`
  display: flex;
  padding: 8px 22px;
  font-size: 0.88em;
  justify-content: flex-start;
  align-items: center;
  color: ${props => (props.selected ? '#FFF' : 'inherit')} !important;
`;
const SubTitleIndicator = styled.div < { selected: boolean } >`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background: ${props => (props.selected ? '#679D37' : 'inherit')} !important;
`;
const SubNavItemTitle = styled.div < { selected: boolean } >`
  padding: 4px;
  color: ${props => (props.selected ? '#679D37' : 'inherit')} !important;
`;

interface SubNavItemProps {
  active: boolean;
  to: string;
  title: string;
}

const SubNavItem: React.FC<SubNavItemProps> = (props: any) => (
  <SubTitle selected={props.active}>
    <SubTitleIndicator selected={props.active} />
    <SubNavItemTitle selected={props.active}>
      <Link to={props.to}>
        <Translate id={props.title} />
      </Link>
    </SubNavItemTitle>
  </SubTitle>
);

export default withRouter(({ location: { pathname } }: RouteComponentProps) =>
// const { logout } = useAuth0();

  (
    <Container>
      <NavTitle>
        <FontAwesomeIcon icon={faMoneyBillWave} />
      </NavTitle>
      <SideNav defaultSelectedPath="1">
        <Nav id="1">
          <div id="dashboard-link">
            <NavItem icon={faGlobe} title={DASHBOARD} to="/" active={pathname === '/'} />
          </div>
        </Nav>
        <Nav id="2">
          <div id="wallets-link">
            <NavItem icon={faWallet} to="/wallets" active={pathname === '/wallets'} title={WALLETS} />
          </div>
        </Nav>
        <Nav id="3">
          <div id="transactions-link">
            <NavItem icon={faCreditCard} title={TRANSACTIONS} to="/transactions" active={pathname === '/transactions'} />
          </div>
          <Nav id="1">
            <SubNavItem to="/transactions" active={pathname === '/transactions'} title={TRANSACTIONS} />
          </Nav>
          {/* <Nav id="2">
            <SubNavItem to="/estimates" active={pathname === '/estimates'} title="Estimates" />
          </Nav> */}
          <Nav id="3">
            <SubNavItem to="/timeline" active={pathname === '/timeline'} title={TIMELINE} />
          </Nav>
          <Nav id="4">
            <SubNavItem to="/transactions/tags" active={pathname === '/transactions/tags'} title={TAGS} />
          </Nav>
          <Nav id="5">
            <SubNavItem to="/transactions/tag-transactions" active={pathname === '/transactions/tag-transactions'} title={TAG_TRANSACTIONS} />
          </Nav>
        </Nav>
        <Nav id="3">
          <div id="forecast-link">
            <NavItem icon={faCloud} to="/forecast" active={pathname === '/forecast'} title={FORECAST} />
          </div>
        </Nav>
        <Nav id="5">
          <div id="tags-link">
            <NavItem icon={faTag} title={TAGS} to="/tags" active={pathname === '/tags'} />
          </div>
        </Nav>
        <Nav id="6">
          <div id="rules-link">
            <NavItem icon={faCogs} title={RULES} to="/rules" active={pathname === '/rules'} />
          </div>
        </Nav>
        {/* <Nav id="7">
          <div>
            <Button color="link" style={{ color: 'red' }} onClick={() => logout()}>Logout</Button>
          </div>
        </Nav> */}
      </SideNav>
      <div className="mt-4">
        <LanguagesToggle />
      </div>
    </Container>
  ));
