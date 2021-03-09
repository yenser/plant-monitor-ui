import { useState, useCallback } from 'react';

export default (initial = false) => {
  const [open, setOpen] = useState(initial);

  return [open, useCallback(() => setOpen(status => !status), [])];
};