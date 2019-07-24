import { useState, useEffect } from 'react';

const isGenerator = obj => obj && typeof obj['next'] === 'function';
const isPromise = obj => obj && typeof obj['then'] === 'function';

export default function actml(func) {
  return function ActML({ ...props }) {
    const [ result, setResult ] = useState(null);

    useEffect(() => {
      const returned = func({
        ...props,
        render(content) {
          setResult(content);
        }
      });

      if (typeof returned !== 'undefined') {
        if (!isGenerator(returned) && !isPromise(returned)) {
          setResult(returned);
        }
      }
    }, []);

    return result;
  };
}
