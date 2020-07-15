import React, { useEffect, useState } from 'react';
import useIsMounted from './IsMounted';

const Shaker = ({ updating, children, className = '', ...rest }) => {
  const isMounted = useIsMounted();
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (updating) {
      setShake(true);
      setTimeout(() => {
        if (isMounted.current) {
          setShake(false);
        }
      }, 1000);
    }
  }, [updating, isMounted]);

  return (
    <div
      className={`${className} ${shake ? 'shake' : 'noshake'}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
};

export default Shaker;
