import { useEffect, useState } from 'react';

import { validatePassword } from '@/utils/validators';

const initialState = {
  hasSpecialChar: false,
  isLengthValid: false,
  hasUpperCase: false,
  hasLowerCase: false,
  hasNumber: false,
  isValid: false
};

const PasswordRequirements = ({ password }: { password: string; }) => {
  const [requirements, setRequirements] = useState(initialState);
  
  useEffect(() => {
    if (password) {
      setRequirements(validatePassword(password));
    } else {
      setRequirements(initialState);
    }
  }, [password]);

  if (Object.values(requirements).every(Boolean)) return null;

  return (
    <small>
      Password must contain{' '}
      {!requirements.hasSpecialChar && 'at least one special character, '}
      {!requirements.isLengthValid && 'minimum of 8 characters, '}
      {!requirements.hasUpperCase && 'at least one uppercase, '}
      {!requirements.hasLowerCase && 'at least one lowercase, '}
      {!requirements.hasNumber && 'at least a number'}.
    </small>
  );
};

export default PasswordRequirements