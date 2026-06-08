# Node Catalog

This document provides a comprehensive list of all nodes available in the `vue-draw` designer application, categorized by their type and purpose.

## All Nodes

**Note:** By default, every node shares the same initial `stroke-width` (1px) and `stroke-color` (#0d0d0d) settings to ensure a unified design aesthetic across the canvas.

| Node Type         | Category   | Description                                      | Default Sizes                                              | Rendered Palette Size                                     |
| :---------------- | :--------- | :----------------------------------------------- | :--------------------------------------------------------- | :-------------------------------------------------------- |
| **Rectangle**     | BasicShape | A standard rectangle shape block.                | width: 100px<br>height: 60px<br>edges: 100px, 60px         | width: 30px<br>height: 18.2px<br>edges: 30px, 18.2px      |
| **Square**        | BasicShape | A perfect square block.                          | width: 100px<br>height: 100px<br>edge: 100px               | width: 30px<br>height: 30px<br>edge: 30px                 |
| **Circle**        | BasicShape | A perfectly round circular block.                | width: 100px<br>height: 100px<br>r: 50px                   | width: 30px<br>height: 30px<br>r: 15px                    |
| **Ellipse**       | BasicShape | An oval/ellipse block.                           | width: 100px<br>height: 50px<br>rx: 50px, ry: 25px         | width: 30px<br>height: 15.3px<br>rx: 15px, ry: 7.6px      |
| **Triangle**      | BasicShape | A three-sided polygon pointing upwards.          | width: 100px<br>height: 100px<br>base: 100px, edge ≈ 112px | width: 30px<br>height: 30px<br>base: 30px, edge ≈ 33.6px  |
| **Hexagon**       | BasicShape | A six-sided regular polygon.                     | width: 100px<br>height: 100px<br>edge ≈ 56px               | width: 30px<br>height: 30px<br>edge ≈ 16.8px              |
| **Star**          | BasicShape | A 5-point star shape.                            | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Diamond**       | BasicShape | A rhombus/diamond shape block.                   | width: 100px<br>height: 100px<br>edge ≈ 71px               | width: 30px<br>height: 30px<br>edge ≈ 21.3px              |
| **Trapezoid**     | BasicShape | A quadrilateral with one pair of parallel sides. | width: 100px<br>height: 100px<br>top: 50px, base: 100px    | width: 30px<br>height: 30px<br>top: 15px, base: 30px      |
| **Parallelogram** | BasicShape | A slanted rectangular block.                     | width: 100px<br>height: 50px<br>edge: 100px, slant ≈ 56px  | width: 30px<br>height: 15px<br>edge: 30px, slant ≈ 16.8px |
| **Cross**         | BasicShape | A plus-sign / cross block.                       | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Right Arrow**   | BasicShape | A block arrow pointing right.                    | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Left Arrow**    | BasicShape | A block arrow pointing left.                     | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Up Arrow**      | BasicShape | A block arrow pointing upwards.                  | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Down Arrow**    | BasicShape | A block arrow pointing downwards.                | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Pentagon**      | BasicShape | A five-sided regular polygon.                    | width: 100px<br>height: 100px<br>edge ≈ 62px               | width: 30px<br>height: 30px<br>edge ≈ 18.6px              |
| **Heptagon**      | BasicShape | A seven-sided regular polygon.                   | width: 100px<br>height: 100px<br>edge ≈ 45px               | width: 30px<br>height: 30px<br>edge ≈ 13.5px              |
| **Octagon**       | BasicShape | An eight-sided regular polygon.                  | width: 100px<br>height: 100px<br>edge ≈ 41px               | width: 30px<br>height: 30px<br>edge ≈ 12.3px              |
| **Nonagon**       | BasicShape | A nine-sided regular polygon.                    | width: 100px<br>height: 100px<br>edge ≈ 35px               | width: 30px<br>height: 30px<br>edge ≈ 10.5px              |
| **Text**          | FormField  | A simple text display node.                      | width: 150px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **TextField**     | FormField  | An input field for text entry.                   | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **DatePicker**    | FormField  | A calendar date selection input.                 | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **Select**        | FormField  | A dropdown selection input.                      | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **Slider**        | FormField  | An interactive slider input.                     | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **Button**        | FormField  | A clickable action button.                       | width: 100px<br>height: 40px                               | width: 30px<br>height: 12px                               |
| **Spinner**       | FormField  | A numeric stepper/spinner input.                 | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **Checkbox**      | FormField  | A boolean toggle checkbox.                       | width: 30px<br>height: 30px                                | width: 30px<br>height: 30px                               |
| **RadioGroup**    | FormField  | A mutually exclusive radio button group.         | width: 150px<br>height: 60px                               | width: 30px<br>height: 12px                               |
| **ProgressBar**   | FormField  | A horizontal bar displaying completion progress. | width: 200px<br>height: 40px                               | width: 30px<br>height: 30px                               |
| **Table**         | FormField  | A multi-column data table.                       | width: 400px<br>height: auto                               | width: 30px<br>height: 30px                               |
| **Group**         | Group      | A container node to group multiple other nodes.  | width: 200px<br>height: 200px                              | -                                                         |
| **Fan**           | Industrial | SCADA asset for a ventilation/exhaust fan.       | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Pump**          | Industrial | SCADA asset for a fluid pump.                    | width: 100px<br>height: 100px                              | width: 30px<br>height: 30x                                |
| **Tank**          | Industrial | SCADA asset for a storage tank/silo.             | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Valve**         | Industrial | SCADA asset for a control valve.                 | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Motor**         | Industrial | SCADA asset for an electric motor.               | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **Gauge**         | Industrial | SCADA asset for an analog meter/gauge.           | width: 100px<br>height: 100px                              | width: 30px<br>height: 30px                               |
| **TrendChart**    | Industrial | Line chart visualization using Echarts.          | width: 360px<br>height: 360px                              | width: 30px<br>height: 30px                               |
| **Sparkline**     | Industrial | Minimal, axis-free line chart for quick trends.  | width: 120px<br>height: 40px                               | width: 30px<br>height: 30px                               |
