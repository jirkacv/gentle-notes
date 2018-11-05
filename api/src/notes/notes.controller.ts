import { Controller, Get, Post, Put, Param, Body, Delete } from '@nestjs/common';
import { NoteRequest } from './dto/noteRequest';
import { NotesService } from './notes.service';
import { Note } from './interfaces/note';

@Controller('notes')
export class NotesController {
    constructor(private readonly notesService: NotesService) {}
    
    @Get()  
    getNotes() : Array<Note> {
      return this.notesService.getAllNotes();
    }
  
    @Get(':id')
    getNote(@Param() params): Note {
      return this.notesService.getNote(params.id);
    }
  
    @Post()
    createNote(@Body() note: NoteRequest): string {
        return this.notesService.addNote(note);    
    }

    @Put(':id')
    updateNote(@Param() params, @Body() note: NoteRequest) {
        this.notesService.updateNote(params.id, note);    
    }

    @Delete(':id')
    deleteNote(@Param() params) {
        this.notesService.deleteNote(params.id)
    }
}
