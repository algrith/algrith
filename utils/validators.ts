export const validatePassword = (password: string) => {
	// Check if password contains at least one digit
	const hasNumber = /[0-9]/.test(password);

	// Check if password contains at least one special character
	const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

	// Check if password is at least 8 characters long
	const isLengthValid = password.length >= 8;

	// Check if password contains at least one uppercase letter
	const hasUpperCase = /[A-Z]/.test(password);

	// Check if password contains at least one lowercase letter
	const hasLowerCase = /[a-z]/.test(password);

	// Return true if all conditions are met, otherwise return false
	return {
    isValid: hasNumber && hasSpecialChar && isLengthValid && hasUpperCase && hasLowerCase,
    hasSpecialChar,
    isLengthValid,
    hasLowerCase,
    hasUpperCase,
    hasNumber
  };
};