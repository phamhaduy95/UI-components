import { Accordion as ArkAccordion, UseAccordionItemContext } from '@ark-ui/react/accordion';
import { ChevronDownIcon } from '@radix-ui/react-icons';
import classNames from 'classnames';
import { ComponentPropsWithRef } from 'react';
import '@packages/styles/components/Accordion.css';

export interface AccordionItemObject {
	// must be unique value
	value: string;
	title?: string;
	disabled?: boolean;
	CustomTitle?: (itemContext: UseAccordionItemContext) => React.ReactNode;
	content?: string;
	CustomContent?: (itemContext: UseAccordionItemContext) => React.ReactNode;
	'aria-label'?: string;
}

export interface AccordionProps
	extends Omit<ComponentPropsWithRef<'div'>, 'children' | 'defaultValue'> {
	items: AccordionItemObject[];
	// Whether multiple accordion items can be expanded at the same time.
	multiple?: boolean;
	// Whether the accordion items can be collapsed.
	collapsible?: boolean;
	disabled?: boolean;
	value?: string[];
	defaultValue?: string[];
	onValueChange?: (value: string[]) => void;
	'data-testid'?: string;
}

const Accordion = ({
	items,
	className,
	collapsible,
	multiple,
	disabled,
	value,
	defaultValue,
	onValueChange,
	'data-testid': dataTestid,
	...rest
}: AccordionProps) => {
	const handleValueChange: ArkAccordion.RootProps['onValueChange'] = (details) => {
		const { value } = details;
		if (onValueChange) {
			onValueChange(value);
		}
	};

	return (
		<ArkAccordion.Root
			className={classNames('Accordion', className)}
			disabled={disabled}
			collapsible={collapsible}
			multiple={multiple}
			value={value}
			defaultValue={defaultValue}
			onValueChange={handleValueChange}
			data-testid={dataTestid}
			{...rest}
		>
			{items.map(
				({
					value,
					title = '',
					disabled,
					CustomTitle,
					content = '',
					CustomContent,
					'aria-label': ariaLabel
				}) => {
					return (
						<ArkAccordion.Item
							className="Accordion_Item"
							disabled={disabled}
							key={value}
							value={value}
						>
							<ArkAccordion.ItemContext>
								{(context) => {
									const Title = CustomTitle ? CustomTitle(context) : title;
									const Content = CustomContent ? CustomContent(context) : content;
									return (
										<>
											<ArkAccordion.ItemTrigger
												className="Accordion_Trigger"
												aria-label={title ?? ariaLabel}
											>
												{Title}
												<ArkAccordion.ItemIndicator className="Accordion_ItemIndicator">
													<ChevronDownIcon />
												</ArkAccordion.ItemIndicator>
											</ArkAccordion.ItemTrigger>
											<ArkAccordion.ItemContent className="Accordion_Content">
												{Content}
											</ArkAccordion.ItemContent>
										</>
									);
								}}
							</ArkAccordion.ItemContext>
						</ArkAccordion.Item>
					);
				}
			)}
		</ArkAccordion.Root>
	);
};

export default Accordion;
