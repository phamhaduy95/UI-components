import classNames from 'classnames';
import { JSX } from 'react';

import { Button, ButtonProps } from '@components/Button';

import '@packages/styles/components/IconButton.css';

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
