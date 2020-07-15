import React from 'react';
import { Provider } from 'react-redux';
import store from '../app/store';
import App from '../App';
import { mount } from 'enzyme';

jest.mock('../components/SignalRConnector');

test('renders learn react link', () => {
  const wrapper = mount(
    <Provider store={store}>
      <App />
    </Provider>,
  );
  expect(wrapper.find('#bus-stop')).toHaveLength(1);
  wrapper.unmount();
});
