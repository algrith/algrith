import { useState } from 'react';

const useFloatingLabel = (isFloatingLabel: boolean = true) => {
  const [isFloating, setFloating] = useState(isFloatingLabel);
  const handleFocus = () => isFloatingLabel && setFloating(false);
  const handleBlur = () => isFloatingLabel && setFloating(true);
  return { isFloating, handleFocus, handleBlur };
};

export default useFloatingLabel;