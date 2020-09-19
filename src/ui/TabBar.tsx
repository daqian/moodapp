
import React from 'react';
import styles from './TabBar.module.scss';

function TabBar(props: { children: React.ReactNode}) {
    return (
        <div className={styles.tabBar}>
          {props.children}
        </div>
    );
  }

export default TabBar;