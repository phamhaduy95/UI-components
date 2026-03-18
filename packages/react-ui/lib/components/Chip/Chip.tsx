import { Cross2Icon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { ComponentPropsWithRef, JSX } from 'react';

import '@packages/styles/components/Chip.css';

type ChipSize = 'small' | 'medium';
type ChipColor = 'primary' | 'secondary' | 'error' | 'success' | 'warning';

export interface ChipProps extends ComponentPropsWithRef<'div'> {
	label?: string;
	removable?: boolean;
	size?: ChipSize;
	color?: ChipColor;
	disabled?: boolean;
	clickable?: boolean;
	onRemove?: (e: React.SyntheticEvent) => void;
	onClick?: (e: React.SyntheticEvent) => void;
	'data-testid'?: string;
}

const Chip = (props: ChipProps): JSX.Element => {
	const {
		label,
		removable = false,
		className,
		ref,
		clickable = false,
		size = 'medium',
		color = 'primary',
		disabled = false,
		'data-testid': dataTestId,
		onRemove,
		onClick,
		...rest
	} = props;

	const isInteractive = clickable || removable;

	const handleRemove = (e: React.SyntheticEvent) => {
		if (!removable) return;
		if (onRemove) {
			onRemove(e);
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		e.stopPropagation();
		const key = e.key;
		if (['Backspace', 'Delete'].includes(key)) {
			handleRemove(e);
		}
	};

	const handleRemoveItemClicked = (e: React.MouseEvent) => {
		e.stopPropagation();
		handleRemove(e);
	};

	return (
		<div
			className={classNames('Chip', className)}
			data-size={size}
			data-color={color}
			aria-label={label}
			data-disabled={disabled}
			data-clickable={isInteractive}
			data-removable={removable}
			role={isInteractive ? 'button' : undefined}
			tabIndex={isInteractive ? 0 : undefined}
			data-testid={dataTestId}
			ref={ref}
			onClick={(e) => {
				e.stopPropagation();

				if (onClick) {
					onClick(e);
				}
			}}
			onKeyDown={handleKeyDown}
			{...rest}
		>
			<span className="Chip_Label">{label}</span>
			{removable ? (
				<span
					className="Chip_RemoveButton"
					data-part="chip_remove-icon"
					onClick={handleRemoveItemClicked}
				>
					<Cross2Icon />
				</span>
			) : null}
		</div>
	);
};

export default Chip;
