import { MoodColor } from "../common/ts/enum"

const moods: Array<{ id: number, moodValue: string, color: MoodColor }> = [
    { id: 1, moodValue: 'Excited', color: MoodColor.Orange },
    { id: 2, moodValue: 'Loving', color: MoodColor.Orange },
    { id: 3, moodValue: 'Confident', color: MoodColor.Orange },
    { id: 4, moodValue: 'Happy', color: MoodColor.Orange },
    { id: 5, moodValue: 'Joyful', color: MoodColor.Orange },
    { id: 6, moodValue: 'Proud', color: MoodColor.Orange },
    { id: 7, moodValue: 'Calm', color: MoodColor.Green },
    { id: 8, moodValue: 'Optimistic', color: MoodColor.Green },
    { id: 9, moodValue: 'Grateful', color: MoodColor.Green },
    { id: 10, moodValue: 'Okay', color: MoodColor.Gray },
    { id: 11, moodValue: 'Tired', color: MoodColor.Gray },
    { id: 12, moodValue: 'Bored', color: MoodColor.Gray },
    { id: 13, moodValue: 'Numb', color: MoodColor.Gray },
    { id: 14, moodValue: 'Annoyed', color: MoodColor.Red },
    { id: 15, moodValue: 'Overwhelmed', color: MoodColor.Red },
    { id: 16, moodValue: 'Angry', color: MoodColor.Red },
    { id: 17, moodValue: 'Frustrated', color: MoodColor.Red },
    { id: 18, moodValue: 'Stressed', color: MoodColor.Red },
    { id: 19, moodValue: 'Anxious', color: MoodColor.Purple },
    { id: 20, moodValue: 'Insecure', color: MoodColor.Purple },
    { id: 21, moodValue: 'Afraid', color: MoodColor.Purple },
    { id: 22, moodValue: 'Sad', color: MoodColor.Blue },
    { id: 23, moodValue: 'Ashamed', color: MoodColor.Blue },
    { id: 24, moodValue: 'Guilty', color: MoodColor.Blue },
    { id: 25, moodValue: 'Depressed', color: MoodColor.Blue }
]

export default moods