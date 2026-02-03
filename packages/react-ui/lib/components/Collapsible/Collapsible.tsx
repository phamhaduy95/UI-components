import classNames from 'classnames';
import { Collapsible as ArkCollapsible } from '@ark-ui/react/collapsible';
import { JSX, useState } from 'react';
import './Collapsible.css';

export interface CollapsibleProps {
	isOpen?: boolean;
	defaultOpen?: boolean;
	disabled?: boolean;
	className?: string;
	onOpenChange?: (isOpen: boolean) => void;
	children?: React.ReactNode;
	Trigger: (props: { open: boolean; className?: string }) => JSX.Element;
	overrideTrigger?: boolean;
	overrideContent?: boolean;
}

const Collapsible = (props: CollapsibleProps) => {
	const {
		defaultOpen = false,
		isOpen,
		onOpenChange,
		className,
		disabled,
		Trigger,
		children,
		overrideTrigger,
		overrideContent
	} = props;
	const [internalOpen, setInternalOpen] = useState(defaultOpen);

	const open = isOpen ?? internalOpen;

	const handleOpenChange: ArkCollapsible.RootProps['onOpenChange'] = (details) => {
		const isOpen = details.open;
		if (onOpenChange) onOpenChange(isOpen);
		setInternalOpen(isOpen);
	};

	return (
		<ArkCollapsible.Root
			className={classNames('Collapsible_Root', className)}
			open={open}
			onOpenChange={handleOpenChange}
			disabled={disabled}
		>
			<ArkCollapsible.Trigger
				className="Collapsible_Trigger"
				asChild={overrideTrigger}
			>
				{Trigger({ open })}
			</ArkCollapsible.Trigger>
			<ArkCollapsible.Content
				className="Collapsible_Content"
				asChild={overrideContent}
			>
				{children}
			</ArkCollapsible.Content>
		</ArkCollapsible.Root>
	);
};

export default Collapsible;
