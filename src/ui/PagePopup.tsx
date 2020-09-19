import React, { useState, useEffect } from 'react';
import styles from './PagePopup.module.scss';

function PagePopup(props: { children: React.ReactNode}) {
  //浏览器可视区域页面的宽度
  const winW = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
  //浏览器可视区域页面的高度
  const winH = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
  const [ pageTop, setPageTop ] = useState(winH);
  useEffect(() => {
    setPageTop(0);
  }, []);
  return (
    <div className={styles.wrapper} style={{ marginTop: pageTop, width: winW, height: winH }}> 
      {props.children}
    </div>
  );
}

export default PagePopup;