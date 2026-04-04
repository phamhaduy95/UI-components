export type ItemObject = { value: string; label: string; disabled?: boolean };

export type StandardItem = ItemObject & {
	type?: never;
};

export interface NestedMenu extends ItemObject {
	type: 'nested';
	items: MenuItem[];
}

export interface GroupItem extends ItemObject {
	type: 'group';
	items: MenuItem[];
}

export type MenuItem = StandardItem | NestedMenu | GroupItem;

export interface DropdownMenuProps {
	className?: string;
	items?: MenuItem[];
}

export type DropdownMenuSlots = {
	default?: () => void;
	item?: (props: { item: MenuItem }) => void;
};
