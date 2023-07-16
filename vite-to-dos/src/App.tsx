import { Provider } from "jotai";
import "./App.css";

import CounterDemo from "./components/CounterDemo";
import ToDosDemo from "./components/ToDosDemo";

// wrap components in providers to create isolated state trees

function App() {
  return (
    <>
      <div>
        <Provider>
          <CounterDemo />
        </Provider>
        <Provider>
          <CounterDemo />
        </Provider>
      </div>
      <div>
        <ToDosDemo />
      </div>
    </>
  );
}

export default App;

3613093892;

// routing
325081403;
