import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('NotesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  let createdNoteId: string;
  const createdText: string = 'testing text';
  const updatedText: string = 'testing text after update';


  it('loads no notes', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect([]);
  });

  it('creates note', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({ text: createdText })
      .expect(201)
      .expect((res) => {
        createdNoteId = res.text;
        expect(createdNoteId.length).toBe(36);
      });
  });

  it('loads one note', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(res => {        
        expect(res.body).toBeDefined();
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(1);
        expect(res.body[0].id).toBe(createdNoteId);
        expect(res.body[0].text).toBe(createdText);
      });
  });


  it('creates second note', () => {
    return request(app.getHttpServer())
      .post('/notes')
      .send({ text: 'testing text 2' })
      .expect(201)
      .expect(res => expect(res.text.length).toBe(36));
  });

  it('loads two notes', () => {
    return request(app.getHttpServer())
      .get('/notes')
      .expect(200)
      .expect(res => expect(res.body.length).toBe(2));
  });

  it('updates first note', () => {    
    return request(app.getHttpServer())
      .put(`/notes/${createdNoteId}`)
      .send({ text: updatedText })
      .expect(200);
  });

  it('loads first note with changed text', () => {
    return request(app.getHttpServer())
      .get(`/notes/${createdNoteId}`)
      .expect(200)
      .expect(res => {
        expect(res.body).toBeDefined();
        expect(res.body.id).toBe(createdNoteId);
        expect(res.body.text).toBe(updatedText);
      });
  });

  it('deletes first note', () => {
    return request(app.getHttpServer())
      .delete(`/notes/${createdNoteId}`)
      .expect(200);
  });

  it('fails to load deleted note', () => {
    return request(app.getHttpServer())
      .get(`/notes/${createdNoteId}`)
      .expect(404);
  });
});
