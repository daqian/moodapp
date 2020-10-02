import { SliderLevel } from '../common/ts/enum';

/**
 * 获取心情程度描述
 */
export function getDesByPercent(percent : number): string {
    let levelDescription: string = SliderLevel.Fairly
    if (percent >= 0 && percent < 20) {
        levelDescription = SliderLevel.Slightly
    } else if (percent >=20 && percent < 40) {
        levelDescription = SliderLevel.ALittle
    } else if (percent >= 40 && percent < 60) {
        levelDescription = SliderLevel.Fairly
    } else if (percent >= 60 && percent < 80) {
        levelDescription = SliderLevel.Very
    } else {
        levelDescription = SliderLevel.Extremely
    }
    return levelDescription
}
