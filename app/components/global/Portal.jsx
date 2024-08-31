import * as React from 'react';
import {createPortal} from 'react-dom';

const Portal = ({children}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      document.querySelector('#popup-portal')
    ) {
      setMounted(true);
    }
  }, []);

  return mounted
    ? createPortal(<>{children}</>, document.querySelector('#popup-portal'))
    : null;
};
export default Portal;
