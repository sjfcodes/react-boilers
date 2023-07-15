import React from 'react';

import { hello } from '../../utils/hello';
import style from './style.sass';

const Header = () => {
  return (
    <>
      <h1 className={style.text}>{hello('hello')} with sass module</h1>
      <h1>{hello('hello')} without sass module</h1>
    </>
  );
};

export default Header;
