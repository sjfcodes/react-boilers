import { useRef, useState } from "react";
import "./App.css";

function App() {
  const barRef: React.MutableRefObject<HTMLDivElement> = useRef(
    {} as HTMLDivElement
  );

  return (
    <div id="barRef" ref={barRef}>
      <svg width="100%" height="100%">
        <DraggableSVG barRef={barRef} fill="#ff9900" />
        <DraggableSVG barRef={barRef} />
        <DraggableSVG barRef={barRef} />
      </svg>
    </div>
  );
}

export default App;

interface Point {
  x: number;
  y: number;
}
type Props = {
  barRef: React.MutableRefObject<HTMLDivElement>;
  radius?: number;
  fill?: string;
};

const DraggableSVG = ({ barRef, radius = 50, fill = "#000" }: Props) => {
  const [position, setPosition] = useState<Point>({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = () => {
    console.log("handleMouseDown");
    setDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    console.log("handleMouseMove");
    if (!dragging) return;

    const xMin = radius;
    const xMax = barRef.current.offsetWidth - radius;
    const currentX = e.clientX - barRef.current.offsetLeft;

    const yMin = radius;
    const yMax = barRef.current.offsetHeight - radius;
    const currentY = e.clientY - barRef.current.offsetTop;

    const withinRangeX = currentX > xMin && currentX < xMax;
    const withinRangeY = currentY > yMin && currentY < yMax;

    if (withinRangeX && withinRangeY) {
      setPosition({ x: currentX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    console.log("handleMouseUp");
    setDragging(false);
  };

  return (
    <circle
      cx={position.x}
      cy={position.y}
      r={radius}
      fill={fill}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      // onMouseLeave={handleMouseUp}
    />
  );
};

// export default DraggableSVG;
