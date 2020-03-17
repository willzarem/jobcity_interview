import { Users } from '.'

let users;

beforeEach(async () => {
  users = await Users.create({ name: 'test', rooms: 'test', avatar: 'test', type: 'test' })
});

describe('view', () => {
  it('returns simple view', () => {
    const view = users.view();
    expect(typeof view).toBe('object');
    expect(view.id).toBe(users.id);
    expect(view.name).toBe(users.name);
    expect(view.rooms).toBe(users.rooms);
    expect(view.avatar).toBe(users.avatar);
    expect(view.type).toBe(users.type);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  });

  it('returns full view', () => {
    const view = users.view(true);
    expect(typeof view).toBe('object');
    expect(view.id).toBe(users.id);
    expect(view.name).toBe(users.name);
    expect(view.rooms).toBe(users.rooms);
    expect(view.avatar).toBe(users.avatar);
    expect(view.type).toBe(users.type);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy()
  })
});
