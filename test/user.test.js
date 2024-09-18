/* eslint-disable no-undef */
const { createUser, deleteUser } = require('./utils');

jest.mock('bcrypt', () => ({
  hash: jest.fn().mockReturnValue('hashedPassword'),
}));

xdescribe('createUser function', () => {
  afterEach(() => {
    deleteUser();
  });

  it('should create a new user', async () => {
    const user = await createUser();

    expect(user).toHaveProperty('username', 'user');
    expect(user).toHaveProperty('email', 'user@gmail.com');
    expect(user).toHaveProperty('password', 'hashedPassword');
    expect(user).toHaveProperty('role', 'user');
  });
});
