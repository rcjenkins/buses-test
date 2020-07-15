import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const busStopSlice = createSlice({
  name: 'busstop',
  initialState: {
    connectionState: 'Standby',
    updating: false,
    data: [],
  },
  reducers: {
    init: (state, action) => {
      action.payload.forEach((bus) => {
        const newBus = {};
        const keys = Object.keys(bus);
        keys.forEach((p) => {
          newBus[p.charAt(0).toUpperCase() + p.slice(1)] = bus[p];
        });
        state.data.push(newBus);
      });
    },
    complete: (state) => {
      state.updating = false;
      const newData = [];
      state.data.forEach((line) => {
        line.updating = false;
        newData.push(line);
      });
      state.data = newData;
      state.connectionState = 'Updated' + new Date().toString();
    },
    update: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.updating = true;
      action.payload.forEach((bus) => {
        const index = state.data.findIndex((line) => {
          if (line.Id === bus.Id) {
            return true;
          }

          return null;
        });
        if (index === -1) {
          bus.updating = true;
          state.data.push(bus);
        } else {
          bus.updating = true;
          state.data[index] = bus;
        }
      });
      const newData = [];
      state.data.forEach((line) => {
        if (new Date(line.TimeToLive) >= new Date()) {
          newData.push(line);
        }
      });
      state.data = newData;
      state.connectionState = 'Updating' + new Date().toString();
    },
    start: (state) => {
      state.connectionState = 'Started';
    },
    end: (state) => {
      state.connectionState = 'Closed';
    },
  },
});

export const { start, end, update, complete, init } = busStopSlice.actions;

export const initialLoad = () => async (dispatch) => {
  try {
    const { data: dataH } = await axios.get(
      'https://api.tfl.gov.uk/StopPoint/490000091H/Arrivals',
    );
    dispatch(init(dataH));
    const { data: dataG } = await axios.get(
      'https://api.tfl.gov.uk/StopPoint/490000091G/Arrivals',
    );
    dispatch(init(dataG));
  } catch (err) {
    throw err;
  }
};

export const selectBusStop = (state) => state.busstop;

export default busStopSlice.reducer;
