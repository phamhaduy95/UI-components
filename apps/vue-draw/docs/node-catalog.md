# Node Catalog

This document provides a comprehensive list of all nodes available in the `vue-draw` designer application, categorized by their type and purpose.

## All Nodes

**Note:** By default, every node shares the same initial `stroke-width` (1px) and `stroke-color` (#0d0d0d) settings to ensure a unified design aesthetic across the canvas.

| Node Type         | Category   | Description                                      | Default Sizes                                              | Rendered Palette Size |
| :---------------- | :--------- | :----------------------------------------------- | :--------------------------------------------------------- | :-------------------- |
| **Rectangle**     | BasicShape | A standard rectangle shape block.                | width: 100px<br>height: 60px<br>edges: 100px, 60px         | 30w × 18.2h           |
| **Square**        | BasicShape | A perfect square block.                          | width: 100px<br>height: 100px<br>edge: 100px               | 30w × 30h             |
| **Circle**        | BasicShape | A perfectly round circular block.                | width: 100px<br>height: 100px<br>r: 50px                   | 30w × 30h             |
| **Ellipse**       | BasicShape | An oval/ellipse block.                           | width: 100px<br>height: 50px<br>rx: 50px, ry: 25px         | 30w × 15.3h           |
| **Triangle**      | BasicShape | A three-sided polygon pointing upwards.          | width: 100px<br>height: 100px<br>base: 100px, edge ≈ 112px | 30w × 30h             |
| **Hexagon**       | BasicShape | A six-sided regular polygon.                     | width: 100px<br>height: 100px<br>edge ≈ 56px               | 30w × 30h             |
| **Star**          | BasicShape | A 5-point star shape.                            | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Diamond**       | BasicShape | A rhombus/diamond shape block.                   | width: 100px<br>height: 100px<br>edge ≈ 71px               | 30w × 30h             |
| **Trapezoid**     | BasicShape | A quadrilateral with one pair of parallel sides. | width: 100px<br>height: 100px<br>top: 50px, base: 100px    | 30w × 30h             |
| **Parallelogram** | BasicShape | A slanted rectangular block.                     | width: 100px<br>height: 100px<br>edge: 100px, slant ≈ 56px | 30w × 30h             |
| **Cross**         | BasicShape | A plus-sign / cross block.                       | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Right Arrow**   | BasicShape | A block arrow pointing right.                    | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Left Arrow**    | BasicShape | A block arrow pointing left.                     | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Up Arrow**      | BasicShape | A block arrow pointing upwards.                  | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Down Arrow**    | BasicShape | A block arrow pointing downwards.                | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Pentagon**      | BasicShape | A five-sided regular polygon.                    | width: 100px<br>height: 100px<br>edge ≈ 62px               | 30w × 30h             |
| **Heptagon**      | BasicShape | A seven-sided regular polygon.                   | width: 100px<br>height: 100px<br>edge ≈ 45px               | 30w × 30h             |
| **Octagon**       | BasicShape | An eight-sided regular polygon.                  | width: 100px<br>height: 100px<br>edge ≈ 41px               | 30w × 30h             |
| **Nonagon**       | BasicShape | A nine-sided regular polygon.                    | width: 100px<br>height: 100px<br>edge ≈ 35px               | 30w × 30h             |
| **Text**          | FormField  | A simple text display node.                      | width: 150px<br>height: 40px                               | 30w × 30h             |
| **TextField**     | FormField  | An input field for text entry.                   | width: 200px<br>height: 40px                               | 30w × 30h             |
| **DatePicker**    | FormField  | A calendar date selection input.                 | width: 200px<br>height: 40px                               | 30w × 30h             |
| **Table**         | FormField  | A multi-column data table.                       | width: 400px<br>height: auto                               | 30w × 30h             |
| **Group**         | Group      | A container node to group multiple other nodes.  | width: 200px<br>height: 200px                              | -                     |
| **Fan**           | Industrial | SCADA asset for a ventilation/exhaust fan.       | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Pump**          | Industrial | SCADA asset for a fluid pump.                    | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Tank**          | Industrial | SCADA asset for a storage tank/silo.             | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Valve**         | Industrial | SCADA asset for a control valve.                 | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Motor**         | Industrial | SCADA asset for an electric motor.               | width: 100px<br>height: 100px                              | 30w × 30h             |
| **Gauge**         | Industrial | SCADA asset for an analog meter/gauge.           | width: 100px<br>height: 100px                              | 30w × 30h             |
