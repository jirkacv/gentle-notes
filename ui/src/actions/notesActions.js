import {
    NOTES_LOADED
} from './actionTypes';
import { getUrl } from '../constants/url';
import axios from 'axios';

export const addNote = text => dispatch => {
    axios.post(getUrl('/notes'), { text } ).then(() => loadNotes()(dispatch))
};

export const updateNote = (id, text) => dispatch => {
    axios.put(getUrl(`/notes/${id}`), { text } ).then(() => loadNotes()(dispatch))
}

export const deleteNote = id => dispatch => {
    axios.delete(getUrl(`/notes/${id}`)).then(() => loadNotes()(dispatch));
}


const notesLoaded = notes => ({
    type: NOTES_LOADED,
    notes: notes
});

export const loadNotes = () => dispatch => {
    axios.get(getUrl('/notes'))        
        .then(resp => dispatch(notesLoaded(resp.data)));
};