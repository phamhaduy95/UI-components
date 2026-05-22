# Software Requirements Specification (Short)

**Project:** NextGen SCADA HMI Designer (MVP)  
**Scope:** A desktop-based, drag-and-drop design environment for industrial SCADA interfaces. (Run-time PLC binding deferred to later phases).

## 1. UI Layout

Pages include:

- Home
- Designer
- Settings

the page overow look should look modern, clean and user-friendly. you can use UI of miro It should apply design system in `@packages/vue-components`. The theme can be founded at `@packages/styles/src/themes/default.css`

### Main page layout:

- navigation sidbar on the left. The navigation should be collapsed by default and can be expanded by clicking on the navigation icon.
- content area
- top sidebar: contain title, app logo and user profile

### Home Page:

- Hero section: title, description, and Call to Action (CTA) buttons.
- Features section: 3 features of the app.
- Footer: copyright and links.

### Designer Page:

Designer consists of 3 main layout parts:

- Left Panel: Asset library containing draggable graphical objects.
- Center Canvas: Grid-aligned main workspace powered by Vue Flow.
- Top Toolbar: contain shortcut for controls such as grouping, bring-to-font, send-to-back, undo, redo, save, load, zoom in, zoom out, grid toggle.
- Right Panel: Properties panel for editing the properties of the selected object.

## 2. Functional Requirements

### 2.1 Workspace & Flow

- **Drag & Drop:** Users can drag items from the left sidebar and drop them onto the canvas using HTML5 Drag-and-Drop.
- **Initialization:** Dropped objects instantly render at exact canvas grid coordinates (handling zoom/pan offsets).

### 2.2 Graphical Objects

**Basic Shapes** (Static layouts):

- **Rectangle:** Configurable width, height, and colors.
- **Circle / Ellipse:** Radius and axis adjustments.

### 2.3 Object Manipulation

- **Reposition:** Click-and-drag or arrow-key micro-nudging.
- **Resize:** 8-point bounding box handles. `Shift` maintains aspect ratio.

- **Group / Ungroup:** Combine multiple objects into a single parent container to move/scale together.
- **Z-index:** Users should be able to reorder objects. "Bring to Front", "Send to Back".

## 3. Technology Stack & Constraints

- **Core Rendering Engine:** Built on **Vue Flow**. Custom SCADA components are registered as Vue Flow custom nodes. Handles panning, zooming, and absolute positioning.

- **Core UI library:** Use `@packages/vue-components` for the UI components.

- **State Management:** Powered by Pinia. Vue Flow's `nodes` and `edges` arrays must be stored using `shallowRef` to bypass deep proxy overhead and maintain performance.

- **State Updates:** Node data mutations must use Vue Flow's internal helpers (`updateNodeData`) or `triggerRef()` to trigger localized UI updates without redrawing the entire canvas.
- **Export:** Canvas state must serialize to JSON for saving/loading project configurations.
