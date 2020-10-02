import { MoodInfo } from '../common/ts/interface';
import moods from '../data/moods';

/**
 * 获取当前心情信息
 */
export function getCurrMood(id: number): MoodInfo | null {
    return id > 0 ? moods.filter(x => x.id == id)[0] : null
}