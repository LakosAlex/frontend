import { AuthorizationApi } from 'src/api/authorizationApi';
import Axios from 'src/config/axiosConfig';

// Mock Axios instance
jest.mock('src/config/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

describe('AuthorizationApi', () => {
  let authorizationApi;

  beforeEach(() => {
    Axios.get.mockClear(); // Clear any previous calls to Axios.get
    Axios.post.mockClear(); // Clear any previous calls to Axios.post
    authorizationApi = AuthorizationApi({ get: Axios.get, post: Axios.post }); // Pass Axios.get and Axios.post as mocked functions
  });

  it('fetches authorization config successfully', async () => {
    const mockAuthConfig = { /* Mocked auth config */ };
    Axios.get.mockResolvedValueOnce({ data: mockAuthConfig });

    const authConfig = await authorizationApi.getAuthConfig();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/authorization/config');
    expect(authConfig).toEqual(mockAuthConfig);
  });

  it('handles authorization code successfully', async () => {
    const mockAuthCode = 'mockAuthCode';
    await authorizationApi.handleAuthCode({ code: mockAuthCode });
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/authorization/login', { code: mockAuthCode });
  });

  it('fetches logged-in user info successfully', async () => {
    const mockUserInfo = { /* Mocked user info */ };
    Axios.get.mockResolvedValueOnce({ data: mockUserInfo });

    const userInfo = await authorizationApi.getLoggedInUserInfo();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/session/user');
    expect(userInfo).toEqual(mockUserInfo);
  });

  it('fetches logged-in user roles successfully', async () => {
    const mockUserRoles = { /* Mocked user roles */ };
    Axios.get.mockResolvedValueOnce({ data: mockUserRoles });

    const userRoles = await authorizationApi.getLoggedInUserRoles();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/session/user/roles');
    expect(userRoles).toEqual(mockUserRoles);
  });

  it('logs out successfully', async () => {
    await authorizationApi.logout();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/authorization/logout');
  });
});