import { useEffect, useRef, useState } from "react";
import "./App.css";

const enableClickRange = 10;
const canvasHeight = 100;

function App() {
  const ref: React.MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const draggingItem = useRef("");

  const [inTime, setInTime] = useState(20 * 1);
  const [currTime, setCurrTime] = useState(20 * 3);
  const [outTime, setOutTime] = useState(20 * 5);

  const calcMinMaxFromClientX = (clientX: number) => {
    if (!ref.current) return { min: 0, max: 0 };

    const target = clientX - ref.current.offsetLeft;
    const min = target - enableClickRange;
    const max = target + enableClickRange;
    return { min, max };
  };

  const isWithinRange = (min: number, max: number, target: number) => {
    const withinRange = target > min && target < max;
    return withinRange;
  };

  const onMouseDown: React.MouseEventHandler<HTMLCanvasElement> = (e) => {
    // console.log("onMouseDown");
    const { min, max } = calcMinMaxFromClientX(e.clientX);
    let item = "";

    if (isWithinRange(min, max, inTime)) item = "inTime";
    else if (isWithinRange(min, max, outTime)) item = "outTime";
    else if (isWithinRange(min, max, currTime)) item = "currTime";

    draggingItem.current = item;
  };

  const onMouseMove: React.MouseEventHandler<HTMLElement> = (e) => {
    // console.log("onMouseMove");
    if (!ref.current) return;

    const target = e.clientX - ref.current?.offsetLeft - 1;
    const { min, max } = calcMinMaxFromClientX(e.clientX);
    let isOverItem = false;

    if (draggingItem.current === "inTime") setInTime(target);
    if (draggingItem.current === "currTime") setCurrTime(target);
    if (draggingItem.current === "outTime") setOutTime(target);
    if (inTime > min && inTime < max) isOverItem = true;
    else if (outTime > min && outTime < max) isOverItem = true;
    else if (currTime > min && currTime < max) isOverItem = true;

    document.body.style.cursor = isOverItem ? "move" : "default";
  };

  const onMouseUp = () => {
    // console.log("onMouseUp");
    draggingItem.current = "";
  };

  useEffect(() => {
    if (!ref?.current) return;
    const ctx = ref.current.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, ref.current.width, ref.current.height);

    const draw = (
      color: string,
      time: number,
      startX: number,
      endX: number
    ) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.moveTo(time, startX);
      ctx.lineTo(time, endX);
      ctx.stroke();
    };
    draw("red", inTime, 0, canvasHeight / 2);
    draw("black", currTime, canvasHeight / 2, canvasHeight);
    draw("orange", outTime, 0, canvasHeight / 2);

    const t = setTimeout(() => setCurrTime((c) => c + 10), 1000);
    return () => {
      clearTimeout(t);
    };
  }, [inTime, currTime, outTime, draggingItem]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    document.body.addEventListener("mousemove", onMouseMove);
    return () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.body.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      id="my_canvas"
      ref={ref}
      width={800}
      height={canvasHeight}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
    >
      fallback text when canvas not supported by browser
    </canvas>
  );
}

export default App;
