import React, { useCallback, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moods from '../data/moods';
import { MoodContext } from '../App';
import styles from './MoodSlider.module.scss';
import Slider from '../ui/Slider';
import { getDesByPercent } from '../api/sliderAPI';

function MoodSlider() {
  //浏览器可视区域页面的高度
  const winH: number = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
  const moodContext = useContext(MoodContext);
    let history = useHistory();
    const { id } = useParams();
    const [ percent, setPercent ] = useState(50);
    const data = useState(() => {
        const currMood = moods.filter(x => x.id == id)
        return { currMood }
    })[0];
    const levelDescription = getDesByPercent(percent)
    const onConfirmClick = useCallback(() => {
        moodContext.currMood = {
            id,
            percent
        }
        history.push('/')
    }, [percent])
    const onBackClick = useCallback(() => {
      history.goBack()
    }, [])
    const onDataChangeCallback = (data: { percent: number }) => {
      setPercent(data.percent)
    }
    return (
      <div className={styles.wrapper} style={{ height: winH }}>
        <button className={styles.backBtn} onClick={onBackClick}>
            Back
        </button>
        <Slider 
          // percent={percent} 
          buttonText={data.currMood[0].moodValue} 
          onDataChangeCallback={onDataChangeCallback} />
          <button className={styles.confirmBtn} onClick={onConfirmClick}>
              I'm feeling {levelDescription} {data.currMood[0].moodValue}
          </button>
      </div>
    );
  }

export default MoodSlider;