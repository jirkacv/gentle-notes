import React, { Component } from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';


export default class LanguageDropdown extends Component {

    renderLocales = () => {
        const { availableLocales, setLocale } = this.props;

        return availableLocales.map(l =>
            <DropdownItem key={l} tabIndex={0} onClick={() => setLocale(l)}>{l}</DropdownItem>);
    }

    render() {
        const { currentLocale } = this.props;

        return (
            <UncontrolledDropdown>
                <DropdownToggle caret>
                    {currentLocale}
                </DropdownToggle>
                <DropdownMenu>
                    {this.renderLocales()}
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}