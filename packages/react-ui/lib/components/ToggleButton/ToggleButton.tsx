import { Toggle as ArkToggle, UseToggleContext } from '@ark-ui/react/toggle';
import classNames from 'classnames';
import { useState } from 'react';

import { Button, ButtonProps } from '@components/Button';

type ToggleButtonChildren = (
	state: Pick<UseToggleContext, 'pressed' | 'setPressed' | 'disabled'>
) => React.ReactNode;

export interface ToggleButtonProps extends Omit<ButtonProps, 'children' | 'variant'> {
	pressed?: boolean;
	onPressedChange?: (pressed: boolean) => void;
	defaultPressed?: boolean;
	children: ToggleButtonChildren | React.ReactNode;
}

const ToggleButton = ({
	pressed: externalPressed,
	onPressedChange,
	defaultPressed,
	children,
	className,
	size = 'medium',
	color,
	...rest
}: ToggleButtonProps) => {
	const [internalpressed, setInternalPressed] = useState(defaultPressed);

	const pressed = externalPressed ?? internalpressed;

	const variant: ButtonProps['variant'] = pressed ? 'contained' : 'outlined';

	const handleOnPressedChange: ArkToggle.RootProps['onPressedChange'] = (pressed) => {
		setInternalPressed(pressed);
		if (onPressedChange) {
			onPressedChange(pressed);
		}
	};

	return (
		<ArkToggle.Root pressed={pressed} onPressedChange={handleOnPressedChange} asChild>
			<Button
				className={classNames('ToggleButton', 'Button', className)}
				color={color}
				size={size}
				variant={variant}
				{...rest}
			>
				<ArkToggle.Context>
					{(context) => {
						const content = typeof children === 'function' ? children(context) : children;
						return content;
					}}
				</ArkToggle.Context>
			</Button>
		</ArkToggle.Root>
	);
};

export default ToggleButton;
