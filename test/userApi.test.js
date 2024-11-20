import { UserApi } from 'src/api/userApi';
import Axios from 'src/config/axiosConfig';

// Mock Axios instance
jest.mock('src/config/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn(),
}));

// Mock apiErrorResponseHandler
jest.mock('src/api/error/apiErrorResponseHandler');

describe('UserApi', () => {
  let userApi;

  beforeEach(() => {
    Axios.get.mockClear(); // Clear any previous calls to Axios.get
    Axios.post.mockClear(); // Clear any previous calls to Axios.post
    userApi = UserApi({ get: Axios.get, post: Axios.post }); // Pass Axios methods as mocked functions
  });

  it('fetches logged-in user profile picture successfully', async () => {
    const mockData = { /* Mocked profile picture data */ };
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const profilePicture = await userApi.getLoggedInUserProfilePicture();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/user/profile_picture');
    expect(profilePicture).toEqual(mockData);
  });

  it('fetches user profile picture by email successfully', async () => {
    const email = 'test@example.com';
    const mockData = { /* Mocked profile picture data */ };
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const profilePicture = await userApi.getUserProfilePictureByEmail(email);
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/user/profile_picture_by_email', { params: { email } });
    expect(profilePicture).toEqual(mockData);
  });

  it('uploads profile picture successfully', async () => {
    const mockFormData = new FormData();
    // Append image to FormData mock
    const mockResponse = { /* Mocked response data */ };
    Axios.post.mockResolvedValueOnce(mockResponse);

    const response = await userApi.uploadProfilePicture(mockFormData);
    expect(Axios.post).toHaveBeenCalled();
    expect(response).toEqual(mockResponse);
  });

  it('fetches user by userId successfully', async () => {
    const userId = '123';
    const mockData = { /* Mocked user data */ };
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const userData = await userApi.getUserByUserId(userId);
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/user/byId/' + userId);
    expect(userData).toEqual(mockData);
  });

  it('creates user profile successfully', async () => {
    const mockUserProfileObject = { /* Mocked user profile data */ };
    const mockResponse = { /* Mocked response data */ };
    Axios.post.mockResolvedValueOnce(mockResponse);

    const response = await userApi.createUserProfile(mockUserProfileObject);
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/admin/users', mockUserProfileObject);
    expect(response).toEqual(mockResponse);
  });
});