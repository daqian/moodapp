import { SliderLevel } from '../common/ts/enum';

export function getDesByPercent(percent : number): string {
    let levelDescription = SliderLevel.Fairly
    if (percent > 0 && percent <= 10) {
        levelDescription = SliderLevel.Slightly
    }
    return levelDescription
}
