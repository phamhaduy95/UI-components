import FieldLabel, { FieldLabelProps } from '@components/FieldLabel';
import SupportingText from '@components/SupportingText';
import { CommonFieldProps } from '@components/type';
import classNames from 'classnames';

import './BaseField.css';
import { HTMLAttributes, Ref } from 'react';

export interface BaseFieldProps extends HTMLAttributes<HTMLDivElement>, CommonFieldProps {
	children: React.ReactNode;
	className?: string;
	labelElement?: FieldLabelProps['type'];
	labelId?: string;
	ref?: Ref<HTMLDivElement>;
	inputId?: string;
}

const BaseField = ({
	children,
	className,
	label,
	supportingText,
	status,
	required,
	clearable,
	disabled,
	ref,
	labelId,
	labelElement,
	inputId,
	size,
	supportingTextId,
	...rest
}: BaseFieldProps) => {
	return (
		<div
			ref={ref}
			className={classNames('BaseField', className)}
			data-status={status}
			data-size={size}
			data-required={required}
			aria-disabled={disabled}
			data-clearable={clearable}
			{...rest}
		>
			<FieldLabel
				className="BaseField_Label"
				status={status}
				required={required}
				type={labelElement}
				id={labelId}
				htmlFor={inputId}
				showLabel={Boolean(label)}
			>
				{label}
			</FieldLabel>
			{children}
			<SupportingText
				className="BaseField_SupportingText"
				id={supportingTextId}
				status={status}
				show={Boolean(supportingText)}
			>
				{supportingText}
			</SupportingText>
		</div>
	);
};

export default BaseField;
