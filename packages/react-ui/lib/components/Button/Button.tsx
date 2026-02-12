import classNames from 'classnames';
import { Ref } from 'react';

import './Button.css';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children?: React.ReactNode;
	ref?: Ref<HTMLButtonElement>;
	variant?: ButtonVariant;
	loading?: boolean;
	size?: ButtonSize;
	className?: string;
	color?: ButtonColor;
}

const Button = (props: ButtonProps) => {
	const {
		children,
		className,
		ref,
		variant = 'contained',
		size = 'medium',
		type = 'button',
		color = 'primary',
		...rest
	} = props;

	return (
		<button
			className={classNames('Button', className)}
			ref={ref}
			data-variant={variant}
			data-size={size}
			data-color={color}
			type={type}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
