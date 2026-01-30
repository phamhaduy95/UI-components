const Header = () => {
	return (
		<header className="glass border-outline/30 h-(--header-height) fixed top-0 z-50 w-full border-b">
			<div className="mx-auto flex h-full max-w-[1440px] items-center justify-between px-6">
				<a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
					<div className="bg-primary text-on-primary flex h-8 w-8 items-center justify-center rounded-lg font-bold">
						R
					</div>
					<span className="text-lg font-bold tracking-tight">React UI</span>
				</a>
				<nav className="hidden items-center gap-6 md:flex">
					<a
						href="/components/select"
						className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors"
					>
						Documentation
					</a>
					<a
						href="https://github.com"
						className="text-on-surface-variant hover:text-primary text-sm font-medium transition-colors"
					>
						GitHub
					</a>
				</nav>
			</div>
		</header>
	);
};

export default Header;
