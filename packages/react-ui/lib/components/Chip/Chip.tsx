import { Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { ComponentPropsWithRef, JSX } from 'react';
import './Chip.css';

type ChipSize = 'small' | 'medium';
type ChipColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';
type ChipVariant = 'filled' | 'outlined';

export interface ChipProps extends ComponentPropsWithRef<'div'> {
	label?: string;
	removable?: boolean;
	size?: ChipSize;
	color?: ChipColor;
	disabled?: boolean;
	variant?: ChipVariant;
	clickable?: boolean;
	onRemove?: (e: React.SyntheticEvent) => void;
	onClick?: (e: React.SyntheticEvent) => void;
	'data-testid'?: string;
}

const Chip = (props: ChipProps): JSX.Element => {
	const {
		label,
		removable,
		className,
		ref,
		clickable,
		size = 'medium',
		color = 'primary',
		disabled,
		'data-testid': dataTestId,
		onRemove,
		onClick,
		...rest
	} = props;

	const handleOnkeyDown = (e: React.KeyboardEvent) => {
		if (!onRemove) return;
		e.stopPropagation();
		const key = e.key;
		switch (key) {
			case 'Backspace':
			case 'Delete':
				onRemove(e);
		}
	};

	return (
		<div
			className={classNames('Chip', className)}
			data-removable={removable}
			data-size={size}
			data-color={color}
			aria-label={label}
			data-disabled={disabled}
			data-clickable={clickable}
			ref={ref}
			onClick={clickable ? onClick : undefined}
			role={clickable ? 'button' : undefined}
			tabIndex={clickable ? 0 : undefined}
			data-testid={dataTestId}
			{...rest}
		>
			<span className="Chip_Label">{label}</span>
			{removable ? (
				<span
					className="Chip_RemoveButton"
					onClick={onRemove}
					aria-label="Remove Chip"
					onKeyDown={handleOnkeyDown}
					role={removable && !clickable ? 'button' : undefined}
					tabIndex={removable && !clickable ? 0 : undefined}
				>
					<Cross2Icon />
				</span>
			) : null}
		</div>
	);
};

export default Chip;
