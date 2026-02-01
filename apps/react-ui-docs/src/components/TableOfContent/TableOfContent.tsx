import { useEffect, useRef } from 'react';

export type TableOfContentProps = {
	headings: { depth: number; slug: string; text: string }[];
};

const TRACKED_HEADINGS = ['h2', 'h3'];

const TableOfContent = ({ headings }: TableOfContentProps) => {
	const containerRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					const id = entry.target.getAttribute('id');
					const tocLink = container.querySelector(`a[href="#${id}"]`);
					if (entry.isIntersecting) {
						container.querySelectorAll('a').forEach((link) => link.removeAttribute('data-active'));
						tocLink?.setAttribute('data-active', 'true');
					}
				});
			},
			{ rootMargin: '-10% 0% -80% 0%' }
		);

		document.querySelectorAll(TRACKED_HEADINGS.join(', ')).forEach((section) => {
			observer.observe(section);
		});
		return () => {
			observer.disconnect();
		};
	}, []);

	const renderTocLinks = () => {
		return headings
			.filter((heading) => heading.depth >= 2)
			.map((heading) => {
				return (
					<li key={heading.slug} className={heading.depth === 3 ? 'pl-4' : ''}>
						<a
							href={`#${heading.slug}`}
							className="text-on-surface-variant hover:text-primary data-[active=true]:text-primary block text-sm leading-tight transition-colors data-[active=true]:font-medium"
						>
							{heading.text}
						</a>
					</li>
				);
			});
	};

	return (
		<aside
			ref={containerRef}
			className="top-(--header-height) w-(--toc-width) border-outline/30 sticky hidden h-dvh shrink-0 self-start overflow-y-auto border-l p-8 xl:block"
		>
			{headings.length > 0 && (
				<nav className="space-y-4">
					<h5 className="text-on-surface-variant/70 text-xs font-bold uppercase tracking-wider">
						On this page
					</h5>
					<ul className="space-y-3">{renderTocLinks()}</ul>
				</nav>
			)}
		</aside>
	);
};

export default TableOfContent;
