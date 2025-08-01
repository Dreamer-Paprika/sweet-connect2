import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Container = styled.div`
  flex-grow: 1;
  margin: 0 auto;
  padding: 0 16px;
`;

export const Frame = styled.div`
  border-radius: 50%;
  background-color:#FFB8CA;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  border: 3px solid #fff;
  box-shadow: inset 0 0 10px 5px rgba(0, 0, 0, 0.3);
`;

export const Icon = styled.svg`
  fill: rgb(114, 17, 17);
`;

export const IconLabel = styled.span`
  font-family: 'Sacramento';
  font-size: 40px;
  font-weight: 700;
  color: #fff;
  text-shadow: 3px 3px 20px rgb(114, 17, 17), 5px 5px 5px #000000;
  margin: 5px;

  &::first-letter {
    font-size: 30px;
  }
`;

export const Greeting = styled.div`
  font-family: 'Sansita Swashed';
  font-size: 25px;
  color: #fff;

  margin: 2px;
  display: inline-block;
  font-weight: 700;
  &::first-letter {
    font-size: 30px;
  }
`;

export const Header = styled.header`
  width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 20px;
  margin-bottom: 8px;
  margin-top: 8px;
  border: none;
  background-color: #c4253a;
  background-image: linear-gradient(to bottom, #c4253a 40%, #ffb8ca);
  border-radius: 30px;
  filter: drop-shadow(0px 8px 8px rgba(0, 0, 0, 0.3));
  

  &:hover {
    
  }

  > nav {
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'DM Sans';
    padding: 10px;
    gap: 5px;
  }
`;

export const Logo = styled.div`
  margin-left: 10px;
  font-weight: 700;
  display: flex;
  align-items: flex-end;
`;

export const Link = styled(NavLink)`
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
  }

  &.active {
  }

  &:hover {
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  color: #fff;
  font-weight: 700;
  background-color: inherit;
  border: none;
  cursor: pointer;
  font-size: 16px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    display: block;
    width: 100%;
    height: 4px;
    border-radius: 2px;
    background-color: #fff;
    transform: scaleX(0);
    transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1);
    transform-origin: left;
  }

  &:hover {
  }

  &:hover::after {
    transform: scaleX(1);
  }

  &.active::after {
    transform: scaleX(1);
  }
`;

export const Symbol = styled(NavLink)`
  text-decoration: none;
  transition-property: transform;
  transition-duration: 250ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: scale(1.1);
    
  }
`;
