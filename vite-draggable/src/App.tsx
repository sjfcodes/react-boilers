import { useRef, useState } from "react";
// import "./App.css";

function App() {
  const barRef: React.MutableRefObject<HTMLDivElement> = useRef(
    {} as HTMLDivElement
  );
  return (
    <div style={{ width: "100vw", height: "100vh", border: "1px solid black" }}>
      <div
        ref={barRef}
        style={{
          width: "80%",
          height: "80%",
          border: "1px solid orange",
          marginInline: "auto",
        }}
      >
        <DraggableSVG barRef={barRef} />
        {/* <DraggableSVG barRef={barRef} /> */}
        {/* <DraggableSVG barRef={barRef} /> */}
      </div>
    </div>
  );
}

export default App;

// const Marker = ({ barRef }: Props) => {
//   const point = useRef({
//     mouseDownClientX: 0,
//     mouseDownBtnRefOffsetLeft: 0,
//     mouseDownMaxMoveRight: 0,
//   });
//   const btnRef: React.MutableRefObject<HTMLButtonElement> = useRef(
//     {} as HTMLButtonElement
//   );
//   const progressTextRef: React.MutableRefObject<HTMLSpanElement> = useRef(
//     {} as HTMLSpanElement
//   );

//   const onMouseMove: React.MouseEventHandler<HTMLSpanElement> = (e) => {
//     const { clientX: currentX } = e;
//     if (!btnRef.current || !progressTextRef.current) {
//       console.warn("refs can not be null!");
//       return;
//     }

//     const to = Math.min(
//       point.current.mouseDownMaxMoveRight,
//       Math.max(
//         -2,
//         point.current.mouseDownBtnRefOffsetLeft +
//           (currentX - point.current.mouseDownClientX)
//       )
//     );

//     const btnLeft = `${to}px`;
//     console.log("btnLeft", btnLeft);
//     btnRef.current.style.left = btnLeft;

//     const progressLeft = `${to}px`;
//     console.log("progressLeft", progressLeft);
//     progressTextRef.current.style.left = progressLeft;

//     const progress = `${Math.round(
//       Math.max(0, to / point.current.mouseDownMaxMoveRight) * 60
//     )}`;
//     console.log("progress", progress);
//     progressTextRef.current.textContent = progress;

//     document.getSelection()?.empty();
//   };

//   const onMouseDown: React.MouseEventHandler<HTMLSpanElement> = (e) => {
//     console.log("onMouseDown", e);
//     point.current.mouseDownClientX = e.clientX;
//     point.current.mouseDownBtnRefOffsetLeft = btnRef.current.offsetLeft;
//     point.current.mouseDownMaxMoveRight =
//       barRef.current.offsetWidth - btnRef.current.offsetWidth;

//     // document.onmousemove =
//     // document.onmouseup = () => (document.onmousemove = () => null);
//   };
//   return (
//     <>
//       <div></div>
//       <span id="progressTextRef" ref={progressTextRef}>
//         0
//       </span>
//       <span
//         id="btn"
//         ref={btnRef}
//         onMouseDown={onMouseDown}
//         onMouseMove={onMouseMove}
//       ></span>
//     </>
//   );
// };

interface Point {
  x: number;
  y: number;
}
type Props = {
  barRef: React.MutableRefObject<HTMLDivElement>;
};

const DraggableSVG = ({ barRef }: Props) => {
  const [position, setPosition] = useState<Point>({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);
  const radius = 50;

  const handleMouseDown = (
    _e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ) => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  document.onclick = (e) => console.log(e);

  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!dragging) return;
    const currentX = e.clientX - barRef.current.offsetLeft;
    const xMin = radius;
    const xMax = barRef.current.offsetWidth - radius;

    if (currentX > xMin && currentX < xMax) {
      console.log({ currentX, xMin, xMax });
      setPosition({
        x: currentX,
        y: e.clientY,
      });
    }
  };

  document.body.style.margin = "0";

  return (
    <svg
      width="100%"
      height="100%"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <circle
        cx={position.x}
        cy={position.y}
        r="50"
        fill="#000"
        onMouseDown={handleMouseDown}
      />
    </svg>
  );
};

// export default DraggableSVG;
