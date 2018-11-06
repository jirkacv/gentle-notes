import React, { Component } from 'react';
import { Container, Row } from 'reactstrap';

import NotesListContainer from '../containers/NotesListContainer';

export default class Notes extends Component {
    render() {
        return (
            <Container>
                <Row>
                    <NotesListContainer />
                </Row>
            </Container>);
    }
}