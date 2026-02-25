import { TextInput } from '@packages/react-components';
import { useState } from 'react';

export const BasicTextInput = () => {
	return <TextInput label="Username" />;
};

export const TextInputWithStatus = () => {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }}>
			<TextInput status="error" label="Error State" supportingText="This field has an error" />
			<TextInput status="success" label="Success State" supportingText="Input is valid" />
			<TextInput status="warning" label="Warning State" supportingText="Please review your input" />
		</div>
	);
};

export const ClearableTextInput = () => {
	return (
		<TextInput
			label="Clearable Input"
			// placeholder="Type something and see the clear button"
			clearable
		/>
	);
};

export const ControlledTextInput = () => {
	const [value, setValue] = useState('');

	return (
		<>
			<TextInput
				value={value}
				onValueChange={(val) => setValue(val)}
				label="Controlled Input"
				// placeholder="Type here..."
			/>
			<p>Current Value: {value}</p>
		</>
	);
};

export const DisabledTextInput = () => {
	return (
		<TextInput
			disabled
			label="Disabled Input"
			// placeholder="Cannot type here"
			value="ReadOnly value"
		/>
	);
};

export const TextInputWithSupportingText = () => {
	return (
		<TextInput
			label="Email Address"
			supportingText="We'll never share your email with anyone else."
			// placeholder="email@example.com"
		/>
	);
};

export const RequiredTextInput = () => {
	return <TextInput required label="Password" />;
};
