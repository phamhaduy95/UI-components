import { ScrollArea } from '@packages/react-components';

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`);

export const BasicScrollArea = () => {
	return (
		<ScrollArea className="h-72 w-48 rounded-md border p-4">
			<div className="p-4">
				<h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
				{tags.map((tag) => (
					<>
						<div key={tag} className="text-sm">
							{tag}
						</div>
						<div className="my-2 h-px bg-gray-200" />
					</>
				))}
			</div>
		</ScrollArea>
	);
};

export const HorizontalScrollArea = () => {
	const works = [
		{
			artist: 'Ornella Binni',
			art: 'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=300&q=80'
		},
		{
			artist: 'Tom Byrom',
			art: 'https://images.unsplash.com/photo-1548516173-3db5a08cc66d?auto=format&fit=crop&w=300&q=80'
		},
		{
			artist: 'Vladimir Malyavko',
			art: 'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80'
		}
	];

	return (
		<ScrollArea className="w-96 whitespace-nowrap rounded-md border p-4">
			<div className="flex w-max space-x-4 p-4">
				{works.map((artwork) => (
					<figure key={artwork.artist} className="shrink-0">
						<div className="overflow-hidden rounded-md">
							<img
								src={artwork.art}
								alt={`Photo by ${artwork.artist}`}
								className="aspect-3/4 h-64 w-fit object-cover"
								width={300}
								height={400}
							/>
						</div>
						<figcaption className="text-muted-foreground pt-2 text-xs">
							Photo by <span className="text-foreground font-semibold">{artwork.artist}</span>
						</figcaption>
					</figure>
				))}
			</div>
		</ScrollArea>
	);
};
