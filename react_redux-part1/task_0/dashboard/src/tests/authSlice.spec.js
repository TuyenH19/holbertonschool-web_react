import authReducer, { login, logout } from '../features/auth/authSlice';

describe('authSlice', () => {
  it('should return the correct initial state by default', () => {
    const initialState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    expect(authReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should update the state correctly when the login action is dispatched', () => {
    const previousState = {
      user: {
        email: '',
        password: '',
      },
      isLoggedIn: false,
    };

    const payload = {
      email: 'test@example.com',
      password: 'password123',
    };

    const newState = authReducer(previousState, login(payload));

    expect(newState.user.email).toBe('test@example.com');
    expect(newState.user.password).toBe('password123');
    expect(newState.isLoggedIn).toBe(true);
  });

  it('should reset the state correctly when the logout action is dispatched', () => {
    const previousState = {
      user: {
        email: 'test@example.com',
        password: 'password123',
      },
      isLoggedIn: true,
    };

    const newState = authReducer(previousState, logout());

    expect(newState.user.email).toBe('');
    expect(newState.user.password).toBe('');
    expect(newState.isLoggedIn).toBe(false);
  });
});
