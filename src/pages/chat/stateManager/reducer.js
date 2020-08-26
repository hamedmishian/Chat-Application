import { ACTIONS } from './actionCreator'
import React from 'react';
export const INIT_STATE = {
  userId: '1',
  chatList: [
    { time: '18:05', unreadMessageCount: 10, name: 'Zahra', avatar: '/avatar.png', id: '1' },
    { time: '18:05', unreadMessageCount: 10, name: 'Mohammad', avatar: '/avatar.png', id: '2' },
    { time: '18:05', unreadMessageCount: 10, name: 'Mina', avatar: '/avatar.png', id: '3' },
    { time: '18:05', unreadMessageCount: 10, name: 'Sarah', avatar: '/avatar.png', id: '4' },
  ],
  messages: [
    { chatId: '1', id: '1', text: 'Hi', userId: '1' },
    { chatId: '1', id: '2', text: 'Hi there', userId: '2' },
    { chatId: '2', id: '1', text: 'Hi', userId: '1' },
    { chatId: '2', id: '2', text: 'Hi there', userId: '2' },
    { chatId: '2', id: '3', text: 'Hi there', userId: '2' },
    { chatId: '3', id: '1', text: 'Hi', userId: '1' },
    { chatId: '3', id: '2', text: 'Hi there', userId: '2' },
    { chatId: '3', id: '4', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '5', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '31', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '33', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '32', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '34', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '35', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '39', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '37', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '13', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '23', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '43', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '413', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '322', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '3333', text: 'Hi there', userId: '2' },
    { chatId: '4', id: '315', text: 'Hi there', userId: '2' },
  ],
  selectedChatId: null
}

export function reducer(state, action) {
  return (ACTION_HANDLERS[action.type] || (() => state))(state, action.payload)
}

const ACTION_HANDLERS = {
  [ACTIONS.CHAT_SELECTED]: handleChatSelected,
  [ACTIONS.MESSAGE_SUBMITTED]: handleMessageSubmitted,
  [ACTIONS.CHAT_CLOSED]: handleChatClosed,
}

function handleChatSelected(state, payload) {
  const selectedChatIndex = state.chatList.findIndex(x => x.id === payload);
  
  const temp = [...state.chatList];
  temp.splice(selectedChatIndex,1 , {
    ...state.chatList[selectedChatIndex],
    unreadMessageCount : 0
  })
  return {
    ...state,
    selectedChatId : payload,
    chatList : temp
    // ...state,
    // selectedChatId: payload,
    // chatList: [
    //   ...state.chatList.slice(0, selectedChatIndex),
    //   {
    //     ...state.chatList[selectedChatIndex],
    //     unreadMessageCount: 0
    //   },
    //   ...state.chatList.slice(selectedChatIndex + 1)
    // ]
  }
}

function handleMessageSubmitted(state, payload) {
  return {
    ...state,
    messages: [
      ...state.messages,
      {
        chatId: state.selectedChatId,
        id: Math.random().toString(),
        text: payload,
        userId: state.userId
      }
    ]
  }
}

function handleChatClosed(state) {
  return {
    ...state,
    selectedChatId: null
  }
}
