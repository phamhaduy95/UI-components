import { Menu as ArkMenu } from '@ark-ui/react/menu';
import { ItemObject } from '@components/type';
import classNames from 'classnames';
import { JSX } from 'react';
import SubMenu from '../SubMenu/SubMenu';
import { Portal } from '@ark-ui/react/portal';
import './Menu.css';

type StandardItem = ItemObject & {
	type?: never;
};

export type NestedMenu = ItemObject & {
	type: 'nested';
	items: MenuItem[];
};

type GroupItem = ItemObject & {
	type: 'group';
	items: MenuItem[];
};

type MenuItem = StandardItem | NestedMenu | GroupItem;

export type DropdownMenuProps = {
	className?: string;
	items?: MenuItem[];
	children?: React.ReactNode;
	CustomTrigger?: React.ReactNode;
	CustomItem?: (item: ItemObject) => React.ReactNode;
};

const DropDownMenu = (props: DropdownMenuProps): JSX.Element => {
	const { items = [], className, CustomTrigger, children, CustomItem } = props;
	return (
		<ArkMenu.Root>
			<ArkMenu.Trigger
				className={classNames('Menu_Trigger', className)}
				asChild={!!CustomTrigger}
			>
				{CustomTrigger ?? children}
			</ArkMenu.Trigger>
			<Portal>
				<ArkMenu.Positioner>
					<ArkMenu.Content className="Menu">
						{items.map((item) => {
							switch (item.type) {
								case 'nested':
									return (
										<SubMenu
											{...item}
											key={item.value}
										/>
									);
								default:
									return (
										<ArkMenu.Item
											className="Menu_Item"
											disabled={item.disabled}
											value={item.value}
											key={item.value}
										>
											{CustomItem ? CustomItem(item) : item.label}
										</ArkMenu.Item>
									);
							}
						})}
					</ArkMenu.Content>
				</ArkMenu.Positioner>
			</Portal>
		</ArkMenu.Root>
	);
};

export default DropDownMenu;
