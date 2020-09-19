import React, { useCallback, useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import moods from '../data/moods';
import { MoodContext } from '../App';
import styles from './MoodSlider.module.scss';
import Slider from '../ui/Slider';

function MoodSlider() {
    const moodContext = useContext(MoodContext);
    let history = useHistory();
    const { id } = useParams();
    const [ percent, setPercent ] = useState(50);
    const data = useState(() => {
        const currMood = moods.filter(x => x.id == id)
        return { currMood }
    })[0];
    const onClick = useCallback(() => {
        moodContext.currMood = {
            id,
            percent
        }
        history.push('/')
    }, [percent])
    const onDataChangeCallback = (data: { percent: number }) => {
      setPercent(data.percent)
    }
    return (
      <div className={styles.wrapper}>
        <Slider 
          // percent={percent} 
          buttonText={data.currMood[0].moodValue} 
          onDataChangeCallback={onDataChangeCallback} />
            <button onClick={onClick}>
                I'm feeling {data.currMood[0].moodValue}
            </button>
      </div>
    );
  }

export default MoodSlider;