import { useState, useEffect } from 'react';

export default function actml(func) {
  return function ActML({ children }) {
    const [ result, setResult ] = useState(null);

    useEffect(() => {
      func({
        children,
        render(content) {
          setResult(content);
        }
      });
    }, []);

    return result;
  };
}
