import React from 'react';

const RouteFilter = ({ routes, filter, onClick, children }) => {
  return (
    <div className="route-filter">
      <span className="title">Route</span>{' '}
      <button
        className={filter === '' ? 'active' : ''}
        onClick={() => onClick('')}
      >
        All
      </button>{' '}
      {routes.map((r) => {
        return (
          <React.Fragment key={r}>
            <button
              className={filter === r ? 'active' : ''}
              onClick={() => onClick(r)}
            >
              {r}
            </button>{' '}
          </React.Fragment>
        );
      })}
      {children}
    </div>
  );
};

export default RouteFilter;
