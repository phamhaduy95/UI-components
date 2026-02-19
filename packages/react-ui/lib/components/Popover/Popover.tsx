import { Popover as ArkPopover } from '@ark-ui/react/popover';
import { Portal } from '@ark-ui/react/portal';

interface PopoverContext {
	open: boolean;
	setOpen: (open: boolean) => void;
}

type Positioning = Required<ArkPopover.RootProps>['positioning'];

export interface PopoverProps
	extends Pick<
		ArkPopover.RootProps,
		| 'autoFocus'
		| 'open'
		| 'defaultOpen'
		| 'closeOnInteractOutside'
		| 'onExitComplete'
		| 'unmountOnExit'
		| 'closeOnEscape'
		| 'lazyMount'
	> {
	children: (context: PopoverContext) => React.ReactNode;
	// Trigger component should be a interactive element such as button, anchor, etc
	Trigger?: (context: PopoverContext) => React.ReactNode;
	onOpenChange?: (open: boolean) => void;
	positioning?: Pick<
		Positioning,
		| 'sameWidth'
		| 'placement'
		| 'fitViewport'
		| 'boundary'
		| 'offset'
		| 'getAnchorElement'
		| 'getAnchorRect'
	>;
}

const Popover = ({
	Trigger,
	children,
	positioning,
	autoFocus,
	open,
	defaultOpen,
	closeOnInteractOutside,
	closeOnEscape,
	unmountOnExit,
	lazyMount,
	onExitComplete,
	onOpenChange
}: PopoverProps) => {
	const handleOpenChange: ArkPopover.RootProps['onOpenChange'] = (details) => {
		const { open } = details;
		if (onOpenChange) {
			onOpenChange(open);
		}
	};

	return (
		<ArkPopover.Root
			autoFocus={autoFocus}
			open={open}
			defaultOpen={defaultOpen}
			closeOnEscape={closeOnEscape}
			unmountOnExit={unmountOnExit}
			closeOnInteractOutside={closeOnInteractOutside}
			lazyMount={lazyMount}
			onOpenChange={handleOpenChange}
			onExitComplete={onExitComplete}
			positioning={positioning}
		>
			<ArkPopover.Context>
				{(context) => {
					const args = {
						open: context.open,
						setOpen: context.setOpen
					};
					return (
						<>
							{Trigger ? <ArkPopover.Trigger asChild>{Trigger(args)}</ArkPopover.Trigger> : null}
							<Portal>
								<ArkPopover.Positioner>
									<ArkPopover.Content>{children(args)}</ArkPopover.Content>
								</ArkPopover.Positioner>
							</Portal>
						</>
					);
				}}
			</ArkPopover.Context>
		</ArkPopover.Root>
	);
};

export default Popover;
