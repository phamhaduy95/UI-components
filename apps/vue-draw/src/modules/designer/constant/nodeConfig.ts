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
	TrapezoidNode,
	TrapezoidPalette,
	ParallelogramNode,
	ParallelogramPalette,
	CrossNode,
	CrossPalette,
	RightArrowNode,
	RightArrowPalette,
	LeftArrowNode,
	LeftArrowPalette,
	UpArrowNode,
	UpArrowPalette,
	DownArrowNode,
	DownArrowPalette,
	PentagonNode,
	PentagonPalette,
	HeptagonNode,
	HeptagonPalette,
	OctagonNode,
	OctagonPalette,
	NonagonNode,
	NonagonPalette,
	SquareNode,
	SquarePalette,
	LineNode,
	LinePalette,
	PolylineNode,
	PolylinePalette,
	CurveNode,
	CurvePalette,
	ArcNode,
	ArcPalette,
	TextNode,
	TextPalette,
	TextFieldNode,
	TextFieldPalette,
	TextAreaNode,
	TextAreaPalette,
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
	TablePalette,
	SelectNode,
	SelectPalette,
	SliderNode,
	SliderPalette,
	ButtonNode,
	ButtonPalette,
	SpinnerNode,
	SpinnerPalette,
	CheckboxNode,
	CheckboxPalette,
	RadioGroupNode,
	RadioGroupPalette,
	ProgressBarNode,
	ProgressBarPalette,
	BitmapNode,
	BitmapPalette,
	LineChartNode,
	LineChartPalette,
	SparklineNode,
	SparklinePalette,
	ScatterPlotNode,
	ScatterPlotPalette,
	IframeNode,
	IframePalette,
	RhombusNode,
	RhombusPalette
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
	[NodeType.Square]: {
		id: NodeType.Square,
		category: NodeCategory.BasicShape,
		type: NodeType.Square,
		paletteComponent: markRaw(SquarePalette),
		nodeComponent: markRaw(SquareNode),
		label: 'Square'
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

	[NodeType.Trapezoid]: {
		id: NodeType.Trapezoid,
		category: NodeCategory.BasicShape,
		type: NodeType.Trapezoid,
		paletteComponent: markRaw(TrapezoidPalette),
		nodeComponent: markRaw(TrapezoidNode),
		label: 'Trapezoid'
	},
	[NodeType.Parallelogram]: {
		id: NodeType.Parallelogram,
		category: NodeCategory.BasicShape,
		type: NodeType.Parallelogram,
		paletteComponent: markRaw(ParallelogramPalette),
		nodeComponent: markRaw(ParallelogramNode),
		label: 'Parallelogram'
	},
	[NodeType.Cross]: {
		id: NodeType.Cross,
		category: NodeCategory.BasicShape,
		type: NodeType.Cross,
		paletteComponent: markRaw(CrossPalette),
		nodeComponent: markRaw(CrossNode),
		label: 'Cross'
	},
	[NodeType.Rhombus]: {
		id: NodeType.Rhombus,
		category: NodeCategory.BasicShape,
		type: NodeType.Rhombus,
		paletteComponent: markRaw(RhombusPalette),
		nodeComponent: markRaw(RhombusNode),
		label: 'Rhombus'
	},
	[NodeType.Line]: {
		id: NodeType.Line,
		category: NodeCategory.BasicShape,
		type: NodeType.Line,
		paletteComponent: markRaw(LinePalette),
		nodeComponent: markRaw(LineNode),
		label: 'Line'
	},
	[NodeType.Polyline]: {
		id: NodeType.Polyline,
		category: NodeCategory.BasicShape,
		type: NodeType.Polyline,
		paletteComponent: markRaw(PolylinePalette),
		nodeComponent: markRaw(PolylineNode),
		label: 'Polyline'
	},
	[NodeType.Curve]: {
		id: NodeType.Curve,
		category: NodeCategory.BasicShape,
		type: NodeType.Curve,
		paletteComponent: markRaw(CurvePalette),
		nodeComponent: markRaw(CurveNode),
		label: 'Curve'
	},
	[NodeType.Arc]: {
		id: NodeType.Arc,
		category: NodeCategory.BasicShape,
		type: NodeType.Arc,
		paletteComponent: markRaw(ArcPalette),
		nodeComponent: markRaw(ArcNode),
		label: 'Arc'
	},
	[NodeType.RightArrow]: {
		id: NodeType.RightArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.RightArrow,
		paletteComponent: markRaw(RightArrowPalette),
		nodeComponent: markRaw(RightArrowNode),
		label: 'Right Arrow'
	},
	[NodeType.LeftArrow]: {
		id: NodeType.LeftArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.LeftArrow,
		paletteComponent: markRaw(LeftArrowPalette),
		nodeComponent: markRaw(LeftArrowNode),
		label: 'Left Arrow'
	},
	[NodeType.UpArrow]: {
		id: NodeType.UpArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.UpArrow,
		paletteComponent: markRaw(UpArrowPalette),
		nodeComponent: markRaw(UpArrowNode),
		label: 'Up Arrow'
	},
	[NodeType.DownArrow]: {
		id: NodeType.DownArrow,
		category: NodeCategory.BasicShape,
		type: NodeType.DownArrow,
		paletteComponent: markRaw(DownArrowPalette),
		nodeComponent: markRaw(DownArrowNode),
		label: 'Down Arrow'
	},
	[NodeType.Pentagon]: {
		id: NodeType.Pentagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Pentagon,
		paletteComponent: markRaw(PentagonPalette),
		nodeComponent: markRaw(PentagonNode),
		label: 'Pentagon'
	},
	[NodeType.Heptagon]: {
		id: NodeType.Heptagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Heptagon,
		paletteComponent: markRaw(HeptagonPalette),
		nodeComponent: markRaw(HeptagonNode),
		label: 'Heptagon'
	},
	[NodeType.Octagon]: {
		id: NodeType.Octagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Octagon,
		paletteComponent: markRaw(OctagonPalette),
		nodeComponent: markRaw(OctagonNode),
		label: 'Octagon'
	},
	[NodeType.Nonagon]: {
		id: NodeType.Nonagon,
		category: NodeCategory.BasicShape,
		type: NodeType.Nonagon,
		paletteComponent: markRaw(NonagonPalette),
		nodeComponent: markRaw(NonagonNode),
		label: 'Nonagon'
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
		label: 'Text Field'
	},
	[NodeType.TextArea]: {
		id: NodeType.TextArea,
		category: NodeCategory.FormField,
		type: NodeType.TextArea,
		paletteComponent: markRaw(TextAreaPalette),
		nodeComponent: markRaw(TextAreaNode),
		label: 'Text Area'
	},
	[NodeType.DatePicker]: {
		id: NodeType.DatePicker,
		category: NodeCategory.FormField,
		type: NodeType.DatePicker,
		paletteComponent: markRaw(DatePickerPalette),
		nodeComponent: markRaw(DatePickerNode),
		label: 'Date Picker'
	},
	[NodeType.Select]: {
		id: NodeType.Select,
		category: NodeCategory.FormField,
		type: NodeType.Select,
		paletteComponent: markRaw(SelectPalette),
		nodeComponent: markRaw(SelectNode),
		label: 'Select'
	},
	[NodeType.Slider]: {
		id: NodeType.Slider,
		category: NodeCategory.FormField,
		type: NodeType.Slider,
		paletteComponent: markRaw(SliderPalette),
		nodeComponent: markRaw(SliderNode),
		label: 'Slider'
	},
	[NodeType.Button]: {
		id: NodeType.Button,
		category: NodeCategory.FormField,
		type: NodeType.Button,
		paletteComponent: markRaw(ButtonPalette),
		nodeComponent: markRaw(ButtonNode),
		label: 'Button'
	},
	[NodeType.Spinner]: {
		id: NodeType.Spinner,
		category: NodeCategory.FormField,
		type: NodeType.Spinner,
		paletteComponent: markRaw(SpinnerPalette),
		nodeComponent: markRaw(SpinnerNode),
		label: 'Spinner'
	},
	[NodeType.Checkbox]: {
		id: NodeType.Checkbox,
		category: NodeCategory.FormField,
		type: NodeType.Checkbox,
		paletteComponent: markRaw(CheckboxPalette),
		nodeComponent: markRaw(CheckboxNode),
		label: 'Checkbox'
	},
	[NodeType.RadioGroup]: {
		id: NodeType.RadioGroup,
		category: NodeCategory.FormField,
		type: NodeType.RadioGroup,
		paletteComponent: markRaw(RadioGroupPalette),
		nodeComponent: markRaw(RadioGroupNode),
		label: 'Radio Group'
	},
	[NodeType.ProgressBar]: {
		id: NodeType.ProgressBar,
		category: NodeCategory.FormField,
		type: NodeType.ProgressBar,
		paletteComponent: markRaw(ProgressBarPalette),
		nodeComponent: markRaw(ProgressBarNode),
		label: 'Progress Bar'
	}
};

export const DataDisplayTypes: Record<string, NodeTypeConfig> = {
	[NodeType.Table]: {
		id: NodeType.Table,
		category: NodeCategory.DataDisplay,
		type: NodeType.Table,
		paletteComponent: markRaw(TablePalette),
		nodeComponent: markRaw(TableNode),
		label: 'Table'
	},
	[NodeType.Bitmap]: {
		id: NodeType.Bitmap,
		category: NodeCategory.DataDisplay,
		type: NodeType.Bitmap,
		paletteComponent: markRaw(BitmapPalette),
		nodeComponent: markRaw(BitmapNode),
		label: 'Bitmap'
	},
	[NodeType.LineChart]: {
		id: NodeType.LineChart,
		category: NodeCategory.DataDisplay,
		type: NodeType.LineChart,
		paletteComponent: markRaw(LineChartPalette),
		nodeComponent: markRaw(LineChartNode),
		label: 'Line Chart'
	},
	[NodeType.Sparkline]: {
		id: NodeType.Sparkline,
		category: NodeCategory.DataDisplay,
		type: NodeType.Sparkline,
		paletteComponent: markRaw(SparklinePalette),
		nodeComponent: markRaw(SparklineNode),
		label: 'Sparkline'
	},
	[NodeType.ScatterPlot]: {
		id: NodeType.ScatterPlot,
		category: NodeCategory.DataDisplay,
		type: NodeType.ScatterPlot,
		paletteComponent: markRaw(ScatterPlotPalette),
		nodeComponent: markRaw(ScatterPlotNode),
		label: 'Scatter Plot'
	},
	[NodeType.Iframe]: {
		id: NodeType.Iframe,
		category: NodeCategory.DataDisplay,
		type: NodeType.Iframe,
		paletteComponent: markRaw(IframePalette),
		nodeComponent: markRaw(IframeNode),
		label: 'Iframe'
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
	...DataDisplayTypes,
	...GroupNodeTypes
};
