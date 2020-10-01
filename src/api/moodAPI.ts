import { MoodColor } from '../common/ts/enum';
import moods from '../data/moods';

/**
 * 获取当前心情信息
 */
export function getCurrMood(id: number): { id: number, moodValue: string, color: MoodColor } | null {
    return id > 0 ? moods.filter(x => x.id == id)[0] : null
}