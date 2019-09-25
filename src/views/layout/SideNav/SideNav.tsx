import React from "react";

import styled from "styled-components";
import { SideNav, Nav } from "react-sidenav";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGlobe, faCreditCard, faCog, faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";

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

const FlexCont = styled.div<{ selected: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px 12px;
  color: ${props => (props.selected ? "#FFF" : "inherit")};
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  background: ${props => (props.selected ? "#242a31" : "inherit")};
  &:hover {
    background: #242a31;
  }
`;
const IconCont = styled.span<{ selected: boolean }>`
  color: ${props => (props.selected ? "#679D37" : "inherit")};
  line-height: 16px;
`;
const TextCont = styled.span<{ selected: boolean }>`
  padding-left: 6px;
  line-height: 22px;
`;
interface INavItemProp {
  icon: any;
  title: string;
  to: string,
  active: boolean,
}
const NavItem: React.FC<INavItemProp> = props => {
  return (
    <FlexCont selected={props.active}>
      <Link to={props.to}>
        <IconCont selected={props.active}>
          <FontAwesomeIcon icon={props.icon} />
        </IconCont>
        <TextCont selected={props.active}>{props.title}</TextCont>
      </Link>
    </FlexCont>
  );
};

const NavTitle = styled.div`
  padding: 8px;
  font-size: 0.92em;
`;
const SubTitle = styled.div<{ selected: boolean }>`
  display: flex;
  padding: 8px 22px;
  font-size: 0.88em;
  justify-content: flex-start;
  align-items: center;
  color: ${props => (props.selected ? "#FFF" : "inherit")} !important;
`;
const SubTitleIndicator = styled.div<{ selected: boolean }>`
  border-radius: 50%;
  width: 8px;
  height: 8px;
  background: ${props => (props.selected ? "#679D37" : "inherit")} !important;
`;
const SubNavItemTitle = styled.div<{selected:boolean}>`
  padding: 4px;
  color: ${props => (props.selected ? "#679D37" : "inherit")} !important;
`;

interface SubNavItemProps {
  active: boolean,
  to: string,
  title: string
}

const SubNavItem: React.FC<SubNavItemProps> = (props) => {
  return (
    <SubTitle selected={props.active}>
      <SubTitleIndicator selected={props.active} />
      <SubNavItemTitle selected={props.active}>
        <Link to={props.to}>
          {props.title}
        </Link>
      </SubNavItemTitle>
    </SubTitle>
  );
};

export default withRouter(({ location: { pathname } }: RouteComponentProps) => {
  return (
    <Container>
      <NavTitle>
        <FontAwesomeIcon icon={faMoneyBillWave} />
      </NavTitle>
      <SideNav defaultSelectedPath="1">
        <Nav id="1">
          <NavItem icon={faGlobe} title={"Dashboard"} to="/" active={pathname === '/'} />
        </Nav>
        <Nav id="2">
          <NavItem icon={faCreditCard} title={"Transactions"} to="/transactions" active={pathname === '/transactions'} />
          <Nav id="1">
            <SubNavItem to="/transactions" active={pathname === '/transactions'} title="Transactions" />
          </Nav>
          <Nav id="2">
            <SubNavItem to="/estimates" active={pathname === '/estimates'} title="Estimates" />
          </Nav>
          <Nav id="3">
            <SubNavItem to="/timeline" active={pathname === '/timeline'} title="Timeline" />
          </Nav>
          <Nav id="4">
            <SubNavItem to="/tags" active={pathname === '/tags'} title="Tags" />
          </Nav>
        </Nav>
        <Nav id="3">
          <NavItem icon={faCog} title={"Settings"} to="/settings" active={pathname === '/settings'} />
        </Nav>
      </SideNav>
    </Container>
  );
});
