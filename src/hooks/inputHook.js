import { useState } from 'react';

export default (initialValue, validateFunc) => {
  const [value, setValue] = useState(initialValue);

  const error = validateFunc !== null && typeof validateFunc === 'function' && !validateFunc(value)

  return {
    value,
    error,
    onChange: e => {
      setValue(e.target.value || e.target.innerText);
    }
  };
};
