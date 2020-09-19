import React from 'react';
import styles from './MoodLabels.module.scss';
import PagePopup from '../ui/PagePopup';
import moods from '../data/moods';
import { getGridRowStart, getGridColumnStart } from '../api/gridAPI';
import { Link } from "react-router-dom";

function MoodLabels() {
  return (
    <PagePopup>
      <div className={styles.wrapper}>
        <div className={styles.labelGrid}>
          {
            moods.map((item, index) => {
              let gridRowStart = getGridRowStart(index)
              let gridRowEnd = gridRowStart + 2
              let gridColumnStart = getGridColumnStart(index)
              let gridColumnEnd = gridColumnStart + 1
              return <div 
                  key={item.id} 
                  className={styles.gridItem} 
                  style={{ 
                    backgroundColor: item.color, 
                    gridRowStart: gridRowStart,
                    gridRowEnd: gridRowEnd,
                    gridColumnStart: gridColumnStart,
                    gridColumnEnd: gridColumnEnd
                  }}>
                  <Link to={`/moodslider/${item.id}`}>
                    {item.moodValue}
                  </Link>
                </div>
            })
          }
        </div>
      </div>
    </PagePopup>
  );
}

export default MoodLabels;