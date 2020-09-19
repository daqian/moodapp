

import serveMessages from '../data/serveMessages';
import userMessages from '../data/userMessages';
import { ChatType } from '../common/ts/enum';
import { getSequence } from "../common/js/globalCache"

/**
 * 获取当前对话数组
 */
export function getMessages(chatArr: Array<{ chatType: ChatType, messageKey: string }>, userName: string)
: { messageArr: Array<{ chatType: ChatType, messageValue: Array<{ index: number, massage: string }> }>, lastMsgIndex: number} {
    let messageArr : Array<{ chatType: ChatType, messageValue: Array<{ index: number, massage: string }> }> = [];
    let lastMsgIndex = 0;
    chatArr.map((chatItem) => {
        let data = chatItem.chatType === ChatType.Serve ? serveMessages : userMessages;
        let dataValue = data[chatItem.messageKey];
        let messageValue : Array<{ index: number, massage: string }>  = []
        dataValue.map((messageItem) => {
            lastMsgIndex = getSequence()
            messageValue.push({
                index: lastMsgIndex,
                massage: messageItem.replace(/{{name}}/g, userName)
            })
        })
        messageArr.push({
            chatType: chatItem.chatType,
            messageValue
        })
    })
    return { messageArr, lastMsgIndex};
}
