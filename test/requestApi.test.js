import { RequestApi } from 'src/api/requestApi';
import Axios from 'src/config/axiosConfig';

// Mock Axios instance
jest.mock('src/config/axiosConfig', () => ({
  get: jest.fn(),
  post: jest.fn(),
  put: jest.fn(),
  delete: jest.fn(),
}));

// Mock apiErrorResponseHandler
jest.mock('src/api/error/apiErrorResponseHandler');

describe('RequestApi', () => {
  let requestApi;

  beforeEach(() => {
    Axios.get.mockClear(); // Clear any previous calls to Axios.get
    Axios.post.mockClear(); // Clear any previous calls to Axios.post
    Axios.put.mockClear(); // Clear any previous calls to Axios.put
    Axios.delete.mockClear(); // Clear any previous calls to Axios.delete
    requestApi = RequestApi({ get: Axios.get, post: Axios.post, put: Axios.put, delete: Axios.delete }); // Pass Axios methods as mocked functions
  });

  it('creates request successfully', async () => {
    const mockRequest = { /* Mocked request data */ };
    const mockResponse = { /* Mocked response data */ };
    Axios.post.mockResolvedValueOnce({ data: mockResponse });

    const response = await requestApi.createRequest(mockRequest);
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/requests', mockRequest);
    expect(response).toEqual(mockResponse);
  });

  it('fetches session requests successfully', async () => {
    const mockData = [{ /* Mocked request data */ }];
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const requests = await requestApi.getRequests();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/requests/session/all');
    expect(requests).toEqual(mockData);
  });

  it('fetches all requests successfully', async () => {
    const mockData = [{ /* Mocked request data */ }];
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const requests = await requestApi.getAllRequests();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/requests/manage/getAll');
    expect(requests).toEqual(mockData);
  });

  it('deletes request successfully', async () => {
    const requestId = '123';
    const mockResponse = { /* Mocked response data */ };
    Axios.delete.mockResolvedValueOnce({ data: mockResponse });

    const response = await requestApi.deleteRequest(requestId);
    expect(Axios.delete).toHaveBeenCalledWith('/api/v1/requests/' + requestId);
    expect(response).toEqual(mockResponse);
  });

  it('accepts request successfully', async () => {
    const requestId = '123';
    const mockResponse = { /* Mocked response data */ };
    Axios.put.mockResolvedValueOnce({ data: mockResponse });

    const response = await requestApi.acceptRequest(requestId);
    expect(Axios.put).toHaveBeenCalledWith('/api/v1/requests/manage/accept/' + requestId);
    expect(response).toEqual(mockResponse);
  });

  it('rejects request successfully', async () => {
    const requestId = '123';
    const mockResponse = { /* Mocked response data */ };
    Axios.put.mockResolvedValueOnce({ data: mockResponse });

    const response = await requestApi.rejectRequest(requestId);
    expect(Axios.put).toHaveBeenCalledWith('/api/v1/requests/manage/reject/' + requestId);
    expect(response).toEqual(mockResponse);
  });
});