import { useRef } from "react";
import "./App.css";

function App() {
  const barRef: React.MutableRefObject<HTMLDivElement> = useRef(
    {} as HTMLDivElement
  );
  return (
    <div className="drag-container">
      <div id="barRef" ref={barRef}>
        <Marker barRef={barRef} />
        <Marker barRef={barRef} />
        <Marker barRef={barRef} />
        <Marker barRef={barRef} />
      </div>
    </div>
  );
}

export default App;

type Props = {
  barRef: React.MutableRefObject<HTMLDivElement>;
};

const Marker = ({ barRef }: Props) => {
  const point = useRef({
    mouseDownClientX: 0,
    mouseDownBtnRefOffsetLeft: 0,
    mouseDownMaxMoveRight: 0,
  });
  const btnRef: React.MutableRefObject<HTMLButtonElement> = useRef(
    {} as HTMLButtonElement
  );
  const progressTextRef: React.MutableRefObject<HTMLSpanElement> = useRef(
    {} as HTMLSpanElement
  );

  const onMouseDown: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    console.log("onMouseDown", e);
    point.current.mouseDownClientX = e.clientX;
    point.current.mouseDownBtnRefOffsetLeft = btnRef.current.offsetLeft;
    point.current.mouseDownMaxMoveRight =
      barRef.current.offsetWidth - btnRef.current.offsetWidth;

    document.onmousemove = function (e) {
      const { clientX: currentX } = e;
      if (!btnRef.current || !progressTextRef.current) {
        console.warn("refs can not be null!");
        return;
      }

      const to = Math.min(
        point.current.mouseDownMaxMoveRight,
        Math.max(
          -2,
          point.current.mouseDownBtnRefOffsetLeft +
            (currentX - point.current.mouseDownClientX)
        )
      );

      const btnLeft = `${to}px`;
      console.log("btnLeft", btnLeft);
      btnRef.current.style.left = btnLeft;

      const progressLeft = `${to}px`;
      console.log("progressLeft", progressLeft);
      progressTextRef.current.style.left = progressLeft;

      const progress = `${Math.round(
        Math.max(0, to / point.current.mouseDownMaxMoveRight) * 60
      )}`;
      console.log("progress", progress);
      progressTextRef.current.textContent = progress;

      document.getSelection()?.empty();
    };
    document.onmouseup = () => (document.onmousemove = () => null);
  };
  return (
    <>
      <div></div>
      <span id="progressTextRef" ref={progressTextRef}>
        0
      </span>
      <span id="btn" ref={btnRef} onMouseDown={onMouseDown}></span>
    </>
  );
};
