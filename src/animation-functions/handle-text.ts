import type { Line } from "konva/lib/shapes/Line";
import type { Rect } from "konva/lib/shapes/Rect";

const handleText = (ticks: number, textElements: (Line | Rect)[]) => {
  if (ticks >= 5) {
    textElements.forEach((text) => {
      text.destroy();
    });
    textElements = [];
  }
};

export default handleText;
