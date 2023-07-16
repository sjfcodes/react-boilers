import reactLogo from "../assets/react.svg";
import viteLogo from "/vite.svg";

import { useAtom } from "jotai";
import { countAtom, decrementAtom, incrementAtom } from "../atoms/counter";

const CounterDemo = () => {
  const [count] = useAtom(countAtom);
  const [incremented, increment] = useAtom(incrementAtom);
  const [decremented, decrement] = useAtom(decrementAtom);

  return (
    <div>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>count is {count}</p>
        <p>incremented is {incremented}</p>
        <p>decremented is {decremented}</p>

        <button onClick={increment}> increment</button>
        <button onClick={decrement}> decrement</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
};

export default CounterDemo;
