// import { useRef } from "react";
// import "./App.css";

// function App() {
//   const barRef: React.MutableRefObject<HTMLDivElement> = useRef(
//     {} as HTMLDivElement
//   );
//   return (
//     <div className="drag-container">
//       <div id="barRef" ref={barRef}>
//         <Marker barRef={barRef} />
//         <Marker barRef={barRef} />
//         <Marker barRef={barRef} />
//       </div>
//     </div>
//   );
// }

// export default App;

// type Props = {
//   barRef: React.MutableRefObject<HTMLDivElement>;
// };

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

import React, { useState } from "react";

interface Point {
  x: number;
  y: number;
}

const DraggableSVG: React.FC = () => {
  const [position, setPosition] = useState<Point>({ x: 50, y: 50 });
  const [dragging, setDragging] = useState(false);

  const handleMouseDown = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ) => {
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX,
      y: position.y, // maintaining the y position constant for horizontal dragging
    });
  };

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

export default DraggableSVG;
