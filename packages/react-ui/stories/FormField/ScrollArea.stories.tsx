import type { Meta, StoryObj } from '@storybook/react-vite';
import ScrollArea from '@components/ScrollArea';
import React from 'react';

const meta: Meta<typeof ScrollArea> = {
	title: 'Components/FormField/ScrollArea',
	component: ScrollArea,
	tags: ['autodocs'],
	parameters: {
		layout: 'padded'
	},
	argTypes: {
		maxHeight: {
			control: 'text',
			description: 'The maximum height of the scroll area viewport'
		}
	}
};

export default meta;

type Story = StoryObj<typeof meta>;

const DummyContent = ({ count = 20 }: { count?: number }) => (
	<div style={{ padding: '15px 20px' }}>
		<h4
			style={{
				marginBottom: '15px',
				fontSize: '15px',
				fontWeight: '600',
				color: 'var(--color-on-surface)'
			}}
		>
			Tags
		</h4>
		{Array.from({ length: count }).map((_, i) => (
			<div
				key={i}
				style={{
					padding: '10px 0',
					borderTop: '1px solid var(--color-outline-variant)',
					fontSize: '13px',
					color: 'var(--color-on-surface-variant)'
				}}
			>
				v1.2.0-beta.{count - i}
			</div>
		))}
	</div>
);

/**
 * Basic vertical scroll area with a fixed max height.
 */
export const Vertical: Story = {
	args: {
		maxHeight: '225px',
		children: <DummyContent />
	},
	render: (args) => (
		<div
			style={{
				width: '200px',
				borderRadius: '4px',
				overflow: 'hidden',
				border: '1px solid var(--color-outline-variant)'
			}}
		>
			<ScrollArea {...args} />
		</div>
	)
};

/**
 * Horizontal scroll area.
 */
export const Horizontal: Story = {
	args: {
		children: (
			<div style={{ display: 'flex', gap: '20px', padding: '15px' }}>
				{Array.from({ length: 10 }).map((_, i) => (
					<div
						key={i}
						style={{
							minWidth: '150px',
							height: '100px',
							backgroundColor: 'var(--color-surface-container-high)',
							borderRadius: '8px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							border: '1px solid var(--color-outline-variant)'
						}}
					>
						Card {i + 1}
					</div>
				))}
			</div>
		)
	},
	render: (args) => (
		<div
			style={{
				width: '400px',
				borderRadius: '4px',
				overflow: 'hidden',
				border: '1px solid var(--color-outline-variant)'
			}}
		>
			<ScrollArea {...args} />
		</div>
	)
};

/**
 * Both vertical and horizontal scroll area.
 */
export const Both: Story = {
	args: {
		maxHeight: '300px',
		children: (
			<div style={{ width: '800px', padding: '20px' }}>
				<h4
					style={{
						marginBottom: '15px',
						fontSize: '18px',
						fontWeight: '600',
						color: 'var(--color-on-surface)'
					}}
				>
					Large Table Simulation
				</h4>
				<table
					style={{
						width: '100%',
						borderCollapse: 'collapse',
						color: 'var(--color-on-surface-variant)'
					}}
				>
					<thead>
						<tr>
							{Array.from({ length: 10 }).map((_, i) => (
								<th
									key={i}
									style={{
										textAlign: 'left',
										padding: '12px',
										borderBottom: '2px solid var(--color-outline-variant)'
									}}
								>
									Column {i + 1}
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{Array.from({ length: 30 }).map((_, rowIndex) => (
							<tr key={rowIndex}>
								{Array.from({ length: 10 }).map((_, colIndex) => (
									<td
										key={colIndex}
										style={{
											padding: '12px',
											borderBottom: '1px solid var(--color-outline-variant)'
										}}
									>
										Cell {rowIndex + 1}-{colIndex + 1}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		)
	},
	render: (args) => (
		<div
			style={{
				width: '500px',
				borderRadius: '4px',
				overflow: 'hidden',
				border: '1px solid var(--color-outline-variant)'
			}}
		>
			<ScrollArea {...args} />
		</div>
	)
};
