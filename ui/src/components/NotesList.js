import React, { Component } from 'react';
import { Table, Button, ButtonGroup } from 'reactstrap'
import { Translate } from 'react-redux-i18n';
import NoteEditor from './NoteEditor';
import { format } from 'date-fns'

export default class NotesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorOpened: false,
            currentNote: null
        }
    }

    componentDidMount = () => {
        const { loadNotes } = this.props;
        loadNotes();
    }

    closeEditor = () => {
        this.setState({
            currentNote: null,
            editorOpened: false
        });
    }

    openNewEditor = () => {
        this.setState({
            currentNote: null,
            editorOpened: true
        });

    }

    openEditEditor = id => {
        const { notes } = this.props;
        this.setState({
            currentNote: (notes || []).filter(i => i.id === id)[0],
            editorOpened: true
        });

    }

    renderActions = id => {
        const { deleteNote } = this.props;

        return (
            <ButtonGroup className="float-right">
                <Button
                    size="sm"
                    onClick={() => this.openEditEditor(id)}>
                    <Translate value="edit" />
                </Button>
                <Button
                    size="sm"
                    color="danger"
                    onClick={() => deleteNote(id)}>
                    <Translate value="delete" />
                </Button>
            </ButtonGroup>);

    }

    formatDate = date => {
        if (!date) {
            return '';
        }

        const { dateFormat } = this.props;
        return format(date, dateFormat);
    }

    getShortText = text => {
        if (text.length > 60) {
            return `${text.substring(0, 60)}...`
        }
        return text;
    }

    renderRows = () => {
        const { notes } = this.props;

        if (!notes || (notes && notes.length === 0)) {
            return (
                <tr>
                    <td><Translate value='noData' /></td>
                </tr>

            );
        }

        return notes.map(n =>
            <tr className="d-flex" key={n.id}>
                <td className="col-6">{this.getShortText(n.text)}</td>
                <td className="col-2">{this.formatDate(n.dateCreated)}</td>
                <td className="col-2">{this.formatDate(n.dateUpdated)}</td>
                <td className="col-2">{this.renderActions(n.id)}</td>
            </tr>)
    }

    render() {
        const { editorOpened, currentNote } = this.state;
        const { addNote, updateNote, loadNotes } = this.props;

        return (
            <Table striped>
                <thead>
                    <tr className="d-flex">
                        <th className="col-6"><Translate value="note" /></th>
                        <th className="col-2"><Translate value="noteCreated" /></th>
                        <th className="col-2"><Translate value="noteUpdated" /></th>
                        <th className="col-2">
                            <ButtonGroup className="float-right">
                                <Button
                                    size="sm"
                                    onClick={() => loadNotes()}>
                                    <Translate value="refresh" />
                                </Button>
                                <Button
                                    color="primary"
                                    size="sm"
                                    onClick={this.openNewEditor}>
                                    <Translate value="addNote" />
                                </Button>
                            </ButtonGroup>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
                <NoteEditor
                    isOpen={editorOpened}
                    toggle={this.closeEditor}
                    note={currentNote}
                    addNote={addNote}
                    updateNote={updateNote} />
            </Table>

        );
    }
}