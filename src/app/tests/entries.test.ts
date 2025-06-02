import { createMocks } from 'node-mocks-http';
import handler from '../pages/api/entries/index';
import { auth, db } from '../lib/firebase';
import { addDoc, collection, query, where, getDocs } from 'firebase/firestore';

jest.mock('../lib/firebase', () => ({
  auth: { verifyIdToken: jest.fn() },
  db: {},
}));

describe('Entries API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if user is not authenticated', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: { authorization: '' },
      body: { title: 'Test', body: 'Test body' },
    });

    (auth.verifyIdToken as jest.Mock).mockResolvedValue(null);

    await handler(req, res);
    expect(res.statusCode).toBe(401);
    expect(res._getJSONData()).toEqual({ error: 'Unauthorized' });
  });

  it('should create an entry for authenticated user', async () => {
    const { req, res } = createMocks({
      method: 'POST',
      headers: { authorization: 'Bearer token' },
      body: { title: 'Test', body: 'Test body' },
    });

    (auth.verifyIdToken as jest.Mock).mockResolvedValue({ uid: 'user1' });
    jest.spyOn(collection(db, 'entries'), 'add').mockResolvedValue({ id: 'entry1' } as any);

    await handler(req, res);
    expect(res.statusCode).toBe(201);
    expect(res._getJSONData()).toEqual({ id: 'entry1' });
  });
});