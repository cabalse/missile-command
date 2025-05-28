import type { Layer } from "konva/lib/Layer";
import type { Coordinate } from "../types/coordinate";
import createLetter from "./create-letter";
import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";

const writeSentence = (
  text: string,
  position: Coordinate,
  layer: Layer
): (Line | Rect)[] => {
  const letters = text.split("");
  let width = 0;
  const elements: (Line | Rect)[] = [];

  letters.forEach((letter) => {
    let ret = createLetter(letter, position.x + width, position.y, layer);
    width += ret.width;
    ret.elements.forEach((el) => {
      elements.push(el);
    });
  });

  return elements;
};

export default writeSentence;
