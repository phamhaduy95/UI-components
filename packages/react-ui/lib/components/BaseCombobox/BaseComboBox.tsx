import { Combobox as ArkCombobox, createListCollection } from '@ark-ui/react/combobox';
import { Portal } from '@ark-ui/react/portal';
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { JSX, useId, useMemo, useState } from 'react';

import { BaseField } from '@components/BaseField';
import { IconButton } from '@components/IconButton';

import type { BaseComboboxProps } from './BaseCombobox.type';

import { BaseComboboxPopup } from './BaseComboboxPopup';

import '@packages/styles/components/BaseCombobox.css';
import '@packages/styles/components/DropDownMenu.css';

const BaseCombobox = (props: BaseComboboxProps): JSX.Element => {
	const {
		label,
		items = [],
		value,
		loopFocus,
		multiple,
		disabled,
		status,
		className,
		supportingText,
		ref,
		required,
		defaultValue,
		inputRef,
		'data-testid': dataTestid,
		CustomValueText,
		open,
		onValueChange,
		onOpenChange,
		size,
		clearable,
		placeholder,
		virtualizationConfig,
		popupMaxHeight,
		menuHeader,
		menuFooter,
		emptyContent,
		itemContent,
		triggerIcon,
		clearIcon,
		onFocusOutside,
		onExitComplete,
		...rest
	} = props;

	const supportingTextId = useId();

	const [searchValue, setSearchValue] = useState('');

	const filteredItems = useMemo(() => {
		if (!searchValue) return items;
		return items.filter(
			(e) => e.label.toLowerCase().includes(searchValue.toLowerCase()) && !e.disabled
		);
	}, [searchValue, items]);

	const collection = useMemo(() => createListCollection({ items: filteredItems }), [filteredItems]);

	return (
		<ArkCombobox.Root
			className={classNames('Combobox', className)}
			collection={collection}
			onInputValueChange={(data) => {
				setSearchValue(data.inputValue.trim());
			}}
			value={value}
			onValueChange={onValueChange}
			onOpenChange={onOpenChange}
			loopFocus={loopFocus}
			disabled={disabled}
			required={required}
			multiple={multiple}
			defaultValue={defaultValue}
			onExitComplete={() => {
				setSearchValue('');
				onExitComplete?.();
			}}
			onFocusOutside={(event) => {
				setSearchValue('');
				onFocusOutside?.(event);
			}}
			ref={ref}
			open={open}
			data-testid={dataTestid}
			data-mode={multiple ? 'multiple' : undefined}
			asChild
		>
			<BaseField
				label={label}
				supportingText={supportingText}
				status={status}
				disabled={disabled}
				required={required}
				labelElement={ArkCombobox.Label}
				supportingTextId={supportingText ? supportingTextId : undefined}
				size={size}
			>
				<ArkCombobox.Control
					className="BaseField_Field Combobox_Control"
					data-status={status}
					aria-disabled={disabled}
				>
					{CustomValueText ? (
						typeof CustomValueText === 'function' ? (
							CustomValueText({ supportingTextId })
						) : (
							CustomValueText
						)
					) : (
						<ArkCombobox.Input
							className="Combobox_Input"
							disabled={disabled}
							ref={inputRef}
							{...rest}
							placeholder={placeholder}
							aria-describedby={supportingTextId}
						/>
					)}
					{clearable && (
						<ArkCombobox.ClearTrigger className="Combobox_ClearTrigger" asChild tabIndex={0}>
							<IconButton size="medium" variant="text" color="secondary">
								{clearIcon ?? <Cross2Icon />}
							</IconButton>
						</ArkCombobox.ClearTrigger>
					)}
					<ArkCombobox.Trigger className="Combobox_Trigger" aria-label="Trigger popup" asChild>
						<IconButton size="medium" variant="text" color="secondary">
							{triggerIcon ?? <ChevronDownIcon className="Combobox_TriggerIcon" />}
						</IconButton>
					</ArkCombobox.Trigger>
				</ArkCombobox.Control>

				<Portal>
					<BaseComboboxPopup
						virtualizationConfig={virtualizationConfig}
						items={collection.items}
						searchValue={searchValue}
						popupMaxHeight={popupMaxHeight}
						menuHeader={menuHeader}
						menuFooter={menuFooter}
						emptyContent={emptyContent}
						itemContent={itemContent}
					/>
				</Portal>
			</BaseField>
		</ArkCombobox.Root>
	);
};

export default BaseCombobox;
