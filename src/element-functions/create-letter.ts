import Konva from "konva";
import type { Layer } from "konva/lib/Layer";
import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";

const SPACING = 8;
const HEIGHT = 60;
const WIDTH = 25;

const createLetter = (
  letter: string,
  x: number,
  y: number,
  layer: Layer
): { width: number; elements: (Line | Rect)[] } => {
  switch (letter.toUpperCase()) {
    case "A": {
      const firstLine = new Konva.Line({
        points: [x, y, x + WIDTH / 2, y - HEIGHT, x + WIDTH, y],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(firstLine);

      const secondLine = new Konva.Line({
        points: [
          x + WIDTH / 8,
          y - (HEIGHT / 5) * 2,
          x + (WIDTH / 8) * 7,
          y - (HEIGHT / 5) * 2,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(secondLine);

      return { width: WIDTH + SPACING, elements: [firstLine, secondLine] };
    }
    case "C": {
      const firstLine = new Konva.Line({
        points: [x + WIDTH, y - HEIGHT, x, y - HEIGHT, x, y, x + WIDTH, y],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(firstLine);

      return { width: WIDTH + SPACING, elements: [firstLine] };
    }
    case "D": {
      const line = new Konva.Line({
        points: [
          x,
          y,
          x + (WIDTH / 8) * 7,
          y,
          x + WIDTH,
          y - HEIGHT / 8,
          x + WIDTH,
          y - (HEIGHT / 8) * 7,
          x + (WIDTH / 8) * 7,
          y - HEIGHT,
          x,
          y - HEIGHT,
          x,
          y,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: WIDTH + SPACING, elements: [line] };
    }
    case "E": {
      const firstLine = new Konva.Line({
        points: [x + WIDTH, y - HEIGHT, x, y - HEIGHT, x, y, x + WIDTH, y],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(firstLine);

      const secondLine = new Konva.Line({
        points: [x, y - HEIGHT / 2, x + WIDTH / 2, y - HEIGHT / 2],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(secondLine);

      return { width: WIDTH + SPACING, elements: [firstLine, secondLine] };
    }
    case "G": {
      const firstLine = new Konva.Line({
        points: [
          x + WIDTH,
          y - HEIGHT,
          x,
          y - HEIGHT,
          x,
          y,
          x + WIDTH,
          y,
          x + WIDTH,
          y - HEIGHT / 2,
          x + WIDTH / 2,
          y - HEIGHT / 2,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(firstLine);

      return { width: WIDTH + SPACING, elements: [firstLine] };
    }
    case "I": {
      const line = new Konva.Line({
        points: [x, y, x, y - HEIGHT],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: 1 + SPACING, elements: [line] };
    }
    case "L": {
      const line = new Konva.Line({
        points: [x, y - HEIGHT, x, y, x + WIDTH, y],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: WIDTH + SPACING, elements: [line] };
    }
    case "M": {
      const line = new Konva.Line({
        points: [
          x,
          y,
          x + WIDTH / 4,
          y - HEIGHT,
          x + (WIDTH / 4) * 2,
          y - HEIGHT / 3,
          x + (WIDTH / 4) * 3,
          y - HEIGHT,
          x + WIDTH,
          y,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: WIDTH + SPACING, elements: [line] };
    }
    case "N": {
      const line = new Konva.Line({
        points: [x, y, x, y - HEIGHT, x + WIDTH, y, x + WIDTH, y - HEIGHT],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: WIDTH + SPACING, elements: [line] };
    }
    case "O": {
      const firstLine = new Konva.Line({
        points: [
          x + WIDTH,
          y - HEIGHT,
          x,
          y - HEIGHT,
          x,
          y,
          x + WIDTH,
          y,
          x + WIDTH,
          y - HEIGHT,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(firstLine);

      return { width: WIDTH + SPACING, elements: [firstLine] };
    }
    case "R": {
      const line = new Konva.Line({
        points: [
          x,
          y,
          x,
          y - HEIGHT,
          x + WIDTH,
          y - HEIGHT,
          x + WIDTH,
          y - HEIGHT / 2,
          x,
          y - HEIGHT / 2,
          x + WIDTH,
          y,
        ],
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(line);

      return { width: WIDTH + SPACING, elements: [line] };
    }
    case "S": {
      const line = new Konva.Line({
        points: [
          x,
          y,
          x + WIDTH,
          y,
          x + WIDTH,
          y - HEIGHT / 2,
          x,
          y - HEIGHT / 2,
          x,
          y - HEIGHT,
          x + WIDTH,
          y - HEIGHT,
        ],
        stroke: "red",
        strokeWidth: 1,
      });

      layer.add(line);

      return {
        width: WIDTH + SPACING,
        elements: [line],
      };
    }
    case "V": {
      const line = new Konva.Line({
        points: [x, y - HEIGHT, x + WIDTH / 2, y, x + WIDTH, y - HEIGHT],
        stroke: "red",
        strokeWidth: 1,
      });

      layer.add(line);

      return {
        width: WIDTH + SPACING,
        elements: [line],
      };
    }
    case " ": {
      // For space, we return an empty element with the width of SPACING
      return { width: WIDTH, elements: [] };
    }
    default: {
      const rect = new Konva.Rect({
        x: x,
        y: y,
        width: WIDTH,
        height: -HEIGHT,
        stroke: "red",
        strokeWidth: 1,
      });
      layer.add(rect);

      return { width: WIDTH + SPACING, elements: [rect] };
    }
  }
};

export default createLetter;
