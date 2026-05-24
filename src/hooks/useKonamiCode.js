import { useState, useEffect, useRef } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
const KONAMI_STRING = KONAMI_CODE.join(',');

const useKonamiCode = (callback) => {
  const [input, setInput] = useState([]);
  const callbackRef = useRef(callback);
  useEffect(() => { callbackRef.current = callback; }, [callback]);

  useEffect(() => {
    const onKeyDown = (e) => {
      setInput((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);
        if (next.join(',') === KONAMI_STRING) {
          callbackRef.current?.();
        }
        return next;
      });
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return input;
};

export default useKonamiCode;

