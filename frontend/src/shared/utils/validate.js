export const validate = (value, validators) => {
	const result = {
		isValid: true,
		message: 'Valid input.',
	};

	validators.forEach(validator => {
		switch (validator) {
			case 'REQUIRED':
				if (value.trim().length === 0) {
					result.isValid = false;
					result.message = 'This input is required.';
				}
				break;
			case 'MIN-LENGTH':
				if (value.trim().length < 8) {
					result.isValid = false;
					result.message = 'Value must be at least 8 characters long.';
				}
				break;
			case 'EMAIL':
				if (!/^\S+@\S+\.\S+$/.test(value)) {
					result.isValid = false;
					result.message = 'E-mail is not valid.';
				}
				break;
		}
	});

	return result;
};
