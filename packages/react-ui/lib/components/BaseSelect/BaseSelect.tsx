import { HTMLAttributes, Ref, useId } from 'react';

import { Portal } from '@ark-ui/react/portal';
import { Select, createListCollection } from '@ark-ui/react/select';
import { FieldStatus, SelectItem } from '@components/type';
import { CheckIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import SupportingText from '../SupportingText';

import '../DropDownMenu/Menu.css';
import '../FormField/FormField.css';
import './Select.css';

export type BaseSelectProps = HTMLAttributes<HTMLButtonElement> & {
	className?: string;
	disabled?: boolean;
	items?: Array<SelectItem>;
	label?: string;
	placeholder?: string;
	supportingText?: string;
	ref?: Ref<HTMLButtonElement>;
	status?: FieldStatus;
	required?: boolean;
	deselectable?: boolean;
	loopFocus?: boolean;
	clearable?: boolean;
	value?: string[];
	name?: string;
	multiple?: boolean;
	CustomValueText?: React.ReactNode;
	onValueChange?: Select.RootProps<SelectItem>['onValueChange'];
};

const BaseSelect = ({
	items = [],
	status,
	label,
	className,
	ref,
	placeholder,
	disabled,
	deselectable,
	supportingText,
	loopFocus,
	clearable,
	value,
	multiple,
	onValueChange,
	CustomValueText,
	name,
	...rest
}: BaseSelectProps) => {
	const collection = createListCollection({ items });
	const supportingTextId = useId();
	return (
		<Select.Root
			className={classNames('FormField Select_Root', className)}
			collection={collection}
			disabled={disabled}
			deselectable={deselectable}
			loopFocus={loopFocus}
			value={value}
			multiple={multiple}
			onValueChange={onValueChange}
			name={name}
		>
			<Select.Label
				className="FormLabel"
				data-status={status}
			>
				{label}
			</Select.Label>

			<Select.Trigger
				ref={ref}
				className="FormField_Field Select_InputField"
				aria-disabled={disabled}
				data-status={status}
				{...rest}
				asChild
				aria-describedby={supportingTextId}
			>
				<div tabIndex={0}>
					{CustomValueText ?? (
						<Select.ValueText
							className="Select_Value"
							placeholder={placeholder}
						/>
					)}
					<div className="FormField_TrailingIcon">
						<ChevronDownIcon
							className="Select_ToggleIcon"
							width={20}
							height={20}
						/>
						{clearable ? (
							<Select.ClearTrigger className="Select_ClearButton">
								<Cross2Icon
									width={20}
									height={20}
								/>
							</Select.ClearTrigger>
						) : null}
					</div>
				</div>
			</Select.Trigger>
			<SupportingText
				show={!!supportingText}
				status={status}
				id={supportingTextId}
			>
				{supportingText}
			</SupportingText>
			<Portal>
				<Select.Positioner
					className="Positioner"
					style={{ zIndex: 'var(--menu-popup-z-index)' }}
				>
					<Select.Content className="Menu SelectContent">
						{collection.items.map((item) => (
							<Select.Item
								className="Menu_Item SelectItem"
								key={item.value}
								item={item}
							>
								<Select.ItemText>{item.label}</Select.ItemText>
								<Select.ItemIndicator className="MenuItem_TrailingIcon">
									<CheckIcon
										height={16}
										width={16}
									/>
								</Select.ItemIndicator>
							</Select.Item>
						))}
					</Select.Content>
				</Select.Positioner>
			</Portal>
			<Select.HiddenSelect name={name} />
		</Select.Root>
	);
};

export default BaseSelect;
