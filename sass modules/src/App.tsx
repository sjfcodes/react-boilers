import React from 'react';

import style from './App.sass';
import { hello } from './hello';

const ImageBox: React.FC<{ children: JSX.Element | JSX.Element[] }> = ({ children }) => {
  return <div className={style.backgroundBox}>{children}</div>;
};

const App: React.FC = () => {
  return (
    <div className={style.main}>
      <ImageBox>
        <h1 className={style.text}>{hello('hello')} with css module</h1>
        <h1 className="text">{hello('hello')} without css module</h1>
      </ImageBox>
    </div>
  );
};

export default App;
