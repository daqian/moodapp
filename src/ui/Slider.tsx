
import React, { useCallback, useState, useEffect } from 'react';
import styles from './Slider.module.scss';
import { SliderLevel } from '../common/ts/enum';


function Slider(props: {
    buttonText: String,
    percent?: number,
    defaultPercent?: number,
    onTouchStartCallback?: Function,
    onTouchMoveCallback?: Function,
    onTouchEndCallback?: Function,
    onTouchCancelCallback?: Function,
    onDataChangeCallback?: Function
}) { 
    const data = useState(() => {
        const winW: number = window.innerWidth || document.documentElement.clientWidth || window.screen.width;
        const winH: number = window.innerHeight || document.documentElement.clientHeight || window.screen.height;
        const winH07: number = 0.7 * winH;
        const winH01: number = 0.1 * winH;
        const winH013: number = 0.13 * winH;
        const winH015: number = 0.15 * winH;
        const winW02: number = 0.2 * winW;
        const winW01: number = 0.1 * winW;
        const winH005: number = 0.05 * winH;
        const winH0525: number = 0.525 * winH;
        let currPageY : number = 0;
        let sliderLevels = [ SliderLevel.Extremely, SliderLevel.Very, SliderLevel.Fairly, SliderLevel.ALittle, SliderLevel.Slightly ]
        return { winW, winH, winH07, winH01, winH013, winH015, winW02, winW01, winH005, winH0525, currPageY, sliderLevels }
    })[0];
    const highestTop = 0.8 * data.winH;
    const lowestTop = 0.15 * data.winH;
    const onePercent = (highestTop - lowestTop) / 100
    let initPercent = 50;
    if (props.percent !== undefined && props.percent !== null) {
        initPercent = props.percent;
    } else if (props.defaultPercent !== undefined && props.defaultPercent !== null) {
        initPercent = props.defaultPercent;
    }
    let currSliderTop = highestTop - (initPercent * onePercent);
    const [ percent, setPercent ] = useState(initPercent);
    const [ sliderTop, setSliderTop ] = useState(currSliderTop);
    useEffect(() => {
        // percent属性受控
        if (props.percent !== undefined && props.percent !== null) {
            if (percent !== props.percent) {
                setPercent(props.percent)
            }
            let currSliderTop = highestTop - (props.percent * onePercent);
            // 按钮位置有移动时候才修改sliderTop的值
            if (Math.abs(currSliderTop - sliderTop) > 1) {
                setSliderTop(currSliderTop)
            }
        }
    }, [props.percent]);
    const onTouchStart = useCallback((event : React.TouchEvent) => {
        let touchObj = event.targetTouches[0];
        data.currPageY = touchObj.pageY;
        props.onTouchStartCallback && props.onTouchStartCallback()
    }, [])
    const onTouchMove = useCallback((event : React.TouchEvent) => {
        event.preventDefault();
        event.stopPropagation();
        let touchObj = event.targetTouches[0];
        let pageYDiff = touchObj.pageY - data.currPageY;
        data.currPageY = touchObj.pageY;
        sliderTopHandler(pageYDiff)
        props.onTouchMoveCallback && props.onTouchMoveCallback()
    }, [data.currPageY])
    const onTouchEnd = useCallback((event : React.TouchEvent) => {
        props.onTouchEndCallback && props.onTouchEndCallback()
    }, [])
    const onTouchCancel = useCallback((event : React.TouchEvent) => {
        props.onTouchCancelCallback && props.onTouchCancelCallback()
    }, [])
    const sliderTopHandler = (pageYDiff: number) => {
        const currSliderTop = sliderTop + pageYDiff;
        if (currSliderTop >= lowestTop && currSliderTop <= highestTop) {
            setSliderTop(currSliderTop)
            const currPercent = highestTop - currSliderTop
            const percent = Math.ceil(currPercent / onePercent)
            props.onDataChangeCallback && props.onDataChangeCallback({ percent })
            // percent属性不受控
            if (props.percent === undefined || props.percent === null) {
                setPercent(percent)
            }
        }
    }
    return (
        <div className={styles.wrapper}>
            <div className={styles.levelList} style={{ top: data.winH015 }}>
                { data.sliderLevels.map((level) => {
                    return <div className={styles.levelItem} style={{ marginBottom: data.winH013 }}>{level}</div>
                }) }
            </div>
            <div className={styles.percentTip} style={{ top: data.winH015 }}>{percent}%</div>
            <div className={styles.rail} style={{ height: data.winH07, top: data.winH015 }}></div>
            <div 
                style={{ top: sliderTop, width:  data.winW02, marginLeft: - data.winW01, height: data.winH005, lineHeight: data.winH005 + 'px'}}
                className={styles.slider} 
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
                onTouchCancel={onTouchCancel}
            >
                {props.buttonText}
            </div>
        </div>
    );
}

export default Slider;