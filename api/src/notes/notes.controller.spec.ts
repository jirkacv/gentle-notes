import { Test, TestingModule } from '@nestjs/testing';
import { NotesController } from './notes.controller';
import { NotesService } from './notes.service';

describe('NotesController', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      controllers: [NotesController],
      providers: [NotesService],
    }).compile();
  });

  it('should be defined', () => {
    const controller: NotesController = app.get<NotesController>(NotesController);
    expect(controller).toBeDefined();
  });
}); 