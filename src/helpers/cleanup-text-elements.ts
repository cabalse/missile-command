import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";

const cleanUpTextElements = (textElements: (Line | Rect)[]) => {
  textElements.forEach((text) => {
    text.destroy();
  });
  textElements = [];
};

export default cleanUpTextElements;
