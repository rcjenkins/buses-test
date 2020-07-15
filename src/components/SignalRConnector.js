import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import {
  start,
  update,
  complete,
  initialLoad,
} from '../features/busstop/busStopSlice';

const $ = window.jQuery;

export const SignalRConnector = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initialLoad());
  }, [dispatch]);

  const updateBoard = useCallback(
    (data) => {
      dispatch(update(data));
      dispatch(complete());
      console.log(new Date());
      console.log(data);
    },
    [dispatch],
  );

  useEffect(() => {
    $.connection.hub.logging = true;
    $.connection.hub.url = 'https://push-api.tfl.gov.uk/signalr/hubs/signalr';

    var hub = $.connection.predictionsRoomHub;
    hub.client.showPredictions = updateBoard;
    $.connection.hub.start().done(function () {
      console.log('tfl.predictions: connection started');

      var lineRooms = [{ NaptanId: '490000091H' }, { NaptanId: '490000091G' }];
      hub.server
        .addLineRooms(lineRooms)
        .done(function () {
          console.log('tfl.predictions: Invocation of addLineRooms succeeded');
          return;
        })
        .fail(function (error) {
          console.log(
            'tfl.predictions: Invocation of addLineRooms failed. Error: ' +
              error,
          );
          return;
        });
    });
    dispatch(start());
  }, [dispatch, updateBoard]);

  return <></>;
};
