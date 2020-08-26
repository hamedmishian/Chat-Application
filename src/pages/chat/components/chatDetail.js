import React, { useState, useRef, useEffect } from 'react'
import TitleBar from './titleBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV, faTimes, faPaperPlane, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import Avatar from './avatar';
import styles from './chatDetail.module.scss';

export default function ChatDetail(
  {
    name,
    messages,
    avatar,
    onSubmit,
    selectedChatId,
    onClose
  }
) {
  const [text, setText] = useState('');
  const input = useRef(null);
  const lastEmptyMessage = useRef(null);

  function handleSubmitMessage() {
    if (text !== '') {
      onSubmit(text);
      setText('');
      input.current.focus();
    }
  }

  function handleKeyUp(e) {
    if (e.keyCode === 13) {
      handleSubmitMessage();
    }
  }

  useEffect(
    () => {
      input.current.focus();
      lastEmptyMessage.current.scrollIntoView({ behavior: 'smooth' })
    },
    [selectedChatId, messages]
  );

  return (
    <>
      <TitleBar
        first={<FontAwesomeIcon 
          onClick={onClose} 
          icon={faTimes} 
          size='lg' 
          color='#009588' 
          className='pointer' 
          />}

        middle={
          <div className={styles['app-title']}>
            <Avatar name={name} url={avatar} />
            <div className={styles['name']}>{name}</div>
          </div>
        }
        last={<FontAwesomeIcon 
          icon={faEllipsisV} 
          size='lg' 
          color='#009588' 
          className='pointer' 
          />}
      />
      <div className={styles['chat-box']}>
        <ul className={styles['messages-panel']}>
          {
            messages.map((message, index) => {
              return <li
                ref={messages.length === index + 1 ? lastEmptyMessage : null}
                className={styles[message.me ? 'me' : '']}
                key={message.id}
              >
                {message.text}
              </li>
            })
          }
        </ul>
        <div className={styles['input-section']}>
          <input
            ref={input}
            type='text'
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyUp={handleKeyUp}
          />
          <FontAwesomeIcon
            onClick={handleSubmitMessage}
            icon={text !== '' ? faPaperPlane : faPaperclip}
            color='#009588'
            className={styles['send'] + ' ' + styles['pointer']}
            size='lg'
          />
        </div>
      </div>
    </>
  )
}
