import { HoverCard as ArkHoverCard, type HoverCardRootProps } from '@ark-ui/react/hover-card';
import { Portal } from '@ark-ui/react/portal';
import { JSX, ReactNode } from 'react';

export interface HoverContext {
	open: boolean;
}

export interface HoverProps
	extends Pick<
		HoverCardRootProps,
		'defaultOpen' | 'open' | 'openDelay' | 'closeDelay' | 'disabled' | 'unmountOnExit' | 'lazyMount'
	> {
	positioning?: HoverCardRootProps['positioning'];
	trigger?: (context: HoverContext) => ReactNode;
	children?: ReactNode | ((context: HoverContext) => ReactNode);
	onOpenChange?: (open: boolean) => void;
}

const Hover = (props: HoverProps): JSX.Element => {
	const {
		defaultOpen,
		open,
		openDelay,
		closeDelay,
		disabled,
		unmountOnExit,
		lazyMount,
		positioning,
		trigger,
		children,
		onOpenChange
	} = props;

	const handleOpenChange: HoverCardRootProps['onOpenChange'] = (details) => {
		if (onOpenChange) {
			onOpenChange(details.open);
		}
	};

	return (
		<ArkHoverCard.Root
			defaultOpen={defaultOpen}
			open={open}
			openDelay={openDelay}
			closeDelay={closeDelay}
			disabled={disabled}
			unmountOnExit={unmountOnExit}
			lazyMount={lazyMount}
			positioning={positioning}
			onOpenChange={handleOpenChange}
		>
			<ArkHoverCard.Context>
				{(context) => {
					const args: HoverContext = {
						open: context.open
					};

					return (
						<>
							{trigger && <ArkHoverCard.Trigger asChild>{trigger(args)}</ArkHoverCard.Trigger>}
							<Portal>
								<ArkHoverCard.Positioner>
									<ArkHoverCard.Content>
										{typeof children === 'function' ? children(args) : children}
									</ArkHoverCard.Content>
								</ArkHoverCard.Positioner>
							</Portal>
						</>
					);
				}}
			</ArkHoverCard.Context>
		</ArkHoverCard.Root>
	);
};

export default Hover;
