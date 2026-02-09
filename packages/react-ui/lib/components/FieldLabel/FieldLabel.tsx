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
}

const FieldLabel = (props: FieldLabelProps): JSX.Element => {
	const { type = 'label', status, children, className, required, ...rest } = props;

	const renderLabelContent = () =>
		required ? (
			<>
				{children} <span className="FieldLabel_Required">*</span>
			</>
		) : (
			children
		);

	const Component = createElement(
		type,
		{ ...rest, className: classNames('FieldLabel', className), 'data-status': status },
		renderLabelContent()
	);

	return Component;
};

export default FieldLabel;
