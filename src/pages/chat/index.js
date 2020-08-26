import React, { useReducer, useMemo, useState } from 'react'
import AppStatus from './components/appStatus';
import ListItem from './components/listItem';
import List from './components/list';
import ChatDetail from './components/chatDetail';
import styles from './index.module.scss';
import { INIT_STATE, reducer } from './stateManager/reducer';
import { chatSelected, submitMessage, closeChat } from './stateManager/actionCreator';

export default function Index() {
  
  const [{ userId, chatList, messages, selectedChatId }, dispatch] = useReducer(reducer, INIT_STATE);
  const [keyword, setKeyword] = useState('');
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

  function onInputChange(keyword){
    setKeyword(keyword);
  }
  return (
    <div className={styles['layout']}>
      <div className={styles['side']}>
        <AppStatus onInputChange={onInputChange}/>
        <List>
          {chatList.filter(item => item.name.toLowerCase().includes(keyword.toLowerCase()))
          .map(chat => {
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
