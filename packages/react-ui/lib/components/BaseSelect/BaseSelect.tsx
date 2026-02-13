import { HTMLAttributes, JSX, Ref, useId } from 'react';

import { Portal } from '@ark-ui/react/portal';
import { Select as ArkSelect, createListCollection } from '@ark-ui/react/select';
import { CommonFieldProps, SelectItem } from '@components/type';
import { CheckIcon, ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';

import '@components/DropDownMenu/Menu.css';

import './Select.css';

import BaseField from '@components/BaseField';
import IconButton from '@components/IconButton';

export interface BaseSelectProps extends HTMLAttributes<HTMLButtonElement>, CommonFieldProps {
	className?: string;
	disabled?: boolean;
	items?: Array<SelectItem>;
	placeholder?: string;
	ref?: Ref<HTMLDivElement>;
	deselectable?: boolean;
	loopFocus?: boolean;
	value?: string[];
	name?: string;
	multiple?: boolean;
	CustomValueText?: React.ReactNode;
	onValueChange?: ArkSelect.RootProps<SelectItem>['onValueChange'];
	'data-testId'?: string;
	defaultValue?: string[];
}

const BaseSelect = ({
	items = [],
	status,
	label,
	className,
	ref,
	size,
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
	'data-testId': dataTestId,
	defaultValue
}: BaseSelectProps): JSX.Element => {
	const collection = createListCollection({ items });
	const supportingTextId = useId();

	return (
		<ArkSelect.Root
			className={classNames('Select', className)}
			collection={collection}
			disabled={disabled}
			required={required}
			deselectable={deselectable}
			loopFocus={loopFocus}
			value={value}
			multiple={multiple}
			onValueChange={onValueChange}
			name={name}
			ref={ref}
			defaultValue={defaultValue}
			data-testId={dataTestId}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				status={status}
				size={size}
				disabled={disabled}
				required={required}
				labelElement={ArkSelect.Label}
				supportingTextId={supportingTextId}
			>
				<ArkSelect.Control className="Select_Control" data-status={status}>
					<ArkSelect.Trigger
						className="BaseField_Field Select_Trigger"
						aria-describedby={supportingTextId}
					>
						{CustomValueText ?? (
							<ArkSelect.ValueText className="Select_Value" placeholder={placeholder} />
						)}
					</ArkSelect.Trigger>

					<div className="Select_Trailing">
						{clearable && (
							<ArkSelect.ClearTrigger className="Select_ClearButton" asChild>
								<IconButton variant="text" color="secondary" size="medium">
									<Cross2Icon />
								</IconButton>
							</ArkSelect.ClearTrigger>
						)}
						<ArkSelect.Indicator className="Select_Indicator" aria-label="select indicator">
							<ChevronDownIcon width={20} height={20} />
						</ArkSelect.Indicator>
					</div>

					<ArkSelect.HiddenSelect name={name} aria-describedby={supportingTextId} tabIndex={-1} />
				</ArkSelect.Control>
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
