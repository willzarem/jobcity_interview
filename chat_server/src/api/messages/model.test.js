import { Messages } from '.'

let messages;

beforeEach(async () => {
  messages = await Messages.create({ roomId: 'test', userId: 'test', body: 'test' })
});

describe('view', () => {
  it('returns simple view', () => {
    const view = messages.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(messages.id);
    expect(view.roomId).toBe(messages.roomId);
    expect(view.userId).toBe(messages.userId);
    expect(view.body).toBe(messages.body);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  });

  it('returns full view', () => {
    const view = messages.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(messages.id);
    expect(view.roomId).toBe(messages.roomId);
    expect(view.userId).toBe(messages.userId);
    expect(view.body).toBe(messages.body);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  })
});
