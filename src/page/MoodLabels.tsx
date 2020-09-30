import React, { useState, useCallback } from 'react';
import styles from './MoodLabels.module.scss';
import PagePopup from '../ui/PagePopup';
import moods from '../data/moods';
import { getGridRowStart, getGridColumnStart } from '../api/gridAPI';
import { useHistory } from 'react-router-dom';

function MoodLabels() {
  const [ activeItemId, setActiveItemId ] = useState<number>(0);
  let history = useHistory()
  const onItemClick = useCallback((id: number) => {
    setActiveItemId(id)
    setTimeout(() => {
      history.push(`/moodslider/${id}`)
    }, 600)
  }, [])
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
                  onClick={() => onItemClick(item.id)} 
                  className={item.id === activeItemId ? styles.gridItemActive : styles.gridItem} 
                  style={{ 
                    backgroundColor: item.color, 
                    gridRowStart: gridRowStart,
                    gridRowEnd: gridRowEnd,
                    gridColumnStart: gridColumnStart,
                    gridColumnEnd: gridColumnEnd
                  }}>
                    {item.moodValue}
                </div>
            })
          }
        </div>
      </div>
    </PagePopup>
  );
}

export default MoodLabels;