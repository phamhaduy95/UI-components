import classNames from 'classnames';
import { JSX } from 'react';

import { Button, ButtonProps } from '@components/Button';

import '@packages/styles/components/IconButton.css';

export interface IconButtonProps extends ButtonProps {
	children: React.ReactNode;
	shape?: 'square' | 'circle';
}

const IconButton = (props: IconButtonProps): JSX.Element => {
	const { className, ref, children, shape = 'circle', ...rest } = props;

	return (
		<Button ref={ref} className={classNames('IconButton', className)} data-shape={shape} {...rest}>
			{children}
		</Button>
	);
};

IconButton.displayName = 'IconButton';

export default IconButton;
