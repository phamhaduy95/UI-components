import { FieldStatus } from '@components/type';
import classNames from 'classnames';
import { createElement, HTMLAttributes, HTMLElementType, JSX } from 'react';
import './FormLabel.css';

export interface FormLabelProps extends HTMLAttributes<HTMLLabelElement> {
	type?: HTMLElementType;
	children?: React.ReactNode;
	status?: FieldStatus;
	className?: string;
	required?: boolean;
	htmlFor?: string;
}

const FormLabel = (props: FormLabelProps): JSX.Element => {
	const { type = 'label', status, children, className, required, ...rest } = props;

	const renderLabelContent = () =>
		required ? (
			<>
				{children} <span className="FormLabel_Required">*</span>
			</>
		) : (
			children
		);

	const Component = createElement(
		type,
		{ ...rest, className: classNames('FormLabel', className), 'data-status': status },
		renderLabelContent()
	);

	return Component;
};

export default FormLabel;
