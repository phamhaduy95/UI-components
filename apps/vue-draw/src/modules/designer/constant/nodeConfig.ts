import { RectangleNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/RectangleNode';
import { SquareNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/SquareNode';
import { CircleNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/CircleNode';
import { EllipseNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/EllipseNode';
import { TriangleNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/TriangleNode';
import { HexagonNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/HexagonNode';
import { StarNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/StarNode';
import { DiamondNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/DiamondNode';
import { RhombusNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/RhombusNode';
import { TrapezoidNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/TrapezoidNode';
import { ParallelogramNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/ParallelogramNode';
import { LineNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/LineNode';
import { PolylineNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/PolylineNode';
import { CurveNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/CurveNode';
import { ArcNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/ArcNode';
import { RightArrowNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/RightArrowNode';
import { LeftArrowNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/LeftArrowNode';
import { UpArrowNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/UpArrowNode';
import { DownArrowNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/DownArrowNode';
import { PentagonNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/PentagonNode';
import { HeptagonNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/HeptagonNode';
import { OctagonNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/OctagonNode';
import { NonagonNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/NonagonNode';
import { CrossNodeConfig } from '@/modules/designer/components/Nodes/BasicShapeNodes/CrossNode';
import { TableNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/TableNode';
import { BitmapNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/BitmapNode';
import { LineChartNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/LineChartNode';
import { SparklineNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/SparklineNode';
import { ScatterPlotNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/ScatterPlotNode';
import { IframeNodeConfig } from '@/modules/designer/components/Nodes/DataDisplayNodes/IframeNode';
import { TextNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/TextNode';
import { TextFieldNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/TextFieldNode';
import { TextAreaNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/TextAreaNode';
import { DatePickerNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/DatePickerNode';
import { SelectNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/SelectNode';
import { SliderNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/SliderNode';
import { ButtonNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/ButtonNode';
import { SpinnerNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/SpinnerNode';
import { CheckboxNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/CheckboxNode';
import { RadioGroupNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/RadioGroupNode';
import { ProgressBarNodeConfig } from '@/modules/designer/components/Nodes/FormFieldNodes/ProgressBarNode';
import { FanNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/FanNode';
import { PumpNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/PumpNode';
import { TankNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/TankNode';
import { ValveNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/ValveNode';
import { MotorNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/MotorNode';
import { GaugeNodeConfig } from '@/modules/designer/components/Nodes/IndustrialNodes/GaugeNode';
import { GroupNodeConfig } from '@/modules/designer/components/Nodes/GroupNode';
import type { NodeConfiguration } from '@/modules/designer/types/Node.type';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const nodeConfigMap: Record<string, NodeConfiguration<any>> = {
	...RectangleNodeConfig,
	...SquareNodeConfig,
	...CircleNodeConfig,
	...EllipseNodeConfig,
	...TriangleNodeConfig,
	...HexagonNodeConfig,
	...StarNodeConfig,
	...DiamondNodeConfig,
	...RhombusNodeConfig,
	...TrapezoidNodeConfig,
	...ParallelogramNodeConfig,
	...LineNodeConfig,
	...PolylineNodeConfig,
	...CurveNodeConfig,
	...ArcNodeConfig,
	...RightArrowNodeConfig,
	...LeftArrowNodeConfig,
	...UpArrowNodeConfig,
	...DownArrowNodeConfig,
	...PentagonNodeConfig,
	...HeptagonNodeConfig,
	...OctagonNodeConfig,
	...NonagonNodeConfig,
	...CrossNodeConfig,
	...TableNodeConfig,
	...BitmapNodeConfig,
	...LineChartNodeConfig,
	...SparklineNodeConfig,
	...ScatterPlotNodeConfig,
	...IframeNodeConfig,
	...TextNodeConfig,
	...TextFieldNodeConfig,
	...TextAreaNodeConfig,
	...DatePickerNodeConfig,
	...SelectNodeConfig,
	...SliderNodeConfig,
	...ButtonNodeConfig,
	...SpinnerNodeConfig,
	...CheckboxNodeConfig,
	...RadioGroupNodeConfig,
	...ProgressBarNodeConfig,
	...FanNodeConfig,
	...PumpNodeConfig,
	...TankNodeConfig,
	...ValveNodeConfig,
	...MotorNodeConfig,
	...GaugeNodeConfig,
	...GroupNodeConfig
};
