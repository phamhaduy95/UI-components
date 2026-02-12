import FieldLabel, { FieldLabelProps } from '@components/FieldLabel';
import SupportingText from '@components/SupportingText';
import { FieldStatus } from '@components/type';
import classNames from 'classnames';

import './BaseField.css';
import { ComponentProps, Ref } from 'react';

export interface BaseFieldProps extends ComponentProps<'div'> {
	children: React.ReactNode;
	className?: string;
	label?: string;
	labelElement?: FieldLabelProps['type'];
	labelId?: string;
	supportingText?: string;
	status?: FieldStatus;
	ref?: Ref<HTMLDivElement>;
	required?: boolean;
	inputId?: string;
	supportingTextId?: string;
	disabled?: boolean;
	clearable?: boolean;
}

const BaseField = ({
	children,
	className,
	label,
	supportingText,
	status,
	required,
	ref,
	labelId,
	labelElement,
	inputId,
	supportingTextId,
	...rest
}: BaseFieldProps) => {
	return (
		<div ref={ref} className={classNames('BaseField', className)} data-status={status} {...rest}>
			<FieldLabel
				className="BaseField_Label"
				status={status}
				required={required}
				type={labelElement}
				id={labelId}
				htmlFor={inputId}
			>
				{label}
			</FieldLabel>
			{children}
			<SupportingText
				className="BaseField_SupportingText"
				id={supportingTextId}
				status={status}
				show={!!supportingText}
			>
				{supportingText}
			</SupportingText>
		</div>
	);
};

export default BaseField;
