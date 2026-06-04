import { markRaw, type Component } from 'vue';

import { NodeCategory, NodeType } from '@/modules/designer/types/Node.type';
import {
	RectangleNode,
	CircleNode,
	EllipseNode,
	HexagonNode,
	StarNode,
	TriangleNode,
	GroupNode,
	RectanglePalette,
	CirclePalette,
	EllipsePalette,
	HexagonPalette,
	StarPalette,
	TrianglePalette,
	DiamondNode,
	DiamondPalette,
	RhombusNode,
	RhombusPalette,
	TextNode,
	TextPalette,
	TextFieldNode,
	TextFieldPalette,
	DatePickerNode,
	DatePickerPalette,
	FanNode,
	FanPalette,
	PumpNode,
	PumpPalette,
	TankNode,
	TankPalette,
	ValveNode,
	ValvePalette,
	MotorNode,
	MotorPalette,
	GaugeNode,
	GaugePalette,
	TableNode,
	TablePalette
} from '@/modules/designer/components';

type NodeTypeConfig = {
	id: string;
	label: string;
	paletteComponent?: Component;
	nodeComponent: Component;
	category: NodeCategory;
	type: string;
};

const BasicShapeTypes: Record<string, NodeTypeConfig> = {
	[NodeType.Rectangle]: {
		id: NodeType.Rectangle,
		category: NodeCategory.BasicShape,
		type: NodeType.Rectangle,
		paletteComponent: markRaw(RectanglePalette),
		nodeComponent: markRaw(RectangleNode),
		label: 'Rectangle'
	},
	[NodeType.Circle]: {
		id: NodeType.Circle,
		category: NodeCategory.BasicShape,
		type: NodeType.Circle,
		paletteComponent: markRaw(CirclePalette),
		nodeComponent: markRaw(CircleNode),
		label: 'Circle'
	},
	[NodeType.Ellipse]: {
		id: NodeType.Ellipse,
		category: NodeCategory.BasicShape,
		type: NodeType.Ellipse,
		paletteComponent: markRaw(EllipsePalette),
		nodeComponent: markRaw(EllipseNode),
		label: 'Ellipse'
	},
	[NodeType.Triangle]: {
		id: NodeType.Triangle,
		category: NodeCategory.BasicShape,
		type: NodeType.Triangle,
		paletteComponent: markRaw(TrianglePalette),
		nodeComponent: markRaw(TriangleNode),
		label: 'Triangle'
	},
	[NodeType.Hexagon]: {
		id: NodeType.Hexagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Hexagon,
		paletteComponent: markRaw(HexagonPalette),
		nodeComponent: markRaw(HexagonNode),
		label: 'Hexagon'
	},
	[NodeType.Star]: {
		id: NodeType.Star,
		category: NodeCategory.BasicShape,
		type: NodeType.Star,
		paletteComponent: markRaw(StarPalette),
		nodeComponent: markRaw(StarNode),
		label: 'Star'
	},
	[NodeType.Diamond]: {
		id: NodeType.Diamond,
		category: NodeCategory.BasicShape,
		type: NodeType.Diamond,
		paletteComponent: markRaw(DiamondPalette),
		nodeComponent: markRaw(DiamondNode),
		label: 'Diamond'
	},
	[NodeType.Rhombus]: {
		id: NodeType.Rhombus,
		category: NodeCategory.BasicShape,
		type: NodeType.Rhombus,
		paletteComponent: markRaw(RhombusPalette),
		nodeComponent: markRaw(RhombusNode),
		label: 'Rhombus'
	},
	[NodeType.Text]: {
		id: NodeType.Text,
		category: NodeCategory.FormField,
		type: NodeType.Text,
		paletteComponent: markRaw(TextPalette),
		nodeComponent: markRaw(TextNode),
		label: 'Text'
	},
	[NodeType.TextField]: {
		id: NodeType.TextField,
		category: NodeCategory.FormField,
		type: NodeType.TextField,
		paletteComponent: markRaw(TextFieldPalette),
		nodeComponent: markRaw(TextFieldNode),
		label: 'TextField'
	},
	[NodeType.DatePicker]: {
		id: NodeType.DatePicker,
		category: NodeCategory.FormField,
		type: NodeType.DatePicker,
		paletteComponent: markRaw(DatePickerPalette),
		nodeComponent: markRaw(DatePickerNode),
		label: 'Date Picker'
	},
	[NodeType.Table]: {
		id: NodeType.Table,
		category: NodeCategory.FormField,
		type: NodeType.Table,
		paletteComponent: markRaw(TablePalette),
		nodeComponent: markRaw(TableNode),
		label: 'Table'
	}
};

export const GroupNodeTypes: Record<string, NodeTypeConfig> = {
	[NodeType.Group]: {
		id: NodeType.Group,
		category: NodeCategory.Group,
		type: NodeType.Group,
		nodeComponent: markRaw(GroupNode),
		label: 'Group'
	}
};

export const IndustrialEquipmentTypes: Record<string, NodeTypeConfig> = {
	[NodeType.Fan]: {
		id: NodeType.Fan,
		category: NodeCategory.Industrial,
		type: NodeType.Fan,
		paletteComponent: markRaw(FanPalette),
		nodeComponent: markRaw(FanNode),
		label: 'Fan'
	},
	[NodeType.Pump]: {
		id: NodeType.Pump,
		category: NodeCategory.Industrial,
		type: NodeType.Pump,
		paletteComponent: markRaw(PumpPalette),
		nodeComponent: markRaw(PumpNode),
		label: 'Pump'
	},
	[NodeType.Tank]: {
		id: NodeType.Tank,
		category: NodeCategory.Industrial,
		type: NodeType.Tank,
		paletteComponent: markRaw(TankPalette),
		nodeComponent: markRaw(TankNode),
		label: 'Tank'
	},
	[NodeType.Valve]: {
		id: NodeType.Valve,
		category: NodeCategory.Industrial,
		type: NodeType.Valve,
		paletteComponent: markRaw(ValvePalette),
		nodeComponent: markRaw(ValveNode),
		label: 'Valve'
	},
	[NodeType.Motor]: {
		id: NodeType.Motor,
		category: NodeCategory.Industrial,
		type: NodeType.Motor,
		paletteComponent: markRaw(MotorPalette),
		nodeComponent: markRaw(MotorNode),
		label: 'Motor'
	},
	[NodeType.Gauge]: {
		id: NodeType.Gauge,
		category: NodeCategory.Industrial,
		type: NodeType.Gauge,
		paletteComponent: markRaw(GaugePalette),
		nodeComponent: markRaw(GaugeNode),
		label: 'Gauge'
	}
};

export const nodeConfigMap: Record<string, NodeTypeConfig> = {
	...BasicShapeTypes,
	...IndustrialEquipmentTypes,
	...GroupNodeTypes
};
