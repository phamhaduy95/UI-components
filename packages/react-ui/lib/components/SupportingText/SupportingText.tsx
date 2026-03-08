import classNames from 'classnames';

import { FieldStatus } from '@components/type';

import '@packages/styles/components/SupportingText.css';

export interface SupportingTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
	children: React.ReactNode;
	status?: FieldStatus;
	isDisplayed?: boolean;
	className?: string;
	show?: boolean;
}

const SupportingText = (props: SupportingTextProps): React.ReactNode => {
	const { children, className, status, show = true, ...rest } = props;
	if (show)
		return (
			<p {...rest} className={classNames(className, 'SupportingText')} data-status={status}>
				{children}
			</p>
		);
	return null;
};

export default SupportingText;
