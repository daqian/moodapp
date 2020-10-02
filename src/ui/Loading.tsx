
import React, { useEffect, useState } from 'react';
import styles from './Loading.module.scss';

function Loading(props: {
    interval: number,
    maxTime?: number,
    onLoadedCallback?: Function
}) { 
    const [ loadingStyles, setLoadingStyles ] = useState<string[]>([
        styles.loadingFirst,
        styles.loadingSecond,
        styles.loadingThird
    ]);
    const [seconds, setSeconds] = useState<number>(0);
    const [visible, setVisible] = useState<boolean>(true);

    useEffect(() => {
        let start: number = 0;
        let lastTimestamp: number = 0;
        let delta: number = 0;
        function step(timestamp: number) {
        if (start === 0 ) { 
            start = timestamp;
        }
        delta = timestamp - lastTimestamp;
        const elapsed: number = timestamp - start;
    
        setSeconds(seconds => seconds + 1);
        if (props.maxTime) {
            if (elapsed < props.maxTime) {
                window.requestAnimationFrame(step);
            } else {
                props.onLoadedCallback && props.onLoadedCallback()
                setVisible(false)
            }
        }
        if (delta > props.interval) { // Stop the animation after 2 seconds
            lastTimestamp = timestamp;
            setLoadingStyles((loadingStyles: string[]): string[] => {
                loadingStyles.unshift(loadingStyles[loadingStyles.length - 1])
                loadingStyles.pop()
                return loadingStyles
            })
        }
        }
        window.requestAnimationFrame(step);
    }, [])
    return (
        <div>
            {visible ? <div className={styles.loading}>
                { loadingStyles.map((style, index) => {
                    return <span key={index} className={style}></span>
                }) }
            </div> : null}
        </div>
    );
  }

export default Loading;