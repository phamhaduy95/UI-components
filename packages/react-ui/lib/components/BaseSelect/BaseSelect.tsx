import { HTMLAttributes, JSX, Ref, useId } from 'react';

import { Portal } from '@ark-ui/react/portal';
import { Select as ArkSelect, createListCollection } from '@ark-ui/react/select';
import { FieldStatus, SelectItem } from '@components/type';
import { CheckIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';

import '../DropDownMenu/Menu.css';

import './Select.css';

import BaseField from '@components/BaseField';

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
	onValueChange?: ArkSelect.RootProps<SelectItem>['onValueChange'];
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
	required,
	multiple,
	onValueChange,
	CustomValueText,
	name,
	...rest
}: BaseSelectProps): JSX.Element => {
	const collection = createListCollection({ items });
	const supportingTextId = useId();
	const inputId = useId();

	return (
		<ArkSelect.Root
			className={classNames('Select_Root', className)}
			collection={collection}
			disabled={disabled}
			deselectable={deselectable}
			loopFocus={loopFocus}
			value={value}
			multiple={multiple}
			onValueChange={onValueChange}
			name={name}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				status={status}
				labelElement={ArkSelect.Label}
				supportingTextId={supportingTextId}
				disabled={disabled}
				clearable={clearable}
				required={required}
			>
				<ArkSelect.Trigger
					ref={ref}
					className="BaseField_Field Select_InputField"
					aria-disabled={disabled}
					data-status={status}
					{...rest}
					asChild
					aria-describedby={supportingTextId}
				>
					<div tabIndex={0}>
						{CustomValueText ?? (
							<ArkSelect.ValueText className="Select_Value" placeholder={placeholder} />
						)}
						<div className="BaseField_TrailingIcon">
							<ChevronDownIcon className="Select_ToggleIcon" width={20} height={20} />
							{clearable ? (
								<ArkSelect.ClearTrigger className="Select_ClearButton">
									<Cross2Icon width={20} height={20} />
								</ArkSelect.ClearTrigger>
							) : null}
						</div>
					</div>
				</ArkSelect.Trigger>

				<ArkSelect.HiddenSelect name={name} id={inputId} aria-describedby={supportingTextId} />
				<Portal>
					<ArkSelect.Positioner
						className="Positioner"
						style={{ zIndex: 'var(--menu-popup-z-index)' }}
					>
						<ArkSelect.Content className="Menu SelectContent">
							{collection.items.map((item) => (
								<ArkSelect.Item className="Menu_Item SelectItem" key={item.value} item={item}>
									<ArkSelect.ItemText>{item.label}</ArkSelect.ItemText>
									<ArkSelect.ItemIndicator className="MenuItem_TrailingIcon">
										<CheckIcon height={16} width={16} />
									</ArkSelect.ItemIndicator>
								</ArkSelect.Item>
							))}
						</ArkSelect.Content>
					</ArkSelect.Positioner>
				</Portal>
			</BaseField>
		</ArkSelect.Root>
	);
};

export default BaseSelect;
