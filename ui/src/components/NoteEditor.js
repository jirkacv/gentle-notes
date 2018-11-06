import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

import { Translate } from 'react-redux-i18n';


export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        }
    }

    componentWillReceiveProps(newProps) {
        const { note } = newProps;
        if (note) {
            this.setState({ text: note.text });
        }
    }

    handleChange = e => this.setState({ text: e.target.value });

    clearText = () => this.setState({ text: '' });

    closeDialog = () => {
        const { toggle } = this.props;
        this.setState({ text: '' });
        toggle();
    }

    handleSave = () => {
        const { updateNote, addNote, note } = this.props;
        const { text } = this.state;

        if (note) {
            updateNote(note.id, text);
        } else {
            addNote(text);
        }

        this.closeDialog();
    }

    render() {
        const { isOpen, note } = this.props
        const { text } = this.state;

        let isNewNote = !note;

        return (
            <Modal isOpen={isOpen} toggle={this.closeDialog}>
                <ModalHeader ><Translate value={isNewNote ? 'addNote' : 'editNote'} /></ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="noteText"><Translate value="note" /></Label>
                            <Input type="textarea" name="noteText" id="noteText" value={text} onChange={this.handleChange} rows={6} />
                        </FormGroup>
                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" disabled={text.trim() === ''} onClick={this.handleSave}><Translate value="save" /></Button>
                    <Button color="secondary" onClick={this.closeDialog}><Translate value="cancel" /></Button>
                </ModalFooter>
            </Modal>
        );
    }
}