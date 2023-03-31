import React from 'react';
import { Figure, Navbar } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import logo from '../assests/HI.png';
export default function BrandLogo() {
  return (
    <LinkContainer to="/">
      <Navbar.Brand>
        <Figure>
          <Figure.Image
            width={100}
            height={100}
            className="rounded ms-1 mb-3 mt-3"
            alt="logo"
            src={logo}
          />
        </Figure>
      </Navbar.Brand>
    </LinkContainer>
  );
}
