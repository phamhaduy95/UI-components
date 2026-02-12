import { FieldStatus } from '@components/type';
import classNames from 'classnames';
import { createElement, FunctionComponent, HTMLAttributes, HTMLElementType, JSX } from 'react';
import './FieldLabel.css';

export interface FieldLabelProps extends HTMLAttributes<HTMLLabelElement> {
	type?: HTMLElementType | FunctionComponent<Record<string, any>>;
	children?: React.ReactNode;
	status?: FieldStatus;
	className?: string;
	required?: boolean;
	htmlFor?: string;
	showLabel?: boolean;
}

const FieldLabel = (props: FieldLabelProps): JSX.Element => {
	const { type = 'label', status, children, className, required, showLabel, ...rest } = props;

	const Component = createElement(
		type,
		{ ...rest, className: classNames('FieldLabel', className), 'data-status': status },
		children
	);

	if (showLabel)
		return (
			<p>
				{Component}
				{required && <span className="FieldLabel_Required">*</span>}
			</p>
		);

	return <></>;
};

export default FieldLabel;
