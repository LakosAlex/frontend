import { AssetApi } from 'src/api/assetApi';
import Axios from 'src/config/axiosConfig';

// Mock Axios instance
jest.mock('src/config/axiosConfig', () => ({
  get: jest.fn(),
}));

// Mock apiErrorResponseHandler
jest.mock('src/api/error/apiErrorResponseHandler', () => ({
  apiErrorResponseHandler: jest.fn(),
}));

describe('AssetApi', () => {
  let assetApi;

  beforeEach(() => {
    Axios.get.mockClear(); // Clear any previous calls to Axios.get
    assetApi = AssetApi({ get: Axios.get }); // Pass Axios.get as a mocked function
  });

  it('fetches rooms successfully', async () => {
    const mockRoomsData = [{ id: 1, name: 'Room 1' }];
    Axios.get.mockResolvedValueOnce({ data: mockRoomsData });

    const rooms = await assetApi.getRooms();
    expect(rooms).toEqual(mockRoomsData);
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/rooms');
  });


  it('fetches workstations successfully', async () => {
    const mockWorkstationsData = [{ id: 1, name: 'Workstation 1' }];
    Axios.get.mockResolvedValueOnce({ data: mockWorkstationsData });

    const workstations = await assetApi.getWorkstations();
    expect(workstations).toEqual(mockWorkstationsData);
    expect(Axios.get).toHaveBeenCalledWith('/api/v1/assets/workstation');
  });
});