import FieldLabel, { FieldLabelProps } from '@components/FieldLabel';
import SupportingText, { SupportingTextProps } from '@components/SupportingText';
import { FieldStatus } from '@components/type';
import classNames from 'classnames';

import './BaseField.css';

export interface BaseFieldProps {
	children: React.ReactNode;
	className?: string;
	label?: string;
	labelElement?: FieldLabelProps['type'];
	labelId?: string;
	supportingText?: string;
	status?: FieldStatus;
	required?: boolean;
	inputId?: string;
	supportingTextId?: string;
	disabled?: boolean;
	clearable?: boolean;
	CustomLabel?: (props: FieldLabelProps) => React.ReactNode;
}

const BaseField = ({
	children,
	className,
	label,
	supportingText,
	status,
	required,
	labelId,
	labelElement,
	inputId,
	supportingTextId,
	CustomLabel
}: BaseFieldProps) => {
	return (
		<div className={classNames('BaseField', className)}>
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
