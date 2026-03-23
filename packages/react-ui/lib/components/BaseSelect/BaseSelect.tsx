import { Portal } from '@ark-ui/react/portal';
import { createListCollection, Select as ArkSelect } from '@ark-ui/react/select';
import { ChevronDownIcon, Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { JSX, useId, useMemo } from 'react';

import { BaseField } from '@components/BaseField';
import { IconButton } from '@components/IconButton';

import type { BaseSelectProps } from './BaseSelect.type';

import { BaseSelectPopup } from './BaseSelectPopup';

import '@packages/styles/components/BaseSelect.css';
import '@packages/styles/components/DropDownMenu.css';

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
	defaultValue,
	virtualizationConfig,
	popupMaxHeight,
	menuHeader,
	menuFooter,
	emptyContent,
	itemContent,
	triggerIcon,
	clearIcon,
	onFocusOutside,
	onExitComplete
}: BaseSelectProps): JSX.Element => {
	const collection = useMemo(() => createListCollection({ items }), [items]);
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
			onFocusOutside={onFocusOutside}
			onExitComplete={onExitComplete}
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
				<ArkSelect.Control className="Select_Control BaseField_Field" data-status={status}>
					<ArkSelect.Trigger className="Select_Trigger" aria-describedby={supportingTextId}>
						{typeof CustomValueText === 'function' ? (
							CustomValueText({ supportingTextId })
						) : (
							<ArkSelect.ValueText className="Select_Value" placeholder={placeholder} />
						)}
					</ArkSelect.Trigger>

					<div className="Select_Trailing">
						{clearable && (
							<ArkSelect.ClearTrigger className="Select_ClearButton" asChild>
								<IconButton variant="text" color="secondary" size="medium">
									{clearIcon ?? <Cross2Icon />}
								</IconButton>
							</ArkSelect.ClearTrigger>
						)}
						<ArkSelect.Indicator className="Select_Indicator" aria-label="select indicator">
							{triggerIcon ?? <ChevronDownIcon width={20} height={20} />}
						</ArkSelect.Indicator>
					</div>

					<ArkSelect.HiddenSelect name={name} aria-describedby={supportingTextId} tabIndex={-1} />
				</ArkSelect.Control>
				<Portal>
					<ArkSelect.Positioner
						className="Positioner"
						style={{ zIndex: 'var(--menu-popup-z-index)' }}
					>
						<BaseSelectPopup
							virtualizationConfig={virtualizationConfig}
							items={collection.items}
							popupMaxHeight={popupMaxHeight}
							menuHeader={menuHeader}
							menuFooter={menuFooter}
							emptyContent={emptyContent}
							itemContent={itemContent}
						/>
					</ArkSelect.Positioner>
				</Portal>
			</BaseField>
		</ArkSelect.Root>
	);
};

export default BaseSelect;
