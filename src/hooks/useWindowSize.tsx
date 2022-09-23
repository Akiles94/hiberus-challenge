import { useEffect, useState } from 'react';

export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined || 0,
    height: undefined || 0,
  });

  useEffect(() => {
    // only execute all the code below in client side
    if (typeof window !== 'undefined') {
      // Handler to call on window resize

      // Add event listener
      window.addEventListener('resize', () =>
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        })
      );

      // Call handler right away so state gets updated with initial window size
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Remove event listener on cleanup
      return () =>
        window.removeEventListener('resize', () =>
          setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
          })
        );
    }
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}
