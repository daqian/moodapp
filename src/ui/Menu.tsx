
import React from 'react';
import styles from './Menu.module.scss';

function Menu(props: { children: React.ReactNode}) {
    return (
        <div className={styles.menu}>
          {props.children}
        </div>
    );
  }

export default Menu;