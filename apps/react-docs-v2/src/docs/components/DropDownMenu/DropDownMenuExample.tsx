import { Button, DropDownMenu } from '@packages/react-components';

export const BasicDropDownMenu = () => {
	return (
		<DropDownMenu
			items={[
				{ value: 'profile', label: 'Profile' },
				{ value: 'settings', label: 'Settings' },
				{ value: 'logout', label: 'Logout' }
			]}
		>
			<Button>Open Menu</Button>
		</DropDownMenu>
	);
};

export const DropDownMenuWithDisabledItem = () => {
	return (
		<DropDownMenu
			items={[
				{ value: 'profile', label: 'Profile' },
				{ value: 'settings', label: 'Settings', disabled: true },
				{ value: 'logout', label: 'Logout' }
			]}
		>
			<Button>Open Menu</Button>
		</DropDownMenu>
	);
};

export const DropDownMenuWithCustomTrigger = () => {
	return (
		<DropDownMenu
			items={[
				{ value: 'profile', label: 'Profile' },
				{ value: 'settings', label: 'Settings' },
				{ value: 'logout', label: 'Logout' }
			]}
			CustomTrigger={<Button>Custom Open</Button>}
		/>
	);
};

export const DropDownMenuWithCustomItem = () => {
	return (
		<DropDownMenu
			items={[
				{ value: 'profile', label: 'Profile' },
				{ value: 'settings', label: 'Settings' },
				{ value: 'logout', label: 'Logout' }
			]}
			CustomItem={({ label, value }) => (
				<p>
					{label}-{value}
				</p>
			)}
		>
			<Button>Open Menu</Button>
		</DropDownMenu>
	);
};

export const NestedDropDownMenu = () => {
	return (
		<DropDownMenu
			items={[
				{ value: 'new', label: 'New File' },
				{
					label: 'Open Recent',
					type: 'nested',
					value: 'open-recent',
					items: [
						{ value: 'project-1', label: 'Project 1' },
						{ value: 'project-2', label: 'Project 2' }
					]
				},
				{ value: 'save', label: 'Save' }
			]}
		>
			<Button>File</Button>
		</DropDownMenu>
	);
};
