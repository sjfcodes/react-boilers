import React, { Suspense, lazy } from 'react';

import style from './App.sass';

const ImageBox = lazy(() => import('./components/ImageBox/ImageBox'));

const App: React.FC = () => {
  return (
    <div className={style.main}>
      <Suspense fallback={<p>loading</p>}>
        <ImageBox />
      </Suspense>
    </div>
  );
};

export default App;
