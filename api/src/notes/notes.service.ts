import { Injectable, NotFoundException } from '@nestjs/common';
import { Note } from './interfaces/note';
import { NoteRequest } from './dto/noteRequest';
import { v4 as uuid } from 'uuid';

@Injectable()
export class NotesService {
    private readonly notes: Map<string, Note> = new Map([]);

    validateNoteId(id: string) {
        if (!this.notes.has(id)) { 
            throw new NotFoundException(`Note '${id}' doesn't exist`);
        }
    }

    getAllNotes(): Array<Note> {
        return Array.from(this.notes.values());
    }

    getNote(id: string): Note {
        this.validateNoteId(id);
        return this.notes.get(id);
    }

    addNote(newNote: NoteRequest): string {
        let id = uuid();

        this.notes.set(id, {
            text: newNote.text,
            dateCreated: new Date(),
            id,
            dateUpdated: null,
        });

        return id;
    }

    updateNote(id: string, updatedNote: NoteRequest): string {        
        this.validateNoteId(id);

        this.notes.set(id, { ...this.notes.get(id), dateUpdated: new Date(), text: updatedNote.text });

        return id;
    }

    deleteNote(id: string) {        
        this.validateNoteId(id);

        this.notes.delete(id);
    }
}
