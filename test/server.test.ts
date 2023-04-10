import request from 'supertest';
import { app } from '../src/server'; // supondo que o app seja exportado como padrão de server.ts

describe('Routes', () => {
    it('should answer with status 200 for /api/v1/car', async () => {
        const response = await request(app).get('/api/v1/car');
        expect(response.status).toBe(200);
    });

    it('should answer with status 400 for /api/v1/user', async () => {
        const response = await request(app).get('/api/v1/user');
        expect(response.status).toBe(401);
    });
});
