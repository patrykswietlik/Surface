import { useCallback, useState } from 'react';

export const useForm = (inputs, formValidity) => {
	const [formState, setFormState] = useState({
		inputs,
		formValidity,
	});

	const validityHandler = useCallback((name, isValid) => {
		const changedValidity = { ...formState };
		changedValidity.inputs[name] = isValid;

		let formIsValid = true;

		for (const key in changedValidity.inputs) {
			if (!changedValidity.inputs[key]) {
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
