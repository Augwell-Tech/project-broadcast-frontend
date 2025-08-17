/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from 'react';

const useOnClickOutside = (ref: any, handler: () => void) => {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
