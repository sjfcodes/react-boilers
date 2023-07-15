import React, { Suspense, lazy } from 'react';

import style from './style.sass';

const Header = lazy(() => import('../Header/Header'));

const ImageBox: React.FC = () => {
  return (
    <div className={style.backgroundBox}>
      <Suspense fallback={<p>loading</p>}>
        <Header />
      </Suspense>
    </div>
  );
};

export default ImageBox;
