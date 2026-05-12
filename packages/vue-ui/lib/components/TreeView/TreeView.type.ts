import type { HTMLAttributes } from 'vue';

export interface TreeNodeObject {
	value: string;
	label: string;
	children?: TreeNodeObject[];
}

export interface TreeViewProps extends /* @vue-ignore */ HTMLAttributes {
	items?: TreeNodeObject[];
	defaultExpandedValue?: string[];
	defaultSelectedValue?: string[];
	expandedValue?: string[];
	selectedValue?: string[];
	dataTestid?: string;
	lazyMount?: boolean;
	unmountOnExit?: boolean;
}

export type TreeViewEmits = {
	'update:expandedValue': [value: string[]];
	'update:selectedValue': [value: string[]];
	expandedChange: [details: { expandedValue: string[] }];
	selectionChange: [details: { selectedValue: string[] }];
};

export interface TreeNodeState {
	isExpanded: boolean;
	isSelected: boolean;
	isBranch: boolean;
	node: TreeNodeObject;
}

export interface TreeViewSlots {
	label?: () => void;
	treeNodeLabel?: (props: TreeNodeState) => void;
	branchIcon?: (props: TreeNodeState) => void;
	itemIcon?: (props: TreeNodeState) => void;
}

export interface TreeViewPublicInstance {
	collapse: () => void;
	expand: () => void;
}
