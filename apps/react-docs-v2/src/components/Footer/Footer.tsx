const Footer = () => {
	return (
		<footer className="border-outline/30 bg-surface/50 border-t py-16">
			<div className="mx-auto max-w-[1440px] px-6">
				<div className="grid grid-cols-1 gap-12 md:grid-cols-4">
					<div className="md:col-span-2">
						<div className="mb-4 flex items-center gap-2">
							<div className="bg-primary text-on-primary flex h-8 w-8 items-center justify-center rounded-lg font-bold">
								R
							</div>
							<span className="text-lg font-bold tracking-tight">React UI</span>
						</div>
						<p className="text-on-surface-variant max-w-md text-sm leading-relaxed">
							A professional React component library designed for speed, accessibility, and modern
							aesthetics. Build beautiful applications faster.
						</p>
					</div>
					<div>
						<h3 className="mb-4 font-semibold">Documentation</h3>
						<ul className="text-on-surface-variant space-y-2 text-sm">
							<li>
								<a href="/components/select" className="hover:text-primary transition-colors">
									Getting Started
								</a>
							</li>
							<li>
								<a href="/components/select" className="hover:text-primary transition-colors">
									Components
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Theming
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Examples
								</a>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="mb-4 font-semibold">Community</h3>
						<ul className="text-on-surface-variant space-y-2 text-sm">
							<li>
								<a href="https://github.com" className="hover:text-primary transition-colors">
									GitHub
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Discord
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Twitter
								</a>
							</li>
							<li>
								<a href="#" className="hover:text-primary transition-colors">
									Discussions
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-outline/30 text-on-surface-variant mt-12 border-t pt-8 text-sm">
					<p>© 2026 React UI Library. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
