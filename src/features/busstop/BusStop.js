import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectBusStop } from '../busstop/busStopSlice';
import Shaker from '../../components/Shaker';
import Clock from '../../components/Clock';
import StopsFilter from './components/StopsFilter';
import RouteFilter from './components/RouteFilter';
import './busstop.scss';

const groupBy = (arr, field) => {
  let groupedArr = [];
  arr.forEach(function (e) {
    //look for an existent group
    let group = groupedArr.find((g) => g['field'] === e[field]);
    if (group === undefined) {
      //add new group if it doesn't exist
      group = { field: e[field], groupList: [] };
      groupedArr.push(group);
    }

    //add the element to the group
    group.groupList.push(e);
  });

  return groupedArr;
};

function compareGroup(a, b) {
  if (a.field < b.field) {
    return -1;
  }
  if (a.field > b.field) {
    return 1;
  }
  return 0;
}

function compare(a, b) {
  if (a.TimeToStation < b.TimeToStation) {
    return -1;
  }
  if (a.TimeToStation > b.TimeToStation) {
    return 1;
  }
  return 0;
}

export const BusStop = () => {
  const [filterRoute, setFilterRoute] = useState('');
  const [filterStop, setFilteStop] = useState('');
  const [grouped, setGrouped] = useState(false);
  const busstop = useSelector(selectBusStop);

  const onChangeGroup = ({ target: { checked } }) => {
    setGrouped(checked);
  };

  const onClickRoute = (value) => {
    setFilterRoute(value);
  };

  const onClickStop = (value) => {
    setFilteStop(value);
  };

  if (!busstop.data || busstop.data.length === 0) {
    return (
      <div id="bus-stop" className="loading">
        <div className="bus-header">
          <div className="title">Next service towards...</div>
          <div className="clock">
            <Clock format="HH:mm" />
          </div>
        </div>
        <div>
          <div className="bus-row ">
            <div className="number lighten">--</div>
            <div className="platform lighten">--</div>
            <div className="towards">Loading predictions...</div>
            <div className="arrival">-- mins</div>
          </div>
        </div>
      </div>
    );
  }

  let buses = JSON.parse(JSON.stringify(busstop.data));

  const stops = [];
  const routes = [];
  buses.forEach((stop) => {
    if (
      !routes.find((r) => {
        return r === stop.LineName;
      })
    ) {
      routes.push(stop.LineName);
    }
    if (
      !stops.find((s) => {
        return s === stop.PlatformName;
      })
    ) {
      stops.push(stop.PlatformName);
    }
  });

  if (filterRoute) {
    buses = buses.filter(function (bus) {
      return bus.LineName === filterRoute;
    });
  }

  if (filterStop) {
    buses = buses.filter(function (bus) {
      return bus.PlatformName === filterStop;
    });
  }
  buses.sort(compare);
  let groupedBuses = [];
  if (grouped) {
    groupedBuses = groupBy(buses, 'PlatformName');
    groupedBuses.sort(compareGroup);
  }

  stops.sort();
  routes.sort((a, b) => {
    return a - b;
  });

  return (
    <div id="bus-stop" className="ready">
      <StopsFilter stops={stops} filter={filterStop} onClick={onClickStop}>
        <label id="group-label" htmlFor="group">
          Group by Stop{' '}
        </label>
        <input
          id="group"
          type="checkbox"
          name="grouped"
          onChange={onChangeGroup}
          checked={grouped}
        ></input>
      </StopsFilter>
      <RouteFilter
        routes={routes}
        filter={filterRoute}
        onClick={onClickRoute}
      />
      <div className="bus-header">
        <div className="title">Next service towards...</div>
        <div className="clock">
          <Clock format="HH:mm" />
        </div>
      </div>
      {buses.length === 0 ? 'Found no buses using these filters' : ''}
      {grouped &&
        groupedBuses.map((group) => {
          return (
            <React.Fragment key={group.field}>
              <p>
                <span className="platform">{group.field}</span>
              </p>
              {group.groupList.map((bus) => {
                const expected = bus.TimeToStation;
                const mins = Math.floor(expected / 60);
                const arrival =
                  mins === 0
                    ? '> 1 min'
                    : mins === 1
                    ? '1 min'
                    : `${mins} mins`;
                return (
                  <React.Fragment key={bus.Id}>
                    <div className="bus-row">
                      <div className="number"> {bus.LineName}</div>
                      <div className="towards"> {bus.Towards} </div>
                      <div className="arrival">
                        <Shaker updating={bus.updating}>{arrival}</Shaker>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </React.Fragment>
          );
        })}
      {!grouped &&
        buses.map((bus) => {
          const expected = bus.TimeToStation;
          const mins = Math.floor(expected / 60);
          const arrival =
            mins === 0 ? '> 1 min' : mins === 1 ? '1 min' : `${mins} mins`;
          return (
            <React.Fragment key={bus.Id}>
              <div className="bus-row">
                <div className="number"> {bus.LineName}</div>
                <div className="platform">{bus.PlatformName}</div>
                <div className="towards"> {bus.Towards} </div>
                <div className="arrival">
                  <Shaker updating={bus.updating}>{arrival}</Shaker>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
};
