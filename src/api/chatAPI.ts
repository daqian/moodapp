

import serveMessages from '../data/serveMessages';
import userMessages from '../data/userMessages';
import { ChatType, Greetings } from '../common/ts/enum';
import { getSequence } from "../common/js/globalCache"
import { getDesByPercent } from './sliderAPI';
import { getCurrMood } from './moodAPI';

/**
 * 获取当前对话数组
 */
export function getMessages(chatArr: Array<{ chatType: ChatType, messageKey: string }>, userName: string, id: number, percent: number)
: { messageArr: Array<{ chatType: ChatType, messageValue: Array<{ index: number, massage: string }> }>, lastMsgIndex: number} {
    let messageArr : Array<{ chatType: ChatType, messageValue: Array<{ index: number, massage: string }> }> = [];
    let lastMsgIndex = 0
    chatArr.map((chatItem) => {
        let data = chatItem.chatType === ChatType.Serve ? serveMessages : userMessages;
        let dataValue = data[chatItem.messageKey];
        let messageValue : Array<{ index: number, massage: string }>  = []
        dataValue.map((messageItem) => {
            lastMsgIndex = getSequence()
            messageValue.push({
                index: lastMsgIndex,
                massage: exchangeInfoFromMsg(messageItem, userName, id, percent)
            })
        })
        messageArr.push({
            chatType: chatItem.chatType,
            messageValue
        })
    })
    return { messageArr, lastMsgIndex};
}

/**
 * 消息格式转换
 */
function exchangeInfoFromMsg(msg: string, userName: string,id: number, percent: number): string{
    let currMood = getCurrMood(id)
    let moodValue = currMood !== null ? currMood.moodValue : ''
    return msg.replace(/{{name}}/g, userName)
    .replace(/{{greetings}}/g, getGreetings())
    .replace(/{{whatday}}/g, getDay())
    .replace(/{{level}}/g, getDesByPercent(percent))
    .replace(/{{mood}}/g, moodValue)
}

/**
 * 获取当前问候语
 */
function getGreetings(): string {
    let nowHour: number = new Date().getHours()
    let greetings: string = ''
    if (nowHour >= 6 && nowHour < 11) {
        greetings = Greetings.Morning
    } else if (nowHour >= 11 && nowHour < 13) {
        greetings = Greetings.Afternoon
    } else if (nowHour >= 13 && nowHour < 19 ) {
        greetings = Greetings.Evening
    } else {
        greetings = Greetings.Night
    }
    return greetings
}

/**
 * 获取当前日期（星期）
 */
function getDay(): string {
    let currDay: number = new Date().getDay()
    let weeks: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    return weeks[currDay]
}
