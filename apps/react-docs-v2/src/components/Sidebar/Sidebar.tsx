import classNames from 'classnames';
import type { JSX } from 'react';

export type NavigationLink = {
	type: 'link';
	href: string;
	title: string;
	icon?: JSX.Element;
	disabled?: boolean;
	active?: boolean;
	className?: string;
};

export type NavigationGroup = {
	type: 'group';
	title: string;
	items: NavigationLink[];
	disabled?: boolean;
	className?: string;
};

export type SidebarProps = {
	className?: string;
	items: Array<NavigationLink | NavigationGroup>;
};

const Sidebar = ({ items = [], className }: SidebarProps) => {
	const renderLink = (props: NavigationLink) => {
		const { title, disabled, href, active } = props;

		return (
			<li key={href} className="w-full">
				<a
					className={classNames(
						'flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
						active
							? 'bg-primary-container text-on-primary-container'
							: 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface',
						disabled && 'pointer-events-none opacity-50'
					)}
					aria-disabled={disabled}
					data-active={active}
					href={href}
				>
					{title}
				</a>
			</li>
		);
	};

	const renderItems = () => {
		return items.map((item, index) => {
			if (item.type === 'group') {
				const { items, title } = item;
				return (
					<li key={index} className="mb-6">
						<h4 className="text-on-surface-variant/70 mb-2 px-3 text-xs font-semibold uppercase tracking-wider">
							{title}
						</h4>
						<ul className="space-y-1">{items.map((link) => renderLink(link))}</ul>
					</li>
				);
			}
			return renderLink(item);
		});
	};

	return (
		<aside
			className={classNames(
				'top-(--header-height) w-(--sidebar-width) border-outline/30 sticky hidden h-dvh shrink-0 self-start overflow-y-auto border-r lg:block',
				className
			)}
		>
			<nav className="overflow-y-auto px-4 py-6">
				<ul className="flex flex-col space-y-1">{renderItems()}</ul>
			</nav>
		</aside>
	);
};

export default Sidebar;
