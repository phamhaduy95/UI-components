import { TextInput } from '@packages/react-components';
import { useState } from 'react';

export const BasicTextInput = () => {
	return <TextInput labelText="Username" />;
};

export const TextInputWithStatus = () => {
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(1, 1fr)', gap: '1rem' }}>
			<TextInput status="error" labelText="Error State" supportingText="This field has an error" />
			<TextInput status="success" labelText="Success State" supportingText="Input is valid" />
			<TextInput
				status="warning"
				labelText="Warning State"
				supportingText="Please review your input"
			/>
		</div>
	);
};

export const ClearableTextInput = () => {
	return (
		<TextInput
			labelText="Clearable Input"
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
				labelText="Controlled Input"
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
			labelText="Disabled Input"
			// placeholder="Cannot type here"
			value="ReadOnly value"
		/>
	);
};

export const TextInputWithSupportingText = () => {
	return (
		<TextInput
			labelText="Email Address"
			supportingText="We'll never share your email with anyone else."
			// placeholder="email@example.com"
		/>
	);
};

export const RequiredTextInput = () => {
	return <TextInput required labelText="Password" />;
};
