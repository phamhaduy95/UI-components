import { SingleSelect, MultipleSelect } from '@packages/react-components';
import { useState } from 'react';

const items = [
	{ value: 'react', label: 'React' },
	{ value: 'vue', label: 'Vue' },
	{ value: 'angular', label: 'Angular' },
	{ value: 'svelte', label: 'Svelte' }
];

export const BasicSelect = () => {
	return <SingleSelect items={items} placeholder="Select a framework" label="Framework" />;
};

export const SelectWithDisabledItem = () => {
	const itemsWithDisabled = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3', disabled: true }
	];
	return (
		<SingleSelect
			items={itemsWithDisabled}
			placeholder="Select an option"
			label="With Disabled Item"
		/>
	);
};

export const SelectWithStatus = () => {
	const simpleItems = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' }
	];
	return (
		<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
			<SingleSelect
				items={simpleItems}
				status="error"
				label="Error State"
				supportingText="This field has an error"
			/>
			<SingleSelect
				items={simpleItems}
				status="success"
				label="Success State"
				supportingText="Selection is valid"
			/>
			<SingleSelect
				items={simpleItems}
				status="warning"
				label="Warning State"
				supportingText="Please review your selection"
			/>
		</div>
	);
};

export const ClearableSelect = () => {
	const simpleItems = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' },
		{ value: 'option3', label: 'Option 3' }
	];
	return (
		<SingleSelect
			items={simpleItems}
			label="Clearable Select"
			placeholder="Select an option"
			clearable
		/>
	);
};

export const ControlledSingleSelect = () => {
	const [selected, setSelected] = useState<string>();

	return (
		<>
			<SingleSelect
				items={items}
				value={selected}
				onValueChange={(value) => {
					setSelected(value);
				}}
				label="Controlled Select"
			/>
			<p>Selected Value: {selected}</p>
		</>
	);
};

export const ControlledMultipleSelect = () => {
	const [selectedItems, setSelectedItems] = useState<string[]>([]);

	return (
		<>
			<MultipleSelect
				items={items}
				value={selectedItems}
				onValueChange={(values) => {
					setSelectedItems(values);
				}}
				label="Multiple Select"
			/>
			<p>Selected Items: {selectedItems.join(', ')}</p>
		</>
	);
};

export const BasicMultipleSelect = () => {
	const extendedItems = [...items, { value: 'solid', label: 'Solid' }];
	return (
		<MultipleSelect
			items={extendedItems}
			placeholder="Select multiple frameworks"
			label="Frameworks"
		/>
	);
};

export const DisabledSelect = () => {
	const simpleItems = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' }
	];
	return (
		<SingleSelect
			items={simpleItems}
			disabled
			label="Disabled Select"
			placeholder="Cannot select"
		/>
	);
};

export const SelectWithSupportingText = () => {
	const simpleItems = [
		{ value: 'option1', label: 'Option 1' },
		{ value: 'option2', label: 'Option 2' }
	];
	return (
		<SingleSelect
			items={simpleItems}
			label="Select with Help Text"
			supportingText="Choose your preferred option from the list"
		/>
	);
};
