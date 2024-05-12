import { useCallback, useState } from 'react';

export const useForm = (inputs, formValidity) => {
	const [formState, setFormState] = useState({
		inputs,
		formValidity,
	});

	const validityHandler = useCallback((name, isValid, value) => {
		const changedValidity = { ...formState };
		changedValidity.inputs[name].valid = isValid;
		changedValidity.inputs[name].value = value;

		let formIsValid = true;

		for (const key in changedValidity.inputs) {
			if (!changedValidity.inputs[key].valid) {
				formIsValid = false;
			}
		}

		setFormState({
			...changedValidity,
			formValidity: formIsValid,
		});
	}, []);

	return [formState, validityHandler];
};
