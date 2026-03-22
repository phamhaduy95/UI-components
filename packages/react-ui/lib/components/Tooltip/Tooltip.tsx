import { Portal } from '@ark-ui/react/portal';
import { Tooltip as ArkTooltip, type TooltipRootProps } from '@ark-ui/react/tooltip';
import { JSX, ReactNode } from 'react';

import '@packages/styles/components/Tooltip.css';

export interface TooltipContext {
	open: boolean;
	setOpen: (open: boolean) => void;
}

export interface TooltipProps
	extends Pick<
		TooltipRootProps,
		| 'defaultOpen'
		| 'open'
		| 'openDelay'
		| 'closeDelay'
		| 'disabled'
		| 'unmountOnExit'
		| 'lazyMount'
		| 'closeOnPointerDown'
		| 'closeOnScroll'
		| 'interactive'
	> {
	positioning?: TooltipRootProps['positioning'];
	arrow?: boolean;
	'data-testid'?: string;
	trigger?: (context: TooltipContext) => ReactNode;
	children?: ReactNode | ((context: TooltipContext) => ReactNode);
	onOpenChange?: (open: boolean) => void;
}

const Tooltip = (props: TooltipProps): JSX.Element => {
	const {
		defaultOpen,
		open,
		openDelay,
		closeDelay,
		disabled,
		unmountOnExit,
		lazyMount,
		closeOnPointerDown,
		closeOnScroll,
		interactive,
		positioning,
		arrow = false,
		'data-testid': dataTestId,
		trigger,
		children,
		onOpenChange
	} = props;

	const handleOpenChange: TooltipRootProps['onOpenChange'] = (details) => {
		if (onOpenChange) {
			onOpenChange(details.open);
		}
	};

	return (
		<ArkTooltip.Root
			defaultOpen={defaultOpen}
			open={open}
			openDelay={openDelay}
			closeDelay={closeDelay}
			disabled={disabled}
			unmountOnExit={unmountOnExit}
			lazyMount={lazyMount}
			closeOnPointerDown={closeOnPointerDown}
			closeOnScroll={closeOnScroll}
			interactive={interactive}
			positioning={positioning}
			onOpenChange={handleOpenChange}
		>
			<ArkTooltip.Context>
				{(context) => {
					const args: TooltipContext = {
						open: context.open,
						setOpen: context.setOpen
					};

					return (
						<>
							{trigger && <ArkTooltip.Trigger asChild>{trigger(args)}</ArkTooltip.Trigger>}
							<Portal>
								<ArkTooltip.Positioner className="Tooltip_Positioner" data-testid={dataTestId}>
									<ArkTooltip.Content className="Tooltip_Content">
										{arrow && (
											<ArkTooltip.Arrow className="Tooltip_Arrow">
												<ArkTooltip.ArrowTip className="Tooltip_ArrowTip" />
											</ArkTooltip.Arrow>
										)}
										{typeof children === 'function' ? children(args) : children}
									</ArkTooltip.Content>
								</ArkTooltip.Positioner>
							</Portal>
						</>
					);
				}}
			</ArkTooltip.Context>
		</ArkTooltip.Root>
	);
};

export default Tooltip;
