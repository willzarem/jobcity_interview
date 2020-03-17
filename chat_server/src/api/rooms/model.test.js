import { Rooms } from '.'

let rooms;

beforeEach(async () => {
  rooms = await Rooms.create({ topic: 'test', joined: 'test' })
});

describe('view', () => {
  it('returns simple view', () => {
    const view = rooms.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(rooms.id);
    expect(view.topic).toBe(rooms.topic);
    expect(view.joined).toBe(rooms.joined);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  });

  it('returns full view', () => {
    const view = rooms.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(rooms.id);
    expect(view.topic).toBe(rooms.topic);
    expect(view.joined).toBe(rooms.joined);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  })
});
