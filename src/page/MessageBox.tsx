
import React, { useState, useContext, useCallback, useEffect } from 'react';
import styles from './MessageBox.module.scss';
import Menu from '../ui/Menu';
import TabBar from '../ui/TabBar';
import moment from 'moment';
import { getMessages } from '../api/chatAPI';
import { ChatType } from '../common/ts/enum';
import { MoodContext } from '../App';
import { Link } from "react-router-dom";

function MessageBox() {
    const moodContext = useContext(MoodContext);
    let chatArr = [{ chatType: ChatType.Serve, messageKey: 'start' }]
    if (moodContext.currMood.id) {
      chatArr.push({ chatType: ChatType.User, messageKey: 'answerMood'})
    }
    let datas = getMessages(chatArr, moodContext.userInfo.userName, moodContext.currMood.id, moodContext.currMood.percent);
    const [ chatData, setChatData ] = useState(datas.messageArr);
    const [ lastMsgIndex, setLastMsgIndex ] = useState(datas.lastMsgIndex);
    const addMessage = useCallback(() => {
      let lastChatData = chatData[chatData.length -  1].messageValue
      let lastMsg = lastChatData[lastChatData.length - 1]
      setLastMsgIndex(lastMsg.index)
      if (moodContext.currMood.id) {
        chatArr.push({ chatType: ChatType.Serve, messageKey: 'MoodAnalyse1' })
        datas = getMessages(chatArr, moodContext.userInfo.userName, moodContext.currMood.id, moodContext.currMood.percent)
        setChatData(datas.messageArr)
        console.log('setTimeout-before:' + lastMsgIndex)
        setTimeout(() => {
          setLastMsgIndex(datas.lastMsgIndex)
          console.log('setTimeout-after:' + lastMsgIndex)
        }, 100);
      }
    }, [])
    return (
      <div className={styles.wrapper}>
        <div className={styles.nowTime}>{ moment().format('MMMM Do YYYY, HH:mm') }</div>
        <div>
          {
            chatData.map((dataItem) => {
              return dataItem && Array.isArray(dataItem.messageValue) ? dataItem.messageValue.map((messageItem) => {
                let messageStyles = dataItem.chatType === ChatType.Serve ? styles.messageLeft : styles.messageRight;
                console.log('messageItem.index:' + messageItem.index)
                console.log('lastMsgIndex:' + lastMsgIndex)
                return <div 
                key={messageItem.index}
                className={messageItem.index > lastMsgIndex ? styles.transitionMessageWrapper : styles.messageWrapper}
                style={{ opacity: messageItem.index > lastMsgIndex ? 0 : 1 }}
                >
                  <div className={messageStyles}>{messageItem.massage}</div>
                </div>
              }) : null
            })
          }
        </div>
        {!moodContext.currMood.id
        ? <div>
          <Menu>
            <div className={styles.menuItem}>
                <Link to="/moodlabels">I'm feeling...</Link>
            </div>
            <div className={styles.menuItem}>I'd like to meditate...</div>
          </Menu>
          <TabBar>
            <div>Youper</div>
            <div>Mind</div>
            <div>Insights</div>
            <div>Health</div>
            <div>Me</div>
          </TabBar>
        </div> : <button className='loading' onClick={addMessage}>...</button>}
      </div>
    );
  }

export default MessageBox;