import React from 'react';

const StopsFilter = ({ stops, filter, onClick, children }) => {
  return (
    <div className="stop-filter">
      <span className="title">Stops</span>{' '}
      <button
        className={filter === '' ? 'active' : ''}
        onClick={() => onClick('')}
      >
        All
      </button>{' '}
      {stops.map((s) => {
        return (
          <React.Fragment key={s}>
            <button
              className={filter === s ? 'active' : ''}
              onClick={() => onClick(s)}
            >
              {s}
            </button>{' '}
          </React.Fragment>
        );
      })}
      {children}
    </div>
  );
};

export default StopsFilter;
