import React, { useReducer, useMemo } from 'react'
import AppStatus from './components/appStatus';
import ListItem from './components/listItem';
import List from './components/list';
import ChatDetail from './components/chatDetail';
import styles from './index.module.scss';
import { INIT_STATE, reducer } from './stateManager/reducer';
import { chatSelected, submitMessage, closeChat } from './stateManager/actionCreator';

export default function Index() {
  const [{ userId, chatList, messages, selectedChatId }, dispatch] = useReducer(reducer, INIT_STATE);

  const selectedChat = useMemo(
    () => chatList.find(x => x.id === selectedChatId),
    [chatList, selectedChatId]
  );

  const selectedChatMessages = messages.filter(x => x.chatId === selectedChatId);

  function handleChatSelect(id) {
    dispatch(chatSelected(id));
  }

  function handleSubmit(text) {
    dispatch(submitMessage(text));
  }

  function handleClose() {
    dispatch(closeChat());
  }

  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <AppStatus />
        <List>
          {chatList.map(chat => {
            const lastMessage = messages.filter(x => x.chatId === chat.id);
            return <ListItem
              selected={chat.id === selectedChatId}
              onSelect={() => handleChatSelect(chat.id)}
              key={chat.id}
              name={chat.name}
              avatar={chat.avatar}
              time={chat.time}
              unreadMessageCount={chat.unreadMessageCount}
              text={lastMessage[lastMessage.length - 1].text}
            />
          })}
          {/* <ListItem name='Maryam Habibi' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} text='Hi, This is a message' />
          <ListItem name='Mina Mohammadi' avatar='/avatar-f.jpg' time='11:30' unreadMessageCount={15} text='Another Message' />
          <ListItem name='Reza Ahmadi' avatar='/avatar.png' time='21:14' unreadMessageCount={65} text='Hi, This is a message' />
          <ListItem name='Afshin Karimi' avatar='/avatar.png' time='11:30' unreadMessageCount={15} text='Another Message' selected />
          <ListItem name='Mohammad Mardan Nia' avatar='/avatar.png' time='21:14' unreadMessageCount={65} text='Hi, This is a message' />
          <ListItem name='Sarah Kiani' avatar='/avatar-f.jpg' time='11:30' unreadMessageCount={15} text='Another Message' />
          <ListItem name='Minoo Mohammadian' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} text='Hi, This is a message' />
          <ListItem name='Fereydoon Sabet' avatar='/avatar.png' time='11:30' unreadMessageCount={15} text='Another Message' />
          <ListItem name='Zahra Gholami' avatar='/avatar-f.jpg' time='21:14' unreadMessageCount={65} text='Hi, This is a message' />
          <ListItem name='Mohammad Bayat' avatar='/avatar.png' time='11:30' unreadMessageCount={15} text='Another Message' /> */}
        </List>

      </div>
      <div className={styles['main']}>
        {selectedChatId &&
          <ChatDetail
            onClose={handleClose}
            selectedChatId={selectedChatId}
            onSubmit={handleSubmit}
            avatar={selectedChat.avatar}
            name={selectedChat.name}
            messages={selectedChatMessages.map(message => {
              return {
                id: message.id,
                text: message.text,
                me: message.userId === userId
              }
            })}
          />
        }
      </div>
    </div>
  )
}
