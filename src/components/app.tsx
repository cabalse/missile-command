import { Layer, Line, Stage } from "react-konva";
import Missile from "./missile";

const App = () => {
  return (
    <Stage width={600} height={400}>
      <Layer>
        <Line
          points={[0, 0, 0, 400, 600, 400, 600, 0, 0, 0]}
          stroke="red"
          strokeWidth={5}
          dash={[15, 3]}
        />
        <Missile
          start={{ x: 200, y: 0 }}
          target={{ x: 300, y: 400 }}
          length={70}
          speed={200}
        />
        <Missile
          start={{ x: 500, y: 0 }}
          target={{ x: 300, y: 400 }}
          length={70}
          speed={200}
        />
      </Layer>
    </Stage>
  );
};

export default App;
