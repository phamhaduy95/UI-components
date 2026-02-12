import classNames from 'classnames';
import { ScrollArea as ArkScrollArea } from '@ark-ui/react/scroll-area';
import './ScrollArea.css';
import { JSX } from 'react';

export interface ScrollAreaProps extends ArkScrollArea.RootProps {
	children?: React.ReactNode;
	maxHeight?: string;
	className?: string;
}

const ScrollArea = (props: ScrollAreaProps): JSX.Element => {
	const { children, maxHeight, className, ...rest } = props;

	return (
		<ArkScrollArea.Root className={classNames('ScrollArea', className)} {...rest}>
			<ArkScrollArea.Viewport className="ScrollArea_Viewport" style={{ maxHeight }}>
				<ArkScrollArea.Content className="ScrollArea_Content">{children}</ArkScrollArea.Content>
			</ArkScrollArea.Viewport>
			<ArkScrollArea.Scrollbar className="ScrollArea_Scrollbar" orientation="vertical">
				<ArkScrollArea.Thumb className="ScrollArea_Thumb" />
			</ArkScrollArea.Scrollbar>
			<ArkScrollArea.Scrollbar className="ScrollArea_Scrollbar" orientation="horizontal">
				<ArkScrollArea.Thumb className="ScrollArea_Thumb" />
			</ArkScrollArea.Scrollbar>
			<ArkScrollArea.Corner className="ScrollArea_Corner" />
		</ArkScrollArea.Root>
	);
};

export default ScrollArea;
