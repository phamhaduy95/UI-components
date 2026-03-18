import { TagsInput as ArkTagsInput, type TagsInputRootProps } from '@ark-ui/react/tags-input';
import { Cross2Icon } from '@radix-ui/react-icons';
import { JSX, ReactNode, useId } from 'react';

import { BaseField } from '@components/BaseField';
import { Chip } from '@components/Chip';
import { IconButton } from '@components/IconButton';
import { CommonFieldProps } from '@components/type';

import '@packages/styles/components/TagInput.css';

export interface TagsInputProps
	extends CommonFieldProps<string[]>,
		Pick<TagsInputRootProps, 'maxLength' | 'allowOverflow' | 'max' | 'validate' | 'delimiter'> {
	'data-testid'?: string;
	hideInput?: boolean;
	onValueChange?: (value: string[]) => void;
	renderItem?: (props: { value: string; index: number; removeItem: () => void }) => ReactNode;
}

const TagsInput = (props: TagsInputProps): JSX.Element => {
	const {
		value,
		defaultValue,
		disabled = false,
		required = false,
		max,
		maxLength,
		allowOverflow = false,
		readOnly = false,
		delimiter = ',',
		validate,
		hideInput = false,
		clearable = false,
		onValueChange,
		label,
		size = 'medium',
		status,
		supportingText,
		supportingTextId: externalSupportingTextId,
		placeholder,
		'data-testid': dataTestid,
		renderItem
	} = props;

	const internalSupportingTextId = useId();
	const supportingTextId = externalSupportingTextId ?? internalSupportingTextId;

	const handleOnValueChange: TagsInputRootProps['onValueChange'] = (details) => {
		if (onValueChange) onValueChange(details.value);
	};

	return (
		<ArkTagsInput.Root
			className="TagInput"
			value={value}
			defaultValue={defaultValue}
			disabled={disabled}
			required={required}
			max={max}
			maxLength={maxLength}
			allowOverflow={allowOverflow}
			readOnly={readOnly}
			delimiter={delimiter}
			editable={false}
			validate={validate}
			onValueChange={handleOnValueChange}
			asChild
		>
			<BaseField
				label={label}
				size={size}
				disabled={disabled}
				required={required}
				status={status}
				supportingText={supportingText}
				supportingTextId={supportingText ? supportingTextId : undefined}
				labelElement={ArkTagsInput.Label}
				data-testid={dataTestid}
			>
				<ArkTagsInput.Control className="BaseField_Field TagInput_Control">
					<ArkTagsInput.Context>
						{(context) => (
							<>
								<div className="TagInput_InputArea">
									{context.value.map((tagValue, index) => (
										<ArkTagsInput.Item
											key={index}
											index={index}
											value={tagValue}
											className="TagInput_Item"
										>
											<ArkTagsInput.ItemPreview asChild>
												{renderItem ? (
													renderItem({
														value: tagValue,
														index,
														removeItem: () =>
															context.setValue(context.value.filter((item) => item !== tagValue))
													})
												) : (
													<Chip
														label={tagValue}
														removable
														onRemove={() =>
															context.setValue(context.value.filter((item) => item !== tagValue))
														}
													/>
												)}
											</ArkTagsInput.ItemPreview>
											<ArkTagsInput.ItemInput />
										</ArkTagsInput.Item>
									))}

									{!hideInput && (
										<ArkTagsInput.Input
											className="TagInput_Input"
											aria-describedby={supportingText ? supportingTextId : undefined}
											placeholder={placeholder}
											required={required}
										/>
									)}
								</div>
								<div className="BaseField_Trailing TagInput_Trailing">
									{clearable && context.value.length > 0 && (
										<ArkTagsInput.ClearTrigger asChild>
											<IconButton aria-label="Clear" size="medium" variant="text" color="secondary">
												<Cross2Icon />
											</IconButton>
										</ArkTagsInput.ClearTrigger>
									)}
								</div>
							</>
						)}
					</ArkTagsInput.Context>
				</ArkTagsInput.Control>
				{!hideInput && <ArkTagsInput.HiddenInput />}
			</BaseField>
		</ArkTagsInput.Root>
	);
};

export default TagsInput;
