import { ReservationApi } from 'src/api/reservationApi';
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

describe('ReservationApi', () => {
  let reservationApi;

  beforeEach(() => {
    Axios.get.mockClear(); // Clear any previous calls to Axios.get
    Axios.post.mockClear(); // Clear any previous calls to Axios.post
    Axios.delete.mockClear(); // Clear any previous calls to Axios.delete
    reservationApi = ReservationApi({ get: Axios.get, post: Axios.post, delete: Axios.delete }); // Pass Axios methods as mocked functions
  });

  it('fetches reservations by date successfully', async () => {
    const date = '2024-05-14';
    const mockData = [{ /* Mocked reservation data */ }];
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const reservations = await reservationApi.getReservations(date);
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/reservations/by-date/' + date);
    expect(reservations).toEqual(mockData);
  });

  it('creates reservation successfully', async () => {
    const mockReservationData = { /* Mocked reservation data */ };
    Axios.post.mockResolvedValueOnce(); // No need to mock a response data since the function doesn't return anything

    await reservationApi.createReservation(mockReservationData);
    expect(Axios.post).toHaveBeenCalledWith('/api/v1/reservations', mockReservationData);
  });

  it('fetches logged-in user reservations successfully', async () => {
    const mockData = [{ /* Mocked reservation data */ }];
    Axios.get.mockResolvedValueOnce({ data: mockData });

    const reservations = await reservationApi.getLoggedInUserReservations();
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/reservations/session/all');
    expect(reservations).toEqual(mockData);
  });

  it('deletes reservation successfully', async () => {
    const reservationId = '123';
    const mockResponse = { /* Mocked response data */ };
    Axios.delete.mockResolvedValueOnce({ data: mockResponse });

    const response = await reservationApi.deleteReservation(reservationId);
    expect(Axios.delete).toHaveBeenCalledWith('/api/v1/reservations/' + reservationId);
    expect(response).toEqual(mockResponse);
  });
});