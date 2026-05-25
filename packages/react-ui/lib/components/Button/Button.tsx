import classNames from 'classnames';
import { ComponentPropsWithRef, JSX } from 'react';

import '@packages/styles/components/Button.css';

type ButtonVariant = 'contained' | 'outlined' | 'text';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg';
type ButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';

export interface ButtonProps extends ComponentPropsWithRef<'button'> {
	children?: React.ReactNode;
	variant?: ButtonVariant;
	loading?: boolean;
	size?: ButtonSize;
	color?: ButtonColor;
}

const Button = (props: ButtonProps): JSX.Element => {
	const {
		children,
		className,
		ref,
		variant = 'contained',
		size = 'md',
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
			type={'button'}
			{...rest}
		>
			{children}
		</button>
	);
};

export default Button;
