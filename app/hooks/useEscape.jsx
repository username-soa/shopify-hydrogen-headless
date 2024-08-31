import {useEffect} from 'react';

const useEscape = (callback) => {
  useEffect(() => {
    const escFunction = (event) => {
      if (event.key === 'Escape') callback();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    };
    document.addEventListener('keydown', escFunction, false);
    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export default useEscape;
