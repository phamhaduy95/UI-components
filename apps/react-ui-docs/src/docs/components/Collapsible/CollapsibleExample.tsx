import { Collapsible } from '@packages/react-components';
import { Button } from '@packages/react-components';
import { useState } from 'react';

export const BasicCollapsible = () => {
	return (
		<Collapsible Trigger={({ open }) => <Button>{open ? 'Hide Details' : 'Show Details'}</Button>}>
			<div className="mt-2 rounded-md border border-gray-300 p-4">
				This is the collapsible content. It can contain any elements.
			</div>
		</Collapsible>
	);
};

export const ControlledCollapsible = () => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="mb-4">
				<Button onClick={() => setIsOpen(!isOpen)} variant="filled">
					External Toggle (Current: {isOpen ? 'Open' : 'Closed'})
				</Button>
			</div>

			<Collapsible
				isOpen={isOpen}
				onOpenChange={setIsOpen}
				Trigger={({ open }) => (
					<Button variant="filled">{open ? 'Collapse Me' : 'Expand Me'}</Button>
				)}
			>
				<div className="mt-2 rounded-md border border-gray-300 p-4">Controlled content</div>
			</Collapsible>
		</>
	);
};

export const DisabledCollapsible = () => {
	return (
		<Collapsible
			Trigger={({ open }) => <Button>{open ? 'Hide Details' : 'Show Details'}</Button>}
			disabled
		>
			<div className="rounded-b-md border border-t-0 p-4">
				This is the collapsible content. It can contain any elements.
			</div>
		</Collapsible>
	);
};
