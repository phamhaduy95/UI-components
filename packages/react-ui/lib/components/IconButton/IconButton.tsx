import classNames from 'classnames';
import Button, { ButtonProps } from '@components/Button';
import './IconButton.css';
import { JSX } from 'react';

export interface IconButtonProps extends ButtonProps {
	children: React.ReactNode;
}

const IconButton = (props: IconButtonProps): JSX.Element => {
	const { className, ref, children, ...rest } = props;

	return (
		<Button ref={ref} className={classNames('IconButton', className)} {...rest}>
			{children}
		</Button>
	);
};

IconButton.displayName = 'IconButton';

export default IconButton;
