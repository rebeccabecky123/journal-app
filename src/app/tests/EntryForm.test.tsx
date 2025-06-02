import { render, screen, fireEvent } from '@testing-library/react';
import EntryForm from '../components/EntryForm';
import { auth } from '@/app/api/entries/firebase';


jest.mock('../lib/firebase', () => ({
  auth: {
    currentUser: {
      getIdToken: jest.fn(),
    },
  },
}));

describe('EntryForm', () => {
  it('submits form with title and body', async () => {
    const mockFetch = jest.fn().mockResolvedValue({ ok: true });
    global.fetch = mockFetch;

    
    (auth.currentUser!.getIdToken as jest.Mock).mockResolvedValue('token');

    render(<EntryForm />);

    fireEvent.change(screen.getByPlaceholderText('Entry Title'), {
      target: { value: 'Test Title' },
    });

    fireEvent.change(screen.getByPlaceholderText('Write your thoughts...'), {
      target: { value: 'Test Body' },
    });

    fireEvent.click(screen.getByText('Add Entry'));

    expect(mockFetch).toHaveBeenCalledWith('/api/entries', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer token',
      },
      body: JSON.stringify({ title: 'Test Title', body: 'Test Body' }),
    });
  });
});
