import { SingleCombobox, MultipleCombobox } from '@packages/react-components';
import { useState } from 'react';

export const BasicCombobox = () => {
	const items = [
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'svelte', label: 'Svelte' }
	];
	return <SingleCombobox items={items} label="Framework" />;
};

export const ControlledCombobox = () => {
	const [value, setValue] = useState<string>('');

	const items = [
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'svelte', label: 'Svelte' }
	];
	return (
		<div>
			<SingleCombobox
				items={items}
				className="pb-2"
				label="Framework"
				value={value}
				onValueChange={setValue}
			/>
			<p>Selected value: {value}</p>
		</div>
	);
};

export const ComboBoxWithMultipleStatuses = () => {
	return (
		<div className="grid grid-cols-2 gap-4">
			<SingleCombobox
				items={[{ value: '1', label: 'Option 1' }]}
				label="Default"
				supportingText="Default selection"
			/>
			<SingleCombobox
				items={[{ value: '1', label: 'Option 1' }]}
				label="Disabled"
				disabled
				supportingText="Disabled selection"
			/>
			<SingleCombobox
				items={[{ value: '1', label: 'Option 1' }]}
				status="error"
				label="Error"
				supportingText="Invalid selection"
			/>
			<SingleCombobox
				items={[{ value: '1', label: 'Option 1' }]}
				status="success"
				label="Success"
				supportingText="Valid selection"
			/>
			<SingleCombobox
				items={[{ value: '1', label: 'Option 1' }]}
				status="warning"
				label="Warning"
				supportingText="Warning selection"
			/>
		</div>
	);
};

export const BasicMultipleComboBox = () => {
	const [value, setValue] = useState<string[]>([]);

	const items = [
		{ value: 'react', label: 'React' },
		{ value: 'vue', label: 'Vue' },
		{ value: 'angular', label: 'Angular' },
		{ value: 'svelte', label: 'Svelte' }
	];
	return (
		<div>
			<MultipleCombobox items={items} label="Framework" value={value} onValueChange={setValue} />
			<p>Selected values: {value.join(', ')}</p>
		</div>
	);
};
