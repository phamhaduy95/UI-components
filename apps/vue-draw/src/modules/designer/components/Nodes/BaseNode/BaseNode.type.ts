export enum NodeCategory {
	BasicShape = 'basic-shape',
	Group = 'group',
	FormField = 'form-field',
	Industrial = 'industrial'
}

export enum NodeType {
	Rectangle = 'rectangle',
	Circle = 'circle',
	Ellipse = 'ellipse',
	Triangle = 'triangle',
	Hexagon = 'hexagon',
	Star = 'star',
	Diamond = 'diamond',
	Rhombus = 'rhombus',
	Trapezoid = 'trapezoid',
	Parallelogram = 'parallelogram',
	Cross = 'cross',
	RightArrow = 'rightArrow',
	LeftArrow = 'leftArrow',
	UpArrow = 'upArrow',
	DownArrow = 'downArrow',
	Pentagon = 'pentagon',
	Heptagon = 'heptagon',
	Octagon = 'octagon',
	Nonagon = 'nonagon',
	Square = 'square',
	Text = 'text',
	TextField = 'textField',
	DatePicker = 'datePicker',
	Select = 'select',
	Slider = 'slider',
	Button = 'button',
	Spinner = 'spinner',
	Checkbox = 'checkbox',
	RadioGroup = 'radioGroup',
	Table = 'table',
	Group = 'group',
	Fan = 'fan',
	Pump = 'pump',
	Tank = 'tank',
	Valve = 'valve',
	Motor = 'motor',
	Gauge = 'gauge'
}

export interface TagData {
	id: string;
	label: string;
	value: string;
}

export interface BaseNodeData {
	category: NodeCategory;
	label?: string;
	tagIds?: string[];
	showTag?: boolean;
	rotation: number;
}
