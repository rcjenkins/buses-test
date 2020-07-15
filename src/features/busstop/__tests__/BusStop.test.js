import React from 'react';
import { BusStop } from '../BusStop';
import { mount } from 'enzyme';
import store from '../../../app/store';
import { Provider, useSelector } from 'react-redux';

jest.mock('axios');
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('BusStop', () => {
  it('should render without crashing with data (mount)', async () => {
    useSelector.mockImplementation(() => {
      return { data: [] };
    });
    const wrapper = mount(
      <Provider store={store}>
        <BusStop />
      </Provider>,
    );
    expect(wrapper.find('#bus-stop')).toHaveLength(1);
    expect(wrapper.find('.loading')).toHaveLength(1);
    wrapper.unmount();
  });

  it('should render without crashing with no data (mount)', async () => {
    useSelector.mockImplementation(() => {
      return {
        data: [
          {
            Id: '1776088630',
            OperationType: 1,
            VehicleId: 'BF67GKV',
            NaptanId: '490000091H',
            StationName: 'Great Portland St Stn  / Euston Rd',
            LineId: '18',
            LineName: '18',
            PlatformName: 'H',
            Direction: 'outbound',
            Bearing: '75',
            DestinationNaptanId: '',
            DestinationName: 'Euston',
            Timestamp: '2020-07-15T11:58:48.4356494Z',
            TimeToStation: 1409,
            CurrentLocation: '',
            Towards: 'Camden Town or Euston',
            ExpectedArrival: '2020-07-15T12:22:17Z',
            TimeToLive: '2020-07-15T12:22:47Z',
            ModeName: 'bus',
          },
          {
            Id: '1776088631',
            OperationType: 1,
            VehicleId: 'BF67GKV',
            NaptanId: '490000091H',
            StationName: 'Great Portland St Stn  / Euston Rd',
            LineId: '18',
            LineName: '18',
            PlatformName: 'H',
            Direction: 'outbound',
            Bearing: '75',
            DestinationNaptanId: '',
            DestinationName: 'Euston',
            Timestamp: '2020-07-15T11:58:48.4356494Z',
            TimeToStation: 1409,
            CurrentLocation: '',
            Towards: 'Camden Town or Euston',
            ExpectedArrival: '2020-07-15T12:22:17Z',
            TimeToLive: '2020-07-15T12:22:47Z',
            ModeName: 'bus',
          },
        ],
      };
    });

    const wrapper = mount(
      <Provider store={store}>
        <BusStop />
      </Provider>,
    );
    expect(wrapper.find('#bus-stop')).toHaveLength(1);
    expect(wrapper.find('.ready')).toHaveLength(1);
    expect(wrapper.find('.bus-row')).toHaveLength(2);
    wrapper.unmount();
  });
});
