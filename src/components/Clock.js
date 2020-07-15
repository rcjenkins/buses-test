import React, { useEffect, useState } from 'react';
import useIsMounted from './IsMounted';
import moment from 'moment';

const Clock = ({ step = 1000, format = 'HH:mm:ss' }) => {
  const isMounted = useIsMounted();
  const [time, setTime] = useState(moment().format(format));
  useEffect(() => {
    const interval = setInterval(() => {
      if (isMounted.current) {
        setTime(moment().format(format));
      }
    }, step);
    return () => clearInterval(interval);
  }, [format, step, isMounted]);

  return <>{time}</>;
};

export default Clock;
