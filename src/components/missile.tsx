import { useEffect, useRef, useState } from "react";
import { Line } from "react-konva";
import type { Coordinate } from "../types/coordinate";
import pointAlongLine from "../utilities/point-along-line";
import Konva from "konva";

type Props = {
  start: Coordinate;
  target: Coordinate;
  length: number;
  speed: number;
};

const Missile = ({ start, target, length, speed }: Props) => {
  const lineRef = useRef<Konva.Line | null>(null);
  const animRef = useRef<Konva.Animation | null>(null);

  const end = pointAlongLine(start, target, length);

  useEffect(() => {
    animRef.current = new Konva.Animation(
      (frame) => {
        if (!lineRef.current || !frame) return;
        const time = frame.time / 2000;

        const startLength = time * speed;
        const endLength = time * speed + length;
        const startPoint = pointAlongLine(start, target, startLength);
        const endPoint = pointAlongLine(start, target, endLength);

        lineRef.current.points([
          startPoint.x,
          startPoint.y,
          endPoint.x,
          endPoint.y,
        ]);
      },
      lineRef.current ? lineRef.current.getLayer() : undefined
    );
    animRef.current.start();

    return () => animRef.current?.stop(); // Clean up
  }, [start, target]);

  return (
    <Line
      ref={lineRef}
      points={[start.x, start.y, end.x, end.y]}
      stroke="red"
      strokeWidth={1}
    />
  );
};

export default Missile;
