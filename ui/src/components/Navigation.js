import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav } from 'reactstrap';
import { Translate } from 'react-redux-i18n';

import LanguageDropdownContainer from '../containers/LangaugeDropdownContainer'



export default class Navigation extends Component {
    render() {
        return (
            <Navbar color="light" light expand="md" >
                <NavbarBrand href="/">GentleNotes</NavbarBrand>
                <Translate value='title' />
                <Nav className="ml-auto" navbar>
                    <LanguageDropdownContainer />
                </Nav>

            </Navbar>)
    }
}