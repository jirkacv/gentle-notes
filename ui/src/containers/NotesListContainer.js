import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { I18n } from 'react-redux-i18n';

import NotesList from '../components/NotesList';
import { loadNotes, updateNote, addNote, deleteNote } from '../actions/notesActions';


const mapStateToProps = state => {
    return {
        notes: state.notes.items,
        dateFormat: I18n.t("dateFormat")
    }
};

const mapDispatchToActions = dispatch => (
    bindActionCreators({ loadNotes, updateNote, addNote, deleteNote }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToActions)(NotesList)